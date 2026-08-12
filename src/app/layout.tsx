import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sentinel - The AI-Native Terminal",
  description:
    "Execute shell commands, automate workflows, and control your desktop using natural language—all completely offline.",
};

import ChessGridTransition from "@/components/effects/chess-grid-transition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('sentinel-theme') === 'light') {
                  document.documentElement.classList.add('light-mode');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-[#141314] text-white">
        <SmoothScrollProvider>
          <ChessGridTransition>
            {children}
          </ChessGridTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
