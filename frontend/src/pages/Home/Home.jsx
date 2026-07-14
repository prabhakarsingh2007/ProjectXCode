import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import { serviceApi } from '../../api/serviceApi';
import { contactApi } from '../../api/contactApi';
import { 
  ArrowRight, Sparkles, Shield, Rocket, Laptop, Database, Globe, 
  Smartphone, Search, HeartHandshake, CheckCircle2, 
  HelpCircle, MessageSquare, Phone, Mail, Award, Users, Star, 
  Cpu, Activity, Check, Terminal, Play, Circle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dynamic Interactive States
  const [heroTab, setHeroTab] = useState('traffic'); // 'traffic', 'logs', 'milestones'
  const [billingYearly, setBillingYearly] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(null);

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [servicesRes, portfolioRes, testimonialsRes] = await Promise.all([
          serviceApi.getServices(),
          contactApi.getPortfolioItems(),
          contactApi.getTestimonials(),
        ]);
        setServices(servicesRes);
        setPortfolio(portfolioRes.slice(0, 3)); // show top 3
        setTestimonials(testimonialsRes);
      } catch (error) {
        console.error('Failed to load home page data', error);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormSuccess('');
    setFormError('');
    try {
      await contactApi.submitEnquiry(contactForm);
      setFormSuccess('Thank you! Your inquiry has been successfully dispatched to our support team.');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setFormError('Failed to send inquiry. Please check connection and try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  if (loading) {
    return <Loader fullPage />;
  }

  // 7 services mock list mapping to user requirements
  const coreServices = [
    { title: 'Website Development', desc: 'Sleek, responsive marketing pages and corporate websites engineered for conversion.', icon: Globe },
    { title: 'Web Applications', desc: 'Secure, complex custom dashboard interfaces and SaaS platforms utilizing React & Vite.', icon: Laptop },
    { title: 'Custom Software', desc: 'Tailored automation software engineered to resolve niche organizational bottlenecks.', icon: Cpu },
    { title: 'E-Commerce Networks', desc: 'Comprehensive online stores featuring Stripe payment checkouts and dynamic stock catalogs.', icon: Rocket },
    { title: 'API Integration & Dev', desc: 'Secure microservices backend architectures mapping fast REST & GraphQL interfaces.', icon: Database },
    { title: 'UI/UX Brand Design', desc: 'Premium Figma graphics wireframes, responsive grids layouts, and interactive mockups.', icon: Smartphone },
    { title: 'Website Maintenance', desc: 'Ongoing database optimization, system upgrades, log audit monitoring, and version support.', icon: Activity },
  ];

  // Why choose us definitions
  const featuresList = [
    { title: 'Fast Delivery', desc: 'Structured milestones ensuring sprints are resolved on time without compromising checks.', icon: Rocket },
    { title: 'Clean Architecture', desc: 'Strict separation of concern metrics following DRY programming patterns.', icon: Cpu },
    { title: 'Secure Development', desc: 'Enforced HttpOnly cookies, parameterized DB ORM schemas, and CORS defenses.', icon: Shield },
    { title: 'Responsive Design', desc: 'Responsive CSS styles collapsing cleanly across mobile, tablet, and widescreen views.', icon: Laptop },
    { title: 'SEO Optimized', desc: 'Meta tags, automated XML index templates, and lightning-fast loading score values.', icon: Search },
    { title: 'Lifetime Support', desc: 'Continuous patch support updates and ticket routing systems to resolve production anomalies.', icon: HeartHandshake },
  ];

  // Stepper Process (Split view layout details)
  const stepsList = [
    { num: '01', title: 'Requirement Scope', desc: 'Defining project parameters, features matrix, and compiling client files.', deliverable: 'SRS Spec Draft Document', progress: 15 },
    { num: '02', title: 'Sprint Planning', desc: 'Plotting milestone schedules, team assignments, and database specifications.', deliverable: 'Sprint Plan & DB ERD Schema', progress: 30 },
    { num: '03', title: 'Figma UI Design', desc: 'Drafting high-fidelity mockups, responsive grid outlines, and interactive flows.', deliverable: 'Approved Figma Prototype Links', progress: 45 },
    { num: '04', title: 'System Engineering', desc: 'Building secure REST microservices, Django frameworks, and frontend views.', deliverable: 'Vite Component Repository & APIs', progress: 65 },
    { num: '05', title: 'Comprehensive QA', desc: 'Executing automated system validation unit tests and code audits.', deliverable: 'QA Passing Review Certificate', progress: 80 },
    { num: '06', title: 'Nginx Cloud Launch', desc: 'Orchestrating production builds behind secure SSL reverse proxy nodes.', deliverable: 'Docker Deployment Manifest', progress: 95 },
    { num: '07', title: 'Ongoing Support', desc: 'Opening real-time SLA ticket dashboards and monitoring active metrics.', deliverable: 'Project Maintenance Contract', progress: 100 },
  ];

  // Technologies List
  const techList = [
    { name: 'React.js', role: 'Frontend library', color: 'tw-border-cyan-500/20 tw-text-cyan-400' },
    { name: 'Next.js', role: 'Meta-Framework', color: 'tw-border-white/20 tw-text-white' },
    { name: 'Django REST', role: 'Backend API Engine', color: 'tw-border-emerald-500/20 tw-text-emerald-400' },
    { name: 'Python', role: 'Core Backend Logic', color: 'tw-border-yellow-500/20 tw-text-yellow-400' },
    { name: 'Node.js', role: 'Server Runtime', color: 'tw-border-green-500/20 tw-text-green-400' },
    { name: 'PostgreSQL', role: 'Relational Database', color: 'tw-border-blue-400/20 tw-text-blue-400' },
    { name: 'MySQL', role: 'Storage Engine', color: 'tw-border-indigo-400/20 tw-text-indigo-400' },
    { name: 'Tailwind CSS', role: 'Responsive Styles', color: 'tw-border-sky-400/20 tw-text-sky-400' },
  ];

  // Pricing Plans (Monthly vs Yearly retainers)
  const pricingPlans = [
    { title: 'Basic Retainer', priceMonthly: 79, priceYearly: 63, billing: 'billed monthly', features: ['Responsive Design Layout', '3 Core Sub-pages', 'Inquiry Consultation Form', 'Tailwind Prefixes Mapping', 'Google Maps Embeds', '1 Month Active Maintenance'], btn: 'Get Started' },
    { title: 'Standard Startup', priceMonthly: 189, priceYearly: 151, billing: 'billed monthly', features: ['SPA Custom Applications', 'React Router Interfaces', 'Django REST Backend APIs', 'SQLite Database Storage', 'Secure Session Cookies', '3 Months Technical Support'], btn: 'Launch Project' },
    { title: 'Premium SaaS', priceMonthly: 349, priceYearly: 279, billing: 'billed monthly', features: ['Full Corporate Platform', 'Next.js Server SSR', 'PostgreSQL DB Integration', 'HttpOnly Cookie JWT Auth', 'Stripe Payments Checkout', '6 Months Support SLA'], btn: 'Deploy Platform' },
    { title: 'Enterprise SLA', priceMonthly: 'Custom', priceYearly: 'Custom', billing: 'billed annually', features: ['Custom Dedicated Cloud', '24/7 Support Retainers', 'Automated PDF Invoices', 'Rotating System Analytics', 'Docker Container Swarms', 'Lifetime SLA Updates'], btn: 'Contact Enterprise' },
  ];

  // FAQ Array
  const faqItems = [
    { q: 'What software technologies does Project X Code specialize in?', a: 'We specialize in high-performance frontend interfaces using React.js and Next.js, backed by secure, robust Django REST APIs, Python microservices, Node.js runtimes, and PostgreSQL/MySQL databases.' },
    { q: 'How long does it take to deliver a custom web application?', a: 'Depending on complexity, standard web development sprints require 2 to 4 weeks. Enterprise platforms with payment nodes, custom files uploading systems, and nested dashboards require 6 to 8 weeks.' },
    { q: 'Can I request assistance for university final year projects?', a: 'Yes! We actively support students and research teams by engineering fully documented final year software architectures, technical SRS requirements, database schema ERDs, and local installation scripts.' },
    { q: 'Is a production PostgreSQL database integrated automatically?', a: 'Yes. Our Django configurations support automated environment bindings. Local instances default to lightweight SQLite systems, whereas production instances automatically bind to PostgreSQL configurations.' },
    { q: 'What kind of support is offered post-launch?', a: 'We offer standard technical support across all packages. Standard and Premium platforms receive 3 to 6 months of active maintenance support, and custom Enterprise clients receive a lifetime SLA support channel.' },
  ];

  return (
    <div className="tw-bg-[#070B17] tw-text-white tw-min-h-screen tw-font-sans tw-overflow-x-hidden tw-relative tw-pb-24">
      
      {/* Background ambient animations blobs */}
      <div className="tw-absolute tw-top-[-100px] tw-left-[-100px] tw-w-[600px] tw-h-[600px] tw-bg-indigo-600/10 tw-rounded-full tw-filter tw-blur-[120px] tw-pointer-events-none tw-animate-float-slow"></div>
      <div className="tw-absolute tw-bottom-[30%] tw-right-[-100px] tw-w-[500px] tw-h-[500px] tw-bg-blue-600/10 tw-rounded-full tw-filter tw-blur-[120px] tw-pointer-events-none tw-animate-float-slow"></div>

      {/* 1. Hero Section */}
      <section className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-pt-32 tw-pb-24 tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-gap-16 tw-items-center">
        
        {/* Left: Branding & Action Headers */}
        <div className="lg:tw-col-span-7 tw-text-left tw-space-y-8">
          
          <div className="tw-inline-flex tw-items-center tw-gap-2.5 tw-bg-indigo-600/10 tw-border tw-border-indigo-500/20 tw-text-indigo-400 tw-px-4 tw-py-2 tw-rounded-full tw-text-xs tw-font-bold tw-tracking-wide tw-uppercase">
            <Sparkles size={14} className="tw-text-indigo-400 tw-animate-pulse" />
            <span>Elite Software Agency</span>
          </div>

          <h1 className="tw-text-4xl sm:tw-text-5xl lg:tw-text-6xl tw-font-black tw-tracking-tight tw-leading-tight tw-text-white">
            We Engineer <br />
            <span className="tw-bg-gradient-to-r tw-from-indigo-400 tw-via-blue-500 tw-to-purple-500 tw-bg-clip-text tw-text-transparent">
              High-End Products
            </span> <br />
            For Modern Startups.
          </h1>

          <p className="tw-text-sm sm:tw-text-base tw-text-[#A5B4C3] tw-max-w-xl tw-leading-relaxed">
            Accelerate your business with enterprise-grade React interfaces coupled with high-performance, secure Django backend microservices. We build original, highly functional solutions.
          </p>

          <div className="tw-flex tw-flex-wrap tw-gap-4">
            <Link 
              to="/project-request" 
              className="tw-flex tw-items-center tw-gap-2 tw-bg-indigo-600 hover:tw-bg-indigo-500 tw-text-white tw-px-7 tw-py-4 tw-rounded-[18px] tw-font-bold tw-text-xs tw-shadow-lg tw-shadow-indigo-600/20 tw-transition-all hover:tw-translate-y-[-2px] tw-no-underline tw-animate-glow-pulse"
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
            <Link 
              to="/contact" 
              className="tw-flex tw-items-center tw-gap-2 tw-bg-[#131C31]/60 hover:tw-bg-[#131C31] tw-text-white tw-px-7 tw-py-4 tw-rounded-[18px] tw-font-bold tw-text-xs tw-border tw-border-white/10 tw-transition-all hover:tw-translate-y-[-2px] tw-no-underline"
            >
              Request a Quote
            </Link>
          </div>

        </div>

        {/* Right: High fidelity interactive mockup pane */}
        <div className="lg:tw-col-span-5 tw-relative tw-flex tw-justify-center tw-items-center">
          
          <div className="tw-absolute tw-w-[110%] tw-h-[110%] tw-bg-blue-600/5 tw-rounded-full tw-filter tw-blur-[80px] tw-pointer-events-none"></div>

          <div className="tw-relative tw-bg-[#131C31]/55 tw-border tw-border-white/10 tw-rounded-[18px] tw-p-6 tw-shadow-2xl tw-backdrop-blur-md tw-w-full">
            
            {/* Header window controls & Interactive Tabs Selector */}
            <div className="tw-flex tw-items-center tw-justify-between tw-pb-4 tw-border-b tw-border-white/5 tw-mb-5">
              <div className="tw-flex tw-gap-2">
                <span className="tw-w-2.5 tw-h-2.5 tw-rounded-full tw-bg-rose-500/80 tw-inline-block"></span>
                <span className="tw-w-2.5 tw-h-2.5 tw-rounded-full tw-bg-amber-500/80 tw-inline-block"></span>
                <span className="tw-w-2.5 tw-h-2.5 tw-rounded-full tw-bg-emerald-500/80 tw-inline-block"></span>
              </div>
              
              {/* Tab Selector Buttons */}
              <div className="tw-flex tw-gap-2 tw-bg-[#0D1324] tw-p-1 tw-rounded-lg tw-border tw-border-white/5">
                <button 
                  onClick={() => setHeroTab('traffic')} 
                  className={`tw-px-2 tw-py-1 tw-text-[9px] tw-font-bold tw-rounded-md tw-transition-all ${heroTab === 'traffic' ? 'tw-bg-indigo-600 tw-text-white' : 'tw-text-gray-400 hover:tw-text-white'}`}
                >
                  Traffic
                </button>
                <button 
                  onClick={() => setHeroTab('logs')} 
                  className={`tw-px-2 tw-py-1 tw-text-[9px] tw-font-bold tw-rounded-md tw-transition-all ${heroTab === 'logs' ? 'tw-bg-indigo-600 tw-text-white' : 'tw-text-gray-400 hover:tw-text-white'}`}
                >
                  Terminal
                </button>
                <button 
                  onClick={() => setHeroTab('milestones')} 
                  className={`tw-px-2 tw-py-1 tw-text-[9px] tw-font-bold tw-rounded-md tw-transition-all ${heroTab === 'milestones' ? 'tw-bg-indigo-600 tw-text-white' : 'tw-text-gray-400 hover:tw-text-white'}`}
                >
                  Retainers
                </button>
              </div>
            </div>

            {/* Tab 1: Traffic Workload */}
            {heroTab === 'traffic' && (
              <div className="tw-space-y-4 tw-animate-fade-slide">
                <div className="tw-grid tw-grid-cols-2 tw-gap-3">
                  <div className="tw-[#0D1324] tw-border tw-border-white/5 tw-rounded-xl tw-p-3.5 tw-text-left tw-bg-[#0D1324]">
                    <span className="tw-text-[9px] tw-text-[#A5B4C3] tw-block">API Latency Status</span>
                    <span className="tw-text-xs tw-font-bold tw-text-emerald-400">99.99% normal</span>
                  </div>
                  <div className="tw-bg-[#0D1324] tw-border tw-border-white/5 tw-rounded-xl tw-p-3.5 tw-text-left">
                    <span className="tw-text-[9px] tw-text-[#A5B4C3] tw-block">Security Protocols</span>
                    <span className="tw-text-xs tw-font-bold tw-text-[#8B5CF6]">Active SSL</span>
                  </div>
                </div>

                <div className="tw-bg-[#0D1324] tw-border tw-border-white/5 tw-rounded-xl tw-p-4 tw-text-left">
                  <div className="tw-flex tw-justify-between tw-items-center tw-mb-3">
                    <span className="tw-text-[9px] tw-text-[#A5B4C3]">Traffic Workload Stream</span>
                    <span className="tw-text-[9px] tw-text-emerald-400 tw-font-bold">24ms load</span>
                  </div>
                  <div className="tw-flex tw-items-end tw-justify-between tw-h-16 tw-gap-1">
                    <div className="tw-w-full tw-h-[30%] tw-bg-white/5 tw-rounded-t"></div>
                    <div className="tw-w-full tw-h-[50%] tw-bg-white/5 tw-rounded-t"></div>
                    <div className="tw-w-full tw-h-[40%] tw-bg-white/5 tw-rounded-t"></div>
                    <div className="tw-w-full tw-h-[80%] tw-bg-indigo-500 tw-rounded-t tw-shadow-lg tw-shadow-indigo-500/20"></div>
                    <div className="tw-w-full tw-h-[60%] tw-bg-white/5 tw-rounded-t"></div>
                    <div className="tw-w-full tw-h-[90%] tw-bg-blue-500 tw-rounded-t tw-shadow-lg tw-shadow-blue-500/20"></div>
                    <div className="tw-w-full tw-h-[45%] tw-bg-white/5 tw-rounded-t"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Terminal Logs */}
            {heroTab === 'logs' && (
              <div className="tw-space-y-3 tw-text-left tw-font-mono tw-text-[9px] tw-[#A5B4C3] tw-bg-[#0D1324] tw-p-4 tw-rounded-xl tw-border tw-border-white/5 tw-min-h-[176px] tw-animate-fade-slide">
                <div className="tw-text-indigo-400 tw-flex tw-items-center tw-gap-1.5">
                  <Terminal size={10} />
                  <span>system_boot_sprint.sh</span>
                </div>
                <div className="tw-text-gray-500">&gt; Initializing ProjectXCode Core Server...</div>
                <div className="tw-text-emerald-400">&gt; Connection pool to PostgreSQL bound: OK (10 active)</div>
                <div className="tw-text-blue-400">&gt; Mounting Django REST endpoints: /api/portfolio/, /api/tickets/</div>
                <div className="tw-text-purple-400">&gt; Vite client transformation completed in 1.44s</div>
                <div className="tw-text-white tw-animate-pulse">&gt; listening on port http://localhost:5173/ ... _</div>
              </div>
            )}

            {/* Tab 3: Milestones timelines */}
            {heroTab === 'milestones' && (
              <div className="tw-space-y-4 tw-text-left tw-bg-[#0D1324] tw-p-4 tw-rounded-xl tw-border tw-border-white/5 tw-min-h-[176px] tw-animate-fade-slide">
                <span className="tw-text-[10px] tw-font-bold tw-text-white tw-block tw-mb-2">Contract Workload Retainers</span>
                <div className="tw-space-y-3">
                  <div className="tw-flex tw-items-center tw-justify-between tw-text-[9px]">
                    <span className="tw-text-[#A5B4C3]">Sprint 01: Client Onboarding</span>
                    <span className="tw-text-emerald-400 tw-font-bold">Completed</span>
                  </div>
                  <div className="tw-w-full tw-h-1.5 tw-bg-white/5 tw-rounded-full">
                    <div className="tw-w-[100%] tw-h-full tw-bg-emerald-500 tw-rounded-full"></div>
                  </div>
                  <div className="tw-flex tw-items-center tw-justify-between tw-text-[9px] tw-pt-1">
                    <span className="tw-text-[#A5B4C3]">Sprint 02: API Architecture Layout</span>
                    <span className="tw-text-blue-400 tw-font-bold">In Progress (85%)</span>
                  </div>
                  <div className="tw-w-full tw-h-1.5 tw-bg-white/5 tw-rounded-full">
                    <div className="tw-w-[85%] tw-h-full tw-bg-blue-500 tw-rounded-full"></div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </section>

      {/* 2. Trusted by Clients Logos Section */}
      <section className="tw-py-12 tw-bg-[#0D1324] tw-border-y tw-border-white/5">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6">
          <p className="tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-text-gray-500 tw-text-center tw-mb-6">
            Trusted by businesses, startups, and university teams worldwide
          </p>
          <div className="tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-gap-12 tw-opacity-30 tw-grayscale">
            <span className="tw-font-bold tw-text-sm tw-tracking-wider text-white">STARTUP.IO</span>
            <span className="tw-font-bold tw-text-sm tw-tracking-wider text-white">CORE TECH</span>
            <span className="tw-font-bold tw-text-sm tw-tracking-wider text-white">NEXUS LABS</span>
            <span className="tw-font-bold tw-text-sm tw-tracking-wider text-white">BIZ CORP</span>
          </div>
        </div>
      </section>

      {/* 3. Services Highlights Section */}
      <section className="tw-py-28 tw-bg-[#070B17]">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-text-center">
          
          <div className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-blue-500 tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-mb-4">
            <Sparkles size={14} />
            <span>Capabilities Grid</span>
          </div>

          <h2 className="tw-text-3xl sm:tw-text-4xl tw-font-black tw-text-white tw-mb-4">What We Do Best</h2>
          <p className="tw-text-xs sm:tw-text-sm tw-text-[#A5B4C3] tw-max-w-xl tw-mx-auto tw-mb-16">
            Engineering robust frontend React applications and enterprise-grade Django REST frameworks tailored for scaling business metrics.
          </p>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
            {coreServices.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div key={idx} className="tw-bg-[#131C31]/50 tw-border tw-border-white/10 hover:tw-border-indigo-500/45 tw-transition-all tw-duration-500 tw-p-8 tw-rounded-[18px] tw-text-left tw-flex tw-flex-col tw-gap-5 hover:tw-translate-y-[-6px] hover:tw-shadow-2xl hover:tw-shadow-indigo-500/5">
                  <div className="tw-w-12 tw-h-12 tw-rounded-xl tw-bg-indigo-600/15 tw-text-indigo-400 tw-flex tw-items-center tw-justify-center">
                    <IconComp size={22} />
                  </div>
                  <div>
                    <h3 className="tw-text-base tw-font-bold tw-text-white tw-mb-2">{srv.title}</h3>
                    <p className="tw-text-xs tw-text-[#A5B4C3] tw-leading-relaxed">{srv.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="tw-py-28 tw-bg-[#0D1324] tw-border-y tw-border-white/5">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-text-center">
          
          <div className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-purple-500 tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-mb-4">
            <Sparkles size={14} />
            <span>Competitive Advantages</span>
          </div>

          <h2 className="tw-text-3xl sm:tw-text-4xl tw-font-black tw-text-white tw-mb-4">Why Businesses Choose Us</h2>
          <p className="tw-text-xs sm:tw-text-sm tw-text-[#A5B4C3] tw-max-w-xl tw-mx-auto tw-mb-16">
            Accelerate delivery paths without compromising security parameters, code validation checks, or support guarantees.
          </p>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
            {featuresList.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div key={idx} className="tw-bg-[#131C31]/40 tw-border tw-border-white/8 hover:tw-border-purple-500/20 tw-p-8 tw-rounded-[18px] tw-text-left tw-flex tw-gap-5 tw-transition-colors">
                  <div className="tw-text-purple-400 tw-mt-1 tw-shrink-0">
                    <IconComp size={22} />
                  </div>
                  <div>
                    <h4 className="tw-text-sm tw-font-bold tw-text-white tw-mb-1.5">{feat.title}</h4>
                    <p className="tw-text-xs tw-text-[#A5B4C3] tw-leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Development Process Section (Interactive Split layout) */}
      <section className="tw-py-28 tw-bg-[#070B17]">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6">
          
          <div className="tw-text-center tw-mb-16">
            <div className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-blue-500 tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest mb-4">
              <Sparkles size={14} />
              <span>Interactive workflow</span>
            </div>
            <h2 className="tw-text-3xl sm:tw-text-4xl tw-font-black tw-text-white tw-mb-4">Development Timeline</h2>
            <p className="tw-text-xs sm:tw-text-sm tw-[#A5B4C3] tw-max-w-xl tw-mx-auto">
              Click sprint milestones below to verify project stages and deliverables checklist.
            </p>
          </div>

          <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-gap-12 tw-items-stretch">
            
            {/* Left side: Timeline list selector */}
            <div className="lg:tw-col-span-5 tw-flex tw-flex-col tw-gap-3.5">
              {stepsList.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button 
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`tw-w-full tw-flex tw-items-center tw-gap-5 tw-px-6 tw-py-4 tw-rounded-[18px] tw-border tw-transition-all tw-text-left ${
                      isActive 
                        ? 'tw-bg-indigo-600/10 tw-border-indigo-500/40 tw-text-white' 
                        : 'tw-bg-[#131C31]/50 tw-border-white/5 tw-text-[#A5B4C3] hover:tw-border-white/20'
                    }`}
                  >
                    <span className={`tw-text-xs tw-font-extrabold tw-px-2 tw-py-1 tw-rounded-md ${isActive ? 'tw-bg-indigo-600 tw-text-white' : 'tw-bg-white/5 tw-text-[#A5B4C3]'}`}>{step.num}</span>
                    <span className="tw-text-xs sm:tw-text-sm tw-font-bold">{step.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Right side: Detailed step glassmorphic review card */}
            <div className="lg:tw-col-span-7">
              <div className="tw-bg-[#131C31]/50 tw-border tw-border-white/10 tw-rounded-[18px] tw-p-8 tw-h-full tw-flex tw-flex-col tw-justify-between tw-text-left tw-backdrop-blur-md tw-animate-fade-slide">
                
                <div className="tw-space-y-6">
                  
                  {/* Step Metadata */}
                  <div className="tw-flex tw-items-center tw-justify-between">
                    <span className="tw-text-[10px] tw-font-bold tw-text-indigo-400 tw-uppercase tw-tracking-widest">Active Step Milestone</span>
                    <span className="tw-text-xs tw-text-[#A5B4C3] tw-font-bold">{stepsList[activeStep].num} / 07</span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="tw-text-xl sm:tw-text-2xl tw-font-black tw-text-white">{stepsList[activeStep].title}</h3>
                  <p className="tw-text-xs sm:tw-text-sm tw-text-[#A5B4C3] tw-leading-relaxed">
                    {stepsList[activeStep].desc}
                  </p>

                  {/* Deliverables Checklist Box */}
                  <div className="tw-bg-[#0D1324] tw-border tw-border-white/5 tw-p-4 tw-rounded-xl">
                    <div className="tw-text-[10px] tw-text-gray-500 tw-font-bold tw-uppercase tw-tracking-wide tw-mb-2">Key Sprints Deliverable</div>
                    <div className="tw-flex tw-items-center tw-gap-2.5 tw-text-xs tw-text-white">
                      <Play size={12} className="tw-text-indigo-400 tw-fill-indigo-400" />
                      <strong>{stepsList[activeStep].deliverable}</strong>
                    </div>
                  </div>

                </div>

                {/* Progress Indicators */}
                <div className="tw-pt-8 tw-border-t tw-border-white/5 tw-flex tw-items-center tw-justify-between tw-gap-4">
                  <div className="tw-flex tw-items-center tw-gap-3">
                    <div className="tw-relative tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center">
                      <Circle size={40} className="tw-text-white/5" />
                      <span className="tw-absolute tw-text-[10px] tw-font-bold tw-text-indigo-400">{stepsList[activeStep].progress}%</span>
                    </div>
                    <span className="tw-text-[10px] tw-[#A5B4C3] tw-font-bold">Estimated Pipeline Progress</span>
                  </div>
                  <span className="tw-text-[10px] tw-bg-blue-600/10 tw-border tw-border-blue-500/20 tw-text-blue-400 tw-px-2.5 tw-py-1 tw-rounded-full tw-font-bold">Active Sprint Stage</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Technologies We Use Section */}
      <section className="tw-py-20 tw-bg-[#0D1324] tw-border-y tw-border-white/5">
        <div className="tw-max-w-5xl tw-mx-auto tw-px-6 tw-text-center">
          <h3 className="tw-text-xs tw-font-bold tw-text-gray-500 tw-uppercase tw-tracking-widest tw-mb-10">Technologies We Master</h3>
          <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-6">
            {techList.map((tech, idx) => (
              <div key={idx} className="tw-bg-[#131C31]/50 tw-border tw-border-white/10 tw-p-6 tw-rounded-[18px] tw-text-center hover:tw-border-white/20 tw-transition-colors">
                <div className="tw-text-xs tw-font-bold tw-text-white">{tech.name}</div>
                <div className="tw-text-[10px] tw-[#A5B4C3] tw-mt-1">{tech.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Completed Projects Showcase */}
      <section className="tw-py-28 tw-bg-[#070B17]">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-text-center">
          
          <div className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-indigo-400 tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-mb-4">
            <Sparkles size={14} />
            <span>Featured Case Studies</span>
          </div>

          <h2 className="tw-text-3xl sm:tw-text-4xl tw-font-black tw-text-white tw-mb-4">Recent Deliveries</h2>
          <p className="tw-text-xs sm:tw-text-sm tw-text-[#A5B4C3] tw-max-w-xl tw-mx-auto tw-mb-16">
            Explore how we partnered with global companies to build their core portal services.
          </p>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
            {portfolio.map((proj) => (
              <div key={proj.id} className="tw-bg-[#131C31]/50 tw-border tw-border-white/10 tw-rounded-[18px] tw-overflow-hidden tw-text-left tw-flex tw-flex-col tw-justify-between hover:tw-border-indigo-500/25 tw-transition-colors">
                
                <div className="tw-h-48 tw-w-full tw-bg-[#0D1324] tw-flex tw-items-center tw-justify-center tw-relative tw-overflow-hidden">
                  {proj.image_url ? (
                    <img src={proj.image_url} alt={proj.title} className="tw-object-cover tw-w-full tw-h-full" />
                  ) : (
                    <Laptop size={44} className="tw-text-slate-700" />
                  )}
                  <span className="tw-absolute tw-top-3 tw-left-3 tw-bg-indigo-600/90 tw-text-[9px] tw-font-bold tw-uppercase tw-px-2 tw-py-0.5 tw-rounded-full">
                    {proj.category}
                  </span>
                </div>

                <div className="tw-p-6 tw-flex-grow">
                  <h3 className="tw-text-sm tw-font-bold tw-text-white tw-mb-2">{proj.title}</h3>
                  <p className="tw-text-xs tw-text-[#A5B4C3] tw-line-clamp-3 tw-leading-relaxed tw-mb-4">{proj.description}</p>
                  
                  {proj.technologies && (
                    <div className="tw-flex tw-flex-wrap tw-gap-1.5 tw-mb-4">
                      {proj.technologies.split(',').slice(0, 3).map((tech, i) => (
                        <span key={i} className="tw-text-[9px] tw-bg-[#0D1324] tw-text-gray-300 tw-px-2 tw-py-0.5 tw-rounded">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="tw-p-6 tw-border-t tw-border-white/5 tw-flex tw-justify-between tw-items-center">
                  <span className="tw-text-[10px] tw-text-gray-400">
                    Status: <strong className="tw-text-emerald-400">{proj.status}</strong>
                  </span>
                  {proj.live_url && (
                    <a href={proj.live_url} target="_blank" rel="noopener noreferrer" className="tw-text-xs tw-text-indigo-400 hover:tw-underline tw-font-bold">
                      Live Demo &gt;
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>

          <div className="tw-mt-12">
            <Link to="/completed-projects" className="tw-inline-flex tw-items-center tw-gap-2 tw-bg-[#131C31]/50 hover:tw-bg-[#131C31] tw-border tw-border-white/10 tw-text-xs tw-font-bold tw-px-6 tw-py-3.5 tw-rounded-[18px]">
              Browse Complete Gallery
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </section>

      {/* 8. Pricing Plans Section (Interactive Billing Switcher) */}
      <section className="tw-py-28 tw-bg-[#0D1324] tw-border-y tw-border-white/5">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-text-center">
          
          <div className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-purple-500 tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-mb-4">
            <Sparkles size={14} />
            <span>Pricing retainers</span>
          </div>

          <h2 className="tw-text-3xl sm:tw-text-4xl tw-font-black tw-text-white tw-mb-4">Transparent Pricing Tiers</h2>
          <p className="tw-text-xs sm:tw-text-sm tw-[#A5B4C3] tw-max-w-xl tw-mx-auto tw-mb-10">
            Pick a tier corresponding to your organizational requirements.
          </p>

          {/* Pricing Toggle Switch */}
          <div className="tw-flex tw-items-center tw-justify-center tw-gap-4 tw-mb-20">
            <span className={`tw-text-xs tw-font-bold ${!billingYearly ? 'tw-text-indigo-400' : 'tw-text-gray-400'}`}>Monthly Retainer</span>
            <button 
              onClick={() => setBillingYearly(!billingYearly)}
              className="tw-w-12 tw-h-6 tw-rounded-full tw-bg-indigo-600/30 tw-p-1 tw-flex tw-items-center tw-transition-all tw-border tw-border-indigo-500/20"
            >
              <span className={`tw-w-4 tw-h-4 tw-rounded-full tw-bg-indigo-400 tw-inline-block tw-transition-all ${billingYearly ? 'tw-translate-x-6' : 'tw-translate-x-0'}`}></span>
            </button>
            <div className="tw-flex tw-items-center tw-gap-2">
              <span className={`tw-text-xs tw-font-bold ${billingYearly ? 'tw-text-indigo-400' : 'tw-text-gray-400'}`}>Annual Retainer</span>
              <span className="tw-bg-emerald-500/10 tw-border tw-border-emerald-500/20 tw-text-emerald-400 tw-text-[9px] tw-font-bold tw-px-2 tw-py-0.5 tw-rounded-full">Save 20%</span>
            </div>
          </div>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-6">
            {pricingPlans.map((plan, idx) => {
              const displayPrice = plan.priceMonthly === 'Custom' 
                ? 'Custom' 
                : billingYearly 
                  ? plan.priceYearly 
                  : plan.priceMonthly;

              return (
                <div key={idx} className="tw-bg-[#131C31]/50 tw-border tw-border-white/10 hover:tw-border-indigo-500/25 tw-p-8 tw-rounded-[18px] tw-text-left tw-flex tw-flex-col tw-justify-between tw-transition-colors">
                  <div>
                    <h4 className="tw-text-xs tw-font-bold tw-text-white tw-mb-2 tw-uppercase tw-tracking-wider">{plan.title}</h4>
                    <div className="tw-text-3xl tw-font-black tw-text-indigo-400 tw-mb-5 tw-animate-fade-slide">
                      {plan.priceMonthly !== 'Custom' && '$'}{displayPrice}
                      <span className="tw-text-[10px] tw-text-gray-500 tw-font-normal tw-block tw-mt-1">Billing: {plan.billing}</span>
                    </div>
                    <ul className="tw-space-y-3 tw-mb-8 tw-text-xs tw-text-[#A5B4C3]">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="tw-flex tw-items-center tw-gap-2">
                          <Check size={14} className="tw-text-emerald-500 tw-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to="/project-request" className="tw-w-full tw-bg-indigo-600 hover:tw-bg-indigo-500 tw-text-center tw-py-3.5 tw-rounded-[18px] tw-text-xs tw-font-bold tw-text-white tw-no-underline tw-block tw-transition-all hover:tw-shadow-lg hover:tw-shadow-indigo-600/15">
                    {plan.btn}
                  </Link>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 9. Testimonials Grid Section */}
      <section className="tw-py-28 tw-bg-[#070B17]">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-text-center">
          
          <div className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-indigo-400 tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-mb-4">
            <Sparkles size={14} />
            <span>Client Feedback</span>
          </div>

          <h2 className="tw-text-3xl sm:tw-text-4xl tw-font-black tw-text-white tw-mb-4">Feedback From Technical Founders</h2>
          <p className="tw-text-xs sm:tw-text-sm tw-text-[#A5B4C3] tw-max-w-xl tw-mx-auto tw-mb-16">
            See how clients rate their collaboration with Project X Code developers.
          </p>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8">
            {testimonials.map((test) => (
              <div key={test.id} className="tw-bg-[#131C31]/50 tw-border tw-border-white/10 tw-p-8 tw-rounded-[18px] tw-text-left">
                <div className="tw-flex tw-items-center tw-gap-0.5 tw-text-amber-400 tw-mb-3">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="tw-text-xs tw-[#A5B4C3] tw-leading-relaxed tw-italic tw-mb-5">
                  "{test.message}"
                </p>
                <div>
                  <strong className="tw-text-xs tw-text-white tw-block">{test.client_name}</strong>
                  <span className="tw-text-[10px] tw-text-gray-500">{test.role}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. FAQ Accordions Section */}
      <section className="tw-py-28 tw-bg-[#0D1324] tw-border-y tw-border-white/5">
        <div className="tw-max-w-4xl tw-mx-auto tw-px-6">
          <div className="tw-text-center tw-mb-16">
            <div className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-indigo-400 tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-mb-4">
              <HelpCircle size={14} />
              <span>Common Queries</span>
            </div>
            <h2 className="tw-text-3xl tw-font-black tw-text-white">Frequently Asked Questions</h2>
          </div>

          <div className="tw-space-y-4">
            {faqItems.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="tw-bg-[#131C31]/50 tw-border tw-border-white/10 tw-rounded-[18px] tw-overflow-hidden tw-transition-colors">
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="tw-w-full tw-bg-transparent tw-flex tw-justify-between tw-items-center tw-p-6 tw-text-left tw-font-bold tw-text-xs sm:tw-text-sm tw-text-white hover:tw-bg-white/5"
                  >
                    <span>{faq.q}</span>
                    <span className="tw-text-indigo-400">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="tw-px-6 tw-pb-6 tw-text-xs tw-text-[#A5B4C3] tw-leading-relaxed tw-border-t tw-border-white/5 tw-pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. Contact Form & Maps Embed Section */}
      <section className="tw-py-28 tw-bg-[#070B17]">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6">
          <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-12">
            
            {/* Left: Contact Information */}
            <div className="tw-space-y-8 tw-text-left">
              <div>
                <div className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-blue-500 tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-mb-3">
                  <MessageSquare size={14} />
                  <span>Get In Touch</span>
                </div>
                <h2 className="tw-text-3xl tw-font-black tw-text-white tw-mb-4">Start Your Project Workspace</h2>
                <p className="tw-text-xs tw-[#A5B4C3] tw-leading-relaxed">
                  Have questions about pricing plans, development cycles, or final year projects? Fill out our form or trigger a quick WhatsApp consultation.
                </p>
              </div>

              <div className="tw-space-y-4 tw-text-xs">
                
                <div className="tw-flex tw-items-center tw-gap-3">
                  <div className="tw-w-10 tw-h-10 tw-bg-blue-600/10 tw-text-blue-400 tw-rounded-xl tw-flex tw-items-center tw-justify-center">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="tw-text-gray-500 tw-block">Phone Support</span>
                    <a href="tel:+919999999999" className="tw-text-white hover:tw-underline tw-no-underline">+91 99999 99999</a>
                  </div>
                </div>

                <div className="tw-flex tw-items-center tw-gap-3">
                  <div className="tw-w-10 tw-h-10 tw-bg-indigo-600/10 tw-text-indigo-400 tw-rounded-xl tw-flex tw-items-center tw-justify-center">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="tw-text-gray-500 tw-block">Email Sales</span>
                    <a href="mailto:prabhakarkumarsingh578@gmail.com" className="tw-text-white hover:tw-underline tw-no-underline">prabhakarkumarsingh578@gmail.com</a>
                  </div>
                </div>

              </div>

              <div>
                <a 
                  href="https://wa.me/919999999999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="tw-inline-flex tw-items-center tw-gap-2 tw-bg-emerald-600 hover:tw-bg-emerald-500 tw-text-white tw-px-6 tw-py-4 tw-rounded-[18px] tw-font-bold tw-text-xs tw-no-underline"
                >
                  <MessageSquare size={16} />
                  Chat Directly on WhatsApp
                </a>
              </div>

              {/* Map embed */}
              <div className="tw-h-56 tw-w-full tw-bg-[#131C31]/50 tw-border tw-border-white/10 tw-rounded-[18px] tw-overflow-hidden">
                <iframe 
                  title="Project X Code Office Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115021.72263884394!2d87.40268571587843!3d25.776657929424784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eff96aa2dc65e3%3A0xf6a763836d5071!2sPurnia%2C%20Bihar!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                  className="tw-w-full tw-h-full tw-border-0"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>

            </div>

            {/* Right: Interactive Contact Form */}
            <div className="tw-[#131C31]/50 tw-border tw-border-white/10 tw-p-8 tw-rounded-[18px] tw-backdrop-blur-sm tw-text-left tw-bg-[#131C31]/50">
              <h3 className="tw-text-xs tw-font-bold tw-text-white tw-mb-6 tw-uppercase tw-tracking-wider">Send an Inquiry</h3>
              
              {formSuccess && (
                <div className="tw-bg-emerald-600/10 tw-border tw-border-emerald-500/20 tw-text-emerald-400 tw-p-4 tw-rounded-xl tw-text-xs tw-mb-4">
                  {formSuccess}
                </div>
              )}
              {formError && (
                <div className="tw-bg-rose-600/10 tw-border tw-border-rose-500/20 tw-text-rose-400 tw-p-4 tw-rounded-xl tw-text-xs tw-mb-4">
                  {formError}
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="tw-space-y-4 tw-text-xs">
                
                <div>
                  <label className="tw-block tw-text-gray-400 tw-mb-1.5">Your Name</label>
                  <input 
                    type="text" 
                    required
                    className="tw-w-full tw-bg-[#0D1324] tw-border tw-border-white/10 tw-rounded-xl tw-p-3.5 tw-text-white focus:tw-outline-none focus:tw-border-indigo-500"
                    placeholder="John Doe"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="tw-block tw-text-gray-400 tw-mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    required
                    className="tw-w-full tw-bg-[#0D1324] tw-border tw-border-white/10 tw-rounded-xl tw-p-3.5 tw-text-white focus:tw-outline-none focus:tw-border-indigo-500"
                    placeholder="john@example.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="tw-block tw-text-gray-400 tw-mb-1.5">Subject</label>
                  <input 
                    type="text" 
                    required
                    className="tw-w-full tw-bg-[#0D1324] tw-border tw-border-white/10 tw-rounded-xl tw-p-3.5 tw-text-white focus:tw-outline-none focus:tw-border-indigo-500"
                    placeholder="Website Redesign / College Project Proposal"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  />
                </div>

                <div>
                  <label className="tw-block tw-text-gray-400 tw-mb-1.5">Message Description</label>
                  <textarea 
                    required
                    rows="4"
                    className="tw-w-full tw-bg-[#0D1324] tw-border tw-border-white/10 tw-rounded-xl tw-p-3.5 tw-text-white focus:tw-outline-none focus:tw-border-indigo-500 tw-h-28"
                    placeholder="Briefly describe your requirements..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formLoading}
                  className="tw-w-full tw-bg-indigo-600 hover:tw-bg-indigo-500 disabled:tw-bg-gray-800 disabled:tw-text-gray-500 tw-text-white tw-font-bold tw-py-4 tw-rounded-xl tw-transition-colors"
                >
                  {formLoading ? 'Submitting...' : 'Dispatch Request'}
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
