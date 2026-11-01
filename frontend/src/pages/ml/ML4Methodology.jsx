import React from 'react';
import { BEST_MODEL_METRICS } from '../../utils/staticData';

export default function ML4Methodology() {
  return (
    <div className="bio-card">
      <h3>ML.4 Machine Learning Methodology & Hyperparameter Tuning</h3>
      <p style={{ color: 'var(--text-secondary)' }}>
        A rigorous 80/20 train/test partition (1,368 training rows, 342 test rows, random_state=42) was evaluated using scikit-learn's GridSearchCV with 5-fold cross-validation.
      </p>

      <div className="bio-card" style={{ background: 'var(--bg-tertiary)', margin: '1rem 0' }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>GridSearch Optimized Parameters</h4>
        <pre style={{ margin: 0, fontSize: '0.85rem', color: 'var(--emerald)' }}>
{JSON.stringify(BEST_MODEL_METRICS.hyperparams, null, 2)}
        </pre>
      </div>
    </div>
  );
}
