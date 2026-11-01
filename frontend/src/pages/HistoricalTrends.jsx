import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend 
} from 'recharts';
import { FiClock, FiCalendar } from 'react-icons/fi';
import { GLOBAL_RLI_TREND, COUNTRIES_DATA } from '../utils/staticData';
import useAppStore from '../store/appStore';

export default function HistoricalTrends() {
  const { selectedYear, setSelectedYear } = useAppStore();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="section-header">
        <div>
          <h2>Historical Trends & Biodiversity Time Machine</h2>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>
            Longitudinal telemetry of global and regional Red List Index trajectories (2001–2019)
          </p>
        </div>
      </div>

      {/* Time Machine Interactive Slider */}
      <div className="bio-card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(26, 71, 49, 0.2) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiClock style={{ color: 'var(--emerald)', fontSize: '1.25rem' }} />
            <span style={{ fontWeight: 700 }}>Active Time Slice: Year {selectedYear}</span>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Step 1 Year</span>
        </div>

        <input 
          type="range" 
          min="2001" 
          max="2019" 
          step="1" 
          className="bio-range"
          value={selectedYear} 
          onChange={e => setSelectedYear(parseInt(e.target.value))}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>2001 (Baseline)</span>
          <span>2005</span>
          <span>2010 (Convention on Bio Diversity)</span>
          <span>2015 (Paris Accord)</span>
          <span>2019 (Present Data)</span>
        </div>
      </div>

      {/* Long-Horizon Global Trajectory */}
      <div className="bio-card" style={{ marginBottom: '1.5rem' }}>
        <div className="section-title" style={{ marginBottom: '1rem' }}>
          Aggregate 19-Year RLI Trajectory (World Aggregate)
        </div>
        <div style={{ height: '320px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={GLOBAL_RLI_TREND} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.5} />
              <XAxis dataKey="year" stroke="var(--text-muted)" fontSize={12} />
              <YAxis domain={[0.73, 0.81]} stroke="var(--text-muted)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} />
              <Line 
                type="monotone" 
                dataKey="rli" 
                stroke="var(--emerald)" 
                strokeWidth={3} 
                dot={{ r: 4, fill: 'var(--emerald)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
