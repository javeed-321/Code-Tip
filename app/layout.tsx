import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

// TODO: change to your real production URL before deploying.
const SITE_URL = "https://code-tip.vercel.app";
const SITE_NAME = "Markdown Editor";
const DESCRIPTION =
  "A fast, free online Markdown editor with live preview, syntax highlighting, tables, math, dark mode, and HTML/PDF export. Write Markdown and see the rendered result side by side.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Live Markdown Editor with Preview & Export`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "markdown editor",
    "online markdown editor",
    "markdown preview",
    "markdown to html",
    "markdown to pdf",
    "live markdown editor",
    "free markdown editor",
    "markdown table editor",
    "katex math markdown",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  category: "productivity",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Live Markdown Editor with Preview & Export`,
    description: DESCRIPTION,
    locale: "en_US",
    // Place a 1200x630 image at app/opengraph-image.png and Next will pick it up
    // automatically, or list it explicitly here.
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Live Markdown Editor`,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={lato.variable}>
      <body>{children}</body>
    </html>
  );
}