'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  GraphNode, 
  GraphEdge, 
  NodeCategory 
} from '@/types';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw, 
  Search, 
  Layers, 
  Sparkles,
  GitBranch,
  CheckCircle2,
  BookOpen,
  Cpu,
  Milestone as MilestoneIcon,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Crosshair
} from 'lucide-react';

interface ProjectGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedNodeId: string | null;
  onSelectNode: (node: GraphNode | null) => void;
  onOpenDetails?: (node: GraphNode) => void;
}

export default function ProjectGraph({
  nodes: initialNodes,
  edges,
  selectedNodeId,
  onSelectNode,
  onOpenDetails
}: ProjectGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<GraphNode[]>(initialNodes);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync internal nodes if initialNodes changes
  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes]);

  // Center the graph initially
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPan({ x: rect.width / 2, y: rect.height / 2 });
    }
  }, []);

  // Helper to find connected node IDs for selection highlight
  const getConnectedNodeIds = useCallback((targetId: string | null): Set<string> => {
    if (!targetId) return new Set();
    const connected = new Set<string>([targetId]);
    edges.forEach(edge => {
      if (edge.source === targetId) connected.add(edge.target);
      if (edge.target === targetId) connected.add(edge.source);
    });
    return connected;
  }, [edges]);

  const activeConnectedSet = getConnectedNodeIds(selectedNodeId || hoveredNodeId);

  // Filtered nodes based on category and search
  const visibleNodes = nodes.filter(node => {
    if (filterCategory !== 'all' && node.category !== filterCategory) return false;
    if (searchQuery.trim() && !node.label.toLowerCase().includes(searchQuery.toLowerCase()) && !node.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const visibleNodeIds = new Set(visibleNodes.map(n => n.id));

  const visibleEdges = edges.filter(edge => {
    return visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target);
  });

  // Pan & Zoom handlers
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(prev => Math.min(Math.max(0.4, prev * zoomFactor), 2.5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only pan if clicking on empty canvas background
    if ((e.target as HTMLElement).tagName === 'svg' || (e.target as HTMLElement).classList.contains('canvas-bg')) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    } else if (draggedNodeId) {
      // Dragging a node
      const currentX = (e.clientX - pan.x) / scale;
      const currentY = (e.clientY - pan.y) / scale;
      setNodes(prev => prev.map(node => {
        if (node.id === draggedNodeId) {
          return { ...node, x: currentX, y: currentY };
        }
        return node;
      }));
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggedNodeId(null);
  };

  const handleReset = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPan({ x: rect.width / 2, y: rect.height / 2 });
      setScale(1);
    }
  };

  const handleFit = () => {
    if (containerRef.current && visibleNodes.length > 0) {
      const rect = containerRef.current.getBoundingClientRect();
      const minX = Math.min(...visibleNodes.map(n => n.x));
      const maxX = Math.max(...visibleNodes.map(n => n.x));
      const minY = Math.min(...visibleNodes.map(n => n.y));
      const maxY = Math.max(...visibleNodes.map(n => n.y));
      const graphWidth = (maxX - minX) + 200;
      const graphHeight = (maxY - minY) + 200;
      const targetScale = Math.min(rect.width / graphWidth, rect.height / graphHeight, 1.2);
      setScale(Math.max(targetScale, 0.5));
      setPan({
        x: rect.width / 2 - ((minX + maxX) / 2) * targetScale,
        y: rect.height / 2 - ((minY + maxY) / 2) * targetScale
      });
    }
  };

  const handleFocusNode = () => {
    const target = nodes.find(n => n.id === selectedNodeId) || nodes[0];
    if (containerRef.current && target) {
      const rect = containerRef.current.getBoundingClientRect();
      const targetScale = 1.35;
      setScale(targetScale);
      setPan({
        x: rect.width / 2 - target.x * targetScale,
        y: rect.height / 2 - target.y * targetScale
      });
    }
  };

  const getNodeColor = (category: NodeCategory, isSelected: boolean) => {
    switch (category) {
      case 'core':
        return {
          stroke: '#00E5FF',
          fill: 'rgba(0, 229, 255, 0.15)',
          glow: 'rgba(0, 229, 255, 0.6)',
          badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
        };
      case 'code':
        return {
          stroke: '#38BDF8',
          fill: 'rgba(56, 189, 248, 0.12)',
          glow: 'rgba(56, 189, 248, 0.5)',
          badge: 'bg-sky-500/20 text-sky-300 border-sky-500/30'
        };
      case 'tasks':
        return {
          stroke: '#10B981',
          fill: 'rgba(16, 185, 129, 0.12)',
          glow: 'rgba(16, 185, 129, 0.5)',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
        };
      case 'research':
        return {
          stroke: '#A855F7',
          fill: 'rgba(168, 85, 247, 0.12)',
          glow: 'rgba(168, 85, 247, 0.5)',
          badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
        };
      case 'architecture':
        return {
          stroke: '#F59E0B',
          fill: 'rgba(245, 158, 11, 0.12)',
          glow: 'rgba(245, 158, 11, 0.5)',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
        };
      case 'milestone':
        return {
          stroke: '#EC4899',
          fill: 'rgba(236, 72, 153, 0.12)',
          glow: 'rgba(236, 72, 153, 0.5)',
          badge: 'bg-pink-500/20 text-pink-300 border-pink-500/30'
        };
      default:
        return {
          stroke: '#94A3B8',
          fill: 'rgba(148, 163, 184, 0.12)',
          glow: 'rgba(148, 163, 184, 0.4)',
          badge: 'bg-slate-500/20 text-slate-300 border-slate-500/30'
        };
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none grid-canvas-bg cursor-grab active:cursor-grabbing"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* SVG Canvas for Connectors and Rendered Nodes */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transformOrigin: '0 0'
        }}
      >
        <defs>
          <linearGradient id="cyan-glow-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
          </linearGradient>
          <filter id="subtle-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Connecting Edges */}
        {visibleEdges.map(edge => {
          const sourceNode = visibleNodes.find(n => n.id === edge.source);
          const targetNode = visibleNodes.find(n => n.id === edge.target);
          if (!sourceNode || !targetNode) return null;

          const isConnected = 
            selectedNodeId === edge.source || 
            selectedNodeId === edge.target ||
            hoveredNodeId === edge.source || 
            hoveredNodeId === edge.target;

          const isDimmed = (selectedNodeId || hoveredNodeId) && !isConnected;

          // Compute midpoint for label
          const midX = (sourceNode.x + targetNode.x) / 2;
          const midY = (sourceNode.y + targetNode.y) / 2;

          // Curvature
          const dx = targetNode.x - sourceNode.x;
          const dy = targetNode.y - sourceNode.y;
          const curveOffset = Math.sin(Math.atan2(dy, dx)) * 20;

          return (
            <g key={edge.id} className="transition-opacity duration-300">
              <path
                d={`M ${sourceNode.x} ${sourceNode.y} Q ${midX + curveOffset} ${midY - curveOffset} ${targetNode.x} ${targetNode.y}`}
                fill="none"
                stroke={isConnected ? '#00E5FF' : 'rgba(255, 255, 255, 0.12)'}
                strokeWidth={isConnected ? 2.2 : 1.2}
                strokeDasharray={edge.type === 'dependency' ? '4 3' : undefined}
                filter={isConnected ? 'url(#subtle-glow)' : undefined}
                opacity={isDimmed ? 0.15 : isConnected ? 1 : 0.45}
              />
              {/* Animated particle pulse traveling along active connections */}
              {isConnected && (
                <circle r="3" fill="#00E5FF" filter="url(#subtle-glow)">
                  <animateMotion
                    path={`M ${sourceNode.x} ${sourceNode.y} Q ${midX + curveOffset} ${midY - curveOffset} ${targetNode.x} ${targetNode.y}`}
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              {/* Optional Relationship Label on Hover/Selected */}
              {isConnected && edge.label && (
                <text
                  x={midX}
                  y={midY - 6}
                  fill="#94A3B8"
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                  style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* HTML Node Elements Container */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transformOrigin: '0 0'
        }}
      >
        {visibleNodes.map(node => {
          const isSelected = selectedNodeId === node.id;
          const isHovered = hoveredNodeId === node.id;
          const isConnected = activeConnectedSet.has(node.id);
          const isDimmed = (selectedNodeId || hoveredNodeId) && !isConnected;
          const theme = getNodeColor(node.category, isSelected);
          const isCore = node.type === 'project';

          return (
            <div
              key={node.id}
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
              className={`absolute pointer-events-auto transition-all duration-200 cursor-pointer ${
                isDimmed ? 'opacity-25 scale-95' : 'opacity-100'
              } ${isSelected ? 'z-30 scale-105' : isHovered ? 'z-20 scale-102' : 'z-10'}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelectNode(node);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                if (onOpenDetails) onOpenDetails(node);
              }}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              onMouseDown={(e) => {
                e.stopPropagation();
                setDraggedNodeId(node.id);
              }}
            >
              {/* Core Project Hero Node */}
              {isCore ? (
                <div className={`relative px-5 py-3 rounded-xl glass-panel-cyan border transition-all duration-300 ${
                  isSelected 
                    ? 'border-cyan-400 shadow-[0_0_30px_rgba(0,229,255,0.45)]' 
                    : 'border-cyan-500/40 hover:border-cyan-400/80 shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00E5FF]" />
                    <span className="text-[10px] font-mono tracking-wider uppercase text-cyan-300">
                      {node.subtitle}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
                    {node.label}
                    {node.progress !== undefined && (
                      <span className="text-[11px] px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800 font-mono">
                        {node.progress}%
                      </span>
                    )}
                  </h3>
                </div>
              ) : (
                /* Compact Entity Node Pill */
                <div 
                  className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-lg glass-panel border transition-all duration-300 ${
                    isSelected 
                      ? 'border-cyan-400/90 shadow-[0_0_20px_rgba(0,229,255,0.35)] bg-slate-900/90' 
                      : isHovered 
                        ? 'border-slate-400/50 shadow-[0_0_12px_rgba(255,255,255,0.1)] bg-slate-950/80' 
                        : 'border-white/10 hover:border-white/20 bg-slate-950/60'
                  }`}
                  style={{
                    boxShadow: isSelected ? `0 0 20px ${theme.glow}` : undefined
                  }}
                >
                  {/* Glowing Status Dot */}
                  <span 
                    className="w-2 h-2 rounded-full transition-transform duration-200 group-hover:scale-125"
                    style={{ 
                      backgroundColor: theme.stroke,
                      boxShadow: `0 0 8px ${theme.glow}` 
                    }}
                  />

                  {/* Label & Subtitle */}
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-slate-200 tracking-tight whitespace-nowrap">
                        {node.label}
                      </span>
                      {node.progress !== undefined && (
                        <span className="text-[9px] font-mono px-1 rounded bg-white/5 text-slate-400 border border-white/5">
                          {node.progress}%
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono tracking-tight leading-tight">
                      {node.subtitle}
                    </span>
                  </div>

                  {/* Hover Arrow Indicator */}
                  <ChevronRight className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Top-Left Status & Filter Toolbar */}
      <div className="absolute top-4 left-4 z-40 flex items-center gap-2">
        <div className="glass-panel px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10B981]" />
          <span className="text-xs font-mono text-slate-300">
            {visibleNodes.length} Nodes · {visibleEdges.length} Links
          </span>
        </div>

        {/* Filter Pills */}
        <div className="glass-panel p-1 rounded-lg border border-white/10 flex items-center gap-1">
          {[
            { id: 'all', label: 'All' },
            { id: 'code', label: 'Code' },
            { id: 'tasks', label: 'Tasks' },
            { id: 'research', label: 'Research' },
            { id: 'architecture', label: 'Architecture' },
            { id: 'milestone', label: 'Milestones' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterCategory(f.id)}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                filterCategory === f.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Top-Right Node Search & Quick Actions */}
      <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
        {isSearchOpen ? (
          <div className="glass-panel px-2.5 py-1.5 rounded-lg border border-cyan-500/30 flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <input
              type="text"
              placeholder="Find node or concept..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-44 font-mono"
              autoFocus
            />
            <button 
              onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }}
              className="text-xs text-slate-400 hover:text-white"
            >
              ×
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsSearchOpen(true)}
            className="glass-panel p-2 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:border-cyan-500/30 transition-colors"
            title="Search nodes"
          >
            <Search className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Floating Bottom-Right Canvas Controls */}
      <div className="absolute bottom-5 right-5 z-40 flex flex-col gap-1.5 glass-panel p-1.5 rounded-xl border border-white/10 shadow-2xl">
        <button
          onClick={() => setScale(prev => Math.min(2.5, prev * 1.2))}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setScale(prev => Math.max(0.4, prev * 0.8))}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-full h-px bg-white/10 my-0.5" />
        <button
          onClick={handleFit}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Fit Graph to View"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
        <button
          onClick={handleFocusNode}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Focus Selected Node"
        >
          <Crosshair className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Reset Canvas View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Canvas Hint */}
      <div className="absolute bottom-5 left-5 z-30 pointer-events-none">
        <p className="text-[11px] font-mono text-slate-500">
          Drag canvas to pan · Scroll to zoom · Click node to inspect context
        </p>
      </div>
    </div>
  );
}
