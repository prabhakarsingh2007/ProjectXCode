import React from 'react';
import { Code, Palette, Activity, Layers, Terminal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap = {
  Code: Code,
  Palette: Palette,
  Activity: Activity,
  Layers: Layers
};

const ServiceCard = ({ service }) => {
  const IconComponent = iconMap[service.icon] || Terminal;

  return (
    <div className="tw-bg-[#131C31]/50 tw-border tw-border-white/10 hover:tw-border-indigo-500/40 tw-transition-all tw-duration-500 tw-p-8 tw-rounded-[18px] tw-text-left tw-flex tw-flex-col tw-justify-between tw-h-full hover:tw-translate-y-[-6px] hover:tw-shadow-2xl hover:tw-shadow-indigo-500/5">
      
      <div className="tw-space-y-5">
        <div className="tw-w-12 tw-h-12 tw-rounded-xl tw-bg-indigo-600/15 tw-text-indigo-400 tw-flex tw-items-center tw-justify-center">
          <IconComponent size={22} />
        </div>
        <div>
          <h3 className="tw-text-base tw-font-bold tw-text-white tw-mb-2">{service.title}</h3>
          <p className="tw-text-xs tw-text-[#A5B4C3] tw-leading-relaxed">{service.description}</p>
        </div>
      </div>
      
      <div className="tw-mt-8 tw-pt-6 tw-border-t tw-border-white/5 tw-flex tw-justify-between tw-items-center">
        <div>
          <span className="tw-text-[9px] tw-text-gray-500 tw-block tw-uppercase tw-tracking-wide">Starting from</span>
          <span className="tw-text-base tw-font-black tw-bg-gradient-to-r tw-from-indigo-400 tw-to-cyan-400 tw-bg-clip-text tw-text-transparent">
            ${parseFloat(service.price).toLocaleString()}
          </span>
          {service.billing_cycle !== 'one_time' && (
            <span className="tw-text-[10px] tw-text-gray-500"> / {service.billing_cycle}</span>
          )}
        </div>
        
        <Link 
          to="/project-request" 
          className="tw-w-9 tw-h-9 tw-rounded-xl tw-bg-indigo-600/15 hover:tw-bg-indigo-600 tw-text-indigo-400 hover:tw-text-white tw-flex tw-items-center tw-justify-center tw-transition-colors"
          title="Request Service"
        >
          <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
};

export default ServiceCard;
