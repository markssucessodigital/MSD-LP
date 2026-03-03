from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import StreamingResponse
from models.lead import Lead, LeadCreate, LeadResponse
from motor.motor_asyncio import AsyncIOMotorClient
import os
from typing import List, Optional
from datetime import datetime
import csv
import io
import logging

router = APIRouter()

# Get database
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'msd_database')]
leads_collection = db.leads

logger = logging.getLogger(__name__)

@router.post("/leads", response_model=LeadResponse)
async def create_lead(lead_data: LeadCreate):
    """
    Captura um novo lead da landing page
    """
    try:
        # Create lead object
        lead = Lead(**lead_data.dict())
        
        # Insert into database
        result = await leads_collection.insert_one(lead.dict())
        
        if result.inserted_id:
            logger.info(f"✅ Novo lead capturado: {lead.email} (ID: {lead.id})")
            
            # TODO: Enviar email de notificação (implementar depois)
            # TODO: Enviar email de confirmação para o lead (implementar depois)
            
            return LeadResponse(
                success=True,
                message="Lead capturado com sucesso! Entraremos em contato em breve.",
                lead_id=lead.id
            )
        else:
            raise HTTPException(status_code=500, detail="Erro ao salvar lead")
            
    except Exception as e:
        logger.error(f"❌ Erro ao capturar lead: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao processar lead: {str(e)}")

@router.get("/leads", response_model=List[Lead])
async def get_leads(
    status: Optional[str] = Query(None, description="Filtrar por status"),
    limit: int = Query(100, ge=1, le=1000),
    skip: int = Query(0, ge=0)
):
    """
    Lista todos os leads (rota admin)
    TODO: Adicionar autenticação
    """
    try:
        query = {}
        if status:
            query["status"] = status
        
        cursor = leads_collection.find(query).sort("created_at", -1).skip(skip).limit(limit)
        leads = await cursor.to_list(length=limit)
        
        return [Lead(**lead) for lead in leads]
        
    except Exception as e:
        logger.error(f"❌ Erro ao buscar leads: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao buscar leads: {str(e)}")

@router.get("/leads/stats")
async def get_leads_stats():
    """
    Estatísticas de leads
    """
    try:
        total = await leads_collection.count_documents({})
        new = await leads_collection.count_documents({"status": "new"})
        contacted = await leads_collection.count_documents({"status": "contacted"})
        converted = await leads_collection.count_documents({"status": "converted"})
        
        # Group by source
        pipeline = [
            {"$group": {"_id": "$source", "count": {"$sum": 1}}}
        ]
        sources = await leads_collection.aggregate(pipeline).to_list(None)
        
        return {
            "total": total,
            "by_status": {
                "new": new,
                "contacted": contacted,
                "converted": converted
            },
            "by_source": {item["_id"]: item["count"] for item in sources}
        }
        
    except Exception as e:
        logger.error(f"❌ Erro ao buscar stats: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao buscar estatísticas: {str(e)}")

@router.get("/leads/export")
async def export_leads():
    """
    Exporta leads para CSV
    TODO: Adicionar autenticação
    """
    try:
        cursor = leads_collection.find({}).sort("created_at", -1)
        leads = await cursor.to_list(length=None)
        
        # Create CSV in memory
        output = io.StringIO()
        writer = csv.writer(output)
        
        # Header
        writer.writerow(["ID", "Nome", "Email", "Telefone", "Mensagem", "Origem", "Status", "Data"])
        
        # Rows
        for lead in leads:
            writer.writerow([
                lead.get("id", ""),
                lead.get("name", ""),
                lead.get("email", ""),
                lead.get("phone", ""),
                lead.get("message", ""),
                lead.get("source", ""),
                lead.get("status", ""),
                lead.get("created_at", "").strftime("%d/%m/%Y %H:%M") if lead.get("created_at") else ""
            ])
        
        output.seek(0)
        
        return StreamingResponse(
            iter([output.getvalue()]),
            media_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename=leads_msd_{datetime.now().strftime('%Y%m%d')}.csv"}
        )
        
    except Exception as e:
        logger.error(f"❌ Erro ao exportar leads: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao exportar leads: {str(e)}")

@router.patch("/leads/{lead_id}/status")
async def update_lead_status(lead_id: str, status: str):
    """
    Atualiza status de um lead
    """
    try:
        valid_statuses = ["new", "contacted", "converted", "lost"]
        if status not in valid_statuses:
            raise HTTPException(status_code=400, detail=f"Status inválido. Use: {', '.join(valid_statuses)}")
        
        result = await leads_collection.update_one(
            {"id": lead_id},
            {"$set": {"status": status}}
        )
        
        if result.modified_count > 0:
            return {"success": True, "message": "Status atualizado com sucesso"}
        else:
            raise HTTPException(status_code=404, detail="Lead não encontrado")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Erro ao atualizar status: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar status: {str(e)}")
