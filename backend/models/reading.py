from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

class ReadingCreate(BaseModel):
    lead_id: str
    card_id: int
    card_name: str
    card_interpretation: str
    question: str
    session_id: str

class ReadingResponse(BaseModel):
    id: str
    lead_id: str
    card_id: int
    card_name: str
    card_interpretation: str
    question: str
    session_id: str
    created_at: datetime
    proceeded_to_promo: bool = False
    promo_clicked_at: Optional[datetime] = None
    
    class Config:
        json_encoders = {
            ObjectId: str,
            datetime: lambda v: v.isoformat()
        }

class Reading(BaseModel):
    lead_id: str
    card_id: int
    card_name: str
    card_interpretation: str
    question: str
    session_id: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    proceeded_to_promo: bool = False
    promo_clicked_at: Optional[datetime] = None
    
    class Config:
        json_encoders = {
            ObjectId: str,
            datetime: lambda v: v.isoformat()
        }

class PromoClickUpdate(BaseModel):
    clicked_at: Optional[datetime] = Field(default_factory=datetime.utcnow)