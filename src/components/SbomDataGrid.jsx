import React, { useMemo } from 'react';

export default function SbomDataGrid({ dependencies, onCveClick, onRowClick }) {
  // 3.2 Ensure the SBOM grid is sorted by CVSS Score descending by default.
  const sortedDependencies = useMemo(() => {
    return [...dependencies].sort((a, b) => b.maxCvssScore - a.maxCvssScore);
  }, [dependencies]);

  const getCvssColorText = (score) => {
    if (score >= 9.0) return 'text-rose-500 font-bold';
    if (score >= 7.0) return 'text-orange-500 font-semibold';
    if (score >= 4.0) return 'text-amber-500 font-semibold';
    if (score > 0) return 'text-emerald-500';
    return 'text-slate-500';
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300 min-w-[800px]">
          <thead className="bg-slate-900/80 uppercase text-slate-400 text-xs border-b border-slate-700/80 font-semibold">
            <tr>
              <th className="py-4 px-6 whitespace-nowrap">Dependency Name</th>
              <th className="py-4 px-6 whitespace-nowrap">Version</th>
              <th className="py-4 px-6 whitespace-nowrap">Package Type</th>
              <th className="py-4 px-6 whitespace-nowrap">CVEs</th>
              <th className="py-4 px-6 whitespace-nowrap text-right">Max CVSS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {sortedDependencies.map((dep, idx) => (
              <tr 
                key={`${dep.name}-${dep.version}-${idx}`} 
                className="hover:bg-slate-700/40 transition-colors cursor-pointer group"
                onClick={() => onRowClick && onRowClick(dep)}
              >
                <td className="py-4 px-6 font-medium text-slate-200">{dep.name}</td>
                <td className="py-4 px-6 text-slate-400 font-mono text-xs">{dep.version}</td>
                <td className="py-4 px-6">
                  <span className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded text-xs border border-slate-600">
                    {dep.packageType}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex flex-wrap gap-1.5">
                    {dep.cves && dep.cves.length > 0 ? (
                      dep.cves.map((cve) => (
                        <span 
                          key={cve}
                          onClick={(e) => {
                            e.stopPropagation(); // prevent row click
                            if (onCveClick) onCveClick(cve, dep);
                          }}
                          className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded text-xs hover:bg-rose-500/20 cursor-pointer transition-colors whitespace-nowrap"
                        >
                          {cve}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-500 text-xs italic">None</span>
                    )}
                  </div>
                </td>
                <td className={`py-4 px-6 text-right ${getCvssColorText(dep.maxCvssScore)}`}>
                  {dep.maxCvssScore > 0 ? dep.maxCvssScore.toFixed(1) : '-'}
                </td>
              </tr>
            ))}
            
            {sortedDependencies.length === 0 && (
              <tr>
                <td colSpan="5" className="py-8 text-center text-slate-500 italic">
                  No dependencies found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
