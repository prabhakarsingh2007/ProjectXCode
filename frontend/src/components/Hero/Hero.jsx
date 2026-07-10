import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2 } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'hsla(var(--primary), 0.1)', color: 'hsl(var(--primary))', padding: '8px 16px', borderRadius: 'var(--radius-full)', marginBottom: '24px', fontSize: '0.9rem', fontWeight: '500' }}>
          <Code2 size={16} />
          <span>Vite + React + Django REST API Architecture</span>
        </div>
        <h1 className="hero-title">
          We Engineer <span className="text-gradient">Premium</span> Digital Applications
        </h1>
        <p className="hero-subtitle">
          Accelerate your digital presence with enterprise-grade React interfaces coupled with high-performance, secure Django backend microservices.
        </p>
        <div className="flex-center" style={{ gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/project-request" className="btn btn-primary">
            Request a Project
            <ArrowRight size={18} />
          </Link>
          <Link to="/completed-projects" className="btn btn-secondary">
            Browse Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
