import React, { useEffect, useState } from 'react';
import { serviceApi } from '../../api/serviceApi';
import PricingCard from '../../components/PricingCard/PricingCard';
import Loader from '../../components/Loader/Loader';

const Pricing = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await serviceApi.getServices();
        setServices(data);
      } catch (error) {
        console.error('Failed to load pricing packages', error);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  if (loading) {
    return <Loader fullPage />;
  }

  return (
    <div className="container" style={{ padding: '60px 24px', animation: 'fadeIn var(--transition-normal)' }}>
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Transparent <span className="text-gradient">Pricing</span></h1>
        <p style={{ color: 'hsl(var(--text-secondary))', maxWidth: '600px', margin: '0 auto' }}>
          Select the scope of service that fits your immediate objectives. All plans are supported by our React + Django engineers.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', maxWidth: '1000px', margin: '0 auto' }}>
        {services.map(service => (
          <PricingCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
