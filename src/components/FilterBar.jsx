import React, { useState, useRef, useEffect } from 'react';

const MultiSelectDropdown = ({ label, options, selectedValues, onChange, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleOption = (val) => {
    const newSelected = selectedValues.includes(val)
      ? selectedValues.filter((v) => v !== val)
      : [...selectedValues, val];
    onChange(name, newSelected);
  };

  const displayValue = selectedValues.length === 0 
    ? "Select..." 
    : selectedValues.length === 1 
      ? selectedValues[0] 
      : `${selectedValues.length} selected`;

  return (
    <div className="relative w-full" ref={containerRef}>
      <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
        {label}
      </label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-md focus:ring-2 focus:ring-[#2C4583] focus:border-transparent block py-2 px-3 outline-none transition-all cursor-pointer flex justify-between items-center h-[38px]"
      >
        <span className="truncate">{displayValue}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-600 rounded-md shadow-xl max-h-60 overflow-y-auto custom-scrollbar">
          {options.map((opt) => (
            <div 
              key={opt} 
              onClick={() => toggleOption(opt)} 
              className="px-3 py-2.5 hover:bg-slate-700 cursor-pointer flex items-center gap-3 transition-colors border-b border-slate-700/50 last:border-b-0"
            >
              <div className={`w-4 h-4 border rounded flex items-center justify-center ${selectedValues.includes(opt) ? 'bg-[#2C4583] border-[#2C4583]' : 'border-slate-500'}`}>
                {selectedValues.includes(opt) && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </div>
              <span className="text-sm text-slate-200">{opt}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function FilterBar({ filters, onFilterChange, onClearFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  const handleMultiSelectChange = (name, value) => {
    onFilterChange(name, value);
  };

  const clusterOptions = [
    "k8s-prod-eu-west-1",
    "k8s-staging-global",
    "k8s-dev-sandbox"
  ];

  const namespaceOptions = [
    "production-finance",
    "production-store",
    "staging-iam"
  ];

  return (
    <div className="bg-slate-800/80 border border-slate-600 rounded-2xl p-5 shadow-md w-full">
      <div className="flex flex-col gap-5">
        
        <div className="flex flex-col gap-4">
          <MultiSelectDropdown
            label="Cluster"
            name="cluster"
            options={clusterOptions}
            selectedValues={filters.cluster || []}
            onChange={handleMultiSelectChange}
          />

          <MultiSelectDropdown
            label="Namespace"
            name="namespace"
            options={namespaceOptions}
            selectedValues={filters.namespace || []}
            onChange={handleMultiSelectChange}
          />

          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Service Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. payment-gateway"
              value={filters.name || ''}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-md focus:ring-2 focus:ring-[#2C4583] focus:border-transparent block py-2 px-3 outline-none transition-all placeholder:text-slate-600 h-[38px]"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="w-full">
              <label htmlFor="dependencyName" className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Dependency Name</label>
              <input
                id="dependencyName"
                name="dependencyName"
                type="text"
                placeholder="e.g. log4j"
                value={filters.dependencyName || ''}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-md focus:ring-2 focus:ring-[#2C4583] focus:border-transparent block py-2 px-3 outline-none transition-all placeholder:text-slate-600 h-[38px]"
              />
            </div>
            <div className="w-full">
              <label htmlFor="dependencyVersion" className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Version</label>
              <input
                id="dependencyVersion"
                name="dependencyVersion"
                type="text"
                placeholder="e.g. 2.14"
                value={filters.dependencyVersion || ''}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-md focus:ring-2 focus:ring-[#2C4583] focus:border-transparent block py-2 px-3 outline-none transition-all placeholder:text-slate-600 h-[38px]"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-700/80">
          <button
            type="button"
            onClick={onClearFilters}
            className="text-sm h-[38px] rounded-md bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold transition-all border border-slate-600 w-full"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
