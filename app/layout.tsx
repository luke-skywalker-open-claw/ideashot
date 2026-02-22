import type { Metadata } from 'next'
import './globals.css'

const ogImageUrl = 'https://og-image.vercel.app/IdeaShot%20%E2%80%94%20AI%20Startup%20Idea%20Validator.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-white.svg'

export const metadata: Metadata = {
  title: 'IdeaShot - AI Startup Idea Validator | Get Brutally Honest Feedback',
  description: 'Validate your startup idea in seconds. Get ICP score, market analysis, risks, and a brutal take from AI. Free, no signup.',
  openGraph: {
    title: 'IdeaShot - AI Startup Idea Validator | Get Brutally Honest Feedback',
    description: 'Validate your startup idea in seconds. Get ICP score, market analysis, risks, and a brutal take from AI. Free, no signup.',
    type: 'website',
    url: 'https://ideashot.vercel.app',
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: 'IdeaShot - AI Startup Idea Validator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IdeaShot - AI Startup Idea Validator | Get Brutally Honest Feedback',
    description: 'Validate your startup idea in seconds. Get ICP score, market analysis, risks, and a brutal take from AI. Free, no signup.',
    images: [ogImageUrl],
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
