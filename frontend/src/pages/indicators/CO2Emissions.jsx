import React from 'react';
import { motion } from 'framer-motion';

export default function CO2Emissions() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="bio-card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--amber)' }}>
        <h2>🏭 Carbon Dioxide (CO₂) Emissions Telemetry</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Annual carbon dioxide emissions generated from fossil fuels and industrial transformation processes in kilotons.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
          <div><strong>Metric Unit:</strong> Kilotons (kt)</div>
          <div><strong>Dataset Mean:</strong> 214,917 kt</div>
          <div><strong>Model Weight:</strong> 0.1845 (Rank 4)</div>
        </div>
      </div>
    </motion.div>
  );
}
