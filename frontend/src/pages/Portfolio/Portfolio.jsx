import React, { useEffect, useState } from 'react';
import { contactApi } from '../../api/contactApi';
import PortfolioCard from '../../components/PortfolioCard/PortfolioCard';
import Loader from '../../components/Loader/Loader';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const data = await contactApi.getPortfolioItems();
        setPortfolio(data);
      } catch (error) {
        console.error('Failed to load portfolio items', error);
      } finally {
        setLoading(false);
      }
    };
    loadPortfolio();
  }, []);

  if (loading) {
    return <Loader fullPage />;
  }

  return (
    <div className="container" style={{ padding: '60px 24px', animation: 'fadeIn var(--transition-normal)' }}>
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Project <span className="text-gradient">Portfolio</span></h1>
        <p style={{ color: 'hsl(var(--text-secondary))', maxWidth: '600px', margin: '0 auto' }}>
          Take a look at some of the digital platforms, dashboards, and portals we successfully engineered for our clients.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '30px' }}>
        {portfolio.map(project => (
          <PortfolioCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
