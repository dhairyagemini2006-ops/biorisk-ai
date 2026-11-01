import { useState, useCallback } from 'react';
import axios from 'axios';
import useAppStore from '../store/appStore';

const API_BASE = '/api';

export const usePrediction = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const addPrediction = useAppStore(s => s.addPrediction);

  const predict = useCallback(async ({
    marine_protected,
    terrestrial_protected,
    forest_area,
    co2,
    total_vulnerable_species,
    country_name = '',
    year = null,
  }) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await axios.post(`${API_BASE}/predict`, {
        marine_protected: Number(marine_protected),
        terrestrial_protected: Number(terrestrial_protected),
        forest_area: Number(forest_area),
        co2: Number(co2),
        total_vulnerable_species: Number(total_vulnerable_species),
        country_name,
        year,
      }, { timeout: 10000 });

      const prediction = res.data;
      setResult(prediction);

      // Store in history
      addPrediction({
        predicted_rli: prediction.predicted_rli,
        country_name,
        year,
        inputs: { marine_protected, terrestrial_protected, forest_area, co2, total_vulnerable_species },
        model_version: prediction.model_version || 'tuned_rf_v1',
      });

      return prediction;
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || 'Prediction failed';
      setError(msg);

      // Fallback: simple linear estimate for demo when backend down
      const fallbackRLI = Math.min(0.99, Math.max(0.55,
        0.85
        + (marine_protected / 100) * 0.03
        + (terrestrial_protected / 100) * 0.02
        - (co2 / 1_000_000) * 0.05
        + (forest_area / 5_000_000) * 0.04
        - (total_vulnerable_species / 200_000) * 0.04
      ));

      const fallback = {
        predicted_rli: +fallbackRLI.toFixed(4),
        model_version: 'fallback_estimate',
        warning: 'Backend unavailable. This is a rough estimate only — do not use for research.',
        feature_importances: null,
        shap_values: null,
      };
      setResult(fallback);
      return fallback;
    } finally {
      setLoading(false);
    }
  }, [addPrediction]);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { predict, result, loading, error, reset };
};

export default usePrediction;
