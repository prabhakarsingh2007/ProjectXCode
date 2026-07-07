import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { Mail, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await api.post('/accounts/password-reset/', { email });
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please verify your internet connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ padding: '80px 24px', animation: 'fadeIn var(--transition-normal)', maxWidth: '480px' }}>
      <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'hsl(var(--text-muted))', marginBottom: '24px', fontSize: '0.9rem' }}>
        <ArrowLeft size={16} />
        Back to Login
      </Link>

      <div className="card-glass" style={{ padding: '40px' }}>
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div className="flex-center" style={{ width: '48px', height: '48px', background: 'hsla(var(--primary), 0.1)', color: 'hsl(var(--primary))', borderRadius: '50%', margin: '0 auto 16px' }}>
            <Mail size={24} />
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Forgot Password?</h2>
          <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.85rem' }}>No worries, enter your email to receive a password reset link.</p>
        </header>

        {success ? (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <CheckCircle2 size={40} color="hsl(var(--secondary))" />
            <h3 style={{ fontSize: '1.2rem' }}>Reset Link Sent</h3>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem' }}>
              If an account is associated with <strong>{email}</strong>, we have dispatched a password reset link. Please check your spam folder if it doesn't arrive shortly.
            </p>
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
              <label className="form-label" htmlFor="email">Email Address</label>
              <input 
                type="email" 
                name="email" 
                id="email"
                className="form-input" 
                placeholder="e.g. john@company.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }} disabled={submitting}>
              {submitting ? 'Sending Request...' : 'Send Reset Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
