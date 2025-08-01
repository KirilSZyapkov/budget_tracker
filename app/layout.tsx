import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
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
  title: {
    default: "Budget Tracker | Track Your Finances Easily",
    template: "%s | Budget Tracker",
  },
  description:
    "Track your income, expenses, bills, and savings monthly with Budget Tracker. Simple, visual, and tailored for smart financial planning.",
  keywords: [
    "budget tracker",
    "personal finance",
    "money management",
    "expense tracker",
    "income tracking",
    "savings",
    "bills",
    "finance dashboard",
    "monthly budget",
    "financial planner app",
  ],
  authors: [{ name: "Your Name", url: "https://your-site.dev" }],
  creator: "Your Name",
  metadataBase: new URL("https://budget-tracker.dev"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "bg-BG": "/bg",
    },
  },
  openGraph: {
    title: "Budget Tracker – Smart Personal Finance Tool",
    description:
      "Stay on top of your finances with visual monthly tracking. Analyze your income, bills, and expenses all in one place.",
    url: "https://budget-tracker.dev",
    siteName: "Budget Tracker",
    images: [
      {
        url: "https://budget-tracker.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Budget Tracker – Personal Finance Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Budget Tracker – Manage Your Budget Smartly",
    description:
      "Visual, organized and flexible budgeting app for tracking your financial health.",
    creator: "@yourhandle",
    images: ["https://budget-tracker.dev/og-image.png"],
  },
  category: "Finance",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
