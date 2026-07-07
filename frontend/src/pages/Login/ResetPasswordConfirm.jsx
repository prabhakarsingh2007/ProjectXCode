import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

const ResetPasswordConfirm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!uid || !token) {
      setError('Invalid link. Missing token parameters in URL query.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/accounts/password-reset/confirm/', {
        uid: uid,
        token: token,
        new_password: formData.password
      });
      setSuccess(true);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('This reset token is invalid or has expired.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ padding: '80px 24px', animation: 'fadeIn var(--transition-normal)', maxWidth: '480px' }}>
      <div className="card-glass" style={{ padding: '40px' }}>
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div className="flex-center" style={{ width: '48px', height: '48px', background: 'hsla(var(--primary), 0.1)', color: 'hsl(var(--primary))', borderRadius: '50%', margin: '0 auto 16px' }}>
            <ShieldCheck size={24} />
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Set New Password</h2>
          <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.85rem' }}>Create a secure, strong password for your account</p>
        </header>

        {success ? (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <CheckCircle2 size={40} color="hsl(var(--secondary))" />
            <h3 style={{ fontSize: '1.2rem' }}>Password Updated</h3>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', marginBottom: '10px' }}>
              Your password has been reset successfully. You can now use your new password to sign in.
            </p>
            <Link to="/login" className="btn btn-primary" style={{ width: '100%' }}>
              Proceed to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 0, 0, 0.05)', border: '1px solid rgba(255, 0, 0, 0.2)', padding: '12px', borderRadius: 'var(--radius-md)', color: '#ff5050', fontSize: '0.9rem' }}>
                <AlertTriangle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="password">New Password</label>
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

            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirm New Password</label>
              <input 
                type="password" 
                name="confirmPassword" 
                id="confirmPassword"
                className="form-input" 
                placeholder="••••••••" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }} disabled={submitting}>
              {submitting ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
