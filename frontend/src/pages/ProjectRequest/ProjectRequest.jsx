import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { serviceApi } from '../../api/serviceApi';
import { projectApi } from '../../api/projectApi';
import Loader from '../../components/Loader/Loader';
import { FileText, AlertTriangle, ArrowLeft, LogIn } from 'lucide-react';

const ProjectRequest = () => {
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', budget: '', service: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await serviceApi.getServices();
        setServices(data);
        
        // Check if serviceId is passed as search query parameter
        const preselectedId = searchParams.get('serviceId');
        if (preselectedId) {
          const matched = data.find(s => s.id.toString() === preselectedId);
          setFormData(prev => ({
            ...prev,
            service: preselectedId,
            budget: matched ? parseFloat(matched.price).toString() : ''
          }));
        }
      } catch (err) {
        console.error('Failed to load services', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      loadServices();
    } else {
      setLoading(false);
    }
  }, [user, searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'service' && value !== '') {
        const matched = services.find(s => s.id.toString() === value);
        if (matched) {
          updated.budget = parseFloat(matched.price).toString();
        }
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await projectApi.createProject({
        title: formData.title,
        description: formData.description,
        budget: parseFloat(formData.budget),
        service: formData.service ? parseInt(formData.service) : null
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to log project request. Ensure all required fields are correctly completed.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader fullPage />;
  }

  if (!user) {
    return (
      <div className="container" style={{ padding: '80px 24px', animation: 'fadeIn var(--transition-normal)', textAlign: 'center', maxWidth: '600px' }}>
        <div className="card-glass" style={{ padding: '50px 40px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <AlertTriangle size={48} color="hsl(var(--accent))" />
          <h2 style={{ fontSize: '1.8rem' }}>Authentication Required</h2>
          <p style={{ color: 'hsl(var(--text-secondary))' }}>
            You must register or log in to a ProjectXCode client account in order to submit customized project requests and access the invoice payments dashboard.
          </p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
            <Link to="/login?redirect=/project-request" className="btn btn-primary" style={{ gap: '6px' }}>
              <LogIn size={18} />
              Login Now
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Register Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '60px 24px', animation: 'fadeIn var(--transition-normal)', maxWidth: '680px' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'hsl(var(--text-muted))', marginBottom: '24px', fontSize: '0.9rem' }}>
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '12px' }}>Request a <span className="text-gradient">Project</span></h1>
        <p style={{ color: 'hsl(var(--text-secondary))' }}>
          Outline your application parameters, features, and target launch window. Our engineers will audit and contact you.
        </p>
      </header>

      <div className="card-glass" style={{ padding: '40px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 0, 0, 0.05)', border: '1px solid rgba(255, 0, 0, 0.2)', padding: '12px', borderRadius: 'var(--radius-md)', color: '#ff5050', fontSize: '0.9rem' }}>
              <AlertTriangle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="title">Project Campaign Title</label>
            <input 
              type="text" 
              name="title" 
              id="title"
              className="form-input" 
              placeholder="e.g. Nexus FinTech Mobile App" 
              value={formData.title} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="service">Select Base Service Package</label>
            <select 
              name="service" 
              id="service"
              className="form-input" 
              value={formData.service} 
              onChange={handleChange}
              style={{ background: 'hsl(var(--bg-surface))', color: 'hsl(var(--text-primary))' }}
            >
              <option value="">Custom Scope (Consultancy required)</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.title} (${parseFloat(s.price).toLocaleString()})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="budget">Estimated Budget ($ USD)</label>
            <input 
              type="number" 
              name="budget" 
              id="budget"
              className="form-input" 
              placeholder="e.g. 2500" 
              value={formData.budget} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">Project Description & Feature Requirements</label>
            <textarea 
              name="description" 
              id="description"
              className="form-input" 
              placeholder="Outline specific layout integrations, expected user loads, API integrations, etc..." 
              value={formData.description} 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginTop: '10px' }} disabled={submitting}>
            {submitting ? 'Submitting request...' : (
              <>
                Submit Project Request
                <FileText size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectRequest;
