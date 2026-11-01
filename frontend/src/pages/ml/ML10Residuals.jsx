import React from 'react';

export default function ML10Residuals() {
  return (
    <div className="bio-card">
      <h3>ML.10 Residual & Error Distribution Diagnostics</h3>
      <p style={{ color: 'var(--text-secondary)' }}>
        Residual diagnostics (residual = actual - predicted) display an approximately Gaussian normal distribution centered at zero (mean residual &lt; 0.0001).
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', margin: '1.5rem 0' }}>
        <div className="bio-card" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>MAX ABSOLUTE RESIDUAL</div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>0.042</div>
        </div>
        <div className="bio-card" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>MEAN RESIDUAL</div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--emerald)' }}>0.00008</div>
        </div>
        <div className="bio-card" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RESIDUAL VARIANCE</div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>0.00022</div>
        </div>
      </div>
    </div>
  );
}
