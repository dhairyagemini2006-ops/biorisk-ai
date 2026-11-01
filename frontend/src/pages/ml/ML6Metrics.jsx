import React from 'react';
import { BEST_MODEL_METRICS } from '../../utils/staticData';

export default function ML6Metrics() {
  return (
    <div className="bio-card">
      <h3>ML.6 Core Evaluation Metrics: R², MAE, MSE & RMSE</h3>
      <p style={{ color: 'var(--text-secondary)' }}>
        Detailed error dissection for the selected Tuned Random Forest regressor.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', margin: '1.5rem 0' }}>
        <div className="bio-card" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>COEFFICIENT OF DETERMINATION (R²)</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--emerald)' }}>{BEST_MODEL_METRICS.r2.toFixed(6)}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>97.8% of variance in national RLI explained by the 5 features.</div>
        </div>

        <div className="bio-card" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>MEAN ABSOLUTE ERROR (MAE)</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--cyan)' }}>{BEST_MODEL_METRICS.mae.toFixed(6)}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Average deviation of &lt; 0.009 on a 0.0 to 1.0 RLI scale.</div>
        </div>

        <div className="bio-card" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ROOT MEAN SQUARED ERROR (RMSE)</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--amber)' }}>{BEST_MODEL_METRICS.rmse.toFixed(6)}</div>
        </div>

        <div className="bio-card" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>MEAN SQUARED ERROR (MSE)</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{BEST_MODEL_METRICS.mse.toFixed(6)}</div>
        </div>
      </div>
    </div>
  );
}
