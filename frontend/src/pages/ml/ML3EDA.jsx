import React from 'react';
import { DATASET_STATS } from '../../utils/staticData';

export default function ML3EDA() {
  return (
    <div className="bio-card">
      <h3>ML.3 Exploratory Data Analysis & Statistical Distributions</h3>
      <p style={{ color: 'var(--text-secondary)' }}>
        Empirical parametric statistics calculated directly from the training dataset.
      </p>

      <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
        <table className="bio-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Mean</th>
              <th>Median</th>
              <th>Standard Deviation</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>RLI (Target)</td><td>0.890</td><td>0.910</td><td>0.095</td></tr>
            <tr><td>Marine Protected (%)</td><td>10.48%</td><td>5.48%</td><td>11.46%</td></tr>
            <tr><td>Terrestrial Protected (%)</td><td>19.95%</td><td>17.77%</td><td>8.59%</td></tr>
            <tr><td>CO₂ Emissions (kt)</td><td>214,918</td><td>68,000</td><td>269,355</td></tr>
            <tr><td>Vulnerable Species</td><td>41,995</td><td>31,084</td><td>40,364</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
