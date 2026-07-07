import React from 'react';
import { Folder, MessageSquare } from 'lucide-react';

const AdminDashboard = ({ 
  stats, 
  recentProjects, 
  recentEnquiries, 
  statusLoading, 
  handleStatusChange 
}) => {
  return (
    <div style={{ animation: 'fadeIn var(--transition-normal)' }}>
      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', display: 'block' }}>Total Revenue</span>
            <span style={{ fontSize: '1.4rem', fontWeight: '800' }} className="text-gradient">${stats.totalRevenue.toLocaleString()}</span>
          </div>
        </div>
        <div className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', display: 'block' }}>Pending Review</span>
            <span style={{ fontSize: '1.4rem', fontWeight: '800' }}>{stats.pendingProjects}</span>
          </div>
        </div>
        <div className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', display: 'block' }}>Active Assignments</span>
            <span style={{ fontSize: '1.4rem', fontWeight: '800' }}>{stats.activeProjects}</span>
          </div>
        </div>
        <div className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', display: 'block' }}>Total Enquiries</span>
            <span style={{ fontSize: '1.4rem', fontWeight: '800' }}>{stats.totalEnquiries}</span>
          </div>
        </div>
        <div className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', display: 'block' }}>Unresolved Message</span>
            <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'hsl(var(--accent))' }}>{stats.unresolvedEnquiries}</span>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }} className="dashboard-grid">
        
        {/* Left Side: All Project Requests */}
        <div>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Folder size={22} color="hsl(var(--primary))" />
            All Project Requests
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {recentProjects && recentProjects.length > 0 ? (
              recentProjects.map(proj => (
                <div key={proj.id} className="card-glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{proj.title}</h3>
                      <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>
                        Requested {new Date(proj.created_at).toLocaleDateString()} | Client: <strong>{proj.client_name}</strong>
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
                  </div>
                </div>
              ))
            ) : (
              <div className="card-glass" style={{ textAlign: 'center', padding: '40px', color: 'hsl(var(--text-muted))' }}>
                <Folder size={32} style={{ marginBottom: '10px' }} />
                <p>No project requests have been submitted yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Open Inquiries */}
        <div>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MessageSquare size={20} color="hsl(var(--secondary))" />
            Open Inquiries
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentEnquiries && recentEnquiries.length > 0 ? (
              recentEnquiries.map(enq => (
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

      </div>
    </div>
  );
};

export default AdminDashboard;
