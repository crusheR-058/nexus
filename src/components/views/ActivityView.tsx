'use client';

import React from 'react';
import { ActivityEvent } from '@/types';
import { 
  Activity, 
  GitCommit, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  CalendarClock, 
  UploadCloud 
} from 'lucide-react';

interface ActivityViewProps {
  events: ActivityEvent[];
}

export default function ActivityView({
  events
}: ActivityViewProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'commit': return GitCommit;
      case 'task_completed': return CheckCircle2;
      case 'doc_added': return FileText;
      case 'ai_insight': return Sparkles;
      default: return CalendarClock;
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            System Provenance
          </span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          Project Activity Stream
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Unified Event Log
          </span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Chronological audit trail of commits, task completions, research papers added, and autonomous AI insights.
        </p>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/10">
        {events.map((ev, idx) => {
          const Icon = getIcon(ev.type);
          return (
            <div key={ev.id} className="relative group">
              {/* Dot */}
              <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-slate-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.3)]">
                <Icon className="w-3 h-3" />
              </div>

              {/* Event Card */}
              <div className="p-4 rounded-xl glass-panel border border-white/10 hover:border-white/20 transition-all space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white tracking-tight">
                    {ev.title}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {ev.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-300">
                  {ev.description}
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
                  <span>Triggered by: {ev.user}</span>
                  {ev.metadata && <span className="text-cyan-400">{ev.metadata}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
