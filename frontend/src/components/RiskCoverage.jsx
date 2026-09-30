import React from 'react';

export default function RiskCoverage({ conflicts, coverageAudit, findings }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Conflicts Radar */}
        <div className="bg-white p-6 border border-[#E2DED4] rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E2DED4]">
            <h2 className="text-lg font-extrabold text-[#171512] flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#FEE2E2] border border-[#FCA5A5] text-[#991B1B]">⚡</span>
              Conflicts Radar
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5]">
              {conflicts?.length || 0} Conflicts Found
            </span>
          </div>

          {conflicts && conflicts.length > 0 ? (
            <div className="space-y-3">
              {conflicts.map((conflict, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FEE2E2] border border-[#FCA5A5] flex gap-3 text-[#991B1B] shadow-sm">
                  <span className="text-[#991B1B] shrink-0 text-base">⚠️</span>
                  <p className="text-sm text-[#171512] font-medium leading-relaxed">{conflict}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] text-[#166534] text-sm flex items-center gap-2.5">
              <span className="text-base">✅</span>
              <span className="font-bold">No conflicting requirements detected.</span>
            </div>
          )}
        </div>

        {/* Coverage Audit & Gaps */}
        <div className="bg-white p-6 border border-[#E2DED4] rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E2DED4]">
            <h2 className="text-lg font-extrabold text-[#171512] flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E]">🛡️</span>
              Coverage Audit & Gaps
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
              {coverageAudit?.length || 0} Gaps Identified
            </span>
          </div>

          {coverageAudit && coverageAudit.length > 0 ? (
            <div className="space-y-3">
              {coverageAudit.map((gap, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] flex gap-3 text-[#92400E] shadow-sm">
                  <span className="text-[#92400E] shrink-0 text-base">🔍</span>
                  <p className="text-sm text-[#171512] font-medium leading-relaxed">{gap}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#F4F1EA] border border-[#E2DED4] text-[#5C6370] text-sm flex items-center gap-2">
              <span className="text-[#166534]">✅</span> All requirement paths fully covered in test matrix.
            </div>
          )}
        </div>
      </div>

      {/* Risk Prioritization Order */}
      <div className="bg-white p-6 border border-[#E2DED4] rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E2DED4]">
          <h2 className="text-lg font-extrabold text-[#171512] flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#3B4B34]/10 border border-[#3B4B34]/30 text-[#3B4B34]">🎯</span>
            Risk Prioritization & Remediation Findings
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F4F1EA] text-[#171512] border border-[#E2DED4]">
            {findings?.length || 0} Items
          </span>
        </div>

        {findings && findings.length > 0 ? (
          <div className="space-y-3">
            {findings.map((finding, idx) => {
              const riskLevel = finding.risk_level?.toLowerCase();
              return (
                <div key={idx} className="p-4 rounded-xl bg-[#F4F1EA] border border-[#E2DED4] flex flex-col gap-2.5 hover:border-[#3B4B34] transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-bold text-[#171512] text-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#3B4B34]" />
                      {finding.issue}
                    </span>
                    <span className={`self-start sm:self-auto text-xs px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wider border
                      ${riskLevel === 'high' ? 'bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]' :
                        riskLevel === 'medium' ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]' :
                        'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]'}`}>
                      {finding.risk_level} Risk
                    </span>
                  </div>
                  <p className="text-sm text-[#171512] leading-relaxed pl-4 border-l-2 border-[#E2DED4]">
                    <span className="text-[#3B4B34] font-bold mr-1">Recommendation:</span>
                    {finding.suggestion}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-[#5C6370] italic">No prioritized risk findings available.</p>
        )}
      </div>
    </div>
  );
}


