import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis 
} from 'recharts';
import { FiBarChart2, FiArrowRight } from 'react-icons/fi';
import CountryFlag from '../components/shared/CountryFlag';
import RLIGauge from '../components/shared/RLIGauge';
import { COUNTRIES_DATA } from '../utils/staticData';
import useAppStore from '../store/appStore';

export default function CountryComparison() {
  const { comparisonCountryA, comparisonCountryB, setComparisonCountryA, setComparisonCountryB, selectedYear } = useAppStore();

  const countryA = COUNTRIES_DATA.find(c => c.country === comparisonCountryA) || COUNTRIES_DATA[10]; // France
  const countryB = COUNTRIES_DATA.find(c => c.country === comparisonCountryB) || COUNTRIES_DATA[11]; // Germany

  // Radar comparison indicators normalized 0-100 using real country properties
  const radarData = [
    { indicator: 'Biodiversity Health', A: +(countryA.mean_rli * 100).toFixed(1), B: +(countryB.mean_rli * 100).toFixed(1) },
    { indicator: 'Ocean Protected', A: Math.min(100, +((countryA.marine || 15) * 2).toFixed(1)), B: Math.min(100, +((countryB.marine || 15) * 2).toFixed(1)) },
    { indicator: 'Land Protected', A: Math.min(100, +((countryA.terrestrial || 15) * 2.5).toFixed(1)), B: Math.min(100, +((countryB.terrestrial || 15) * 2.5).toFixed(1)) },
    { indicator: 'Forest Cover', A: countryA.forest ? Math.min(100, +(Math.log10(countryA.forest) * 16).toFixed(1)) : 50, B: countryB.forest ? Math.min(100, +(Math.log10(countryB.forest) * 16).toFixed(1)) : 50 },
    { indicator: 'Carbon Emissions', A: countryA.co2 ? Math.min(100, +(countryA.co2 / 10000).toFixed(1)) : 50, B: countryB.co2 ? Math.min(100, +(countryB.co2 / 10000).toFixed(1)) : 50 },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="section-header">
        <div>
          <h2>Country-to-Country Comparison Workspace</h2>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>
            Bilateral environmental diagnostic and Biodiversity Health (RLI) comparative analysis
          </p>
        </div>
      </div>

      {/* Selectors */}
      <div className="bio-card" style={{ marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'center' }}>
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>PRIMARY COUNTRY (A)</label>
          <select 
            className="bio-select"
            value={comparisonCountryA}
            onChange={e => setComparisonCountryA(e.target.value)}
          >
            {COUNTRIES_DATA.map(c => (
              <option key={c.country} value={c.country}>{c.flag} {c.country}</option>
            ))}
          </select>
        </div>

        <div style={{ fontWeight: 800, color: 'var(--text-muted)', fontSize: '1.25rem', padding: '0 0.5rem' }}>
          VS
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>COMPARISON COUNTRY (B)</label>
          <select 
            className="bio-select"
            value={comparisonCountryB}
            onChange={e => setComparisonCountryB(e.target.value)}
          >
            {COUNTRIES_DATA.map(c => (
              <option key={c.country} value={c.country}>{c.flag} {c.country}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-side Top Comparison Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="bio-card" style={{ borderLeft: '4px solid var(--emerald)', minHeight: '120px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ margin: 0 }}>{countryA.flag} {countryA.country}</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ISO: {countryA.code}</span>
            </div>
            <RLIGauge value={countryA.mean_rli} size={80} strokeWidth={8} />
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.2 }}>
            Biodiversity Health (RLI): <strong className="text-emerald">{countryA.mean_rli.toFixed(3)}</strong>
          </div>
        </div>

        <div className="bio-card" style={{ borderLeft: '4px solid var(--cyan)', minHeight: '120px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ margin: 0 }}>{countryB.flag} {countryB.country}</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ISO: {countryB.code}</span>
            </div>
            <RLIGauge value={countryB.mean_rli} size={80} strokeWidth={8} />
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.2 }}>
            Biodiversity Health (RLI): <strong className="text-cyan">{countryB.mean_rli.toFixed(3)}</strong>
          </div>
        </div>
      </div>

      {/* Multi-Dimensional Radar Chart Comparison */}
      <div className="bio-card" style={{ marginBottom: '1.5rem' }}>
        <div className="section-title" style={{ marginBottom: '1rem' }}>
          Normalized Environmental Resilience Vectors
        </div>
        <div style={{ height: '320px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="var(--border-color)" />
              <PolarAngleAxis dataKey="indicator" stroke="var(--text-secondary)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} />
              <Radar name={countryA.country} dataKey="A" stroke="var(--emerald)" fill="var(--emerald)" fillOpacity={0.4} />
              <Radar name={countryB.country} dataKey="B" stroke="var(--cyan)" fill="var(--cyan)" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
