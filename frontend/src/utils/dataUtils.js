/**
 * BioRisk AI — Data utility functions
 * Implements user-friendly simple display labels alongside scientific definitions.
 */
import { RLI_CATEGORIES, INDICATOR_DEFINITIONS, COUNTRIES_DATA } from './staticData';

// ── Plain-Language Indicator Name Mappings ──────────────────────────────────
export const INDICATOR_SIMPLE_NAMES = {
  Marine_Protected: 'Ocean Protected',
  Terrestrial_Protected: 'Land Protected',
  Forest_Area: 'Forest Cover',
  CO2: 'Carbon Emissions',
  Total_Vulnerable_Species: 'Species at Risk',
  RLI: 'Biodiversity Health',
};

/** Get plain-language user-facing name for indicator */
export const getSimpleIndicatorName = (key) => INDICATOR_SIMPLE_NAMES[key] || key;

// ── RLI / Biodiversity Health Formatters ────────────────────────────────────

/** Format RLI value to 3 decimal places */
export const formatRLI = (value) => {
  if (value == null || isNaN(value)) return 'N/A';
  return Number(value).toFixed(3);
};

/** Get color for RLI value */
export const getRLIColor = (value) => {
  if (value == null || isNaN(value)) return '#94a3b8';
  const cat = RLI_CATEGORIES.find(c => value >= c.min && value < c.max);
  return cat ? cat.color : '#10b981';
};

/** Get RLI category label */
export const getRLICategory = (value) => {
  if (value == null || isNaN(value)) return 'Unknown';
  const cat = RLI_CATEGORIES.find(c => value >= c.min && value < c.max);
  return cat ? cat.label : 'Excellent';
};

// ── Conservation Status ──────────────────────────────────────────────────────

export const getConservationColor = (status) => {
  if (!status) return '#94a3b8';
  const s = status.toLowerCase();
  if (s.includes('critically')) return '#ef4444';
  if (s.includes('endangered')) return '#f97316';
  if (s.includes('vulnerable')) return '#f59e0b';
  if (s.includes('near')) return '#eab308';
  if (s.includes('least')) return '#22c55e';
  return '#94a3b8';
};

export const getConservationClass = (status) => {
  if (!status) return 'dd';
  const s = status.toLowerCase();
  if (s.includes('critically')) return 'cr';
  if (s.includes('endangered')) return 'en';
  if (s.includes('vulnerable')) return 'vu';
  if (s.includes('near')) return 'nt';
  if (s.includes('least')) return 'lc';
  return 'dd';
};

// ── Number Formatters ────────────────────────────────────────────────────────

export const formatNumber = (n) => {
  if (n == null || isNaN(n)) return 'N/A';
  return Number(n).toLocaleString('en-US');
};

export const formatCO2 = (n) => {
  if (n == null || isNaN(n)) return 'N/A';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M kt`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K kt`;
  return `${Number(n).toLocaleString()} kt`;
};

export const formatForestArea = (n) => {
  if (n == null || isNaN(n)) return 'N/A';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M km²`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K km²`;
  return `${Math.round(n).toLocaleString()} km²`;
};

export const formatPercent = (n, decimals = 1) => {
  if (n == null || isNaN(n)) return 'N/A';
  return `${Number(n).toFixed(decimals)}%`;
};

// ── Country Utilities ────────────────────────────────────────────────────────

export const getCountryFlag = (countryName) => {
  const found = COUNTRIES_DATA.find(
    c => c.country.toLowerCase() === countryName?.toLowerCase()
  );
  return found?.flag || '🌍';
};

export const getCountryCode = (countryName) => {
  const found = COUNTRIES_DATA.find(
    c => c.country.toLowerCase() === countryName?.toLowerCase()
  );
  return found?.code || '';
};

export const getCountryCoordinates = (countryName) => {
  const found = COUNTRIES_DATA.find(
    c => c.country.toLowerCase() === countryName?.toLowerCase()
  );
  return found ? { lat: found.lat, lng: found.lng } : null;
};

// ── Indicator Utilities ──────────────────────────────────────────────────────

export const getIndicatorDef = (key) => INDICATOR_DEFINITIONS[key] || null;

export const formatIndicatorValue = (key, value) => {
  if (value == null || isNaN(value)) return 'Data unavailable';
  switch (key) {
    case 'Marine_Protected':
    case 'Terrestrial_Protected':
      return formatPercent(value);
    case 'Forest_Area':
      return formatForestArea(value);
    case 'CO2':
      return formatCO2(value);
    case 'Total_Vulnerable_Species':
      return `${formatNumber(Math.round(value))} species`;
    case 'RLI':
      return formatRLI(value);
    default:
      return String(value);
  }
};
