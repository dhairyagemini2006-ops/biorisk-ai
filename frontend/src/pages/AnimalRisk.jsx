import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiSliders, FiCpu, FiTrendingDown, FiCheckCircle } from 'react-icons/fi';
import RLIGauge from '../components/shared/RLIGauge';
import { usePrediction } from '../hooks/usePrediction';
import { COUNTRIES_DATA, FEATURE_IMPORTANCES, BEST_MODEL_METRICS } from '../utils/staticData';
import useAppStore from '../store/appStore';

export default function AnimalRisk() {
  const { predictionHistory } = useAppStore();
  const { predict, result, loading, error } = usePrediction();

  // Inputs mapped to the 5 trained model features
  const [countryName, setCountryName] = useState('Ireland');
  const [marineProtected, setMarineProtected] = useState(10.5);
  const [terrestrialProtected, setTerrestrialProtected] = useState(19.9);
  const [forestArea, setForestArea] = useState(6500);
  const [co2, setCo2] = useState(44000);
  const [totalVulnerableSpecies, setTotalVulnerableSpecies] = useState(8488);

  const handlePredict = async (e) => {
    e.preventDefault();
    await predict({
      marine_protected: marineProtected,
      terrestrial_protected: terrestrialProtected,
      forest_area: forestArea,
      co2: co2,
      total_vulnerable_species: totalVulnerableSpecies,
      country_name: countryName,
      year: 2026,
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="section-header">
        <div>
          <h2>Animal Risk Prediction Engine</h2>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>
            Empirical country-level Red List Index (RLI) prediction using the 5-feature trained Random Forest model
          </p>
        </div>
      </div>

      {/* MANDATORY RESEARCH & RISK DISCLAIMER */}
      <div className="disclaimer-box" style={{ marginBottom: '1.5rem', borderColor: 'var(--amber)' }}>
        <FiAlertTriangle className="disclaimer-icon" style={{ fontSize: '1.5rem' }} />
        <div>
          <strong style={{ color: 'var(--amber)', fontSize: '0.95rem' }}>CRITICAL SCIENTIFIC METHODOLOGY DISTINCTION:</strong>
          <div style={{ marginTop: '4px', fontSize: '0.85rem' }}>
            This model predicts <strong>macro country-level Red List Index (RLI)</strong> from five observed national environmental parameters. In strict compliance with biological science standards, <strong>this country-level RLI must never be interpreted as an individual animal's survival probability or species-specific risk score</strong>. Species-level predictive models remain intentionally disabled until species-specific population viability datasets are statistically validated.
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Prediction Parameter Form */}
        <div className="bio-card">
          <div className="section-title" style={{ marginBottom: '1.25rem' }}>
            <FiSliders /> Environmental Predictor Inputs
          </div>

          <form onSubmit={handlePredict}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Target Jurisdiction / Country Context</label>
              <select 
                className="bio-select" 
                value={countryName} 
                onChange={e => setCountryName(e.target.value)}
              >
                {COUNTRIES_DATA.map(c => (
                  <option key={c.country} value={c.country}>{c.flag} {c.country}</option>
                ))}
              </select>
            </div>

            {/* Feature 1: Marine Protected */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span>1. Ocean Protected (% of EEZ)</span>
                <strong style={{ color: 'var(--cyan)' }}>{marineProtected}%</strong>
              </div>
              <input 
                type="range" 
                min="0" 
                max="60" 
                step="0.1" 
                className="bio-range"
                value={marineProtected} 
                onChange={e => setMarineProtected(parseFloat(e.target.value))}
              />
            </div>

            {/* Feature 2: Terrestrial Protected */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span>2. Land Protected (% of land)</span>
                <strong style={{ color: 'var(--emerald)' }}>{terrestrialProtected}%</strong>
              </div>
              <input 
                type="range" 
                min="0" 
                max="50" 
                step="0.1" 
                className="bio-range"
                value={terrestrialProtected} 
                onChange={e => setTerrestrialProtected(parseFloat(e.target.value))}
              />
            </div>

            {/* Feature 3: Forest Area */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span>3. Forest Cover (km²)</span>
                <strong style={{ color: 'var(--emerald)' }}>{forestArea.toLocaleString()} km²</strong>
              </div>
              <input 
                type="range" 
                min="500" 
                max="5000000" 
                step="500" 
                className="bio-range"
                value={forestArea} 
                onChange={e => setForestArea(parseFloat(e.target.value))}
              />
            </div>

            {/* Feature 4: CO2 */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span>4. Carbon Emissions (kt)</span>
                <strong style={{ color: 'var(--amber)' }}>{co2.toLocaleString()} kt</strong>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="1000000" 
                step="1000" 
                className="bio-range"
                value={co2} 
                onChange={e => setCo2(parseFloat(e.target.value))}
              />
            </div>

            {/* Feature 5: Total Vulnerable Species */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span>5. Species at Risk (Taxa Count)</span>
                <strong style={{ color: 'var(--purple)' }}>{totalVulnerableSpecies.toLocaleString()}</strong>
              </div>
              <input 
                type="range" 
                min="50" 
                max="200000" 
                step="100" 
                className="bio-range"
                value={totalVulnerableSpecies} 
                onChange={e => setTotalVulnerableSpecies(parseFloat(e.target.value))}
              />
            </div>

            <button 
              type="submit" 
              className="btn-emerald" 
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}
              disabled={loading}
            >
              {loading ? 'Executing Tuned Random Forest Inference...' : 'Calculate Predicted Country Biodiversity Health'}
            </button>
          </form>
        </div>

        {/* Prediction Results Display */}
        <div className="bio-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="section-title" style={{ marginBottom: '1.25rem' }}>
              <FiCpu /> Inference Output & Model Telemetry
            </div>

            {result ? (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <RLIGauge value={result.predicted_rli} size={150} strokeWidth={12} />
                
                <div style={{ marginTop: '1rem' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                    Predicted Biodiversity Health (RLI): {result.predicted_rli.toFixed(3)}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Model: {result.model_version} (Trained R² = {BEST_MODEL_METRICS.r2.toFixed(4)})
                  </div>
                </div>

                {result.warning && (
                  <div className="disclaimer-box" style={{ marginTop: '1rem', textAlign: 'left', fontSize: '0.75rem' }}>
                    {result.warning}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                <FiSliders style={{ fontSize: '3rem', opacity: 0.4, marginBottom: '1rem' }} />
                <div>Adjust the 5 predictor sliders and click <strong>Calculate Predicted Country RLI</strong> to execute model inference.</div>
              </div>
            )}
          </div>

          {/* Model Features Reference */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Feature Weights (Empirical RF Baseline)
            </div>
            {FEATURE_IMPORTANCES.map(f => (
              <div key={f.feature} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{f.label}</span>
                <span style={{ fontFamily: 'JetBrains Mono', color: 'var(--emerald)' }}>{(f.importance * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Historical Prediction Audit Log */}
      {predictionHistory && predictionHistory.length > 0 && (
        <div className="bio-card">
          <div className="section-title" style={{ marginBottom: '1rem' }}>
            Audit Log: Recent Inference Executions
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="bio-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Jurisdiction</th>
                  <th>Marine %</th>
                  <th>Terr %</th>
                  <th>Forest Area</th>
                  <th>CO₂</th>
                  <th>Vulnerable Taxa</th>
                  <th>Predicted RLI</th>
                </tr>
              </thead>
              <tbody>
                {predictionHistory.slice(0, 5).map(p => (
                  <tr key={p.id}>
                    <td>{new Date(p.timestamp).toLocaleTimeString()}</td>
                    <td>{p.country_name || 'Generic Profile'}</td>
                    <td>{p.inputs.marine_protected}%</td>
                    <td>{p.inputs.terrestrial_protected}%</td>
                    <td>{Number(p.inputs.forest_area).toLocaleString()}</td>
                    <td>{Number(p.inputs.co2).toLocaleString()}</td>
                    <td>{Number(p.inputs.total_vulnerable_species).toLocaleString()}</td>
                    <td><strong style={{ color: 'var(--emerald)' }}>{p.predicted_rli.toFixed(3)}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}
