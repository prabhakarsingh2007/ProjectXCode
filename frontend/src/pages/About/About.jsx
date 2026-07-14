import React from 'react';
import { Cpu, Shield, Users, Layers, Mail, Phone, MapPin, Building } from 'lucide-react';

const About = () => {
  const values = [
    { icon: Cpu, title: 'Modern Tech Stack', desc: 'We design software suites utilizing modern React frontends coupled with secure Django REST framework layers.' },
    { icon: Shield, title: 'Enterprise-Grade Security', desc: 'Secure state-management, token authentications, and containerized deployments ensure strict safety compliance.' },
    { icon: Users, title: 'Collaborative Engineering', desc: 'We act as your dedicated tech partner, keeping communications open from staging runs to production deployments.' },
  ];

  return (
    <div className="tw-bg-[#070B17] tw-text-white tw-min-h-screen tw-font-sans tw-overflow-x-hidden tw-relative tw-pb-24">
      
      {/* Background ambient glow blobs */}
      <div className="tw-absolute tw-top-[-100px] tw-left-[-100px] tw-w-[500px] tw-h-[500px] tw-bg-indigo-600/10 tw-rounded-full tw-filter tw-blur-[120px] tw-pointer-events-none"></div>
      <div className="tw-absolute tw-bottom-[20%] tw-right-[-100px] tw-w-[400px] tw-h-[400px] tw-bg-blue-600/10 tw-rounded-full tw-filter tw-blur-[100px] tw-pointer-events-none"></div>

      <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-pt-32 tw-space-y-28">
        
        {/* Hero Section */}
        <section className="tw-text-center tw-max-w-3xl tw-mx-auto tw-space-y-6">
          <h1 className="tw-text-4xl sm:tw-text-5xl tw-font-black tw-tracking-tight tw-text-white">
            Who We <span className="tw-bg-gradient-to-r tw-from-indigo-400 tw-to-cyan-400 tw-bg-clip-text tw-text-transparent">Are</span>
          </h1>
          <p className="tw-text-xs sm:tw-text-sm tw-text-[#A5B4C3] tw-leading-relaxed">
            ProjectXCode is a premium full-stack software agency. We bridge the gap between creative UI/UX designs and bulletproof backend configurations, enabling agencies, businesses, and startups to deploy state-of-the-art software.
          </p>
        </section>

        {/* Meet the Founder Section */}
        <section className="tw-bg-[#131C31]/50 tw-border tw-border-white/10 tw-p-8 sm:tw-p-10 tw-rounded-[18px] tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-gap-12 tw-items-center tw-backdrop-blur-md">
          
          {/* Avatar Column */}
          <div className="lg:tw-col-span-4 tw-flex tw-flex-col tw-items-center tw-gap-5 tw-text-center">
            <div className="tw-w-44 tw-h-44 tw-rounded-full tw-border-2 tw-border-indigo-500/30 tw-p-1.5 tw-bg-[#0D1324] tw-overflow-hidden">
              <img 
                src="https://media.licdn.com/dms/image/v2/D4E03AQGfSEK6nFRsTg/profile-displayphoto-scale_400_400/B4EZ70wAY8HoAg-/0/1782222689412?e=1785369600&v=beta&t=Xcdwgx8hgvYZAacsQve7uuEJ5LUXotaOkqb1X5p3lJk" 
                alt="Prabhakar Kumar Singh" 
                className="tw-w-full tw-h-full tw-object-cover tw-rounded-full"
              />
            </div>
            <div>
              <h3 className="tw-text-base tw-font-bold tw-text-white">Prabhakar Kumar Singh</h3>
              <span className="tw-text-[10px] tw-font-bold tw-tracking-wider tw-text-indigo-400 tw-uppercase">Founder & Lead Developer</span>
            </div>
          </div>
          
          {/* Information Column */}
          <div className="lg:tw-col-span-8 tw-text-left tw-space-y-6">
            <h2 className="tw-text-2xl sm:tw-text-3xl tw-font-black tw-text-white">
              Meet the <span className="tw-bg-gradient-to-r tw-from-indigo-400 tw-to-cyan-400 tw-bg-clip-text tw-text-transparent">Founder</span>
            </h2>
            
            <p className="tw-text-xs tw-text-[#A5B4C3] tw-leading-relaxed">
              👋 Hi, I'm Prabhakar Kumar Singh - Founder & Full Stack Web Developer at Project X Code. I specialize in designing and developing modern websites, web applications, and custom software solutions using React, Django, Python, and PostgreSQL.
            </p>
            <p className="tw-text-xs tw-text-[#A5B4C3] tw-leading-relaxed">
              I also help students build high-quality final year projects with complete source code, documentation, and deployment support. My goal is to create secure, scalable, and user-friendly digital solutions for students, startups, businesses, and organizations.
            </p>
            
            {/* Details Grid */}
            <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-4 tw-pt-6 tw-border-t tw-border-white/5">
              
              <div className="tw-flex tw-items-center tw-gap-3.5 tw-bg-[#0D1324] tw-border tw-border-white/5 tw-p-3.5 tw-rounded-xl">
                <Building size={16} className="tw-text-indigo-400" />
                <div>
                  <span className="tw-text-[9px] tw-text-gray-500 tw-block">Brand</span>
                  <span className="tw-text-xs tw-font-bold tw-text-white">Project X Code</span>
                </div>
              </div>

              <div className="tw-flex tw-items-center tw-gap-3.5 tw-bg-[#0D1324] tw-border tw-border-white/5 tw-p-3.5 tw-rounded-xl">
                <MapPin size={16} className="tw-text-blue-400" />
                <div>
                  <span className="tw-text-[9px] tw-text-gray-500 tw-block">Location</span>
                  <span className="tw-text-xs tw-font-bold tw-text-white">Purnea, Bihar</span>
                </div>
              </div>

              <div className="tw-flex tw-items-center tw-gap-3.5 tw-bg-[#0D1324] tw-border tw-border-white/5 tw-p-3.5 tw-rounded-xl tw-overflow-hidden">
                <Mail size={16} className="tw-text-purple-400" />
                <div className="tw-min-w-0">
                  <span className="tw-text-[9px] tw-text-gray-500 tw-block">Email</span>
                  <span className="tw-text-xs tw-font-bold tw-text-white tw-truncate tw-block">
                    <a href="mailto:prabhakarkumarsingh578@gmail.com" className="hover:tw-underline tw-no-underline">
                      prabhakarkumarsingh578@gmail.com
                    </a>
                  </span>
                </div>
              </div>

              <div className="tw-flex tw-items-center tw-gap-3.5 tw-bg-[#0D1324] tw-border tw-border-white/5 tw-p-3.5 tw-rounded-xl">
                <Phone size={16} className="tw-text-emerald-400" />
                <div>
                  <span className="tw-text-[9px] tw-text-gray-500 tw-block">Phone</span>
                  <span className="tw-text-xs tw-font-bold tw-text-white">+91 99999 99999</span>
                </div>
              </div>

            </div>
            
            {/* Social row */}
            <div className="tw-flex tw-gap-4 tw-pt-4">
              <a 
                href="https://github.com/prabhakarsingh2007" 
                target="_blank" 
                rel="noreferrer" 
                className="tw-flex tw-items-center tw-gap-2 tw-bg-[#0D1324] hover:tw-bg-white/5 tw-text-white tw-px-5 tw-py-2.5 tw-rounded-xl tw-text-xs tw-font-bold tw-border tw-border-white/10 tw-transition-all hover:tw-translate-y-[-2px] tw-no-underline"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                GitHub Profile
              </a>
              <a 
                href="https://www.linkedin.com/in/prabhakar-singh-7880b9323/" 
                target="_blank" 
                rel="noreferrer" 
                className="tw-flex tw-items-center tw-gap-2 tw-bg-[#0D1324] hover:tw-bg-white/5 tw-text-white tw-px-5 tw-py-2.5 tw-rounded-xl tw-text-xs tw-font-bold tw-border tw-border-white/10 tw-transition-all hover:tw-translate-y-[-2px] tw-no-underline"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
        <section className="tw-text-center tw-space-y-16">
          <h2 className="tw-text-3xl tw-font-black tw-text-white">Our Code Values</h2>
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="tw-bg-[#131C31]/50 tw-border tw-border-white/10 tw-p-8 tw-rounded-[18px] tw-text-left tw-flex tw-flex-col tw-gap-4 hover:tw-border-indigo-500/30 tw-transition-colors">
                  <div className="tw-w-10 tw-h-10 tw-rounded-xl tw-bg-indigo-600/15 tw-text-indigo-400 tw-flex tw-items-center tw-justify-center">
                    <Icon size={20} />
                  </div>
                  <h3 className="tw-text-sm tw-font-bold tw-text-white">{v.title}</h3>
                  <p className="tw-text-xs tw-[#A5B4C3] tw-leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Team Info / Achievements */}
        <section className="tw-bg-[#131C31]/50 tw-border tw-border-white/10 tw-p-8 sm:tw-p-10 tw-rounded-[18px] tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-12 tw-items-center">
          <div className="tw-text-left tw-space-y-6">
            <h2 className="tw-text-2xl sm:tw-text-3xl tw-font-black tw-text-white">Our Mission</h2>
            <p className="tw-text-xs tw-[#A5B4C3] tw-leading-relaxed">
              We believe that software should not just run, it should thrive. By containerizing our stacks with Docker, setting up reverse-proxy caching with Nginx, and keeping our React components clean, we deliver platforms that perform at scale.
            </p>
            <div className="tw-flex tw-gap-10">
              <div>
                <span className="tw-text-3xl tw-font-black tw-bg-gradient-to-r tw-from-indigo-400 tw-to-cyan-400 tw-bg-clip-text tw-text-transparent">99.9%</span>
                <span className="tw-text-[10px] tw-font-bold tw-text-gray-500 tw-uppercase tw-tracking-wider">Uptime SLA</span>
              </div>
              <div>
                <span className="tw-text-3xl tw-font-black tw-bg-gradient-to-r tw-from-indigo-400 tw-to-cyan-400 tw-bg-clip-text tw-text-transparent">50+</span>
                <span className="tw-text-[10px] tw-font-bold tw-text-gray-500 tw-uppercase tw-tracking-wider">Apps Built</span>
              </div>
            </div>
          </div>
          
          <div className="tw-grid tw-grid-cols-2 tw-gap-4">
            <div className="tw-bg-[#0D1324] tw-border tw-border-white/5 tw-p-6 tw-rounded-xl tw-flex tw-flex-col tw-gap-3">
              <Layers size={20} className="tw-text-indigo-400" />
              <h4 className="tw-text-xs tw-font-bold tw-text-white">Django REST API</h4>
              <span className="tw-text-[10px] tw-text-gray-500">Secure schemas</span>
            </div>
            <div className="tw-bg-[#0D1324] tw-border tw-border-white/5 tw-p-6 tw-rounded-xl tw-flex tw-flex-col tw-gap-3">
              <Cpu size={20} className="tw-text-blue-400" />
              <h4 className="tw-text-xs tw-font-bold tw-text-white">Vite & React</h4>
              <span className="tw-text-[10px] tw-text-gray-500">Fast page loads</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
