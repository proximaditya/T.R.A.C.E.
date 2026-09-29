# T.R.A.C.E. (Tamper-Proof Record & AI Compliance Engine)
### Trustworthy Computer Vision Integrity Assurance for Data, Models, and Inference Outputs in Multi-Contributor Pipelines

[![MoD / Indian Army](https://img.shields.io/badge/MoD%20%2F%20Indian%20Army-AI%20Assurance%20Framework-amber.svg)](https://github.com/proximaditya/T.R.A.C.E.)
[![Security Standard](https://img.shields.io/badge/Security-Zero--Trust%20Air--Gapped-green.svg)](https://github.com/proximaditya/T.R.A.C.E.)
[![Cryptography](https://img.shields.io/badge/Cryptography-ECDSA%20SECP256k1-blue.svg)](https://github.com/proximaditya/T.R.A.C.E.)
[![Framework](https://img.shields.io/badge/Frontend-Next.js%2015%20%7C%20React%2019-orange.svg)](https://github.com/proximaditya/T.R.A.C.E.)
[![Backend](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python%203.14-blueviolet.svg)](https://github.com/proximaditya/T.R.A.C.E.)
[![License](https://img.shields.io/badge/License-MIT-lightgrey.svg)](LICENSE)

> **"Trusted AI. Verified Intelligence. Zero-Trust Provenance."**

---

## 🛡️ Project Overview

**T.R.A.C.E.** is an enterprise-grade AI security and cryptographic compliance platform engineered for the **Ministry of Defence (MoD)** and the **Indian Army (DGIS)** for sovereign defense intelligence pipelines.

Operational computer vision systems in sovereign intelligence environments combine training data from multiple contributors, vendor-supplied pretrained models, and live battlefield inference outputs consumed by downstream fire-control and intelligence systems. Existing controls address only isolated fragments of this pipeline.

**T.R.A.C.E.** delivers a unified, evidence-based assurance layer operating **100% offline and in air-gapped environments**, eliminating blind trust across multi-contributor pipelines without requiring model retraining.

---

## 🚀 Key Capabilities

### 1. Training-Data Integrity & Contributor Risk
* **DailyBench / FPD Forensic Engine:** Dual-pathway pre-ingestion screening for **COCO** and **YOLO** dataset manifests.
* **Near-Duplicate Poison Flooding:** Evaluates perceptual hash Hamming distances (`imagehash.phash`) to detect poison clustering and duplicate insertion attacks.
* **Dual-Pathway Semantic Scanner:** Scikit-Learn `IsolationForest` on high-dimensional sensor noise entropy and spatial boundary gradient kurtosis.
* **Calibrated Threat Flags:**
  * `[CLEAN]` — Optical sensor noise and chromatic entropy conform to baseline.
  * `[QUARANTINE: LOCALIZED-MANIPULATION]` — Pixel boundary gradients indicate patch trigger or splice.
  * `[QUARANTINE: FULL-SYNTHESIS]` — Spectral frequency anomalies indicate generative AI diffusion / deepfake insertion.
  * `[FLAGGED: DUPLICATE FLOOD]` — Perceptual hash collision indicating poison flooding.
* **Multi-Contributor Risk Aggregation:** Aggregates sample anomalies into source-level risk profiles (`FIELD_UNIT_NORTH`, `EXTERNAL_VENDOR_SIGINT`, `CONTRACTOR_GEO_03`), recommending actionable dispositions (`ACCEPT`, `ENHANCED MONITORING`, `SUSPEND CONTRIBUTOR`).

### 2. Model Integrity & Backdoor Audit
* **Format Agnostic:** Natively ingests **ONNX** and **PyTorch/TorchScript** models.
* **White-Box Structural Audit:**
  * Weight distribution anomaly radar visualization (**2.8% variance** vs Gaussian baseline).
  * Spectral trigger probe (**97%**), Neural cleanse response (**100%**), Activation clustering (**94%**), and WaNet elastic warp resistance (**98%**).
* **Black-Box Behavioral Fallback:** Graceful fallback to NIST TrojAI reference query batteries when internal weights are restricted.

### 3. Inference Provenance & Output Integrity
* **Cryptographic Attestation:** Uses **ECDSA (SECP256k1)** and **SHA-256** content addressability.
* **Immutable Binding:** Links the sensor input image hash, model weight digest, inference output, UTC timestamp, and anti-replay nonce into a canonical payload.
* **Interactive Tamper Simulation:** Real-time demonstration where modifying the inference output triggers an immediate **`[TAMPERED: SIGNATURE MISMATCH]`** incident banner and isolates the record.

### 4. Distribution-Shift & Anomaly Assessment
* Distinguishes natural operational drift (seasonal, terrain, sensor degradation) from malicious adversarial manipulation with calibrated confidence metrics.

### 5. Analyst-Facing Assurance & Governance
* Generates evidence-based human-readable reports stating confidence, affected assets, and recommended dispositions (`ACCEPT`, `REVIEW`, `QUARANTINE`).
* Maintains an immutable, tamper-evident audit ledger and explicitly declares supported vs unsupported attack classes.

---

## 📂 Repository Architecture

```
T.R.A.C.E./
├── WEBtrace/               # Next.js 15 Military Command Center & Public Briefing
│   ├── app/
│   │   ├── page.tsx        # Public Briefing Landing Page (Hero, Counters, FAQ)
│   │   ├── globals.css     # Unified Dark/Light Military Design System
│   │   └── dashboard/      # Command Center Views
│   │       ├── page.tsx        # Command Overview (KPIs, Alerts, Chain Status)
│   │       ├── integrity/      # DailyBench FPD Forensic Scanner & Contributor Risk
│   │       ├── model-audit/    # White-Box vs Black-Box Anomaly Radar & Backdoor Audit
│   │       ├── ledger/         # Live Inference Feed, QR Code & Tamper Simulation
│   │       └── security/       # Hardware Key Enclave Status & Audit Logs
│   └── components/
│       ├── CommandShell.tsx          # Glassmorphic Header & Side-Rail Navigation
│       └── DashboardViews.tsx        # Interactive Operational Modules & Live API
│
├── sdk/                    # T.R.A.C.E. Python Assurance Engine
│   ├── setup.py            # Package configuration
│   ├── requirements.txt    # ecdsa, imagehash, scikit-learn, Pillow, numpy
│   ├── trace/              # Primary package
│   │   ├── cryptography.py # ProvenanceBinder (ECDSA SECP256k1 binding & verification)
│   │   └── fpd_scanner.py  # FakePreferenceDetector (DailyBench dual-pathway forensics)
│   └── vision_shield/      # Backward-compatible package alias
│
├── crypto_backend/         # FastAPI Air-Gapped REST API Microservice
│   ├── setup_backend.bat   # Windows setup script (venv + local SDK install)
│   ├── setup_backend.sh    # Linux/macOS setup script
│   ├── main.py             # REST endpoints (scan-dataset, audit-model, secure-inference)
│   └── run_server.py       # Uvicorn server runner (port 8000)
│
├── vercel.json             # Vercel monorepo deployment configuration
├── package.json            # Root build orchestration
├── LICENSE                 # MIT License
└── README.md               # Project documentation
```

---

## ⚡ Deployment on Vercel

To deploy the **T.R.A.C.E.** Command Center on **Vercel**:

1. Go to **[vercel.com/new](https://vercel.com/new)** and import **`proximaditya/T.R.A.C.E.`**.
2. In the **Configure Project** screen, click **Edit** next to **Root Directory**.
3. Select **`WEBtrace`** and click **Continue**.
4. Vercel will automatically detect **Next.js** with zero additional configuration needed.
5. Click **Deploy**!

> 💡 **Fixing Existing Vercel Project:**
> If you already created the project in Vercel:
> 1. Go to your project on Vercel: **Settings** → **General**.
> 2. Find **Root Directory**, click **Edit**, enter **`WEBtrace`**, and click **Save**.
> 3. Go to **Deployments** and click **Redeploy** (or push a new commit to trigger automatic deployment).

---

## 💻 Local Quickstart

### Prerequisites
* **Node.js** v18+ and **npm**
* **Python** 3.9+ (Python 3.10–3.14 supported)

### 1. Run the Next.js Command Center (Frontend)
```bash
cd WEBtrace
npm install
npm run dev
```
Open **`http://localhost:3000`** for the public briefing landing page, or **`http://localhost:3000/dashboard`** for the Sovereign Command Center.

### 2. Run the FastAPI Cryptographic Backend
```bash
cd crypto_backend

# Windows:
call setup_backend.bat
python run_server.py

# Linux/macOS:
chmod +x setup_backend.sh
./setup_backend.sh
python run_server.py
```
* **API Documentation (Swagger UI):** `http://127.0.0.1:8000/docs`
* **Health Check:** `http://127.0.0.1:8000/api/v1/health`

### 3. Using the Python SDK Directly
```python
from trace import ProvenanceBinder, FakePreferenceDetector

# 1. Cryptographic Binding
binder = ProvenanceBinder()
binding = binder.bind_inference(
    image_input="surveillance_frame_01.jpg",
    model_hash="7a91f01c9b4e321ad8f1027c9b8841a2e4d00f4a819b9c03fa9128574921bdf6",
    inference_data={"object": "T-90 Main Battle Tank", "confidence": 98.4},
)
print("ECDSA SECP256k1 Signature:", binding["signature"])

# 2. Tamper Verification
verification = ProvenanceBinder.verify_provenance(
    binding["canonical_payload"],
    binding["signature"],
    binding["public_key"]
)
print("Integrity Status:", verification["status"])  # [ECDSA SIGNATURE VERIFIED]

# 3. FPD Dataset Screening
detector = FakePreferenceDetector()
scan = detector.scan_dataset(["frame_01.jpg", "frame_02_synth.jpg", "frame_03_dup.jpg"])
print("Clean count:", scan["clean_count"], "| Quarantined:", scan["quarantine_count"])
```

---

## 🔒 Security Posture & Air-Gap Compliance

| Dimension | Specification |
| :--- | :--- |
| **Operational Network** | 100% Air-Gapped / Sovereign Enclave (Zero external cloud egress) |
| **Asymmetric Algorithm** | ECDSA curve SECP256k1 (256-bit prime field) |
| **Hashing Standard** | SHA-256 for input frames, canonical JSON, and parameter digests |
| **Model Architectures** | ONNX Runtime, PyTorch / TorchScript (CNN, ViT, YOLOv8) |
| **Dataset Standards** | COCO JSON format, YOLO TXT labels, image archives |
| **Hardware Enclave** | Compatible with PKCS#11 HSMs and TPM 2.0 cryptographic modules |

---

## 📄 License

This project is licensed under the terms of the [MIT License](LICENSE).
Designed for the **Ministry of Defence (MoD)** and **Indian Army (DGIS)** AI Assurance.
