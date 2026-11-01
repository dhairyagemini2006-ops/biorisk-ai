import React from 'react';
import { getCountryFlag, getCountryCode } from '../../utils/dataUtils';

export default function CountryFlag({ country, showCode = false, size = '1.25rem' }) {
  const flag = getCountryFlag(country);
  const code = getCountryCode(country);

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <span style={{ fontSize: size, lineHeight: 1 }}>{flag}</span>
      <span>{country}</span>
      {showCode && code && (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          ({code})
        </span>
      )}
    </span>
  );
}
