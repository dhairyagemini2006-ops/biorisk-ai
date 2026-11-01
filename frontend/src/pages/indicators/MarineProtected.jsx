import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MarineProtected() {
  const trend = [
    { year: 2001, value: 1.39 },
    { year: 2005, value: 1.64 },
    { year: 2010, value: 3.12 },
    { year: 2015, value: 6.80 },
    { year: 2019, value: 10.48 },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="bio-card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--cyan)' }}>
        <h2>🌊 Marine Protected Area Telemetry</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Percentage of national Exclusive Economic Zone (EEZ) designated as marine protected area under IUCN categories I–VI.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
          <div><strong>Metric Unit:</strong> % of EEZ</div>
          <div><strong>Dataset Mean:</strong> 10.48%</div>
          <div><strong>Dataset Median:</strong> 5.48%</div>
          <div><strong>Source:</strong> OECD Environment Statistics</div>
        </div>
      </div>

      <div className="bio-card">
        <div className="section-title" style={{ marginBottom: '1rem' }}>
          Global Longitudinal Expansion (2001–2019)
        </div>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.5} />
              <XAxis dataKey="year" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} />
              <Line type="monotone" dataKey="value" stroke="var(--cyan)" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
