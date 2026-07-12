import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, MessageSquare } from 'lucide-react';

const Hero = () => {
  return (
    <section className="tw-relative tw-bg-[#0F172A] tw-pt-32 tw-pb-20 tw-overflow-hidden tw-border-b tw-border-gray-800">
      
      {/* Decorative radial gradients background */}
      <div className="tw-absolute tw-top-[-10%] tw-left-[-10%] tw-w-[50%] tw-h-[50%] tw-bg-indigo-600/10 tw-rounded-full tw-filter tw-blur-[100px] tw-pointer-events-none"></div>
      <div className="tw-absolute tw-bottom-[10%] tw-right-[-10%] tw-w-[40%] tw-h-[40%] tw-bg-blue-600/10 tw-rounded-full tw-filter tw-blur-[100px] tw-pointer-events-none"></div>

      <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-12 tw-items-center">
        
        {/* Left column: Headings and actions */}
        <div className="tw-space-y-8 tw-text-left">
          
          <div className="tw-inline-flex tw-items-center tw-gap-2.5 tw-bg-indigo-500/10 tw-border tw-border-indigo-500/20 tw-text-indigo-400 tw-px-4 tw-py-2 tw-rounded-full tw-text-xs tw-font-semibold tw-tracking-wide tw-uppercase">
            <Code2 size={14} className="tw-animate-pulse" />
            <span>Enterprise Software & App Engineering</span>
          </div>

          <h1 className="tw-text-4xl sm:tw-text-5xl lg:tw-text-6xl tw-font-extrabold tw-tracking-tight tw-leading-none tw-text-white">
            We Engineer <br className="tw-hidden sm:tw-block" />
            <span className="tw-bg-gradient-to-r tw-from-blue-400 tw-via-indigo-400 tw-to-cyan-400 tw-bg-clip-text tw-text-transparent">
              World-Class
            </span> <br />
            Digital Solutions
          </h1>

          <p className="tw-text-base sm:tw-text-lg tw-text-gray-400 tw-max-w-xl tw-leading-relaxed">
            Accelerate your ideas with premium custom software, robust web applications, e-commerce networks, and corporate platforms built on React and Django microservices.
          </p>

          {/* Action buttons */}
          <div className="tw-flex tw-flex-wrap tw-gap-4">
            <Link 
              to="/project-request" 
              className="tw-flex tw-items-center tw-gap-2 tw-bg-blue-600 hover:tw-bg-blue-500 tw-text-white tw-px-6 tw-py-3.5 tw-rounded-xl tw-font-bold tw-text-sm tw-shadow-lg tw-shadow-blue-600/20 tw-transition-all hover:tw-translate-y-[-2px] tw-no-underline"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
            <Link 
              to="/contact" 
              className="tw-flex tw-items-center tw-gap-2 tw-bg-gray-800 hover:tw-bg-gray-700 tw-text-gray-300 tw-px-6 tw-py-3.5 tw-rounded-xl tw-font-bold tw-text-sm tw-border tw-border-gray-700 tw-transition-all hover:tw-translate-y-[-2px] tw-no-underline"
            >
              Request a Quote
              <MessageSquare size={16} />
            </Link>
          </div>

        </div>

        {/* Right column: Premium SVG Illustration */}
        <div className="tw-relative tw-flex tw-justify-center tw-items-center">
          
          {/* Glassmorphic border ring decoration */}
          <div className="tw-absolute tw-w-[105%] tw-h-[105%] tw-border tw-border-dashed tw-border-gray-800 tw-rounded-3xl tw-pointer-events-none tw-animate-[spin_60s_linear_infinite]"></div>

          <div className="tw-relative tw-bg-[#1E293B]/70 tw-border tw-border-gray-800 tw-rounded-2xl tw-p-5 tw-shadow-2xl tw-backdrop-blur-md tw-w-full tw-max-w-lg tw-overflow-hidden">
            
            {/* Header window control buttons */}
            <div className="tw-flex tw-items-center tw-justify-between tw-pb-4 tw-border-b tw-border-gray-800 tw-mb-4">
              <div className="tw-flex tw-gap-1.5">
                <span className="tw-w-3 tw-h-3 tw-rounded-full tw-bg-rose-500 tw-inline-block"></span>
                <span className="tw-w-3 tw-h-3 tw-rounded-full tw-bg-amber-500 tw-inline-block"></span>
                <span className="tw-w-3 tw-h-3 tw-rounded-full tw-bg-emerald-500 tw-inline-block"></span>
              </div>
              <span className="tw-text-[10px] tw-text-gray-500 tw-font-mono">projectxcode.js</span>
            </div>

            {/* Simulated code and dashboard interface */}
            <div className="tw-space-y-4 tw-font-mono tw-text-xs tw-text-left">
              
              <div className="tw-text-gray-500 tw-flex tw-gap-2">
                <span className="tw-text-indigo-400">import</span> <span>&#123; React &#125;</span> <span className="tw-text-indigo-400">from</span> <span className="tw-text-emerald-400">'react'</span>;
              </div>
              
              <div className="tw-text-gray-500 tw-flex tw-gap-2">
                <span className="tw-text-indigo-400">const</span> <span className="tw-text-blue-400">Agency</span> <span className="tw-text-indigo-400">=</span> <span>() =&gt; &#123;</span>
              </div>

              <div className="tw-pl-4 tw-text-gray-400">
                <span className="tw-text-indigo-400">return</span> <span>(</span>
                <div className="tw-pl-4 tw-text-indigo-400">
                  <span>&lt;</span><span className="tw-text-rose-400">CorporateDashboard</span>
                  <div className="tw-pl-4 tw-text-gray-500">
                    <span className="tw-text-amber-400">theme</span><span>=</span><span className="tw-text-emerald-400">"premium-dark"</span> <br />
                    <span className="tw-text-amber-400">accent</span><span>=</span><span className="tw-text-emerald-400">"blue-accent"</span> <br />
                    <span className="tw-text-amber-400">status</span><span>=</span><span className="tw-text-emerald-400">"production-ready"</span>
                  </div>
                  <span>/&gt;</span>
                </div>
                <span>);</span>
              </div>

              <div className="tw-text-gray-500">
                <span>&#125;;</span>
              </div>

              {/* Graphic visual stats bar chart embed */}
              <div className="tw-bg-gray-900/60 tw-border tw-border-gray-800 tw-rounded-xl tw-p-4 tw-mt-4 tw-flex tw-flex-col tw-gap-2.5">
                <div className="tw-flex tw-justify-between tw-items-center">
                  <span className="tw-text-[10px] tw-text-gray-400">Monthly Project Deliveries</span>
                  <span className="tw-text-[10px] tw-text-emerald-400 tw-font-bold">+45.2%</span>
                </div>
                <div className="tw-flex tw-items-end tw-justify-between tw-h-16 tw-pt-2 tw-gap-1.5">
                  <div className="tw-w-full tw-h-[40%] tw-bg-gray-800 tw-rounded-t"></div>
                  <div className="tw-w-full tw-h-[60%] tw-bg-indigo-600 tw-rounded-t"></div>
                  <div className="tw-w-full tw-h-[50%] tw-bg-gray-800 tw-rounded-t"></div>
                  <div className="tw-w-full tw-h-[85%] tw-bg-blue-600 tw-rounded-t tw-shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
                  <div className="tw-w-full tw-h-[70%] tw-bg-gray-800 tw-rounded-t"></div>
                  <div className="tw-w-full tw-h-[95%] tw-bg-cyan-500 tw-rounded-t"></div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;
