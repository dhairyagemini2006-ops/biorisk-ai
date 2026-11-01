import React from 'react';

export default function ML12Findings() {
  return (
    <div className="bio-card">
      <h3>ML.12 Key Findings & Computational Reproducibility</h3>
      <p style={{ color: 'var(--text-secondary)' }}>
        Summary of conclusions derived from the BioRisk empirical modeling pipeline.
      </p>

      <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.8' }}>
        <li><strong>Forest Cover Preservation:</strong> The strongest macro-predictor for safeguarding Red List Index resilience (29.4% contribution).</li>
        <li><strong>Protected Area Complementarity:</strong> Both Marine and Terrestrial protected zones offer non-linear protective buffering.</li>
        <li><strong>Model Determinism:</strong> Executing <code>train_test_split(random_state=42)</code> and <code>RandomForestRegressor(random_state=42)</code> exactly reproduces R² = 0.977970.</li>
      </ul>
    </div>
  );
}
