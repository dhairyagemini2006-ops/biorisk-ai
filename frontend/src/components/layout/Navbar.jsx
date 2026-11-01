import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FiSearch, FiSun, FiMoon, FiMenu, FiX, FiActivity, FiDatabase } from 'react-icons/fi';
import { GiDna1 } from 'react-icons/gi';
import useAppStore from '../../store/appStore';
import { COUNTRIES_DATA, SPECIES_CATALOG } from '../../utils/staticData';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme, apiOnline, toggleMobileMenu } = useAppStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Clean, professional breadcrumb title
  const getPageTitle = (pathname) => {
    if (pathname === '/') return 'Dashboard';
    if (pathname.startsWith('/animals')) return 'Animal Explorer & Scanner';
    if (pathname.startsWith('/risk')) return 'Animal Risk Prediction';
    if (pathname.startsWith('/countries')) return 'Country Intelligence';
    if (pathname.startsWith('/globe')) return '3D Biodiversity Globe';
    if (pathname.startsWith('/explorer')) return 'Biodiversity Explorer';
    if (pathname.startsWith('/indicators')) return 'Five Indicators';
    if (pathname.startsWith('/comparison')) return 'Country Comparison';
    if (pathname.startsWith('/trends')) return 'Historical Trends';
    if (pathname.startsWith('/data')) return 'Data Explorer';
    if (pathname.startsWith('/reports')) return 'Reports';
    if (pathname.startsWith('/ml')) return 'ML Research Lab';
    if (pathname.startsWith('/settings')) return 'Settings';
    return 'Platform';
  };

  const filteredCountries = searchQuery.trim()
    ? COUNTRIES_DATA.filter(c => c.country.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const filteredSpecies = searchQuery.trim()
    ? SPECIES_CATALOG.filter(s => 
        s.commonName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSelectCountry = (country) => {
    navigate(`/countries/${country}`);
    setSearchOpen(false);
    setSearchQuery('');
  };

  const handleSelectSpecies = (species) => {
    navigate(`/animals?q=${encodeURIComponent(species.commonName)}`);
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <header className="top-navbar">
        {/* Left: Mobile hamburger + Brand mark + Breadcrumbs */}
        <div className="navbar-left">
          <button 
            className="navbar-mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle Navigation Menu"
          >
            <FiMenu />
          </button>

          <Link to="/" className="navbar-brand-mark" title="BioRisk AI Dashboard">
            <div className="navbar-brand-icon">
              <GiDna1 />
            </div>
            <span className="navbar-brand-name">BioRisk <span className="text-emerald">AI</span></span>
          </Link>

          <div className="navbar-divider" />

          <nav className="navbar-breadcrumbs" aria-label="Breadcrumb">
            <span className="breadcrumb-root">Intelligence</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{getPageTitle(location.pathname)}</span>
          </nav>
        </div>

        {/* Center: Clean global search field */}
        <div className="navbar-center">
          <div className="navbar-search" onClick={() => setSearchOpen(true)} role="button" tabIndex={0}>
            <FiSearch className="navbar-search-icon" />
            <span className="navbar-search-placeholder">Search species, country, indicator...</span>
            <kbd className="navbar-search-kbd">⌘K</kbd>
          </div>
        </div>

        {/* Right: Model/Data status + Theme toggle + Action controls */}
        <div className="navbar-right">
          <div 
            className={`navbar-status-pill ${apiOnline ? 'online' : 'offline'}`}
            title={apiOnline ? "FastAPI Inference Backend Active (Trained RF R²=0.976)" : "Operating on Verified Local Client Cache"}
          >
            <span className="status-dot-indicator" />
            <span className="status-label">
              {apiOnline ? 'RF Model Active' : 'Data Fallback'}
            </span>
          </div>

          <button 
            className="navbar-icon-btn" 
            onClick={toggleTheme} 
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </header>

      {/* Global Command Palette / Search Modal */}
      {searchOpen && (
        <div 
          className="search-modal-backdrop"
          onClick={() => setSearchOpen(false)}
        >
          <div 
            className="search-modal-dialog"
            onClick={e => e.stopPropagation()}
          >
            <div className="search-modal-header">
              <FiSearch className="search-modal-icon" />
              <input 
                autoFocus
                type="text" 
                placeholder="Type to search countries, species, indicators, or ML lab..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="search-modal-input"
              />
              <button 
                onClick={() => setSearchOpen(false)}
                className="search-modal-close"
                aria-label="Close search"
              >
                <FiX />
              </button>
            </div>

            <div className="search-modal-results">
              {searchQuery.trim() === '' ? (
                <div className="search-modal-hint">
                  Try searching <strong>"Brazil"</strong>, <strong>"Amur Leopard"</strong>, <strong>"Forest Area"</strong>, or <strong>"SHAP"</strong>.
                </div>
              ) : (
                <>
                  {filteredCountries.length > 0 && (
                    <div className="search-group">
                      <div className="search-group-title">Countries</div>
                      {filteredCountries.map(c => (
                        <div 
                          key={c.country}
                          onClick={() => handleSelectCountry(c.country)}
                          className="search-result-item"
                        >
                          <span>{c.flag} {c.country}</span>
                          <span className="search-result-meta">Mean RLI: {c.mean_rli.toFixed(3)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {filteredSpecies.length > 0 && (
                    <div className="search-group">
                      <div className="search-group-title">Species Catalog</div>
                      {filteredSpecies.map(s => (
                        <div 
                          key={s.id}
                          onClick={() => handleSelectSpecies(s)}
                          className="search-result-item"
                        >
                          <div>
                            <strong>{s.commonName}</strong> <em className="search-result-sub">({s.scientificName})</em>
                          </div>
                          <span className="search-result-badge">
                            {s.conservationStatus}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {filteredCountries.length === 0 && filteredSpecies.length === 0 && (
                    <div className="search-modal-empty">
                      No matching records found for "{searchQuery}".
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
