import React from 'react';
import { Code, Palette, Activity, Layers, Terminal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap = {
  Code: Code,
  Palette: Palette,
  Activity: Activity,
  Layers: Layers
};

const ServiceCard = ({ service }) => {
  const IconComponent = iconMap[service.icon] || Terminal;

  return (
    <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', height: '100%' }}>
      <div className="flex-center" style={{ background: 'hsla(var(--primary), 0.1)', color: 'hsl(var(--primary))', width: '56px', height: '56px', borderRadius: 'var(--radius-md)', alignSelf: 'flex-start' }}>
        <IconComponent size={28} />
      </div>
      <h3 style={{ fontSize: '1.4rem' }}>{service.title}</h3>
      <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem', flexGrow: 1 }}>{service.description}</p>
      
      <div style={{ borderTop: '1px solid hsl(var(--border))', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', display: 'block', textTransform: 'uppercase' }}>Starting from</span>
          <span style={{ fontSize: '1.4rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }} className="text-gradient">${parseFloat(service.price).toLocaleString()}</span>
          {service.billing_cycle !== 'one_time' && <span style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))' }}> / {service.billing_cycle}</span>}
        </div>
        
        <Link to="/project-request" className="btn btn-secondary" style={{ padding: '8px 12px', border: 'none', background: 'hsla(var(--primary), 0.05)' }} title="Request Service">
          <ArrowRight size={18} color="hsl(var(--primary))" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
