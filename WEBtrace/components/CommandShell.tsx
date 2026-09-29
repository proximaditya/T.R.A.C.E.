"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Activity,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  Database,
  ExternalLink,
  Menu,
  Moon,
  Radio,
  ShieldAlert,
  ShieldCheck,
  Sun,
  X,
} from "lucide-react";
import styles from "./CommandShell.module.css";

const navLinks = [
  { label: "Overview", href: "/dashboard", icon: ShieldCheck, badge: "LIVE" },
  { label: "Data Integrity", href: "/dashboard/integrity", icon: Database, badge: "FPD" },
  { label: "Model Audit", href: "/dashboard/model-audit", icon: BrainCircuit, badge: "ONNX" },
  { label: "Inference Ledger", href: "/dashboard/ledger", icon: Activity, badge: "ECDSA" },
] as const;

/**
 * CommandShell: Enterprise-grade military command center layout for T.R.A.C.E.
 * Features glassmorphic top header, responsive collapsible sidebar on the side rail,
 * zero-flicker dark/light theme switching, and air-gapped status telemetry.
 */
export function CommandShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isLight, setIsLight] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage on client mount (avoids hydration mismatch and race conditions)
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("trace-theme");
      const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      const initialLight = savedTheme ? savedTheme === "light" : prefersLight;
      setIsLight(initialLight);
      applyTheme(initialLight);
    } catch {
      // Fallback for sandboxed storage
    }
    setMounted(true);
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
    const nextState = !isLight;
    setIsLight(nextState);
    applyTheme(nextState);
    try {
      localStorage.setItem("trace-theme", nextState ? "light" : "dark");
    } catch {
      // Ignored if local storage disabled
    }
  };

  return (
    <div className={`page ${collapsed ? "collapsedPage" : ""}`}>
      <a className="skip" href="#main-command-content">
        Skip to operational console
      </a>

      {/* Glassmorphic Top Command Header */}
      <header className={styles.topHeader}>
        <div className={styles.headerLeft}>
          {/* Mobile Navigation Drawer Toggle */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* High-visibility Brand Wordmark for both Dark & Light modes */}
          <Link href="/" className={styles.wordmark} title="Return to Briefing Page">
            <span className={styles.brandPrefix}>T.</span>
            <span className={styles.brandAccent}>R.A.C.E.</span>
          </Link>

          <span className={styles.classificationTag}>
            <span className={styles.classificationDot} />
            DGIS // RESTRICTED // SOVEREIGN-C2
          </span>
        </div>

        <div className={styles.headerRight}>
          {/* Node Status Badge */}
          <div className={styles.telemetryBadge}>
            <span className={styles.livePulse} />
            <span className={styles.telemetryText}>
              NODE DEL-07 <small>AIR-GAPPED</small>
            </span>
          </div>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className={styles.themeToggleBtn}
            aria-label={isLight ? "Switch to Military Dark mode" : "Switch to Clean Light mode"}
            title={isLight ? "Switch to Military Dark mode" : "Switch to Clean Light mode"}
          >
            {mounted && isLight ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Public Briefing Link */}
          <Link href="/" className={styles.briefingLink} title="Public Landing Briefing">
            <span>Briefing</span>
            <ExternalLink size={12} />
          </Link>
        </div>
      </header>

      {/* Main Command Workspace */}
      <div className="shell">
        {/* Persistent Command Center Sidebar */}
        <aside
          className={`${styles.sidebar} ${mobileOpen ? styles.mobileOpen : ""} ${
            collapsed ? styles.sidebarCollapsed : ""
          }`}
          aria-label="Command Navigation"
        >
          {/* Side Rail Extender / Collapse Button (Strictly on the side, NOT in the header) */}
          <button
            className={styles.sideRailToggle}
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand command sidebar" : "Collapse command sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>

          {/* Sidebar Brand Heading */}
          <div className={styles.sidebarHeader}>
            {!collapsed ? (
              <>
                <div className={styles.sidebarTitle}>COMMAND CENTER</div>
                <div className={styles.sidebarSubtitle}>TAMPER-PROOF RECORD ENGINE</div>
              </>
            ) : (
              <div className={styles.collapsedIconPlaceholder} title="T.R.A.C.E. Console">
                <Radio size={16} />
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className={styles.navMenu}>
            {navLinks.map(({ label, href, icon: Icon, badge }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
                  title={collapsed ? label : undefined}
                >
                  <Icon size={18} className={styles.navIcon} />
                  {!collapsed && (
                    <>
                      <span className={styles.navLabel}>{label}</span>
                      <span className={styles.navBadge}>{badge}</span>
                    </>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer Posture & Telemetry */}
          <div className={styles.sidebarFooter}>
            <Link
              href="/dashboard/security"
              onClick={() => setMobileOpen(false)}
              className={`${styles.securityStatusLink} ${
                pathname === "/dashboard/security" ? styles.securityActive : ""
              }`}
            >
              <ShieldCheck size={18} />
              {!collapsed && (
                <div className={styles.secTextWrapper}>
                  <b>SECURITY POSTURE</b>
                  <small>ALL CONTROLS NOMINAL</small>
                </div>
              )}
            </Link>
          </div>
        </aside>

        {/* Content Area */}
        <main id="main-command-content" className="content">
          {children}
        </main>
      </div>

      {/* Sticky Bottom Status CTA Bar */}
      <footer className={styles.stickyFooter}>
        <div className={styles.footerStatus}>
          <span className={styles.footerLed} />
          <span className="mono">
            SOVEREIGN INTEGRITY POSTURE: <b>CRYPTOGRAPHIC ASSURANCE NOMINAL</b>
          </span>
        </div>
        <div className={styles.footerLinks}>
          <Link href="/dashboard/security">Audit Trail</Link>
          <span className={styles.footerSep}>/</span>
          <Link href="/dashboard/integrity">COCO/YOLO FPD</Link>
          <span className={styles.footerSep}>/</span>
          <a href="#main-command-content">Top ↑</a>
        </div>
      </footer>
    </div>
  );
}
