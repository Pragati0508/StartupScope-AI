import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "StartupScope AI | The Credit Score for Startups",
  description: "Enterprise-grade evaluation engine assessing startup innovation, technology readiness (TRL), manufacturing readiness (MRL), IP strength, and investment viability.",
  keywords: "startup score, startup cibil, investment readiness, TRL assessment, MRL assessment, IP valuation, VC dashboard, venture capital software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} antialiased bg-background text-foreground font-sans`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
