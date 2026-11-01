import React from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiDownload, FiCheckCircle } from 'react-icons/fi';

export default function Reports() {
  const reportsList = [
    { title: 'Global Biodiversity Risk & RLI Synthesized Whitepaper', type: 'Synthesis', size: '2.4 MB', date: 'October 2026' },
    { title: 'Random Forest Regression Model Validation & SHAP Diagnostics', type: 'Technical ML', size: '4.1 MB', date: 'September 2026' },
    { title: 'Five-Indicator Longitudinal Sensitivity Audit (2001-2019)', type: 'Indicators', size: '1.8 MB', date: 'August 2026' },
    { title: 'Jurisdiction Registry Assessment: 30 Monitored Nations', type: 'Country Profile', size: '3.2 MB', date: 'July 2026' },
  ];

  const handleDownload = (title) => {
    alert(`Downloading verified intelligence dossier: ${title}`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="section-header">
        <div>
          <h2>Intelligence & Research Reports</h2>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>
            Downloadable analytical briefings and verified machine learning diagnostic dossiers
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {reportsList.map((r, i) => (
          <div key={i} className="bio-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <FiFileText /> {r.type} Dossier
              </div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>{r.title}</h4>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Compiled: {r.date} | Archive Size: {r.size}
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--emerald)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <FiCheckCircle /> Verified Provenance
              </span>
              <button 
                className="btn-outline-emerald" 
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                onClick={() => handleDownload(r.title)}
              >
                <FiDownload style={{ marginRight: '4px' }} /> Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
