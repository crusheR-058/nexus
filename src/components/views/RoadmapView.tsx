'use client';

import React, { useState } from 'react';
import { Milestone } from '@/types';
import { 
  CalendarClock, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ArrowRight, 
  Layers, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface RoadmapViewProps {
  milestones: Milestone[];
  onNavigateToView: (view: string) => void;
}

export default function RoadmapView({
  milestones,
  onNavigateToView
}: RoadmapViewProps) {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(milestones[2]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Trajectory & Timeline
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Milestone Roadmap
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Q3 - Q4 2026
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Gantt-aligned engineering phases from foundational research to final thesis viva defense.
          </p>
        </div>
      </div>

      {/* Visual Gantt Timeline Chart */}
      <div className="rounded-2xl glass-panel border border-white/10 p-6 space-y-6">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-3 border-b border-white/10">
          <span>Phase / Objective</span>
          <div className="hidden md:flex items-center gap-16 pr-8">
            <span>Aug 2026</span>
            <span>Sep 2026</span>
            <span>Oct 2026</span>
            <span>Nov 2026</span>
          </div>
        </div>

        {/* Milestone Rows */}
        <div className="space-y-4">
          {milestones.map((m, idx) => {
            const isSelected = selectedMilestone?.id === m.id;
            const isCompleted = m.status === 'completed';
            const isAtRisk = m.status === 'at_risk';

            return (
              <div 
                key={m.id}
                onClick={() => setSelectedMilestone(m)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_20px_rgba(0,229,255,0.15)]' 
                    : 'border-white/5 hover:border-white/20 bg-white/5'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 md:w-1/3">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                        isCompleted ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        isAtRisk ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}>
                        {m.phase}
                      </span>
                      <span className="text-xs font-bold text-white tracking-tight">
                        {m.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {m.description}
                    </p>
                  </div>

                  {/* Horizontal Visual Timeline Bar */}
                  <div className="flex-1 space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-400">Target: {m.targetDate}</span>
                      <span className={isCompleted ? 'text-emerald-400 font-bold' : isAtRisk ? 'text-amber-400 font-bold' : 'text-cyan-400 font-bold'}>
                        {m.progress}% ({m.completedTasksCount}/{m.tasksCount} tasks)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCompleted ? 'bg-emerald-400 shadow-[0_0_8px_#10B981]' :
                          isAtRisk ? 'bg-amber-400 shadow-[0_0_8px_#F59E0B]' :
                          'bg-cyan-400 shadow-[0_0_8px_#00E5FF]'
                        }`}
                        style={{ width: `${m.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Blocker alert if at risk */}
                {m.blockers && m.blockers.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center gap-2 text-xs text-amber-300 font-mono">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Active Blocker: {m.blockers[0]}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Milestone Detail Card */}
      {selectedMilestone && (
        <div className="rounded-2xl glass-panel-cyan border border-cyan-500/30 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                Milestone Drilldown
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-sm font-bold text-white">
                {selectedMilestone.title}
              </span>
            </div>
            <button
              onClick={() => onNavigateToView('tasks')}
              className="text-xs text-cyan-300 hover:text-white flex items-center gap-1 font-mono"
            >
              <span>View Milestone Tasks</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {selectedMilestone.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-slate-400">Phase Status</span>
              <div className="text-slate-100 font-semibold uppercase mt-0.5">
                {selectedMilestone.status.replace('_', ' ')}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-slate-400">Deliverable Deadline</span>
              <div className="text-slate-100 font-semibold mt-0.5">
                {selectedMilestone.targetDate}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-slate-400">Action Items Completed</span>
              <div className="text-cyan-400 font-bold mt-0.5">
                {selectedMilestone.completedTasksCount} of {selectedMilestone.tasksCount} Tasks
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
