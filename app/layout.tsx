import React from "react"
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Hi, I'm Ethan - Product Designer",
  description: "I'm a versatile designer who clears ambiguity and helps teams ship products. Based in Indianapolis, IN.",
  keywords: ['product designer', 'UX designer', 'UI designer', 'Indianapolis', 'portfolio'],
  authors: [{ name: 'Ethan Philip Grove' }],
  openGraph: {
    title: "Ethan Philip Grove - Product Designer",
    description: "I'm a versatile designer who clears ambiguity and helps teams ship products.",
    type: 'website',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
