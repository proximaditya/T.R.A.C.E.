# T.R.A.C.E. Python Assurance SDK (`trace-ai-security`)
### Zero-Trust Computer Vision Integrity Assurance Engine for Data, Models, and Inference

[![Python](https://img.shields.io/badge/Python-3.9%20%7C%203.10%20%7C%203.11%20%7C%203.12%20%7C%203.14-blue.svg)](https://github.com/proximaditya/T.R.A.C.E.)
[![Cryptography](https://img.shields.io/badge/Crypto-ECDSA%20SECP256k1-green.svg)](https://github.com/proximaditya/T.R.A.C.E.)
[![License](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)

---

## ⚡ 1-Line Terminal Installation

Anyone can install the SDK globally into any Python environment directly from GitHub:

```bash
pip install git+https://github.com/proximaditya/T.R.A.C.E.git#subdirectory=sdk
```

---

## 🖥️ Terminal CLI & Interactive Guide

Once installed, T.R.A.C.E. provides an interactive terminal command line interface:

### 1. View the Complete Terminal Guide
```bash
trace-ai guide
# or
python -m trace_engine guide
```

### 2. Run the Live 3-Pillar Operational Simulation
Runs a live end-to-end interactive demo right in your terminal (data scanning, model weight checks, and real-time cryptographic tamper detection):
```bash
trace-ai demo
# or
python -m trace_engine demo
```

### 3. CLI Command Reference

| Command | Description | Example |
| :--- | :--- | :--- |
| `trace-ai guide` | Display comprehensive terminal cheatsheet and architecture | `trace-ai guide` |
| `trace-ai demo` | Live interactive demonstration of all 3 security pillars | `trace-ai demo` |
| `trace-ai bind` | Cryptographically sign an inference record with ECDSA SECP256k1 | `trace-ai bind --object "T-90 Tank" --confidence 98.4` |
| `trace-ai verify` | Mathematically verify a canonical payload or catch tampering | `trace-ai verify --payload record.json --signature <sig> --key <key>` |
| `trace-ai scan` | Scan a dataset manifest for duplicate flooding & anomalies | `trace-ai scan --dataset "COCO-DRONE-01"` |
| `trace-ai audit` | Audit model weights for Gaussian normality & Trojan backdoors | `trace-ai audit --model "YOLOv8.onnx" --access-level white_box` |

---

## 🐍 Python Library Quickstart

You can import T.R.A.C.E. using `trace_engine`, `trace_ai`, or `vision_shield`:

```python
from trace_engine import ProvenanceBinder, FakePreferenceDetector, ModelAuditor
```

### Pillar 1: Data Integrity & Near-Duplicate Flooding Detection
```python
from trace_engine import FakePreferenceDetector

detector = FakePreferenceDetector(contamination_rate=0.08)

# Scan a dataset manifest across multiple contributors
report = detector.scan_dataset(
    samples=["frame_001.jpg", "frame_002_synth.jpg", "frame_003_dup.jpg"],
    contributor_mapping={
        "frame_001.jpg": "FIELD_UNIT_NORTH",
        "frame_002_synth.jpg": "EXTERNAL_VENDOR_SIGINT",
        "frame_003_dup.jpg": "CONTRACTOR_GEO_03",
    }
)

print("Scan ID:", report["scan_id"])
print("Clean Count:", report["clean_count"])
print("Quarantine Count:", report["quarantine_count"])
print("Contributor Risk:", report["source_risk_assessments"])
```

### Pillar 2: Model Weight Integrity & Backdoor Audit
```python
from trace_engine import ModelAuditor

auditor = ModelAuditor(baseline_variance_threshold=5.0)

# White-box audit (inspects layer weight parameters for Gaussian normality)
audit_report = auditor.audit_model(
    model_input="YOLOv8-Drone-Detect.onnx",
    access_level="white_box",
)

print("Model SHA-256:", audit_report["model_hash"])
print("Integrity Status:", audit_report["integrity_status"])       # VERIFIED / ATTESTED
print("Backdoor Scan Status:", audit_report["backdoor_scan_status"]) # CLEAR
print("Spectral Probe Score:", audit_report["spectral_trigger_probe_score"])
```

### Pillar 3: Cryptographic Inference Provenance & Tamper Lab
```python
from trace_engine import ProvenanceBinder

# Initialize with sovereign SECP256k1 military enclave keypair
binder = ProvenanceBinder()

# Bind sensor image, model weight hash, and prediction into canonical record
record = binder.bind_inference(
    image_input="sensor_recce_01.jpg",
    model_hash="7a91f01c9b4e321ad8f1027c9b8841a2e4d00f4a819b9c03fa9128574921bdf6",
    inference_data={
        "object": "T-90 Main Battle Tank",
        "confidence": 0.984,
        "camera_node": "CAM-DELTA-01",
    }
)

print("ECDSA Signature:", record["signature"])
print("Payload Digest:", record["payload_hash"])

# 1. Positive Verification (Authentic payload)
auth_check = ProvenanceBinder.verify_provenance(
    canonical_payload=record["canonical_payload"],
    signature_hex=record["signature"],
    public_key_hex=record["public_key"],
)
print("Authentic Verification Valid:", auth_check["valid"])  # True

# 2. Adversarial Tamper Attack (Altered target class)
tampered_payload = dict(record["canonical_payload"])
tampered_payload["inference"] = {"object": "Civilian Tractor", "confidence": 0.984}

tamper_check = ProvenanceBinder.verify_provenance(
    canonical_payload=tampered_payload,
    signature_hex=record["signature"],
    public_key_hex=record["public_key"],
)
print("Tampered Verification Valid:", tamper_check["valid"])  # False
print("Status:", tamper_check["status"])  # TAMPERED: SIGNATURE MISMATCH
```

---

## 🧪 Running the Offline Verification Test Suite
To execute the comprehensive 3-pillar physical verification suite in your terminal:

```bash
python test_sdk_user_experience.py
```
This builds physical images, extracts perceptual hashes, runs IsolationForest scoring, audits model weights, and executes 3 simulated adversarial attacks.
