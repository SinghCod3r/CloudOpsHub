from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from pydantic import BaseModel

from ..models.incident import Incident, StatusEnum, PriorityEnum
from ..database import get_db

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

class DashboardStats(BaseModel):
    total_incidents: int
    open: int
    in_progress: int
    resolved: int
    critical: int

@router.get("/stats", response_model=DashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db)):
    total = db.query(func.count(Incident.id)).scalar() or 0
    open_count = db.query(func.count(Incident.id)).filter(Incident.status == StatusEnum.OPEN).scalar() or 0
    in_progress_count = db.query(func.count(Incident.id)).filter(Incident.status == StatusEnum.IN_PROGRESS).scalar() or 0
    resolved_count = db.query(func.count(Incident.id)).filter(Incident.status == StatusEnum.RESOLVED).scalar() or 0
    critical_count = db.query(func.count(Incident.id)).filter(Incident.priority == PriorityEnum.CRITICAL).scalar() or 0
    
    return DashboardStats(
        total_incidents=total,
        open=open_count,
        in_progress=in_progress_count,
        resolved=resolved_count,
        critical=critical_count
    )
