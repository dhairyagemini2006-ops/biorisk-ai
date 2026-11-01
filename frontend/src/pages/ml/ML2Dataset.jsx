import React from 'react';

export default function ML2Dataset() {
  return (
    <div className="bio-card">
      <h3>ML.2 Dataset Architecture & Feature Engineering</h3>
      <p style={{ color: 'var(--text-secondary)' }}>
        The master dataset consolidates 5 disparate scientific sources merged on Country and Year keys into <code>biodiversity_combined_dataset.csv</code> (1,710 total rows).
      </p>

      <div style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
        <table className="bio-table">
          <thead>
            <tr>
              <th>Feature Identifier</th>
              <th>Data Type</th>
              <th>Role</th>
              <th>Origin Source</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Country</td><td>Categorical</td><td>Jurisdiction Key</td><td>OECD Spatial</td></tr>
            <tr><td>Year</td><td>Integer</td><td>Temporal Key</td><td>2001 - 2019</td></tr>
            <tr><td>Marine_Protected</td><td>Float</td><td>Predictor 1</td><td>OECD Protected Area DB</td></tr>
            <tr><td>Terrestrial_Protected</td><td>Float</td><td>Predictor 2</td><td>UNEP-WCMC</td></tr>
            <tr><td>Forest_Area</td><td>Float</td><td>Predictor 3</td><td>FAO Forest Assessment</td></tr>
            <tr><td>CO2</td><td>Float</td><td>Predictor 4</td><td>Kaggle CO₂ Repository</td></tr>
            <tr><td>Total_Vulnerable_Species</td><td>Float</td><td>Predictor 5</td><td>OECD Red List Aggregation</td></tr>
            <tr><td>RLI</td><td>Float</td><td>Target Variable</td><td>IUCN Red List Index</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
