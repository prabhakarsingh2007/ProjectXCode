import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const PricingCard = ({ service }) => {
  // Extract bullet points from description if applicable, or simulate standard features based on price
  const isPremium = service.price > 1500;
  
  const mockFeatures = isPremium 
    ? ['Dedicated Project Manager', 'Unlimited Revisions', '24/7 Priority Support', 'Full Source Access', 'Production Deployment']
    : ['Standard Project Engineering', '3 Rounds of Revisions', 'Email Support', 'Complete Source Handover', 'Launch Assistance'];

  return (
    <div className={`card-glass ${isPremium ? 'premium-glow' : ''}`} style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '24px', 
      textAlign: 'center', 
      height: '100%',
      position: 'relative',
      borderWidth: isPremium ? '2px' : '1px',
      borderColor: isPremium ? 'hsl(var(--primary))' : 'hsl(var(--border))'
    }}>
      {isPremium && (
        <div style={{ 
          position: 'absolute', 
          top: '-14px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)', 
          color: '#fff', 
          padding: '4px 16px', 
          borderRadius: 'var(--radius-full)', 
          fontSize: '0.75rem', 
          fontWeight: '700', 
          textTransform: 'uppercase', 
          letterSpacing: '0.05em' 
        }}>
          Most Popular
        </div>
      )}
      
      <div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{service.title}</h3>
        <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.85rem', minHeight: '40px' }}>{service.description.substring(0, 80)}...</p>
      </div>

      <div style={{ margin: '10px 0' }}>
        <span style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }} className="text-gradient">${parseFloat(service.price).toLocaleString()}</span>
        {service.billing_cycle !== 'one_time' ? (
          <span style={{ color: 'hsl(var(--text-muted))', fontSize: '0.95rem' }}> / {service.billing_cycle}</span>
        ) : (
          <span style={{ color: 'hsl(var(--text-muted))', fontSize: '0.95rem' }}> one-time</span>
        )}
      </div>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left', margin: '10px 0', flexGrow: 1 }}>
        {mockFeatures.map((feat, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'hsl(var(--text-secondary))' }}>
            <div className="flex-center" style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'hsla(var(--primary), 0.1)', color: 'hsl(var(--primary))' }}>
              <Check size={12} strokeWidth={3} />
            </div>
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      <Link 
        to={`/project-request?serviceId=${service.id}`} 
        className={`btn ${isPremium ? 'btn-primary' : 'btn-secondary'}`}
        style={{ width: '100%', padding: '12px' }}
      >
        Choose Plan
      </Link>
    </div>
  );
};

export default PricingCard;
