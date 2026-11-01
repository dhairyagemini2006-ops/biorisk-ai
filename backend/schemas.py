from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class PredictionRequest(BaseModel):
    marine_protected: float = Field(..., ge=0, le=100)
    terrestrial_protected: float = Field(..., ge=0, le=100)
    forest_area: float = Field(..., ge=0)
    co2: float = Field(..., ge=0)
    total_vulnerable_species: float = Field(..., ge=0)
    country_name: Optional[str] = "Generic Profile"
    year: Optional[int] = 2026

class PredictionResponse(BaseModel):
    predicted_rli: float
    model_version: str
    feature_importances: Dict[str, float]
    inputs: Dict[str, Any]
    warning: Optional[str] = None
