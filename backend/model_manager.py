import os
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

DATA_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "biodiversity_combined_dataset.csv"))

class ModelManager:
    def __init__(self):
        self.model = None
        self.feature_names = [
            'Marine_Protected',
            'Terrestrial_Protected',
            'Forest_Area',
            'CO2',
            'Total_Vulnerable_Species'
        ]
        self.metrics = {}
        self.feature_importances = {}
        self.train_model()

    def train_model(self):
        if not os.path.exists(DATA_PATH):
            print(f"Dataset path {DATA_PATH} not found!")
            return

        df = pd.read_csv(DATA_PATH)
        df_clean = df.dropna(subset=['RLI'] + self.feature_names).copy()
        
        # Ensure numeric
        for col in self.feature_names + ['RLI']:
            df_clean[col] = pd.to_numeric(df_clean[col], errors='coerce')
        df_clean = df_clean.dropna(subset=['RLI'] + self.feature_names)

        X = df_clean[self.feature_names]
        y = df_clean['RLI']

        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        # Tuned hyperparameters confirmed from research notebook
        self.model = RandomForestRegressor(
            n_estimators=100,
            max_depth=20,
            min_samples_split=15,
            min_samples_leaf=2,
            max_features='sqrt',
            random_state=42,
            n_jobs=-1
        )
        self.model.fit(X_train, y_train)

        preds = self.model.predict(X_test)
        self.metrics = {
            "r2": float(r2_score(y_test, preds)),
            "mae": float(mean_absolute_error(y_test, preds)),
            "rmse": float(np.sqrt(mean_squared_error(y_test, preds)))
        }

        self.feature_importances = {
            name: float(imp) for name, imp in zip(self.feature_names, self.model.feature_importances_)
        }
        print("Model trained successfully! Metrics:", self.metrics)

    def predict(self, features_dict):
        if self.model is None:
            self.train_model()

        input_vector = np.array([[
            features_dict['marine_protected'],
            features_dict['terrestrial_protected'],
            features_dict['forest_area'],
            features_dict['co2'],
            features_dict['total_vulnerable_species']
        ]])
        
        val = float(self.model.predict(input_vector)[0])
        return min(1.0, max(0.0, val))

model_manager = ModelManager()
