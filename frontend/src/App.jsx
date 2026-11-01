import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import useAppStore from './store/appStore';

// ── Pages ─────────────────────────────────────────────────────────────────
import Dashboard from './pages/Dashboard';
import AnimalExplorer from './pages/AnimalExplorer';
import AnimalRisk from './pages/AnimalRisk';
import CountryIntelligence from './pages/CountryIntelligence';
import Globe3D from './pages/Globe3D';
import BiodiversityExplorer from './pages/BiodiversityExplorer';
import FiveIndicators from './pages/FiveIndicators';
import CountryComparison from './pages/CountryComparison';
import HistoricalTrends from './pages/HistoricalTrends';
import DataExplorer from './pages/DataExplorer';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

// ── ML Lab ────────────────────────────────────────────────────────────────
import MLLaboratory from './pages/ml/MLLaboratory';
import ML1Overview from './pages/ml/ML1Overview';
import ML2Dataset from './pages/ml/ML2Dataset';
import ML3EDA from './pages/ml/ML3EDA';
import ML4Methodology from './pages/ml/ML4Methodology';
import ML5Performance from './pages/ml/ML5Performance';
import ML6Metrics from './pages/ml/ML6Metrics';
import ML7SHAP from './pages/ml/ML7SHAP';
import ML8Features from './pages/ml/ML8Features';
import ML9ActualPredicted from './pages/ml/ML9ActualPredicted';
import ML10Residuals from './pages/ml/ML10Residuals';
import ML11Validation from './pages/ml/ML11Validation';
import ML12Findings from './pages/ml/ML12Findings';

// ── Indicator Pages ───────────────────────────────────────────────────────
import MarineProtected from './pages/indicators/MarineProtected';
import TerrestrialProtected from './pages/indicators/TerrestrialProtected';
import ForestArea from './pages/indicators/ForestArea';
import CO2Emissions from './pages/indicators/CO2Emissions';
import VulnerableSpecies from './pages/indicators/VulnerableSpecies';

export default function App() {
  const theme = useAppStore(s => s.theme);
  const initialized = useRef(false);

  // Apply theme on mount and changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Initialize theme from storage on first load
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="animals" element={<AnimalExplorer />} />
          <Route path="risk" element={<AnimalRisk />} />
          <Route path="countries" element={<CountryIntelligence />} />
          <Route path="countries/:country" element={<CountryIntelligence />} />
          <Route path="globe" element={<Globe3D />} />
          <Route path="explorer" element={<BiodiversityExplorer />} />
          <Route path="indicators" element={<FiveIndicators />} />
          <Route path="indicators/marine" element={<MarineProtected />} />
          <Route path="indicators/terrestrial" element={<TerrestrialProtected />} />
          <Route path="indicators/forest" element={<ForestArea />} />
          <Route path="indicators/co2" element={<CO2Emissions />} />
          <Route path="indicators/vulnerable" element={<VulnerableSpecies />} />
          <Route path="comparison" element={<CountryComparison />} />
          <Route path="trends" element={<HistoricalTrends />} />
          <Route path="data" element={<DataExplorer />} />
          <Route path="reports" element={<Reports />} />
          <Route path="ml" element={<MLLaboratory />}>
            <Route index element={<ML1Overview />} />
            <Route path="overview" element={<ML1Overview />} />
            <Route path="dataset" element={<ML2Dataset />} />
            <Route path="eda" element={<ML3EDA />} />
            <Route path="methodology" element={<ML4Methodology />} />
            <Route path="performance" element={<ML5Performance />} />
            <Route path="metrics" element={<ML6Metrics />} />
            <Route path="shap" element={<ML7SHAP />} />
            <Route path="features" element={<ML8Features />} />
            <Route path="actual-predicted" element={<ML9ActualPredicted />} />
            <Route path="residuals" element={<ML10Residuals />} />
            <Route path="validation" element={<ML11Validation />} />
            <Route path="findings" element={<ML12Findings />} />
          </Route>
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
