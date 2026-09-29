import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "T.R.A.C.E. | Zero-Trust AI Provenance",
  description: "Tamper-Proof Record and AI Compliance Engine command center.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
