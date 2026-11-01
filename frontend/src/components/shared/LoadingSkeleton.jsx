import React from 'react';

export const CardSkeleton = () => (
  <div className="bio-card skeleton" style={{ height: '180px', marginBottom: '1rem' }} />
);

export const ChartSkeleton = ({ height = '300px' }) => (
  <div className="bio-card skeleton" style={{ height, marginBottom: '1rem' }} />
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="bio-card" style={{ padding: '1rem' }}>
    <div className="skeleton" style={{ height: '32px', marginBottom: '1rem' }} />
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="skeleton" style={{ height: '24px', marginBottom: '0.5rem', opacity: 1 - i * 0.15 }} />
    ))}
  </div>
);

export const StatSkeleton = () => (
  <div className="metric-card skeleton" style={{ height: '90px' }} />
);

export default { CardSkeleton, ChartSkeleton, TableSkeleton, StatSkeleton };
