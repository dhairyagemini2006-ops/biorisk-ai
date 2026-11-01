import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import useAppStore from '../../store/appStore';

export default function AppShell() {
  const { sidebarOpen, presentationMode } = useAppStore();

  return (
    <div className={`app-shell ${presentationMode ? 'presentation-mode' : ''}`}>
      {!presentationMode && <Sidebar />}
      <div 
        className={`main-content ${sidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}
        style={{ 
          marginLeft: presentationMode ? 0 : undefined 
        }}
      >
        {!presentationMode && <Navbar />}
        <main className="page-content" style={{ paddingTop: presentationMode ? '2rem' : undefined }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
