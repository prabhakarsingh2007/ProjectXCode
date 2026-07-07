import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { projectApi } from '../../api/projectApi';
import Loader from '../../components/Loader/Loader';
import { CreditCard, Bell, Sparkles, Folder, CheckCircle, Clock, CheckCircle2, MessageSquare, AlertCircle, RefreshCw } from 'lucide-react';
import api from '../../api/axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(null);
  const [statusLoading, setStatusLoading] = useState(null);

  const fetchStats = async () => {
    try {
      const stats = await projectApi.getDashboardStats();
      setData(stats);
    } catch (error) {
      console.error('Failed to load dashboard statistics', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handlePayInvoice = async (projectId, budget) => {
    setPaymentLoading(projectId);
    try {
      await projectApi.makePayment({
        project_request: projectId,
        amount: parseFloat(budget),
        payment_method: 'Stripe Credit Card',
        transaction_id: 'TXN-' + Math.floor(Math.random() * 10000000),
        status: 'completed'
      });
      await fetchStats();
    } catch (error) {
      console.error(error);
      alert('Mock payment transaction failed.');
    } finally {
      setPaymentLoading(null);
    }
  };

  const handleStatusChange = async (projectId, newStatus) => {
    setStatusLoading(projectId);
    try {
      await api.patch(`/projects/${projectId}/`, { status: newStatus });
      // If completed, trigger a payment notification or just custom alert
      await fetchStats();
    } catch (error) {
      console.error(error);
    } finally {
      setStatusLoading(null);
    }
  };

  const handleMarkNotifications = async () => {
    try {
      await projectApi.markNotificationsAsRead();
      await fetchStats();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Loader fullPage />;
  }

  const isClient = data.role === 'client';
  const { stats } = data;

  return (
    <div className="container" style={{ padding: '40px 24px', animation: 'fadeIn var(--transition-normal)', minHeight: '80vh' }}>
      
      {/* Welcome banner */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
            Welcome, <span className="text-gradient">{user.first_name || user.username}</span>
          </h1>
          <p style={{ color: 'hsl(var(--text-secondary))' }}>
            Account Role: <strong style={{ textTransform: 'uppercase', color: 'hsl(var(--primary))' }}>{data.role}</strong>
            {user.company && ` | Company: ${user.company}`}
          </p>
        </div>
        <button className="btn btn-secondary" onClick={() => { setLoading(true); fetchStats(); }} style={{ gap: '6px', padding: '10px 16px' }}>
          <RefreshCw size={16} />
          Refresh Stats
        </button>
      </header>

      {/* Grid Stats */}
      {isClient ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
            <div style={{ background: 'hsla(var(--primary), 0.1)', color: 'hsl(var(--primary))', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <Clock size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))', display: 'block' }}>Pending Approvals</span>
              <span style={{ fontSize: '1.6rem', fontWeight: '800' }}>{stats.pendingProjects}</span>
            </div>
          </div>
          <div className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
            <div style={{ background: 'hsla(var(--secondary), 0.1)', color: 'hsl(var(--secondary))', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <Folder size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))', display: 'block' }}>Active Projects</span>
              <span style={{ fontSize: '1.6rem', fontWeight: '800' }}>{stats.activeProjects}</span>
            </div>
          </div>
          <div className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
            <div style={{ background: 'hsla(var(--accent), 0.1)', color: 'hsl(var(--accent))', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <CheckCircle size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))', display: 'block' }}>Completed</span>
              <span style={{ fontSize: '1.6rem', fontWeight: '800' }}>{stats.completedProjects}</span>
            </div>
          </div>
          <div className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px' }}>
            <div style={{ background: 'hsla(var(--secondary), 0.1)', color: 'hsl(var(--secondary))', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <CreditCard size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))', display: 'block' }}>Total Paid</span>
              <span style={{ fontSize: '1.6rem', fontWeight: '800' }}>${stats.totalPaid.toLocaleString()}</span>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', display: 'block' }}>Total Revenue</span>
              <span style={{ fontSize: '1.4rem', fontWeight: '800' }} className="text-gradient">${stats.totalRevenue.toLocaleString()}</span>
            </div>
          </div>
          <div className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', display: 'block' }}>Pending Projects</span>
              <span style={{ fontSize: '1.4rem', fontWeight: '800' }}>{stats.pendingProjects}</span>
            </div>
          </div>
          <div className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', display: 'block' }}>Active Projects</span>
              <span style={{ fontSize: '1.4rem', fontWeight: '800' }}>{stats.activeProjects}</span>
            </div>
          </div>
          <div className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', display: 'block' }}>Total Inquiries</span>
              <span style={{ fontSize: '1.4rem', fontWeight: '800' }}>{stats.totalEnquiries}</span>
            </div>
          </div>
          <div className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', display: 'block' }}>Open Inquiries</span>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'hsl(var(--accent))' }}>{stats.unresolvedEnquiries}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main split sections */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', '@media (maxWidth: 992px)': { gridTemplateColumns: '1fr' } }} className="dashboard-grid">
        
        {/* Projects panel */}
        <div>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Folder size={22} color="hsl(var(--primary))" />
            {isClient ? 'Your Project Pipeline' : 'All Project Requests'}
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {data.recentProjects && data.recentProjects.length > 0 ? (
              data.recentProjects.map(proj => (
                <div key={proj.id} className="card-glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{proj.title}</h3>
                      <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>
                        Requested {new Date(proj.created_at).toLocaleDateString()}
                        {!isClient && ` | Client: ${proj.client_name}`}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        padding: '4px 10px', 
                        borderRadius: 'var(--radius-full)', 
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        background: proj.status === 'in_progress' ? 'rgba(0, 200, 200, 0.1)' : proj.status === 'completed' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 200, 0, 0.1)',
                        color: proj.status === 'in_progress' ? 'hsl(var(--secondary))' : proj.status === 'completed' ? '#50e050' : '#e0e050'
                      }}>
                        {proj.status.replace('_', ' ')}
                      </span>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        padding: '4px 10px', 
                        borderRadius: 'var(--radius-full)', 
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        background: proj.payment_status === 'paid' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.05)',
                        color: proj.payment_status === 'paid' ? '#50e050' : '#ff6060'
                      }}>
                        {proj.payment_status}
                      </span>
                    </div>
                  </div>

                  <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem' }}>{proj.description}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid hsl(var(--border))', paddingTop: '16px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', display: 'block' }}>Project Value</span>
                      <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>${parseFloat(proj.budget).toLocaleString()}</span>
                    </div>

                    {/* Conditional Action Buttons */}
                    {isClient ? (
                      proj.payment_status === 'unpaid' && (
                        <button 
                          className="btn btn-primary" 
                          onClick={() => handlePayInvoice(proj.id, proj.budget)}
                          disabled={paymentLoading === proj.id}
                          style={{ gap: '6px', padding: '8px 16px', fontSize: '0.85rem' }}
                        >
                          <CreditCard size={14} />
                          {paymentLoading === proj.id ? 'Processing Mock Payment...' : 'Pay Invoice (Mock)'}
                        </button>
                      )
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))' }}>Modify Status:</span>
                        <select 
                          className="form-input" 
                          value={proj.status}
                          onChange={(e) => handleStatusChange(proj.id, e.target.value)}
                          disabled={statusLoading === proj.id}
                          style={{ padding: '6px 12px', fontSize: '0.85rem', background: 'hsl(var(--bg-surface))', color: 'hsl(var(--text-primary))' }}
                        >
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="card-glass" style={{ textAlign: 'center', padding: '40px', color: 'hsl(var(--text-muted))' }}>
                <Folder size={32} style={{ marginBottom: '10px' }} />
                <p>No project requests found. Start by requesting a customized workspace project.</p>
              </div>
            )}
          </div>
        </div>

        {/* Side panel */}
        <div>
          {isClient ? (
            /* Client Side: Notifications drawer */
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Bell size={20} color="hsl(var(--accent))" />
                  Alerts
                </h2>
                {data.recentNotifications && data.recentNotifications.some(n => !n.is_read) && (
                  <button onClick={handleMarkNotifications} style={{ border: 'none', background: 'transparent', color: 'hsl(var(--primary))', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}>
                    Mark all read
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {data.recentNotifications && data.recentNotifications.length > 0 ? (
                  data.recentNotifications.map(notif => (
                    <div key={notif.id} className="card-glass" style={{ 
                      padding: '16px', 
                      fontSize: '0.85rem',
                      borderLeft: notif.is_read ? '1px solid hsl(var(--border))' : '4px solid hsl(var(--primary))',
                      background: notif.is_read ? 'hsl(var(--bg-glass))' : 'hsla(var(--primary), 0.03)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <strong>{notif.title}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>{new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p style={{ color: 'hsl(var(--text-secondary))' }}>{notif.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="card-glass" style={{ textAlign: 'center', padding: '30px', color: 'hsl(var(--text-muted))' }}>
                    <Bell size={24} style={{ marginBottom: '8px' }} />
                    <p>No recent alerts.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Admin Side: Recent Enquiries drawer */
            <div>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MessageSquare size={20} color="hsl(var(--secondary))" />
                Open Inquiries
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {data.recentEnquiries && data.recentEnquiries.length > 0 ? (
                  data.recentEnquiries.map(enq => (
                    <div key={enq.id} className="card-glass" style={{ padding: '16px', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <strong>{enq.name}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>{new Date(enq.created_at).toLocaleDateString()}</span>
                      </div>
                      <span style={{ display: 'block', color: 'hsl(var(--primary))', fontWeight: '600', marginBottom: '6px' }}>{enq.subject}</span>
                      <p style={{ color: 'hsl(var(--text-secondary))', marginBottom: '10px' }}>{enq.message}</p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid hsl(var(--border))', paddingTop: '10px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>{enq.email}</span>
                        <span style={{ 
                          fontSize: '0.75rem', 
                          fontWeight: '600',
                          color: enq.is_resolved ? '#50e050' : 'hsl(var(--accent))'
                        }}>
                          {enq.is_resolved ? 'Resolved' : 'Open'}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="card-glass" style={{ textAlign: 'center', padding: '30px', color: 'hsl(var(--text-muted))' }}>
                    <MessageSquare size={24} style={{ marginBottom: '8px' }} />
                    <p>No new client messages.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
