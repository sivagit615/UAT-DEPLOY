export default function Header() {
  return (
    <header className="border-b border-[#E2DED4] bg-white/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Logo & Branding */}
        <div className="flex items-center gap-3.5">
          <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-[#3B4B34] text-white shadow-sm border border-[#3B4B34] group">
            {/* Neural Shield SVG Icon */}
            <svg className="w-5 h-5 text-white transform group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#B96A4A] rounded-full animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#B96A4A] rounded-full border-2 border-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold tracking-tight text-[#171512] font-sans">
                TestMind <span className="text-[#3B4B34]">AI</span>
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#3B4B34]/10 text-[#3B4B34] border border-[#3B4B34]/30">
                PRO
              </span>
            </div>
            <p className="text-xs text-[#5C6370] font-medium leading-none mt-0.5">Enterprise UAT Intelligence Platform</p>
          </div>
        </div>

        {/* Nav badges & CTA */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F1EA] border border-[#E2DED4] text-xs font-semibold text-[#171512]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#166534] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#166534]"></span>
            </span>
            <span className="text-[#5C6370]">Engine Pipeline:</span>
            <span className="text-[#166534] font-bold">Active</span>
          </div>
          
          <div className="h-4 w-px bg-[#E2DED4]" />
          
          <button 
            onClick={() => {
              const inputEl = document.getElementById('prd-input');
              if (inputEl) {
                inputEl.scrollIntoView({ behavior: 'smooth' });
                inputEl.focus();
              }
            }}
            className="btn-primary btn-lift !px-4 !py-2 !text-xs rounded-xl"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Start Auditing
          </button>
        </div>
      </div>
    </header>
  )
}


