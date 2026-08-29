import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Geist has no Devanagari coverage, so चर्चा / वाद-विवाद would fall back to a
// system font and look unrelated to the rest of the type.
const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
});

export const metadata: Metadata = {
  title: "Charcha — Share Thoughts. Shape Perspectives.",
  description:
    "Charcha is a space for meaningful discussions, deeper understanding, and better arguments.",
};

export const viewport: Viewport = {
  themeColor: "#f8f7fc",
};

/** Applies the saved theme before first paint so there is no flash. */
const themeScript = `(function(){try{if(localStorage.getItem("charcha-theme")==="dark"){document.documentElement.classList.add("dark")}}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${notoDevanagari.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
