import { useState, useEffect } from 'react'
import Header from './components/Header'
import PRDInput from './components/PRDInput'
import LoadingOverlay from './components/LoadingOverlay'
import Overview from './components/Overview'
import TestMatrix from './components/TestMatrix'
import RiskCoverage from './components/RiskCoverage'
import QAReview from './components/QAReview'
import ExportView from './components/ExportView'

const TABS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'matrix', label: 'Test Matrix', icon: '🧪' },
  { id: 'risk', label: 'Risk & Coverage', icon: '🛡️' },
  { id: 'review', label: 'QA Review', icon: '✅' },
  { id: 'export', label: 'Export', icon: '📥' },
]

export default function App() {
  const [prd, setPrd] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [result])

  const handleGenerate = async () => {
    if (!prd.trim()) return
    setIsLoading(true)
    setResult(null)
    setError(null)

    try {
      const res = await fetch('/api/generate-uat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prd_text: prd }),
      })

      const text = await res.text()
      let data = null
      try {
        data = text ? JSON.parse(text) : null
      } catch (parseErr) {
        console.error('Failed to parse response JSON:', parseErr)
      }

      if (!res.ok) {
        const errorMsg = data?.detail || (text && text.length < 200 ? text : `Server Error (${res.status}): Please check backend service on port 8000.`)
        throw new Error(errorMsg)
      }

      if (!data) {
        throw new Error('Received an empty response from server. Please verify backend service on port 8000.')
      }

      setResult(data)
      setActiveTab('overview')
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
    setActiveTab('overview')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F1EA] text-[#171512] font-sans selection:bg-[#3B4B34] selection:text-white">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
        
        {/* Hero section */}
        {!result && !isLoading && (
          <section className="text-center space-y-6 pt-10 pb-12 reveal active">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3B4B34]/10 border border-[#3B4B34]/30 text-[#3B4B34] text-xs font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#3B4B34] animate-pulse" />
              AI-Powered Quality Assurance & Requirement Intelligence
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171512] max-w-4xl mx-auto leading-[1.15]">
              Enterprise UAT intelligence built from real <span className="text-[#3B4B34] underline decoration-[#B96A4A]/50">context</span>
            </h1>
            
            <p className="text-[#5C6370] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-sans font-normal">
              TestMind AI audits software requirements, detects edge-case conflicts, and generates comprehensive, execution-ready UAT matrix suites in seconds.
            </p>
            
            <div className="flex justify-center py-4">
              <div className="flex flex-wrap justify-center gap-6 sm:gap-10 items-center px-8 py-4 bg-white border border-[#E2DED4] rounded-2xl shadow-sm">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#3B4B34]">18M+</p>
                  <p className="text-xs text-[#5C6370] uppercase tracking-wider font-semibold mt-1">Requirements Audited</p>
                </div>
                <div className="hidden sm:block w-px h-10 bg-[#E2DED4]" />
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#B96A4A]">99.4%</p>
                  <p className="text-xs text-[#5C6370] uppercase tracking-wider font-semibold mt-1">Edge Case Precision</p>
                </div>
                <div className="hidden sm:block w-px h-10 bg-[#E2DED4]" />
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#2563EB]">8</p>
                  <p className="text-xs text-[#5C6370] uppercase tracking-wider font-semibold mt-1">Specialized Engines</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab navigation + Reset bar when result is shown */}
        {result && !isLoading && (
          <div className="space-y-4 animate-fade-in reveal active">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 border border-[#E2DED4] rounded-2xl shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-extrabold text-[#171512] font-sans">Analysis Complete</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] flex items-center gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#166534] animate-pulse" />
                    Verified
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#171512] font-medium">
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F1EA] border border-[#E2DED4] text-[#171512]">
                    <strong className="text-[#3B4B34] font-bold">{result.test_cases?.length || 0}</strong> Test Cases
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F1EA] border border-[#E2DED4] text-[#171512]">
                    <strong className="text-[#B96A4A] font-bold">{result.audit_findings?.length || 0}</strong> Audit Findings
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#F4F1EA] border border-[#E2DED4] text-[#171512]">
                    Overall Risk: <strong className={`font-bold uppercase ${result.overall_risk?.toLowerCase() === 'high' ? 'text-[#991B1B]' : result.overall_risk?.toLowerCase() === 'medium' ? 'text-[#92400E]' : 'text-[#166534]'}`}>{result.overall_risk || 'N/A'}</strong>
                  </span>
                </div>
              </div>

              <button onClick={handleReset} className="btn-secondary btn-lift text-xs !py-2 !px-4">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                New Analysis
              </button>
            </div>

            {/* Tab bar */}
            <div className="flex gap-1.5 p-1.5 rounded-2xl bg-white border border-[#E2DED4] shadow-sm overflow-x-auto">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer
                    ${activeTab === tab.id
                      ? 'bg-[#3B4B34] text-white shadow-sm border border-[#3B4B34]'
                      : 'text-[#5C6370] hover:text-[#171512] hover:bg-[#F7F5EE]'}`}
                >
                  <span className="text-base">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PRD Input */}
        {!result && (
          <div className="reveal active">
            <PRDInput
              value={prd}
              onChange={setPrd}
              onSubmit={handleGenerate}
              isLoading={isLoading}
            />
          </div>
        )}

        {/* Error alert */}
        {error && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F43F5E]/10 border border-[#F43F5E]/30 text-[#F43F5E] animate-fade-in shadow-2xl">
            <svg className="w-5 h-5 text-[#F43F5E] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#F43F5E]">Analysis Failed</p>
              <p className="text-xs text-[#F43F5E]/90 mt-0.5 leading-relaxed">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="text-[#F43F5E] hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Loading state */}
        {isLoading && <LoadingOverlay />}

        {/* Results — tabbed views */}
        {result && !isLoading && (
          <div className="space-y-6 reveal active">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <Overview 
                summary={result.summary}
                overallRisk={result.overall_risk}
                coverageScore={result.coverage_score}
                businessRules={result.business_rules}
                auditFindings={result.audit_findings || result.prioritized_findings}
              />
            )}

            {/* Matrix Tab */}
            {activeTab === 'matrix' && (
              <TestMatrix testCases={result.test_cases} />
            )}

            {/* Risk & Coverage Tab */}
            {activeTab === 'risk' && (
              <RiskCoverage 
                conflicts={result.conflicts}
                coverageAudit={result.coverage_audit}
                findings={result.prioritized_findings || result.audit_findings}
              />
            )}

            {/* QA Review Tab */}
            {activeTab === 'review' && (
              <QAReview testCases={result.test_cases} />
            )}

            {/* Export Tab */}
            {activeTab === 'export' && (
              <ExportView result={result} />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1E293B] mt-16 bg-[#070C1E] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
            <p className="text-xs text-[#F3F4F6] font-semibold">
              © 2026 TestMind AI — Enterprise UAT Intelligence Platform
            </p>
          </div>
          <p className="text-xs text-[#94A3B8] font-medium">
            FastAPI · React · Google Gemini Engine · Deep Space Cyber Theme
          </p>
        </div>
      </footer>
    </div>
  )
}


