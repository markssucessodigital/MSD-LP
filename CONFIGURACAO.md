# 🚀 MSD - Landing Page Configuração

## 📝 O QUE CONFIGURAR ANTES DE USAR

### 1️⃣ **WhatsApp Business (OBRIGATÓRIO)**
📍 Arquivo: `/app/frontend/src/data/mock.js`

```javascript
whatsapp: {
  number: "5511999999999", // ⚠️ SUBSTITUIR pelo seu número
  message: "Olá! Gostaria de agendar meu Diagnóstico Estratégico Gratuito com a MSD."
}
```

**Formato:** Código do país + DDD + Número
- Exemplo Brasil: `5511987654321`

---

### 2️⃣ **Google Analytics (OPCIONAL)**
📍 Arquivo: `/app/frontend/.env`

```env
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Como obter:**
1. Acesse https://analytics.google.com/
2. Admin > Data Streams
3. Copie o Measurement ID (formato: G-XXXXXXXXXX)

---

### 3️⃣ **Facebook Pixel (OPCIONAL)**
📍 Arquivo: `/app/frontend/.env`

```env
REACT_APP_FB_PIXEL_ID=123456789012345
```

**Como obter:**
1. Acesse https://business.facebook.com/
2. Events Manager > Pixels
3. Copie o Pixel ID (15 dígitos)

---

### 4️⃣ **MongoDB (SE USAR BACKEND)**
📍 Arquivo: `/app/backend/.env`

```env
MONGO_URL=mongodb+srv://usuario:senha@cluster.mongodb.net/
DB_NAME=msd_database
```

**Como obter:**
1. Crie conta gratuita no MongoDB Atlas
2. Crie cluster
3. Copie connection string

---

## 🎯 STATUS ATUAL

### ✅ PRONTO PARA USO:
- Frontend completo (13 seções)
- 6 CTAs otimizados
- Design premium preto e dourado
- Formulário de captura de leads
- Google Analytics integrado (precisa ID)
- Facebook Pixel integrado (precisa ID)
- Tracking de eventos
- Modal de leads funcionando

### ⚠️ PRECISA CONFIGURAR:
1. Número WhatsApp real
2. Google Analytics ID (opcional)
3. Facebook Pixel ID (opcional)

### 🔄 BACKEND IMPLEMENTADO:
- API de captura de leads
- MongoDB integration
- Dashboard admin (rota /admin - em desenvolvimento)
- Export de leads para CSV
- Estatísticas de conversão

---

## 🚀 DEPLOY RÁPIDO

### Frontend (Vercel):
```bash
# 1. Faça push para GitHub
# 2. Conecte no Vercel
# 3. Configure variáveis de ambiente:
REACT_APP_BACKEND_URL=sua_url_backend
REACT_APP_GA_MEASUREMENT_ID=seu_id
REACT_APP_FB_PIXEL_ID=seu_id
```

### Backend (Railway/Render):
```bash
# Configure variáveis:
MONGO_URL=sua_connection_string
DB_NAME=msd_database
```

---

## 📊 APÓS CONFIGURAR

1. ✅ Teste o formulário de leads
2. ✅ Verifique se WhatsApp abre corretamente
3. ✅ Confirme tracking no Google Analytics
4. ✅ Confirme eventos no Facebook Pixel
5. ✅ Teste captura de leads no banco

---

## 🆘 SUPORTE

Se tiver dúvidas sobre configuração:
- Google Analytics: https://support.google.com/analytics
- Facebook Pixel: https://www.facebook.com/business/help/952192354843755
- MongoDB Atlas: https://docs.atlas.mongodb.com/

---

## 🎉 PRONTO!

Depois de configurar, sua landing page estará:
- ✅ Capturando leads reais
- ✅ Rastreando conversões
- ✅ Armazenando dados no banco
- ✅ Pronta para gerar resultados!
