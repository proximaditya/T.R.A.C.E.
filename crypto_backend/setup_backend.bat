@echo off
REM ==============================================================================
REM T.R.A.C.E. Crypto Backend Setup Script (Windows)
REM Creates local virtual environment, installs dependencies and local SDK
REM ==============================================================================

echo [TRACE] Setting up T.R.A.C.E. Crypto Backend environment...

if not exist ".venv" (
    echo [TRACE] Creating local virtual environment in .venv...
    py -3.14 -m venv .venv 2>nul || python -m venv .venv
)

echo [TRACE] Activating virtual environment...
call .venv\Scripts\activate.bat

echo [TRACE] Upgrading pip...
python -m pip install --upgrade pip

echo [TRACE] Installing dependencies (FastAPI, Uvicorn, Python-multipart)...
pip install fastapi uvicorn python-multipart pydantic

echo [TRACE] Installing T.R.A.C.E. SDK locally (-e ../sdk)...
pip install -e ..\sdk

echo ==============================================================================
echo [TRACE] Setup completed successfully!
echo To run the server:
echo   call .venv\Scripts\activate.bat
echo   python run_server.py
echo ==============================================================================
