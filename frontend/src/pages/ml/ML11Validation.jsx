import React from 'react';
import { BEST_MODEL_METRICS } from '../../utils/staticData';

export default function ML11Validation() {
  return (
    <div className="bio-card">
      <h3>ML.11 Model Validation & Scientific Limitations</h3>
      <p style={{ color: 'var(--text-secondary)' }}>
        10-fold cross validation yields a solid mean score of 0.950 ± 0.040, demonstrating resilience against data leakage.
      </p>

      <div className="bio-card" style={{ background: 'var(--bg-tertiary)', margin: '1.5rem 0' }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>10-Fold CV Validation Folds:</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>
          {BEST_MODEL_METRICS.cv10_scores.map((score, i) => (
            <span key={i} style={{ background: 'var(--bg-secondary)', padding: '4px 8px', borderRadius: '4px' }}>
              Fold {i+1}: {score.toFixed(3)}
            </span>
          ))}
        </div>
      </div>

      <div className="disclaimer-box">
        <strong>Identified Methodological Limitations:</strong>
        <ul style={{ margin: '6px 0 0 0', paddingLeft: '1.25rem', fontSize: '0.8rem' }}>
          <li>Jurisdictional scope limited to 30 monitored nations. Extrapolating beyond these biomes requires transfer re-calibration.</li>
          <li>Aggregate country-level index must not be interpreted as local species population density.</li>
        </ul>
      </div>
    </div>
  );
}
