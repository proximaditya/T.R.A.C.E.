"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Copy,
  Database,
  ExternalLink,
  FileCheck2,
  KeyRound,
  Lock,
  LockKeyhole,
  Radio,
  RefreshCw,
  Server,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Terminal,
  UploadCloud,
  Zap,
} from "lucide-react";
import { traceApi, DatasetScanResult, ModelAuditResult, SecureInferenceRecord } from "@/lib/mock-api";
import styles from "./DashboardViews.module.css";

// Reusable Stat Card Component
const StatCard = ({
  label,
  value,
  delta,
  icon: Icon,
  variant = "normal",
}: {
  label: string;
  value: string | number;
  delta: string;
  icon?: any;
  variant?: "normal" | "warning" | "verified";
}) => (
  <article className={`card ${styles.statCard} ${styles[variant]}`}>
    <div className={styles.statHeader}>
      <span className={styles.statLabel}>{label}</span>
      {Icon && <Icon size={16} className={styles.statIcon} />}
    </div>
    <strong className={styles.statValue}>{value}</strong>
    <small className={styles.statDelta}>{delta}</small>
  </article>
);

// Progress Bar Component
const MetricsBar = ({
  label,
  value,
  color = "var(--amber)",
  unit = "%",
}: {
  label: string;
  value: number;
  color?: string;
  unit?: string;
}) => (
  <div className={styles.barRow}>
    <div className={styles.barLabelGroup}>
      <span className={styles.barLabel}>{label}</span>
      <b className={styles.barValue}>{value}{unit}</b>
    </div>
    <div className={styles.barTrack}>
      <div
        className={styles.barFill}
        style={{ width: `${Math.min(value, 100)}%`, backgroundColor: color }}
      />
    </div>
  </div>
);

// Header component for dashboard views
function ViewHead({
  code,
  title,
  copy,
}: {
  code: string;
  title: string;
  copy: string;
}) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toISOString().slice(11, 19) + " UTC");
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.viewHead}>
      <div>
        <div className="eyebrow">{code}</div>
        <h1 className="title">{title}</h1>
        <p className="muted">{copy}</p>
      </div>
      <div className={styles.clockCard}>
        <div className={styles.clockTime}>{time || "14:38:00 UTC"}</div>
        <div className={styles.clockMeta}>
          <span className={styles.clockDot} />
          NODE DEL-07 // ENCLAVE AIR-GAPPED
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// 1. Overview Dashboard
// -----------------------------------------------------------------------------
export function Overview() {
  const [verifiedModels, setVerifiedModels] = useState("07");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    traceApi.auditModel().then((res) => {
      if (res && res.model_name) setVerifiedModels("07");
    });
  }, []);

  const copyRootHash = () => {
    navigator.clipboard?.writeText("sha256:95d4c82b9a7146b281f08ca4391da401732e6a98f71295b34e12c1b7a08447a1");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className={styles.overviewHead}>
        <div>
          <div className="eyebrow">COMMAND OVERVIEW // SOVEREIGN ASSURANCE</div>
          <h1 className="title">
            Zero-trust assurance,<br />
            <em className={styles.goldText}>continuously verified.</em>
          </h1>
          <p className="muted">
            Real-time computer vision security posture for datasets, model weights, and live battlefield inference.
          </p>
        </div>
        <div className={styles.systemStatusBadge}>
          <CheckCircle2 size={24} className={styles.statusCheckIcon} />
          <div>
            <small>CRYPTOGRAPHIC DEFENSE STATUS</small>
            <b>ALL CONTROLS NOMINAL</b>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid - Multi-device responsive */}
      <section className={styles.statsGrid}>
        <StatCard label="VERIFIED MODELS" value={verifiedModels} delta="100% Attested (ONNX/Torch)" icon={BrainCircuit} />
        <StatCard label="DATASETS SCANNED" value="12,480" delta="COCO & YOLO Ingested" icon={Database} />
        <StatCard label="THREATS CONTAINED" value="213" delta="156 Quarantined / 57 Dups" icon={ShieldAlert} variant="warning" />
        <StatCard label="ACTIVE INFERENCES" value="48" delta="ECDSA SECP256k1 Signed" icon={Activity} variant="verified" />
      </section>

      {/* 2-Column Analytics Panels */}
      <section className={styles.grid2}>
        {/* Panel 1: Cryptographic Provenance Chain */}
        <article className={`card ${styles.panel}`}>
          <div className={styles.panelTitle}>
            <span>CRYPTOGRAPHIC VERIFICATION STATUS</span>
            <span className="tag verified">● CHAIN ACTIVE</span>
          </div>

          <div className={styles.cryptoRingWrapper}>
            <div className={styles.cryptoRing}>
              <div className={styles.cryptoRingText}>
                <b>100%</b>
                <small>ECDSA P-256</small>
              </div>
            </div>
            <div className={styles.cryptoRingMeta}>
              <h4>Zero-Trust Ledger Attestation</h4>
              <p className="muted">
                Every inference output is cryptographically chained to its sensor input hash and model parameter digest.
                Post-hoc alterations or replay insertions are mathematically impossible.
              </p>
            </div>
          </div>

          <div className={styles.rootHashBlock}>
            <div className={styles.hashLabelGroup}>
              <small>MILITARY ENCLAVE ROOT HASH</small>
              <button onClick={copyRootHash} className={styles.copyBtn} title="Copy Root Digest">
                <Copy size={12} />
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <code className="mono">sha256:95d4c82b9a7146b281f08ca4391da401732e6a98f71295b34e12c1b7a08447a1</code>
          </div>
        </article>

        {/* Panel 2: Real-time Security Alerts */}
        <article className={`card ${styles.panel}`}>
          <div className={styles.panelTitle}>
            <span>REAL-TIME SECURITY ALERTS</span>
            <span className="tag warning">03 ACTIVE ACTIONS</span>
          </div>

          <div className={styles.alertsList}>
            {[
              {
                title: "Localized pixel manipulation detected in DB-441",
                source: "FPD Engine // External Contributor SIGINT",
                time: "2 min ago",
                status: "AUTO-CONTAINED",
                severity: "danger",
              },
              {
                title: "Perceptual near-duplicate flood pattern isolated",
                source: "COCO-DRONE-09 // Batch #4",
                time: "14 min ago",
                status: "QUARANTINED",
                severity: "warning",
              },
              {
                title: "Cryptographic hardware key session refreshed",
                source: "Military Key Enclave HSM-02",
                time: "38 min ago",
                status: "NOMINAL",
                severity: "verified",
              },
            ].map((alert, i) => (
              <div className={styles.alertItem} key={i}>
                <AlertTriangle
                  size={16}
                  className={alert.severity === "danger" ? styles.redIcon : alert.severity === "warning" ? styles.amberIcon : styles.greenIcon}
                />
                <div className={styles.alertContent}>
                  <b>{alert.title}</b>
                  <div className={styles.alertMeta}>
                    <span>{alert.source}</span>
                    <span className={styles.metaDot}>•</span>
                    <span>{alert.time}</span>
                  </div>
                </div>
                <span className={`tag ${alert.severity === "danger" ? "danger" : alert.severity === "warning" ? "warning" : "verified"}`}>
                  {alert.status}
                </span>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* Recent Inference Activity Table */}
      <section className={`card ${styles.activitySection}`}>
        <div className={styles.panelTitle}>
          <span>RECENT INFERENCE ACTIVITY</span>
          <Link href="/dashboard/ledger" className={styles.viewLedgerLink}>
            Inspect Full Ledger <ArrowRight size={13} />
          </Link>
        </div>

        <div className={styles.activityTable}>
          {[
            { target: "T-90 Main Battle Tank", sensor: "CAM-DELTA-01", conf: 98.4, latency: "14ms", time: "14:38:42 UTC" },
            { target: "MQ-9 Reaper Class UAV", sensor: "CAM-DELTA-02", conf: 96.1, latency: "18ms", time: "14:38:39 UTC" },
            { target: "Mobile 3D Radar Unit", sensor: "CAM-DELTA-03", conf: 94.7, latency: "16ms", time: "14:38:31 UTC" },
            { target: "BMP-2 Armored Infantry", sensor: "CAM-DELTA-01", conf: 99.2, latency: "13ms", time: "14:38:25 UTC" },
          ].map((item, i) => (
            <div className={styles.activityRow} key={i}>
              <span className={styles.activityLed} />
              <b className={styles.activityTarget}>{item.target}</b>
              <span className={styles.activitySensor}>{item.sensor}</span>
              <span className={styles.activityConf}>{item.conf}% confidence</span>
              <span className={styles.activityTime}>{item.time}</span>
              <span className="tag verified">ECDSA VERIFIED</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// -----------------------------------------------------------------------------
// 2. Data Integrity / DailyBench (FPD Engine)
// -----------------------------------------------------------------------------
const sampleImages = [
  { name: "frame_001.jpg", status: "CLEAN", sha: "8a1e94bc72bd", reason: "Conforms to baseline noise & chromatic entropy." },
  { name: "frame_002_synth.jpg", status: "QUARANTINE: FULL-SYNTHESIS", sha: "3c94ea129f01", reason: "Anomalous frequency spectrum. Generative diffusion artifact." },
  { name: "frame_003.jpg", status: "CLEAN", sha: "91fb443810ae", reason: "Sensor noise distribution verified nominal." },
  { name: "frame_004_tamper.jpg", status: "QUARANTINE: LOCALIZED-MANIPULATION", sha: "7a213e990b5a", reason: "High boundary gradient spike. Suspected patch trigger injection." },
  { name: "frame_005_dup.jpg", status: "FLAGGED: DUPLICATE FLOOD", sha: "28e1904bbd12", reason: "pHash collision (dist: 1). Duplicate poison flooding attempt." },
  { name: "frame_006.jpg", status: "CLEAN", sha: "54a9381e04cf", reason: "Natural sensor optics verified." },
];

export function Integrity() {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<DatasetScanResult | null>(null);

  const runScan = async () => {
    setScanning(true);
    setScanResult(null);
    try {
      const res = await traceApi.scanDataset("COCO-DRONE-SEP-26");
      setScanResult(res);
    } catch {
      // Handled by client fallback
    } finally {
      setScanning(false);
    }
  };

  return (
    <>
      <ViewHead
        code="DAILYBENCH / FPD FORENSIC SCANNER"
        title="Data Integrity Assurance"
        copy="Dual-pathway forensic screening for COCO and YOLO datasets before model ingestion. Detects near-duplicate flooding and synthetic manipulations."
      />

      <section className={styles.grid2}>
        {/* Upload Manifest Card */}
        <article className={`card ${styles.uploadCard}`}>
          <UploadCloud size={38} className={styles.uploadIcon} />
          <h3>Submit CV Dataset Manifest</h3>
          <p className="muted">
            Ingest COCO JSON annotations, YOLO TXT labels, or raw frame archives (max 50 GB air-gapped stream).
          </p>
          <div className={styles.uploadActions}>
            <button className="btn" onClick={runScan} disabled={scanning}>
              {scanning ? (
                <>
                  <RefreshCw size={14} className={styles.spinIcon} />
                  Running FPD Scan…
                </>
              ) : (
                "Scan Dataset Package"
              )}
            </button>
            <span className={styles.manifestFormatTag}>FORMAT: COCO / YOLOv8</span>
          </div>
        </article>

        {/* Scan Telemetry Progress Card */}
        <article className={`card ${styles.panel}`}>
          <div className={styles.panelTitle}>
            <span>FPD SCAN TELEMETRY</span>
            <span className={`tag ${scanResult ? "verified" : "warning"}`}>
              {scanning ? "ANALYZING DUAL PATHWAY" : scanResult ? "SCAN COMPLETE" : "AWAITING MANIFEST"}
            </span>
          </div>

          <div className={styles.progressContainer}>
            <div
              className={styles.progressBar}
              style={{ width: scanning ? "72%" : scanResult ? "100%" : "0%" }}
            />
          </div>

          <p className="mono muted">
            {scanning
              ? "Scanning spatial gradients, pHash collisions, and IsolationForest feature anomalies..."
              : scanResult
              ? `COMPLETED // MANIFEST ID: ${scanResult.scan_id}`
              : "Ready. Click 'Scan Dataset Package' to run dual-pathway detection."}
          </p>

          <div className={styles.miniStatsRow}>
            <div>
              <strong>{scanResult ? scanResult.clean_count.toLocaleString() : "12,267"}</strong>
              <small>CLEAN SAMPLES</small>
            </div>
            <div>
              <strong className={styles.redText}>{scanResult ? scanResult.quarantine_count : "156"}</strong>
              <small>QUARANTINE</small>
            </div>
            <div>
              <strong className={styles.amberText}>{scanResult ? scanResult.duplicate_count : "57"}</strong>
              <small>DUPLICATE FLOOD</small>
            </div>
          </div>
        </article>
      </section>

      {/* Contributor / Source-Level Risk Aggregation */}
      <section className={`card ${styles.panel} ${styles.contributorSection}`}>
        <div className={styles.panelTitle}>
          <span>SOURCE & CONTRIBUTOR RISK AGGREGATION</span>
          <span className="tag warning">MULTI-CONTRIBUTOR EVALUATION</span>
        </div>
        <p className="muted">
          Individual sample anomalies are aggregated into a source-level risk profile
          to identify compromised data pipelines or malicious external contractors.
        </p>

        <div className={styles.contributorGrid}>
          {[
            { id: "FIELD_UNIT_NORTH", total: "8,400", flagged: "12", score: "2.1%", risk: "TRUSTED", action: "ACCEPT", tag: "verified" },
            { id: "EXTERNAL_VENDOR_SIGINT", total: "2,600", flagged: "142", score: "41.5%", risk: "HIGH RISK", action: "SUSPEND CONTRIBUTOR", tag: "danger" },
            { id: "CONTRACTOR_GEO_03", total: "1,480", flagged: "59", score: "18.2%", risk: "MODERATE RISK", action: "ENHANCED MONITORING", tag: "warning" },
          ].map((c) => (
            <div className={styles.contributorCard} key={c.id}>
              <div className={styles.contributorHead}>
                <b>{c.id}</b>
                <span className={`tag ${c.tag}`}>{c.risk}</span>
              </div>
              <div className={styles.contributorStats}>
                <div>Contributed: <span>{c.total}</span></div>
                <div>Flagged: <span className={c.tag === "danger" ? styles.redText : ""}>{c.flagged}</span></div>
                <div>Risk Score: <b>{c.score}</b></div>
              </div>
              <div className={styles.contributorAction}>
                <small>RECOMMENDED ACTION:</small>
                <strong>{c.action}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image Inspection Grid */}
      <section className={styles.inspectionSection}>
        <div className={styles.panelTitle}>
          <span>IMAGE INSPECTION FORENSIC GRID</span>
          <span className="mono muted">DATASET: COCO-DRONE-SEP-26 // SAMPLES</span>
        </div>

        <div className={styles.inspectionGrid}>
          {sampleImages.map((sample, i) => (
            <article key={i} className={`card ${styles.inspectionCard}`}>
              <div className={styles.imageWrapper}>
                <img
                  src={`https://picsum.photos/seed/trace-fpd-${i + 42}/460/280`}
                  alt={`Sample ${sample.name}`}
                  className={styles.inspectionImg}
                />
                <span
                  className={`tag ${
                    sample.status === "CLEAN"
                      ? "verified"
                      : sample.status.includes("QUARANTINE")
                      ? "danger"
                      : "warning"
                  } ${styles.floatingTag}`}
                >
                  [{sample.status}]
                </span>
              </div>
              <div className={styles.inspectionDetails}>
                <div className={styles.sampleName}>{sample.name}</div>
                <div className={styles.sampleReason}>{sample.reason}</div>
                <div className={styles.sampleDigest}>SHA-256: {sample.sha}…</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

// -----------------------------------------------------------------------------
// 3. Model Audit
// -----------------------------------------------------------------------------
export function ModelAudit() {
  const [whiteBox, setWhiteBox] = useState(true);
  const [auditData, setAuditData] = useState<ModelAuditResult | null>(null);

  useEffect(() => {
    traceApi.auditModel("YOLOv8-Drone-Detect.onnx", whiteBox).then(setAuditData);
  }, [whiteBox]);

  return (
    <>
      <ViewHead
        code="MODEL ASSURANCE // ARTIFACT AUDIT"
        title="Model Weight & Behavioral Audit"
        copy="Attests structural weight distributions, activation statistics, and trigger backdoor resistance across ONNX and PyTorch/TorchScript models."
      />

      {/* Model Artifact Info Banner */}
      <section className={`card ${styles.modelHero}`}>
        <div className={styles.modelHeroInfo}>
          <div className={styles.modelStatusBadge}>
            <span className="tag verified">REGISTERED / ATTESTED</span>
            <span className="mono muted">ONNX RUNTIME MIL-SPEC</span>
          </div>
          <h2>YOLOv8-Drone-Detect.onnx</h2>
          <p className="mono muted">
            SHA-256: 7a91f01c9b4e321ad8f1027c9b8841a2e4d00f4a819b9c03fa9128574921bdf6 • 126.4 MB • v8.4.12-mil
          </p>
        </div>

        {/* White-Box vs Black-Box Access Toggle */}
        <div className={styles.accessToggleWrapper}>
          <span className={styles.toggleLabel}>ACCESS LEVEL:</span>
          <div className={styles.accessToggle}>
            <button
              className={!whiteBox ? styles.toggleActive : ""}
              onClick={() => setWhiteBox(false)}
            >
              Black-Box Access
            </button>
            <button
              className={whiteBox ? styles.toggleActive : ""}
              onClick={() => setWhiteBox(true)}
            >
              White-Box Access
            </button>
          </div>
        </div>
      </section>

      {/* Audit Visualizations Grid */}
      <section className={styles.grid2}>
        {/* Panel 1: Weight Distribution Radar */}
        <article className={`card ${styles.panel}`}>
          <div className={styles.panelTitle}>
            <span>WEIGHT DISTRIBUTION ANOMALY RADAR</span>
            <span className="tag verified">2.8% VARIANCE (NOMINAL)</span>
          </div>

          <div className={styles.radarWrapper}>
            <div className={styles.radarGraphic}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={styles.radarRing}
                  style={{ width: `${i * 20}%`, height: `${i * 20}%` }}
                />
              ))}
              <div className={styles.radarSweep} />
              <div className={styles.radarCenter}>
                <b>NOMINAL</b>
                <small>Δ 2.8%</small>
              </div>
            </div>
          </div>

          <p className="muted">
            {whiteBox
              ? "All 18 convolution layer blocks conform to baseline Gaussian weight distribution without abnormal parameter clustering."
              : "WHITE-BOX RESTRICTED: Weight tensors inaccessible. Running output behavioral fingerprinting against NIST TrojAI reference battery."}
          </p>
        </article>

        {/* Panel 2: Trigger Backdoor Scan Battery */}
        <article className={`card ${styles.panel}`}>
          <div className={styles.panelTitle}>
            <span>TRIGGER-BASED BACKDOOR SCAN</span>
            <span className="tag verified">CLEAR // NO BACKDOOR</span>
          </div>

          <div className={styles.barsContainer}>
            <MetricsBar label="Spectral Trigger Probe" value={97} color="var(--green)" />
            <MetricsBar label="Neural Cleanse Response" value={100} color="var(--green)" />
            <MetricsBar label="Activation Clustering" value={94} color="var(--blue)" />
            <MetricsBar label="WaNet Warp Resistance" value={98} color="var(--amber)" />
          </div>

          <div className={styles.auditTimestamp}>
            <span>AUDIT ASSURANCE TIMESTAMP:</span>
            <b>{auditData?.verified_at ? auditData.verified_at.slice(0, 19) + "Z" : "2026-09-29T14:04:16Z"}</b>
          </div>
        </article>
      </section>

      {/* Coverage Statement & Attack Classes */}
      <section className={`card ${styles.panel} ${styles.coverageCard}`}>
        <div className={styles.panelTitle}>
          <span>EXPLICIT ASSURANCE COVERAGE STATEMENT</span>
          <span className="tag verified">AIR-GAPPED AUDIT COMPLIANT</span>
        </div>
        <div className={styles.coverageGrid}>
          <div className={styles.coverageCol}>
            <h4 className={styles.coverageHeadGreen}>SUPPORTED ATTACK CLASSES (VERIFIED)</h4>
            <ul className={styles.coverageList}>
              <li>✓ Clean-label spatial trigger injections (BadNets, TrojAI)</li>
              <li>✓ WaNet dynamic non-rigid elastic warping triggers</li>
              <li>✓ Near-duplicate flooding and poison label flipping</li>
              <li>✓ Generative synthetic insertions (Diffusion / GAN deepfakes)</li>
              <li>✓ Model weight permutation and post-training parameter substitution</li>
            </ul>
          </div>
          <div className={styles.coverageCol}>
            <h4 className={styles.coverageHeadMuted}>KNOWN LIMITATIONS & ASSUMPTIONS</h4>
            <ul className={styles.coverageList}>
              <li>⚠ Hardware Rowhammer bit-flip attacks during execution (requires ECC memory)</li>
              <li>⚠ Physical analog sensor spoofing prior to camera ADC digitization</li>
              <li>⚠ Black-box assessments cannot inspect internal neuron activation geometry</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

// -----------------------------------------------------------------------------
// 4. Live Inference Ledger & Interactive Tamper Simulation
// -----------------------------------------------------------------------------
export function Ledger() {
  const [tampered, setTampered] = useState(false);
  const [liveRecord, setLiveRecord] = useState<SecureInferenceRecord | null>(null);

  useEffect(() => {
    traceApi.secureInference().then(setLiveRecord);
  }, []);

  const originalRecord = {
    object: "T-90 Main Battle Tank",
    confidence: 98.4,
    camera_node: "CAM-DELTA-01",
    timestamp: "2026-09-29T14:38:42.712Z",
    input_hash: "72d8f4a9ab012c8409e51c89f5bc91238912d7b1e21d749a0231feab892189ac",
    model_hash: "7a91f01c9b4e321ad8f1027c9b8841a2e4d00f4a819b9c03fa9128574921bdf6",
    signature_algorithm: "ECDSA-SECP256k1",
  };

  const displayedJson = JSON.stringify(
    {
      ...originalRecord,
      confidence: tampered ? 61.2 : originalRecord.confidence,
      object: tampered ? "Civilian Utility Truck [MUTATED]" : originalRecord.object,
      tamper_event_detected: tampered,
    },
    null,
    2
  );

  return (
    <>
      <ViewHead
        code="CRYPTOGRAPHIC INFERENCE LEDGER // ZERO-TRUST"
        title="Live Provenance Ledger"
        copy="Every battlefield computer vision prediction is cryptographically bound to the camera input hash, model weight digest, and signed via ECDSA SECP256k1."
      />

      <section className={`${styles.ledgerWrapper} ${tampered ? styles.tamperActive : ""}`}>
        {/* Tamper Incident High-Visibility Banner */}
        {tampered && (
          <div className={styles.tamperIncidentBanner}>
            <ShieldAlert size={20} />
            <div>
              <strong>HIGH-SEVERITY SECURITY INCIDENT: [TAMPERED: SIGNATURE MISMATCH]</strong>
              <p>
                Inference payload was altered post-generation. Output hash mismatch detected against ECDSA SECP256k1
                attestation. Record isolated and automatic dissemination blocked.
              </p>
            </div>
          </div>
        )}

        <article className={`card ${styles.ledgerCard}`}>
          <div className={styles.panelTitle}>
            <span className={styles.liveHeading}>
              INFERENCE #INF-9831 <span className={styles.liveTag}>● LIVE AIR-GAPPED STREAM</span>
            </span>
            <span className="mono muted">CAM-DELTA-01 // SECTOR-7</span>
          </div>

          <div className={styles.ledgerGrid}>
            {/* Surveillance Frame & Detection Overlay */}
            <div className={styles.frameContainer}>
              <div className={styles.frameOverlayWrapper}>
                <img
                  src="https://picsum.photos/seed/drone-tank/760/430"
                  alt="Drone Surveillance Feed"
                  className={styles.frameImage}
                />
                <div className={`${styles.targetBoundingBox} ${tampered ? styles.tamperedBox : ""}`}>
                  <span>
                    TRACK 07 // {tampered ? "TAMPERED CLASSIFICATION" : "T-90 MBT"}{" "}
                    <b>{tampered ? "61.2%" : "98.4%"}</b>
                  </span>
                </div>
              </div>

              {/* Interactive Tamper Simulation Button */}
              <div className={styles.tamperControlRow}>
                <button
                  className={`btn ${tampered ? "" : "secondary"}`}
                  onClick={() => setTampered(!tampered)}
                >
                  {tampered ? (
                    <>
                      <CheckCircle2 size={15} />
                      Restore Verified Payload
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={15} />
                      Simulate Tampering Attack
                    </>
                  )}
                </button>
                <span className={styles.tamperHint}>
                  {tampered
                    ? "Altered JSON payload triggers immediate signature mismatch alert."
                    : "Simulates adversary modifying inference confidence or target class."}
                </span>
              </div>
            </div>

            {/* Cryptographic Provenance Attestation Card */}
            <div className={styles.provenanceCard}>
              <div className={styles.provenanceHeader}>
                <LockKeyhole size={16} />
                <span>CRYPTOGRAPHIC PROVENANCE</span>
              </div>

              {/* QR Verification Block */}
              <div className={styles.qrBlock}>
                <div className={styles.qrCode} title="Verifiable Military QR Digest">
                  <div className={styles.qrGraphic}>
                    <span>■■ ■■</span>
                    <span>■ ■ ■</span>
                    <span>■■ ■■</span>
                  </div>
                </div>
                <div className={styles.qrText}>
                  <b>SCAN-TO-VERIFY</b>
                  <small>ECDSA P-256 Signature Key</small>
                </div>
              </div>

              {/* Hashes & Digests */}
              <div className={styles.hashList}>
                <div className={styles.hashRow}>
                  <small>INPUT SENSOR SHA-256</small>
                  <b>72d8f4a9ab012c8409e51c89f5bc91238912d7b1e21d749a0231feab892189ac</b>
                </div>
                <div className={styles.hashRow}>
                  <small>MODEL WEIGHT SHA-256</small>
                  <b>7a91f01c9b4e321ad8f1027c9b8841a2e4d00f4a819b9c03fa9128574921bdf6</b>
                </div>
                <div className={styles.hashRow}>
                  <small>TIMESTAMP (UTC)</small>
                  <b>2026-09-29T14:38:42.712Z</b>
                </div>
              </div>

              {/* Signature Verification State Tag */}
              <div className={styles.signatureBadgeRow}>
                <span className={`tag ${tampered ? "danger" : "verified"}`}>
                  {tampered ? "[TAMPERED: SIGNATURE MISMATCH]" : "[ECDSA SIGNATURE VERIFIED]"}
                </span>
              </div>
            </div>
          </div>

          {/* Canonical Payload JSON View */}
          <div className={styles.jsonWrapper}>
            <div className={styles.jsonHeader}>
              <span>CANONICAL PAYLOAD INSPECTOR</span>
              <span className="mono muted">{tampered ? "CORRUPTED HASH" : "AUTHENTICATED HASH"}</span>
            </div>
            <pre className={`${styles.jsonPre} ${tampered ? styles.jsonTampered : ""}`}>
              {displayedJson}
            </pre>
          </div>
        </article>
      </section>
    </>
  );
}

// -----------------------------------------------------------------------------
// 5. System / Security Status
// -----------------------------------------------------------------------------
export function Security() {
  return (
    <>
      <ViewHead
        code="SECURITY POSTURE & AUDIT TRAIL"
        title="System Security Attestation"
        copy="Continuous zero-trust verification across hardware cryptographic enclaves, model registries, and tamper-evident audit logs."
      />

      <section className={styles.statsGrid}>
        <StatCard label="CONTROL HEALTH" value="100%" delta="12 of 12 Controls Active" icon={ShieldCheck} variant="verified" />
        <StatCard label="THREAT LEVEL" value="GUARDED" delta="3 Contained Events" icon={AlertTriangle} variant="warning" />
        <StatCard label="KEY ROTATION" value="19 DAYS" delta="Next Scheduled Cycle" icon={KeyRound} />
        <StatCard label="LEDGER UPTIME" value="99.998%" delta="Air-Gapped Sovereign Node" icon={Server} variant="verified" />
      </section>

      <section className={styles.grid2}>
        {/* Cryptographic Controls */}
        <article className={`card ${styles.panel}`}>
          <div className={styles.panelTitle}>
            <span>CRYPTOGRAPHIC CONTROL STATE</span>
            <FileCheck2 color="var(--green)" size={18} />
          </div>

          <div className={styles.controlList}>
            {[
              { name: "ECDSA SECP256k1 Signing Engine", status: "VERIFIED", state: "verified" },
              { name: "SHA-256 Content Addressability", status: "VERIFIED", state: "verified" },
              { name: "Hardware Key Enclave (HSM / TPM 2.0)", status: "NOMINAL", state: "verified" },
              { name: "Immutable Append-Only Audit Ledger", status: "ATTESTED", state: "verified" },
              { name: "Sovereign Air-Gap Isolation Protocol", status: "ENFORCED", state: "verified" },
            ].map((c) => (
              <div className={styles.controlRow} key={c.name}>
                <CheckCircle2 size={16} className={styles.greenIcon} />
                <span>{c.name}</span>
                <span className={`tag ${c.state}`}>{c.status}</span>
              </div>
            ))}
          </div>
        </article>

        {/* Audit Events Ledger */}
        <article className={`card ${styles.panel}`}>
          <div className={styles.panelTitle}>
            <span>RECENT AUDIT TRAIL EVENTS</span>
            <span className="tag warning">3 ACTIONED</span>
          </div>

          <div className={styles.eventList}>
            {[
              { time: "14:31:04Z", desc: "Dataset DB-441 quarantined for synthetic artifacts", action: "AUTO-CONTAINED", type: "warning" },
              { time: "14:26:12Z", desc: "Session elevation token attested by DGIS officer", action: "ATTESTED", type: "verified" },
              { time: "14:18:55Z", desc: "Model registry manifest SHA-256 renewed", action: "VERIFIED", type: "verified" },
              { time: "14:02:10Z", desc: "FPD near-duplicate hash index re-calibrated", action: "NOMINAL", type: "verified" },
            ].map((ev, i) => (
              <div className={styles.eventRow} key={i}>
                <span className={styles.eventTime}>{ev.time}</span>
                <b className={styles.eventDesc}>{ev.desc}</b>
                <span className={`tag ${ev.type}`}>{ev.action}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
