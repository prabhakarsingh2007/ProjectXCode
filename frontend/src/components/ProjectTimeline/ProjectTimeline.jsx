import React from 'react';
import { Check, Clock, Play, Award } from 'lucide-react';

const ProjectTimeline = ({ status, paymentStatus }) => {
  // Determine current active step index (0 to 3)
  let currentStep = 0;
  if (status === 'completed') {
    currentStep = 3;
  } else if (status === 'in_progress') {
    currentStep = 2;
  } else if (paymentStatus === 'unpaid') {
    currentStep = 1; // Awaiting Review or Invoice payment
  } else {
    currentStep = 0; // Just submitted
  }

  const steps = [
    { label: 'Scope Submitted', desc: 'Project request received', icon: Clock },
    { label: 'Invoiced / Review', desc: 'Awaiting client payment', icon: Clock },
    { label: 'Active Pipeline', desc: 'Workspace is in progress', icon: Play },
    { label: 'Project Delivered', desc: 'Ready for client review', icon: Award },
  ];

  return (
    <div style={{ padding: '16px 0 24px', width: '100%' }}>
      {/* Visual Line and Circles */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', marginBottom: '12px' }}>
        
        {/* Track Line */}
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '20px', 
          right: '20px', 
          height: '2px', 
          background: 'hsl(var(--border))', 
          transform: 'translateY(-50%)',
          zIndex: 1
        }}>
          {/* Active Highlight Line */}
          <div style={{ 
            height: '100%', 
            width: `${(currentStep / (steps.length - 1)) * 100}%`, 
            background: 'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)', 
            transition: 'width 0.4s ease'
          }}></div>
        </div>

        {/* Steps Nodes */}
        {steps.map((step, idx) => {
          const isActive = idx <= currentStep;
          const isCurrent = idx === currentStep;
          const StepIcon = step.icon;

          return (
            <div key={idx} style={{ 
              zIndex: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              width: '80px',
              textAlign: 'center'
            }}>
              {/* Circle Bubble */}
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                background: isCurrent 
                  ? 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)' 
                  : isActive 
                    ? 'hsl(var(--primary))' 
                    : 'hsl(var(--bg-surface))',
                border: `2px solid ${isActive ? 'transparent' : 'hsl(var(--border))'}`,
                color: isActive ? '#fff' : 'hsl(var(--text-muted))',
                boxShadow: isCurrent ? 'var(--shadow-glow)' : 'none'
              }}>
                {idx < currentStep ? (
                  <Check size={14} strokeWidth={3} />
                ) : (
                  <StepIcon size={14} />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Steps Descriptions Grid */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px' }}>
        {steps.map((step, idx) => {
          const isActive = idx <= currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div key={idx} style={{ width: '100px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ 
                fontSize: '0.8rem', 
                fontWeight: isCurrent || isActive ? '600' : '500', 
                color: isCurrent 
                  ? 'hsl(var(--secondary))' 
                  : isActive 
                    ? 'hsl(var(--text-primary))' 
                    : 'hsl(var(--text-muted))',
                display: 'block'
              }}>
                {step.label}
              </span>
              <span style={{ fontSize: '0.65rem', color: 'hsl(var(--text-muted))', display: 'block', lineHeight: '1.2' }}>
                {step.desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectTimeline;
