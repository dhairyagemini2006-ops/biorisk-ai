import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, FiRefreshCw, FiInfo, FiSliders, 
  FiChevronRight, FiChevronLeft, FiCheckCircle, FiAlertCircle, 
  FiDatabase, FiExternalLink, FiX, FiCamera, FiGrid, FiArrowLeft
} from 'react-icons/fi';
import { SPECIES_CATALOG, COUNTRIES_DATA } from '../utils/staticData';
import { getConservationClass, formatRLI } from '../utils/dataUtils';

export default function AnimalExplorer() {
  const [speciesList] = useState(SPECIES_CATALOG);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [groupFilter, setGroupFilter] = useState('ALL');
  
  // Two-level folder architecture: 'collection' (Level 1) or 'dossier' (Level 2)
  const [viewMode, setViewMode] = useState('collection');
  
  // Selected species for Level 2 dossier
  const [selectedSpecies, setSelectedSpecies] = useState(SPECIES_CATALOG[3] || SPECIES_CATALOG[0]); // Amur Leopard default
  
  // Active tab inside the camera monitor (7 tabs)
  const [activeTab, setActiveTab] = useState('overview');
  
  // Scanner state machine: 'idle' | 'inserting' | 'scanning' | 'ready'
  const [scanState, setScanState] = useState('ready');
  const [scanProgress, setScanProgress] = useState(100);

  // Filter logic for Level 1 collection grid (memoized for fast instant search)
  const filteredSpecies = useMemo(() => {
    const sLower = search.trim().toLowerCase();
    return speciesList.filter(s => {
      const matchSearch = !sLower || 
                          s.commonName.toLowerCase().includes(sLower) || 
                          s.scientificName.toLowerCase().includes(sLower);
      const matchStatus = statusFilter === 'ALL' || s.conservationStatus.toLowerCase().includes(statusFilter.toLowerCase());
      const matchGroup = groupFilter === 'ALL' || s.group.toLowerCase() === groupFilter.toLowerCase();
      return matchSearch && matchStatus && matchGroup;
    });
  }, [speciesList, search, statusFilter, groupFilter]);

  // Open Level 2 detail view (dossier folder) for an animal
  const handleOpenDossier = (species) => {
    setSelectedSpecies(species);
    setViewMode('dossier');
    setActiveTab('overview');
    setScanState('inserting');
    setScanProgress(0);
  };

  // Return to Level 1 collection gallery
  const handleBackToCollection = () => {
    setViewMode('collection');
  };

  // Scanning animation sequence
  useEffect(() => {
    let timer;
    if (scanState === 'inserting') {
      timer = setTimeout(() => {
        setScanState('scanning');
      }, 750);
    } else if (scanState === 'scanning') {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setScanState('ready');
            return 100;
          }
          return prev + 15;
        });
      }, 85);
      return () => clearInterval(interval);
    }
    return () => clearTimeout(timer);
  }, [scanState]);

  const handleEject = () => {
    setScanState('idle');
    setScanProgress(0);
  };

  const handleRescan = () => {
    setScanState('inserting');
    setScanProgress(0);
  };

  // Find country data for countries documented in the species record
  const matchingCountries = (selectedSpecies?.countries || []).map(countryName => {
    return COUNTRIES_DATA.find(c => c.country.toLowerCase() === countryName.toLowerCase()) || {
      country: countryName,
      mean_rli: null,
      flag: '🌐'
    };
  });

  // 7 Tabs definition for Level 2 Dossier Monitor
  const DOSSIER_TABS = [
    { id: 'overview', label: 'Overview', icon: '🐾' },
    { id: 'conservation', label: 'Conservation Status', icon: '🛡️' },
    { id: 'population', label: 'Population & Trends', icon: '📊' },
    { id: 'range', label: 'Countries & Geographic Range', icon: '🌍' },
    { id: 'habitat', label: 'Habitat & Threats', icon: '⚠️' },
    { id: 'indicators', label: 'Environmental Indicators', icon: '📈' },
    { id: 'sources', label: 'Sources & Methodology', icon: '📜' },
  ];

  return (
    <div className="animal-explorer-container">
      
      {/* =========================================================
          LEVEL 1: ANIMAL COLLECTION (SPECIMEN REGISTRY)
          ========================================================= */}
      {viewMode === 'collection' && (
        <motion.div 
          className="level1-collection-view"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Header */}
          <div className="section-header" style={{ marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.65rem', marginBottom: '0.25rem' }}>Animal Explorer & Specimen Registry</h2>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Level 1: Explore verified global biodiversity taxa. Select any specimen card to open its physical camera scanner dossier.
              </p>
            </div>
            <div className="collection-stats-pill">
              <span className="pulse-indicator" />
              <span>{filteredSpecies.length} of {speciesList.length} Verified Taxa</span>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="collection-toolbar-card bio-card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
            <div className="toolbar-search-row">
              <div className="search-input-box" style={{ flex: 1 }}>
                <FiSearch className="search-box-icon" />
                <input 
                  type="text" 
                  placeholder="Search species by common name or scientific taxonomy..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="collection-search-input"
                />
                {search && (
                  <button className="search-clear-btn" onClick={() => setSearch('')}>
                    <FiX />
                  </button>
                )}
              </div>

              {/* Taxonomic Group Filter */}
              <div className="filter-group-buttons">
                {['ALL', 'Mammal', 'Fish', 'Bird', 'Reptile', 'Insect'].map(grp => (
                  <button
                    key={grp}
                    onClick={() => setGroupFilter(grp)}
                    className={`btn-ghost filter-btn ${groupFilter === grp ? 'active' : ''}`}
                  >
                    {grp === 'ALL' ? 'All Classes' : grp}
                  </button>
                ))}
              </div>

              {/* Conservation Status Filter Dropdown */}
              <select 
                className="compact-status-select"
                style={{ width: '220px', padding: '0.45rem 0.65rem' }}
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All Conservation Statuses</option>
                <option value="Critically">CR — Critically Endangered</option>
                <option value="Endangered">EN — Endangered</option>
                <option value="Vulnerable">VU — Vulnerable</option>
                <option value="Near">NT — Near Threatened</option>
                <option value="Least">LC — Least Concern</option>
              </select>
            </div>
          </div>

          {/* Responsive Specimen Cards Grid */}
          <div className="species-cards-grid">
            {filteredSpecies.map(s => {
              const statusClass = getConservationClass(s.conservationStatus);

              return (
                <div 
                  key={s.id} 
                  className="specimen-registry-card"
                  onClick={() => handleOpenDossier(s)}
                >
                  {/* Photo Container with Group & Status Badges */}
                  <div className="specimen-card-media">
                    <img 
                      src={s.photoUrl} 
                      alt={s.commonName} 
                      className="specimen-card-img"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="specimen-card-media-overlay" />
                    <span className="specimen-group-tag">{s.group}</span>
                    <span className={`status-tag status-${statusClass} specimen-status-tag`}>
                      {s.conservationStatus}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="specimen-card-body">
                    <div className="specimen-card-title-row">
                      <h3 className="specimen-card-name">{s.commonName}</h3>
                      <span className="specimen-card-latin">{s.scientificName}</span>
                    </div>

                    <div className="specimen-card-meta-row">
                      <span className="meta-icon">🌍</span>
                      <span className="meta-text">{s.populationScope}</span>
                    </div>

                    <div className="specimen-card-population-snippet">
                      <span className="pop-label">Population:</span>
                      <span className="pop-val">{s.population.substring(0, 75)}...</span>
                    </div>

                    {/* Action button */}
                    <button className="specimen-open-btn">
                      <span>Open Dossier & Scan</span>
                      <FiChevronRight />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSpecies.length === 0 && (
            <div className="bio-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <FiSearch style={{ fontSize: '2.5rem', marginBottom: '0.75rem', opacity: 0.5 }} />
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>No Matching Animal Taxa Found</div>
              <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                Try adjusting your search query or relaxing status/group filters.
              </p>
              <button 
                className="btn-emerald" 
                style={{ marginTop: '0.75rem' }}
                onClick={() => { setSearch(''); setStatusFilter('ALL'); setGroupFilter('ALL'); }}
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* =========================================================
          LEVEL 2: SELECTED ANIMAL DOSSIER (SCANNER CENTERPIECE)
          ========================================================= */}
      {viewMode === 'dossier' && selectedSpecies && (
        <motion.div 
          className="level2-dossier-view"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
        >
          {/* Top Dossier Breadcrumb & Switcher Bar */}
          <div className="dossier-top-nav-bar">
            <button 
              className="btn-ghost back-to-collection-btn"
              onClick={handleBackToCollection}
            >
              <FiArrowLeft />
              <span>Back to Specimen Registry</span>
            </button>

            <div className="dossier-active-title">
              <span>Specimen Dossier:</span>
              <strong className="text-emerald">{selectedSpecies.commonName}</strong>
              <span className="dossier-latin-hint">({selectedSpecies.scientificName})</span>
            </div>

            {/* Quick Switcher dropdown to hop between specimens directly */}
            <div className="dossier-quick-switch">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Switch Specimen:</span>
              <select 
                className="compact-status-select" 
                value={selectedSpecies.id}
                onChange={e => {
                  const target = speciesList.find(s => s.id === parseInt(e.target.value));
                  if (target) handleOpenDossier(target);
                }}
                style={{ minWidth: '180px' }}
              >
                {speciesList.map(s => (
                  <option key={s.id} value={s.id}>{s.commonName} ({s.group})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Front-Facing Digital Camera Workstation */}
          <div className="digital-camera-chassis">
            
            {/* Camera Top Shell with Card Slot, Shutter Button, and Dials */}
            <div className="camera-top-ridge">
              <div className="camera-brand-badge">
                <span className="camera-brand-text">BIORISK CAM-IX</span>
                <span className="camera-brand-sub">WILDLIFE INTELLIGENCE DOSSIER</span>
              </div>

              {/* The Mechanical Top Slot */}
              <div className="camera-top-slot-container">
                <div className="slot-cutout">
                  <div className="slot-lip-bevel" />
                  
                  {/* Animating Card Inserting Vertically from the Top */}
                  {scanState === 'inserting' && (
                    <motion.div
                      className="inserting-camera-card"
                      initial={{ y: -80, opacity: 0.9, scale: 0.9 }}
                      animate={{ y: 22, opacity: 1, scale: 1 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <img 
                        src={selectedSpecies?.photoUrl} 
                        alt={selectedSpecies?.commonName} 
                        className="inserting-thumb"
                      />
                      <div className="inserting-name">{selectedSpecies?.commonName}</div>
                    </motion.div>
                  )}
                </div>
                <div className="slot-instruction-text">▲ OPTICAL CARTRIDGE PORT // LEVEL 2 DOSSIER</div>
              </div>

              {/* Top Hardware Controls: Dial & Shutter */}
              <div className="camera-top-hardware">
                <div className="camera-hardware-dial" title="Mode Dial">
                  <div className="dial-notch" />
                </div>
                <div 
                  className="camera-shutter-button" 
                  onClick={handleRescan}
                  title="Trigger Optical Scan"
                />
              </div>
            </div>

            {/* Camera Main Body: Front View Layout */}
            <div className="camera-main-frame">
              
              {/* Left Grip & Optical Sensor Indicator */}
              <div className="camera-left-grip">
                <div className="camera-grip-texture" />
                <div className="camera-sensor-aperture" title="Auxiliary Optical Sensor">
                  <div className="aperture-core" />
                </div>
              </div>

              {/* Large Rectangular Front Monitor */}
              <div className="camera-monitor-frame">
                <div className="camera-monitor-glass">
                  
                  {/* 1. Scanning State Viewfinder */}
                  {scanState === 'scanning' && (
                    <div className="camera-scanning-screen">
                      <div className="viewfinder-crosshairs">
                        <div className="crosshair ch-tl" />
                        <div className="crosshair ch-tr" />
                        <div className="crosshair ch-bl" />
                        <div className="crosshair ch-br" />
                      </div>

                      <div className="scanning-lens-graphic">
                        <FiCamera className="camera-lens-icon" />
                        <div className="scanning-laser-pulse" />
                      </div>

                      <div className="camera-scanning-title">
                        OPTICAL RECOGNITION ENGAGED
                      </div>
                      <div className="camera-scanning-specimen">
                        DIGITIZING: {selectedSpecies?.commonName} ({selectedSpecies?.scientificName})
                      </div>

                      <div className="camera-scan-progress-wrap">
                        <div className="camera-scan-bar" style={{ width: `${scanProgress}%` }} />
                      </div>
                      <div className="camera-scan-percentage">{scanProgress}% DIGITIZED</div>
                    </div>
                  )}

                  {/* 2. Idle State */}
                  {scanState === 'idle' && (
                    <div className="camera-idle-screen">
                      <FiCamera className="idle-camera-icon" />
                      <div className="idle-screen-title">VIEWFINDER STANDBY</div>
                      <p className="idle-screen-subtitle">
                        Cartridge ejected. Click the scan trigger or insert card button to re-engage optical telemetry.
                      </p>
                      <button 
                        className="btn-emerald"
                        onClick={handleRescan}
                      >
                        Insert & Scan {selectedSpecies?.commonName}
                      </button>
                    </div>
                  )}

                  {/* 3. Ready State: Organized into 7 Dedicated Tabs */}
                  {scanState === 'ready' && selectedSpecies && (
                    <div className="camera-report-screen">
                      
                      {/* Top Header Row of the Camera Display */}
                      <div className="report-display-header">
                        <div className="report-header-left">
                          <img 
                            src={selectedSpecies.photoUrl} 
                            alt={selectedSpecies.commonName} 
                            className="report-header-photo"
                          />
                          <div>
                            <div className="report-header-title">{selectedSpecies.commonName}</div>
                            <div className="report-header-sub">{selectedSpecies.scientificName} • {selectedSpecies.group}</div>
                          </div>
                        </div>

                        <div className="report-header-right">
                          <span className={`status-tag status-${getConservationClass(selectedSpecies.conservationStatus)}`}>
                            {selectedSpecies.conservationStatus}
                          </span>
                          <span className="report-header-date">{selectedSpecies.assessmentDate}</span>
                        </div>
                      </div>

                      {/* 7 Navigation Tabs Strip inside Camera Monitor */}
                      <div className="camera-tabs-bar">
                        {DOSSIER_TABS.map(tab => (
                          <button
                            key={tab.id}
                            className={`camera-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                          >
                            <span className="tab-icon">{tab.icon}</span>
                            <span className="tab-label">{tab.label}</span>
                          </button>
                        ))}
                      </div>

                      {/* Tab Content Body (Scrollable Pane) */}
                      <div className="report-display-body">
                        
                        {/* TAB 1: OVERVIEW */}
                        {activeTab === 'overview' && (
                          <div className="tab-content-container">
                            <div className="report-section-grid">
                              <div className="report-info-card">
                                <div className="info-card-heading">
                                  <span className="heading-icon">🧬</span> Taxonomic Profile
                                </div>
                                <div className="info-kv-row">
                                  <span className="kv-label">Common Name:</span>
                                  <span className="kv-value">{selectedSpecies.commonName}</span>
                                </div>
                                <div className="info-kv-row">
                                  <span className="kv-label">Scientific Taxonomy:</span>
                                  <span className="kv-value" style={{ fontStyle: 'italic' }}>{selectedSpecies.scientificName}</span>
                                </div>
                                <div className="info-kv-row">
                                  <span className="kv-label">Taxonomic Group:</span>
                                  <span className="kv-value">{selectedSpecies.group}</span>
                                </div>
                                <div className="info-kv-row">
                                  <span className="kv-label">Biological Kingdom:</span>
                                  <span className="kv-value">Animalia</span>
                                </div>
                              </div>

                              <div className="report-info-card">
                                <div className="info-card-heading">
                                  <span className="heading-icon">📌</span> Specimen Summary
                                </div>
                                <div className="info-kv-row">
                                  <span className="kv-label">Primary Geographic Scope:</span>
                                  <span className="kv-value">{selectedSpecies.populationScope}</span>
                                </div>
                                <div className="info-kv-row">
                                  <span className="kv-label">Population Trajectory:</span>
                                  <span className="kv-value text-amber">{selectedSpecies.populationTrend}</span>
                                </div>
                                <div className="info-kv-row">
                                  <span className="kv-label">Assessment Authority:</span>
                                  <span className="kv-value">{selectedSpecies.source}</span>
                                </div>
                              </div>
                            </div>

                            <div className="report-info-card" style={{ marginTop: '0.85rem' }}>
                              <div className="info-card-heading">
                                <span className="heading-icon">🌿</span> Ecological Description
                              </div>
                              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                                <strong>{selectedSpecies.commonName}</strong> (<em>{selectedSpecies.scientificName}</em>) is an ecologically vital {selectedSpecies.group.toLowerCase()} species documented across {selectedSpecies.populationScope}. This taxon serves as a pivotal biological indicator for habitat integrity in {selectedSpecies.habitat.toLowerCase()}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* TAB 2: CONSERVATION STATUS */}
                        {activeTab === 'conservation' && (
                          <div className="tab-content-container">
                            <div className="report-info-card">
                              <div className="info-card-heading">
                                <span className="heading-icon">🛡️</span> Verified IUCN Red List Assessment
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', padding: '0.75rem', background: 'var(--bg-primary)', borderRadius: '6px' }}>
                                <span className={`status-tag status-${getConservationClass(selectedSpecies.conservationStatus)}`} style={{ fontSize: '0.9rem', padding: '0.35rem 0.85rem' }}>
                                  {selectedSpecies.conservationStatus}
                                </span>
                                <div>
                                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Assessment Horizon: {selectedSpecies.assessmentDate}</div>
                                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Classified under official IUCN Red List 3.1 Quantitative Criteria</div>
                                </div>
                              </div>

                              <div className="info-kv-row">
                                <span className="kv-label">Global Red List Category:</span>
                                <span className="kv-value text-amber">{selectedSpecies.conservationStatus}</span>
                              </div>
                              <div className="info-kv-row">
                                <span className="kv-label">Assessed Authority:</span>
                                <span className="kv-value">{selectedSpecies.source}</span>
                              </div>
                              <div className="info-kv-row">
                                <span className="kv-label">CITES Trade Protocol:</span>
                                <span className="kv-value">Strict Trade Restrictions (Appendix I / II Listed)</span>
                              </div>
                            </div>

                            <div className="disclaimer-callout" style={{ marginTop: '0.85rem', padding: '0.55rem 0.75rem' }}>
                              <FiInfo style={{ flexShrink: 0, marginTop: '2px' }} />
                              <div style={{ fontSize: '0.78rem' }}>
                                <strong>Scientific Separation Protocol:</strong> Species conservation status reflects global taxonomic extinction risk assessed by IUCN Specialist Groups. It is entirely separate from country-level Biodiversity Health (RLI) models and should never be conflated with national policy indicators.
                              </div>
                            </div>
                          </div>
                        )}

                        {/* TAB 3: POPULATION & TRENDS */}
                        {activeTab === 'population' && (
                          <div className="tab-content-container">
                            <div className="report-info-card">
                              <div className="info-card-heading">
                                <span className="heading-icon">📊</span> Verified Scientific Population Census
                              </div>
                              <div className="info-kv-row">
                                <span className="kv-label">Verified Census Headcount:</span>
                                <span className="kv-value text-emerald" style={{ fontWeight: 700 }}>{selectedSpecies.population}</span>
                              </div>
                              <div className="info-kv-row">
                                <span className="kv-label">Geographic Scope of Census:</span>
                                <span className="kv-value">{selectedSpecies.populationScope}</span>
                              </div>
                              <div className="info-kv-row">
                                <span className="kv-label">Observed Multi-Year Trend:</span>
                                <span className="kv-value text-amber">{selectedSpecies.populationTrend}</span>
                              </div>
                              <div className="info-kv-row">
                                <span className="kv-label">Verifying Scientific Authority:</span>
                                <span className="kv-value">{selectedSpecies.source}</span>
                              </div>
                            </div>

                            <div className="disclaimer-callout" style={{ marginTop: '0.85rem', padding: '0.55rem 0.75rem' }}>
                              <FiAlertCircle style={{ flexShrink: 0, marginTop: '2px', color: 'var(--amber)' }} />
                              <div style={{ fontSize: '0.78rem' }}>
                                <strong>Strict Data Verification Principle:</strong> Only verified demographic census counts from authorized field surveys are displayed above. Casual observation counts and tourist sightings are <em>never</em> equated with absolute wild population estimates.
                              </div>
                            </div>
                          </div>
                        )}

                        {/* TAB 4: COUNTRIES & GEOGRAPHIC RANGE */}
                        {activeTab === 'range' && (
                          <div className="tab-content-container">
                            <div className="report-info-card">
                              <div className="info-card-heading">
                                <span className="heading-icon">🌍</span> Documented Range States & National Biodiversity Health
                              </div>
                              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                                The following jurisdictions encompass recognized native ranges for <strong>{selectedSpecies.commonName}</strong>. Corresponding national <strong>Biodiversity Health (RLI)</strong> from the BioRisk OECD/UN dataset is provided:
                              </p>

                              <div className="country-range-tags-grid">
                                {matchingCountries.map((c, i) => (
                                  <div key={i} className="country-range-card">
                                    <div className="crc-header">
                                      <span style={{ fontSize: '1.25rem' }}>{c.flag}</span>
                                      <strong className="crc-name">{c.country}</strong>
                                    </div>
                                    <div className="crc-rli-row">
                                      <span>Biodiversity Health:</span>
                                      <strong className="text-emerald">
                                        {c.mean_rli !== null ? formatRLI(c.mean_rli) : 'Data in regional pool'}
                                      </strong>
                                    </div>
                                    {c.forest !== undefined && (
                                      <div className="crc-detail">
                                        Forest Cover: {Math.round(c.forest).toLocaleString()} km²
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="disclaimer-callout" style={{ marginTop: '0.85rem', padding: '0.55rem 0.75rem' }}>
                              <FiInfo style={{ flexShrink: 0, marginTop: '2px' }} />
                              <div style={{ fontSize: '0.78rem' }}>
                                <strong>Jurisdiction Boundary Notice:</strong> Country-level Biodiversity Health (RLI) measures national aggregate biodiversity stability across hundreds of native taxa. It does not represent this specific animal's individual survival probability or species-level risk score.
                              </div>
                            </div>
                          </div>
                        )}

                        {/* TAB 5: HABITAT & THREATS */}
                        {activeTab === 'habitat' && (
                          <div className="tab-content-container">
                            <div className="report-info-card">
                              <div className="info-card-heading">
                                <span className="heading-icon">🏞️</span> Biome & Environmental Habitat
                              </div>
                              <p style={{ fontSize: '0.825rem', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
                                {selectedSpecies.habitat}
                              </p>
                            </div>

                            <div className="report-info-card" style={{ marginTop: '0.85rem' }}>
                              <div className="info-card-heading">
                                <span className="heading-icon">⚠️</span> Documented Anthropogenic Threats
                              </div>
                              <p style={{ fontSize: '0.825rem', color: 'var(--amber)', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                                {selectedSpecies.threats}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* TAB 6: ENVIRONMENTAL INDICATORS */}
                        {activeTab === 'indicators' && (
                          <div className="tab-content-container">
                            <div className="report-info-card">
                              <div className="info-card-heading">
                                <span className="heading-icon">📈</span> Five Macro Indicators Impacting Range Health
                              </div>
                              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                                Macro environmental pressures from the 5 verified predictors directly shaping habitat stability:
                              </p>

                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.65rem' }}>
                                <div className="mini-indicator-box">
                                  <div className="mi-hdr">🌲 Forest Cover</div>
                                  <div className="mi-desc">Critical canopy corridors preventing genetic inbreeding and fragmentation.</div>
                                </div>
                                <div className="mini-indicator-box">
                                  <div className="mi-hdr">🏞️ Land Protected</div>
                                  <div className="mi-desc">Designated national parks shielding specimens from unauthorized agricultural encroachment.</div>
                                </div>
                                <div className="mini-indicator-box">
                                  <div className="mi-hdr">🌊 Ocean Protected</div>
                                  <div className="mi-desc">Marine protected zones securing pelagic feeding zones and sea turtle nesting coasts.</div>
                                </div>
                                <div className="mini-indicator-box">
                                  <div className="mi-hdr">🏭 Carbon Emissions</div>
                                  <div className="mi-desc">Industrial emissions driving thermal shifts, sea-ice shrinkage, and extreme weather.</div>
                                </div>
                                <div className="mini-indicator-box">
                                  <div className="mi-hdr">🦁 Species at Risk</div>
                                  <div className="mi-desc">Aggregated count of co-occurring vulnerable taxa within the broader ecosystem.</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* TAB 7: SOURCES & METHODOLOGY */}
                        {activeTab === 'sources' && (
                          <div className="tab-content-container">
                            <div className="report-info-card">
                              <div className="info-card-heading">
                                <span className="heading-icon">📜</span> Scientific Authority & Verification Provenance
                              </div>
                              <div className="info-kv-row">
                                <span className="kv-label">Primary Authority:</span>
                                <span className="kv-value">{selectedSpecies.source}</span>
                              </div>
                              <div className="info-kv-row">
                                <span className="kv-label">Assessment Benchmark:</span>
                                <span className="kv-value">{selectedSpecies.assessmentDate}</span>
                              </div>
                              <div className="info-kv-row">
                                <span className="kv-label">International Framework:</span>
                                <span className="kv-value">IUCN Red List / CITES Global Wildlife Trade Registry</span>
                              </div>
                              <div className="info-kv-row">
                                <span className="kv-label">Data Integrity Guarantee:</span>
                                <span className="kv-value text-emerald">Verified Peer-Reviewed Censuses Only</span>
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Right Side Physical Buttons & D-Pad */}
              <div className="camera-right-controls">
                <div className="camera-dpad">
                  <div className="dpad-button dpad-up" />
                  <div className="dpad-button dpad-left" />
                  <div className="dpad-center-ok" title="Menu / OK" onClick={handleRescan}>OK</div>
                  <div className="dpad-button dpad-right" />
                  <div className="dpad-button dpad-down" />
                </div>

                <div className="camera-tactile-buttons">
                  <button className="tactile-btn" onClick={handleRescan} title="Re-scan current specimen">SCAN</button>
                  <button className="tactile-btn" onClick={handleEject} title="Eject cartridge">EJECT</button>
                </div>
              </div>

            </div>

            {/* Camera Bottom Plate & Status Bar */}
            <div className="camera-bottom-plate">
              <div className="camera-led-indicators">
                <div className="cam-led-group">
                  <span className={`cam-led ${scanState === 'scanning' ? 'pulse-fast' : 'active-green'}`} />
                  <span className="cam-led-tag">POWER</span>
                </div>
                <div className="cam-led-group">
                  <span className={`cam-led ${scanState === 'scanning' ? 'active-amber' : 'dim'}`} />
                  <span className="cam-led-tag">LASER</span>
                </div>
                <div className="cam-led-group">
                  <span className={`cam-led ${scanState === 'ready' ? 'active-green' : 'dim'}`} />
                  <span className="cam-led-tag">DATA</span>
                </div>
              </div>

              <div className="camera-serial-stamp">
                OPTICAL SENSOR MATRIX // BIO-RESOLUTION 4K // TWO-LEVEL DOSSIER SYSTEM
              </div>
            </div>

          </div>
        </motion.div>
      )}

    </div>
  );
}
