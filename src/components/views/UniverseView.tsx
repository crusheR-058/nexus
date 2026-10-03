'use client';

import React, { useState } from 'react';
import { Project, GraphNode, GraphEdge } from '@/types';
import ProjectGraph from '@/components/graph/ProjectGraph';
import { 
  Globe2, 
  Sparkles, 
  Layers, 
  Cpu, 
  FolderGit2, 
  BookOpen, 
  Award,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface UniverseViewProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onNavigateToView: (view: string) => void;
}

export default function UniverseView({
  nodes,
  edges,
  projects,
  onSelectProject,
  onNavigateToView
}: UniverseViewProps) {
  const [selectedUniverseNode, setSelectedUniverseNode] = useState<GraphNode | null>(null);

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden select-none">
      {/* Header Banner */}
      <div className="glass-panel border-b border-white/10 px-6 py-3 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-violet-600/30 border border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <Globe2 className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              Global Engineering Universe
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                OM Sharma · Living Knowledge Graph
              </span>
            </h1>
            <p className="text-[11px] font-mono text-slate-400">
              Cross-project synthesis connecting technologies, research papers, repositories, and career artifacts.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Entities Mapped:</span>
          <span className="text-cyan-400 font-bold">{nodes.length}</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400">Active Links:</span>
          <span className="text-purple-400 font-bold">{edges.length}</span>
        </div>
      </div>

      {/* Main Interactive Universe Graph Canvas */}
      <div className="flex-1 relative w-full h-full">
        <ProjectGraph
          nodes={nodes}
          edges={edges}
          selectedNodeId={selectedUniverseNode?.id || null}
          onSelectNode={(node) => setSelectedUniverseNode(node)}
          onOpenDetails={(node) => {
            if (node.id === 'g-p1') {
              const p = projects.find(proj => proj.id === 'proj-satellite');
              if (p) { onSelectProject(p); onNavigateToView('overview'); }
            } else if (node.id === 'g-p2') {
              const p = projects.find(proj => proj.id === 'proj-orbit');
              if (p) { onSelectProject(p); onNavigateToView('overview'); }
            } else if (node.id === 'g-p3') {
              const p = projects.find(proj => proj.id === 'proj-drone');
              if (p) { onSelectProject(p); onNavigateToView('overview'); }
            }
          }}
        />

        {/* Selected Universe Node Floating Drawer */}
        {selectedUniverseNode && (
          <div className="absolute top-4 right-4 z-40 w-80 rounded-2xl glass-panel-cyan border border-cyan-500/40 p-4 shadow-2xl space-y-3 animate-in fade-in slide-in-from-right-2">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold">
                Universe Node Context
              </span>
              <button
                onClick={() => setSelectedUniverseNode(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                {selectedUniverseNode.label}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">
                {selectedUniverseNode.subtitle}
              </p>
            </div>

            {selectedUniverseNode.progress !== undefined && (
              <div className="space-y-1 p-2 rounded-lg bg-black/40 border border-white/5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Completion</span>
                  <span className="text-cyan-400 font-bold">{selectedUniverseNode.progress}%</span>
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={() => {
                  if (selectedUniverseNode.id === 'g-p1') {
                    const p = projects.find(proj => proj.id === 'proj-satellite');
                    if (p) { onSelectProject(p); onNavigateToView('overview'); }
                  } else {
                    onNavigateToView('projects');
                  }
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-semibold transition-colors"
              >
                <span>Drill Down into Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
