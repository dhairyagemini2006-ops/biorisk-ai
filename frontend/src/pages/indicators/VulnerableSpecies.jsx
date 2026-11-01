import React from 'react';
import { motion } from 'framer-motion';

export default function VulnerableSpecies() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="bio-card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--purple)' }}>
        <h2>🦎 Total Assessed Vulnerable Taxa (Weight: 25.7%)</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Aggregated counts of all national species assessed as Vulnerable, Endangered, or Critically Endangered by the IUCN.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
          <div><strong>Metric Unit:</strong> Taxa Count</div>
          <div><strong>Model Weight:</strong> 0.2574 (Rank 2)</div>
          <div><strong>Dataset Mean:</strong> 41,995 Taxa</div>
        </div>
      </div>
    </motion.div>
  );
}
