import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'IdeaShot — Validate your startup idea in 30 seconds',
  description: 'Paste your idea, get brutal AI feedback instantly. ICP score, market signals, risks, and your suggested MVP scope. No login required.',
  openGraph: {
    title: 'IdeaShot — Validate your startup idea in 30 seconds',
    description: 'Brutal, honest AI validation. ICP score, risks, market signal, and MVP scope.',
    type: 'website',
    url: 'https://ideashot.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IdeaShot — Validate your startup idea in 30 seconds',
    description: 'Brutal, honest AI validation. ICP score, risks, market signal, and MVP scope.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
