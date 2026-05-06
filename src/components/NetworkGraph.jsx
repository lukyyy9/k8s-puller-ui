import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import * as d3Force from 'd3-force';
import { useNavigate } from 'react-router-dom';

export default function NetworkGraph({ nodes = [], edges = [] }) {
  const containerRef = useRef(null);
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const navigate = useNavigate();

  useEffect(() => {
    if (!containerRef.current || !nodes.length) return;

    const width = containerRef.current.clientWidth || 800;
    const height = containerRef.current.clientHeight || 600;

    // Create a copy of nodes and edges for d3-force to mutate
    const simulationNodes = nodes.map(d => ({ ...d }));
    // Only keep edges where source and target nodes exist in the current visible nodes
    const nodeIds = new Set(simulationNodes.map(n => n.id));
    const simulationEdges = edges
      .filter(e => nodeIds.has(e.source) && nodeIds.has(e.target))
      .map(d => ({ ...d }));

    const simulation = d3Force.forceSimulation(simulationNodes)
      .force('link', d3Force.forceLink(simulationEdges).id(d => d.id).distance(150))
      .force('charge', d3Force.forceManyBody().strength(-300))
      .force('center', d3Force.forceCenter(width / 2, height / 2))
      .force('collision', d3Force.forceCollide().radius(60))
      .on('tick', () => {
        setGraphData({
          nodes: [...simulationNodes],
          edges: [...simulationEdges],
        });
      });

    // Run for a bit to stabilize layout initially to avoid messy floating, 
    // but tick handles the React state updates
    return () => {
      simulation.stop();
    };
  }, [nodes, edges]);

  const getVulnerabilityColor = (metadata) => {
    const v = metadata?.highestVulnerability || '';
    if (v === 'High') return 'border-rose-500 shadow-rose-500/50';
    if (v === 'Medium') return 'border-amber-500 shadow-amber-500/50';
    if (v === 'Low') return 'border-emerald-500 shadow-emerald-500/50';
    return 'border-slate-500 shadow-slate-500/50';
  };

  return (
    <div ref={containerRef} className="relative w-full h-[600px] bg-slate-800/20 backdrop-blur-sm rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden mt-4 pt-4 pb-4">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {graphData.edges.map(edge => (
          <line
            key={edge.id}
            x1={edge.source.x}
            y1={edge.source.y}
            x2={edge.target.x}
            y2={edge.target.y}
            stroke="#475569" // slate-600
            strokeWidth={edge.metrics?.callCount > 100 ? 3 : 1.5}
            strokeOpacity={0.6}
            strokeDasharray={edge.verdict === 'DROPPED' ? '5,5' : 'none'}
          />
        ))}
      </svg>
      {graphData.nodes.map(node => (
        <motion.div
          key={node.id}
          layoutId={`node-${node.id}`}
          onClick={() => navigate(`/services/${node.label}`)}
          className={`absolute flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800 border-2 cursor-pointer transition-transform hover:scale-105 ${getVulnerabilityColor(node.metadata)}`}
          style={{
            left: node.x,
            top: node.y,
            transform: 'translate(-50%, -50%)',
            width: 160,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="font-semibold text-slate-200 truncate w-full text-center" title={node.label}>
            {node.label}
          </div>
          <div className="text-xs text-slate-400 truncate w-full text-center mt-1">
            {node.namespace}
          </div>
          <div className="mt-2 text-xs font-mono bg-slate-900 px-2 py-1 rounded text-slate-300">
            CVSS: {node.metadata?.serviceMaxCvssScore?.toFixed(1)}
          </div>
        </motion.div>
      ))}
    </div>
  );
}