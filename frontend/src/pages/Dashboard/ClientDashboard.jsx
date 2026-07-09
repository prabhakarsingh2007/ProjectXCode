import React from 'react';
import { Folder, CreditCard, Clock, CheckCircle, Bell, Download, Star } from 'lucide-react';
import ProjectTimeline from '../../components/ProjectTimeline/ProjectTimeline';

const ClientDashboard = ({ 
  stats, 
  recentProjects, 
  recentNotifications, 
  paymentLoading, 
  handlePayInvoice, 
  handleMarkNotifications,
  onOpenReview
}) => {
  return (
    <div style={{ animation: 'fadeIn var(--transition-normal)' }}>
      {/* Stats Cards Grid */}
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
            <span style={{ fontSize: '0.85rem', color: 'hsl(var(--text-muted))', display: 'block' }}>Completed Projects</span>
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

      {/* Main Grid Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }} className="dashboard-grid">
        
        {/* Left Side: Client Projects */}
        <div>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Folder size={22} color="hsl(var(--primary))" />
            Your Project Pipeline
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {recentProjects && recentProjects.length > 0 ? (
              recentProjects.map(proj => (
                <div key={proj.id} className="card-glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{proj.title}</h3>
                      <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>
                        Requested {new Date(proj.created_at).toLocaleDateString()}
                      </span>
                      {proj.file_attachment && (
                        <div style={{ marginTop: '8px' }}>
                          <a 
                            href={proj.file_attachment} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{ fontSize: '0.75rem', color: 'hsl(var(--primary))', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Download size={12} />
                            View Attached Specification
                          </a>
                        </div>
                      )}
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

                  {/* Stepper Timeline Tracker */}
                  <ProjectTimeline status={proj.status} paymentStatus={proj.payment_status} />

                  <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.9rem' }}>{proj.description}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid hsl(var(--border))', paddingTop: '16px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', display: 'block' }}>Project Value</span>
                      <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>${parseFloat(proj.budget).toLocaleString()}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      {proj.payment_status === 'unpaid' && (
                        <button 
                          className="btn btn-primary" 
                          onClick={() => handlePayInvoice(proj.id)}
                          disabled={paymentLoading === proj.id}
                          style={{ gap: '6px', padding: '8px 16px', fontSize: '0.85rem' }}
                        >
                          <CreditCard size={14} />
                          {paymentLoading === proj.id ? 'Connecting to Stripe...' : 'Pay Invoice (Stripe)'}
                        </button>
                      )}

                      {proj.payment_status === 'paid' && proj.payment_id && (
                        <a 
                          href={`/api/payments/${proj.payment_id}/download_invoice/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary" 
                          style={{ gap: '6px', padding: '8px 16px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center' }}
                        >
                          <Download size={14} />
                          Invoice PDF
                        </a>
                      )}

                      {proj.status === 'completed' && (
                        <button 
                          className="btn btn-accent" 
                          onClick={() => onOpenReview(proj)}
                          style={{ gap: '6px', padding: '8px 16px', fontSize: '0.85rem' }}
                        >
                          <Star size={14} />
                          Review Project
                        </button>
                      )}
                    </div>
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

        {/* Right Side: Alerts Drawer */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bell size={20} color="hsl(var(--accent))" />
              Alerts
            </h2>
            {recentNotifications && recentNotifications.some(n => !n.is_read) && (
              <button onClick={handleMarkNotifications} style={{ border: 'none', background: 'transparent', color: 'hsl(var(--primary))', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}>
                Mark all read
              </button>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentNotifications && recentNotifications.length > 0 ? (
              recentNotifications.map(notif => (
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

      </div>
    </div>
  );
};

export default ClientDashboard;
