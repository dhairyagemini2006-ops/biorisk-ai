import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { COUNTRIES_DATA, DATASET_STATS, GLOBAL_RLI_TREND } from '../utils/staticData';

const API_BASE = '/api';
const CACHE = {};

const fetchWithFallback = async (url, fallback) => {
  if (CACHE[url]) return CACHE[url];
  try {
    const res = await axios.get(url, { timeout: 5000 });
    CACHE[url] = res.data;
    return res.data;
  } catch {
    return typeof fallback === 'function' ? fallback() : fallback;
  }
};

/** Hook for all countries summary list */
export const useCountries = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchWithFallback(
      `${API_BASE}/countries`,
      () => COUNTRIES_DATA.map((c, i) => ({
        ...c,
        rli_2019: c.mean_rli,
        rank: i + 1,
      }))
    )
      .then(d => { setData(d); setError(null); })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

/** Hook for full country profile */
export const useCountryProfile = (country) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!country) return;
    setLoading(true);
    const encoded = encodeURIComponent(country);
    fetchWithFallback(
      `${API_BASE}/countries/${encoded}/profile`,
      null
    )
      .then(d => { setData(d); setError(null); })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [country]);

  return { data, loading, error };
};

/** Hook for dataset statistics */
export const useDatasetStats = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithFallback(`${API_BASE}/dataset/stats`, DATASET_STATS)
      .then(d => setData(d))
      .finally(() => setLoading(false));
  }, []);

  return { data: data || DATASET_STATS, loading };
};

/** Hook for years list */
export const useYears = () => {
  const [years] = useState(
    Array.from({ length: 19 }, (_, i) => 2001 + i)
  );
  return { years };
};

/** Hook for full dataset with filters */
export const useDataset = ({ country, yearMin, yearMax, page = 1, pageSize = 25 } = {}) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page, page_size: pageSize });
    if (country) params.set('country', country);
    if (yearMin) params.set('year_min', yearMin);
    if (yearMax) params.set('year_max', yearMax);

    fetchWithFallback(`${API_BASE}/dataset?${params}`, { data: [], total: 0 })
      .then(res => {
        setData(Array.isArray(res) ? res : res.data || []);
        setTotal(res.total || 0);
        setError(null);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [country, yearMin, yearMax, page, pageSize]);

  return { data, total, loading, error };
};

/** Hook for country comparison */
export const useCountryComparison = (countryA, countryB) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryA || !countryB) return;
    setLoading(true);
    const params = new URLSearchParams({ a: countryA, b: countryB });
    fetchWithFallback(`${API_BASE}/countries/compare?${params}`, null)
      .then(d => { setData(d); setError(null); })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [countryA, countryB]);

  return { data, loading, error };
};

/** Hook for country rankings */
export const useCountryRankings = (year, metric = 'RLI') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithFallback(
      `${API_BASE}/countries/rankings?year=${year}&metric=${metric}`,
      COUNTRIES_DATA.sort((a, b) => b.mean_rli - a.mean_rli)
    )
      .then(d => setData(d))
      .finally(() => setLoading(false));
  }, [year, metric]);

  return { data, loading };
};

/** Hook for global RLI trend */
export const useGlobalTrend = () => {
  const [data, setData] = useState(GLOBAL_RLI_TREND);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWithFallback(`${API_BASE}/dataset/global-trend`, GLOBAL_RLI_TREND)
      .then(d => setData(d || GLOBAL_RLI_TREND));
  }, []);

  return { data, loading };
};

/** Hook for species list */
export const useSpecies = (filters = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWithFallback(`${API_BASE}/species`, null)
      .then(d => { setData(d); setError(null); })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

/** Hook for ML research data */
export const useMLData = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWithFallback(`${API_BASE}/ml/${endpoint}`, null)
      .then(d => { setData(d); setError(null); })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { data, loading, error };
};

export default useCountries;
