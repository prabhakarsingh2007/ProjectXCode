import React from 'react';
import { Calendar, Briefcase, Lock, ExternalLink } from 'lucide-react';

const PortfolioCard = ({ project }) => {
  const imageUrl = project.image_url || (project.image ? `/media/${project.image}` : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80');

  // Split comma-separated technologies
  const techStack = project.technologies 
    ? project.technologies.split(',').map(tech => tech.trim()).filter(Boolean) 
    : [];

  return (
    <div className="card-glass" style={{ padding: '0px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Image Header with Badges */}
      <div style={{ width: '100%', height: '220px', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={imageUrl} 
          alt={project.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        
        {/* Category Badge */}
        <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'hsla(var(--primary), 0.95)', color: '#fff', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {project.category}
        </div>

        {/* Confidential Badge */}
        {project.is_confidential && (
          <div style={{ 
            position: 'absolute', 
            top: '16px', 
            right: '16px', 
            background: 'rgba(239, 68, 68, 0.9)', 
            color: '#fff', 
            padding: '4px 10px', 
            borderRadius: 'var(--radius-full)', 
            fontSize: '0.7rem', 
            fontWeight: '600', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
          }}>
            <Lock size={12} />
            Confidential
          </div>
        )}
        
        {/* Status Overlay */}
        <div style={{ 
          position: 'absolute', 
          bottom: '12px', 
          right: '12px', 
          background: project.status === 'completed' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(245, 158, 11, 0.9)', 
          color: '#fff', 
          padding: '2px 8px', 
          borderRadius: '4px', 
          fontSize: '0.7rem', 
          fontWeight: '700', 
          textTransform: 'uppercase' 
        }}>
          {project.status}
        </div>
      </div>
      
      {/* Content Area */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', flexGrow: 1 }}>
        <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>{project.title}</h3>
        <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem', flexGrow: 1, lineHeight: '1.6' }}>{project.description}</p>
        
        {/* Technologies Stack Tags */}
        {techStack.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '4px 0' }}>
            {techStack.map((tech, idx) => (
              <span key={idx} style={{ 
                fontSize: '0.75rem', 
                padding: '3px 8px', 
                background: 'hsla(var(--primary), 0.08)', 
                color: 'hsl(var(--secondary))', 
                borderRadius: '4px', 
                border: '1px solid hsla(var(--primary), 0.15)',
                fontWeight: '500'
              }}>
                {tech}
              </span>
            ))}
          </div>
        )}
        
        {/* Date and Client Info */}
        <div style={{ borderTop: '1px solid hsl(var(--border))', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Briefcase size={14} />
            <span>{project.client || 'Client Project'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} />
            {project.status === 'completed' && project.completion_date ? (
              <span>{new Date(project.completion_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
            ) : (
              <span style={{ color: 'hsl(var(--secondary))', fontWeight: '600' }}>Active / Ongoing</span>
            )}
          </div>
        </div>

        {/* Buttons / CTA Section */}
        {(!project.is_confidential || project.live_url || project.github_url) && (
          <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
            {project.live_url && (
              <a 
                href={project.live_url} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-primary" 
                style={{ flex: 1, padding: '8px 16px', fontSize: '0.8rem', gap: '6px' }}
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
            {project.github_url && (
              <a 
                href={project.github_url} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-secondary" 
                style={{ flex: 1, padding: '8px 16px', fontSize: '0.8rem', gap: '6px' }}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                GitHub Repo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioCard;
