import React from 'react';

export default function TestMatrix({ testCases }) {
  if (!testCases || testCases.length === 0) {
    return (
      <div className="bg-white p-12 text-center border border-[#E2DED4] rounded-2xl shadow-sm">
        <div className="w-12 h-12 rounded-full bg-[#F4F1EA] text-[#5C6370] flex items-center justify-center mx-auto mb-3 text-xl border border-[#E2DED4]">🧪</div>
        <p className="text-[#171512] font-bold">No test cases generated yet.</p>
        <p className="text-xs text-[#5C6370] mt-1 font-medium">Submit a PRD above to auto-generate the complete matrix suite.</p>
      </div>
    );
  }

  const getTypeBadge = (type) => {
    switch (type?.toLowerCase()) {
      case 'positive': return 'badge-positive';
      case 'negative': return 'badge-negative';
      case 'boundary': return 'badge-boundary';
      case 'edge': return 'badge-edge';
      case 'recovery': return 'badge-recovery';
      default: return 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F4F1EA] text-[#171512] border border-[#E2DED4]';
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-white rounded-2xl overflow-hidden border border-[#E2DED4] shadow-sm">
        <div className="p-4 sm:p-5 border-b border-[#E2DED4] bg-[#EAE4D9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-extrabold text-[#171512] flex items-center gap-2">
              <span className="text-[#3B4B34]">🧪</span> Generated UAT Matrix Suite
            </h2>
            <p className="text-xs text-[#5C6370] mt-0.5 font-medium">Automated test scenarios grouped by logic boundary and risk citation</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#3B4B34]/10 text-[#3B4B34] text-xs font-bold border border-[#3B4B34]/30 self-start sm:self-auto">
            {testCases.length} Test Cases Total
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="w-28">Test ID</th>
                <th className="w-1/4">Title & Category</th>
                <th className="w-1/3">Execution Steps</th>
                <th>Expected Outcome</th>
                <th className="w-32">Source Ref</th>
              </tr>
            </thead>
            <tbody>
              {testCases.map((tc, idx) => (
                <tr key={tc.test_id || idx} className="hover:bg-[#F9F7F1] transition-colors">
                  <td>
                    <span className="inline-block px-2.5 py-1 rounded bg-[#3B4B34]/10 text-[#3B4B34] border border-[#3B4B34]/30 font-mono text-xs font-bold">
                      {tc.test_id || `TC-${idx+1}`}
                    </span>
                  </td>
                  <td>
                    <div className="flex flex-col items-start gap-2">
                      <span className="font-bold text-[#171512] font-sans text-sm leading-snug">{tc.title}</span>
                      <span className={getTypeBadge(tc.test_type)}>{tc.test_type}</span>
                    </div>
                  </td>
                  <td>
                    <ol className="list-decimal list-inside space-y-1 text-[#171512] font-sans text-xs sm:text-sm leading-relaxed">
                      {tc.steps?.map((step, sIdx) => (
                        <li key={sIdx} className="text-[#171512]">
                          <span className="text-[#171512] font-medium">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </td>
                  <td className="text-xs sm:text-sm text-[#171512] font-sans leading-relaxed font-normal">
                    {tc.expected_result}
                  </td>
                  <td>
                    {tc.source_citation ? (
                      <span className="inline-flex items-center px-2 py-1 rounded bg-[#F4F1EA] text-[#171512] border border-[#E2DED4] font-mono text-xs font-bold">
                        [{tc.source_citation}]
                      </span>
                    ) : (
                      <span className="text-[#5C6370] text-xs font-mono">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


