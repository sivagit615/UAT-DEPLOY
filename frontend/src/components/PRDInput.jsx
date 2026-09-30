const SAMPLE_PRD = `Product: User Authentication & Security Module

User Stories:
1. As a new user, I want to register with my email and password so I can access the enterprise platform.
2. As a registered user, I want to log in with multi-factor authentication (MFA) so my account is secure.
3. As a user, I want to reset my password via email if I forget it.
4. As a user, I want to stay logged in for 30 days on trusted devices unless I manually log out.
5. As an admin, I want to lock accounts after 5 failed login attempts to prevent brute-force attacks.

Business Rules:
- Passwords must be at least 12 characters long with uppercase, lowercase, numbers, and symbols.
- Email addresses must be unique in the system and validated against domain blacklist.
- Password reset tokens expire after 15 minutes for enhanced security.
- Users must verify their email before accessing workspace resources.`

export default function PRDInput({ value, onChange, onSubmit, isLoading }) {
  const charCount = value.length
  const maxChars = 10000

  return (
    <div className="bg-white p-6 sm:p-8 animate-fade-in border border-[#E2DED4] rounded-2xl shadow-sm">
      {/* Card header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E2DED4]">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-xl bg-[#3B4B34]/10 border border-[#3B4B34]/30 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-[#3B4B34]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h2 className="text-xl font-extrabold text-[#171512] font-sans tracking-tight">PRD & Requirements Specification</h2>
          </div>
          <p className="text-xs text-[#5C6370] ml-11 font-medium">Paste your Product Requirement Document, user stories, or acceptance criteria below.</p>
        </div>
        
        <button
          onClick={() => onChange(SAMPLE_PRD)}
          className="btn-secondary btn-lift text-xs font-bold !py-2 !px-3.5 text-[#3B4B34] border-[#3B4B34]/40 hover:border-[#3B4B34] hover:text-[#3B4B34] self-start sm:self-auto"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9" />
          </svg>
          Load Sample PRD
        </button>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          id="prd-input"
          className="textarea-primary h-72 text-[#171512]"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste your PRD, user stories, acceptance criteria, or feature specifications here...

Example:
As a user, I want to log in with my email and password so I can access my dashboard.
Business Rule: Accounts should lock after 5 failed attempts."
          maxLength={maxChars}
          disabled={isLoading}
        />
        {/* Char counter */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#F4F1EA] border border-[#E2DED4] backdrop-blur-sm">
          <span className={`text-xs font-mono font-bold ${charCount > maxChars * 0.9 ? 'text-[#991B1B]' : 'text-[#5C6370]'}`}>
            {charCount.toLocaleString()} / {maxChars.toLocaleString()} chars
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5 pt-4 border-t border-[#E2DED4]">
        <div className="flex items-center gap-2 text-xs text-[#5C6370] font-medium">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F4F1EA] border border-[#E2DED4] text-[#5C6370]">
            <svg className="w-4 h-4 text-[#3B4B34]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            TestMind AI engine automatically extracts rules & matrix
          </span>
        </div>

        <button
          id="generate-btn"
          onClick={onSubmit}
          disabled={isLoading || !value.trim()}
          className="btn-primary btn-lift w-full sm:w-auto !px-6 !py-3 text-sm font-bold shadow-sm"
        >
          {isLoading ? (
            <>
              <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Auditing Requirements...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              Generate UAT Matrix
            </>
          )}
        </button>
      </div>
    </div>
  )
}


