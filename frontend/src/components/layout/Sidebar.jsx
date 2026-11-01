import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiSearch, 
  FiActivity, 
  FiGlobe, 
  FiSliders, 
  FiBarChart2, 
  FiTrendingUp, 
  FiDatabase, 
  FiFileText, 
  FiCpu, 
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiX
} from 'react-icons/fi';
import { GiDna1 } from 'react-icons/gi';
import useAppStore from '../../store/appStore';

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar, mobileMenuOpen, setMobileMenuOpen } = useAppStore();

  const navItems = [
    { section: 'Core' },
    { path: '/', label: 'Dashboard', icon: <FiHome /> },
    { path: '/animals', label: 'Animal Explorer & Scanner', icon: <GiDna1 /> },
    { path: '/risk', label: 'Animal Risk Prediction', icon: <FiActivity /> },
    { path: '/countries', label: 'Country Intelligence', icon: <FiGlobe /> },
    
    { section: 'Spatial & Analysis' },
    { path: '/globe', label: '3D Biodiversity Globe', icon: <FiGlobe /> },
    { path: '/explorer', label: 'Biodiversity Explorer', icon: <FiSearch /> },
    { path: '/indicators', label: 'Five Indicators', icon: <FiSliders /> },
    { path: '/comparison', label: 'Country Comparison', icon: <FiBarChart2 /> },
    { path: '/trends', label: 'Historical Trends', icon: <FiTrendingUp /> },
    
    { section: 'Data & Science' },
    { path: '/data', label: 'Data Explorer', icon: <FiDatabase /> },
    { path: '/reports', label: 'Reports', icon: <FiFileText /> },
    { path: '/ml', label: 'ML Research Lab', icon: <FiCpu /> },
    { path: '/settings', label: 'Settings', icon: <FiSettings /> },
  ];

  const handleNavClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close navigation"
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? 'expanded' : 'collapsed'} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <GiDna1 style={{ color: '#fff', fontSize: '1.25rem' }} />
          </div>
          <div className="sidebar-logo-text-group">
            <div className="sidebar-logo-text">BioRisk AI</div>
            <div className="sidebar-logo-sub">Biodiversity Intelligence</div>
          </div>
          {mobileMenuOpen && (
            <button 
              className="mobile-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <FiX />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item, idx) => {
            if (item.section) {
              return (
                <div key={idx} className="nav-section-label">
                  {item.section}
                </div>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={handleNavClick}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <div className="nav-icon">{item.icon}</div>
                <div className="nav-label">{item.label}</div>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button 
            onClick={toggleSidebar} 
            className="btn-ghost sidebar-toggle-btn"
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? (
              <>
                <FiChevronLeft className="toggle-icon" />
                <span className="toggle-text">Collapse Menu</span>
              </>
            ) : (
              <FiChevronRight className="toggle-icon" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
