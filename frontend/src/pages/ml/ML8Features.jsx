import React from 'react';
import { FEATURE_IMPORTANCES } from '../../utils/staticData';

export default function ML8Features() {
  return (
    <div className="bio-card">
      <h3>ML.8 Feature Importance & Ecological Relationships</h3>
      <p style={{ color: 'var(--text-secondary)' }}>
        Gini-impurity importance analysis reveals Forest Area (29.4%) and Vulnerable Species Count (25.7%) as the dominant drivers.
      </p>

      <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
        <table className="bio-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Relative Importance</th>
              <th>Ecological Correlation Direction</th>
            </tr>
          </thead>
          <tbody>
            {FEATURE_IMPORTANCES.map(f => (
              <tr key={f.feature}>
                <td><strong>{f.label}</strong></td>
                <td><strong style={{ color: 'var(--emerald)' }}>{f.importance.toFixed(6)}</strong></td>
                <td>{f.feature === 'CO2' || f.feature === 'Total_Vulnerable_Species' ? 'Inverse (Pressure Vector)' : 'Direct (Resilience Vector)'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
