import React, { useEffect, useState } from 'react';
import { serviceApi } from '../../api/serviceApi';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import Loader from '../../components/Loader/Loader';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await serviceApi.getServices();
        setServices(data);
      } catch (error) {
        console.error('Failed to load services', error);
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
      <header className="page-header">
        <h1 className="page-title">Our <span className="text-gradient">Core Services</span></h1>
        <p className="page-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Explore our range of development and design plans customized to fit startups and corporate workflows.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
