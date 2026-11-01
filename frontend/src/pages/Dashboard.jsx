import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { FiGlobe, FiDatabase, FiCpu, FiActivity, FiArrowRight } from 'react-icons/fi';
import MetricCard from '../components/shared/MetricCard';
import RLIGauge from '../components/shared/RLIGauge';
import CountryFlag from '../components/shared/CountryFlag';
import { 
  DATASET_STATS, 
  BEST_MODEL_METRICS, 
  GLOBAL_RLI_TREND, 
  COUNTRIES_DATA 
} from '../utils/staticData';
import { useGlobalTrend, useCountries } from '../hooks/useDataset';
import useAppStore from '../store/appStore';

export default function Dashboard() {
  const navigate = useNavigate();
  const { setSelectedCountry } = useAppStore();
  const { data: globalTrend } = useGlobalTrend();
  const { data: countries } = useCountries();

  // Top 5 and Bottom 5 countries by RLI
  const sortedCountries = [...(countries || COUNTRIES_DATA)].sort((a, b) => (b.rli_2019 || b.mean_rli) - (a.rli_2019 || a.mean_rli));
  const top5 = sortedCountries.slice(0, 5);
  const bottom5 = sortedCountries.slice(-5).reverse();

  const handleCountryClick = (countryName) => {
    setSelectedCountry(countryName);
    navigate(`/countries/${encodeURIComponent(countryName)}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hero Banner */}
      <div 
        className="bio-card" 
        style={{ 
          marginBottom: '2rem', 
          background: 'linear-gradient(135deg, rgba(26, 71, 49, 0.4) 0%, rgba(31, 41, 55, 0.9) 100%)',
          borderColor: 'var(--emerald)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '20px', color: 'var(--emerald)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            <span>●</span> Live Biodiversity Platform Active
          </div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', fontWeight: 800 }}>
            BioRisk AI <span style={{ color: 'var(--emerald)' }}>Intelligence</span>
          </h1>
          <p style={{ maxWidth: '650px', fontSize: '0.95rem', margin: 0, color: 'var(--text-secondary)' }}>
            Empirical multi-country biodiversity telemetry and machine learning risk modeling. Built upon 1,710 verified country-year records, predicting Red List Index (RLI) trends across 30 nations.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-emerald" onClick={() => navigate('/risk')}>
            Run Risk Prediction
          </button>
          <button className="btn-outline-emerald" onClick={() => navigate('/animals')}>
            Launch Scanner
          </button>
          <button className="btn-ghost" onClick={() => navigate('/ml')}>
            Inspect ML Lab
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <MetricCard
          title="Monitored Countries"
          value={DATASET_STATS.countries}
          subtitle="OECD & Partner Nations"
          icon={<FiGlobe />}
          color="emerald"
        />
        <MetricCard
          title="Verified Dataset Rows"
          value={DATASET_STATS.total_rows.toLocaleString()}
          subtitle="Temporal range 2001 - 2019"
          icon={<FiDatabase />}
          color="cyan"
        />
        <MetricCard
          title="Primary ML Predictor R²"
          value={BEST_MODEL_METRICS.r2.toFixed(4)}
          subtitle="Tuned Random Forest Regressor"
          icon={<FiCpu />}
          color="purple"
        />
        <MetricCard
          title="Global Biodiversity Health"
          value={DATASET_STATS.rli.mean.toFixed(3)}
          subtitle="Mean Index (Range 0.582 - 0.993)"
          icon={<FiActivity />}
          color="amber"
        />
      </div>

      {/* Main Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Global RLI Trajectory */}
        <div className="bio-card">
          <div className="section-header">
            <div>
              <div className="section-title">Global Biodiversity Health (RLI) Trajectory</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Aggregate World Red List Index benchmark (2001–2019)</div>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--crimson)', fontWeight: 600 }}>-6.3% Over 19 Years</span>
          </div>

          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={globalTrend || GLOBAL_RLI_TREND} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.5} />
                <XAxis dataKey="year" stroke="var(--text-muted)" fontSize={12} />
                <YAxis domain={[0.72, 0.81]} stroke="var(--text-muted)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                  formatter={(val) => [val.toFixed(3), 'Global RLI']}
                />
                <Line 
                  type="monotone" 
                  dataKey="rli" 
                  stroke="var(--emerald)" 
                  strokeWidth={3} 
                  dot={{ r: 3, fill: 'var(--emerald)' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Highest vs Lowest RLI Countries */}
        <div className="bio-card">
          <div className="section-header">
            <div>
              <div className="section-title">Biodiversity Health Dispersion</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Top 5 vs Bottom 5 Country RLI (2019)</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--emerald)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Highest Biodiversity Health</div>
              {top5.map((c) => (
                <div 
                  key={c.country} 
                  onClick={() => handleCountryClick(c.country)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 0.6rem', borderRadius: '6px', cursor: 'pointer', marginBottom: '4px' }}
                  className="country-list-item"
                >
                  <CountryFlag country={c.country} />
                  <span style={{ fontWeight: 700, color: 'var(--emerald)' }}>{(c.rli_2019 || c.mean_rli).toFixed(3)}</span>
                </div>
              ))}
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--amber)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Lowest Biodiversity Health</div>
              {bottom5.map((c) => (
                <div 
                  key={c.country} 
                  onClick={() => handleCountryClick(c.country)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 0.6rem', borderRadius: '6px', cursor: 'pointer', marginBottom: '4px' }}
                  className="country-list-item"
                >
                  <CountryFlag country={c.country} />
                  <span style={{ fontWeight: 700, color: 'var(--amber)' }}>{(c.rli_2019 || c.mean_rli).toFixed(3)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Coverage Table */}
      <div className="bio-card">
        <div className="section-header">
          <div>
            <div className="section-title">Core Dataset Country Registry</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Empirical OECD/UN-vetted country time series in master combined file</div>
          </div>
          <button className="btn-ghost" onClick={() => navigate('/countries')}>
            View All 30 Profiles <FiArrowRight style={{ marginLeft: '4px' }} />
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="bio-table">
            <thead>
              <tr>
                <th>Country</th>
                <th>Time Horizon</th>
                <th>Status</th>
                <th>Biodiversity Health (RLI)</th>
                <th>Model Coverage</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedCountries.slice(0, 8).map((c) => (
                <tr key={c.country}>
                  <td>
                    <CountryFlag country={c.country} showCode />
                  </td>
                  <td>2001 – 2019 (19 Yrs)</td>
                  <td>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--emerald)', marginRight: '6px' }} />
                    Complete
                  </td>
                  <td>
                    <strong style={{ color: (c.rli_2019 || c.mean_rli) > 0.85 ? 'var(--emerald)' : 'var(--amber)' }}>
                      {(c.rli_2019 || c.mean_rli).toFixed(3)}
                    </strong>
                  </td>
                  <td>5 / 5 Indicators Active</td>
                  <td>
                    <button 
                      className="btn-ghost" 
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                      onClick={() => handleCountryClick(c.country)}
                    >
                      Inspect Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
