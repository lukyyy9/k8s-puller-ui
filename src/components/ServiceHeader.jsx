import React from 'react';

export default function ServiceHeader({ data }) {
  const getCvssColor = (score) => {
    if (score >= 9.0) return 'bg-rose-600 text-white';
    if (score >= 7.0) return 'bg-orange-500 text-white';
    if (score >= 4.0) return 'bg-amber-500 text-white';
    return 'bg-emerald-500 text-white';
  };

  return (
    <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl border border-slate-700/80 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 shadow-lg">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">{data.serviceName}</h1>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="bg-slate-700 text-slate-300 px-2.5 py-1 rounded-md border border-slate-600">
            Cluster: <span className="font-semibold text-white">{data.clusterName}</span>
          </span>
          <span className="bg-slate-700 text-slate-300 px-2.5 py-1 rounded-md border border-slate-600">
            Namespace: <span className="font-semibold text-white">{data.namespaceName}</span>
          </span>
        </div>
        <div className="text-sm font-mono text-slate-400 bg-slate-900/50 p-2 rounded border border-slate-700 inline-block mt-2">
          {data.image}
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center p-4 bg-slate-900/50 rounded-xl border border-slate-700 min-w-32">
        <div className="text-sm text-slate-400 font-medium mb-1 relative z-10">Max CVSS</div>
        <div className={`text-4xl font-black px-4 py-2 rounded-lg ${getCvssColor(data.serviceMaxCvssScore)} shadow-inner`}>
          {data.serviceMaxCvssScore.toFixed(1)}
        </div>
      </div>
    </div>
  );
}
