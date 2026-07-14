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
    <div className="tw-animate-fadeIn tw-space-y-10">
      
      {/* Stats Cards Grid */}
      <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-6">
        
        {/* Pending Approvals */}
        <div className="tw-bg-[#131C31]/50 tw-border tw-border-white/10 tw-rounded-[18px] tw-p-6 tw-flex tw-items-center tw-gap-4 tw-backdrop-blur-md">
          <div className="tw-bg-indigo-600/15 tw-text-indigo-400 tw-p-3 tw-rounded-xl">
            <Clock size={22} />
          </div>
          <div>
            <span className="tw-text-[10px] tw-font-bold tw-text-gray-500 tw-block tw-uppercase tw-tracking-wider">Pending Sprints</span>
            <span className="tw-text-xl tw-font-black tw-text-white">{stats.pendingProjects}</span>
          </div>
        </div>

        {/* Active Projects */}
        <div className="tw-bg-[#131C31]/50 tw-border tw-border-white/10 tw-rounded-[18px] tw-p-6 tw-flex tw-items-center tw-gap-4 tw-backdrop-blur-md">
          <div className="tw-bg-blue-600/15 tw-text-blue-400 tw-p-3 tw-rounded-xl">
            <Folder size={22} />
          </div>
          <div>
            <span className="tw-text-[10px] tw-font-bold tw-text-gray-500 tw-block tw-uppercase tw-tracking-wider">Active Sprints</span>
            <span className="tw-text-xl tw-font-black tw-text-white">{stats.activeProjects}</span>
          </div>
        </div>

        {/* Completed Projects */}
        <div className="tw-bg-[#131C31]/50 tw-border tw-border-white/10 tw-rounded-[18px] tw-p-6 tw-flex tw-items-center tw-gap-4 tw-backdrop-blur-md">
          <div className="tw-bg-emerald-600/15 tw-text-emerald-400 tw-p-3 tw-rounded-xl">
            <CheckCircle size={22} />
          </div>
          <div>
            <span className="tw-text-[10px] tw-font-bold tw-text-gray-500 tw-block tw-uppercase tw-tracking-wider">Completed Sprints</span>
            <span className="tw-text-xl tw-font-black tw-text-white">{stats.completedProjects}</span>
          </div>
        </div>

        {/* Total Paid */}
        <div className="tw-bg-[#131C31]/50 tw-border tw-border-white/10 tw-rounded-[18px] tw-p-6 tw-flex tw-items-center tw-gap-4 tw-backdrop-blur-md">
          <div className="tw-bg-purple-600/15 tw-text-purple-400 tw-p-3 tw-rounded-xl">
            <CreditCard size={22} />
          </div>
          <div>
            <span className="tw-text-[10px] tw-font-bold tw-text-gray-500 tw-block tw-uppercase tw-tracking-wider">Total Value</span>
            <span className="tw-text-xl tw-font-black tw-text-white">${stats.totalPaid.toLocaleString()}</span>
          </div>
        </div>

      </div>

      {/* Main Grid Content */}
      <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-8">
        
        {/* Left Side: Client Projects (Span 2) */}
        <div className="lg:tw-col-span-2 tw-space-y-6">
          <h2 className="tw-text-lg tw-font-bold tw-text-white tw-flex tw-items-center tw-gap-2.5">
            <Folder size={18} className="tw-text-indigo-400" />
            Your Project Pipeline
          </h2>
          
          <div className="tw-space-y-6">
            {recentProjects && recentProjects.length > 0 ? (
              recentProjects.map(proj => (
                <div key={proj.id} className="tw-bg-[#131C31]/50 tw-border tw-border-white/10 tw-rounded-[18px] tw-p-6 tw-space-y-6 tw-backdrop-blur-sm">
                  
                  {/* Top line project details */}
                  <div className="tw-flex tw-justify-between tw-items-start tw-flex-wrap tw-gap-4">
                    <div>
                      <h3 className="tw-text-sm sm:tw-text-base tw-font-bold tw-text-white">{proj.title}</h3>
                      <span className="tw-text-[10px] tw-text-gray-500">
                        Requested {new Date(proj.created_at).toLocaleDateString()}
                      </span>
                      {proj.file_attachment && (
                        <div className="tw-mt-2">
                          <a 
                            href={proj.file_attachment} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="tw-text-[10px] tw-text-indigo-400 hover:tw-underline tw-inline-flex tw-items-center tw-gap-1 tw-no-underline"
                          >
                            <Download size={10} />
                            View Attached Specification
                          </a>
                        </div>
                      )}
                    </div>
                    
                    <div className="tw-flex tw-gap-2">
                      <span className={`tw-text-[9px] tw-font-bold tw-uppercase tw-px-2.5 tw-py-1 tw-rounded-full ${
                        proj.status === 'in_progress' ? 'tw-bg-blue-600/10 tw-text-blue-400' : proj.status === 'completed' ? 'tw-bg-emerald-600/10 tw-text-emerald-400' : 'tw-bg-amber-600/10 tw-text-amber-400'
                      }`}>
                        {proj.status.replace('_', ' ')}
                      </span>
                      <span className={`tw-text-[9px] tw-font-bold tw-uppercase tw-px-2.5 tw-py-1 tw-rounded-full ${
                        proj.payment_status === 'paid' ? 'tw-bg-emerald-600/10 tw-text-emerald-400' : 'tw-bg-rose-600/10 tw-text-rose-400'
                      }`}>
                        {proj.payment_status}
                      </span>
                    </div>
                  </div>

                  {/* Stepper Timeline Tracker */}
                  <ProjectTimeline status={proj.status} paymentStatus={proj.payment_status} />

                  <p className="tw-text-xs tw-text-[#A5B4C3] tw-leading-relaxed">{proj.description}</p>
                  
                  {/* Action buttons footer */}
                  <div className="tw-pt-4 tw-border-t tw-border-white/5 tw-flex tw-justify-between tw-items-center tw-flex-wrap tw-gap-4">
                    <div>
                      <span className="tw-text-[9px] tw-text-gray-500 tw-block tw-uppercase tw-tracking-wide">Project Value</span>
                      <span className="tw-text-sm tw-font-black tw-text-white">${parseFloat(proj.budget).toLocaleString()}</span>
                    </div>

                    <div className="tw-flex tw-gap-3">
                      {proj.payment_status === 'unpaid' && (
                        <button 
                          className="tw-flex tw-items-center tw-gap-1.5 tw-bg-indigo-600 hover:tw-bg-indigo-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-xl tw-text-xs tw-font-bold tw-transition-colors" 
                          onClick={() => handlePayInvoice(proj.id)}
                          disabled={paymentLoading === proj.id}
                        >
                          <CreditCard size={12} />
                          {paymentLoading === proj.id ? 'Connecting to Stripe...' : 'Pay Invoice (Stripe)'}
                        </button>
                      )}

                      {proj.payment_status === 'paid' && proj.payment_id && (
                        <a 
                          href={`/api/payments/${proj.payment_id}/download_invoice/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tw-flex tw-items-center tw-gap-1.5 tw-bg-[#0D1324] hover:tw-bg-white/5 tw-text-white tw-px-4 tw-py-2 tw-rounded-xl tw-text-xs tw-font-bold tw-border tw-border-white/10 tw-no-underline tw-transition-colors"
                        >
                          <Download size={12} />
                          Invoice PDF
                        </a>
                      )}

                      {proj.status === 'completed' && (
                        <button 
                          className="tw-flex tw-items-center tw-gap-1.5 tw-bg-purple-600 hover:tw-bg-purple-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-xl tw-text-xs tw-font-bold tw-transition-colors" 
                          onClick={() => onOpenReview(proj)}
                        >
                          <Star size={12} />
                          Review Project
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div className="tw-bg-[#131C31]/50 tw-border tw-border-white/10 tw-rounded-[18px] tw-p-10 tw-text-center tw-text-gray-500">
                <Folder size={32} className="tw-mx-auto tw-mb-3" />
                <p className="tw-text-xs">No project requests found. Start by requesting a customized workspace project.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Alerts Drawer */}
        <div className="tw-space-y-6">
          <div className="tw-flex tw-justify-between tw-items-center">
            <h2 className="tw-text-lg tw-font-bold tw-text-white tw-flex tw-items-center tw-gap-2.5">
              <Bell size={18} className="tw-text-purple-400" />
              Alerts
            </h2>
            {recentNotifications && recentNotifications.some(n => !n.is_read) && (
              <button 
                onClick={handleMarkNotifications} 
                className="tw-bg-transparent tw-border-none tw-text-xs tw-font-bold tw-text-indigo-400 hover:tw-underline tw-cursor-pointer"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="tw-space-y-4">
            {recentNotifications && recentNotifications.length > 0 ? (
              recentNotifications.map(notif => (
                <div 
                  key={notif.id} 
                  className={`tw-border tw-rounded-xl tw-p-4 tw-text-xs tw-space-y-1.5 tw-transition-colors ${
                    notif.is_read 
                      ? 'tw-bg-[#131C31]/30 tw-border-white/5' 
                      : 'tw-bg-indigo-600/10 tw-border-indigo-500/30'
                  }`}
                >
                  <div className="tw-flex tw-justify-between">
                    <strong className="tw-text-white">{notif.title}</strong>
                    <span className="tw-text-[10px] tw-text-gray-500">
                      {new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="tw-text-gray-400 tw-leading-relaxed">{notif.message}</p>
                </div>
              ))
            ) : (
              <div className="tw-bg-[#131C31]/50 tw-border tw-border-white/10 tw-rounded-[18px] tw-p-8 tw-text-center tw-text-gray-500">
                <Bell size={24} className="tw-mx-auto tw-mb-2" />
                <p className="tw-text-xs">No recent alerts.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ClientDashboard;
