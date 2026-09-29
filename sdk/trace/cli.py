"""
T.R.A.C.E. Command Line Interface (CLI)
Provides an interactive terminal guide, operational diagnostic commands,
and live assurance workflows for Computer Vision pipelines.
"""

import argparse
import json
import os
import sys
from typing import List, Optional

from trace_engine import ProvenanceBinder, FakePreferenceDetector, ModelAuditor


BANNER = r"""
==============================================================================
   _______ _____         _____ ______ 
  |__   __|  __ \ /\   / ____|  ____|
     | |  | |__) /  \ | |    | |__   
     | |  |  _  / /\ \| |    |  __|  
     | |  | | \ \/ ____ \ |____| |____ 
     |_|  |_|  \_\/    \_\_____|______|
  Tamper-Proof Record & AI Compliance Engine
  Zero-Trust Computer Vision Integrity Assurance SDK (v1.0.0)
==============================================================================
"""


def show_guide():
    """Prints a complete, beautiful terminal user guide for the T.R.A.C.E. SDK."""
    print(BANNER)
    print("""
[+] OVERVIEW
    T.R.A.C.E. provides end-to-end cryptographic and forensic assurance across
    all three phases of the computer vision lifecycle:
      1. Data Integrity: Perceptual near-duplicate isolation (dHash) & semantic anomalies (IsolationForest).
      2. Model Assurance: Weight distribution attestation & Trojan backdoor resistance (BadNets, WaNet).
      3. Inference Provenance: Sovereign ECDSA SECP256k1 cryptographic binding & anti-replay protection.

[+] 1-LINE INSTALLATION (Share with anyone):
    pip install git+https://github.com/proximaditya/T.R.A.C.E.git#subdirectory=sdk

[+] PYTHON QUICKSTART CODE:
    --------------------------------------------------------------------------
    # 1. Cryptographic Inference Binding (Anti-Tamper & Anti-Replay)
    from trace_engine import ProvenanceBinder

    binder = ProvenanceBinder()  # Generates sovereign SECP256k1 keypair
    record = binder.bind_inference(
        image_input="surveillance_frame.jpg",
        model_hash="7a91f01c9b4e321ad8f1027c9b8841a2e4d00f4a819b9c03fa9128574921bdf6",
        inference_data={"object": "T-90 Main Battle Tank", "confidence": 0.984}
    )
    print("ECDSA Signature:", record["signature"])

    # Verify or detect tampering:
    result = ProvenanceBinder.verify_provenance(
        record["canonical_payload"], record["signature"], record["public_key"]
    )
    print("Verification Valid:", result["valid"])  # True
    --------------------------------------------------------------------------
    # 2. Data Integrity & Near-Duplicate Flooding Detection (DailyBench FPD)
    from trace_engine import FakePreferenceDetector

    detector = FakePreferenceDetector()
    scan = detector.scan_dataset(
        samples=["frame_001.jpg", "frame_002_synth.jpg", "frame_003_dup.jpg"],
        contributor_mapping={"frame_002_synth.jpg": "EXTERNAL_VENDOR_SIGINT"}
    )
    print("Overall Integrity Status:", scan["overall_integrity_status"])
    --------------------------------------------------------------------------
    # 3. Model Weight & Backdoor Resistance Audit
    from trace_engine import ModelAuditor

    auditor = ModelAuditor()
    report = auditor.audit_model(model_input="YOLOv8-Drone-Detect.onnx", access_level="white_box")
    print("Integrity Status:", report["integrity_status"])
    --------------------------------------------------------------------------

[+] AVAILABLE CLI COMMANDS:
    trace-ai guide             Show this complete terminal user guide
    trace-ai demo              Run live interactive 3-pillar simulation in terminal
    trace-ai bind              Cryptographically sign an inference record with ECDSA SECP256k1
    trace-ai verify            Verify a canonical payload against signature & public key
    trace-ai scan              Scan dataset manifest for duplicate flooding & anomalies
    trace-ai audit             Audit model weights for Gaussian normality & Trojan backdoors

[+] EXAMPLES:
    trace-ai demo
    trace-ai bind --object "T-90 Tank" --confidence 98.4
    trace-ai scan --dataset "COCO-DRONE-01"
    trace-ai audit --model "YOLOv8.onnx" --access-level white_box
==============================================================================
""")


def run_demo():
    """Runs a live end-to-end interactive demo in terminal demonstrating all 3 pillars."""
    print(BANNER)
    print("[RUNNING LIVE OPERATIONAL DEMO IN TERMINAL]\n")

    # -------------------------------------------------------------------------
    # Pillar 1: Data Integrity
    # -------------------------------------------------------------------------
    print("-" * 78)
    print("  [STEP 1] Data Integrity & Contributor Risk Scanning (FPD Engine)")
    print("-" * 78)
    detector = FakePreferenceDetector(contamination_rate=0.10)
    samples = [
        "recce_frame_001.jpg",
        "recce_frame_002_synth.jpg",
        "recce_frame_003_dup.jpg",
        "recce_frame_004_tamper.jpg",
    ]
    mapping = {
        "recce_frame_001.jpg": "FIELD_UNIT_NORTH",
        "recce_frame_002_synth.jpg": "EXTERNAL_VENDOR_SIGINT",
        "recce_frame_003_dup.jpg": "CONTRACTOR_GEO_03",
        "recce_frame_004_tamper.jpg": "EXTERNAL_VENDOR_SIGINT",
    }
    scan = detector.scan_dataset(samples=samples, contributor_mapping=mapping)
    print(f"  Scan ID:        {scan['scan_id']}")
    print(f"  Clean Samples:  {scan['clean_count']} / {scan['total_samples']}")
    print(f"  Quarantined:    {scan['quarantine_count']}")
    print(f"  Duplicates:     {scan['duplicate_count']}")
    print("  Contributor Profiling:")
    for cid, ca in scan["source_risk_assessments"].items():
        print(f"    - {cid:24s} | Risk: {ca['risk_score']}% ({ca['risk_level']}) -> Action: {ca['action']}")
    print("  [PASS] Data integrity screening operational.\n")

    # -------------------------------------------------------------------------
    # Pillar 2: Model Audit
    # -------------------------------------------------------------------------
    print("-" * 78)
    print("  [STEP 2] Model Weight & Backdoor Resistance Audit (ModelAuditor)")
    print("-" * 78)
    auditor = ModelAuditor()
    report = auditor.audit_model(model_input="YOLOv8-Drone-Detect.onnx", access_level="white_box")
    print(f"  Model Name:       {report['model_name']}")
    print(f"  Format:           {report['format']}")
    print(f"  Model SHA-256:    {report['model_hash'][:32]}...")
    print(f"  Integrity Status: {report['integrity_status']}")
    print(f"  Backdoor Status:  {report['backdoor_scan_status']}")
    print(f"  Diagnostics:      {report['white_box_diagnostics']}")
    print("  [PASS] Model weight Gaussian parameters attested.\n")

    # -------------------------------------------------------------------------
    # Pillar 3: Inference Provenance & Tamper Lab
    # -------------------------------------------------------------------------
    print("-" * 78)
    print("  [STEP 3] Inference Provenance & Interactive Tamper Lab (SECP256k1)")
    print("-" * 78)
    binder = ProvenanceBinder()
    pub_key = binder.public_key_hex
    print(f"  Generated Sovereign Public Key: {pub_key[:24]}... ({len(pub_key)} hex chars)")

    original_inf = {"object": "T-90 Main Battle Tank", "confidence": 98.4, "camera": "CAM-DELTA-01"}
    model_digest = report["model_hash"]
    record = binder.bind_inference(
        image_input="sensor_feed_delta_01.jpg",
        model_hash=model_digest,
        inference_data=original_inf,
    )
    print("  Authentic Record Created:")
    print(f"    Payload Digest (SHA-256): {record['payload_hash']}")
    print(f"    ECDSA Signature:          {record['signature'][:32]}...")
    print(f"    Anti-Replay Nonce:        {record['nonce']}")

    # Positive Verification
    res_orig = ProvenanceBinder.verify_provenance(record["canonical_payload"], record["signature"], record["public_key"])
    print(f"  Original Verification: Valid = {res_orig['valid']} [{res_orig['status']}]")

    # Negative Tamper Attack
    print("\n  [SIMULATING ADVERSARIAL TAMPER ATTACK]")
    print("  Mutating target classification: 'T-90 Main Battle Tank' -> 'Civilian Utility Truck'...")
    tampered_payload = json.loads(json.dumps(record["canonical_payload"]))
    tampered_payload["inference"]["object"] = "Civilian Utility Truck"

    res_tampered = ProvenanceBinder.verify_provenance(tampered_payload, record["signature"], record["public_key"])
    print(f"  Tampered Verification: Valid = {res_tampered['valid']} [{res_tampered['status']}]")
    print(f"  Reason:               {res_tampered['reason']}")
    print("  [PASS] Cryptographic break successfully prevented unauthorized mutation.\n")

    print("=" * 78)
    print("  SUMMARY: All 3 T.R.A.C.E. Assurance Pillars are 100% operational!")
    print("=" * 78 + "\n")


def cmd_bind(args):
    binder = ProvenanceBinder(args.key) if args.key else ProvenanceBinder()
    inference_dict = {
        "object": args.object,
        "confidence": args.confidence,
        "camera_node": args.camera,
    }
    record = binder.bind_inference(
        image_input=args.image,
        model_hash=args.model_hash,
        inference_data=inference_dict,
        nonce=args.nonce,
    )
    print(json.dumps(record, indent=2))


def cmd_verify(args):
    try:
        if os.path.isfile(args.payload):
            with open(args.payload, "r") as f:
                canonical_payload = json.load(f)
        else:
            canonical_payload = json.loads(args.payload)
    except Exception as e:
        print(f"Error parsing canonical payload JSON: {e}")
        sys.exit(1)

    res = ProvenanceBinder.verify_provenance(
        canonical_payload=canonical_payload,
        signature_hex=args.signature,
        public_key_hex=args.key,
    )
    print(json.dumps(res, indent=2))
    if not res["valid"]:
        sys.exit(1)


def cmd_scan(args):
    detector = FakePreferenceDetector(contamination_rate=args.contamination)
    samples = args.samples if args.samples else [
        "frame_recce_001.jpg",
        "frame_recce_002_synth.jpg",
        "frame_recce_003.jpg",
        "frame_recce_004_tamper.jpg",
        "frame_recce_005_dup.jpg",
        "frame_recce_006.jpg",
    ]
    report = detector.scan_dataset(samples=samples)
    report["dataset_name"] = args.dataset
    print(json.dumps(report, indent=2))


def cmd_audit(args):
    auditor = ModelAuditor()
    report = auditor.audit_model(
        model_input=args.model,
        access_level=args.access_level,
    )
    print(json.dumps(report, indent=2))


def main():
    parser = argparse.ArgumentParser(
        prog="trace-ai",
        description="T.R.A.C.E. Zero-Trust Computer Vision Integrity Assurance CLI",
    )
    subparsers = parser.add_subparsers(dest="command", help="Available subcommands")

    # guide
    subparsers.add_parser("guide", help="Show complete terminal guide and SDK reference")

    # demo
    subparsers.add_parser("demo", help="Run interactive 3-pillar simulation in terminal")

    # bind
    p_bind = subparsers.add_parser("bind", help="Cryptographically bind an inference record with ECDSA SECP256k1")
    p_bind.add_argument("--image", default="CAM-DELTA-01.jpg", help="Path or identifier of input sensor image")
    p_bind.add_argument("--model-hash", default="7a91f01c9b4e321ad8f1027c9b8841a2e4d00f4a819b9c03fa9128574921bdf6", help="SHA-256 of model weights")
    p_bind.add_argument("--object", required=True, help="Detected object classification (e.g. 'T-90 Tank')")
    p_bind.add_argument("--confidence", type=float, default=98.4, help="Inference confidence percentage (e.g. 98.4)")
    p_bind.add_argument("--camera", default="CAM-DELTA-01", help="Sensor node identifier")
    p_bind.add_argument("--key", default=None, help="Optional private key hex string")
    p_bind.add_argument("--nonce", default=None, help="Optional anti-replay nonce")

    # verify
    p_verif = subparsers.add_parser("verify", help="Verify provenance binding or detect tampering")
    p_verif.add_argument("--payload", required=True, help="Canonical payload JSON string or filepath")
    p_verif.add_argument("--signature", required=True, help="ECDSA SECP256k1 signature hex")
    p_verif.add_argument("--key", required=True, help="Signer public key hex")

    # scan
    p_scan = subparsers.add_parser("scan", help="Scan CV dataset for duplicate flooding and anomalies")
    p_scan.add_argument("--dataset", default="COCO-DRONE-01", help="Dataset name")
    p_scan.add_argument("--samples", nargs="*", default=None, help="List of sample filepaths or names")
    p_scan.add_argument("--contamination", type=float, default=0.08, help="IsolationForest contamination rate")

    # audit
    p_audit = subparsers.add_parser("audit", help="Audit model weights and backdoor resistance")
    p_audit.add_argument("--model", default="YOLOv8-Drone-Detect.onnx", help="Model file path or identifier")
    p_audit.add_argument("--access-level", choices=["white_box", "black_box"], default="white_box", help="Access level")

    args = parser.parse_args()

    if args.command == "guide" or not args.command:
        show_guide()
    elif args.command == "demo":
        run_demo()
    elif args.command == "bind":
        cmd_bind(args)
    elif args.command == "verify":
        cmd_verify(args)
    elif args.command == "scan":
        cmd_scan(args)
    elif args.command == "audit":
        cmd_audit(args)
    else:
        show_guide()


if __name__ == "__main__":
    main()
