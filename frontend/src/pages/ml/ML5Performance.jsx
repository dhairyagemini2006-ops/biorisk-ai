import React from 'react';
import { MODEL_COMPARISON } from '../../utils/staticData';

export default function ML5Performance() {
  return (
    <div className="bio-card">
      <h3>ML.5 Model Performance & Multi-Algorithm Benchmarking</h3>
      <p style={{ color: 'var(--text-secondary)' }}>
        Empirical comparison across candidate regression algorithms executed on the test partition.
      </p>

      <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
        <table className="bio-table">
          <thead>
            <tr>
              <th>Model Architecture</th>
              <th>MAE</th>
              <th>RMSE</th>
              <th>R² Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {MODEL_COMPARISON.map(m => (
              <tr key={m.model}>
                <td><strong>{m.model}</strong></td>
                <td>{m.mae.toFixed(6)}</td>
                <td>{m.rmse.toFixed(6)}</td>
                <td><strong style={{ color: m.isBest ? 'var(--emerald)' : undefined }}>{m.r2.toFixed(6)}</strong></td>
                <td>{m.isBest ? <span style={{ color: 'var(--emerald)', fontWeight: 700 }}>★ Optimal Selection</span> : 'Evaluated'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
