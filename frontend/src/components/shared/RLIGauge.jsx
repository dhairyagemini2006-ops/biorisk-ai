import React from 'react';
import { getRLIColor, getRLICategory } from '../../utils/dataUtils';

export default function RLIGauge({ value, size = 120, strokeWidth = 10 }) {
  const numVal = typeof value === 'number' ? value : parseFloat(value) || 0;
  const clampedVal = Math.min(1, Math.max(0, numVal));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - clampedVal * circumference;
  const color = getRLIColor(clampedVal);
  const category = getRLICategory(clampedVal);

  return (
    <div className="rli-gauge-container" style={{ width: size, height: size, position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', display: 'block' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--bg-tertiary)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <div 
        className="rli-value-label" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          pointerEvents: 'none',
          lineHeight: 1.15
        }}
      >
        <div 
          className="rli-value" 
          style={{ 
            fontSize: `${Math.round(size * 0.22)}px`, 
            fontWeight: 800, 
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            lineHeight: 1.1
          }}
        >
          {numVal.toFixed(3)}
        </div>
        <div 
          className="rli-label" 
          style={{ 
            color, 
            fontSize: `${Math.max(10, Math.round(size * 0.095))}px`, 
            fontWeight: 700, 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em',
            marginTop: '2px',
            lineHeight: 1.2
          }}
        >
          {category}
        </div>
      </div>
    </div>
  );
}
