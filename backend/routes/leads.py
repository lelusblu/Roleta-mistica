from fastapi import APIRouter, HTTPException, Request, Depends
from typing import List
import logging
from bson import ObjectId
from datetime import datetime

from ..models.lead import Lead, LeadCreate, LeadResponse

logger = logging.getLogger(__name__)

# Router será incluído no main server
router = APIRouter(prefix="/api/leads", tags=["leads"])

async def get_db():
    from ..server import db
    return db

@router.post("/", response_model=dict)
async def create_lead(
    lead_data: LeadCreate, 
    request: Request,
    db = Depends(get_db)
):
    """Criar novo lead"""
    try:
        # Preparar dados do lead
        lead_dict = lead_data.dict()
        lead_dict["created_at"] = datetime.utcnow()
        lead_dict["ip_address"] = request.client.host
        lead_dict["user_agent"] = request.headers.get("user-agent", "")
        lead_dict["status"] = "active"
        
        # Verificar se já existe lead com este email na mesma sessão
        existing_lead = await db.leads.find_one({
            "email": lead_data.email,
            "session_id": lead_data.session_id
        })
        
        if existing_lead:
            return {
                "success": True,
                "lead_id": str(existing_lead["_id"]),
                "message": "Lead já existe para esta sessão",
                "existing": True
            }
        
        # Inserir novo lead
        result = await db.leads.insert_one(lead_dict)
        
        logger.info(f"Novo lead criado: {result.inserted_id} - {lead_data.email}")
        
        return {
            "success": True,
            "lead_id": str(result.inserted_id),
            "message": "Lead capturado com sucesso",
            "existing": False
        }
        
    except Exception as e:
        logger.error(f"Erro ao criar lead: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/{lead_id}", response_model=LeadResponse)
async def get_lead(lead_id: str, db = Depends(get_db)):
    """Buscar lead por ID"""
    try:
        if not ObjectId.is_valid(lead_id):
            raise HTTPException(status_code=400, detail="ID inválido")
            
        lead = await db.leads.find_one({"_id": ObjectId(lead_id)})
        
        if not lead:
            raise HTTPException(status_code=404, detail="Lead não encontrado")
        
        # Converter ObjectId para string
        lead["id"] = str(lead["_id"])
        del lead["_id"]
        
        return LeadResponse(**lead)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erro ao buscar lead {lead_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/", response_model=List[LeadResponse])
async def list_leads(
    limit: int = 50,
    skip: int = 0,
    db = Depends(get_db)
):
    """Listar leads (para admin/analytics)"""
    try:
        cursor = db.leads.find().skip(skip).limit(limit).sort("created_at", -1)
        leads = await cursor.to_list(length=limit)
        
        # Converter ObjectIds para strings
        for lead in leads:
            lead["id"] = str(lead["_id"])
            del lead["_id"]
        
        return [LeadResponse(**lead) for lead in leads]
        
    except Exception as e:
        logger.error(f"Erro ao listar leads: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")