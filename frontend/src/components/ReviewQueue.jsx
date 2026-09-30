import { useState } from 'react'

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'text-[#94A3B8]', bg: 'bg-[#94A3B8]/10', border: 'border-[#94A3B8]/30', icon: '⏳' },
  approved: { label: 'Approved', color: 'text-[#34D399]', bg: 'bg-[#34D399]/10', border: 'border-[#34D399]/30', icon: '✓' },
  flagged: { label: 'Flagged', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30', icon: '⚑' },
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
      {cfg.icon} {cfg.label}
    </span>
  )
}

export default function ReviewQueue({ testCases, onUpdateCase }) {
  const [statuses, setStatuses] = useState(() => {
    const map = {}
    testCases?.forEach(tc => { map[tc.test_id] = 'pending' })
    return map
  })
  const [editingId, setEditingId] = useState(null)
  const [editNotes, setEditNotes] = useState({})
  const [filterStatus, setFilterStatus] = useState('all')

  if (!testCases || testCases.length === 0) return null

  const setStatus = (id, status) => {
    setStatuses(prev => ({ ...prev, [id]: status }))
  }

  const counts = { pending: 0, approved: 0, flagged: 0 }
  Object.values(statuses).forEach(s => { if (counts[s] !== undefined) counts[s]++ })

  const filtered = testCases.filter(tc => {
    if (filterStatus === 'all') return true
    return statuses[tc.test_id] === filterStatus
  })

  const approveAll = () => {
    const updated = {}
    testCases.forEach(tc => { updated[tc.test_id] = 'approved' })
    setStatuses(updated)
  }

  return (
    <div className="glass-card overflow-hidden animate-fade-in border border-[#1E293B] bg-[#0B132B]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#1E293B] bg-[#070C1E]">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#F3F4F6]">QA Review & Approval Queue</h2>
              <p className="text-xs text-[#94A3B8]">{testCases.length} test cases awaiting review</p>
            </div>
          </div>
          <button onClick={approveAll} className="btn-primary text-xs !py-2 !px-4">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Approve All
          </button>
        </div>

        {/* Status summary */}
        <div className="mt-3 flex items-center gap-4 flex-wrap">
          {Object.entries(counts).map(([status, count]) => {
            const cfg = STATUS_CONFIG[status]
            return (
              <button
                key={status}
                onClick={() => setFilterStatus(filterStatus === status ? 'all' : status)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs transition-all
                  ${filterStatus === status ? `${cfg.bg} ${cfg.color} border ${cfg.border}` : 'text-[#94A3B8] hover:text-[#F3F4F6]'}`}
              >
                <span className={`font-bold ${cfg.color}`}>{count}</span> {cfg.label}
              </button>
            )
          })}
          {filterStatus !== 'all' && (
            <button onClick={() => setFilterStatus('all')} className="text-xs text-[#38BDF8] hover:underline">
              Show All
            </button>
          )}
        </div>
      </div>

      {/* Queue items */}
      <div className="divide-y divide-[#1E293B] max-h-[600px] overflow-y-auto">
        {filtered.map((tc, i) => (
          <div
            key={tc.test_id}
            className="px-6 py-4 hover:bg-[#050814]/50 transition-colors animate-fade-in"
            style={{ animationDelay: `${i * 30}ms`, animationFillMode: 'both' }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-semibold text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-2 py-0.5 rounded">
                    {tc.test_id}
                  </span>
                  <StatusBadge status={statuses[tc.test_id]} />
                  <span className={`text-xs px-2 py-0.5 rounded-full border
                    ${tc.test_type === 'Positive' ? 'bg-[#34D399]/10 text-[#34D399] border-[#34D399]/30' :
                      tc.test_type === 'Negative' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                      tc.test_type === 'Edge' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                      tc.test_type === 'Recovery' ? 'bg-teal-500/10 text-teal-400 border-teal-500/30' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/30'}`}>
                    {tc.test_type}
                  </span>
                </div>
                <p className="text-sm font-medium text-[#F3F4F6]">{tc.title}</p>
                <p className="text-xs text-[#94A3B8] mt-1">{tc.expected_result}</p>
                {tc.source_citation && (
                  <p className="text-xs text-[#38BDF8]/80 mt-1 italic">📌 {tc.source_citation}</p>
                )}

                {/* Edit notes */}
                {editingId === tc.test_id && (
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      placeholder="Add review notes..."
                      value={editNotes[tc.test_id] || ''}
                      onChange={e => setEditNotes(prev => ({ ...prev, [tc.test_id]: e.target.value }))}
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-[#050814] border border-[#1E293B] text-[#F3F4F6] placeholder-[#64748B] focus:outline-none focus:ring-1 focus:ring-[#38BDF8]"
                    />
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-xs text-[#94A3B8] hover:text-[#F3F4F6] px-2"
                    >Done</button>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => setStatus(tc.test_id, 'approved')}
                  className="p-1.5 rounded-lg hover:bg-[#34D399]/10 text-[#94A3B8] hover:text-[#34D399] transition-all"
                  title="Approve"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </button>
                <button
                  onClick={() => setStatus(tc.test_id, 'flagged')}
                  className="p-1.5 rounded-lg hover:bg-rose-500/10 text-[#94A3B8] hover:text-rose-400 transition-all"
                  title="Flag for Review"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
                  </svg>
                </button>
                <button
                  onClick={() => setEditingId(editingId === tc.test_id ? null : tc.test_id)}
                  className="p-1.5 rounded-lg hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#F3F4F6] transition-all"
                  title="Edit Notes"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-[#1E293B] bg-[#070C1E] flex items-center justify-between">
        <span className="text-xs text-[#64748B]">
          <span className="text-[#34D399] font-semibold">{counts.approved}</span> approved ·{' '}
          <span className="text-rose-400 font-semibold">{counts.flagged}</span> flagged ·{' '}
          <span className="text-[#94A3B8] font-semibold">{counts.pending}</span> pending
        </span>
      </div>
    </div>
  )
}
