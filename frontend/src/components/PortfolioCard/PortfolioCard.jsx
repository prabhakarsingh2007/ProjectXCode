import React from 'react';
import { Calendar, Briefcase } from 'lucide-react';

const PortfolioCard = ({ project }) => {
  const imageUrl = project.image_url || (project.image ? `/media/${project.image}` : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80');

  return (
    <div className="card-glass" style={{ padding: '0px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ width: '100%', height: '220px', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={imageUrl} 
          alt={project.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'hsla(var(--primary), 0.95)', color: '#fff', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {project.category}
        </div>
      </div>
      
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', flexGrow: 1 }}>
        <h3 style={{ fontSize: '1.25rem' }}>{project.title}</h3>
        <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', flexGrow: 1 }}>{project.description}</p>
        
        <div style={{ borderTop: '1px solid hsl(var(--border))', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Briefcase size={14} />
            <span>{project.client || 'Internal Project'}</span>
          </div>
          {project.completion_date && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={14} />
              <span>{new Date(project.completion_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
