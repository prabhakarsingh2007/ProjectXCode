import React, { useState } from 'react';
import { Star, X, CheckCircle } from 'lucide-react';

const ReviewModal = ({ isOpen, onClose, onSubmit, projectName }) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(null);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setSubmitting(true);
    try {
      await onSubmit({ rating, message: `[Project: ${projectName}] ${message}` });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setMessage('');
        setRating(5);
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
      alert('Failed to submit review.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.2s ease-out',
      padding: '24px'
    }}>
      <div className="card-glass" style={{ width: '100%', maxWidth: '480px', padding: '32px', position: 'relative' }}>
        {/* Close Button */}
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '16px', right: '16px', border: 'none', background: 'transparent', color: 'hsl(var(--text-muted))', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            <CheckCircle size={48} color="hsl(var(--secondary))" />
            <h3 style={{ fontSize: '1.4rem' }}>Review Logged!</h3>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem' }}>
              Thank you for sharing your experience. Your feedback is visible on the agency portfolio.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '4px' }}>Review Workspace</h3>
              <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.85rem' }}>
                How was your experience working on: <strong>{projectName}</strong>?
              </p>
            </div>

            {/* Star Rating Select */}
            <div className="form-group" style={{ alignItems: 'center' }}>
              <label className="form-label" style={{ marginBottom: '8px' }}>Star Rating</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px' }}
                  >
                    <Star 
                      size={28} 
                      fill={(hoverRating || rating) >= star ? 'hsl(var(--secondary))' : 'none'} 
                      color={(hoverRating || rating) >= star ? 'hsl(var(--secondary))' : 'hsl(var(--border))'} 
                      style={{ transition: 'all 0.15s ease' }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Text Message */}
            <div className="form-group">
              <label className="form-label" htmlFor="message">Your Review Commentary</label>
              <textarea
                id="message"
                className="form-input"
                placeholder="Share specific details about our software delivery, communication, or code quality..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                style={{ minHeight: '100px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
