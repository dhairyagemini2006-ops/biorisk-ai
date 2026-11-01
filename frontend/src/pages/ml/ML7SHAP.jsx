import React from 'react';
import { FEATURE_IMPORTANCES } from '../../utils/staticData';

export default function ML7SHAP() {
  return (
    <div className="bio-card">
      <h3>ML.7 SHAP (SHapley Additive exPlanations) & Explainable AI</h3>
      <p style={{ color: 'var(--text-secondary)' }}>
        SHAP TreeExplainer decomposes each prediction into additive feature contributions, grounding model transparency in cooperative game theory.
      </p>

      <div style={{ margin: '1.5rem 0' }}>
        <h4 style={{ marginBottom: '1rem' }}>Global Feature Impact Ranking (Mean |SHAP Value|)</h4>
        {FEATURE_IMPORTANCES.map(f => (
          <div key={f.feature} style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
              <span>{f.label}</span>
              <strong style={{ color: 'var(--emerald)' }}>{(f.importance * 100).toFixed(1)}% Impact</strong>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${f.importance * 100}%`, height: '100%', background: 'var(--emerald)', borderRadius: '4px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
