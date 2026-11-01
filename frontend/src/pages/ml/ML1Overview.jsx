import React from 'react';
import { BEST_MODEL_METRICS, DATASET_STATS } from '../../utils/staticData';

export default function ML1Overview() {
  return (
    <div className="bio-card">
      <h3>ML.1 Research Overview & Experimental Abstract</h3>
      <p style={{ color: 'var(--text-secondary)' }}>
        This scientific experiment evaluates whether macro-level national conservation and industrial parameters can accurately predict Red List Index (RLI) trends. The target variable is national RLI across 30 OECD and partner countries spanning 2001 to 2019.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', margin: '1.5rem 0' }}>
        <div className="bio-card" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PRIMARY ALGORITHM</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>Tuned Random Forest</div>
        </div>
        <div className="bio-card" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TEST SET R² SCORE</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--emerald)' }}>{BEST_MODEL_METRICS.r2.toFixed(4)}</div>
        </div>
        <div className="bio-card" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>MEAN ABSOLUTE ERROR</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--cyan)' }}>{BEST_MODEL_METRICS.mae.toFixed(6)}</div>
        </div>
        <div className="bio-card" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>10-FOLD CV MEAN</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{BEST_MODEL_METRICS.cv10_mean.toFixed(3)} ± {BEST_MODEL_METRICS.cv10_std.toFixed(3)}</div>
        </div>
      </div>

      <div className="info-box">
        All experiments documented in this laboratory are reproducible and deterministic, executed with seed random_state=42.
      </div>
    </div>
  );
}
