import React from 'react';
import { motion } from 'framer-motion';

export default function ForestArea() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="bio-card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--emerald)' }}>
        <h2>🌲 Forest Area (Primary Predictor: 29.4% Model Weight)</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Total land area covered by forest canopies in square kilometers. Established by our Random Forest model as the single highest-importance predictor of Red List Index variations.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
          <div><strong>Metric Unit:</strong> km²</div>
          <div><strong>Model Weight:</strong> 0.2942 (Rank 1)</div>
          <div><strong>Source:</strong> FAO Global Forest Resources Assessment</div>
        </div>
      </div>

      <div className="bio-card">
        <div className="section-title" style={{ marginBottom: '1rem' }}>
          Deforestation & Canopy Telemetry
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Longitudinal tracking demonstrates an inverse correlation between rapid canopy reduction and regional species extinction velocity.
        </p>
      </div>
    </motion.div>
  );
}
