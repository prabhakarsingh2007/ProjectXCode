import React from 'react';

const Loader = ({ fullPage = false }) => {
  const loaderContent = (
    <div className="flex-center" style={{ flexDirection: 'column', gap: '16px', minHeight: fullPage ? '70vh' : '200px' }}>
      <div className="spinner"></div>
      <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.95rem', letterSpacing: '0.05em' }}>LOADING...</p>
    </div>
  );

  if (fullPage) {
    return <div className="container" style={{ animation: 'fadeIn var(--transition-fast)' }}>{loaderContent}</div>;
  }

  return loaderContent;
};

export default Loader;
