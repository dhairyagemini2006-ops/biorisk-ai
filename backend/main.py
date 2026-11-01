from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import PredictionRequest, PredictionResponse
from model_manager import model_manager

app = FastAPI(
    title="BioRisk AI Biodiversity Intelligence API",
    description="Scientific API providing empirical Red List Index (RLI) prediction and research telemetry.",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "BioRisk AI Backend",
        "version": "2.0.0",
        "model_loaded": model_manager.model is not None,
        "metrics": model_manager.metrics
    }

@app.get("/api/health")
def health():
    return {"status": "ok", "api_online": True}

@app.get("/api/predict/model-info")
def model_info():
    return {
        "model_name": "Tuned Random Forest Regressor",
        "version": "tuned_rf_v1",
        "metrics": model_manager.metrics,
        "feature_importances": model_manager.feature_importances,
        "feature_names": model_manager.feature_names
    }

@app.post("/api/predict", response_model=PredictionResponse)
def predict_rli(req: PredictionRequest):
    try:
        predicted = model_manager.predict(req.dict())
        return PredictionResponse(
            predicted_rli=predicted,
            model_version="tuned_rf_v1",
            feature_importances=model_manager.feature_importances,
            inputs=req.dict(),
            warning="Country-level RLI metric only. Never equate with individual animal survival."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
