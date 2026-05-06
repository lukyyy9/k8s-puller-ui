import { useState, useEffect, useMemo } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ServiceDetails from './pages/ServiceDetails'
import ProtectedRoute from './components/ProtectedRoute'
import TopBar from './components/TopBar'
import FilterBar from './components/FilterBar'
import NetworkGraph from './components/NetworkGraph'
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
  const [isGraphView, setIsGraphView] = useState(false)
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
  const visibleNodes = useMemo(() => {
    if (!data) return [];
    return data.nodes.filter((node) => {
      const sNameMatch = !filters.name || node.label.toLowerCase().includes(filters.name.toLowerCase());
      
      // Multi-select matches (OR logic within the array if elements exist)
      const clusterMatch = filters.cluster.length === 0 || filters.cluster.some(
        c => node.cluster.toLowerCase().includes(c.toLowerCase())
      );
      
      const namespaceMatch = filters.namespace.length === 0 || filters.namespace.some(
        n => node.namespace.toLowerCase().includes(n.toLowerCase())
      );
      
      const depMatch = !filters.dependencyName || true; 
      const depVersionMatch = !filters.dependencyVersion || true; 

      return sNameMatch && clusterMatch && namespaceMatch && depMatch && depVersionMatch;
    });
  }, [data, filters]);

  const sortedVisibleNodes = useMemo(() => {
    let sortableItems = [...visibleNodes];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        // Handle metadata sorting for serviceMaxCvssScore
        const aValue = sortConfig.key === 'serviceMaxCvssScore' ? a.metadata.serviceMaxCvssScore : 
                      (sortConfig.key === 'serviceName' ? a.label : 
                      (sortConfig.key === 'clusterName' ? a.cluster : a.namespace));
                      
        const bValue = sortConfig.key === 'serviceMaxCvssScore' ? b.metadata.serviceMaxCvssScore : 
                      (sortConfig.key === 'serviceName' ? b.label : 
                      (sortConfig.key === 'clusterName' ? b.cluster : b.namespace));
        
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
  }, [visibleNodes, sortConfig]);

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

      <div className="flex justify-end my-4">
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={isGraphView}
            onChange={(e) => setIsGraphView(e.target.checked)}
          />
          <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
          <span className="ml-3 text-sm font-medium text-slate-300">Graph View</span>
        </label>
      </div>

      <AnimatePresence initial={false}>
        {isGraphView ? (
          <motion.div
            key="graph"
          >
            <NetworkGraph nodes={visibleNodes} edges={data.edges} />
          </motion.div>
        ) : (
          <motion.div 
            key="table"
            className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden"
          >
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
                  {sortedVisibleNodes.map((node, idx) => (
                    <motion.tr 
                      layoutId={`node-${node.id}`}
                      key={node.id}
                      className="hover:bg-slate-700/40 cursor-pointer"
                      onClick={() => navigate(`/services/${node.label}`)}
                    >
                      <td className="py-4 px-6 font-medium text-slate-200">{node.label}</td>
                      <td className="py-4 px-6 text-slate-400">{node.cluster}</td>
                      <td className="py-4 px-6 text-slate-400">{node.namespace}</td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-400">{node.metadata.image}</td>
                      <td className={`py-4 px-6 ${getCvssColor(node.metadata.serviceMaxCvssScore)}`}>
                        {node.metadata.serviceMaxCvssScore.toFixed(1)}
                      </td>
                    </motion.tr>
                  ))}
                  
                  {visibleNodes.length === 0 && (
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
            Showing <span className="font-semibold text-slate-200">{visibleNodes.length}</span> of <span className="font-semibold text-slate-200">{data.totalElements}</span> results
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
      </motion.div>
      )}
      </AnimatePresence>
    </div>
  )
}

export default App
