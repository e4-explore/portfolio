import React from "react"
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from "@/components/theme-provider"
import { DebugClient } from "@/components/debug-client"
import './globals.css'

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
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
        <DebugClient />
        <Analytics />
      </body>
    </html>
  )
}
