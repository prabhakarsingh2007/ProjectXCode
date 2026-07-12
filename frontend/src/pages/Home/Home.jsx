import React, { useEffect, useState } from 'react';
import Hero from '../../components/Hero/Hero';
import Loader from '../../components/Loader/Loader';
import { serviceApi } from '../../api/serviceApi';
import { contactApi } from '../../api/contactApi';
import { 
  ArrowRight, Sparkles, Shield, Rocket, Laptop, Database, Globe, 
  Smartphone, Search, HeartHandshake, FileText, CheckCircle2, 
  HelpCircle, MessageSquare, Phone, Mail, Award, Users, Star, 
  Cpu, Activity, Code2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const Home = () => {
  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

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
    { title: 'Clean Architecture', desc: 'Strict separation of concern metrics following DRY programming patterns.', icon: Code2 },
    { title: 'Secure Development', desc: 'Enforced HttpOnly cookies, parameterized DB ORM schemas, and CORS defenses.', icon: Shield },
    { title: 'Responsive Design', desc: 'Responsive CSS styles collapsing cleanly across mobile, tablet, and widescreen views.', icon: Laptop },
    { title: 'SEO Optimized', desc: 'Meta tags, automated XML index templates, and lightning-fast loading score values.', icon: Search },
    { title: 'Lifetime Support', desc: 'Continuous patch support updates and ticket routing systems to resolve production anomalies.', icon: HeartHandshake },
  ];

  // Stepper Process
  const stepsList = [
    { num: '01', title: 'Requirement', desc: 'Defining project scopes and compiling client-specific files.' },
    { num: '02', title: 'Planning', desc: 'Plotting milestones, sprints tasks, and database specifications.' },
    { num: '03', title: 'Design', desc: 'Drafting high-fidelity UI layout grids and interface workflows.' },
    { num: '04', title: 'Development', desc: 'Engineering modular frontend React pages and secure Django APIs.' },
    { num: '05', title: 'Testing', desc: 'Conducting unit, regression, integration, and security checks.' },
    { num: '06', title: 'Deployment', desc: 'Orchestrating server targets behind Nginx reverse proxies.' },
    { num: '07', title: 'Support', desc: 'Opening ticket help desks and logging system analytics.' },
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

  // Pricing Plans
  const pricingPlans = [
    { title: 'Basic Startup', price: '799', billing: 'One-Time', features: ['Responsive Website Design', '3 Custom Pages Design', 'Contact Enquiry Forms', 'Tailwind CSS Layout', 'Google Maps Embeds', '1 Month Technical Support'], btn: 'Get Started' },
    { title: 'Standard Portal', price: '1,899', billing: 'One-Time', features: ['Web Application Development', 'React SPA Interfaces', 'Django REST backend API', 'Standard SQLite Database', 'Secure Session Logins', '3 Months Support Support'], btn: 'Launch Project' },
    { title: 'Premium Platform', price: '3,499', billing: 'One-Time', features: ['Custom Corporate Platform', 'Next.js / React SSR', 'PostgreSQL DB Integration', 'HttpOnly Cookie JWT auth', 'Stripe Payments Checkout', '6 Months Support Support'], btn: 'Deploy Platform' },
    { title: 'Enterprise Suite', price: 'Custom', billing: 'Scale Rates', features: ['Full Stack Cloud Networks', 'Dedicated Support Channels', 'Automated PDF Invoicing', 'Rotating Logs Archiving', 'Docker Swarm deployment', 'Lifetime Support SLA'], btn: 'Contact Enterprise' },
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
    <div className="tw-bg-[#0F172A] tw-text-white tw-min-h-screen tw-font-sans tw-overflow-x-hidden">
      
      {/* 1. Hero Section Banner */}
      <Hero />

      {/* 2. Statistics Grid Section */}
      <section className="tw-py-16 tw-bg-[#0F172A] tw-relative">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6">
          <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-6">
            
            <div className="tw-bg-[#1E293B]/40 tw-border tw-border-gray-800/60 tw-p-6 tw-rounded-2xl tw-text-center tw-backdrop-blur-sm hover:tw-border-blue-500/25 tw-transition-colors">
              <Award className="tw-mx-auto tw-text-blue-500 tw-mb-2" size={24} />
              <div className="tw-text-3xl tw-font-extrabold tw-text-white">120+</div>
              <div className="tw-text-xs tw-text-gray-400 tw-mt-1 tw-font-semibold">Projects Completed</div>
            </div>

            <div className="tw-bg-[#1E293B]/40 tw-border tw-border-gray-800/60 tw-p-6 tw-rounded-2xl tw-text-center tw-backdrop-blur-sm hover:tw-border-indigo-500/25 tw-transition-colors">
              <Users className="tw-mx-auto tw-text-indigo-500 tw-mb-2" size={24} />
              <div className="tw-text-3xl tw-font-extrabold tw-text-white">80+</div>
              <div className="tw-text-xs tw-text-gray-400 tw-mt-1 tw-font-semibold">Happy Clients</div>
            </div>

            <div className="tw-bg-[#1E293B]/40 tw-border tw-border-gray-800/60 tw-p-6 tw-rounded-2xl tw-text-center tw-backdrop-blur-sm hover:tw-border-cyan-500/25 tw-transition-colors">
              <Star className="tw-mx-auto tw-text-cyan-500 tw-mb-2" size={24} />
              <div className="tw-text-3xl tw-font-extrabold tw-text-white">5+</div>
              <div className="tw-text-xs tw-text-gray-400 tw-mt-1 tw-font-semibold">Years of Experience</div>
            </div>

            <div className="tw-bg-[#1E293B]/40 tw-border tw-border-gray-800/60 tw-p-6 tw-rounded-2xl tw-text-center tw-backdrop-blur-sm hover:tw-border-emerald-500/25 tw-transition-colors">
              <CheckCircle2 className="tw-mx-auto tw-text-emerald-500 tw-mb-2" size={24} />
              <div className="tw-text-3xl tw-font-extrabold tw-text-white">99.9%</div>
              <div className="tw-text-xs tw-text-gray-400 tw-mt-1 tw-font-semibold">Client Satisfaction</div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Services Highlights Section */}
      <section className="tw-py-20 tw-border-t tw-border-gray-800/40">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-text-center">
          <div className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-blue-400 tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-mb-4">
            <Sparkles size={14} />
            <span>Core Competencies</span>
          </div>
          <h2 className="tw-text-3xl sm:tw-text-4xl tw-font-bold tw-text-white tw-mb-4">What We Do Best</h2>
          <p className="tw-text-sm tw-text-gray-400 tw-max-w-xl tw-mx-auto tw-mb-12">
            Engineering robust frontend React applications and enterprise-grade Django REST frameworks tailored for scaling business metrics.
          </p>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
            {coreServices.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div key={idx} className="tw-bg-[#1E293B]/40 tw-border tw-border-gray-800/60 hover:tw-border-blue-500/30 tw-transition-all tw-duration-300 tw-p-6 tw-rounded-2xl tw-text-left tw-flex tw-flex-col tw-gap-4 hover:tw-shadow-xl hover:tw-shadow-blue-500/5">
                  <div className="tw-w-10 tw-h-10 tw-rounded-lg tw-bg-blue-600/15 tw-text-blue-400 tw-flex tw-items-center tw-justify-center">
                    <IconComp size={20} />
                  </div>
                  <div>
                    <h3 className="tw-text-base tw-font-bold tw-text-white tw-mb-1.5">{srv.title}</h3>
                    <p className="tw-text-xs tw-text-gray-400 tw-leading-relaxed">{srv.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="tw-py-20 tw-bg-[#0F172A] tw-border-t tw-border-gray-800/40">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-text-center">
          <div className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-indigo-400 tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-mb-4">
            <Sparkles size={14} />
            <span>Competitive Advantages</span>
          </div>
          <h2 className="tw-text-3xl sm:tw-text-4xl tw-font-bold tw-text-white tw-mb-4">Why Businesses Choose Us</h2>
          <p className="tw-text-sm tw-text-gray-400 tw-max-w-xl tw-mx-auto tw-mb-12">
            Accelerate delivery paths without compromising security parameters, code validation checks, or support guarantees.
          </p>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
            {featuresList.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div key={idx} className="tw-bg-[#1E293B]/20 tw-border tw-border-gray-800/40 hover:tw-border-indigo-500/20 tw-p-6 tw-rounded-xl tw-text-left tw-flex tw-gap-4 tw-transition-colors">
                  <div className="tw-text-indigo-400 tw-mt-1">
                    <IconComp size={20} />
                  </div>
                  <div>
                    <h4 className="tw-text-sm tw-font-bold tw-text-white tw-mb-1">{feat.title}</h4>
                    <p className="tw-text-xs tw-text-gray-400 tw-leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Development Process Section */}
      <section className="tw-py-20 tw-border-t tw-border-gray-800/40 tw-bg-[#1E293B]/10">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-text-center">
          <div className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-cyan-400 tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-mb-4">
            <Sparkles size={14} />
            <span>Workflow Stepper</span>
          </div>
          <h2 className="tw-text-3xl sm:tw-text-4xl tw-font-bold tw-text-white tw-mb-4">Our Development Process</h2>
          <p className="tw-text-sm tw-text-gray-400 tw-max-w-xl tw-mx-auto tw-mb-16">
            How we translate client requirements into secure production deployments.
          </p>

          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-7 tw-gap-4 tw-relative">
            {stepsList.map((step, idx) => (
              <div key={idx} className="tw-bg-[#1E293B]/40 tw-border tw-border-gray-800/60 tw-p-4 tw-rounded-xl tw-text-left tw-flex tw-flex-col tw-justify-between tw-transition-all hover:tw-border-cyan-500/20">
                <div>
                  <div className="tw-text-lg tw-font-bold tw-text-cyan-400 tw-mb-2">{step.num}</div>
                  <h4 className="tw-text-xs tw-font-bold tw-text-white tw-mb-1">{step.title}</h4>
                  <p className="tw-text-[10px] tw-text-gray-400 tw-leading-normal">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Technologies We Use Section */}
      <section className="tw-py-20 tw-border-t tw-border-gray-800/40">
        <div className="tw-max-w-5xl tw-mx-auto tw-px-6 tw-text-center">
          <h3 className="tw-text-lg tw-font-bold tw-text-gray-400 tw-mb-8">Technologies We Master</h3>
          <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 tw-gap-4">
            {techList.map((tech, idx) => (
              <div key={idx} className={`tw-bg-[#1E293B]/40 tw-border ${tech.color} tw-p-4 tw-rounded-xl tw-text-center`}>
                <div className="tw-text-sm tw-font-bold tw-text-white">{tech.name}</div>
                <div className="tw-text-[10px] tw-text-gray-400 tw-mt-1">{tech.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Completed Projects Showcase */}
      <section className="tw-py-20 tw-bg-[#1E293B]/10 tw-border-t tw-border-gray-800/40">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-text-center">
          <div className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-blue-400 tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-mb-4">
            <Sparkles size={14} />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="tw-text-3xl sm:tw-text-4xl tw-font-bold tw-text-white tw-mb-4">Recent Deliveries</h2>
          <p className="tw-text-sm tw-text-gray-400 tw-max-w-xl tw-mx-auto tw-mb-12">
            Explore how we partnered with global companies to build their core portal services.
          </p>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
            {portfolio.map((proj) => (
              <div key={proj.id} className="tw-bg-[#1E293B]/40 tw-border tw-border-gray-800/60 tw-rounded-2xl tw-overflow-hidden tw-text-left tw-flex tw-flex-col tw-justify-between hover:tw-border-blue-500/20 tw-transition-colors">
                
                {/* Mock image placeholder container */}
                <div className="tw-h-48 tw-w-full tw-bg-slate-800 tw-flex tw-items-center tw-justify-center tw-relative tw-overflow-hidden">
                  {proj.image_url ? (
                    <img src={proj.image_url} alt={proj.title} className="tw-object-cover tw-w-full tw-h-full" />
                  ) : (
                    <Laptop size={44} className="tw-text-slate-600" />
                  )}
                  <span className="tw-absolute tw-top-3 tw-left-3 tw-bg-blue-600/90 tw-text-[9px] tw-font-bold tw-uppercase tw-px-2 tw-py-0.5 tw-rounded-full">
                    {proj.category}
                  </span>
                </div>

                <div className="tw-p-5 tw-flex-grow">
                  <h3 className="tw-text-sm tw-font-bold tw-text-white tw-mb-2">{proj.title}</h3>
                  <p className="tw-text-xs tw-text-gray-400 tw-line-clamp-3 tw-leading-relaxed tw-mb-4">{proj.description}</p>
                  
                  {proj.technologies && (
                    <div className="tw-flex tw-flex-wrap tw-gap-1.5 tw-mb-4">
                      {proj.technologies.split(',').slice(0, 3).map((tech, i) => (
                        <span key={i} className="tw-text-[9px] tw-bg-gray-800 tw-text-gray-300 tw-px-2 tw-py-0.5 tw-rounded">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="tw-p-5 tw-border-t tw-border-gray-800/60 tw-flex tw-justify-between tw-items-center">
                  <span className="tw-text-[10px] tw-text-gray-400">
                    Status: <strong className="tw-text-emerald-400">{proj.status}</strong>
                  </span>
                  {proj.live_url && (
                    <a href={proj.live_url} target="_blank" rel="noopener noreferrer" className="tw-text-xs tw-text-blue-400 hover:tw-underline tw-font-semibold">
                      Live Demo &gt;
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>

          <div className="tw-mt-10">
            <Link to="/completed-projects" className="tw-inline-flex tw-items-center tw-gap-1.5 tw-bg-gray-800 hover:tw-bg-gray-700 tw-border tw-border-gray-700 tw-text-xs tw-font-bold tw-px-4 tw-py-2 tw-rounded-md">
              Browse Complete Gallery
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </section>

      {/* 8. Pricing Plans Section */}
      <section className="tw-py-20 tw-border-t tw-border-gray-800/40">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-text-center">
          <div className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-indigo-400 tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-mb-4">
            <Sparkles size={14} />
            <span>Pricing Matrices</span>
          </div>
          <h2 className="tw-text-3xl sm:tw-text-4xl tw-font-bold tw-text-white tw-mb-4">Transparent Pricing Tiers</h2>
          <p className="tw-text-sm tw-text-gray-400 tw-max-w-xl tw-mx-auto tw-mb-16">
            Pick a tier corresponding to your organizational requirements.
          </p>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-6">
            {pricingPlans.map((plan, idx) => (
              <div key={idx} className="tw-bg-[#1E293B]/40 tw-border tw-border-gray-800/60 hover:tw-border-indigo-500/25 tw-p-6 tw-rounded-2xl tw-text-left tw-flex tw-flex-col tw-justify-between tw-transition-colors">
                <div>
                  <h4 className="tw-text-sm tw-font-bold tw-text-white tw-mb-2">{plan.title}</h4>
                  <div className="tw-text-2xl tw-font-extrabold tw-text-indigo-400 tw-mb-4">
                    {plan.price !== 'Custom' && '$'}{plan.price}
                    <span className="tw-text-[10px] tw-text-gray-500 tw-font-normal tw-block tw-mt-0.5">Billing: {plan.billing}</span>
                  </div>
                  <ul className="tw-space-y-2 tw-mb-6 tw-text-[10px] tw-text-gray-400">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="tw-flex tw-items-center tw-gap-1.5">
                        <CheckCircle2 size={12} className="tw-text-emerald-500 tw-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to="/project-request" className="tw-w-full tw-bg-gray-800 hover:tw-bg-gray-700 tw-text-center tw-py-2 tw-rounded-lg tw-text-xs tw-font-bold tw-text-white tw-no-underline tw-block">
                  {plan.btn}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Testimonials Grid Section */}
      <section className="tw-py-20 tw-bg-[#1E293B]/10 tw-border-t tw-border-gray-800/40">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-text-center">
          <div className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-blue-400 tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-mb-4">
            <Sparkles size={14} />
            <span>Testimonial Quotes</span>
          </div>
          <h2 className="tw-text-3xl sm:tw-text-4xl tw-font-bold tw-text-white tw-mb-4">Feedback From Technical Founders</h2>
          <p className="tw-text-sm tw-text-gray-400 tw-max-w-xl tw-mx-auto tw-mb-12">
            See how clients rate their collaboration with Project X Code developers.
          </p>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
            {testimonials.map((test) => (
              <div key={test.id} className="tw-bg-[#1E293B]/40 tw-border tw-border-gray-800/60 tw-p-6 tw-rounded-2xl tw-text-left">
                <div className="tw-flex tw-items-center tw-gap-0.5 tw-text-amber-400 tw-mb-2">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </div>
                <p className="tw-text-xs tw-text-gray-300 tw-leading-relaxed tw-italic tw-mb-4">
                  "{test.message}"
                </p>
                <div className="tw-flex tw-items-center tw-gap-3">
                  <div>
                    <strong className="tw-text-xs tw-text-white tw-block">{test.client_name}</strong>
                    <span className="tw-text-[10px] tw-text-gray-500">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ Accordions Section */}
      <section className="tw-py-20 tw-border-t tw-border-gray-800/40">
        <div className="tw-max-w-4xl tw-mx-auto tw-px-6">
          <div className="tw-text-center tw-mb-12">
            <div className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-indigo-400 tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-mb-4">
              <HelpCircle size={14} />
              <span>Common Queries</span>
            </div>
            <h2 className="tw-text-3xl tw-font-bold tw-text-white">Frequently Asked Questions</h2>
          </div>

          <div className="tw-space-y-4">
            {faqItems.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="tw-bg-[#1E293B]/40 tw-border tw-border-gray-800/60 tw-rounded-xl tw-overflow-hidden tw-transition-colors">
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="tw-w-full tw-flex tw-justify-between tw-items-center tw-p-5 tw-text-left tw-font-bold tw-text-xs tw-text-white hover:tw-bg-gray-800/20"
                  >
                    <span>{faq.q}</span>
                    <span className="tw-text-indigo-400">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="tw-px-5 tw-pb-5 tw-text-xs tw-text-gray-400 tw-leading-relaxed tw-border-t tw-border-gray-800/40 tw-pt-4">
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
      <section className="tw-py-20 tw-border-t tw-border-gray-800/40 tw-bg-[#1E293B]/10">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-6">
          <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-12">
            
            {/* Left column: Contact Information */}
            <div className="tw-space-y-6 tw-text-left">
              <div>
                <div className="tw-inline-flex tw-items-center tw-gap-1.5 tw-text-blue-400 tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-mb-3">
                  <MessageSquare size={14} />
                  <span>Get In Touch</span>
                </div>
                <h2 className="tw-text-3xl tw-font-bold tw-text-white tw-mb-4">Start Your Project Workspace</h2>
                <p className="tw-text-xs tw-text-gray-400 tw-leading-relaxed">
                  Have questions about pricing plans, development cycles, or final year projects? Fill out our form or trigger a quick WhatsApp consultation.
                </p>
              </div>

              <div className="tw-space-y-4 tw-text-xs">
                
                <div className="tw-flex tw-items-center tw-gap-3">
                  <div className="tw-w-9 tw-h-9 tw-bg-blue-600/10 tw-text-blue-400 tw-rounded-lg tw-flex tw-items-center tw-justify-center">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="tw-text-gray-500 tw-block">Phone Support</span>
                    <a href="tel:+919999999999" className="tw-text-white hover:tw-underline tw-no-underline">+91 99999 99999</a>
                  </div>
                </div>

                <div className="tw-flex tw-items-center tw-gap-3">
                  <div className="tw-w-9 tw-h-9 tw-bg-indigo-600/10 tw-text-indigo-400 tw-rounded-lg tw-flex tw-items-center tw-justify-center">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="tw-text-gray-500 tw-block">Email Sales</span>
                    <a href="mailto:prabhakarkumarsingh578@gmail.com" className="tw-text-white hover:tw-underline tw-no-underline">prabhakarkumarsingh578@gmail.com</a>
                  </div>
                </div>

              </div>

              {/* WhatsApp direct trigger */}
              <div>
                <a 
                  href="https://wa.me/919999999999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="tw-inline-flex tw-items-center tw-gap-2 tw-bg-emerald-600 hover:tw-bg-emerald-500 tw-text-white tw-px-5 tw-py-3 tw-rounded-xl tw-font-bold tw-text-xs tw-no-underline"
                >
                  <MessageSquare size={16} />
                  Chat Directly on WhatsApp
                </a>
              </div>

              {/* Map embed container */}
              <div className="tw-h-48 tw-w-full tw-bg-slate-800 tw-border tw-border-gray-800 tw-rounded-2xl tw-overflow-hidden">
                <iframe 
                  title="Project X Code Office Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115021.72263884394!2d87.40268571587843!3d25.776657929424784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eff96aa2dc65e3%3A0xf6a763836d5071!2sPurnia%2C%20Bihar!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                  className="tw-w-full tw-h-full tw-border-0"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>

            </div>

            {/* Right column: Interactive Contact Form */}
            <div className="tw-bg-[#1E293B]/40 tw-border tw-border-gray-800/60 tw-p-8 tw-rounded-2xl tw-backdrop-blur-sm tw-text-left">
              <h3 className="tw-text-sm tw-font-bold tw-text-white tw-mb-6">Send an Inquiry</h3>
              
              {formSuccess && (
                <div className="tw-bg-emerald-600/10 tw-border tw-border-emerald-500/20 tw-text-emerald-400 tw-p-3 tw-rounded-lg tw-text-xs tw-mb-4">
                  {formSuccess}
                </div>
              )}
              {formError && (
                <div className="tw-bg-rose-600/10 tw-border tw-border-rose-500/20 tw-text-rose-400 tw-p-3 tw-rounded-lg tw-text-xs tw-mb-4">
                  {formError}
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="tw-space-y-4 tw-text-xs">
                
                <div>
                  <label className="tw-block tw-text-gray-400 tw-mb-1">Your Name</label>
                  <input 
                    type="text" 
                    required
                    className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-lg tw-p-3 tw-text-white focus:tw-outline-none focus:tw-border-blue-500"
                    placeholder="John Doe"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="tw-block tw-text-gray-400 tw-mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-lg tw-p-3 tw-text-white focus:tw-outline-none focus:tw-border-blue-500"
                    placeholder="john@example.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="tw-block tw-text-gray-400 tw-mb-1">Subject</label>
                  <input 
                    type="text" 
                    required
                    className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-lg tw-p-3 tw-text-white focus:tw-outline-none focus:tw-border-blue-500"
                    placeholder="Website Redesign / College Project Proposal"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  />
                </div>

                <div>
                  <label className="tw-block tw-text-gray-400 tw-mb-1">Message Description</label>
                  <textarea 
                    required
                    rows="4"
                    className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-lg tw-p-3 tw-text-white focus:tw-outline-none focus:tw-border-blue-500 tw-h-24"
                    placeholder="Briefly describe your requirements..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formLoading}
                  className="tw-w-full tw-bg-blue-600 hover:tw-bg-blue-500 disabled:tw-bg-gray-800 disabled:tw-text-gray-500 tw-text-white tw-font-bold tw-py-3 tw-rounded-lg tw-transition-colors"
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
