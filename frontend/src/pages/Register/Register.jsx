import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { UserPlus, AlertTriangle, ArrowRight } from 'lucide-react';

const Register = () => {
  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    company: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Registration failed. Username may already be taken or inputs are invalid.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ padding: '60px 24px', animation: 'fadeIn var(--transition-normal)', maxWidth: '540px' }}>
      <div className="card-glass" style={{ padding: '40px' }}>
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div className="flex-center" style={{ width: '48px', height: '48px', background: 'hsla(var(--primary), 0.1)', color: 'hsl(var(--primary))', borderRadius: '50%', margin: '0 auto 16px' }}>
            <UserPlus size={24} />
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Create Your Account</h2>
          <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.85rem' }}>Join ProjectXCode as a client to manage project pipelines</p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 0, 0, 0.05)', border: '1px solid rgba(255, 0, 0, 0.2)', padding: '12px', borderRadius: 'var(--radius-md)', color: '#ff5050', fontSize: '0.9rem' }}>
              <AlertTriangle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="first_name">First Name</label>
              <input 
                type="text" 
                name="first_name" 
                id="first_name"
                className="form-input" 
                placeholder="Jane" 
                value={formData.first_name} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="last_name">Last Name</label>
              <input 
                type="text" 
                name="last_name" 
                id="last_name"
                className="form-input" 
                placeholder="Doe" 
                value={formData.last_name} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="username">Username *</label>
            <input 
              type="text" 
              name="username" 
              id="username"
              className="form-input" 
              placeholder="e.g. janedoe" 
              value={formData.username} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address *</label>
            <input 
              type="email" 
              name="email" 
              id="email"
              className="form-input" 
              placeholder="jane@company.com" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password *</label>
            <input 
              type="password" 
              name="password" 
              id="password"
              className="form-input" 
              placeholder="Min. 8 characters" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number</label>
              <input 
                type="text" 
                name="phone" 
                id="phone"
                className="form-input" 
                placeholder="123-456-7890" 
                value={formData.phone} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="company">Company Name</label>
              <input 
                type="text" 
                name="company" 
                id="company"
                className="form-input" 
                placeholder="Doe Enterprises" 
                value={formData.company} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginTop: '10px' }} disabled={submitting}>
            {submitting ? 'Registering...' : (
              <>
                Register Account
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlignment: 'center', marginTop: '24px', fontSize: '0.85rem', color: 'hsl(var(--text-muted))', display: 'flex', justifyContent: 'center', gap: '6px' }}>
          <span>Already have an account?</span>
          <Link to="/login" style={{ color: 'hsl(var(--primary))', fontWeight: '600' }}>Log in here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
