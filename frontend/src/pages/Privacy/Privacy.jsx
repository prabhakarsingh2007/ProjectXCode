import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="container" style={{ padding: '60px 24px', animation: 'fadeIn var(--transition-normal)', maxWidth: '800px' }}>
      <header className="page-header">
        <h1 className="page-title">Privacy <span className="text-gradient">Policy</span></h1>
        <p className="page-subtitle">
          Your privacy is core to our trust. Here is how we handle and protect your client data at ProjectXCode.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div className="card-glass" style={{ padding: '30px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          <div style={{ background: 'hsla(var(--primary), 0.1)', color: 'hsl(var(--primary))', padding: '12px', borderRadius: '10px', flexShrink: 0 }}>
            <Shield size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', fontFamily: 'var(--font-heading)' }}>1. Data Collection & Control</h3>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem', lineHeight: '1.7' }}>
              We collect information provided when registering your account, filing project requests, or executing invoice payments. This includes your contact details, company information, payment receipts, and uploaded project specification sheets.
            </p>
          </div>
        </div>

        <div className="card-glass" style={{ padding: '30px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          <div style={{ background: 'hsla(var(--secondary), 0.1)', color: 'hsl(var(--secondary))', padding: '12px', borderRadius: '10px', flexShrink: 0 }}>
            <Lock size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', fontFamily: 'var(--font-heading)' }}>2. Safe Token & Session Protections</h3>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem', lineHeight: '1.7' }}>
              All auth sessions are safeguarded via HttpOnly cookie-based JWT tokens. This keeps session details inaccessible to client scripts, protecting against XSS cross-site scripting threats.
            </p>
          </div>
        </div>

        <div className="card-glass" style={{ padding: '30px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          <div style={{ background: 'hsla(var(--accent), 0.1)', color: 'hsl(var(--accent))', padding: '12px', borderRadius: '10px', flexShrink: 0 }}>
            <Eye size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', fontFamily: 'var(--font-heading)' }}>3. Confidential Project Protections</h3>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem', lineHeight: '1.7' }}>
              Any project explicitly marked as "Confidential" during creation or request filing will never be showcased in our public gallery. All uploaded SRS files, layouts, and mockups are protected by strict access permissions and only accessible to authorized developers.
            </p>
          </div>
        </div>

        <div className="card-glass" style={{ padding: '30px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
          <div style={{ background: 'hsla(var(--primary), 0.1)', color: 'hsl(var(--primary))', padding: '12px', borderRadius: '10px', flexShrink: 0 }}>
            <FileText size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', fontFamily: 'var(--font-heading)' }}>4. Third-Party Integrations</h3>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem', lineHeight: '1.7' }}>
              We integrate secure third-party processors like Stripe for invoice transactions. No raw credit card or billing numbers are stored on our servers; they are processed directly through Stripe's certified API endpoints.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
