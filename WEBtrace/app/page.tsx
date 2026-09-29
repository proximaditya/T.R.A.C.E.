"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Check,
  ChevronDown,
  Database,
  ExternalLink,
  Lock,
  Menu,
  Moon,
  Radio,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sun,
  Terminal as TerminalIcon,
  X,
  Zap,
} from "lucide-react";
import styles from "./page.module.css";

const faqs = [
  {
    q: "What does T.R.A.C.E. verify across the AI lifecycle?",
    a: "T.R.A.C.E. creates an immutable cryptographic binding among the input image (SHA-256), the exact model weight digest, preprocessing configurations, and the inference output. It verifies data integrity pre-training, model structure post-compilation, and inference authenticity in real time.",
  },
  {
    q: "Can T.R.A.C.E. operate on completely air-gapped military networks?",
    a: "Yes. The entire assurance stack, including the DailyBench/FPD forensic scanner, SECP256k1 cryptographic engine, and local inference ledger, runs 100% offline with zero external cloud dependencies or API phone-homes.",
  },
  {
    q: "How does T.R.A.C.E. detect data poisoning and backdoor triggers?",
    a: "Using a dual-pathway approach: Pathway 1 leverages perceptual hashing (imagehash) for near-duplicate poison flooding and sample clustering; Pathway 2 utilizes isolation forest anomaly detection on spatial gradient kurtosis and noise entropy to detect localized pixel manipulation and generative AI synthesis.",
  },
  {
    q: "How does the platform handle Black-Box vs White-Box model access?",
    a: "Under white-box access, T.R.A.C.E. executes tensor weight distribution checks, spectral trigger probes, and activation clustering. When restricted to black-box access, it falls back gracefully to reference query batteries and behavioral input-output attestation.",
  },
  {
    q: "What happens when an inference record is tampered with?",
    a: "Any post-hoc alteration of the target class, bounding coordinates, or confidence immediately breaks the ECDSA SECP256k1 digital signature, generating a high-severity security event: [TAMPERED: SIGNATURE MISMATCH], isolating the record and preventing downstream fire-control actuation.",
  },
];

function AnimatedCounter({ end, label, prefix = "", suffix = "+" }: { end: number; label: string; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.ceil(end / 40);
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className={styles.counterCard}>
      <b className={styles.counterNumber}>
        {prefix}{count.toLocaleString()}{suffix}
      </b>
      <span className={styles.counterLabel}>{label}</span>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("trace-theme");
      const lightPref = saved === "light";
      setIsLight(lightPref);
      applyTheme(lightPref);
    } catch {}
    setMounted(true);

    const onScroll = () => setShowTopBtn(window.scrollY > 380);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const applyTheme = (lightMode: boolean) => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (lightMode) {
        root.setAttribute("data-theme", "light");
        document.body.classList.add("light");
      } else {
        root.setAttribute("data-theme", "dark");
        document.body.classList.remove("light");
      }
    }
  };

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    applyTheme(next);
    try {
      localStorage.setItem("trace-theme", next ? "light" : "dark");
    } catch {}
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <main className={styles.landingSite}>
      {/* Fixed Glassmorphic Navigation Bar */}
      <header className={styles.navBar}>
        <div className={styles.navBrand}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoPrefix}>T.</span>
            <span className={styles.logoAccent}>R.A.C.E.</span>
          </Link>
          <span className={styles.navClassification}>
            <span className={styles.navDot} />
            DGIS // RESTRICTED // PS-26228
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ""}`}>
          <a href="#overview" onClick={() => setMenuOpen(false)}>Overview</a>
          <a href="#capabilities" onClick={() => setMenuOpen(false)}>Capabilities</a>
          <a href="#architecture" onClick={() => setMenuOpen(false)}>Architecture</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <Link href="/dashboard" className="btn" onClick={() => setMenuOpen(false)}>
            <span>Command Center</span>
            <ArrowRight size={14} />
          </Link>
        </nav>

        {/* Header Right Actions */}
        <div className={styles.navActions}>
          <button
            onClick={toggleTheme}
            className={styles.themeBtn}
            aria-label={isLight ? "Switch to Military Dark mode" : "Switch to Clean Light mode"}
            title={isLight ? "Switch to Dark mode" : "Switch to Light mode"}
          >
            {mounted && isLight ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <button
            className={styles.mobileToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Hero Section with Ambient Laser & Monospace Terminal */}
      <section className={styles.heroSection} id="overview">
        <div className={styles.cyberGrid} />
        <div className={styles.ambientOrb} />

        <div className={styles.heroContent}>
          <div className="eyebrow">// DGIS SOVEREIGN AI ASSURANCE FRAMEWORK</div>
          <h1 className={styles.heroHeading}>
            Trusted AI.<br />
            <em className={styles.goldEm}>Verified Intelligence.</em><br />
            Zero-Trust Provenance.
          </h1>
          <p className={styles.heroLede}>
            T.R.A.C.E. (Tamper-Proof Record and AI Compliance Engine) is an enterprise-grade AI security
            platform designed for the Indian Ministry of Defence. It verifies the integrity of training datasets,
            neural model weights, and live battlefield inference outputs using cryptographic attestation.
          </p>

          <div className={styles.heroCtaGroup}>
            <Link href="/dashboard" className="btn">
              <span>Launch Command Center</span>
              <ArrowRight size={16} />
            </Link>
            <a href="#capabilities" className="btn secondary">
              <span>Explore 5 Core Capabilities</span>
            </a>
          </div>

          {/* Interactive Military Terminal Card */}
          <div className={styles.terminalCard}>
            <div className={styles.terminalHeader}>
              <div className={styles.terminalDots}>
                <span />
                <span />
                <span />
              </div>
              <span className={styles.terminalTitle}>dgis@del-07:~/trace-assurance</span>
              <span className={styles.terminalStatus}>AIR-GAPPED</span>
            </div>
            <div className={styles.terminalBody}>
              <span className={styles.termPrompt}>trace@sovereign:~$</span> trace-verify --scope=all --provenance=ecdsa-secp256k1<br />
              <span className={styles.termOutput}>[INDEXING] DailyBench FPD Engine: 12,480 samples processed... OK</span><br />
              <span className={styles.termOutput}>[AUDITING] Model YOLOv8-Drone-Detect.onnx: Tensor variance 2.8%... NOMINAL</span><br />
              <b className={styles.termSuccess}>✓ 12,480 ASSETS ATTESTED. 0 UNAUTHORIZED MUTATIONS. ZERO-TRUST CHAIN VERIFIED.</b>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Statistics Counter Section */}
      <section className={styles.countersSection}>
        <div className={styles.countersGrid}>
          <AnimatedCounter end={12480} label="CV DATASET SAMPLES SCANNED" />
          <AnimatedCounter end={99} suffix=".8%" label="INTEGRITY ATTESTATION CONFIDENCE" />
          <AnimatedCounter end={48} label="ACTIVE SENSOR INFERENCE STREAMS" />
          <AnimatedCounter end={213} label="ADVERSARIAL THREATS CONTAINED" />
        </div>
      </section>

      {/* 5 Core Capabilities (Defense-in-Depth Grid) */}
      <section id="capabilities" className={styles.contentSection}>
        <div className="eyebrow">01 // DEFENCE-IN-DEPTH</div>
        <h2 className={styles.sectionHeading}>
          Trust is not assumed. <em className={styles.goldEm}>It is mathematically proven.</em>
        </h2>
        <p className="muted">
          Operational computer vision pipelines combine training data from multiple contributors, vendor-supplied
          models, and inference outputs consumed by downstream fire-control and intelligence systems.
        </p>

        <div className={styles.capabilitiesGrid}>
          {[
            {
              id: "01",
              title: "Training-Data Integrity (FPD)",
              desc: "Identify trigger injection, label flipping, near-duplicate flooding, and generative synthetic insertions across COCO and YOLO formats before training begins.",
              icon: Database,
              link: "/dashboard/integrity",
            },
            {
              id: "02",
              title: "Model Weight & Backdoor Audit",
              desc: "Assess whether models exhibit anomalous or backdoor-like behavior using spectral trigger probes, neural cleanse batteries, and parameter statistics under white-box or black-box modes.",
              icon: BrainCircuit,
              link: "/dashboard/model-audit",
            },
            {
              id: "03",
              title: "Inference Provenance Ledger",
              desc: "Create an immutable cryptographic binding among input image hashes, model parameter digests, and predictions signed with ECDSA SECP256k1 keys.",
              icon: Activity,
              link: "/dashboard/ledger",
            },
            {
              id: "04",
              title: "Distribution-Shift Assessment",
              desc: "Detect material deviations from declared reference distributions caused by terrain, season, sensor drift, or acquisition conditions with calibrated risk scores.",
              icon: Radio,
              link: "/dashboard/security",
            },
            {
              id: "05",
              title: "Analyst Assurance & Governance",
              desc: "Every flag provides human-readable supporting evidence, confidence scores, affected assets, and recommended dispositions with tamper-evident audit logs.",
              icon: ShieldCheck,
              link: "/dashboard/security",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.id} className={`card ${styles.capCard}`}>
                <div className={styles.capHead}>
                  <span className={styles.capNumber}>{item.id}</span>
                  <Icon size={22} className={styles.capIcon} />
                </div>
                <h3>{item.title}</h3>
                <p className="muted">{item.desc}</p>
                <Link href={item.link} className={styles.capLink}>
                  <span>Access Module</span>
                  <ArrowRight size={13} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* Sovereign Air-Gapped Architecture Section */}
      <section id="architecture" className={styles.archSection}>
        <div className={styles.archContent}>
          <div className="eyebrow">02 // SOVEREIGN AIR-GAPPED DEPLOYMENT</div>
          <h2 className={styles.sectionHeading}>Engineered for sovereign intelligence environments.</h2>
          <p className="muted">
            From a signed dataset manifest to a defensible inference record, T.R.A.C.E. maintains an unbroken
            chain-of-custody without exposing sensitive military intelligence to external cloud services or foreign APIs.
          </p>

          <div className={styles.archPoints}>
            {[
              "100% Offline execution in air-gapped enclaves",
              "SECP256k1 cryptographic binding prevents replay and post-hoc manipulation",
              "Multi-contributor risk scoring identifies compromised data sources",
              "Seamless support for ONNX, PyTorch/TorchScript, COCO, and YOLO",
            ].map((pt, i) => (
              <div key={i} className={styles.archCheckItem}>
                <Check size={16} className={styles.checkIcon} />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline Diagram */}
        <div className={styles.archDiagramWrapper}>
          <div className={styles.diagramNodes}>
            <div className={styles.diagramNode}>
              <Database size={20} />
              <b>DATASET</b>
              <small>FPD Ingest</small>
            </div>
            <div className={styles.diagramArrow}>→</div>
            <div className={styles.diagramNode}>
              <BrainCircuit size={20} />
              <b>MODEL</b>
              <small>Weight Audit</small>
            </div>
            <div className={styles.diagramArrow}>→</div>
            <div className={styles.diagramNode}>
              <Lock size={20} />
              <b>ECDSA</b>
              <small>Provenance Sign</small>
            </div>
            <div className={styles.diagramArrow}>→</div>
            <div className={styles.diagramNode}>
              <Activity size={20} />
              <b>LEDGER</b>
              <small>Zero-Trust Verif</small>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section id="faq" className={styles.contentSection}>
        <div className="eyebrow">03 // OPERATIONAL CLARITY</div>
        <h2 className={styles.sectionHeading}>Frequently Answered Inquiries.</h2>

        <div className={styles.faqContainer}>
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <article key={i} className={`card ${styles.faqItem}`}>
                <button
                  className={styles.faqQuestionBtn}
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`${styles.faqChevron} ${isOpen ? styles.chevronOpen : ""}`} size={18} />
                </button>
                {isOpen && <p className={styles.faqAnswer}>{faq.a}</p>}
              </article>
            );
          })}
        </div>
      </section>

      {/* Sovereign Bulletin / Newsletter Section */}
      <section className={styles.newsletterSection}>
        <div className={styles.newsletterContent}>
          <div className="eyebrow">DEFENCE INTELLIGENCE BULLETIN</div>
          <h3>Receive Platform Readiness & Security Updates</h3>
          <p className="muted">
            Direct notifications on newly classified attack vectors, NIST TrojAI benchmarks, and compliance advisories.
          </p>
        </div>

        <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
          {subscribed ? (
            <div className={styles.subscribeSuccess}>
              <Check size={18} />
              <span>✓ Official subscription confirmed for DGIS secure dispatch.</span>
            </div>
          ) : (
            <>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer.defense@nic.in"
                className={styles.newsletterInput}
                aria-label="Official Email Address"
              />
              <button type="submit" className="btn">
                <span>Subscribe</span>
              </button>
            </>
          )}
        </form>
      </section>

      {/* Footer */}
      <footer className={styles.siteFooter}>
        <div className={styles.footerBrand}>
          <span className={styles.footerWordmark}>
            T.<span>R.A.C.E.</span>
          </span>
          <p className="mono muted">TAMPER-PROOF RECORD AND AI COMPLIANCE ENGINE</p>
          <small className="muted">Designed for Indian Army (DGIS) & Ministry of Defence (MoD) • Problem Statement 26228</small>
        </div>

        <div className={styles.footerNavGroup}>
          <Link href="/dashboard">Command Center</Link>
          <Link href="/dashboard/integrity">Data Integrity</Link>
          <Link href="/dashboard/model-audit">Model Audit</Link>
          <Link href="/dashboard/ledger">Inference Ledger</Link>
          <Link href="/dashboard/security">Security Status</Link>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          className={styles.backToTopBtn}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          title="Back to top"
        >
          ↑
        </button>
      )}
    </main>
  );
}
