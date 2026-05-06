import { useState, useEffect, useMemo } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import ServiceDetails from './pages/ServiceDetails'
import ProtectedRoute from './components/ProtectedRoute'
import TopBar from './components/TopBar'
import FilterBar from './components/FilterBar'
import { useAuth } from './hooks/useAuth'
import { MOCK_DASHBOARD_DATA } from './mockData'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 selection:bg-[#2C4583]/30 pt-24 pb-12">
      <TopBar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/services/:id" element={<ProtectedRoute><ServiceDetails /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

function Home() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [pageSize, setPageSize] = useState(25)
  const [sortConfig, setSortConfig] = useState({ key: 'serviceName', direction: 'asc' })
  const [filters, setFilters] = useState({
    dependencyName: '',
    dependencyVersion: '',
    name: '',
    cluster: [],
    namespace: []
  })

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleClearFilters = () => {
    setFilters({
      dependencyName: '',
      dependencyVersion: '',
      name: '',
      cluster: [],
      namespace: []
    })
  }

  useEffect(() => {
    // Load mock data on mount
    setData(MOCK_DASHBOARD_DATA)
  }, [])

  const requestSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? ' ↓' : ' ↑';
  };

  const getCvssColor = (score) => {
    if (score >= 7.0) return 'text-rose-500 font-bold'
    if (score >= 4.0) return 'text-amber-500 font-semibold'
    return 'text-emerald-500'
  }

  // Derive visible services by filtering inline client-side
  const visibleServices = useMemo(() => {
    if (!data) return [];
    return data.services.filter((service) => {
      const sNameMatch = !filters.name || service.serviceName.toLowerCase().includes(filters.name.toLowerCase());
      
      // Multi-select matches (OR logic within the array if elements exist)
      const clusterMatch = filters.cluster.length === 0 || filters.cluster.some(
        c => service.clusterName.toLowerCase().includes(c.toLowerCase())
      );
      
      const namespaceMatch = filters.namespace.length === 0 || filters.namespace.some(
        n => service.namespaceName.toLowerCase().includes(n.toLowerCase())
      );
      
      // Note: since mock data doesn't have dependency list, we simulate dependencyName/dependencyVersion search returning true if nothing typed
      // In a real app, this would be matched against the service's dependencies or sent to server
      const depMatch = !filters.dependencyName || true; // Placeholder for actual dependency filtering logic
      const depVersionMatch = !filters.dependencyVersion || true; 

      return sNameMatch && clusterMatch && namespaceMatch && depMatch && depVersionMatch;
    });
  }, [data, filters]);

  const sortedVisibleServices = useMemo(() => {
    let sortableItems = [...visibleServices];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [visibleServices, sortConfig]);

  if (!data) return null;

  return (
    <div className="container mx-auto px-4 py-8 w-full max-w-7xl animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-100">Services</h1>
          <p className="text-sm text-slate-400 mt-1">Overview of all running services in production</p>
        </div>
      </div>

      <FilterBar 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        onClearFilters={handleClearFilters} 
      />

      <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 min-w-[800px]">
            <thead className="bg-slate-900/80 uppercase text-slate-400 text-xs border-b border-slate-700/80 font-semibold">
              <tr>
                <th className="py-4 px-6 whitespace-nowrap cursor-pointer hover:text-slate-200" onClick={() => requestSort('serviceName')}>
                  Service{getSortIcon('serviceName')}
                </th>
                <th className="py-4 px-6 whitespace-nowrap cursor-pointer hover:text-slate-200" onClick={() => requestSort('clusterName')}>
                  Cluster{getSortIcon('clusterName')}
                </th>
                <th className="py-4 px-6 whitespace-nowrap cursor-pointer hover:text-slate-200" onClick={() => requestSort('namespaceName')}>
                  Namespace{getSortIcon('namespaceName')}
                </th>
                <th className="py-4 px-6 whitespace-nowrap cursor-pointer hover:text-slate-200" onClick={() => requestSort('image')}>
                  Image{getSortIcon('image')}
                </th>
                <th className="py-4 px-6 whitespace-nowrap cursor-pointer hover:text-slate-200" onClick={() => requestSort('serviceMaxCvssScore')}>
                  Max CVSS{getSortIcon('serviceMaxCvssScore')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {sortedVisibleServices.map((service, idx) => (
                <tr 
                  key={idx} 
                  className="hover:bg-slate-700/40 transition-colors cursor-pointer"
                  onClick={() => navigate(`/services/${service.serviceName}`)}
                >
                  <td className="py-4 px-6 font-medium text-slate-200">{service.serviceName}</td>
                  <td className="py-4 px-6 text-slate-400">{service.clusterName}</td>
                  <td className="py-4 px-6 text-slate-400">{service.namespaceName}</td>
                  <td className="py-4 px-6 font-mono text-xs text-slate-400">{service.image}</td>
                  <td className={`py-4 px-6 ${getCvssColor(service.serviceMaxCvssScore)}`}>
                    {service.serviceMaxCvssScore.toFixed(1)}
                  </td>
                </tr>
              ))}
              
              {visibleServices.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-500 italic">
                    No services matched your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination & Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 sm:px-6 bg-slate-900/50 border-t border-slate-700/80">
          <div className="text-sm text-slate-400">
            Showing <span className="font-semibold text-slate-200">{visibleServices.length}</span> of <span className="font-semibold text-slate-200">{data.totalElements}</span> results
          </div>
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <label htmlFor="pageSize" className="text-sm font-medium text-slate-400">Per page:</label>
              <select 
                id="pageSize" 
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="bg-slate-800 border border-slate-600 text-slate-200 text-sm rounded-lg focus:ring-[#2C4583] focus:border-[#2C4583] block py-1.5 px-3 outline-none"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            
            <nav className="inline-flex rounded-lg shadow-sm" aria-label="Pagination">
              <button className="px-3 py-1.5 text-sm font-medium text-slate-400 bg-slate-800 border border-slate-600 rounded-l-lg hover:bg-slate-700 hover:text-white transition-colors focus:z-10 disabled:opacity-50">
                Prev
              </button>
              <button aria-current="page" className="px-3.5 py-1.5 text-sm font-medium bg-slate-700 border-y border-slate-600 focus:z-10">
                1
              </button>
              <button className="px-3.5 py-1.5 text-sm font-medium text-slate-400 bg-slate-800 border border-slate-600 hover:bg-slate-700 hover:text-white transition-colors focus:z-10">
                2
              </button>
              <button disabled className="px-3.5 py-1.5 text-sm font-medium text-slate-500 flex items-center bg-slate-800 border-y border-slate-600 pointer-events-none">
                ...
              </button>
              <button className="px-3.5 py-1.5 text-sm font-medium text-slate-400 bg-slate-800 border border-slate-600 hover:bg-slate-700 hover:text-white transition-colors focus:z-10">
                {data.totalPages}
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-slate-400 bg-slate-800 border-y border-r border-slate-600 rounded-r-lg hover:bg-slate-700 hover:text-white transition-colors focus:z-10">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
