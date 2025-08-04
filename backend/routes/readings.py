from fastapi import APIRouter, HTTPException, Depends
from typing import List
import logging
from bson import ObjectId
from datetime import datetime

try:
    from ..models.reading import Reading, ReadingCreate, ReadingResponse, PromoClickUpdate
except ImportError:
    import sys
    sys.path.append('/app/backend')
    from models.reading import Reading, ReadingCreate, ReadingResponse, PromoClickUpdate

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/readings", tags=["readings"])

async def get_db():
    from ..server import db
    return db

@router.post("/", response_model=dict)
async def create_reading(
    reading_data: ReadingCreate,
    db = Depends(get_db)
):
    """Criar nova leitura de tarot"""
    try:
        # Verificar se lead existe
        if not ObjectId.is_valid(reading_data.lead_id):
            raise HTTPException(status_code=400, detail="Lead ID inválido")
            
        lead = await db.leads.find_one({"_id": ObjectId(reading_data.lead_id)})
        if not lead:
            raise HTTPException(status_code=404, detail="Lead não encontrado")
        
        # Preparar dados da leitura
        reading_dict = reading_data.dict()
        reading_dict["created_at"] = datetime.utcnow()
        reading_dict["proceeded_to_promo"] = False
        reading_dict["promo_clicked_at"] = None
        
        # Inserir leitura
        result = await db.readings.insert_one(reading_dict)
        
        logger.info(f"Nova leitura criada: {result.inserted_id} - Card: {reading_data.card_name}")
        
        return {
            "success": True,
            "reading_id": str(result.inserted_id),
            "message": "Leitura registrada com sucesso"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erro ao criar leitura: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.put("/{reading_id}/promo-click", response_model=dict)
async def update_promo_click(
    reading_id: str,
    promo_data: PromoClickUpdate,
    db = Depends(get_db)
):
    """Registrar clique na promoção"""
    try:
        if not ObjectId.is_valid(reading_id):
            raise HTTPException(status_code=400, detail="Reading ID inválido")
        
        # Atualizar reading com info da promoção
        result = await db.readings.update_one(
            {"_id": ObjectId(reading_id)},
            {
                "$set": {
                    "proceeded_to_promo": True,
                    "promo_clicked_at": promo_data.clicked_at
                }
            }
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Leitura não encontrada")
        
        logger.info(f"Clique na promoção registrado: {reading_id}")
        
        return {
            "success": True,
            "message": "Clique na promoção registrado"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erro ao atualizar promo click {reading_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/{reading_id}", response_model=ReadingResponse)
async def get_reading(reading_id: str, db = Depends(get_db)):
    """Buscar leitura por ID"""
    try:
        if not ObjectId.is_valid(reading_id):
            raise HTTPException(status_code=400, detail="ID inválido")
            
        reading = await db.readings.find_one({"_id": ObjectId(reading_id)})
        
        if not reading:
            raise HTTPException(status_code=404, detail="Leitura não encontrada")
        
        # Converter ObjectId para string
        reading["id"] = str(reading["_id"])
        del reading["_id"]
        
        return ReadingResponse(**reading)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erro ao buscar leitura {reading_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

@router.get("/", response_model=List[ReadingResponse])
async def list_readings(
    limit: int = 50,
    skip: int = 0,
    db = Depends(get_db)
):
    """Listar leituras (para admin/analytics)"""
    try:
        cursor = db.readings.find().skip(skip).limit(limit).sort("created_at", -1)
        readings = await cursor.to_list(length=limit)
        
        # Converter ObjectIds para strings
        for reading in readings:
            reading["id"] = str(reading["_id"])
            del reading["_id"]
        
        return [ReadingResponse(**reading) for reading in readings]
        
    except Exception as e:
        logger.error(f"Erro ao listar leituras: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")