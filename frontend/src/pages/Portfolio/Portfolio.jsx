import React, { useEffect, useState } from 'react';
import PortfolioCard from '../../components/PortfolioCard/PortfolioCard';
import Loader from '../../components/Loader/Loader';
import { CheckCircle2, Users, Globe, Cpu, Clock, Search, X } from 'lucide-react';
import api from '../../api/axios';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    total_completed: 0,
    happy_clients: 0,
    websites_delivered: 0,
    software_solutions: 0,
    ongoing_projects: 0
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = [
    'All',
    'Website',
    'Software',
    'Final Year Project',
    'E-commerce',
    'Management System'
  ];

  // Fetch stats once on mount
  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await api.get('/portfolio/stats/');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to load portfolio stats', error);
      }
    };
    loadStats();
  }, []);

  // Fetch projects whenever category or search changes
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const params = {};
        if (category && category !== 'All') {
          params.category = category;
        }
        if (search) {
          params.search = search;
        }
        const response = await api.get('/portfolio/', { params });
        setProjects(response.data);
        setVisibleCount(6); // Reset pagination on filter change
      } catch (error) {
        console.error('Failed to load projects', error);
      } finally {
        setLoading(false);
      }
    };
    
    // Simple debounce for search
    const timer = setTimeout(() => {
      loadProjects();
    }, 300);

    return () => clearTimeout(timer);
  }, [category, search]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const handleClearSearch = () => {
    setSearch('');
  };

  return (
    <div className="container" style={{ padding: '60px 24px', animation: 'fadeIn var(--transition-normal)', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      
      {/* Page Header */}
      <header className="page-header" style={{ marginBottom: '0px' }}>
        <h1 className="page-title">Our Completed <span className="text-gradient">Projects</span></h1>
        <p className="page-subtitle">
          Explore our certified client software suite deployments, modern web applications, and custom engineering projects. We build secure, production-ready systems that align with your operational targets.
        </p>
      </header>

      {/* Stats Bar */}
      <section style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
        gap: '20px', 
        width: '100%' 
      }}>
        <div className="card-glass" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'hsla(var(--primary), 0.1)', color: 'hsl(var(--primary))', padding: '10px', borderRadius: '8px' }}>
            <CheckCircle2 size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Completed</span>
            <span style={{ fontSize: '1.4rem', fontWeight: '800' }}>{stats.total_completed}</span>
          </div>
        </div>

        <div className="card-glass" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'hsla(var(--secondary), 0.1)', color: 'hsl(var(--secondary))', padding: '10px', borderRadius: '8px' }}>
            <Users size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Happy Clients</span>
            <span style={{ fontSize: '1.4rem', fontWeight: '800' }}>{stats.happy_clients}+</span>
          </div>
        </div>

        <div className="card-glass" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'hsla(var(--accent), 0.1)', color: 'hsl(var(--accent))', padding: '10px', borderRadius: '8px' }}>
            <Globe size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Websites</span>
            <span style={{ fontSize: '1.4rem', fontWeight: '800' }}>{stats.websites_delivered}</span>
          </div>
        </div>

        <div className="card-glass" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'hsla(var(--primary), 0.1)', color: 'hsl(var(--primary))', padding: '10px', borderRadius: '8px' }}>
            <Cpu size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Software</span>
            <span style={{ fontSize: '1.4rem', fontWeight: '800' }}>{stats.software_solutions}</span>
          </div>
        </div>

        <div className="card-glass" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ background: 'hsla(var(--secondary), 0.1)', color: 'hsl(var(--secondary))', padding: '10px', borderRadius: '8px' }}>
            <Clock size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ongoing</span>
            <span style={{ fontSize: '1.4rem', fontWeight: '800' }}>{stats.ongoing_projects}</span>
          </div>
        </div>
      </section>

      {/* Filters and Search Bar */}
      <section style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px', 
        borderBottom: '1px solid hsl(var(--border))', 
        paddingBottom: '30px' 
      }}>
        {/* Search Input */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '480px', margin: '0 auto' }}>
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--text-muted))', display: 'flex' }}>
            <Search size={18} />
          </span>
          <input 
            type="text" 
            placeholder="Search projects by title, details, or technologies..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
            style={{ width: '100%', paddingLeft: '48px', paddingRight: search ? '40px' : '16px', borderRadius: 'var(--radius-full)' }}
          />
          {search && (
            <button 
              onClick={handleClearSearch}
              style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'transparent', color: 'hsl(var(--text-muted))', cursor: 'pointer', display: 'flex', padding: 0 }}
              title="Clear Search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Category Filters Grid */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap', 
          gap: '10px',
          marginTop: '10px'
        }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setCategory(cat)}
              className={`btn ${category === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 18px', fontSize: '0.825rem', borderRadius: 'var(--radius-full)' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid Display */}
      {loading && projects.length === 0 ? (
        <div style={{ padding: '60px 0' }}>
          <Loader />
        </div>
      ) : (
        <section>
          {projects.length > 0 ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
                {projects.slice(0, visibleCount).map(project => (
                  <PortfolioCard key={project.id} project={project} />
                ))}
              </div>
              
              {/* Load More Button */}
              {projects.length > visibleCount && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
                  <button onClick={handleLoadMore} className="btn btn-primary" style={{ padding: '12px 36px' }}>
                    Load More Projects
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="card-glass" style={{ textAlign: 'center', padding: '60px 24px', color: 'hsl(var(--text-muted))' }}>
              <Cpu size={48} style={{ marginBottom: '16px', strokeWidth: 1.5 }} />
              <h3 style={{ fontSize: '1.4rem', color: 'hsl(var(--text-primary))', marginBottom: '8px' }}>No projects found</h3>
              <p>We couldn't find any completed projects matching your search term or category filters.</p>
              {(search || category !== 'All') && (
                <button 
                  onClick={() => { setCategory('All'); setSearch(''); }}
                  className="btn btn-secondary" 
                  style={{ marginTop: '20px', fontSize: '0.85rem' }}
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}
        </section>
      )}

    </div>
  );
};

export default Portfolio;
