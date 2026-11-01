import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCpu, FiCheckCircle, FiFileText } from 'react-icons/fi';
import { BEST_MODEL_METRICS } from '../../utils/staticData';

export default function MLLaboratory() {
  const location = useLocation();

  const chapters = [
    { path: '/ml/overview', num: 'ML.1', label: 'Research Overview' },
    { path: '/ml/dataset', num: 'ML.2', label: 'Dataset & Features' },
    { path: '/ml/eda', num: 'ML.3', label: 'Exploratory Analysis' },
    { path: '/ml/methodology', num: 'ML.4', label: 'Model Methodology' },
    { path: '/ml/performance', num: 'ML.5', label: 'Model Benchmarking' },
    { path: '/ml/metrics', num: 'ML.6', label: 'R², MAE, MSE & RMSE' },
    { path: '/ml/shap', num: 'ML.7', label: 'SHAP Explainability' },
    { path: '/ml/features', num: 'ML.8', label: 'Feature Importance' },
    { path: '/ml/actual-predicted', num: 'ML.9', label: 'Actual vs. Predicted' },
    { path: '/ml/residuals', num: 'ML.10', label: 'Residual Diagnostics' },
    { path: '/ml/validation', num: 'ML.11', label: 'Validation & Limits' },
    { path: '/ml/findings', num: 'ML.12', label: 'Findings & Code' },
  ];

  return (
    <div className="ml-lab-container">
      {/* ML Header */}
      <div className="section-header" style={{ marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '0.25rem' }}>Machine Learning Research Laboratory</h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Empirical scientific validation, SHAP explainability, and multi-model benchmarking on 1,710 verified country-year records
          </p>
        </div>
        <div className="ml-status-badge">
          <FiCpu style={{ color: 'var(--emerald)' }} />
          <span>Tuned Random Forest Regressor (R² = {BEST_MODEL_METRICS.r2.toFixed(3)})</span>
        </div>
      </div>

      {/* Two-Column Spacious Layout: Left Sticky Secondary Navigation, Right Large Content */}
      <div className="ml-workspace-layout">
        
        {/* Left Secondary Chapter Panel */}
        <aside className="ml-chapter-sidebar">
          <div className="ml-chapter-card">
            <div className="ml-chapter-header">
              <span>Research Chapters</span>
              <span className="chapter-count">12 Modules</span>
            </div>
            
            <nav className="ml-chapter-nav-list">
              {chapters.map(c => (
                <NavLink
                  key={c.path}
                  to={c.path}
                  className={({ isActive }) => `ml-chapter-link ${isActive ? 'active' : ''}`}
                >
                  <span className="chapter-badge">{c.num}</span>
                  <span className="chapter-title">{c.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="ml-main-content-area">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
