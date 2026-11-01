import React from 'react';
import { motion } from 'framer-motion';

export default function MetricCard({ title, value, subtitle, icon, trend, color = 'emerald' }) {
  const colorMap = {
    emerald: { bg: 'rgba(16, 185, 129, 0.1)', text: 'var(--emerald)' },
    cyan: { bg: 'rgba(6, 182, 212, 0.1)', text: 'var(--cyan)' },
    amber: { bg: 'rgba(245, 158, 11, 0.1)', text: 'var(--amber)' },
    purple: { bg: 'rgba(139, 92, 246, 0.1)', text: 'var(--purple)' },
    crimson: { bg: 'rgba(239, 68, 68, 0.1)', text: 'var(--crimson)' },
  };

  const styleConfig = colorMap[color] || colorMap.emerald;

  return (
    <motion.div 
      className="metric-card"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="metric-icon" 
        style={{ backgroundColor: styleConfig.bg, color: styleConfig.text }}
      >
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="metric-label">{title}</div>
        <div className="metric-value">{value}</div>
        {(subtitle || trend) && (
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {trend && <span style={{ color: trend > 0 ? 'var(--emerald)' : 'var(--crimson)', fontWeight: 600 }}>{trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%</span>}
            {subtitle && <span>{subtitle}</span>}
          </div>
        )}
      </div>
    </motion.div>
  );
}
