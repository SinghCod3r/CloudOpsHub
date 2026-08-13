import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIncident, createIncident, updateIncident } from '../api';
import { Save, X } from 'lucide-react';

const IncidentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [loading, setLoading] = useState(isEdit);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'LOW',
    status: 'OPEN',
    category: 'APPLICATION',
    assigned_to: ''
  });

  useEffect(() => {
    if (isEdit) {
      const fetchIncident = async () => {
        try {
          const data = await getIncident(id);
          setFormData({
            title: data.title,
            description: data.description,
            priority: data.priority,
            status: data.status,
            category: data.category,
            assigned_to: data.assigned_to || ''
          });
        } catch (error) {
          console.error("Failed to fetch incident", error);
          navigate('/incidents');
        } finally {
          setLoading(false);
        }
      };
      fetchIncident();
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateIncident(id, formData);
        navigate(`/incidents/${id}`);
      } else {
        const newIncident = await createIncident(formData);
        navigate(`/incidents/${newIncident.id}`);
      }
    } catch (error) {
      console.error("Failed to save incident", error);
    }
  };

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div>
      <div className="header-actions">
        <h1 className="page-title">{isEdit ? 'Edit Incident' : 'Create New Incident'}</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input 
              type="text" 
              className="form-control" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem'}}>
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select className="form-control" name="priority" value={formData.priority} onChange={handleChange}>
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-control" name="category" value={formData.category} onChange={handleChange}>
                <option value="NETWORK">NETWORK</option>
                <option value="DATABASE">DATABASE</option>
                <option value="APPLICATION">APPLICATION</option>
                <option value="SECURITY">SECURITY</option>
                <option value="INFRASTRUCTURE">INFRASTRUCTURE</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>
          </div>

          {isEdit && (
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-control" name="status" value={formData.status} onChange={handleChange}>
                <option value="OPEN">OPEN</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Assigned To</label>
            <input 
              type="text" 
              className="form-control" 
              name="assigned_to" 
              value={formData.assigned_to} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea 
              className="form-control" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div style={{display:'flex', gap:'1rem', marginTop:'2rem'}}>
            <button type="submit" className="btn btn-primary">
              <Save size={18} /> {isEdit ? 'Save Changes' : 'Create Incident'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
              <X size={18} /> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentForm;
