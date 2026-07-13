import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="tw-bg-[#0F172A] tw-border-t tw-border-gray-800/80 tw-py-16 tw-text-left tw-font-sans tw-relative tw-overflow-hidden">
      
      {/* Footer background ambient light glow */}
      <div className="tw-absolute tw-bottom-[-100px] tw-left-[-100px] tw-w-96 tw-h-96 tw-bg-blue-600/5 tw-rounded-full tw-filter tw-blur-[100px] tw-pointer-events-none"></div>

      <div className="tw-max-w-7xl tw-mx-auto tw-px-6">
        
        {/* Core footer columns grid */}
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-12 tw-gap-10 tw-mb-12">
          
          {/* Column 1: Brand & Socials (Col width: 4) */}
          <div className="md:tw-col-span-4 tw-space-y-6">
            <Link to="/" className="tw-flex tw-items-center tw-gap-2.5 tw-no-underline">
              <Code size={24} className="tw-text-blue-500" />
              <span className="tw-font-black tw-text-lg tw-tracking-tight tw-text-white">
                Project<span className="tw-bg-gradient-to-r tw-from-blue-400 tw-to-cyan-400 tw-bg-clip-text tw-text-transparent">XCode</span>
              </span>
            </Link>
            <p className="tw-text-xs tw-text-gray-400 tw-leading-relaxed tw-max-w-xs">
              We engineer state-of-the-art digital experiences that connect brands with users. Specialized in high-performance React + Django software suites.
            </p>
            
            {/* Social Icons row */}
            <div className="tw-flex tw-gap-3">
              <a href="https://github.com/prabhakarsingh2007" target="_blank" rel="noreferrer" className="tw-p-2 tw-rounded-lg tw-bg-gray-800/40 hover:tw-bg-gray-800 tw-text-gray-400 hover:tw-text-white tw-transition-colors" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/prabhakar-singh-7880b9323/" target="_blank" rel="noreferrer" className="tw-p-2 tw-rounded-lg tw-bg-gray-800/40 hover:tw-bg-gray-800 tw-text-gray-400 hover:tw-text-white tw-transition-colors" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Services links (Col width: 3) */}
          <div className="md:tw-col-span-2.5 tw-space-y-4">
            <h4 className="tw-text-xs tw-font-bold tw-text-white tw-uppercase tw-tracking-widest">Services</h4>
            <ul className="tw-space-y-2 tw-list-none tw-pl-0 tw-mb-0">
              <li><Link to="/services" className="tw-text-xs tw-text-gray-400 hover:tw-text-white tw-no-underline">Web App Engineering</Link></li>
              <li><Link to="/services" className="tw-text-xs tw-text-gray-400 hover:tw-text-white tw-no-underline">UI/UX Brand Design</Link></li>
              <li><Link to="/services" className="tw-text-xs tw-text-gray-400 hover:tw-text-white tw-no-underline">Dedicated Support SLA</Link></li>
              <li><Link to="/pricing" className="tw-text-xs tw-text-gray-400 hover:tw-text-white tw-no-underline">Pricing Packages</Link></li>
            </ul>
          </div>

          {/* Column 3: Corporate Info (Col width: 3) */}
          <div className="md:tw-col-span-2.5 tw-space-y-4">
            <h4 className="tw-text-xs tw-font-bold tw-text-white tw-uppercase tw-tracking-widest">Company</h4>
            <ul className="tw-space-y-2 tw-list-none tw-pl-0 tw-mb-0">
              <li><Link to="/about" className="tw-text-xs tw-text-gray-400 hover:tw-text-white tw-no-underline">About Us</Link></li>
              <li><Link to="/completed-projects" className="tw-text-xs tw-text-gray-400 hover:tw-text-white tw-no-underline">Completed Projects</Link></li>
              <li><Link to="/contact" className="tw-text-xs tw-text-gray-400 hover:tw-text-white tw-no-underline">Contact Sales</Link></li>
              <li><Link to="/privacy" className="tw-text-xs tw-text-gray-400 hover:tw-text-white tw-no-underline">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Addresses (Col width: 3) */}
          <div className="md:tw-col-span-3 tw-space-y-4">
            <h4 className="tw-text-xs tw-font-bold tw-text-white tw-uppercase tw-tracking-widest">Location & Sales</h4>
            <p className="tw-text-xs tw-text-gray-400 tw-leading-relaxed">
              Purnea, Bihar, India
            </p>
            <p className="tw-text-xs tw-text-gray-400 tw-leading-relaxed">
              prabhakarkumarsingh578@gmail.com<br />
              +91 99999 99999
            </p>
          </div>

        </div>

        {/* Bottom Credits section */}
        <div className="tw-pt-8 tw-border-t tw-border-gray-800/80 tw-flex tw-flex-col sm:tw-flex-row tw-items-center tw-justify-between tw-gap-4">
          <p className="tw-text-[11px] tw-text-gray-500 tw-mb-0">
            &copy; {new Date().getFullYear()} ProjectXCode. All rights reserved.
          </p>
          <p className="tw-text-[11px] tw-text-gray-500 tw-flex tw-items-center tw-gap-1 tw-mb-0">
            Built with <Heart size={10} className="tw-text-rose-500 tw-fill-rose-500" /> by Antigravity Team
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
