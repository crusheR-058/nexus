'use client';

import React, { useState } from 'react';
import { FYPSection } from '@/types';
import { 
  GraduationCap, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Award,
  ChevronRight
} from 'lucide-react';

interface FYPViewProps {
  sections: FYPSection[];
  onNavigateToView: (view: string) => void;
}

export default function FYPView({
  sections,
  onNavigateToView
}: FYPViewProps) {
  const [selectedSection, setSelectedSection] = useState<FYPSection>(sections[7]); // Chapter 8: Testing & Validation

  const completedCount = sections.filter(s => s.status === 'complete').length;
  const inProgressCount = sections.filter(s => s.status === 'in_progress').length;
  const needsRevisionCount = sections.filter(s => s.status === 'needs_revision').length;
  const overallCompletion = Math.round((completedCount / sections.length) * 100);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400">
              Academic Degree Mode
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Final Year Project (FYP) Thesis Center
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              16 Sections Tracked
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            End-to-end engineering thesis governance, chapter completion, academic gap detection, and defense alignment.
          </p>
        </div>

        <button
          onClick={() => onNavigateToView('viva')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-black text-xs font-semibold transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] shrink-0"
        >
          <Award className="w-4 h-4" />
          <span>Launch Viva Coach Defense</span>
        </button>
      </div>

      {/* Completion Dashboard Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-panel-violet border border-purple-500/40 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300">Thesis Completion</span>
            <span className="text-purple-300 font-bold">{overallCompletion}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"
              style={{ width: `${overallCompletion}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            {completedCount} of 16 chapters finalized
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-emerald-500/30 space-y-1">
          <div className="text-[10px] font-mono text-emerald-400 uppercase">Complete</div>
          <div className="text-xl font-bold text-white font-mono">{completedCount}</div>
          <p className="text-[10px] text-slate-400">Approved by academic supervisor</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-cyan-500/30 space-y-1">
          <div className="text-[10px] font-mono text-cyan-400 uppercase">In Progress</div>
          <div className="text-xl font-bold text-white font-mono">{inProgressCount}</div>
          <p className="text-[10px] text-slate-400">Draft writeup actively underway</p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-amber-500/30 space-y-1">
          <div className="text-[10px] font-mono text-amber-400 uppercase">Needs Revision</div>
          <div className="text-xl font-bold text-amber-400 font-mono">{needsRevisionCount}</div>
          <p className="text-[10px] text-slate-400">Chapter 8: Testing suite data missing</p>
        </div>
      </div>

      {/* 16-Chapter Section Breakdown & Selected Chapter Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: 16 Section List */}
        <div className="space-y-2 lg:col-span-1 max-h-[600px] overflow-y-auto pr-1">
          {sections.map(sec => {
            const isSelected = selectedSection.id === sec.id;
            const isComplete = sec.status === 'complete';
            const isRevision = sec.status === 'needs_revision';

            return (
              <div
                key={sec.id}
                onClick={() => setSelectedSection(sec)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  isSelected 
                    ? 'border-purple-400 bg-purple-950/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
                    : 'border-white/5 hover:border-white/20 bg-white/5'
                }`}
              >
                <div className="truncate">
                  <div className="text-xs font-semibold text-white truncate">
                    {sec.title}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    {sec.wordCount} / {sec.requiredWordCount} words
                  </div>
                </div>

                <span className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase font-semibold shrink-0 ${
                  isComplete ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                  isRevision ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                }`}>
                  {sec.status.replace('_', ' ')}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Chapter Deep Review */}
        <div className="lg:col-span-2 rounded-2xl glass-panel-violet border border-purple-500/30 p-6 space-y-6">
          <div className="space-y-2 pb-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider">
                Chapter Audit & Feedback
              </span>
              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded uppercase font-bold ${
                selectedSection.status === 'complete' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                selectedSection.status === 'needs_revision' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              }`}>
                {selectedSection.status.replace('_', ' ')}
              </span>
            </div>

            <h2 className="text-lg font-bold text-white tracking-tight">
              {selectedSection.title}
            </h2>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span>Current: <strong className="text-white">{selectedSection.wordCount}</strong> words</span>
              <span>Target: <strong className="text-white">{selectedSection.requiredWordCount}</strong> words</span>
              <span>Completion: <strong className="text-purple-400">{Math.min(100, Math.round((selectedSection.wordCount / selectedSection.requiredWordCount) * 100))}%</strong></span>
            </div>
          </div>

          {/* Supervisor & AI Feedback */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Academic Review Observation
            </span>
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-200 leading-relaxed font-sans">
              {selectedSection.feedback}
            </div>
          </div>

          {/* AI Suggestions List */}
          {selectedSection.aiSuggestions.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Recommended Actions to Finalize Chapter
              </span>
              <div className="space-y-1.5">
                {selectedSection.aiSuggestions.map((sug, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                    <span>{sug}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps CTA */}
          <div className="pt-4 border-t border-white/10 flex justify-between items-center">
            <span className="text-xs font-mono text-slate-400">
              Linked to Project Memory and GitHub telemetry
            </span>
            <button
              onClick={() => onNavigateToView('tasks')}
              className="px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-semibold transition-colors flex items-center gap-2"
            >
              <span>Create Action Item in Tasks</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
