import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../api';
import { Activity, AlertTriangle, CheckCircle, Clock, Target } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (loading) return <div className="loader">Loading Dashboard...</div>;

  if (!stats) return <div className="loader">Failed to load statistics.</div>;

  return (
    <div>
      <div className="header-actions">
        <h1 className="page-title">Dashboard Overview</h1>
      </div>
      
      <div className="dashboard-stats">
        <div className="card stat-card">
          <Activity size={32} className="stat-value total" style={{margin:'0 auto 10px'}} />
          <div className="stat-title">Total Incidents</div>
          <div className="stat-value total">{stats.total_incidents}</div>
        </div>
        <div className="card stat-card">
          <Target size={32} className="stat-value open" style={{margin:'0 auto 10px'}} />
          <div className="stat-title">Open</div>
          <div className="stat-value open">{stats.open}</div>
        </div>
        <div className="card stat-card">
          <Clock size={32} className="stat-value progress" style={{margin:'0 auto 10px'}} />
          <div className="stat-title">In Progress</div>
          <div className="stat-value progress">{stats.in_progress}</div>
        </div>
        <div className="card stat-card">
          <CheckCircle size={32} className="stat-value resolved" style={{margin:'0 auto 10px'}} />
          <div className="stat-title">Resolved</div>
          <div className="stat-value resolved">{stats.resolved}</div>
        </div>
        <div className="card stat-card">
          <AlertTriangle size={32} className="stat-value critical" style={{margin:'0 auto 10px'}} />
          <div className="stat-title">Critical Priority</div>
          <div className="stat-value critical">{stats.critical}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
