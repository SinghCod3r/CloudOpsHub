from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from ..models.incident import Incident
from ..schemas.incident import IncidentCreate, IncidentUpdate, IncidentStatusUpdate, IncidentResponse
from ..database import get_db

router = APIRouter(
    prefix="/incidents",
    tags=["Incidents"]
)

@router.get("", response_model=List[IncidentResponse])
def get_incidents(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    status_filter: Optional[str] = Query(None, alias="status")
):
    query = db.query(Incident)
    if status_filter:
        query = query.filter(Incident.status == status_filter)
    incidents = query.offset(skip).limit(limit).all()
    return incidents

@router.get("/search", response_model=List[IncidentResponse])
def search_incidents(
    q: str,
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100
):
    incidents = db.query(Incident).filter(
        Incident.title.ilike(f"%{q}%") | Incident.description.ilike(f"%{q}%")
    ).offset(skip).limit(limit).all()
    return incidents

@router.get("/{incident_id}", response_model=IncidentResponse)
def get_incident(incident_id: int, db: Session = Depends(get_db)):
    incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    return incident

@router.post("", response_model=IncidentResponse, status_code=status.HTTP_201_CREATED)
def create_incident(incident: IncidentCreate, db: Session = Depends(get_db)):
    db_incident = Incident(**incident.model_dump())
    db.add(db_incident)
    db.commit()
    db.refresh(db_incident)
    return db_incident

@router.put("/{incident_id}", response_model=IncidentResponse)
def update_incident(incident_id: int, incident_update: IncidentUpdate, db: Session = Depends(get_db)):
    db_incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if not db_incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    
    update_data = incident_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_incident, key, value)
        
    db.commit()
    db.refresh(db_incident)
    return db_incident

@router.patch("/{incident_id}/status", response_model=IncidentResponse)
def update_incident_status(incident_id: int, status_update: IncidentStatusUpdate, db: Session = Depends(get_db)):
    db_incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if not db_incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    
    db_incident.status = status_update.status
    db.commit()
    db.refresh(db_incident)
    return db_incident

@router.delete("/{incident_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_incident(incident_id: int, db: Session = Depends(get_db)):
    db_incident = db.query(Incident).filter(Incident.id == incident_id).first()
    if not db_incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    
    db.delete(db_incident)
    db.commit()
    return None
