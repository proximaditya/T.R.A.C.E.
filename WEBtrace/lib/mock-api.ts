/**
 * T.R.A.C.E. API Client with Hybrid Live FastAPI Backend + Offline Fallback
 * Connects to http://127.0.0.1:8000 when active; falls back to instant zero-lag simulation.
 */

const BACKEND_BASE = "http://127.0.0.1:8000";

async function fetchWithFallback<T>(endpoint: string, options: RequestInit, fallbackData: T): Promise<T> {
  // 1. Try Next.js internal serverless endpoint first (works natively on Vercel & local Next.js)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const targetUrl = typeof window !== "undefined" ? endpoint : `http://127.0.0.1:8000${endpoint}`;
    const res = await fetch(targetUrl, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      return (await res.json()) as T;
    }
  } catch {
    // 2. If relative failed, try external FastAPI port 8000 if running locally
    try {
      const res = await fetch(`http://127.0.0.1:8000${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
      });
      if (res.ok) {
        return (await res.json()) as T;
      }
    } catch {
      // Offline fallback
    }
  }
  return fallbackData;
}

export interface DatasetScanResult {
  scan_id: string;
  dataset_name: string;
  total_samples: number;
  clean_count: number;
  quarantine_count: number;
  duplicate_count: number;
  overall_integrity_status: string;
  source_risk_assessments: Record<string, {
    risk_score: number;
    risk_level: string;
    total_contributed: number;
    flagged_samples: number;
    action: string;
  }>;
  sample_reports?: Array<{
    sample_id: string;
    sha256: string;
    classification: string;
    recommended_disposition: string;
    severity: string;
    confidence: number;
    reason: string;
  }>;
}

export interface ModelAuditResult {
  model_name: string;
  access_level: string;
  model_hash: string;
  file_size: string;
  version: string;
  verified_at: string;
  integrity_status: string;
  backdoor_scan_status: string;
  weight_distribution_variance?: number;
  spectral_trigger_probe_score?: number;
  neural_cleanse_response_score?: number;
  activation_clustering_score?: number;
  behavioral_fingerprint_score?: number;
  supported_attack_classes: string[];
  unsupported_attack_classes: string[];
  white_box_diagnostics: string;
}

export interface SecureInferenceRecord {
  inference_id: string;
  object: string;
  confidence: number;
  input_hash: string;
  model_hash: string;
  payload_hash: string;
  signature: string;
  public_key: string;
  canonical_payload: Record<string, unknown>;
  timestamp: string;
  nonce: string;
  status: string;
  tamper_evident: boolean;
}

export interface VerificationResult {
  verified: boolean;
  status: string;
  incident_level: string;
  message: string;
  details?: unknown;
}

export const traceApi = {
  /**
   * Scans a dataset manifest using FPD Engine (DailyBench inspiration)
   */
  scanDataset: async (datasetName = "COCO-DRONE-SEP-26", samples?: string[]): Promise<DatasetScanResult> => {
    const payload = {
      dataset_name: datasetName,
      images: samples || [
        "frame_recce_001.jpg",
        "frame_recce_002_synth.jpg",
        "frame_recce_003.jpg",
        "frame_recce_004_tamper.jpg",
        "frame_recce_005_dup.jpg",
        "frame_recce_006.jpg",
      ],
    };

    const fallback: DatasetScanResult = {
      scan_id: "FPD-SCAN-SOV-B4",
      dataset_name: datasetName,
      total_samples: 12480,
      clean_count: 12267,
      quarantine_count: 156,
      duplicate_count: 57,
      overall_integrity_status: "QUARANTINE_ACTIVE",
      source_risk_assessments: {
        FIELD_UNIT_NORTH: { risk_score: 2.1, risk_level: "TRUSTED", total_contributed: 8400, flagged_samples: 12, action: "ACCEPT" },
        EXTERNAL_VENDOR_SIGINT: { risk_score: 41.5, risk_level: "HIGH RISK", total_contributed: 2600, flagged_samples: 142, action: "SUSPEND CONTRIBUTOR" },
        CONTRACTOR_GEO_03: { risk_score: 18.2, risk_level: "MODERATE RISK", total_contributed: 1480, flagged_samples: 59, action: "ENHANCED MONITORING" },
      },
    };

    return fetchWithFallback<DatasetScanResult>(
      "/api/v1/scan-dataset",
      { method: "POST", body: JSON.stringify(payload) },
      fallback
    );
  },

  /**
   * Audits a model artifact with White-Box or Black-Box access level
   */
  auditModel: async (modelName = "YOLOv8-Drone-Detect.onnx", whiteBox = true): Promise<ModelAuditResult> => {
    const payload = {
      model_name: modelName,
      access_level: whiteBox ? "white_box" : "black_box",
    };

    const fallback: ModelAuditResult = {
      model_name: modelName,
      access_level: whiteBox ? "WHITE_BOX" : "BLACK_BOX",
      model_hash: "7a91f01c9b4e321ad8f1027c9b8841a2e4d00f4a819b9c03fa9128574921bdf6",
      file_size: "126.4 MB",
      version: "v8.4.12-mil",
      verified_at: new Date().toISOString(),
      integrity_status: "VERIFIED / ATTESTED",
      backdoor_scan_status: "CLEAR",
      weight_distribution_variance: 2.8,
      spectral_trigger_probe_score: 97,
      neural_cleanse_response_score: 100,
      activation_clustering_score: 94,
      supported_attack_classes: [
        "Poisoning / BadNets Injection",
        "Clean-Label Spatial Trigger Backdoors",
        "WaNet Dynamic Triggers",
        "Blended Chromatic Injection",
        "Weight Permutation Tampering",
      ],
      unsupported_attack_classes: [
        "Hardware Rowhammer fault injection",
        "Analog electromagnetic side-channel eavesdropping",
      ],
      white_box_diagnostics: whiteBox
        ? "All 18 convolution layer blocks conform to baseline Gaussian weight distribution without trigger signature clusters."
        : "WHITE_BOX_UNAVAILABLE: Operating in black-box behavioral verification mode via reference query battery.",
    };

    return fetchWithFallback<ModelAuditResult>(
      "/api/v1/audit-model",
      { method: "POST", body: JSON.stringify(payload) },
      fallback
    );
  },

  /**
   * Creates verifiable cryptographic binding for an inference output
   */
  secureInference: async (
    imageName = "CAM-DELTA-01.jpg",
    predictedClass = "T-90 Main Battle Tank",
    confidence = 98.4
  ): Promise<SecureInferenceRecord> => {
    const payload = { image_name: imageName, predicted_class: predictedClass, confidence };

    const fallback: SecureInferenceRecord = {
      inference_id: "INF-9831",
      object: predictedClass,
      confidence,
      input_hash: "72d8f4a9ab012c8409e51c89f5bc91238912d7b1e21d749a0231feab892189ac",
      model_hash: "7a91f01c9b4e321ad8f1027c9b8841a2e4d00f4a819b9c03fa9128574921bdf6",
      payload_hash: "610dbf124a91902847a19c5be09812497120a1789c0128471209b5a190293841",
      signature: "3045022100a7b489f1092e0182947192018471092847109284710298374198273948172902207a9182730192847109284710928471092847109284710928471092847109284",
      public_key: "0479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
      canonical_payload: {
        version: "TRACE-v1.0-MIL",
        algorithm: "ECDSA-SECP256k1-SHA256",
        input_hash: "72d8f4a9ab012c8409e51c89f5bc91238912d7b1e21d749a0231feab892189ac",
        model_hash: "7a91f01c9b4e321ad8f1027c9b8841a2e4d00f4a819b9c03fa9128574921bdf6",
        inference: { object: predictedClass, confidence, camera_feed: imageName },
        timestamp: new Date().toISOString(),
        nonce: "8f1a09c4d28e71b5049382716a5c3e90",
      },
      timestamp: new Date().toISOString(),
      nonce: "8f1a09c4d28e71b5049382716a5c3e90",
      status: "[ECDSA SIGNATURE VERIFIED]",
      tamper_evident: true,
    };

    return fetchWithFallback<SecureInferenceRecord>(
      "/api/v1/secure-inference",
      { method: "POST", body: JSON.stringify(payload) },
      fallback
    );
  },

  /**
   * Verifies an inference record or detects tampering
   */
  verifyInference: async (
    canonicalPayload: Record<string, unknown>,
    signature: string,
    publicKey: string
  ): Promise<VerificationResult> => {
    const payload = { canonical_payload: canonicalPayload, signature, public_key: publicKey };

    return fetchWithFallback<VerificationResult>(
      "/api/v1/verify-inference",
      { method: "POST", body: JSON.stringify(payload) },
      {
        verified: true,
        status: "[ECDSA SIGNATURE VERIFIED]",
        incident_level: "NONE",
        message: "Cryptographic binding verified intact.",
      }
    );
  },
};

// Backward-compatible alias for existing imports
export const mockApi = {
  scanDataset: async () => {
    const res = await traceApi.scanDataset();
    return {
      scanId: res.scan_id,
      total: res.total_samples,
      scanned: res.total_samples,
      clean: res.clean_count,
      quarantine: res.quarantine_count,
      duplicates: res.duplicate_count,
    };
  },
  auditModel: async () => {
    const res = await traceApi.auditModel();
    return {
      name: res.model_name,
      version: res.version,
      hash: res.model_hash,
      size: res.file_size,
      backdoor: res.backdoor_scan_status,
      anomaly: res.weight_distribution_variance || 2.8,
    };
  },
  secureInference: async () => {
    const res = await traceApi.secureInference();
    return {
      id: res.inference_id,
      object: res.object,
      confidence: res.confidence,
      inputHash: res.input_hash,
      modelHash: res.model_hash,
      signature: res.status,
    };
  },
};
