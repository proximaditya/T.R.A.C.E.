#!/usr/bin/env bash
# ==============================================================================
# T.R.A.C.E. Crypto Backend Setup Script (Linux/macOS)
# ==============================================================================
set -e

echo "[TRACE] Setting up T.R.A.C.E. Crypto Backend environment..."

if [ ! -d ".venv" ]; then
    echo "[TRACE] Creating local virtual environment in .venv..."
    python3 -m venv .venv
fi

echo "[TRACE] Activating virtual environment..."
source .venv/bin/activate

echo "[TRACE] Installing dependencies (FastAPI, Uvicorn, Python-multipart)..."
pip install --upgrade pip
pip install fastapi uvicorn python-multipart pydantic

echo "[TRACE] Installing T.R.A.C.E. SDK locally (-e ../sdk)..."
pip install -e ../sdk

echo "[TRACE] Setup completed successfully!"
echo "To start the server: source .venv/bin/activate && python run_server.py"
