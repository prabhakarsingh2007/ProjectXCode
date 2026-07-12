import React from 'react';
import { Cpu, Shield, Users, Layers, Mail, Phone, MapPin, Building } from 'lucide-react';

const About = () => {
  const values = [
    { icon: Cpu, title: 'Modern Tech Stack', desc: 'We design software suites utilizing modern React frontends coupled with secure Django REST framework layers.' },
    { icon: Shield, title: 'Enterprise-Grade Security', desc: 'Secure state-management, token authentications, and containerized deployments ensure strict safety compliance.' },
    { icon: Users, title: 'Collaborative Engineering', desc: 'We act as your dedicated tech partner, keeping communications open from staging runs to production deployments.' },
  ];

  return (
    <div className="container" style={{ padding: '60px 24px', animation: 'fadeIn var(--transition-normal)', display: 'flex', flexDirection: 'column', gap: '80px' }}>
      
      {/* Hero Section */}
      <section className="page-header" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="page-title" style={{ fontSize: '3.2rem' }}>Who We <span className="text-gradient">Are</span></h1>
        <p className="page-subtitle" style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
          ProjectXCode is a premium full-stack software agency. We bridge the gap between creative UI/UX designs and bulletproof backend configurations, enabling agencies, businesses, and startups to deploy state-of-the-art software.
        </p>
      </section>

      {/* Meet the Founder Section */}
      <section className="card-glass founder-card">
        <div className="founder-avatar-container">
          <div className="founder-avatar" style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src="https://media.licdn.com/dms/image/v2/D4E03AQGfSEK6nFRsTg/profile-displayphoto-scale_400_400/B4EZ70wAY8HoAg-/0/1782222689412?e=1785369600&v=beta&t=Xcdwgx8hgvYZAacsQve7uuEJ5LUXotaOkqb1X5p3lJk" 
              alt="Prabhakar Kumar Singh" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Prabhakar Kumar Singh</h3>
            <span style={{ color: 'hsl(var(--primary))', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Founder & Lead Developer</span>
          </div>
        </div>
        
        <div className="founder-info">
          <h2 style={{ fontSize: '2.0rem' }}>Meet the <span className="text-gradient">Founder</span></h2>
          <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: '1.7', fontSize: '0.95rem' }}>
            👋 Hi, I'm Prabhakar Kumar Singh - Founder & Full Stack Web Developer at Project X Code. I specialize in designing and developing modern websites, web applications, and custom software solutions using React, Django, Python, and PostgreSQL.
          </p>
          <p style={{ color: 'hsl(var(--text-secondary))', lineHeight: '1.7', fontSize: '0.95rem' }}>
            I also help students build high-quality final year projects with complete source code, documentation, and deployment support. My goal is to create secure, scalable, and user-friendly digital solutions for students, startups, businesses, and organizations.
          </p>
          
          <div className="founder-details-grid">
            <div className="founder-detail-item">
              <Building size={18} color="hsl(var(--primary))" />
              <div className="founder-detail-content">
                <span className="founder-detail-label">Brand</span>
                <span className="founder-detail-value">Project X Code</span>
              </div>
            </div>
            <div className="founder-detail-item">
              <MapPin size={18} color="hsl(var(--secondary))" />
              <div className="founder-detail-content">
                <span className="founder-detail-label">Location</span>
                <span className="founder-detail-value">Purnea, Bihar</span>
              </div>
            </div>
            <div className="founder-detail-item">
              <Mail size={18} color="hsl(var(--accent))" />
              <div className="founder-detail-content">
                <span className="founder-detail-label">Email</span>
                <span className="founder-detail-value">
                  <a href="mailto:prabhakarkumarsingh578@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                    prabhakarkumarsingh578@gmail.com
                  </a>
                </span>
              </div>
            </div>
            <div className="founder-detail-item">
              <Phone size={18} color="hsl(var(--secondary))" />
              <div className="founder-detail-content">
                <span className="founder-detail-label">Phone</span>
                <span className="founder-detail-value">+91 99999 99999</span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
            <a href="https://github.com/prabhakarsingh2007" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem', gap: '8px' }}>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              GitHub Profile
            </a>
            <a href="https://www.linkedin.com/in/prabhakar-singh-7880b9323/" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem', gap: '8px' }}>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              LinkedIn Profile
            </a>
          </div>
        </div>
      </section>

      {/* Grid Values */}
      <section style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '50px' }}>Our Code Values</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="card-glass" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="flex-center" style={{ background: 'hsla(var(--primary), 0.1)', color: 'hsl(var(--primary))', width: '48px', height: '48px', borderRadius: 'var(--radius-md)' }}>
                  <Icon size={24} />
                </div>
                <h3>{v.title}</h3>
                <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.92rem' }}>{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team Info / Achievements */}
      <section className="card-glass about-mission-grid">
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Our Mission</h2>
          <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.7' }}>
            We believe that software should not just run, it should thrive. By containerizing our stacks with Docker, setting up reverse-proxy caching with Nginx, and keeping our React components clean, we deliver platforms that perform at scale.
          </p>
          <div style={{ display: 'flex', gap: '30px' }}>
            <div>
              <span style={{ fontSize: '2.5rem', fontWeight: '800', display: 'block' }} className="text-gradient">99.9%</span>
              <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', textTransform: 'uppercase' }}>Uptime SLA</span>
            </div>
            <div>
              <span style={{ fontSize: '2.5rem', fontWeight: '800', display: 'block' }} className="text-gradient">50+</span>
              <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', textTransform: 'uppercase' }}>Apps Built</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ background: 'hsla(var(--primary), 0.05)', padding: '24px', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Layers color="hsl(var(--primary))" />
            <h4 style={{ fontSize: '1rem' }}>Django REST Framework</h4>
            <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>Secure databases & models</span>
          </div>
          <div style={{ background: 'hsla(var(--secondary), 0.05)', padding: '24px', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Cpu color="hsl(var(--secondary))" />
            <h4 style={{ fontSize: '1rem' }}>Vite & React</h4>
            <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>Fast virtual DOM render</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
