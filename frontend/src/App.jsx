import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, List, PlusCircle } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import IncidentList from './pages/IncidentList';
import IncidentDetail from './pages/IncidentDetail';
import IncidentForm from './pages/IncidentForm';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path)) ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <Activity size={24} />
        CloudOpsHub
      </Link>
      <div className="navbar-nav">
        <Link to="/" className={`nav-link ${isActive('/')}`}><LayoutDashboard size={18} style={{display:'inline', marginRight:'4px'}} />Dashboard</Link>
        <Link to="/incidents" className={`nav-link ${isActive('/incidents')}`}><List size={18} style={{display:'inline', marginRight:'4px'}} />Incidents</Link>
        <Link to="/incidents/new" className={`nav-link ${isActive('/incidents/new')}`}><PlusCircle size={18} style={{display:'inline', marginRight:'4px'}} />New Incident</Link>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/incidents" element={<IncidentList />} />
            <Route path="/incidents/new" element={<IncidentForm />} />
            <Route path="/incidents/:id" element={<IncidentDetail />} />
            <Route path="/incidents/:id/edit" element={<IncidentForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
