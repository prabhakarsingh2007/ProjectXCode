import React from 'react';
import { Cpu, Eye, Shield, Users, Layers, Award } from 'lucide-react';

const About = () => {
  const values = [
    { icon: Cpu, title: 'Modern Tech Stack', desc: 'We design software suites utilizing modern React frontends coupled with secure Django REST framework layers.' },
    { icon: Shield, title: 'Enterprise-Grade Security', desc: 'Secure state-management, token authentications, and containerized deployments ensure strict safety compliance.' },
    { icon: Users, title: 'Collaborative Engineering', desc: 'We act as your dedicated tech partner, keeping communications open from staging runs to production deployments.' },
  ];

  return (
    <div className="container" style={{ padding: '60px 24px', animation: 'fadeIn var(--transition-normal)', display: 'flex', flexDirection: 'column', gap: '80px' }}>
      
      {/* Hero Section */}
      <section style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3.2rem', marginBottom: '24px' }}>Who We <span className="text-gradient">Are</span></h1>
        <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '1.15rem', lineHeight: '1.8' }}>
          ProjectXCode is a team of software engineers, designers, and system administrators. We bridge the gap between creative UI/UX designs and bulletproof backend configurations, enabling agencies and startups to deploy software.
        </p>
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
      <section className="card-glass" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center', '@media (maxWidth: 768px)': { gridTemplateColumns: '1fr' } }}>
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
