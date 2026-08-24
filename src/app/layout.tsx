import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://convertanything.example"),
  title: {
    default: "ConvertAnything - Fast Unit Conversions",
    template: "%s | ConvertAnything",
  },
  description:
    "ConvertAnything is a fast unit conversion engine for length, weight, temperature, area, volume, speed, time, digital storage, pressure, energy, power, and angles.",
  keywords: ["unit converter", "conversion calculator", "kg to lbs", "cm to inches", "celsius to fahrenheit"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "ConvertAnything",
    description: "Fast, accurate unit conversions with formulas, tables, and related converters.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f766e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
