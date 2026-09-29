"""
T.R.A.C.E. Crypto Backend Server Runner
Runs Uvicorn on port 8000.
"""

import sys
import os
import uvicorn

if __name__ == "__main__":
    # Ensure current directory is in sys.path
    current_dir = os.path.dirname(os.path.abspath(__file__))
    if current_dir not in sys.path:
        sys.path.insert(0, current_dir)

    print("[T.R.A.C.E.] Starting Cryptographic Backend & AI Assurance Server...")
    print("[T.R.A.C.E.] Listening on http://127.0.0.1:8000")
    print("[T.R.A.C.E.] Interactive API Documentation: http://127.0.0.1:8000/docs")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=False)
