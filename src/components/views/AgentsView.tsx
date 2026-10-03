'use client';

import React, { useState } from 'react';
import { AIAgent } from '@/types';
import { 
  Bot, 
  CheckCircle2, 
  Clock, 
  Play, 
  Sparkles, 
  ArrowRight, 
  Terminal, 
  Layers, 
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface AgentsViewProps {
  agents: AIAgent[];
  onNavigateToView: (view: string) => void;
}

export default function AgentsView({
  agents: initialAgents,
  onNavigateToView
}: AgentsViewProps) {
  const [agents, setAgents] = useState<AIAgent[]>(initialAgents);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent>(initialAgents[0]);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunAgent = (agentId: string) => {
    setIsRunning(true);
    setAgents(prev => prev.map(a => a.id === agentId ? { ...a, status: 'running' } : a));

    setTimeout(() => {
      setIsRunning(false);
      setAgents(prev => prev.map(a => a.id === agentId ? { ...a, status: 'completed', progressPercent: 100 } : a));
    }, 1500);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Autonomous Systems & Workers
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            AI Engineering Agents
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              3 Agents Active
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Background workers performing deterministic static analysis, examiner synthesis, and literature extraction.
          </p>
        </div>
      </div>

      {/* Agents Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agents.map(ag => {
          const isSelected = selectedAgent.id === ag.id;
          return (
            <div
              key={ag.id}
              onClick={() => setSelectedAgent(ag)}
              className={`p-6 rounded-2xl glass-panel border transition-all cursor-pointer space-y-4 flex flex-col justify-between ${
                isSelected 
                  ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_25px_rgba(0,229,255,0.2)]' 
                  : 'border-white/10 hover:border-white/20 bg-slate-950/80'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                    ag.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    ag.status === 'running' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse' :
                    'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                  }`}>
                    {ag.status}
                  </span>
                </div>

                <div>
                  <h2 className="text-sm font-bold text-white tracking-tight">
                    {ag.name}
                  </h2>
                  <div className="text-[10px] font-mono text-cyan-400 mt-0.5">
                    {ag.role}
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {ag.description}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-slate-400">Execution Progress</span>
                    <span className="text-cyan-400 font-bold">{ag.progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-cyan-400 rounded-full" 
                      style={{ width: `${ag.progressPercent}%` }} 
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">
                  {ag.steps.length} telemetry steps
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRunAgent(ag.id);
                  }}
                  disabled={ag.status === 'running'}
                  className="px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Execute</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Agent Step-by-Step Execution Terminal */}
      <div className="rounded-2xl glass-panel border border-cyan-500/30 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white font-mono">
              Agent Execution Provenance: {selectedAgent.name}
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Real-time verification log
          </span>
        </div>

        {/* Steps Trace */}
        <div className="space-y-2 font-mono text-xs">
          {selectedAgent.steps.map((st, idx) => (
            <div 
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-200">{st.name}</span>
              </div>
              <span className="text-[10px] text-slate-400">{st.timestamp || 'Verified'}</span>
            </div>
          ))}
        </div>

        {/* Output Summary if available */}
        {selectedAgent.outputSummary && (
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs space-y-1 text-slate-200 font-sans">
            <div className="text-[10px] font-mono uppercase text-cyan-400 font-semibold">
              Agent Analysis Summary
            </div>
            <p className="leading-relaxed">
              {selectedAgent.outputSummary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
