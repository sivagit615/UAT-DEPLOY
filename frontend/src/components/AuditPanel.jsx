const RISK_CONFIG = {
  High: {
    icon: (
      <svg className="w-4 h-4 text-[#F43F5E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    barColor: 'bg-[#F43F5E]',
    dotColor: 'bg-[#F43F5E]',
    textColor: 'text-[#F43F5E]',
    borderColor: 'border-[#F43F5E]/40',
    bgColor: 'bg-[#F43F5E]/10',
    headerBg: 'bg-[#F43F5E]/15',
  },
  Medium: {
    icon: (
      <svg className="w-4 h-4 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
    barColor: 'bg-[#F59E0B]',
    dotColor: 'bg-[#F59E0B]',
    textColor: 'text-[#F59E0B]',
    borderColor: 'border-[#F59E0B]/40',
    bgColor: 'bg-[#F59E0B]/10',
    headerBg: 'bg-[#F59E0B]/15',
  },
  Low: {
    icon: (
      <svg className="w-4 h-4 text-[#38BDF8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    ),
    barColor: 'bg-[#38BDF8]',
    dotColor: 'bg-[#38BDF8]',
    textColor: 'text-[#38BDF8]',
    borderColor: 'border-[#38BDF8]/40',
    bgColor: 'bg-[#38BDF8]/10',
    headerBg: 'bg-[#38BDF8]/15',
  },
}

function AuditItem({ item, index }) {
  const cfg = RISK_CONFIG[item.risk_level] || RISK_CONFIG.Medium

  return (
    <div
      className={`rounded-xl border ${cfg.borderColor} ${cfg.bgColor} overflow-hidden animate-slide-up`}
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'both' }}
    >
      <div className={`flex items-center gap-2.5 px-4 py-2.5 ${cfg.headerBg}`}>
        {cfg.icon}
        <span className={`text-xs font-bold uppercase tracking-wider ${cfg.textColor}`}>
          {item.risk_level} Risk
        </span>
        <span className="ml-auto text-xs text-[#94A3B8] font-mono"># {index + 1}</span>
      </div>
      <div className="px-4 py-3 space-y-1">
        <p className="text-sm font-bold text-white">{item.issue}</p>
        <p className="text-xs text-[#94A3B8] leading-relaxed">{item.suggestion}</p>
      </div>
    </div>
  )
}

export default function AuditPanel({ auditFindings, overallRisk }) {
  if (!auditFindings || auditFindings.length === 0) return null

  const riskCounts = { High: 0, Medium: 0, Low: 0 }
  auditFindings.forEach(f => {
    if (riskCounts[f.risk_level] !== undefined) riskCounts[f.risk_level]++
  })

  const overallCfg = RISK_CONFIG[overallRisk] || RISK_CONFIG.Medium

  return (
    <div className="bg-[#0B132B] rounded-2xl overflow-hidden animate-fade-in border border-[#1E293B] shadow-2xl">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#1E293B] bg-[#070C1E]">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#F59E0B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white">AI Requirement Audit</h2>
              <p className="text-xs text-[#94A3B8] font-medium">{auditFindings.length} issue{auditFindings.length !== 1 ? 's' : ''} detected</p>
            </div>
          </div>

          {/* Overall risk badge */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${overallCfg.borderColor} ${overallCfg.bgColor}`}>
            <span className={`w-2 h-2 rounded-full ${overallCfg.dotColor} animate-pulse`} />
            <span className={`text-xs font-bold ${overallCfg.textColor}`}>
              Overall: {overallRisk} Risk
            </span>
          </div>
        </div>

        {/* Risk summary bar */}
        <div className="mt-4 flex items-center gap-4 flex-wrap">
          {Object.entries(riskCounts).map(([level, count]) => {
            const c = RISK_CONFIG[level]
            return (
              <div key={level} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${c.dotColor}`} />
                <span className="text-xs text-[#94A3B8]">
                  <span className={`font-bold ${c.textColor}`}>{count}</span> {level}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Findings list */}
      <div className="p-5 grid grid-cols-1 gap-3 max-h-[500px] overflow-y-auto">
        {auditFindings.map((item, i) => (
          <AuditItem key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  )
}

