import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { INDICATOR_DEFINITIONS } from '../utils/staticData';

export default function FiveIndicators() {
  const navigate = useNavigate();
  const location = useLocation();

  const isRoot = location.pathname === '/indicators' || location.pathname === '/indicators/';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="section-header">
        <div>
          <h2>Five Environmental Indicators Explorer</h2>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>
            Diagnostic deep dives into the five validated predictors driving the Red List Index model
          </p>
        </div>
      </div>

      {/* Indicator Switcher Bar */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '1.5rem', paddingBottom: '4px' }}>
        <button 
          className={`btn-ghost ${isRoot ? 'active' : ''}`}
          onClick={() => navigate('/indicators')}
          style={{ borderColor: isRoot ? 'var(--emerald)' : undefined, color: isRoot ? 'var(--emerald)' : undefined }}
        >
          All 5 Overview
        </button>
        <button 
          className="btn-ghost" 
          onClick={() => navigate('/indicators/marine')}
          style={{ borderColor: location.pathname.includes('/marine') ? 'var(--cyan)' : undefined }}
        >
          🌊 Ocean Protected
        </button>
        <button 
          className="btn-ghost" 
          onClick={() => navigate('/indicators/terrestrial')}
          style={{ borderColor: location.pathname.includes('/terrestrial') ? 'var(--emerald)' : undefined }}
        >
          🏔️ Land Protected
        </button>
        <button 
          className="btn-ghost" 
          onClick={() => navigate('/indicators/forest')}
          style={{ borderColor: location.pathname.includes('/forest') ? 'var(--emerald)' : undefined }}
        >
          🌲 Forest Cover
        </button>
        <button 
          className="btn-ghost" 
          onClick={() => navigate('/indicators/co2')}
          style={{ borderColor: location.pathname.includes('/co2') ? 'var(--amber)' : undefined }}
        >
          🏭 Carbon Emissions
        </button>
        <button 
          className="btn-ghost" 
          onClick={() => navigate('/indicators/vulnerable')}
          style={{ borderColor: location.pathname.includes('/vulnerable') ? 'var(--purple)' : undefined }}
        >
          🦎 Species at Risk
        </button>
      </div>

      {isRoot ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {Object.values(INDICATOR_DEFINITIONS).map(ind => (
            <div key={ind.key} className="bio-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{ind.icon}</span>
                <h3 style={{ margin: 0, fontSize: '1.15rem' }}>{ind.label}</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{ind.description}</p>
              <div style={{ background: 'var(--bg-tertiary)', padding: '0.6rem', borderRadius: '6px', fontSize: '0.75rem', marginBottom: '1rem' }}>
                <div><strong>Standard Unit:</strong> {ind.unit}</div>
                <div><strong>Scientific Provider:</strong> {ind.source}</div>
              </div>
              <button 
                className="btn-outline-emerald" 
                style={{ width: '100%', fontSize: '0.8rem', padding: '0.4rem' }}
                onClick={() => {
                  if (ind.key === 'Marine_Protected') navigate('/indicators/marine');
                  else if (ind.key === 'Terrestrial_Protected') navigate('/indicators/terrestrial');
                  else if (ind.key === 'Forest_Area') navigate('/indicators/forest');
                  else if (ind.key === 'CO2') navigate('/indicators/co2');
                  else navigate('/indicators/vulnerable');
                }}
              >
                Explore Full Indicator Profile
              </button>
            </div>
          ))}
        </div>
      ) : (
        <Outlet />
      )}
    </motion.div>
  );
}
