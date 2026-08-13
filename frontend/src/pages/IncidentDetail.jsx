import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIncident, updateIncidentStatus, deleteIncident } from '../api';
import { Trash2, Edit2, ArrowLeft } from 'lucide-react';

const IncidentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncident();
  }, [id]);

  const fetchIncident = async () => {
    try {
      const data = await getIncident(id);
      setIncident(data);
    } catch (error) {
      console.error("Failed to fetch incident", error);
      navigate('/incidents');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await updateIncidentStatus(id, newStatus);
      fetchIncident();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this incident?")) {
      try {
        await deleteIncident(id);
        navigate('/incidents');
      } catch (error) {
        console.error("Failed to delete incident", error);
      }
    }
  };

  if (loading) return <div className="loader">Loading incident details...</div>;
  if (!incident) return null;

  return (
    <div>
      <div className="header-actions">
        <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
          <button className="btn btn-secondary" onClick={() => navigate('/incidents')} style={{padding:'0.5rem'}}>
            <ArrowLeft size={20} />
          </button>
          <h1 className="page-title" style={{marginBottom: 0}}>Incident #{incident.id}</h1>
        </div>
        <div style={{display:'flex', gap:'1rem'}}>
          <button className="btn btn-primary" onClick={() => navigate(`/incidents/${incident.id}/edit`)}>
            <Edit2 size={18} /> Edit
          </button>
          <button className="btn" style={{backgroundColor: 'var(--priority-critical)', color: 'white'}} onClick={handleDelete}>
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>

      <div className="card" style={{marginBottom:'2rem'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.5rem'}}>
          <h2 style={{fontSize:'1.5rem', fontWeight:'600'}}>{incident.title}</h2>
          <div style={{display:'flex', gap:'0.5rem'}}>
            <select 
              className="form-control" 
              style={{width:'auto', padding:'0.25rem 0.75rem', borderRadius:'9999px', fontSize:'0.75rem', fontWeight:'600'}}
              value={incident.status}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="OPEN">OPEN</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="RESOLVED">RESOLVED</option>
              <option value="CLOSED">CLOSED</option>
            </select>
            <span className={`badge badge-priority-${incident.priority.toLowerCase()}`}>{incident.priority}</span>
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem', marginBottom:'2rem'}}>
          <div>
            <div className="form-label">Category</div>
            <div style={{color:'var(--text-main)'}}>{incident.category}</div>
          </div>
          <div>
            <div className="form-label">Assigned To</div>
            <div style={{color:'var(--text-main)'}}>{incident.assigned_to || 'Unassigned'}</div>
          </div>
          <div>
            <div className="form-label">Created At</div>
            <div style={{color:'var(--text-main)'}}>{new Date(incident.created_at).toLocaleString()}</div>
          </div>
          <div>
            <div className="form-label">Updated At</div>
            <div style={{color:'var(--text-main)'}}>{new Date(incident.updated_at).toLocaleString()}</div>
          </div>
        </div>

        <div>
          <div className="form-label">Description</div>
          <div style={{color:'var(--text-main)', whiteSpace:'pre-wrap', backgroundColor:'rgba(0,0,0,0.2)', padding:'1rem', borderRadius:'var(--radius-md)'}}>
            {incident.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail;
