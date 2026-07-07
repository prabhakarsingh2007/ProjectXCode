import React, { useState } from 'react';
import { contactApi } from '../../api/contactApi';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await contactApi.submitEnquiry(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setError('Failed to submit enquiry. Please double-check the server connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ padding: '60px 24px', animation: 'fadeIn var(--transition-normal)', maxWidth: '680px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3.0rem', marginBottom: '16px' }}>Contact <span className="text-gradient">Our Team</span></h1>
        <p style={{ color: 'hsl(var(--text-secondary))' }}>
          Have an enquiry or want a customized quote? Send us a message and our managers will reply in under 24 hours.
        </p>
      </header>

      <div className="card-glass" style={{ padding: '40px' }}>
        {success ? (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', padding: '20px 0' }}>
            <CheckCircle2 size={48} color="hsl(var(--secondary))" />
            <h3 style={{ fontSize: '1.5rem' }}>Message Received Successfully!</h3>
            <p style={{ color: 'hsl(var(--text-secondary))' }}>
              Thank you for reaching out. We have logged your enquiry and our staff will respond via email shortly.
            </p>
            <button className="btn btn-primary" onClick={() => setSuccess(false)} style={{ marginTop: '10px' }}>
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 0, 0, 0.05)', border: '1px solid rgba(255, 0, 0, 0.2)', padding: '12px', borderRadius: 'var(--radius-md)', color: '#ff5050', fontSize: '0.9rem' }}>
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}
            
            <div className="form-group">
              <label className="form-label" htmlFor="name">Your Name</label>
              <input 
                type="text" 
                name="name" 
                id="name"
                className="form-input" 
                placeholder="John Doe" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Your Email Address</label>
              <input 
                type="email" 
                name="email" 
                id="email"
                className="form-input" 
                placeholder="john.doe@company.com" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="subject">Subject</label>
              <input 
                type="text" 
                name="subject" 
                id="subject"
                className="form-input" 
                placeholder="Project Inquiry / Sales Request" 
                value={formData.subject} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Message Description</label>
              <textarea 
                name="message" 
                id="message"
                className="form-input" 
                placeholder="Tell us about your project requirements..." 
                value={formData.message} 
                onChange={handleChange} 
                required 
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginTop: '10px' }} disabled={submitting}>
              {submitting ? 'Sending...' : (
                <>
                  Send Message
                  <Send size={18} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
