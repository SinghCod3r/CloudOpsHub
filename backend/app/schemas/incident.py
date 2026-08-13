from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime
from ..models.incident import PriorityEnum, StatusEnum, CategoryEnum

class CommentBase(BaseModel):
    content: str
    author: Optional[str] = None

class CommentCreate(CommentBase):
    pass

class CommentResponse(CommentBase):
    id: int
    incident_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class IncidentBase(BaseModel):
    title: str
    description: str
    priority: PriorityEnum
    status: StatusEnum = StatusEnum.OPEN
    category: CategoryEnum
    assigned_to: Optional[str] = None

class IncidentCreate(IncidentBase):
    pass

class IncidentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[PriorityEnum] = None
    status: Optional[StatusEnum] = None
    category: Optional[CategoryEnum] = None
    assigned_to: Optional[str] = None

class IncidentStatusUpdate(BaseModel):
    status: StatusEnum

class IncidentResponse(IncidentBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    comments: List[CommentResponse] = []

    model_config = ConfigDict(from_attributes=True)
