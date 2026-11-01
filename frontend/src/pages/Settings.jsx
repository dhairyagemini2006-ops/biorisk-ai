import React from 'react';
import { motion } from 'framer-motion';
import { FiSettings, FiSun, FiMoon, FiShield, FiSliders } from 'react-icons/fi';
import useAppStore from '../store/appStore';

export default function Settings() {
  const { theme, toggleTheme, presentationMode, togglePresentationMode } = useAppStore();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="section-header">
        <div>
          <h2>Platform Settings & Display Calibration</h2>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>
            System configurations, API endpoint routing, and demonstration preferences
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '700px' }}>
        <div className="bio-card" style={{ marginBottom: '1.5rem' }}>
          <div className="section-title" style={{ marginBottom: '1.25rem' }}>
            <FiSun /> Display & Visual Theme
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <strong>Color Theme Mode</strong>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Toggle between Deep Charcoal/Emerald Dark mode and Ivory Light mode</div>
            </div>
            <button className="btn-emerald" onClick={toggleTheme} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {theme === 'dark' ? <><FiSun /> Switch to Light</> : <><FiMoon /> Switch to Dark</>}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0' }}>
            <div>
              <strong>Presentation & Demonstration Mode</strong>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hides navigation chrome for clean stage presentations and white-paper screenshots</div>
            </div>
            <button 
              className={presentationMode ? 'btn-emerald' : 'btn-ghost'} 
              onClick={togglePresentationMode}
            >
              {presentationMode ? 'Active (Press Esc or Click to Exit)' : 'Enable Presentation Mode'}
            </button>
          </div>
        </div>

        <div className="bio-card">
          <div className="section-title" style={{ marginBottom: '1.25rem' }}>
            <FiShield /> API & ML Runtime Endpoints
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            FastAPI Inference Backend: <code>http://localhost:8000/api</code>
          </div>
          <div className="info-box">
            When the local Python FastAPI service is active, queries are streamed live to the scikit-learn model runtime. In standalone client mode, high-fidelity local inference fallbacks ensure seamless demonstration.
          </div>
        </div>
      </div>
    </motion.div>
  );
}
