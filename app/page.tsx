'use client'

import { useState, useEffect } from 'react'

interface ValidationResult {
  icpScore: number
  icpExplanation: string
  marketSignal: 'Hot' | 'Warm' | 'Cold'
  marketReasoning: string
  risks: string[]
  strengths: string[]
  mvpScope: string[]
  brutalTake: string
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 8 ? 'text-green-400' : score >= 5 ? 'text-yellow-400' : 'text-red-400'
  return (
    <span className={`text-4xl font-bold ${color}`}>
      {score}<span className="text-xl text-zinc-500">/10</span>
    </span>
  )
}

function MarketBadge({ signal }: { signal: string }) {
  const styles: Record<string, string> = {
    Hot: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    Warm: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Cold: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  }
  const emojis: Record<string, string> = { Hot: '🔥', Warm: '🌤', Cold: '🧊' }
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${styles[signal]}`}>
      {emojis[signal]} {signal}
    </span>
  )
}

export default function Home() {
  const [idea, setIdea] = useState('')
  const [audience, setAudience] = useState('')
  const [problem, setProblem] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ValidationResult | null>(null)
  const [error, setError] = useState('')

  // Load from URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const encoded = params.get('v')
    if (encoded) {
      try {
        const decoded = JSON.parse(atob(encoded))
        setIdea(decoded.idea || '')
        setAudience(decoded.audience || '')
        setProblem(decoded.problem || '')
      } catch {}
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!idea.trim() || !audience.trim() || !problem.trim()) return

    setLoading(true)
    setResult(null)
    setError('')

    try {
      const res = await fetch('/api/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, audience, problem }),
      })
      if (!res.ok) throw new Error('Validation failed')
      const data = await res.json()
      setResult(data)

      // Update URL with encoded params (shareable)
      const encoded = btoa(JSON.stringify({ idea, audience, problem }))
      window.history.replaceState({}, '', `?v=${encoded}`)
    } catch (err) {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied! Share your validation 🚀')
  }

  const handleCopyResults = () => {
    if (!result) return
    const text = `🎯 IdeaShot Validation Results\n\nICP Score: ${result.icpScore}/10\n${result.icpExplanation}\n\nMarket Signal: ${result.marketSignal}\n${result.marketReasoning}\n\nRisks:\n${result.risks.map(r => `• ${r}`).join('\n')}\n\nStrengths:\n${result.strengths.map(s => `• ${s}`).join('\n')}\n\nMVP Scope:\n${result.mvpScope.map((s, i) => `${i+1}. ${s}`).join('\n')}\n\n💬 "${result.brutalTake}"\n\nValidate yours → https://ideashot.vercel.app`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getTwitterShareUrl = () => {
    if (!result) return '#'
    const tweet = `💬 "${result.brutalTake}"\n\nICP Score: ${result.icpScore}/10 | Market: ${result.marketSignal}\n\nValidate your startup idea → https://ideashot.vercel.app`
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`
  }

  const handleReset = () => {
    setResult(null)
    setError('')
    window.history.replaceState({}, '', '/')
  }

  return (
    <main className="min-h-screen px-4 py-16 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-4xl mb-3">🎯</div>
          <h1 className="text-3xl font-bold text-white mb-2">IdeaShot</h1>
          <p className="text-zinc-400 text-lg">
            Validate your startup idea in 30 seconds.{' '}
            <span className="text-zinc-500">No fluff.</span>
          </p>
        </div>

        {/* Form */}
        {!result && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                Your idea *
              </label>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder='e.g. "A Duolingo for coding interviews"'
                rows={3}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-violet-500 resize-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                Target audience *
              </label>
              <input
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder='e.g. "Junior devs prepping for FAANG interviews"'
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                Problem you solve *
              </label>
              <input
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder='e.g. "LeetCode feels pointless — devs want real interview practice"'
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !idea.trim() || !audience.trim() || !problem.trim()}
              className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Validate →'
              )}
            </button>
          </form>
        )}

        {/* Error */}
        {error && (
          <p className="mt-4 text-red-400 text-sm text-center">{error}</p>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-4 animate-in fade-in duration-500">
            {/* ICP Score */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">🎯 ICP Score</h2>
                <ScoreBadge score={result.icpScore} />
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">{result.icpExplanation}</p>
            </div>

            {/* Market Signal */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">📈 Market Signal</h2>
                <MarketBadge signal={result.marketSignal} />
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed">{result.marketReasoning}</p>
            </div>

            {/* Risks + Strengths side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">⚠️ Top Risks</h2>
                <ul className="space-y-2">
                  {result.risks.map((r, i) => (
                    <li key={i} className="text-zinc-300 text-sm flex gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">✅ What&apos;s Strong</h2>
                <ul className="space-y-2">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="text-zinc-300 text-sm flex gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* MVP Scope */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-3">🚀 Suggested MVP Scope</h2>
              <ul className="space-y-2">
                {result.mvpScope.map((s, i) => (
                  <li key={i} className="text-zinc-300 text-sm flex gap-2">
                    <span className="text-violet-500 mt-0.5">{i + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brutal take */}
            <div className="bg-violet-950/40 border border-violet-800/30 rounded-2xl p-6">
              <h2 className="text-sm font-medium text-violet-400 uppercase tracking-wider mb-2">💬 Honest Take</h2>
              <p className="text-zinc-200 text-sm italic leading-relaxed">&ldquo;{result.brutalTake}&rdquo;</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleCopyResults}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium py-3 rounded-xl transition-colors text-sm"
              >
                {copied ? '✅ Copied!' : '📋 Copy Results'}
              </button>
              <a
                href={getTwitterShareUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-sky-600 hover:bg-sky-500 text-white font-medium py-3 rounded-xl transition-colors text-sm text-center"
              >
                🐦 Share on Twitter
              </a>
              <button
                onClick={handleReset}
                className="flex-1 bg-violet-600 hover:bg-violet-500 text-white font-medium py-3 rounded-xl transition-colors text-sm"
              >
                Try another →
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-zinc-600 text-xs mt-16 mb-8 space-y-1">
          <p>Built by an AI agent 🤖</p>
          <p className="text-zinc-700">Day 1 of the Daily App Factory</p>
        </footer>
      </div>
    </main>
  )
}
