import React from 'react';

export default function ServiceKPIs({ counts, totalDependencies }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/80 p-6 flex flex-col items-center justify-center shadow-lg transition-transform hover:-translate-y-1 duration-300">
        <h3 className="text-slate-400 font-medium text-lg mb-2">Total Dependencies</h3>
        <p className="text-4xl font-extrabold">{totalDependencies}</p>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl border border-rose-900/50 p-6 flex flex-col items-center justify-center shadow-lg transition-transform hover:-translate-y-1 duration-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-rose-700"></div>
        <h3 className="text-slate-300 font-medium text-lg mb-2">Critical CVSS (≥ 9.0)</h3>
        <p className="text-4xl font-extrabold text-rose-500">{counts?.critical || 0}</p>
      </div>

      <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl border border-orange-900/50 p-6 flex flex-col items-center justify-center shadow-lg transition-transform hover:-translate-y-1 duration-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600"></div>
        <h3 className="text-slate-300 font-medium text-lg mb-2">High CVSS (7.0 - 8.9)</h3>
        <p className="text-4xl font-extrabold text-orange-400">{counts?.high || 0}</p>
      </div>
    </div>
  );
}
