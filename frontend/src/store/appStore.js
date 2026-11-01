import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAppStore = create(
  persist(
    (set, get) => ({
      // ── Theme ──────────────────────────────────────────
      theme: 'dark',
      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        set({ theme: next });
      },

      // ── Sidebar ────────────────────────────────────────
      // Compact/collapsed by default on desktop for spacious main workspace
      sidebarOpen: false,
      toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      // Mobile drawer open state
      mobileMenuOpen: false,
      toggleMobileMenu: () => set(s => ({ mobileMenuOpen: !s.mobileMenuOpen })),
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

      // ── Country Selection ──────────────────────────────
      selectedCountry: 'Ireland',
      setSelectedCountry: (country) => set({ selectedCountry: country }),

      // ── Year Selection ─────────────────────────────────
      selectedYear: 2019,
      setSelectedYear: (year) => set({ selectedYear: Number(year) }),

      // ── Indicator Selection ────────────────────────────
      selectedIndicator: 'RLI',
      setSelectedIndicator: (indicator) => set({ selectedIndicator: indicator }),

      // ── Comparison Countries ───────────────────────────
      comparisonCountryA: 'France',
      comparisonCountryB: 'Germany',
      setComparisonCountryA: (c) => set({ comparisonCountryA: c }),
      setComparisonCountryB: (c) => set({ comparisonCountryB: c }),

      // ── Notifications ──────────────────────────────────
      notifications: [],
      addNotification: (notification) => {
        const id = Date.now().toString();
        set(s => ({
          notifications: [
            { id, timestamp: new Date().toISOString(), read: false, ...notification },
            ...s.notifications.slice(0, 19),
          ],
        }));
        return id;
      },
      markNotificationRead: (id) =>
        set(s => ({
          notifications: s.notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
      clearNotifications: () => set({ notifications: [] }),

      // ── Prediction History ─────────────────────────────
      predictionHistory: [],
      addPrediction: (prediction) =>
        set(s => ({
          predictionHistory: [
            {
              id: Date.now().toString(),
              timestamp: new Date().toISOString(),
              ...prediction,
            },
            ...s.predictionHistory.slice(0, 49),
          ],
        })),
      clearPredictionHistory: () => set({ predictionHistory: [] }),

      // ── API Status ─────────────────────────────────────
      apiOnline: true,
      setApiOnline: (status) => set({ apiOnline: status }),

      // ── Presentation Mode ──────────────────────────────
      presentationMode: false,
      togglePresentationMode: () => set(s => ({ presentationMode: !s.presentationMode })),

      // ── Dataset Cache ──────────────────────────────────
      datasetStats: null,
      setDatasetStats: (stats) => set({ datasetStats: stats }),
    }),
    {
      name: 'biorisk-app-store',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
        selectedCountry: state.selectedCountry,
        selectedYear: state.selectedYear,
        selectedIndicator: state.selectedIndicator,
        comparisonCountryA: state.comparisonCountryA,
        comparisonCountryB: state.comparisonCountryB,
        predictionHistory: state.predictionHistory,
      }),
    }
  )
);

export default useAppStore;
