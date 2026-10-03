'use client';

import React, { useState } from 'react';
import { ArchitectureNode, ArchitectureEdge } from '@/types';
import { 
  Cpu, 
  Database, 
  Layers, 
  Server, 
  Monitor, 
  Network, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  CheckCircle2, 
  Plus,
  RefreshCw,
  X
} from 'lucide-react';

interface ArchitectureViewProps {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export default function ArchitectureView({
  nodes: initialNodes,
  edges
}: ArchitectureViewProps) {
  const [nodes, setNodes] = useState<ArchitectureNode[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(initialNodes[2]);
  const [showGenModal, setShowGenModal] = useState(false);
  const [genPrompt, setGenPrompt] = useState('Generate an architecture for a Next.js Geospatial SaaS with PostGIS and GPU ONNX Runtime');
  const [isGenerating, setIsGenerating] = useState(false);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'client': return Monitor;
      case 'gateway': return Network;
      case 'database': return Database;
      case 'ai_engine': return Cpu;
      default: return Server;
    }
  };

  const handleSimulateAIGen = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowGenModal(false);
      alert('AI Architecture pipeline generated and mapped to visual canvas!');
    }, 1200);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
              System Topology
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Architecture Visualizer & Topology
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              6 Microservices Active
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Interactive microservice flow, protocol latencies, and GPU pipeline orchestration.
          </p>
        </div>

        <button
          onClick={() => setShowGenModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel border border-amber-500/40 text-amber-300 hover:text-white text-xs font-semibold transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>AI Architecture Generator</span>
        </button>
      </div>

      {/* Visual Canvas Layout */}
      <div className="rounded-2xl glass-panel border border-white/10 p-8 grid-blueprint-bg min-h-[460px] relative overflow-hidden flex flex-col justify-between">
        {/* Nodes Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {nodes.map(node => {
            const Icon = getNodeIcon(node.serviceType);
            const isSelected = selectedNode?.id === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-4 rounded-xl glass-panel border transition-all cursor-pointer space-y-3 ${
                  isSelected 
                    ? 'border-amber-400 bg-amber-950/30 shadow-[0_0_25px_rgba(245,158,11,0.25)]' 
                    : 'border-white/10 hover:border-white/20 bg-slate-950/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {node.title}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {node.tech}
                      </span>
                    </div>
                  </div>

                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981]" />
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                  {node.description}
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono pt-2 border-t border-white/5">
                  <span className="text-slate-400">Response Latency:</span>
                  <span className="text-amber-400 font-bold">{node.latencyMs}ms</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Protocol Pipelines Bar */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <span className="text-white font-semibold">Active Protocols:</span>
            <span className="px-2 py-0.5 rounded bg-white/5 text-cyan-300 border border-white/10">HTTP/REST</span>
            <span className="px-2 py-0.5 rounded bg-white/5 text-purple-300 border border-white/10">gRPC Protobuf</span>
            <span className="px-2 py-0.5 rounded bg-white/5 text-amber-300 border border-white/10">PostgreSQL Wire</span>
            <span className="px-2 py-0.5 rounded bg-white/5 text-emerald-300 border border-white/10">WebSockets</span>
          </div>

          <span className="text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            End-to-end Pipeline Latency: 142ms/tile
          </span>
        </div>
      </div>

      {/* Selected Node Details */}
      {selectedNode && (
        <div className="rounded-2xl glass-panel border border-amber-500/30 p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-amber-400 font-semibold">
                Service Telemetry:
              </span>
              <span className="text-sm font-bold text-white">
                {selectedNode.title}
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Technology: {selectedNode.tech}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {selectedNode.description}
          </p>
        </div>
      )}

      {/* AI Architecture Generator Modal */}
      {showGenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl glass-panel-cyan border border-cyan-500/40 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  Generate Architecture from Prompt
                </h3>
              </div>
              <button onClick={() => setShowGenModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              NEXUS will synthesize microservices, database schemas, streaming protocols, and cache layers matching your stack specifications.
            </p>

            <textarea
              rows={3}
              value={genPrompt}
              onChange={(e) => setGenPrompt(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
            />

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowGenModal(false)}
                className="px-4 py-2 rounded-lg text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSimulateAIGen}
                disabled={isGenerating}
                className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-semibold transition-colors flex items-center gap-2"
              >
                <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Synthesizing...' : 'Generate Architecture'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
