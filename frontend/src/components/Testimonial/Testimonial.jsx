import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonial = ({ testimonial }) => {
  return (
    <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '24px', right: '24px', color: 'hsla(var(--primary), 0.15)' }}>
        <Quote size={40} fill="currentColor" />
      </div>
      
      <div style={{ display: 'flex', gap: '4px', color: '#ffb020' }}>
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            fill={i < testimonial.rating ? 'currentColor' : 'none'} 
            stroke={i < testimonial.rating ? 'none' : 'currentColor'}
          />
        ))}
      </div>
      
      <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem', fontStyle: 'italic', lineScale: '1.6', flexGrow: 1 }}>
        "{testimonial.message}"
      </p>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid hsl(var(--border))', paddingTop: '16px' }}>
        <div className="flex-center" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)', color: '#fff', fontWeight: '700', fontSize: '0.95rem' }}>
          {testimonial.client_name.charAt(0)}
        </div>
        <div>
          <h4 style={{ fontSize: '0.95rem' }}>{testimonial.client_name}</h4>
          <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>{testimonial.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
