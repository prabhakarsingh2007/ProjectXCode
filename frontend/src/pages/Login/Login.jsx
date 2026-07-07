import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { KeyRound, AlertTriangle, ArrowRight } from 'lucide-react';

const Login = () => {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const redirectPath = searchParams.get('redirect') || '/dashboard';

  useEffect(() => {
    if (user) {
      navigate(redirectPath);
    }
  }, [user, navigate, redirectPath]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(formData);
      navigate(redirectPath);
    } catch (err) {
      console.error(err);
      setError('Invalid username or password. Please verify credentials and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ padding: '80px 24px', animation: 'fadeIn var(--transition-normal)', maxWidth: '480px' }}>
      <div className="card-glass" style={{ padding: '40px' }}>
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div className="flex-center" style={{ width: '48px', height: '48px', background: 'hsla(var(--primary), 0.1)', color: 'hsl(var(--primary))', borderRadius: '50%', margin: '0 auto 16px' }}>
            <KeyRound size={24} />
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Log In to Your Account</h2>
          <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.85rem' }}>Enter credentials to access your dashboard</p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 0, 0, 0.05)', border: '1px solid rgba(255, 0, 0, 0.2)', padding: '12px', borderRadius: 'var(--radius-md)', color: '#ff5050', fontSize: '0.9rem' }}>
              <AlertTriangle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <input 
              type="text" 
              name="username" 
              id="username"
              className="form-input" 
              placeholder="e.g. client" 
              value={formData.username} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label" htmlFor="password">Password</label>
              <Link to="/forgot-password" style={{ fontSize: '0.8rem', color: 'hsl(var(--primary))' }}>Forgot Password?</Link>
            </div>
            <input 
              type="password" 
              name="password" 
              id="password"
              className="form-input" 
              placeholder="••••••••" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginTop: '10px' }} disabled={submitting}>
            {submitting ? 'Authenticating...' : (
              <>
                Sign In
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlignment: 'center', marginTop: '24px', fontSize: '0.85rem', color: 'hsl(var(--text-muted))', display: 'flex', justifyContent: 'center', gap: '6px' }}>
          <span>Don't have an account?</span>
          <Link to="/register" style={{ color: 'hsl(var(--primary))', fontWeight: '600' }}>Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
