import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import { serviceApi } from '../../api/serviceApi';
import { contactApi } from '../../api/contactApi';
import { 
  Folder, FileCode, Play, Terminal, Layers, Tag, HelpCircle, 
  MessageSquare, Globe, Laptop, Database, Cpu, Activity, ArrowRight,
  Sparkles, CheckCircle2, Star, Phone, Mail, Award, Users, Code2, 
  ChevronRight, Laptop2, Shield, HeartHandshake, Search, Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const Home = () => {
  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Studio Active Tab Explorer File State
  const [activeFile, setActiveFile] = useState('01_hero.md');

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
        setPortfolio(portfolioRes.slice(0, 3));
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
      setFormSuccess('Request submitted! Our lead developer will reach out shortly.');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setFormError('Submission failed. Please verify network and try again.');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return <Loader fullPage />;
  }

  // 11 Files inside Explorer Mock Filesystem
  const workspaceFiles = [
    { name: '01_hero.md', label: '01_hero.md', category: 'Landing', icon: FileCode },
    { name: '02_stats.json', label: '02_stats.json', category: 'Metrics', icon: FileCode },
    { name: '03_services.tsx', label: '03_services.tsx', category: 'Capabilities', icon: FileCode },
    { name: '04_why_us.yaml', label: '04_why_us.yaml', category: 'Quality', icon: FileCode },
    { name: '05_process.py', label: '05_process.py', category: 'Sprints', icon: FileCode },
    { name: '06_tech_stack.sql', label: '06_tech_stack.sql', category: 'Database', icon: FileCode },
    { name: '07_portfolio.db', label: '07_portfolio.db', category: 'Deliveries', icon: FileCode },
    { name: '08_pricing.ini', label: '08_pricing.ini', category: 'Plans', icon: FileCode },
    { name: '09_testimonials.csv', label: '09_testimonials.csv', category: 'Reviews', icon: FileCode },
    { name: '10_faq.xml', label: '10_faq.xml', category: 'Support', icon: FileCode },
    { name: '11_contact.sh', label: '11_contact.sh', category: 'Consultation', icon: FileCode },
  ];

  // Helper function to return Mock Code syntax text corresponding to the active file
  const getMockCode = (file) => {
    switch (file) {
      case '01_hero.md':
        return `# Brand Profile: Project X Code
# Theme: Premium Dark + High-Performance Interfaces
# Category: SaaS Software Delivery Agency

- Headline: We Engineer World-Class Digital Solutions
- Subtitle: Custom React frontends coupled with secure Django backend microservices.
- Target: Attracting real client portfolios and enterprise requests.
- Actions:
  * GetStarted -> '/project-request'
  * RequestQuote -> '/contact'`;

      case '02_stats.json':
        return `{
  "organization": "Project X Code",
  "agencyMetrics": {
    "projectsCompleted": 120,
    "happyClients": 80,
    "yearsOfExperience": 5,
    "clientSatisfaction": "99.9%"
  },
  "databaseBinding": "PostgreSQL Active"
}`;

      case '03_services.tsx':
        return `import { WebApp, CustomSoftware, ECommerce } from 'projectxcode';

export default function CoreCapabilities() {
  return [
    "Website Development",
    "Web Application Engineering",
    "Custom Business Software",
    "E-Commerce Networks",
    "REST/GraphQL API Development",
    "UI/UX Design Mockups",
    "Website Maintenance SLA"
  ];
}`;

      case '04_why_us.yaml':
        return `whyChooseUs:
  - fastDelivery: Sprints resolved with exact milestones.
  - cleanCode: STRICT DRY principles and modular separation.
  - secureDevelopment: Parameterized ORMs and DEFCON 4 checks.
  - responsiveDesign: Collapses flawlessly on mobile.
  - seoOptimized: Semantic HTML structure and speed scoring.
  - lifetimeSupport: Support ticketing channel SLA.`;

      case '05_process.py':
        return `def run_project_sprint(client_scope):
    process = [
        "01_Requirement_Elicitation",
        "02_Strategic_Planning",
        "03_Wireframes_UI_Design",
        "04_Full_Stack_Development",
        "05_QA_Security_Audit",
        "06_Server_Deployment_Setup",
        "07_Post_Launch_Support"
    ]
    return [stage for stage in process]`;

      case '06_tech_stack.sql':
        return `SELECT name, stack_role FROM technologies_master
WHERE name IN (
  'React.js', 'Next.js', 
  'Django REST', 'Python', 
  'Node.js', 'PostgreSQL', 
  'MySQL', 'Tailwind CSS'
) ORDER BY stack_role;`;

      case '07_portfolio.db':
        return `SELECT title, category, status, live_demo_url 
FROM db_portfolio_items 
LIMIT 3;

-- OUTPUT BINDINGS:
-- 1. Vibe Social Media App (Completed) -> /vibe-social
-- 2. Nova CRM Dashboard (Completed) -> /nova-crm
-- 3. E-Learning Portal (Completed) -> /elearning-portal`;

      case '08_pricing.ini':
        return `[basic_startup]
price = "$799"
pages = "3 Custom Pages"
support = "1 Month Technical Support"

[standard_portal]
price = "$1,899"
database = "SQLite / MySQL"
support = "3 Months Support SLA"

[premium_platform]
price = "$3,499"
checkout = "Stripe Integrated"
support = "6 Months Technical SLA"

[enterprise_suite]
price = "Custom"
deployment = "Docker Containerized"
support = "Lifetime SLA Channel"`;

      case '09_testimonials.csv':
        return `client_name,role,rating,feedback
"Amit Kumar","CTO, TechCorp",5,"Delivered the portal 2 weeks early. Absolute pros."
"Sarah Miller","Founder, SparkSaaS",5,"The React interface combined with Django backend works perfectly."`;

      case '10_faq.xml':
        return `<faq>
  <question text="What technologies are used?">
    <answer text="React.js, Next.js, Django backend, Python, and PostgreSQL." />
  </question>
  <question text="Can I request final year college projects?">
    <answer text="Yes, we support students with documentation and setup scripts." />
  </question>
</faq>`;

      case '11_contact.sh':
        return `#!/bin/bash
echo "Dispatching inquiry payload to /api/enquiries/..."

curl -X POST \\
  -H "Content-Type: application/json" \\
  -d '{"name":"User","email":"user@test.com","msg":"Hello ProjectXCode"}' \\
  http://localhost:8000/api/enquiries/

echo "PostgreSQL write completed successfully."`;

      default:
        return '';
    }
  };

  return (
    <div className="tw-bg-[#0F172A] tw-text-white tw-min-h-screen tw-font-mono tw-overflow-x-hidden tw-relative tw-pb-24">
      
      {/* Background Gradients */}
      <div className="tw-absolute tw-top-[-10%] tw-left-[-10%] tw-w-[50%] tw-h-[50%] tw-bg-indigo-600/10 tw-rounded-full tw-filter tw-blur-[120px] tw-pointer-events-none"></div>
      <div className="tw-absolute tw-bottom-[20%] tw-right-[-10%] tw-w-[40%] tw-h-[40%] tw-bg-blue-600/10 tw-rounded-full tw-filter tw-blur-[120px] tw-pointer-events-none"></div>

      {/* Main Studio Title & Headline */}
      <header className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-pt-32 tw-pb-10 tw-text-center">
        <div className="tw-inline-flex tw-items-center tw-gap-2.5 tw-bg-indigo-500/10 tw-border tw-border-indigo-500/20 tw-text-indigo-400 tw-px-4 tw-py-2 tw-rounded-full tw-text-xs tw-font-semibold tw-tracking-wide tw-uppercase tw-mb-6">
          <Terminal size={14} className="tw-animate-pulse" />
          <span>Interactive Project Console Workspace</span>
        </div>
        <h1 className="tw-text-4xl sm:tw-text-5xl lg:tw-text-6xl tw-font-extrabold tw-tracking-tight tw-leading-none tw-text-white">
          We Engineer <span className="tw-bg-gradient-to-r tw-from-blue-400 tw-via-indigo-400 tw-to-cyan-400 tw-bg-clip-text tw-text-transparent">Custom Code</span>
        </h1>
        <p className="tw-text-xs sm:tw-text-sm tw-text-gray-400 tw-max-w-2xl tw-mx-auto tw-mt-4 tw-leading-relaxed tw-font-mono">
          Explore our interactive console dashboard. Select a workspace module file on the left side, inspect the code configuration, and view the live rendering output panel on the right.
        </p>
      </header>

      {/* -------------------- STUDIO CONSOLE WORKSPACE -------------------- */}
      <section className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-mb-16">
        
        <div className="tw-bg-[#1E293B]/70 tw-border tw-border-gray-800 tw-rounded-2xl tw-shadow-2xl tw-overflow-hidden tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-h-[750px] tw-backdrop-blur-md">
          
          {/* A. Left Sidebar Explorer (Col: 3) */}
          <div className="lg:tw-col-span-3 tw-bg-[#0F172A]/80 tw-border-r tw-border-gray-800 tw-flex tw-flex-col tw-h-full tw-overflow-y-auto">
            
            {/* Header Title */}
            <div className="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-3.5 tw-border-b tw-border-gray-800">
              <span className="tw-text-[10px] tw-text-gray-400 tw-font-bold tw-tracking-wider tw-uppercase">Workspace Explorer</span>
              <span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-emerald-500 tw-inline-block tw-animate-pulse" title="Database Connected"></span>
            </div>

            {/* Folder Name */}
            <div className="tw-px-3 tw-py-2.5 tw-flex tw-items-center tw-gap-2 tw-text-indigo-400 tw-text-xs tw-font-bold">
              <Folder size={14} />
              <span>project_x_code/</span>
            </div>

            {/* Mock Files Navigation Links */}
            <nav className="tw-flex-1 tw-px-2 tw-pb-4 tw-space-y-1">
              {workspaceFiles.map((file) => {
                const IconComp = file.icon;
                const isSelected = activeFile === file.name;
                return (
                  <button
                    key={file.name}
                    onClick={() => setActiveFile(file.name)}
                    className={`tw-w-full tw-flex tw-items-center tw-justify-between tw-px-3 tw-py-2 tw-rounded-lg tw-text-left tw-transition-colors ${
                      isSelected 
                        ? 'tw-bg-blue-600/15 tw-text-blue-400 tw-border tw-border-blue-500/20' 
                        : 'hover:tw-bg-gray-800/40 tw-text-gray-400 tw-border tw-border-transparent'
                    }`}
                  >
                    <div className="tw-flex tw-items-center tw-gap-2.5 tw-min-w-0">
                      <IconComp size={12} className={isSelected ? 'tw-text-blue-400' : 'tw-text-gray-500'} />
                      <span className="tw-text-[11px] tw-truncate tw-font-mono">{file.label}</span>
                    </div>
                    <span className="tw-text-[8px] tw-bg-gray-800 tw-text-gray-500 tw-px-1.5 tw-py-0.5 tw-rounded tw-font-mono">
                      {file.category}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* B. Middle Code Panel (Col: 4) */}
          <div className="lg:tw-col-span-4 tw-bg-[#0F172A]/40 tw-border-r tw-border-gray-800 tw-flex tw-flex-col tw-h-full tw-overflow-hidden">
            
            {/* Header controls bar */}
            <div className="tw-px-4 tw-py-3 tw-border-b tw-border-gray-800 tw-flex tw-items-center tw-justify-between">
              <span className="tw-text-[10px] tw-text-gray-500 tw-font-mono">{activeFile} — Source</span>
              <div className="tw-flex tw-gap-1">
                <span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-rose-500/80"></span>
                <span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-amber-500/80"></span>
                <span className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-emerald-500/80"></span>
              </div>
            </div>

            {/* Code syntax block */}
            <div className="tw-flex-1 tw-p-4 tw-overflow-auto tw-font-mono tw-text-[10px] tw-text-left tw-leading-relaxed tw-whitespace-pre-wrap tw-text-slate-300 tw-bg-slate-900/10">
              {getMockCode(activeFile)}
            </div>

          </div>

          {/* C. Right Browser Live Preview (Col: 5) */}
          <div className="lg:tw-col-span-5 tw-bg-[#1E293B]/20 tw-flex tw-flex-col tw-h-full tw-overflow-hidden">
            
            {/* Browser preview top bar */}
            <div className="tw-px-4 tw-py-2.5 tw-border-b tw-border-gray-800 tw-bg-[#0F172A]/50 tw-flex tw-items-center tw-gap-2">
              <div className="tw-flex tw-gap-1 tw-shrink-0">
                <span className="tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-slate-700"></span>
                <span className="tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-slate-700"></span>
              </div>
              <div className="tw-bg-[#0F172A] tw-border tw-border-gray-800 tw-rounded-md tw-px-3 tw-py-1 tw-text-[9px] tw-text-gray-400 tw-truncate tw-w-full tw-text-left">
                http://localhost:5173/preview/{activeFile.split('.')[0]}
              </div>
              <Play size={10} className="tw-text-emerald-400 tw-shrink-0" />
            </div>

            {/* Dynamic Rendering Container */}
            <div className="tw-flex-1 tw-p-6 tw-overflow-y-auto tw-text-left tw-relative tw-bg-[#0F172A]/20">
              
              {/* 1. HERO PREVIEW */}
              {activeFile === '01_hero.md' && (
                <div className="tw-space-y-6 tw-animate-fadeIn">
                  <div className="tw-inline-flex tw-items-center tw-gap-1.5 tw-bg-blue-500/15 tw-border tw-border-blue-500/25 tw-text-blue-400 tw-px-3 tw-py-1 tw-rounded-full tw-text-[9px] tw-font-bold">
                    <Sparkles size={10} />
                    <span>Project X Code Core</span>
                  </div>
                  <h3 className="tw-text-2xl tw-font-bold tw-text-white tw-leading-tight">
                    We Engineer World-Class Digital Solutions
                  </h3>
                  <p className="tw-text-xs tw-text-gray-400 tw-leading-relaxed">
                    Custom React frontends coupled with secure Django REST framework layers, delivering secure systems for students, startups, and companies.
                  </p>
                  <div className="tw-flex tw-flex-wrap tw-gap-3">
                    <Link to="/project-request" className="tw-bg-blue-600 hover:tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-text-[11px] tw-font-bold tw-no-underline">
                      Get Started
                    </Link>
                    <Link to="/contact" className="tw-bg-gray-800 hover:tw-bg-gray-700 tw-text-gray-300 tw-px-4 tw-py-2 tw-rounded-lg tw-text-[11px] tw-font-bold tw-border tw-border-gray-700 tw-no-underline">
                      Request a Quote
                    </Link>
                  </div>
                </div>
              )}

              {/* 2. STATS PREVIEW */}
              {activeFile === '02_stats.json' && (
                <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-animate-fadeIn">
                  
                  <div className="tw-bg-[#1E293B]/60 tw-border tw-border-gray-800 tw-p-4 tw-rounded-xl">
                    <Award className="tw-text-blue-500 tw-mb-1" size={16} />
                    <div className="tw-text-lg tw-font-bold">120+</div>
                    <div className="tw-text-[9px] tw-text-gray-500">Completed Projects</div>
                  </div>

                  <div className="tw-bg-[#1E293B]/60 tw-border tw-border-gray-800 tw-p-4 tw-rounded-xl">
                    <Users className="tw-text-indigo-500 tw-mb-1" size={16} />
                    <div className="tw-text-lg tw-font-bold">80+</div>
                    <div className="tw-text-[9px] tw-text-gray-500">Happy Clients</div>
                  </div>

                  <div className="tw-bg-[#1E293B]/60 tw-border tw-border-gray-800 tw-p-4 tw-rounded-xl">
                    <Star className="tw-text-cyan-500 tw-mb-1" size={16} />
                    <div className="tw-text-lg tw-font-bold">5+ Years</div>
                    <div className="tw-text-[9px] tw-text-gray-500">Years Active</div>
                  </div>

                  <div className="tw-bg-[#1E293B]/60 tw-border tw-border-gray-800 tw-p-4 tw-rounded-xl">
                    <CheckCircle2 className="tw-text-emerald-500 tw-mb-1" size={16} />
                    <div className="tw-text-lg tw-font-bold">99.9%</div>
                    <div className="tw-text-[9px] tw-text-gray-500">Client Satisfaction</div>
                  </div>

                </div>
              )}

              {/* 3. SERVICES PREVIEW */}
              {activeFile === '03_services.tsx' && (
                <div className="tw-space-y-3.5 tw-animate-fadeIn">
                  <span className="tw-text-[10px] tw-font-bold tw-text-indigo-400 tw-uppercase">7 Services Offered:</span>
                  <div className="tw-space-y-2">
                    {[
                      { name: 'Website Development', desc: 'Responsive marketing interfaces.', icon: Globe },
                      { name: 'Web Application Engineering', desc: 'React dashboards & panels.', icon: Laptop },
                      { name: 'Custom Software suites', desc: 'Tailored automated backend microservices.', icon: Cpu },
                      { name: 'E-Commerce Portals', desc: 'Stripe integrated catalogs.', icon: Rocket },
                      { name: 'API Development', desc: 'Secure Django REST endpoints.', icon: Database },
                      { name: 'UI/UX Brand Design', desc: 'Figma layout wireframes.', icon: Laptop2 },
                      { name: 'Ongoing Maintenance support', desc: 'Upgrades & log archiving.', icon: Activity }
                    ].map((s, idx) => {
                      const Icon = s.icon;
                      return (
                        <div key={idx} className="tw-flex tw-items-start tw-gap-3 tw-bg-[#1E293B]/40 tw-p-2.5 tw-rounded-lg tw-border tw-border-gray-800/80 hover:tw-border-blue-500/20 tw-transition-colors">
                          <div className="tw-text-blue-400 tw-mt-0.5"><Icon size={12} /></div>
                          <div>
                            <div className="tw-text-[11px] tw-font-bold tw-text-white">{s.name}</div>
                            <div className="tw-text-[9px] tw-text-gray-400">{s.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. WHY US PREVIEW */}
              {activeFile === '04_why_us.yaml' && (
                <div className="tw-space-y-3 tw-animate-fadeIn">
                  {[
                    { t: 'Fast Milestones Delivery', d: 'Milestones mapped dynamically.', icon: Rocket },
                    { t: 'Clean Architecture Principles', d: 'STRICT DRY patterns.', icon: Code2 },
                    { t: 'Secure parameter DB binding', d: 'Defensive validation structures.', icon: Shield },
                    { t: 'Flawless Responsive collapses', d: 'Fully optimized stylesheet targets.', icon: Laptop },
                    { t: 'SEO Optimized structures', d: 'Meta headers mapping parameters.', icon: Search },
                    { t: 'Lifetime technical Support SLA', d: 'Help desk routing tickets.', icon: HeartHandshake }
                  ].map((f, i) => {
                    const Icon = f.icon;
                    return (
                      <div key={i} className="tw-flex tw-gap-2.5 tw-bg-[#1E293B]/20 tw-p-2.5 tw-rounded-lg tw-border tw-border-gray-800/60">
                        <Icon size={14} className="tw-text-indigo-400 tw-shrink-0" />
                        <div>
                          <div className="tw-text-[10px] tw-font-bold tw-text-white">{f.t}</div>
                          <div className="tw-text-[9px] tw-text-gray-500">{f.d}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 5. PROCESS PREVIEW */}
              {activeFile === '05_process.py' && (
                <div className="tw-space-y-4 tw-animate-fadeIn">
                  <span className="tw-text-[10px] tw-font-bold tw-text-cyan-400 tw-uppercase">Sprints Stepper</span>
                  <div className="tw-relative tw-pl-4 tw-border-l tw-border-gray-800 tw-space-y-3">
                    {[
                      '01_Requirement gathering',
                      '02_Strategic planning',
                      '03_UI UX Mock design',
                      '04_Active development',
                      '05_QA and code testing',
                      '06_Server deployment setup',
                      '07_Support SLA dispatch'
                    ].map((step, idx) => (
                      <div key={idx} className="tw-relative">
                        <span className="tw-absolute tw-left-[-20px] tw-top-1.5 tw-w-2 tw-h-2 tw-rounded-full tw-bg-cyan-500"></span>
                        <div className="tw-text-[10px] tw-font-bold tw-text-white">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. TECH STACK PREVIEW */}
              {activeFile === '06_tech_stack.sql' && (
                <div className="tw-space-y-4 tw-animate-fadeIn">
                  <span className="tw-text-[10px] tw-font-bold tw-text-indigo-400 tw-uppercase">Mastered Technologies</span>
                  <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                    {[
                      'React.js', 'Next.js', 'Django REST', 'Python',
                      'Node.js', 'PostgreSQL', 'MySQL', 'Tailwind CSS'
                    ].map((tech, idx) => (
                      <div key={idx} className="tw-bg-[#1E293B]/40 tw-border tw-border-gray-800 tw-p-2 tw-rounded-lg tw-text-center">
                        <span className="tw-text-[10px] tw-font-bold tw-text-white">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. PORTFOLIO PREVIEW */}
              {activeFile === '07_portfolio.db' && (
                <div className="tw-space-y-4 tw-animate-fadeIn">
                  <span className="tw-text-[10px] tw-font-bold tw-text-blue-400 tw-uppercase">Recent Deliveries</span>
                  <div className="tw-space-y-3">
                    {portfolio.map((p) => (
                      <div key={p.id} className="tw-bg-[#1E293B]/40 tw-border tw-border-gray-800 tw-p-3 tw-rounded-lg tw-flex tw-justify-between tw-items-center">
                        <div>
                          <div className="tw-text-[10px] tw-font-bold tw-text-white">{p.title}</div>
                          <div className="tw-text-[8px] tw-text-gray-500">{p.category}</div>
                        </div>
                        <span className="tw-text-[9px] tw-bg-emerald-500/10 tw-text-emerald-400 tw-px-2 tw-py-0.5 tw-rounded-full">
                          {p.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. PRICING PREVIEW */}
              {activeFile === '08_pricing.ini' && (
                <div className="tw-space-y-3 tw-animate-fadeIn">
                  {[
                    { title: 'Basic Startup', p: '$799', feat: '3 Pages, 1 Month SLA Support' },
                    { title: 'Standard Portal', p: '$1,899', feat: 'React+Django, 3 Months SLA Support' },
                    { title: 'Premium Platform', p: '$3,499', feat: 'Stripe payments, 6 Months Support' },
                    { title: 'Enterprise Cloud', p: 'Custom', feat: 'Docker networks, Lifetime Support' }
                  ].map((tier, idx) => (
                    <div key={idx} className="tw-bg-[#1E293B]/40 tw-border tw-border-gray-800 tw-p-3 tw-rounded-xl tw-flex tw-justify-between tw-items-center">
                      <div>
                        <div className="tw-text-[10px] tw-font-bold tw-text-white">{tier.title}</div>
                        <div className="tw-text-[8px] tw-text-gray-400">{tier.feat}</div>
                      </div>
                      <div className="tw-text-xs tw-font-bold tw-text-indigo-400">{tier.p}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* 9. TESTIMONIALS PREVIEW */}
              {activeFile === '09_testimonials.csv' && (
                <div className="tw-space-y-3 tw-animate-fadeIn">
                  {testimonials.slice(0, 2).map((t) => (
                    <div key={t.id} className="tw-bg-[#1E293B]/40 tw-border tw-border-gray-800 tw-p-3 tw-rounded-lg">
                      <div className="tw-flex tw-text-amber-400 tw-mb-1">
                        {[...Array(t.rating)].map((_, idx) => (
                          <Star key={idx} size={10} fill="currentColor" />
                        ))}
                      </div>
                      <p className="tw-text-[9px] tw-text-gray-300 tw-leading-relaxed tw-italic">"{t.message}"</p>
                      <div className="tw-text-[8px] tw-text-gray-500 tw-mt-2">— {t.client_name}, {t.role}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* 10. FAQ PREVIEW */}
              {activeFile === '10_faq.xml' && (
                <div className="tw-space-y-2 tw-animate-fadeIn">
                  {[
                    { q: 'What technologies are used?', a: 'React.js, Next.js, and Django REST APIs.' },
                    { q: 'Can I request college projects?', a: 'Yes, fully configured installation packages.' },
                    { q: 'What post-launch support is offered?', a: 'Varying SLA support tiers.' }
                  ].map((faq, idx) => {
                    const isOpen = activeFaq === idx;
                    return (
                      <div key={idx} className="tw-bg-[#1E293B]/40 tw-border tw-border-gray-800 tw-rounded-lg tw-overflow-hidden">
                        <button 
                          onClick={() => toggleFaq(idx)}
                          className="tw-w-full tw-flex tw-justify-between tw-items-center tw-p-3 tw-text-left tw-font-bold tw-text-[10px]"
                        >
                          <span>{faq.q}</span>
                          <span>{isOpen ? '−' : '+'}</span>
                        </button>
                        {isOpen && (
                          <p className="tw-px-3 tw-pb-3 tw-text-[9px] tw-text-gray-400 tw-border-t tw-border-gray-800 tw-pt-2">
                            {faq.a}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 11. CONTACT FORM PREVIEW */}
              {activeFile === '11_contact.sh' && (
                <div className="tw-space-y-4 tw-animate-fadeIn">
                  
                  {formSuccess && (
                    <div className="tw-bg-emerald-600/10 tw-border tw-border-emerald-500/20 tw-text-emerald-400 tw-p-2 tw-rounded tw-text-[9px]">
                      {formSuccess}
                    </div>
                  )}
                  {formError && (
                    <div className="tw-bg-rose-600/10 tw-border tw-border-rose-500/20 tw-text-rose-400 tw-p-2 tw-rounded tw-text-[9px]">
                      {formError}
                    </div>
                  )}

                  <form onSubmit={handleContactSubmit} className="tw-space-y-2.5 tw-text-[10px]">
                    <div>
                      <input 
                        type="text" 
                        required
                        className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none focus:tw-border-blue-500"
                        placeholder="Your Name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        required
                        className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none focus:tw-border-blue-500"
                        placeholder="Email Address"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <input 
                        type="text" 
                        required
                        className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none focus:tw-border-blue-500"
                        placeholder="Subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      />
                    </div>
                    <div>
                      <textarea 
                        required
                        className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none focus:tw-border-blue-500 tw-h-16"
                        placeholder="Inquiry description..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={formLoading}
                      className="tw-w-full tw-bg-blue-600 hover:tw-bg-blue-500 tw-text-white tw-font-bold tw-py-2 tw-rounded-md tw-transition-colors"
                    >
                      {formLoading ? 'Submitting...' : 'Dispatch Request'}
                    </button>
                  </form>

                  <div className="tw-flex tw-justify-between tw-items-center tw-pt-2 tw-border-t tw-border-gray-800 tw-text-[9px]">
                    <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="tw-text-emerald-400 tw-no-underline">
                      WhatsApp Chat &gt;
                    </a>
                    <a href="mailto:prabhakarkumarsingh578@gmail.com" className="tw-text-gray-400 tw-no-underline">
                      prabhakar@email &gt;
                    </a>
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* -------------------- DUAL CALL TO ACTION MODULES -------------------- */}
      <section className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-mb-12 tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
        
        <div className="tw-bg-[#1E293B]/40 tw-border tw-border-gray-800 tw-p-8 tw-rounded-2xl tw-text-left hover:tw-border-blue-500/25 tw-transition-colors">
          <Laptop size={28} className="tw-text-blue-500 tw-mb-4" />
          <h3 className="tw-text-lg tw-font-bold tw-text-white tw-mb-2">Attract Startups & Businesses</h3>
          <p className="tw-text-xs tw-text-gray-400 tw-leading-relaxed tw-mb-6">
            We deliver state-of-the-art corporate web products, payment portals, security architecture, and automated dashboards tailored to scale your product milestones.
          </p>
          <Link to="/project-request" className="tw-inline-flex tw-items-center tw-gap-2 tw-bg-blue-600 hover:tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2.5 tw-rounded-xl tw-text-xs tw-font-bold tw-no-underline">
            Request a Quote
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="tw-bg-[#1E293B]/40 tw-border tw-border-gray-800 tw-p-8 tw-rounded-2xl tw-text-left hover:tw-border-indigo-500/25 tw-transition-colors">
          <Code2 size={28} className="tw-text-indigo-500 tw-mb-4" />
          <h3 className="tw-text-lg tw-font-bold tw-text-white tw-mb-2">Final Year Project support</h3>
          <p className="tw-text-xs tw-text-gray-400 tw-leading-relaxed tw-mb-6">
            Seeking high-quality project builds? We engineer complete documented source packages with React frontends, robust Django REST backend layers, and installation support.
          </p>
          <Link to="/contact" className="tw-inline-flex tw-items-center tw-gap-2 tw-bg-indigo-600 hover:tw-bg-indigo-500 tw-text-white tw-px-4 tw-py-2.5 tw-rounded-xl tw-text-xs tw-font-bold tw-no-underline">
            Consult Developer
            <ArrowRight size={14} />
          </Link>
        </div>

      </section>

    </div>
  );
};

export default Home;
