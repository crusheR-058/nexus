'use client';

import React from 'react';
import { Project } from '@/types';
import { 
  BarChart3, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  Layers, 
  ArrowRight 
} from 'lucide-react';

interface AnalyticsViewProps {
  project?: Project | null;
  onNavigateToView: (view: string) => void;
}

export default function AnalyticsView({
  project,
  onNavigateToView
}: AnalyticsViewProps) {
  if (!project) return null;
  const dimensions = [
    { label: 'Code Execution', score: project.healthDimensions.execution, status: 'Optimal', color: 'from-cyan-500 to-teal-400' },
    { label: 'Documentation', score: project.healthDimensions.documentation, status: 'Lagging', color: 'from-blue-500 to-indigo-500' },
    { label: 'Testing Suite', score: project.healthDimensions.testing, status: 'Critical Gap', color: 'from-amber-500 to-red-500', isAlert: true },
    { label: 'Code Velocity', score: project.healthDimensions.codeActivity, status: 'High', color: 'from-emerald-500 to-teal-500' },
    { label: 'Milestone Pace', score: project.healthDimensions.milestones, status: 'On Track', color: 'from-purple-500 to-pink-500' },
    { label: 'Dependency Health', score: project.healthDimensions.dependencies, status: 'Normal', color: 'from-slate-500 to-slate-400' }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              System Telemetry
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Project Health & Multidimensional Diagnostics
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Zero Synthetic Scores
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Deterministic evaluation of commit density, test case count, thesis documentation, and blocked dependencies.
          </p>
        </div>
      </div>

      {/* Critical Gap Callout */}
      <div className="p-5 rounded-2xl glass-panel-cyan border border-amber-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_0_25px_rgba(245,158,11,0.15)]">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Identified Primary System Gap: Testing Suite Lag
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              Implementation has advanced significantly faster than project documentation and automated APLS test suites. 42 commits were pushed with only 1 new verification case added this sprint.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateToView('tasks')}
          className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold transition-colors shrink-0 flex items-center gap-1.5"
        >
          <span>Remediate in Tasks</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Dimensions Multi-Bar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dimensions.map((dim, idx) => (
          <div key={idx} className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white tracking-tight">
                {dim.label}
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                  dim.isAlert ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-white/5 text-slate-300 border border-white/10'
                }`}>
                  {dim.status}
                </span>
                <span className="text-sm font-bold font-mono text-cyan-400">
                  {dim.score}%
                </span>
              </div>
            </div>

            <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className={`h-full rounded-full bg-gradient-to-r ${dim.color} transition-all duration-500`}
                style={{ width: `${dim.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
