import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { INDICATOR_DEFINITIONS } from '../utils/staticData';

export default function BiodiversityExplorer() {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="section-header">
        <div>
          <h2>Biodiversity Explorer</h2>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>
            Comprehensive overview across core macro-environmental predictors and biodiversity indices
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {Object.values(INDICATOR_DEFINITIONS).map(ind => (
          <div key={ind.key} className="bio-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{ind.icon}</div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{ind.label}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{ind.description}</p>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <strong>Unit:</strong> {ind.unit} | <strong>Source:</strong> {ind.source}
              </div>
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <button 
                className="btn-outline-emerald" 
                style={{ width: '100%', fontSize: '0.8rem', padding: '0.4rem' }}
                onClick={() => navigate('/indicators')}
              >
                Inspect Indicator Time Series
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
