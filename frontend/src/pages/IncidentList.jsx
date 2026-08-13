import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIncidents, searchIncidents } from '../api';
import { Search } from 'lucide-react';

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      const data = await getIncidents();
      setIncidents(data);
    } catch (error) {
      console.error("Failed to fetch incidents", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (search.trim()) {
        const data = await searchIncidents(search);
        setIncidents(data);
      } else {
        fetchIncidents();
      }
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="header-actions">
        <h1 className="page-title">Incidents</h1>
        <button className="btn btn-primary" onClick={() => navigate('/incidents/new')}>
          Create Incident
        </button>
      </div>

      <form onSubmit={handleSearch} className="search-bar">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search incidents..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-secondary">
          <Search size={18} /> Search
        </button>
      </form>

      {loading ? (
        <div className="loader">Loading incidents...</div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Category</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {incidents.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>No incidents found.</td>
                </tr>
              ) : (
                incidents.map((incident) => (
                  <tr key={incident.id} onClick={() => navigate(`/incidents/${incident.id}`)}>
                    <td>#{incident.id}</td>
                    <td style={{fontWeight: 500, color: 'var(--text-main)'}}>{incident.title}</td>
                    <td><span className={`badge badge-status-${incident.status.toLowerCase()}`}>{incident.status}</span></td>
                    <td><span className={`badge badge-priority-${incident.priority.toLowerCase()}`}>{incident.priority}</span></td>
                    <td>{incident.category}</td>
                    <td>{new Date(incident.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IncidentList;
