'use client';

import React from 'react';
import { 
  Project, 
  GraphNode, 
  AIInsight 
} from '@/types';
import { 
  Sparkles, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  GitCommit, 
  FileText, 
  BookOpen, 
  CheckSquare, 
  Cpu, 
  Clock, 
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface RightIntelligencePanelProps {
  activeProject: Project;
  selectedNode: GraphNode | null;
  insights: AIInsight[];
  onClearSelection: () => void;
  onNavigateToView: (view: string) => void;
  onSelectTask?: (taskId: string) => void;
}

export default function RightIntelligencePanel({
  activeProject,
  selectedNode,
  insights,
  onClearSelection,
  onNavigateToView,
  onSelectTask
}: RightIntelligencePanelProps) {
  return (
    <aside className="w-80 h-full glass-panel border-l border-white/10 flex flex-col z-30 select-none overflow-hidden animate-in fade-in duration-300">
      {/* Panel Header */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00E5FF]" />
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
            {selectedNode ? 'Context Intelligence' : 'Project Intelligence'}
          </span>
        </div>

        {selectedNode && (
          <button
            onClick={onClearSelection}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-xs flex items-center gap-1"
            title="Reset to Project Overview"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Dynamic Context: Selected Node View */}
        {selectedNode ? (
          <div className="space-y-4">
            {/* Node Title & Type Badge */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {selectedNode.type}
                </span>
                {selectedNode.status && (
                  <span className="text-[10px] font-mono text-slate-400">
                    ● {selectedNode.status}
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold text-white tracking-tight">
                {selectedNode.label}
              </h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {selectedNode.description || selectedNode.subtitle}
              </p>
            </div>

            {/* Progress Bar if present */}
            {selectedNode.progress !== undefined && (
              <div className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-cyan-400 font-bold">{selectedNode.progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,229,255,0.6)]"
                    style={{ width: `${selectedNode.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Node Specific Metrics */}
            {selectedNode.metrics && selectedNode.metrics.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  System Metrics
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {selectedNode.metrics.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                      <div className="text-[10px] text-slate-400 font-mono">{m.label}</div>
                      <div className="text-xs font-semibold text-slate-100 font-mono mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            {selectedNode.techStack && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.techStack.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Dependencies */}
            {selectedNode.dependencies && selectedNode.dependencies.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Dependencies
                </span>
                <div className="space-y-1">
                  {selectedNode.dependencies.map((dep, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300 p-1.5 rounded bg-white/5 border border-white/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="font-mono text-[11px]">{dep}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={() => {
                  if (selectedNode.category === 'tasks') onNavigateToView('tasks');
                  else if (selectedNode.category === 'code') onNavigateToView('repositories');
                  else if (selectedNode.category === 'research') onNavigateToView('research');
                  else if (selectedNode.category === 'architecture') onNavigateToView('architecture');
                  else onNavigateToView('projects');
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-medium transition-all shadow-[0_0_12px_rgba(0,229,255,0.2)]"
              >
                <span>Inspect in {selectedNode.category}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Default: Project Level Intelligence View */
          <div className="space-y-5">
            {/* Identity & Status */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981]" />
                <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider">
                  ● {activeProject.status}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-[10px] font-mono text-slate-400">
                  Health: {activeProject.health}
                </span>
              </div>
              <h2 className="text-base font-bold text-white tracking-tight">
                {activeProject.name}
              </h2>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {activeProject.tagline}
              </p>
            </div>

            {/* Health Dimensions Multi-Bar */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-slate-400">Overall Progress</span>
                <span className="font-mono font-bold text-cyan-400">{activeProject.progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(0,229,255,0.5)]"
                  style={{ width: `${activeProject.progress}%` }}
                />
              </div>

              {/* Dimension Breakdown */}
              <div className="pt-2 border-t border-white/5 space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Execution</span>
                  <span className="text-slate-200">{activeProject.healthDimensions.execution}%</span>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Documentation</span>
                  <span className="text-slate-200">{activeProject.healthDimensions.documentation}%</span>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-amber-400">Testing (Lagging)</span>
                  <span className="text-amber-400">{activeProject.healthDimensions.testing}%</span>
                </div>
              </div>
            </div>

            {/* AI Insight Card */}
            <div className="p-3.5 rounded-xl glass-panel-cyan border border-cyan-500/30 space-y-2 shadow-[0_0_15px_rgba(0,229,255,0.1)]">
              <div className="flex items-center gap-1.5 text-cyan-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider">
                  NEXUS Observation
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                The graph extraction pipeline is progressing rapidly, but testing coverage is significantly behind implementation. 2 milestones are approaching.
              </p>
            </div>

            {/* Next Recommended Action */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Recommended Next Action
              </div>
              <p className="text-xs font-medium text-slate-100">
                Complete edge extraction Soft-NMS validation against SpaceNet 5 tiles.
              </p>
              <button
                onClick={() => onNavigateToView('tasks')}
                className="w-full flex items-center justify-between py-1.5 px-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition-colors"
              >
                <span>Open Task #104</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Connected Project Entities Summary */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Connected System Artifacts
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div 
                  onClick={() => onNavigateToView('tasks')}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-emerald-400 mb-0.5">
                    <CheckSquare className="w-3 h-3" />
                    <span className="font-mono font-bold">{activeProject.stats.tasksCount}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">Tasks Active</div>
                </div>

                <div 
                  onClick={() => onNavigateToView('repositories')}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-sky-400 mb-0.5">
                    <GitCommit className="w-3 h-3" />
                    <span className="font-mono font-bold">{activeProject.stats.commitsCount}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">Commits</div>
                </div>

                <div 
                  onClick={() => onNavigateToView('knowledge')}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-amber-400 mb-0.5">
                    <FileText className="w-3 h-3" />
                    <span className="font-mono font-bold">{activeProject.stats.docsCount}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">Documents</div>
                </div>

                <div 
                  onClick={() => onNavigateToView('research')}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-purple-400 mb-0.5">
                    <BookOpen className="w-3 h-3" />
                    <span className="font-mono font-bold">{activeProject.stats.papersCount}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">Research Papers</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Panel Footer */}
      <div className="p-3 border-t border-white/10 text-center text-[10px] font-mono text-slate-500 shrink-0">
        NEXUS Intelligence Kernel v2.4
      </div>
    </aside>
  );
}
