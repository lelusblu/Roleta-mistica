from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

class LeadCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    question: str = Field(..., min_length=10, max_length=500)
    session_id: str

class LeadResponse(BaseModel):
    id: str
    name: str
    email: str
    question: str
    session_id: str
    created_at: datetime
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    status: str = "active"
    
    class Config:
        json_encoders = {
            ObjectId: str,
            datetime: lambda v: v.isoformat()
        }

class Lead(BaseModel):
    name: str
    email: str
    question: str
    session_id: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    status: str = "active"
    
    class Config:
        json_encoders = {
            ObjectId: str,
            datetime: lambda v: v.isoformat()
        }