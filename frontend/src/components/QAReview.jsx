import React, { useState, useEffect } from 'react';

export default function QAReview({ testCases, onStatusChange }) {
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    const initialStatuses = {};
    testCases?.forEach(tc => {
      initialStatuses[tc.test_id] = 'Pending';
    });
    setStatuses(initialStatuses);
  }, [testCases]);

  const toggleStatus = (id, newStatus) => {
    const updated = { ...statuses, [id]: newStatus };
    setStatuses(updated);
    if (onStatusChange) onStatusChange(updated);
  };

  if (!testCases || testCases.length === 0) {
    return (
      <div className="bg-white p-12 text-center border border-[#E2DED4] rounded-2xl shadow-sm">
        <div className="w-12 h-12 rounded-full bg-[#F4F1EA] text-[#5C6370] flex items-center justify-center mx-auto mb-3 text-xl border border-[#E2DED4]">✅</div>
        <p className="text-[#171512] font-bold">No test cases queued for review.</p>
      </div>
    );
  }

  const approvedCount = Object.values(statuses).filter(s => s === 'Approved').length;
  const flaggedCount = Object.values(statuses).filter(s => s === 'Flagged').length;
  const pendingCount = Object.values(statuses).filter(s => s === 'Pending').length;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-white p-6 sm:p-7 border border-[#E2DED4] rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E2DED4]">
          <div>
            <h2 className="text-lg font-extrabold text-[#171512] flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#3B4B34]/10 border border-[#3B4B34]/30 text-[#3B4B34]">✔️</span>
              Interactive QA Review & Sign-off Queue
            </h2>
            <p className="text-xs text-[#5C6370] mt-0.5 font-medium">Review each test case, verify steps, and sign off or flag for revision</p>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="px-2.5 py-1 rounded-md bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]">
              {approvedCount} Approved
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5]">
              {flaggedCount} Flagged
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#F4F1EA] text-[#171512] border border-[#E2DED4]">
              {pendingCount} Pending
            </span>
          </div>
        </div>
        
        <div className="space-y-3.5">
          {testCases.map((tc, idx) => {
            const status = statuses[tc.test_id] || 'Pending';
            return (
              <div 
                key={tc.test_id || idx} 
                className={`p-4 rounded-xl border flex flex-col md:flex-row gap-4 items-start md:items-center justify-between transition-all duration-200 shadow-sm
                  ${status === 'Approved' ? 'bg-[#DCFCE7]/60 border-[#86EFAC]' :
                    status === 'Flagged' ? 'bg-[#FEE2E2]/60 border-[#FCA5A5]' :
                    'bg-[#F4F1EA] border-[#E2DED4] hover:border-[#3B4B34]'}`}
              >
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[#3B4B34] font-bold text-xs px-2.5 py-0.5 rounded bg-[#3B4B34]/10 border border-[#3B4B34]/30">
                      {tc.test_id || `TC-${idx+1}`}
                    </span>
                    <span className="font-bold text-[#171512] text-sm">{tc.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#171512] line-clamp-2 leading-relaxed">
                    <strong className="text-[#5C6370]">Expected Outcome:</strong> {tc.expected_result}
                  </p>
                </div>
                
                <div className="flex items-center gap-1.5 shrink-0 bg-[#EAE4D9] p-1.5 rounded-xl border border-[#E2DED4] self-end md:self-auto">
                  <button 
                    onClick={() => toggleStatus(tc.test_id, 'Pending')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${status === 'Pending' ? 'bg-white text-[#171512] border border-[#E2DED4] shadow-sm' : 'text-[#5C6370] hover:text-[#171512]'}`}
                  >
                    Pending
                  </button>
                  <button 
                    onClick={() => toggleStatus(tc.test_id, 'Approved')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${status === 'Approved' ? 'bg-[#166534] text-white shadow-sm' : 'text-[#5C6370] hover:text-[#166534]'}`}
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => toggleStatus(tc.test_id, 'Flagged')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${status === 'Flagged' ? 'bg-[#991B1B] text-white shadow-sm' : 'text-[#5C6370] hover:text-[#991B1B]'}`}
                  >
                    Flag
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


