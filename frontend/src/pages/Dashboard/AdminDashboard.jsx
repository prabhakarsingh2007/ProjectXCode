import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Folder, MessageSquare, Layers, 
  Tag, CreditCard, Award, HelpCircle, HardDrive, Bell, 
  BarChart2, Settings, ShieldAlert, User, LogOut, Sun, Moon, 
  Search, Filter, Plus, Edit2, Trash2, CheckCircle, Clock, 
  X, AlertTriangle, ChevronRight, ChevronLeft, Upload, FileText, 
  Download, RefreshCw, Star
} from 'lucide-react';
import api from '../../api/axios';

const AdminDashboard = ({ 
  stats: initialStats, 
  recentProjects: initialProjects, 
  recentEnquiries: initialEnquiries, 
  statusLoading, 
  handleStatusChange 
}) => {
  // Navigation State
  const [activeModule, setActiveModule] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // General Dashboard Metrics Data State
  const [stats, setStats] = useState(initialStats || {
    totalRevenue: 0,
    pendingProjects: 0,
    activeProjects: 0,
    totalProjects: 0,
    totalEnquiries: 0,
    unresolvedEnquiries: 0
  });

  // Table Data States
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [services, setServices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [supportTickets, setSupportTickets] = useState([]);
  const [files, setFiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Search & Filter & Pagination States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Loading & Error States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // CRUD Overlay Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [modalItem, setModalItem] = useState(null);

  // Custom Form States
  const [serviceForm, setServiceForm] = useState({ title: '', description: '', price: '', billing_cycle: 'one_time', icon: 'Layers' });
  const [ticketForm, setTicketForm] = useState({ title: '', description: '', status: 'open', priority: 'medium' });
  const [fileUpload, setFileUpload] = useState(null);
  const [clientForm, setClientForm] = useState({ username: '', email: '', first_name: '', last_name: '', role: 'client', phone: '', company: '' });
  const [projectForm, setProjectForm] = useState({ title: '', description: '', budget: '', status: 'pending', payment_status: 'unpaid', client: '' });
  const [portfolioForm, setPortfolioForm] = useState({ title: '', client: '', category: 'Website', description: '', technologies: '', status: 'completed', completion_date: '', is_confidential: false, live_url: '', github_url: '', image_url: '' });

  // 17 Module Definitions
  const modules = [
    { id: 'Overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'Clients', label: 'Clients', icon: Users },
    { id: 'Projects', label: 'Projects', icon: Folder },
    { id: 'Enquiries', label: 'Enquiries', icon: MessageSquare },
    { id: 'Services', label: 'Services', icon: Layers },
    { id: 'Pricing', label: 'Pricing Packages', icon: Tag },
    { id: 'Payments', label: 'Payments', icon: CreditCard },
    { id: 'Completed', label: 'Completed Projects', icon: Award },
    { id: 'Testimonials', label: 'Testimonials', icon: Star },
    { id: 'Tickets', label: 'Support Tickets', icon: HelpCircle },
    { id: 'FileManager', label: 'File Manager', icon: HardDrive },
    { id: 'Notifications', label: 'Notifications', icon: Bell },
    { id: 'Analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'Users', label: 'Users & Roles', icon: Users },
    { id: 'Settings', label: 'Agency Settings', icon: Settings },
    { id: 'Security', label: 'Security Audits', icon: ShieldAlert },
    { id: 'Profile', label: 'My Profile', icon: User },
  ];

  // Load active module's details from REST endpoints
  useEffect(() => {
    fetchModuleData();
    setCurrentPage(1);
    setSearchTerm('');
    setFilterOption('All');
  }, [activeModule]);

  const fetchModuleData = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      if (activeModule === 'Overview') {
        const res = await api.get('/dashboard/');
        if (res.data && res.data.stats) {
          setStats(res.data.stats);
        }
      } else if (activeModule === 'Clients') {
        const res = await api.get('/accounts/users/');
        setClients(res.data.filter(u => u.role === 'client'));
      } else if (activeModule === 'Projects') {
        const res = await api.get('/projects/');
        setProjects(res.data);
        const usersRes = await api.get('/accounts/users/');
        setUsers(usersRes.data);
      } else if (activeModule === 'Enquiries') {
        const res = await api.get('/enquiries/');
        setEnquiries(res.data);
      } else if (activeModule === 'Services' || activeModule === 'Pricing') {
        const res = await api.get('/services/');
        setServices(res.data);
      } else if (activeModule === 'Payments') {
        const res = await api.get('/payments/');
        setPayments(res.data);
      } else if (activeModule === 'Completed') {
        const res = await api.get('/portfolio/');
        setCompletedProjects(res.data);
      } else if (activeModule === 'Testimonials') {
        const res = await api.get('/testimonials/');
        setTestimonials(res.data);
      } else if (activeModule === 'Tickets') {
        const res = await api.get('/tickets/tickets/');
        setSupportTickets(res.data);
      } else if (activeModule === 'FileManager') {
        const res = await api.get('/agency-files/files/');
        setFiles(res.data);
      } else if (activeModule === 'Notifications') {
        const res = await api.get('/notifications/');
        setNotifications(res.data);
      } else if (activeModule === 'Users') {
        const res = await api.get('/accounts/users/');
        setUsers(res.data);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load records from the server endpoint. Please verify backend state.');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, success = true) => {
    if (success) {
      setSuccessMsg(msg);
      setTimeout(() => setSuccessMsg(''), 3000);
    } else {
      setErrorMsg(msg);
      setTimeout(() => setErrorMsg(''), 4000);
    }
  };

  // CRUD Operations handler
  const handleOpenCreateModal = () => {
    setModalMode('create');
    setModalItem(null);
    setServiceForm({ title: '', description: '', price: '', billing_cycle: 'one_time', icon: 'Layers' });
    setTicketForm({ title: '', description: '', status: 'open', priority: 'medium' });
    setClientForm({ username: '', email: '', first_name: '', last_name: '', role: 'client', phone: '', company: '' });
    setProjectForm({ title: '', description: '', budget: '', status: 'pending', payment_status: 'unpaid', client: '' });
    setPortfolioForm({ title: '', client: '', category: 'Website', description: '', technologies: '', status: 'completed', completion_date: new Date().toISOString().split('T')[0], is_confidential: false, live_url: '', github_url: '', image_url: '' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setModalMode('edit');
    setModalItem(item);
    if (activeModule === 'Services') {
      setServiceForm({ title: item.title, description: item.description, price: item.price, billing_cycle: item.billing_cycle, icon: item.icon });
    } else if (activeModule === 'Tickets') {
      setTicketForm({ title: item.title, description: item.description, status: item.status, priority: item.priority });
    } else if (activeModule === 'Clients') {
      setClientForm({ username: item.username, email: item.email, first_name: item.first_name, last_name: item.last_name, role: item.role, phone: item.phone || '', company: item.company || '' });
    } else if (activeModule === 'Projects') {
      setProjectForm({ title: item.title, description: item.description, budget: item.budget, status: item.status, payment_status: item.payment_status, client: item.client });
    } else if (activeModule === 'Completed') {
      setPortfolioForm({ title: item.title, client: item.client || '', category: item.category || 'Website', description: item.description || '', technologies: item.technologies || '', status: item.status || 'completed', completion_date: item.completion_date || '', is_confidential: item.is_confidential || false, live_url: item.live_url || '', github_url: item.github_url || '', image_url: item.image_url || '' });
    }
    setIsModalOpen(true);
  };

  const handleCRUDSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let endpoint = '';
      let payload = {};

      if (activeModule === 'Services') {
        endpoint = '/services/';
        payload = serviceForm;
      } else if (activeModule === 'Tickets') {
        endpoint = '/tickets/tickets/';
        payload = ticketForm;
      } else if (activeModule === 'Clients') {
        endpoint = '/accounts/users/';
        payload = clientForm;
      } else if (activeModule === 'Projects') {
        endpoint = '/projects/';
        payload = projectForm;
      } else if (activeModule === 'Completed') {
        endpoint = '/portfolio/';
        payload = portfolioForm;
      }

      if (modalMode === 'create') {
        if (activeModule === 'Clients') {
          // Add default temporary password for new accounts created by admin
          payload.password = 'ClientTempPass123!';
          await api.post('/accounts/register/', payload);
        } else {
          await api.post(endpoint, payload);
        }
        showToast('Created record successfully!');
      } else {
        const itemUrl = modalMode === 'edit' ? `${endpoint}${modalItem.id}/` : endpoint;
        await api.put(itemUrl, payload);
        showToast('Updated record successfully!');
      }
      setIsModalOpen(false);
      fetchModuleData();
    } catch (err) {
      console.error(err);
      showToast('Action failed. Verify validation parameters and server logs.', false);
    } finally {
      setLoading(false);
    }
  };

  const handleCRUDDelete = async (id) => {
    if (!window.confirm('Are you absolutely sure you want to permanently delete this record?')) return;
    setLoading(true);
    try {
      let endpoint = '';
      if (activeModule === 'Services') endpoint = `/services/${id}/`;
      else if (activeModule === 'Tickets') endpoint = `/tickets/tickets/${id}/`;
      else if (activeModule === 'Clients' || activeModule === 'Users') endpoint = `/accounts/users/${id}/`;
      else if (activeModule === 'Projects') endpoint = `/projects/${id}/`;
      else if (activeModule === 'Completed') endpoint = `/portfolio/${id}/`;
      else if (activeModule === 'FileManager') endpoint = `/agency-files/files/${id}/`;
      else if (activeModule === 'Enquiries') endpoint = `/enquiries/${id}/`;
      else if (activeModule === 'Testimonials') endpoint = `/testimonials/${id}/`;

      await api.delete(endpoint);
      showToast('Deleted record successfully!');
      fetchModuleData();
    } catch (err) {
      console.error(err);
      showToast('Failed to delete item.', false);
    } finally {
      setLoading(false);
    }
  };

  // Special File Handler
  const handleFileUploadSubmit = async (e) => {
    e.preventDefault();
    if (!fileUpload) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', fileUpload);

    try {
      await api.post('/agency-files/files/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      showToast('File uploaded successfully!');
      setFileUpload(null);
      fetchModuleData();
    } catch (err) {
      console.error(err);
      showToast('File upload failed. Ensure correct formats and sizes.', false);
    } finally {
      setLoading(false);
    }
  };

  // Special Quick Action Resolvers
  const handleResolveEnquiry = async (id, currentStatus) => {
    try {
      await api.patch(`/enquiries/${id}/`, { is_resolved: !currentStatus });
      showToast('Updated enquiry status.');
      fetchModuleData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFeaturedTestimonial = async (id, currentStatus) => {
    try {
      await api.patch(`/testimonials/${id}/`, { is_featured: !currentStatus });
      showToast('Updated testimonial feature selection.');
      fetchModuleData();
    } catch (err) {
      console.error(err);
    }
  };

  // Filters and searches logic
  const getFilteredItems = () => {
    if (activeModule === 'Clients') {
      return clients.filter(c => 
        c.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (activeModule === 'Projects') {
      return projects.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.client_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterOption === 'All' || p.status === filterOption;
        return matchesSearch && matchesFilter;
      });
    }
    if (activeModule === 'Enquiries') {
      return enquiries.filter(e => {
        const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterOption === 'All' || (filterOption === 'Resolved' && e.is_resolved) || (filterOption === 'Open' && !e.is_resolved);
        return matchesSearch && matchesFilter;
      });
    }
    if (activeModule === 'Services') {
      return services.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (activeModule === 'Tickets') {
      return supportTickets.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.client_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterOption === 'All' || t.status === filterOption;
        return matchesSearch && matchesFilter;
      });
    }
    if (activeModule === 'Payments') {
      return payments.filter(pay => pay.project_title.toLowerCase().includes(searchTerm.toLowerCase()) || pay.transaction_id.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (activeModule === 'FileManager') {
      return files.filter(f => f.file_name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (activeModule === 'Completed') {
      return completedProjects.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (activeModule === 'Testimonials') {
      return testimonials.filter(t => t.client_name.toLowerCase().includes(searchTerm.toLowerCase()) || t.message.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (activeModule === 'Users') {
      return users.filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()) || u.role.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return [];
  };

  const filteredItems = getFilteredItems();
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="tw-min-h-screen tw-flex tw-bg-agencyBg tw-text-white tw-font-sans">
      
      {/* Toast Messages overlays */}
      {successMsg && (
        <div className="tw-fixed tw-bottom-5 tw-right-5 tw-z-50 tw-flex tw-items-center tw-gap-2 tw-bg-emerald-600 tw-text-white tw-px-4 tw-py-3 tw-rounded-lg tw-shadow-lg tw-border tw-border-emerald-500 tw-animate-bounce">
          <CheckCircle size={18} />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="tw-fixed tw-bottom-5 tw-right-5 tw-z-50 tw-flex tw-items-center tw-gap-2 tw-bg-rose-600 tw-text-white tw-px-4 tw-py-3 tw-rounded-lg tw-shadow-lg tw-border tw-border-rose-500">
          <AlertTriangle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 1. Sidebar Navigation - Responsive sidebar */}
      <aside className={`tw-w-64 tw-bg-agencySurface tw-border-r tw-border-gray-800 tw-transition-all tw-duration-300 tw-flex tw-flex-col ${sidebarOpen ? 'tw-translate-x-0' : 'tw-translate-x-[-256px] lg:tw-translate-x-0 lg:tw-w-20'} tw-fixed lg:tw-sticky tw-top-0 tw-h-screen tw-z-40`}>
        
        {/* Sidebar Header Brand logo */}
        <div className="tw-p-5 tw-flex tw-items-center tw-justify-between tw-border-b tw-border-gray-800">
          <div className="tw-flex tw-items-center tw-gap-2">
            <Layers size={24} className="tw-text-indigo-500" />
            {sidebarOpen && <span className="tw-font-bold tw-text-lg tw-bg-gradient-to-r tw-from-indigo-400 tw-to-cyan-400 tw-bg-clip-text tw-text-transparent">Project X Code</span>}
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="tw-text-gray-400 hover:tw-text-white lg:tw-hidden">
            <X size={18} />
          </button>
        </div>

        {/* Sidebar Nav links */}
        <nav className="tw-flex-1 tw-overflow-y-auto tw-py-4 tw-px-3 tw-space-y-1">
          {modules.map(mod => {
            const IconComponent = mod.icon;
            const isActive = activeModule === mod.id;
            return (
              <button 
                key={mod.id}
                onClick={() => { setActiveModule(mod.id); }}
                className={`tw-w-full tw-flex tw-items-center tw-gap-3 tw-px-3 tw-py-2.5 tw-rounded-lg tw-text-sm tw-font-medium tw-transition-all ${isActive ? 'tw-bg-indigo-600 tw-text-white' : 'tw-text-gray-400 hover:tw-bg-gray-800 hover:tw-text-white'}`}
                title={mod.label}
              >
                <IconComponent size={18} className={isActive ? 'tw-text-white' : 'tw-text-gray-400'} />
                {sidebarOpen && <span>{mod.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main View Area */}
      <div className="tw-flex-1 tw-flex tw-flex-col tw-overflow-x-hidden">
        
        {/* Top Control Bar */}
        <header className="tw-sticky tw-top-0 tw-bg-agencySurface tw-border-b tw-border-gray-800 tw-h-16 tw-flex tw-items-center tw-justify-between tw-px-6 tw-z-30">
          <div className="tw-flex tw-items-center tw-gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="tw-hidden lg:tw-block tw-text-gray-400 hover:tw-text-white">
              <RefreshCw size={18} className={`${loading ? 'tw-animate-spin' : ''}`} />
            </button>
            <h1 className="tw-text-base tw-font-semibold tw-text-gray-300">
              Admin Panel &gt; <span className="tw-text-white tw-font-bold">{activeModule}</span>
            </h1>
          </div>
          
          <div className="tw-flex tw-items-center tw-gap-4">
            <div className="tw-text-xs tw-text-gray-400 tw-hidden md:tw-block">
              Role: <span className="tw-text-indigo-400 tw-font-semibold">ADMINISTRATOR</span>
            </div>
            <button onClick={() => { fetchModuleData(); }} className="tw-flex tw-items-center tw-gap-1.5 tw-text-xs tw-bg-gray-800 hover:tw-bg-gray-700 tw-text-gray-300 tw-px-3 tw-py-1.5 tw-rounded-md">
              <RefreshCw size={12} />
              Sync API
            </button>
          </div>
        </header>

        {/* Content Pane */}
        <main className="tw-flex-grow tw-p-6">
          
          {loading && (
            <div className="tw-flex tw-items-center tw-justify-center tw-py-12">
              <RefreshCw size={24} className="tw-animate-spin tw-text-indigo-500" />
              <span className="tw-ml-2 tw-text-gray-400">Loading module records...</span>
            </div>
          )}

          {/* Module 1: Dashboard Overview */}
          {activeModule === 'Overview' && (
            <div className="tw-space-y-6">
              
              {/* Statistics cards */}
              <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-5">
                
                <div className="tw-bg-agencySurface tw-border tw-border-gray-800 tw-p-5 tw-rounded-xl tw-flex tw-items-center tw-justify-between">
                  <div>
                    <span className="tw-text-xs tw-text-gray-400 tw-block">Total Revenue</span>
                    <span className="tw-text-2xl tw-font-extrabold tw-text-white tw-mt-1 tw-block">${stats.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="tw-p-3 tw-rounded-lg tw-bg-emerald-500/10 tw-text-emerald-400">
                    <CreditCard size={22} />
                  </div>
                </div>

                <div className="tw-bg-agencySurface tw-border tw-border-gray-800 tw-p-5 tw-rounded-xl tw-flex tw-items-center tw-justify-between">
                  <div>
                    <span className="tw-text-xs tw-text-gray-400 tw-block">Pending Projects</span>
                    <span className="tw-text-2xl tw-font-extrabold tw-text-white tw-mt-1 tw-block">{stats.pendingProjects}</span>
                  </div>
                  <div className="tw-p-3 tw-rounded-lg tw-bg-amber-500/10 tw-text-amber-400">
                    <Clock size={22} />
                  </div>
                </div>

                <div className="tw-bg-agencySurface tw-border tw-border-gray-800 tw-p-5 tw-rounded-xl tw-flex tw-items-center tw-justify-between">
                  <div>
                    <span className="tw-text-xs tw-text-gray-400 tw-block">Active Assignments</span>
                    <span className="tw-text-2xl tw-font-extrabold tw-text-white tw-mt-1 tw-block">{stats.activeProjects}</span>
                  </div>
                  <div className="tw-p-3 tw-rounded-lg tw-bg-indigo-500/10 tw-text-indigo-400">
                    <Folder size={22} />
                  </div>
                </div>

                <div className="tw-bg-agencySurface tw-border tw-border-gray-800 tw-p-5 tw-rounded-xl tw-flex tw-items-center tw-justify-between">
                  <div>
                    <span className="tw-text-xs tw-text-gray-400 tw-block">Unresolved Enquiries</span>
                    <span className="tw-text-2xl tw-font-extrabold tw-text-rose-400 tw-mt-1 tw-block">{stats.unresolvedEnquiries}</span>
                  </div>
                  <div className="tw-p-3 tw-rounded-lg tw-bg-rose-500/10 tw-text-rose-400">
                    <MessageSquare size={22} />
                  </div>
                </div>

              </div>

              {/* Graphic Charts panel - SVG drawing */}
              <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-6">
                
                {/* Revenue Trend SVG Chart */}
                <div className="tw-bg-agencySurface tw-border tw-border-gray-800 tw-p-5 tw-rounded-xl">
                  <h3 className="tw-text-sm tw-font-bold tw-text-gray-400 tw-mb-4">Monthly Revenue Trend</h3>
                  <div className="tw-w-full tw-h-48 tw-flex tw-items-end tw-justify-between tw-pt-4">
                    {/* SVG graphic */}
                    <svg className="tw-w-full tw-h-full" viewBox="0 0 400 150">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>
                      {/* Grid lines */}
                      <line x1="0" y1="120" x2="400" y2="120" stroke="#1f2937" strokeWidth="1" />
                      <line x1="0" y1="70" x2="400" y2="70" stroke="#1f2937" strokeWidth="1" />
                      <line x1="0" y1="20" x2="400" y2="20" stroke="#1f2937" strokeWidth="1" />
                      {/* Trend path */}
                      <path d="M 20 120 Q 80 80 140 100 T 260 40 T 380 30" fill="none" stroke="#6366f1" strokeWidth="3" />
                      <path d="M 20 120 Q 80 80 140 100 T 260 40 T 380 30 L 380 120 L 20 120 Z" fill="url(#chartGrad)" />
                      {/* Dots */}
                      <circle cx="20" cy="120" r="4" fill="#a5b4fc" />
                      <circle cx="140" cy="100" r="4" fill="#a5b4fc" />
                      <circle cx="260" cy="40" r="4" fill="#a5b4fc" />
                      <circle cx="380" cy="30" r="4" fill="#a5b4fc" />
                    </svg>
                  </div>
                  <div className="tw-flex tw-justify-between tw-text-[10px] tw-text-gray-400 tw-mt-2">
                    <span>Q1</span>
                    <span>Q2</span>
                    <span>Q3</span>
                    <span>Q4 (Current)</span>
                  </div>
                </div>

                {/* Categories Distribution Donut Chart */}
                <div className="tw-bg-agencySurface tw-border tw-border-gray-800 tw-p-5 tw-rounded-xl">
                  <h3 className="tw-text-sm tw-font-bold tw-text-gray-400 tw-mb-4">Project Categories Breakdown</h3>
                  <div className="tw-flex tw-items-center tw-justify-around tw-h-48">
                    <svg width="120" height="120" viewBox="0 0 36 36" className="tw-transform tw-rotate-[-90deg]">
                      {/* Circular segment background */}
                      <circle cx="18" cy="18" r="15.91" fill="none" stroke="#1f2937" strokeWidth="4" />
                      {/* Segment 1: Websites (50%) */}
                      <circle cx="18" cy="18" r="15.91" fill="none" stroke="#6366f1" strokeWidth="4.2" strokeDasharray="50 100" strokeDashoffset="0" />
                      {/* Segment 2: E-commerce (30%) */}
                      <circle cx="18" cy="18" r="15.91" fill="none" stroke="#06b6d4" strokeWidth="4.2" strokeDasharray="30 100" strokeDashoffset="-50" />
                      {/* Segment 3: Custom Dev (20%) */}
                      <circle cx="18" cy="18" r="15.91" fill="none" stroke="#ec4899" strokeWidth="4.2" strokeDasharray="20 100" strokeDashoffset="-80" />
                    </svg>
                    <div className="tw-space-y-2">
                      <div className="tw-flex tw-items-center tw-gap-2">
                        <span className="tw-w-3 tw-h-3 tw-rounded-full tw-bg-indigo-500"></span>
                        <span className="tw-text-xs tw-text-gray-300">Websites (50%)</span>
                      </div>
                      <div className="tw-flex tw-items-center tw-gap-2">
                        <span className="tw-w-3 tw-h-3 tw-rounded-full tw-bg-cyan-500"></span>
                        <span className="tw-text-xs tw-text-gray-300">E-commerce (30%)</span>
                      </div>
                      <div className="tw-flex tw-items-center tw-gap-2">
                        <span className="tw-w-3 tw-h-3 tw-rounded-full tw-bg-pink-500"></span>
                        <span className="tw-text-xs tw-text-gray-300">Custom Dev (20%)</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Table listings of recent elements */}
              <div className="tw-grid tw-grid-cols-1 xl:tw-grid-cols-3 tw-gap-6">
                
                {/* Left Side: Recent Project Requests */}
                <div className="tw-bg-agencySurface tw-border tw-border-gray-800 tw-p-5 tw-rounded-xl xl:tw-col-span-2">
                  <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                    <h3 className="tw-text-sm tw-font-bold tw-text-gray-400">Recent Project Requests</h3>
                    <button onClick={() => setActiveModule('Projects')} className="tw-text-xs tw-text-indigo-400 hover:tw-underline">View All</button>
                  </div>
                  <div className="tw-overflow-x-auto">
                    <table className="tw-w-full tw-text-left tw-text-xs">
                      <thead>
                        <tr className="tw-border-b tw-border-gray-800 tw-text-gray-400">
                          <th className="tw-pb-2">Title</th>
                          <th className="tw-pb-2">Client</th>
                          <th className="tw-pb-2">Budget</th>
                          <th className="tw-pb-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="tw-divide-y tw-divide-gray-800">
                        {initialProjects && initialProjects.slice(0, 4).map(p => (
                          <tr key={p.id} className="hover:tw-bg-gray-800/40">
                            <td className="tw-py-2.5 tw-font-semibold">{p.title}</td>
                            <td className="tw-py-2.5 tw-text-gray-400">{p.client_name}</td>
                            <td className="tw-py-2.5">${parseFloat(p.budget).toLocaleString()}</td>
                            <td className="tw-py-2.5">
                              <span className={`tw-px-2 tw-py-0.5 tw-rounded-full tw-text-[9px] ${p.status === 'in_progress' ? 'tw-bg-cyan-500/10 tw-text-cyan-400' : 'tw-bg-amber-500/10 tw-text-amber-400'}`}>
                                {p.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Side: Open Enquiries */}
                <div className="tw-bg-agencySurface tw-border tw-border-gray-800 tw-p-5 tw-rounded-xl">
                  <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
                    <h3 className="tw-text-sm tw-font-bold tw-text-gray-400">Recent Messages</h3>
                    <button onClick={() => setActiveModule('Enquiries')} className="tw-text-xs tw-text-indigo-400 hover:tw-underline">View All</button>
                  </div>
                  <div className="tw-space-y-3">
                    {initialEnquiries && initialEnquiries.slice(0, 3).map(e => (
                      <div key={e.id} className="tw-border-b tw-border-gray-800 tw-pb-2 tw-text-xs">
                        <div className="tw-flex tw-justify-between tw-font-semibold tw-mb-0.5">
                          <span>{e.name}</span>
                          <span className="tw-text-gray-500 tw-text-[10px]">{new Date(e.created_at).toLocaleDateString()}</span>
                        </div>
                        <span className="tw-text-indigo-400 tw-font-medium">{e.subject}</span>
                        <p className="tw-text-gray-400 tw-truncate tw-mt-1">{e.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* Render Common CRUD, Grid Tables, forms for standard models */}
          {activeModule !== 'Overview' && activeModule !== 'Settings' && activeModule !== 'Security' && activeModule !== 'Profile' && activeModule !== 'Analytics' && (
            <div className="tw-bg-agencySurface tw-border tw-border-gray-800 tw-rounded-xl tw-p-5 tw-space-y-4">
              
              {/* Header inside module wrapper */}
              <div className="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center sm:tw-justify-between tw-gap-3">
                <div className="tw-flex tw-items-center tw-gap-2">
                  <div className="tw-relative">
                    <input 
                      type="text" 
                      placeholder="Search records..." 
                      className="tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-px-3 tw-py-1.5 tw-pl-8 tw-text-xs tw-w-56 focus:tw-outline-none focus:tw-border-indigo-500 tw-text-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search size={14} className="tw-absolute tw-left-2.5 tw-top-2.5 tw-text-gray-500" />
                  </div>
                  {(activeModule === 'Projects' || activeModule === 'Tickets' || activeModule === 'Enquiries') && (
                    <select 
                      className="tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-px-2 tw-py-1.5 tw-text-xs tw-text-white focus:tw-outline-none"
                      value={filterOption}
                      onChange={(e) => setFilterOption(e.target.value)}
                    >
                      <option value="All">All statuses</option>
                      {activeModule === 'Projects' && (
                        <>
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </>
                      )}
                      {activeModule === 'Tickets' && (
                        <>
                          <option value="open">Open</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </>
                      )}
                      {activeModule === 'Enquiries' && (
                        <>
                          <option value="Resolved">Resolved</option>
                          <option value="Open">Open</option>
                        </>
                      )}
                    </select>
                  )}
                </div>

                {/* Add actions buttons */}
                {(activeModule === 'Services' || activeModule === 'Tickets' || activeModule === 'Clients' || activeModule === 'Projects' || activeModule === 'Completed') && (
                  <button onClick={handleOpenCreateModal} className="tw-bg-indigo-600 hover:tw-bg-indigo-500 tw-text-white tw-px-3 tw-py-1.5 tw-rounded-md tw-text-xs tw-font-semibold tw-flex tw-items-center tw-gap-1">
                    <Plus size={14} />
                    Add New Record
                  </button>
                )}

                {activeModule === 'FileManager' && (
                  <form onSubmit={handleFileUploadSubmit} className="tw-flex tw-items-center tw-gap-2">
                    <label className="tw-cursor-pointer tw-bg-gray-800 hover:tw-bg-gray-700 tw-border tw-border-gray-700 tw-px-3 tw-py-1.5 tw-rounded-md tw-text-xs tw-text-gray-300 tw-flex tw-items-center tw-gap-1">
                      <Upload size={14} />
                      Choose File
                      <input 
                        type="file" 
                        className="tw-hidden" 
                        onChange={(e) => setFileUpload(e.target.files[0])} 
                      />
                    </label>
                    {fileUpload && <span className="tw-text-xs tw-text-gray-400 tw-max-w-36 tw-truncate">{fileUpload.name}</span>}
                    <button type="submit" disabled={!fileUpload} className="tw-bg-indigo-600 hover:tw-bg-indigo-500 disabled:tw-bg-gray-800 disabled:tw-text-gray-500 tw-text-white tw-px-3 tw-py-1.5 tw-rounded-md tw-text-xs tw-font-semibold">
                      Upload
                    </button>
                  </form>
                )}
              </div>

              {/* Data tables rendering wrapper */}
              <div className="tw-overflow-x-auto">
                <table className="tw-w-full tw-text-left tw-text-xs">
                  <thead>
                    <tr className="tw-bg-gray-800/60 tw-border-b tw-border-gray-700 tw-text-gray-300">
                      
                      {activeModule === 'Clients' && (
                        <>
                          <th className="tw-p-3">Username</th>
                          <th className="tw-p-3">Email</th>
                          <th className="tw-p-3">Company</th>
                          <th className="tw-p-3">Phone</th>
                          <th className="tw-p-3">Actions</th>
                        </>
                      )}

                      {activeModule === 'Projects' && (
                        <>
                          <th className="tw-p-3">Title</th>
                          <th className="tw-p-3">Client</th>
                          <th className="tw-p-3">Budget</th>
                          <th className="tw-p-3">Status</th>
                          <th className="tw-p-3">Payment</th>
                          <th className="tw-p-3">Actions</th>
                        </>
                      )}

                      {activeModule === 'Enquiries' && (
                        <>
                          <th className="tw-p-3">Sender Name</th>
                          <th className="tw-p-3">Email</th>
                          <th className="tw-p-3">Subject</th>
                          <th className="tw-p-3">Message</th>
                          <th className="tw-p-3">Status</th>
                          <th className="tw-p-3">Actions</th>
                        </>
                      )}

                      {activeModule === 'Services' && (
                        <>
                          <th className="tw-p-3">Package Title</th>
                          <th className="tw-p-3">Rate</th>
                          <th className="tw-p-3">Billing</th>
                          <th className="tw-p-3">Description</th>
                          <th className="tw-p-3">Actions</th>
                        </>
                      )}

                      {activeModule === 'Pricing' && (
                        <>
                          <th className="tw-p-3">Tier Name</th>
                          <th className="tw-p-3">Price</th>
                          <th className="tw-p-3">Billing Mode</th>
                          <th className="tw-p-3">Linked Icon</th>
                        </>
                      )}

                      {activeModule === 'Payments' && (
                        <>
                          <th className="tw-p-3">Project Reference</th>
                          <th className="tw-p-3">Amount</th>
                          <th className="tw-p-3">Method</th>
                          <th className="tw-p-3">Transaction ID</th>
                          <th className="tw-p-3">Status</th>
                          <th className="tw-p-3">Invoice</th>
                        </>
                      )}

                      {activeModule === 'Completed' && (
                        <>
                          <th className="tw-p-3">Project Name</th>
                          <th className="tw-p-3">Client Name</th>
                          <th className="tw-p-3">Category</th>
                          <th className="tw-p-3">Technologies</th>
                          <th className="tw-p-3">Type</th>
                          <th className="tw-p-3">Actions</th>
                        </>
                      )}

                      {activeModule === 'Testimonials' && (
                        <>
                          <th className="tw-p-3">Client</th>
                          <th className="tw-p-3">Message feedback</th>
                          <th className="tw-p-3">Rating</th>
                          <th className="tw-p-3">Featured</th>
                          <th className="tw-p-3">Actions</th>
                        </>
                      )}

                      {activeModule === 'Tickets' && (
                        <>
                          <th className="tw-p-3">Ticket Subject</th>
                          <th className="tw-p-3">Client Name</th>
                          <th className="tw-p-3">Priority</th>
                          <th className="tw-p-3">Status</th>
                          <th className="tw-p-3">Opened At</th>
                          <th className="tw-p-3">Actions</th>
                        </>
                      )}

                      {activeModule === 'FileManager' && (
                        <>
                          <th className="tw-p-3">File Name</th>
                          <th className="tw-p-3">Uploaded By</th>
                          <th className="tw-p-3">Size</th>
                          <th className="tw-p-3">Type</th>
                          <th className="tw-p-3">Actions</th>
                        </>
                      )}

                      {activeModule === 'Notifications' && (
                        <>
                          <th className="tw-p-3">Title</th>
                          <th className="tw-p-3">Alert Content</th>
                          <th className="tw-p-3">Dispatched Time</th>
                          <th className="tw-p-3">Status</th>
                        </>
                      )}

                      {activeModule === 'Users' && (
                        <>
                          <th className="tw-p-3">Username</th>
                          <th className="tw-p-3">Email Address</th>
                          <th className="tw-p-3">Assigned Role</th>
                          <th className="tw-p-3">Join Date</th>
                          <th className="tw-p-3">Actions</th>
                        </>
                      )}

                    </tr>
                  </thead>
                  <tbody className="tw-divide-y tw-divide-gray-800">
                    
                    {paginatedItems.map(item => (
                      <tr key={item.id} className="hover:tw-bg-gray-800/40 transition-colors">
                        
                        {activeModule === 'Clients' && (
                          <>
                            <td className="tw-p-3 tw-font-semibold">{item.username}</td>
                            <td className="tw-p-3 tw-text-gray-300">{item.email}</td>
                            <td className="tw-p-3">{item.company || 'N/A'}</td>
                            <td className="tw-p-3">{item.phone || 'N/A'}</td>
                            <td className="tw-p-3 tw-flex tw-gap-2">
                              <button onClick={() => handleOpenEditModal(item)} className="tw-text-indigo-400 hover:tw-text-indigo-300"><Edit2 size={14} /></button>
                              <button onClick={() => handleCRUDDelete(item.id)} className="tw-text-rose-500 hover:tw-text-rose-400"><Trash2 size={14} /></button>
                            </td>
                          </>
                        )}

                        {activeModule === 'Projects' && (
                          <>
                            <td className="tw-p-3 tw-font-semibold">{item.title}</td>
                            <td className="tw-p-3 tw-text-gray-300">{item.client_name}</td>
                            <td className="tw-p-3">${parseFloat(item.budget).toLocaleString()}</td>
                            <td className="tw-p-3">
                              <span className={`tw-px-2 tw-py-0.5 tw-rounded-full tw-text-[9px] ${item.status === 'in_progress' ? 'tw-bg-cyan-500/10 tw-text-cyan-400' : item.status === 'completed' ? 'tw-bg-emerald-500/10 tw-text-emerald-400' : 'tw-bg-amber-500/10 tw-text-amber-400'}`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="tw-p-3">
                              <span className={`tw-px-2 tw-py-0.5 tw-rounded-full tw-text-[9px] ${item.payment_status === 'paid' ? 'tw-bg-emerald-500/10 tw-text-emerald-400' : 'tw-bg-rose-500/10 tw-text-rose-400'}`}>
                                {item.payment_status}
                              </span>
                            </td>
                            <td className="tw-p-3 tw-flex tw-gap-2">
                              <button onClick={() => handleOpenEditModal(item)} className="tw-text-indigo-400 hover:tw-text-indigo-300"><Edit2 size={14} /></button>
                              <button onClick={() => handleCRUDDelete(item.id)} className="tw-text-rose-500 hover:tw-text-rose-400"><Trash2 size={14} /></button>
                            </td>
                          </>
                        )}

                        {activeModule === 'Enquiries' && (
                          <>
                            <td className="tw-p-3 tw-font-semibold">{item.name}</td>
                            <td className="tw-p-3 tw-text-gray-300">{item.email}</td>
                            <td className="tw-p-3 tw-text-indigo-400 tw-font-medium">{item.subject}</td>
                            <td className="tw-p-3 tw-max-w-xs tw-truncate tw-text-gray-400">{item.message}</td>
                            <td className="tw-p-3">
                              <button 
                                onClick={() => handleResolveEnquiry(item.id, item.is_resolved)}
                                className={`tw-px-2 tw-py-0.5 tw-rounded-full tw-text-[9px] tw-border tw-border-transparent ${item.is_resolved ? 'tw-bg-emerald-500/10 tw-text-emerald-400' : 'tw-bg-rose-500/10 tw-text-rose-400'}`}
                              >
                                {item.is_resolved ? 'Resolved' : 'Open'}
                              </button>
                            </td>
                            <td className="tw-p-3">
                              <button onClick={() => handleCRUDDelete(item.id)} className="tw-text-rose-500 hover:tw-text-rose-400"><Trash2 size={14} /></button>
                            </td>
                          </>
                        )}

                        {activeModule === 'Services' && (
                          <>
                            <td className="tw-p-3 tw-font-semibold">{item.title}</td>
                            <td className="tw-p-3">${parseFloat(item.price).toLocaleString()}</td>
                            <td className="tw-p-3 tw-uppercase tw-text-gray-400">{item.billing_cycle.replace('_', ' ')}</td>
                            <td className="tw-p-3 tw-max-w-xs tw-truncate tw-text-gray-400">{item.description}</td>
                            <td className="tw-p-3 tw-flex tw-gap-2">
                              <button onClick={() => handleOpenEditModal(item)} className="tw-text-indigo-400 hover:tw-text-indigo-300"><Edit2 size={14} /></button>
                              <button onClick={() => handleCRUDDelete(item.id)} className="tw-text-rose-500 hover:tw-text-rose-400"><Trash2 size={14} /></button>
                            </td>
                          </>
                        )}

                        {activeModule === 'Pricing' && (
                          <>
                            <td className="tw-p-3 tw-font-semibold">{item.title}</td>
                            <td className="tw-p-3">${parseFloat(item.price).toLocaleString()}</td>
                            <td className="tw-p-3 tw-uppercase tw-text-gray-400">{item.billing_cycle}</td>
                            <td className="tw-p-3 tw-text-cyan-400">{item.icon}</td>
                          </>
                        )}

                        {activeModule === 'Payments' && (
                          <>
                            <td className="tw-p-3 tw-font-semibold">{item.project_title}</td>
                            <td className="tw-p-3">${parseFloat(item.amount).toLocaleString()}</td>
                            <td className="tw-p-3 tw-text-gray-400">{item.payment_method}</td>
                            <td className="tw-p-3 tw-text-indigo-400 tw-font-mono">{item.transaction_id.slice(0, 14)}...</td>
                            <td className="tw-p-3">
                              <span className="tw-bg-emerald-500/10 tw-text-emerald-400 tw-px-2 tw-py-0.5 tw-rounded-full tw-text-[9px]">
                                {item.status}
                              </span>
                            </td>
                            <td className="tw-p-3">
                              <a 
                                href={`/api/payments/payments/${item.id}/download_invoice/`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="tw-text-indigo-400 hover:tw-underline tw-flex tw-items-center tw-gap-1"
                              >
                                <Download size={12} />
                                PDF
                              </a>
                            </td>
                          </>
                        )}

                        {activeModule === 'Completed' && (
                          <>
                            <td className="tw-p-3 tw-font-semibold">{item.title}</td>
                            <td className="tw-p-3 tw-text-gray-300">{item.client || 'Offline Client'}</td>
                            <td className="tw-p-3 tw-text-indigo-400">{item.category}</td>
                            <td className="tw-p-3 tw-max-w-xs tw-truncate tw-text-gray-400">{item.technologies}</td>
                            <td className="tw-p-3">
                              <span className={`tw-px-2 tw-py-0.5 tw-rounded-full tw-text-[9px] ${item.is_confidential ? 'tw-bg-rose-500/10 tw-text-rose-400' : 'tw-bg-emerald-500/10 tw-text-emerald-400'}`}>
                                {item.is_confidential ? 'Confidential' : 'Public'}
                              </span>
                            </td>
                            <td className="tw-p-3 tw-flex tw-gap-2">
                              <button onClick={() => handleOpenEditModal(item)} className="tw-text-indigo-400 hover:tw-text-indigo-300"><Edit2 size={14} /></button>
                              <button onClick={() => handleCRUDDelete(item.id)} className="tw-text-rose-500 hover:tw-text-rose-400"><Trash2 size={14} /></button>
                            </td>
                          </>
                        )}

                        {activeModule === 'Testimonials' && (
                          <>
                            <td className="tw-p-3 tw-font-semibold">{item.client_name}</td>
                            <td className="tw-p-3 tw-max-w-xs tw-truncate tw-text-gray-300">{item.message}</td>
                            <td className="tw-p-3 tw-flex tw-items-center tw-gap-0.5 tw-text-amber-400">
                              <Star size={12} fill="currentColor" />
                              <span>{item.rating}</span>
                            </td>
                            <td className="tw-p-3">
                              <button 
                                onClick={() => handleFeaturedTestimonial(item.id, item.is_featured)}
                                className={`tw-px-2 tw-py-0.5 tw-rounded-full tw-text-[9px] ${item.is_featured ? 'tw-bg-emerald-500/10 tw-text-emerald-400' : 'tw-bg-gray-800 tw-text-gray-500'}`}
                              >
                                {item.is_featured ? 'Featured' : 'Standard'}
                              </button>
                            </td>
                            <td className="tw-p-3">
                              <button onClick={() => handleCRUDDelete(item.id)} className="tw-text-rose-500 hover:tw-text-rose-400"><Trash2 size={14} /></button>
                            </td>
                          </>
                        )}

                        {activeModule === 'Tickets' && (
                          <>
                            <td className="tw-p-3 tw-font-semibold">{item.title}</td>
                            <td className="tw-p-3 tw-text-gray-300">{item.client_name}</td>
                            <td className="tw-p-3">
                              <span className={`tw-px-2 tw-py-0.5 tw-rounded-full tw-text-[9px] ${item.priority === 'high' ? 'tw-bg-rose-500/10 tw-text-rose-400' : 'tw-bg-gray-800 tw-text-gray-300'}`}>
                                {item.priority}
                              </span>
                            </td>
                            <td className="tw-p-3">
                              <span className="tw-px-2 tw-py-0.5 tw-rounded-full tw-text-[9px] tw-bg-indigo-500/10 tw-text-indigo-400">
                                {item.status}
                              </span>
                            </td>
                            <td className="tw-p-3 tw-text-gray-400">{new Date(item.created_at).toLocaleDateString()}</td>
                            <td className="tw-p-3 tw-flex tw-gap-2">
                              <button onClick={() => handleOpenEditModal(item)} className="tw-text-indigo-400 hover:tw-text-indigo-300"><Edit2 size={14} /></button>
                              <button onClick={() => handleCRUDDelete(item.id)} className="tw-text-rose-500 hover:tw-text-rose-400"><Trash2 size={14} /></button>
                            </td>
                          </>
                        )}

                        {activeModule === 'FileManager' && (
                          <>
                            <td className="tw-p-3 tw-font-semibold tw-max-w-xs tw-truncate">{item.file_name}</td>
                            <td className="tw-p-3 tw-text-gray-300">{item.uploader_name}</td>
                            <td className="tw-p-3 tw-text-gray-400">{item.file_size ? `${(item.file_size / 1024).toFixed(1)} KB` : 'N/A'}</td>
                            <td className="tw-p-3 tw-text-gray-400 tw-max-w-[120px] tw-truncate">{item.file_type}</td>
                            <td className="tw-p-3 tw-flex tw-gap-3">
                              <a href={item.file} target="_blank" rel="noopener noreferrer" className="tw-text-indigo-400 hover:tw-text-indigo-300"><Download size={14} /></a>
                              <button onClick={() => handleCRUDDelete(item.id)} className="tw-text-rose-500 hover:tw-text-rose-400"><Trash2 size={14} /></button>
                            </td>
                          </>
                        )}

                        {activeModule === 'Notifications' && (
                          <>
                            <td className="tw-p-3 tw-font-semibold">{item.title}</td>
                            <td className="tw-p-3 tw-text-gray-300">{item.message}</td>
                            <td className="tw-p-3 tw-text-gray-400">{new Date(item.created_at).toLocaleString()}</td>
                            <td className="tw-p-3">
                              <span className={`tw-px-2 tw-py-0.5 tw-rounded-full tw-text-[9px] ${item.is_read ? 'tw-bg-gray-800 tw-text-gray-500' : 'tw-bg-indigo-500/10 tw-text-indigo-400'}`}>
                                {item.is_read ? 'Read' : 'New'}
                              </span>
                            </td>
                          </>
                        )}

                        {activeModule === 'Users' && (
                          <>
                            <td className="tw-p-3 tw-font-semibold">{item.username}</td>
                            <td className="tw-p-3 tw-text-gray-300">{item.email}</td>
                            <td className="tw-p-3 tw-uppercase tw-text-indigo-400 tw-font-semibold">{item.role}</td>
                            <td className="tw-p-3 tw-text-gray-400">{new Date(item.date_joined).toLocaleDateString()}</td>
                            <td className="tw-p-3">
                              <button onClick={() => handleCRUDDelete(item.id)} className="tw-text-rose-500 hover:tw-text-rose-400"><Trash2 size={14} /></button>
                            </td>
                          </>
                        )}

                      </tr>
                    ))}

                    {paginatedItems.length === 0 && (
                      <tr>
                        <td colSpan="6" className="tw-p-8 tw-text-center tw-text-gray-500">
                          No matching records found.
                        </td>
                      </tr>
                    )}

                  </tbody>
                </table>
              </div>

              {/* Table pagination component */}
              <div className="tw-flex tw-items-center tw-justify-between tw-pt-3 tw-border-t tw-border-gray-800">
                <span className="tw-text-xs tw-text-gray-400">
                  Showing page <strong className="tw-text-white">{currentPage}</strong> of <strong className="tw-text-white">{totalPages}</strong>
                </span>
                <div className="tw-flex tw-items-center tw-gap-1.5">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1}
                    className="tw-p-1 tw-rounded tw-bg-gray-800 hover:tw-bg-gray-700 disabled:tw-bg-gray-900 disabled:tw-text-gray-600 tw-text-gray-300"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                    className="tw-p-1 tw-rounded tw-bg-gray-800 hover:tw-bg-gray-700 disabled:tw-bg-gray-900 disabled:tw-text-gray-600 tw-text-gray-300"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Module 6: Pricing Packages */}
          {activeModule === 'Pricing' && (
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6 tw-mt-4">
              {services.map(pkg => (
                <div key={pkg.id} className="tw-bg-agencySurface tw-border tw-border-gray-800 tw-rounded-xl tw-p-6 tw-flex tw-flex-col tw-justify-between">
                  <div>
                    <h3 className="tw-text-lg tw-font-bold tw-text-white tw-mb-2">{pkg.title}</h3>
                    <p className="tw-text-xs tw-text-gray-400 tw-mb-4 tw-line-clamp-3">{pkg.description}</p>
                    <div className="tw-text-3xl tw-font-extrabold tw-text-indigo-400 tw-mb-4">
                      ${parseFloat(pkg.price).toLocaleString()}
                      <span className="tw-text-xs tw-text-gray-500 tw-font-normal tw-block tw-mt-1">Billing cycle: {pkg.billing_cycle}</span>
                    </div>
                  </div>
                  <button onClick={() => { setActiveModule('Services'); }} className="tw-w-full tw-bg-gray-800 hover:tw-bg-gray-700 tw-text-white tw-text-xs tw-font-semibold tw-py-2 tw-rounded-md tw-transition-colors">
                    Manage Service Plan
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Module 13: Analytics charts and detailed distributions */}
          {activeModule === 'Analytics' && (
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-6">
              
              <div className="tw-bg-agencySurface tw-border tw-border-gray-800 tw-p-5 tw-rounded-xl lg:tw-col-span-2">
                <h3 className="tw-text-sm tw-font-bold tw-text-gray-300 tw-mb-4">Quarterly Budget Distributions</h3>
                <div className="tw-h-64 tw-w-full">
                  <svg className="tw-w-full tw-h-full" viewBox="0 0 500 200">
                    <rect x="50" y="30" width="40" height="130" fill="#6366f1" rx="4" />
                    <rect x="150" y="50" width="40" height="110" fill="#06b6d4" rx="4" />
                    <rect x="250" y="80" width="40" height="80" fill="#ec4899" rx="4" />
                    <rect x="350" y="20" width="40" height="140" fill="#10b981" rx="4" />
                    
                    <text x="70" y="180" fill="#9ca3af" fontSize="10" textAnchor="middle">Q1 Web</text>
                    <text x="170" y="180" fill="#9ca3af" fontSize="10" textAnchor="middle">Q2 Brand</text>
                    <text x="270" y="180" fill="#9ca3af" fontSize="10" textAnchor="middle">Q3 Custom</text>
                    <text x="370" y="180" fill="#9ca3af" fontSize="10" textAnchor="middle">Q4 Enterprise</text>

                    <line x1="30" y1="160" x2="450" y2="160" stroke="#374151" />
                    <text x="20" y="163" fill="#9ca3af" fontSize="8" textAnchor="end">$0</text>
                    <text x="20" y="93" fill="#9ca3af" fontSize="8" textAnchor="end">$5,000</text>
                    <text x="20" y="23" fill="#9ca3af" fontSize="8" textAnchor="end">$10,000</text>
                  </svg>
                </div>
              </div>

              <div className="tw-bg-agencySurface tw-border tw-border-gray-800 tw-p-5 tw-rounded-xl">
                <h3 className="tw-text-sm tw-font-bold tw-text-gray-300 tw-mb-4">Transactions Pipeline</h3>
                <div className="tw-space-y-4">
                  <div>
                    <div className="tw-flex tw-justify-between tw-text-xs tw-mb-1">
                      <span>Paid Invoices</span>
                      <span className="tw-text-emerald-400">80%</span>
                    </div>
                    <div className="tw-w-full tw-h-2 tw-bg-gray-800 tw-rounded-full">
                      <div className="tw-h-2 tw-bg-emerald-500 tw-rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="tw-flex tw-justify-between tw-text-xs tw-mb-1">
                      <span>Pending Verification</span>
                      <span className="tw-text-amber-400">15%</span>
                    </div>
                    <div className="tw-w-full tw-h-2 tw-bg-gray-800 tw-rounded-full">
                      <div className="tw-h-2 tw-bg-amber-500 tw-rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="tw-flex tw-justify-between tw-text-xs tw-mb-1">
                      <span>Refunded</span>
                      <span className="tw-text-gray-500">5%</span>
                    </div>
                    <div className="tw-w-full tw-h-2 tw-bg-gray-800 tw-rounded-full">
                      <div className="tw-h-2 tw-bg-gray-600 tw-rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Module 15: Agency Settings */}
          {activeModule === 'Settings' && (
            <div className="tw-bg-agencySurface tw-border tw-border-gray-800 tw-rounded-xl tw-p-6 tw-max-w-2xl">
              <h3 className="tw-text-base tw-font-bold tw-mb-4">Agency Settings Overview</h3>
              <form onSubmit={(e) => { e.preventDefault(); showToast('Settings successfully updated!'); }} className="tw-space-y-4 tw-text-xs">
                <div>
                  <label className="tw-block tw-text-gray-400 tw-mb-1">Agency Name</label>
                  <input type="text" className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none" defaultValue="Project X Code" />
                </div>
                <div>
                  <label className="tw-block tw-text-gray-400 tw-mb-1">Support Contact Email</label>
                  <input type="email" className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none" defaultValue="support@projectxcode.com" />
                </div>
                <div>
                  <label className="tw-block tw-text-gray-400 tw-mb-1">Webhook Secret Verification Key</label>
                  <input type="password" className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none" defaultValue="whsec_1234567890" />
                </div>
                <button type="submit" className="tw-bg-indigo-600 hover:tw-bg-indigo-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-font-semibold">
                  Save Configurations
                </button>
              </form>
            </div>
          )}

          {/* Module 16: Security Audits */}
          {activeModule === 'Security' && (
            <div className="tw-bg-agencySurface tw-border tw-border-gray-800 tw-rounded-xl tw-p-6 tw-max-w-2xl tw-space-y-4">
              <h3 className="tw-text-base tw-font-bold tw-text-rose-500 tw-flex tw-items-center tw-gap-1.5">
                <ShieldAlert size={18} />
                Security Checks Overview
              </h3>
              <div className="tw-space-y-3 tw-text-xs">
                <div className="tw-p-3 tw-bg-gray-800/40 tw-rounded-lg tw-flex tw-justify-between">
                  <span>JWT Tokens Storage Mode</span>
                  <strong className="tw-text-emerald-400">HttpOnly Secure Cookie</strong>
                </div>
                <div className="tw-p-3 tw-bg-gray-800/40 tw-rounded-lg tw-flex tw-justify-between">
                  <span>SSL Autoredirect Enforcement</span>
                  <strong className="tw-text-emerald-400">Active (production)</strong>
                </div>
                <div className="tw-p-3 tw-bg-gray-800/40 tw-rounded-lg tw-flex tw-justify-between">
                  <span>CSRF Double Cookie validations</span>
                  <strong className="tw-text-emerald-400">Active</strong>
                </div>
              </div>
            </div>
          )}

          {/* Module 17: User profile */}
          {activeModule === 'Profile' && (
            <div className="tw-bg-agencySurface tw-border tw-border-gray-800 tw-rounded-xl tw-p-6 tw-max-w-2xl">
              <h3 className="tw-text-base tw-font-bold tw-mb-4">My Account Profile</h3>
              <form onSubmit={(e) => { e.preventDefault(); showToast('Profile details saved!'); }} className="tw-space-y-4 tw-text-xs">
                <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                  <div>
                    <label className="tw-block tw-text-gray-400 tw-mb-1">First Name</label>
                    <input type="text" className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none" defaultValue="Prabhakar" />
                  </div>
                  <div>
                    <label className="tw-block tw-text-gray-400 tw-mb-1">Last Name</label>
                    <input type="text" className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none" defaultValue="Kumar Singh" />
                  </div>
                </div>
                <div>
                  <label className="tw-block tw-text-gray-400 tw-mb-1">Phone Number</label>
                  <input type="text" className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none" defaultValue="+91 99999 99999" />
                </div>
                <button type="submit" className="tw-bg-indigo-600 hover:tw-bg-indigo-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-font-semibold">
                  Update Account
                </button>
              </form>
            </div>
          )}

        </main>
      </div>

      {/* CRUD dialog overlay Modal portal */}
      {isModalOpen && (
        <div className="tw-fixed tw-inset-0 tw-bg-black/60 tw-backdrop-blur-sm tw-flex tw-items-center tw-justify-center tw-z-50 tw-p-4">
          <div className="tw-bg-agencySurface tw-border tw-border-gray-800 tw-rounded-xl tw-w-full tw-max-w-md tw-overflow-hidden tw-shadow-2xl">
            <div className="tw-p-4 tw-bg-gray-800/80 tw-border-b tw-border-gray-800 tw-flex tw-justify-between tw-items-center">
              <h3 className="tw-text-sm tw-font-bold tw-text-white tw-capitalize">
                {modalMode} {activeModule.slice(0, -1)} Record
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="tw-text-gray-400 hover:tw-text-white">
                <X size={16} />
              </button>
            </div>
            
            <form onSubmit={handleCRUDSubmit} className="tw-p-4 tw-space-y-4 tw-text-xs">
              
              {activeModule === 'Services' && (
                <>
                  <div>
                    <label className="tw-block tw-text-gray-400 tw-mb-1">Service Title</label>
                    <input 
                      type="text" 
                      required
                      className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none"
                      value={serviceForm.title}
                      onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="tw-block tw-text-gray-400 tw-mb-1">Base Price ($)</label>
                    <input 
                      type="number" 
                      required
                      className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none"
                      value={serviceForm.price}
                      onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="tw-block tw-text-gray-400 tw-mb-1">Billing Cycle</label>
                    <select 
                      className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none"
                      value={serviceForm.billing_cycle}
                      onChange={(e) => setServiceForm({ ...serviceForm, billing_cycle: e.target.value })}
                    >
                      <option value="one_time">One Time</option>
                      <option value="monthly">Monthly</option>
                      <option value="annual">Annual</option>
                    </select>
                  </div>
                  <div>
                    <label className="tw-block tw-text-gray-400 tw-mb-1">Package Description</label>
                    <textarea 
                      required
                      className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none tw-h-20"
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                    />
                  </div>
                </>
              )}

              {activeModule === 'Tickets' && (
                <>
                  <div>
                    <label className="tw-block tw-text-gray-400 tw-mb-1">Ticket Subject</label>
                    <input 
                      type="text" 
                      required
                      className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none"
                      value={ticketForm.title}
                      onChange={(e) => setTicketForm({ ...ticketForm, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="tw-block tw-text-gray-400 tw-mb-1">Ticket Priority</label>
                    <select 
                      className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none"
                      value={ticketForm.priority}
                      onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="tw-block tw-text-gray-400 tw-mb-1">Ticket Status</label>
                    <select 
                      className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none"
                      value={ticketForm.status}
                      onChange={(e) => setTicketForm({ ...ticketForm, status: e.target.value })}
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div>
                    <label className="tw-block tw-text-gray-400 tw-mb-1">Ticket Description</label>
                    <textarea 
                      required
                      className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none tw-h-20"
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                    />
                  </div>
                </>
              )}

              {activeModule === 'Clients' && (
                <>
                  <div>
                    <label className="tw-block tw-text-gray-400 tw-mb-1">Username Handle</label>
                    <input 
                      type="text" 
                      required
                      disabled={modalMode === 'edit'}
                      className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none disabled:tw-bg-gray-900 disabled:tw-text-gray-500"
                      value={clientForm.username}
                      onChange={(e) => setClientForm({ ...clientForm, username: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="tw-block tw-text-gray-400 tw-mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none"
                      value={clientForm.email}
                      onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                    />
                  </div>
                  <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                    <div>
                      <label className="tw-block tw-text-gray-400 tw-mb-1">First Name</label>
                      <input 
                        type="text" 
                        className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none"
                        value={clientForm.first_name}
                        onChange={(e) => setClientForm({ ...clientForm, first_name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="tw-block tw-text-gray-400 tw-mb-1">Last Name</label>
                      <input 
                        type="text" 
                        className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none"
                        value={clientForm.last_name}
                        onChange={(e) => setClientForm({ ...clientForm, last_name: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="tw-block tw-text-gray-400 tw-mb-1">Company Name</label>
                    <input 
                      type="text" 
                      className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none"
                      value={clientForm.company}
                      onChange={(e) => setClientForm({ ...clientForm, company: e.target.value })}
                    />
                  </div>
                </>
              )}

              {activeModule === 'Projects' && (
                <>
                  <div>
                    <label className="tw-block tw-text-gray-400 tw-mb-1">Project Name</label>
                    <input 
                      type="text" 
                      required
                      className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="tw-block tw-text-gray-400 tw-mb-1">Estimated Budget ($)</label>
                    <input 
                      type="number" 
                      required
                      className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none"
                      value={projectForm.budget}
                      onChange={(e) => setProjectForm({ ...projectForm, budget: e.target.value })}
                    />
                  </div>
                  <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                    <div>
                      <label className="tw-block tw-text-gray-400 tw-mb-1">Status</label>
                      <select 
                        className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none"
                        value={projectForm.status}
                        onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div>
                      <label className="tw-block tw-text-gray-400 tw-mb-1">Payment Status</label>
                      <select 
                        className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none"
                        value={projectForm.payment_status}
                        onChange={(e) => setProjectForm({ ...projectForm, payment_status: e.target.value })}
                      >
                        <option value="unpaid">Unpaid</option>
                        <option value="paid">Paid</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="tw-block tw-text-gray-400 tw-mb-1">Assign Client</label>
                    <select 
                      required
                      className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none"
                      value={projectForm.client}
                      onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                    >
                      <option value="">Select Client Account</option>
                      {users.filter(u => u.role === 'client').map(u => (
                        <option key={u.id} value={u.id}>{u.username}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="tw-block tw-text-gray-400 tw-mb-1">Detailed Description</label>
                    <textarea 
                      required
                      className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none tw-h-16"
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    />
                  </div>
                </>
              )}

              {activeModule === 'Completed' && (
                <>
                  <div>
                    <label className="tw-block tw-text-gray-400 tw-mb-1">Project Showcase Title</label>
                    <input 
                      type="text" 
                      required
                      className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none"
                      value={portfolioForm.title}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="tw-block tw-text-gray-400 tw-mb-1">Technologies Used (comma separated)</label>
                    <input 
                      type="text" 
                      required
                      placeholder="React, Django, PostgreSQL"
                      className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none"
                      value={portfolioForm.technologies}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, technologies: e.target.value })}
                    />
                  </div>
                  <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                    <div>
                      <label className="tw-block tw-text-gray-400 tw-mb-1">Category</label>
                      <select 
                        className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none"
                        value={portfolioForm.category}
                        onChange={(e) => setPortfolioForm({ ...portfolioForm, category: e.target.value })}
                      >
                        <option value="Website">Website</option>
                        <option value="Software">Software</option>
                        <option value="Final Year Project">Final Year Project</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Management System">Management System</option>
                      </select>
                    </div>
                    <div>
                      <label className="tw-block tw-text-gray-400 tw-mb-1">Confidential Status</label>
                      <select 
                        className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none"
                        value={portfolioForm.is_confidential}
                        onChange={(e) => setPortfolioForm({ ...portfolioForm, is_confidential: e.target.value === 'true' })}
                      >
                        <option value="false">Public Showcase</option>
                        <option value="true">Confidential Badge</option>
                      </select>
                    </div>
                  </div>
                  <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                    <div>
                      <label className="tw-block tw-text-gray-400 tw-mb-1">Live Demo URL</label>
                      <input 
                        type="url" 
                        className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none"
                        value={portfolioForm.live_url}
                        onChange={(e) => setPortfolioForm({ ...portfolioForm, live_url: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="tw-block tw-text-gray-400 tw-mb-1">GitHub URL</label>
                      <input 
                        type="url" 
                        className="tw-w-full tw-bg-gray-800 tw-border tw-border-gray-700 tw-rounded-md tw-p-2 tw-text-white focus:tw-outline-none"
                        value={portfolioForm.github_url}
                        onChange={(e) => setPortfolioForm({ ...portfolioForm, github_url: e.target.value })}
                      />
                    </div>
                  </div>
                </>
              )}

              <button 
                type="submit" 
                className="tw-w-full tw-bg-indigo-600 hover:tw-bg-indigo-500 tw-text-white tw-font-bold tw-py-2 tw-rounded-md tw-transition-colors tw-mt-2"
              >
                {modalMode === 'create' ? 'Create Record' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
