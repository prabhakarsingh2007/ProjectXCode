import React, { useEffect, useState } from 'react';
import Hero from '../../components/Hero/Hero';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import PortfolioCard from '../../components/PortfolioCard/PortfolioCard';
import Testimonial from '../../components/Testimonial/Testimonial';
import Loader from '../../components/Loader/Loader';
import { serviceApi } from '../../api/serviceApi';
import { contactApi } from '../../api/contactApi';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [servicesRes, portfolioRes, testimonialsRes] = await Promise.all([
          serviceApi.getServices(),
          contactApi.getPortfolioItems(),
          contactApi.getTestimonials(),
        ]);
        setServices(servicesRes.slice(0, 3)); // show top 3
        setPortfolio(portfolioRes.slice(0, 2)); // show top 2
        setTestimonials(testimonialsRes.slice(0, 2)); // show top 2
      } catch (error) {
        console.error('Failed to load home page data', error);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  if (loading) {
    return <Loader fullPage />;
  }

  return (
    <div style={{ animation: 'fadeIn var(--transition-normal)' }}>
      {/* Hero Banner */}
      <Hero />

      {/* Services Highlight Section */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'hsl(var(--secondary))', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
            <Sparkles size={14} />
            <span>Core Capabilities</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>What We Do Best</h2>
          <p style={{ color: 'hsl(var(--text-secondary))', maxWidth: '600px', margin: '0 auto 50px' }}>
            We leverage modern frontends and robust database architectures to create production solutions.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {services.map(s => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>

          <div style={{ marginTop: '40px' }}>
            <Link to="/services" className="btn btn-secondary" style={{ gap: '6px' }}>
              View All Services
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section style={{ padding: '80px 0', background: 'hsla(var(--primary), 0.02)', borderTop: '1px solid hsl(var(--border))', borderBottom: '1px solid hsl(var(--border))' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'hsl(var(--primary))', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
            <Sparkles size={14} />
            <span>Featured Case Studies</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Recent Deliveries</h2>
          <p style={{ color: 'hsl(var(--text-secondary))', maxWidth: '600px', margin: '0 auto 50px' }}>
            Explore how we partnered with global companies to build their core portal services.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', '@media (maxWidth: 768px)': { gridTemplateColumns: '1fr' } }}>
            {portfolio.map(item => (
              <PortfolioCard key={item.id} project={item} />
            ))}
          </div>

          <div style={{ marginTop: '40px' }}>
            <Link to="/completed-projects" className="btn btn-secondary" style={{ gap: '6px' }}>
              Browse Complete Gallery
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'hsl(var(--accent))', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
            <Sparkles size={14} />
            <span>Client Praise</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>What Clients Say</h2>
          <p style={{ color: 'hsl(var(--text-secondary))', maxWidth: '600px', margin: '0 auto 50px' }}>
            Feedback from technical product leaders and founders who launched with us.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {testimonials.map(t => (
              <Testimonial key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Direct CTA Section */}
      <section style={{ padding: '100px 0', background: 'radial-gradient(circle at center, hsla(var(--primary), 0.08) 0%, transparent 70%)', position: 'relative' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="card-glass" style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 40px', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
            <h2 style={{ fontSize: '2.8rem' }}>Ready to Scale Your Product?</h2>
            <p style={{ color: 'hsl(var(--text-secondary))', maxWidth: '500px', fontSize: '1.1rem' }}>
              Partner with ProjectXCode today. Let's design, engineer, and deploy your next-generation software.
            </p>
            <Link to="/project-request" className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '1.1rem' }}>
              Launch Your Project Request
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
