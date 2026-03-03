from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid

class Lead(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    message: Optional[str] = None
    source: str = "landing_page"  # Qual CTA ou página originou
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"  # new, contacted, converted, lost

class LeadCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    message: Optional[str] = Field(None, max_length=1000)
    source: str = "landing_page"
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None

class LeadResponse(BaseModel):
    success: bool
    message: str
    lead_id: Optional[str] = None
