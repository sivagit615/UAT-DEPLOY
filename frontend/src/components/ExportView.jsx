import React, { useState } from 'react';

export default function ExportView({ result }) {
  const [copiedJira, setCopiedJira] = useState(false);

  if (!result || !result.test_cases) {
    return (
      <div className="bg-white p-12 text-center border border-[#E2DED4] rounded-2xl shadow-sm">
        <div className="w-12 h-12 rounded-full bg-[#F4F1EA] text-[#5C6370] flex items-center justify-center mx-auto mb-3 text-xl border border-[#E2DED4]">📥</div>
        <p className="text-[#171512] font-bold">No suite data available for export.</p>
      </div>
    );
  }

  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "testmind_uat_matrix.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const downloadCSV = () => {
    const headers = ["Test ID", "Title", "Type", "Expected Result", "Source Citation", "Steps"];
    const rows = result.test_cases.map(tc => [
      tc.test_id || "",
      `"${(tc.title || "").replace(/"/g, '""')}"`,
      tc.test_type || "",
      `"${(tc.expected_result || "").replace(/"/g, '""')}"`,
      tc.source_citation || "",
      `"${(tc.steps || []).join('\n').replace(/"/g, '""')}"`
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", encodeURI(csvContent));
    downloadAnchorNode.setAttribute("download", "testmind_uat_matrix.csv");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const copyJiraPayload = () => {
    let markdown = `# UAT Test Matrix Suite\n\n`;
    result.test_cases.forEach(tc => {
      markdown += `## ${tc.test_id}: ${tc.title}\n`;
      markdown += `**Type:** ${tc.test_type} | **Source Ref:** ${tc.source_citation || 'N/A'}\n\n`;
      markdown += `### Execution Steps:\n`;
      tc.steps?.forEach((step, i) => {
        markdown += `${i + 1}. ${step}\n`;
      });
      markdown += `\n### Expected Outcome:\n${tc.expected_result}\n\n---\n\n`;
    });

    navigator.clipboard.writeText(markdown).then(() => {
      setCopiedJira(true);
      setTimeout(() => setCopiedJira(false), 2000);
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-8 sm:p-10 text-center max-w-3xl mx-auto my-4 border border-[#E2DED4] rounded-2xl shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-[#3B4B34]/10 border border-[#3B4B34]/30 flex items-center justify-center mx-auto mb-6 shadow-sm text-3xl">
          🚀
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171512] mb-2 font-sans tracking-tight">Export Test Suite Artifacts</h2>
        <p className="text-[#5C6370] mb-8 text-sm max-w-lg mx-auto leading-relaxed">
          Download structured test case artifacts or copy ready-to-paste markdown payloads for Jira, Azure DevOps, or TestRail.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button onClick={downloadJSON} className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-[#F4F1EA] border border-[#E2DED4] hover:border-[#3B4B34] hover:bg-[#F7F5EE] transition-all duration-200 cursor-pointer group shadow-sm">
            <span className="text-3xl group-hover:scale-110 transition-transform">📄</span>
            <div className="text-center">
              <span className="font-bold text-[#171512] text-sm block">Download JSON</span>
              <span className="text-[11px] text-[#5C6370]">Structured Data</span>
            </div>
          </button>
          
          <button onClick={downloadCSV} className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-[#F4F1EA] border border-[#E2DED4] hover:border-[#3B4B34] hover:bg-[#F7F5EE] transition-all duration-200 cursor-pointer group shadow-sm">
            <span className="text-3xl group-hover:scale-110 transition-transform">📊</span>
            <div className="text-center">
              <span className="font-bold text-[#171512] text-sm block">Download CSV</span>
              <span className="text-[11px] text-[#5C6370]">Excel / Spreadsheet</span>
            </div>
          </button>
          
          <button onClick={copyJiraPayload} className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-[#F4F1EA] border border-[#E2DED4] hover:border-[#3B4B34] hover:bg-[#F7F5EE] transition-all duration-200 cursor-pointer group relative overflow-hidden shadow-sm">
            {copiedJira ? (
              <div className="absolute inset-0 bg-[#3B4B34] flex flex-col items-center justify-center gap-1.5 animate-fade-in text-white">
                <span className="text-2xl">✅</span>
                <span className="font-bold text-sm">Copied to Clipboard!</span>
              </div>
            ) : (
              <>
                <span className="text-3xl group-hover:scale-110 transition-transform">📋</span>
                <div className="text-center">
                  <span className="font-bold text-[#171512] text-sm block">Copy Jira Payload</span>
                  <span className="text-[11px] text-[#5C6370]">Markdown Format</span>
                </div>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}


