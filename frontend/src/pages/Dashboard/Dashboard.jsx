import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { projectApi } from '../../api/projectApi';
import Loader from '../../components/Loader/Loader';
import ClientDashboard from './ClientDashboard';
import AdminDashboard from './AdminDashboard';
import ReviewModal from '../../components/ReviewModal/ReviewModal';
import { RefreshCw } from 'lucide-react';
import api from '../../api/axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(null);
  const [statusLoading, setStatusLoading] = useState(null);
  
  // Review Modal States
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

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
    // Redirection gate if user is not logged in
    if (!user) {
      navigate('/login');
    } else {
      fetchStats();
    }
  }, [user, navigate]);

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

  const handleOpenReview = (project) => {
    setSelectedProject(project);
    setIsReviewOpen(true);
  };

  const handleSubmitReview = async (reviewData) => {
    // POST request to testimonials endpoint
    await api.post('/testimonials/', reviewData);
  };

  if (loading || !user || !data) {
    return <Loader fullPage />;
  }

  const isClient = data.role === 'client';

  return (
    <div className="container" style={{ padding: '40px 24px', minHeight: '80vh', animation: 'fadeIn var(--transition-normal)' }}>
      {/* Welcome Header */}
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

      {/* Render matching dashboard subcomponent based on role */}
      {isClient ? (
        <ClientDashboard 
          stats={data.stats}
          recentProjects={data.recentProjects}
          recentNotifications={data.recentNotifications}
          paymentLoading={paymentLoading}
          handlePayInvoice={handlePayInvoice}
          handleMarkNotifications={handleMarkNotifications}
          onOpenReview={handleOpenReview}
        />
      ) : (
        <AdminDashboard 
          stats={data.stats}
          recentProjects={data.recentProjects}
          recentEnquiries={data.recentEnquiries}
          statusLoading={statusLoading}
          handleStatusChange={handleStatusChange}
        />
      )}

      {/* Leave Review Dialog Overlay Modal */}
      <ReviewModal 
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onSubmit={handleSubmitReview}
        projectName={selectedProject?.title}
      />
    </div>
  );
};

export default Dashboard;
