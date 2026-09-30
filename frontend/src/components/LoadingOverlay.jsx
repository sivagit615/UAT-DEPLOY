export default function LoadingOverlay() {
  const steps = [
    { label: 'Reading PRD & User Stories…', icon: '📄' },
    { label: 'Auditing requirement logic…', icon: '🔍' },
    { label: 'Detecting boundary conflicts…', icon: '⚡' },
    { label: 'Generating test cases matrix…', icon: '🧪' },
    { label: 'Finalizing verification suite…', icon: '✅' },
  ]

  return (
    <div className="bg-white p-8 sm:p-10 flex flex-col items-center gap-8 animate-fade-in border border-[#E2DED4] rounded-2xl shadow-sm my-4">
      {/* Animated orb */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full bg-[#3B4B34]/10 animate-pulse-slow" />
        <div className="absolute inset-2 rounded-full bg-[#3B4B34]/20 animate-pulse" />
        <div className="absolute inset-4 rounded-full bg-[#3B4B34] flex items-center justify-center shadow-sm">
          <svg className="w-8 h-8 text-white animate-spin" style={{ animationDuration: '2.5s' }} fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      </div>

      <div className="text-center space-y-1">
        <h3 className="text-xl font-extrabold text-[#171512] tracking-tight">TestMind AI Engine Active</h3>
        <p className="text-sm text-[#5C6370] font-medium">Auditing requirements document and building matrix suite</p>
      </div>

      {/* Step indicators */}
      <div className="w-full max-w-md space-y-2.5">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#F4F1EA] border border-[#E2DED4] shadow-sm"
          >
            <span className="text-base">{step.icon}</span>
            <span className="text-xs sm:text-sm text-[#171512] font-bold">{step.label}</span>
            <div className="ml-auto flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#3B4B34] animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


