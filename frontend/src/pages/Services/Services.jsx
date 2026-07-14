import React, { useEffect, useState } from 'react';
import { serviceApi } from '../../api/serviceApi';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import Loader from '../../components/Loader/Loader';
import { Sparkles } from 'lucide-react';

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
    <div className="tw-bg-[#070B17] tw-text-white tw-min-h-screen tw-font-sans tw-overflow-x-hidden tw-relative tw-pb-24">
      
      {/* Background ambient glow blobs */}
      <div className="tw-absolute tw-top-[-100px] tw-left-[-100px] tw-w-[500px] tw-h-[500px] tw-bg-indigo-600/10 tw-rounded-full tw-filter tw-blur-[120px] tw-pointer-events-none"></div>
      <div className="tw-absolute tw-bottom-[20%] tw-right-[-100px] tw-w-[400px] tw-h-[400px] tw-bg-blue-600/10 tw-rounded-full tw-filter tw-blur-[100px] tw-pointer-events-none"></div>

      <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-pt-32 tw-space-y-16">
        
        {/* Page Header */}
        <header className="tw-text-center tw-max-w-3xl tw-mx-auto tw-space-y-6">
          <div className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-indigo-400 tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest">
            <Sparkles size={14} />
            <span>Service Catalog</span>
          </div>
          <h1 className="tw-text-4xl sm:tw-text-5xl tw-font-black tw-tracking-tight tw-text-white">
            Our <span className="tw-bg-gradient-to-r tw-from-indigo-400 tw-to-cyan-400 tw-bg-clip-text tw-text-transparent">Core Services</span>
          </h1>
          <p className="tw-text-xs sm:tw-text-sm tw-text-[#A5B4C3] tw-leading-relaxed">
            Explore our range of development and design plans customized to fit startups and corporate workflows.
          </p>
        </header>

        {/* Services Grid */}
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Services;
