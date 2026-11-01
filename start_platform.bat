@echo off
echo ========================================================
echo        BIORISK AI - FULL-STACK PLATFORM LAUNCHER
echo ========================================================
echo.

echo [1/3] Launching Python FastAPI Backend on port 8000...
start "BioRisk AI Backend (FastAPI)" cmd /k "cd /d %~dp0backend && C:\Users\ASUS\AppData\Local\Programs\Python\Python312\python.exe -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload"

timeout /t 3 /nobreak >nul

echo [2/3] Launching Vite React Frontend on port 5173...
start "BioRisk AI Frontend (React)" cmd /k "cd /d %~dp0frontend && npm run dev"

timeout /t 3 /nobreak >nul

echo [3/3] Creating Public Live Internet Tunnel...
echo.
echo ========================================================
echo  Your project is live!
echo  Local URL:        http://localhost:5173
echo  Backend API Docs: http://localhost:8000/docs
echo ========================================================
echo.

"%~dp0cloudflared.exe" tunnel --url http://localhost:5173
pause
