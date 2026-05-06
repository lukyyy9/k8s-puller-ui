import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import * as d3Force from 'd3-force';
import { useNavigate } from 'react-router-dom';

const DEFAULT_WIDTH = 1100;
const DEFAULT_HEIGHT = 600;
const NODE_W = 160;
const NODE_H = 70;

export default function NetworkGraph({ nodes = [], edges = [] }) {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Pre-compute positions synchronously so the layoutId animation lands at
  // the final position rather than floating in to (0,0) and then drifting.
  const initialGraph = useMemo(() => {
    if (!nodes.length) return { nodes: [], edges: [] };
    const simulationNodes = nodes.map(d => ({ ...d }));
    const nodeIds = new Set(simulationNodes.map(n => n.id));
    const simulationEdges = edges
      .filter(e => nodeIds.has(e.source) && nodeIds.has(e.target))
      .map(d => ({ ...d }));

    const sim = d3Force.forceSimulation(simulationNodes)
      .force('link', d3Force.forceLink(simulationEdges).id(d => d.id).distance(180))
      .force('charge', d3Force.forceManyBody().strength(-400))
      .force('center', d3Force.forceCenter(DEFAULT_WIDTH / 2, DEFAULT_HEIGHT / 2))
      .force('collision', d3Force.forceCollide().radius(90))
      .stop();

    // Warm up the simulation so positions are stable on first paint.
    for (let i = 0; i < 200; i++) sim.tick();

    return { nodes: simulationNodes, edges: simulationEdges };
  }, [nodes, edges]);

  const [graphData, setGraphData] = useState(initialGraph);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const isDragging = useRef(false);
  const dragDistance = useRef(0);

  useEffect(() => {
    setGraphData(initialGraph);
  }, [initialGraph]);

  const handleWheel = (e) => {
    const zoomFactor = e.deltaY * 0.001;
    let newScale = scale.get() * (1 - zoomFactor);
    newScale = Math.max(0.1, Math.min(4, newScale));
    const scaleDiff = newScale / scale.get();

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newX = mouseX - (mouseX - x.get()) * scaleDiff;
    const newY = mouseY - (mouseY - y.get()) * scaleDiff;

    x.set(newX);
    y.set(newY);
    scale.set(newScale);
  };

  const handlePointerDown = (e) => {
    // Only drag on left click
    if (e.button !== 0) return;
    isDragging.current = true;
    dragDistance.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    dragDistance.current += Math.abs(e.movementX) + Math.abs(e.movementY);
    x.set(x.get() + e.movementX);
    y.set(y.get() + e.movementY);
  };

  const handlePointerUp = (e) => {
    isDragging.current = false;
  };

  const getVulnerabilityColor = (metadata) => {
    const v = metadata?.highestVulnerability || '';
    if (v === 'High') return 'border-rose-500 shadow-rose-500/50';
    if (v === 'Medium') return 'border-amber-500 shadow-amber-500/50';
    if (v === 'Low') return 'border-emerald-500 shadow-emerald-500/50';
    return 'border-slate-500 shadow-slate-500/50';
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[600px] bg-slate-800/20 backdrop-blur-sm rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ touchAction: 'none' }}
    >
      <motion.div 
        className="origin-top-left w-full h-full" 
        style={{ x, y, scale }}
      >
        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
          {graphData.edges.map(edge => (
          edge.source && typeof edge.source === 'object' && edge.target && typeof edge.target === 'object' ? (
            <motion.line
              key={edge.id}
              x1={edge.source.x}
              y1={edge.source.y}
              x2={edge.target.x}
              y2={edge.target.y}
              stroke={edge.verdict === 'DROPPED' ? '#f43f5e' : '#64748b'}
              strokeWidth={edge.metrics?.callCount > 100 ? 2.5 : 1.5}
              strokeDasharray={edge.verdict === 'DROPPED' ? '5,5' : 'none'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            />
          ) : null
        ))}
      </svg>
      {graphData.nodes.map(node => (
        <motion.div
          key={node.id}
          layoutId={`node-${node.id}`}
          onClick={(e) => {
            if (dragDistance.current < 5) {
              navigate(`/services/${node.label}`);
            }
          }}
          className={`absolute flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800 border-2 cursor-pointer shadow-lg ${getVulnerabilityColor(node.metadata)}`}
          style={{
            left: (node.x || DEFAULT_WIDTH / 2) - NODE_W / 2,
            top: (node.y || DEFAULT_HEIGHT / 2) - NODE_H / 2,
            width: NODE_W,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          <div className="font-semibold text-slate-200 truncate w-full text-center" title={node.label}>
            {node.label}
          </div>
          <div className="text-xs text-slate-400 truncate w-full text-center mt-1">
            {node.namespace}
          </div>
        </motion.div>
      ))}
      </motion.div>
    </div>
  );
}