import React from 'react';

export default function Overview({ summary, overallRisk, coverageScore, businessRules, auditFindings }) {
  const getRiskStyles = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'high': return 'bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]';
      case 'medium': return 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]';
      case 'low': return 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]';
      default: return 'bg-[#F4F1EA] text-[#171512] border-[#E2DED4]';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Executive Summary */}
        <div className="col-span-1 md:col-span-2 bg-white p-6 sm:p-7 border border-[#E2DED4] rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-2 rounded-lg bg-[#3B4B34]/10 border border-[#3B4B34]/30 text-[#3B4B34] text-lg">📝</span>
            <h2 className="text-xl font-extrabold text-[#171512] font-sans tracking-tight">Executive Summary</h2>
          </div>
          <p className="text-[#171512] text-sm leading-relaxed font-sans font-normal">{summary || 'No summary available.'}</p>
        </div>

        {/* Key Metrics */}
        <div className="bg-white p-6 flex flex-col justify-center gap-6 border border-[#E2DED4] rounded-2xl shadow-sm">
          <div>
            <p className="text-xs text-[#5C6370] uppercase tracking-wider mb-2 font-bold">Overall Risk Level</p>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-wide transition-all ${getRiskStyles(overallRisk)}`}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              {overallRisk ? `${overallRisk.toUpperCase()} RISK` : 'UNKNOWN'}
            </div>
          </div>
          <div className="pt-2 border-t border-[#E2DED4]">
            <p className="text-xs text-[#5C6370] uppercase tracking-wider mb-2 font-bold">Requirements Coverage</p>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-extrabold text-[#166534] font-sans tracking-tight">{coverageScore || 0}%</span>
              <span className="text-[#5C6370] text-xs font-semibold mb-1">Target: &gt;90%</span>
            </div>
            <div className="w-full bg-[#F4F1EA] h-2 rounded-full mt-2 overflow-hidden border border-[#E2DED4]">
              <div 
                className="bg-[#3B4B34] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, coverageScore || 0))}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Extracted Business Rules */}
      <div className="bg-white p-6 sm:p-7 border border-[#E2DED4] rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E2DED4]">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-[#3B4B34]/10 border border-[#3B4B34]/30 text-[#3B4B34] text-lg">⚖️</span>
            <h2 className="text-xl font-extrabold text-[#171512] font-sans tracking-tight">Extracted Business Rules</h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#F4F1EA] text-[#171512] text-xs font-bold border border-[#E2DED4]">
            {businessRules?.length || 0} Rules Extracted
          </span>
        </div>

        {businessRules && businessRules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {businessRules.map((rule, idx) => (
              <div key={idx} className="flex gap-3.5 p-4 rounded-xl bg-[#F4F1EA] border border-[#E2DED4] hover:border-[#3B4B34] transition-all duration-200 group">
                <span className="px-2.5 py-1 rounded-md bg-[#3B4B34]/10 text-[#3B4B34] border border-[#3B4B34]/30 text-xs font-mono font-bold shrink-0 self-start">
                  R{idx + 1}
                </span>
                <p className="text-sm text-[#171512] leading-relaxed font-sans">{rule}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#5C6370] italic">No explicit business rules detected.</p>
        )}
      </div>
    </div>
  );
}


