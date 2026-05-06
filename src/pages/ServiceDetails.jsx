import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ServiceHeader from '../components/ServiceHeader';
import ServiceKPIs from '../components/ServiceKPIs';
import SbomDataGrid from '../components/SbomDataGrid';
import VulnerabilityDrawer from '../components/VulnerabilityDrawer';
import { getMockServiceDetails } from '../mockData';

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedContext, setSelectedContext] = useState(null);

  useEffect(() => {
    // In a real app, this would be a real API fetch to /api/services/{id}
    // For now, simulate network delay
    const fetchData = async () => {
      setLoading(true);
      try {
        // Mock data directly matching the payload format from the proposal
        const mockPayload = getMockServiceDetails(id);

        // Simulate 500ms delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setData(mockPayload);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCveClick = (cve, dependency) => {
    setSelectedContext({ 
      cve, 
      dependency,
      description: `Detailed description for ${cve} found in ${dependency.name}. In a real app, this would be fetched from the Vulnerability entity in the database.`
    });
    setDrawerOpen(true);
  };

  const handleRowClick = (dependency) => {
    if (dependency.cves && dependency.cves.length > 0) {
      // By default open the drawer for the most critical CVE
      handleCveClick(dependency.cves[0], dependency);
    } else {
      setSelectedContext({ 
        cve: null, 
        dependency,
        description: `This dependency has no known CVEs recorded.`
      });
      setDrawerOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl flex items-center justify-center min-h-[60vh]">
        <div className="text-[#2C4583] flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[#2C4583] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl text-center">
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-2">Error Loading Service</h2>
          <p className="mb-6">{error || "Could not load data"}</p>
          <button 
            onClick={() => navigate('/')} 
            className="bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-6 rounded-lg transition-colors border border-slate-600"
          >
            ← Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 w-full max-w-7xl animate-in fade-in duration-500">
      <div className="mb-4">
        <button 
          onClick={() => navigate('/')} 
          className="text-slate-400 hover:text-white transition-colors flex items-center text-sm font-medium"
        >
          <span className="mr-2">←</span> Back to Services
        </button>
      </div>

      <ServiceHeader data={data} />
      
      <ServiceKPIs 
        counts={data.vulnerabilityCounts} 
        totalDependencies={data.dependencies.length} 
      />

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
          Software Bill of Materials <span className="text-slate-500 text-sm font-normal">({data.dependencies.length} packages)</span>
        </h2>
        <p className="text-slate-400 text-sm mt-1 mb-2">
          Complete inventory of all software components used by this service image.
        </p>

        <SbomDataGrid 
          dependencies={data.dependencies} 
          onCveClick={handleCveClick}
          onRowClick={handleRowClick}
        />
      </div>

      <VulnerabilityDrawer 
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        selectedContext={selectedContext} 
      />
    </div>
  );
}
