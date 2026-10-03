'use client';

import React, { useState } from 'react';
import { 
  Project 
} from '@/types';
import { 
  Sparkles, 
  ArrowRight, 
  FolderGit2, 
  GitBranch, 
  FileSearch, 
  X, 
  ExternalLink, 
  ShieldCheck, 
  ChevronRight,
  SendHorizontal,
  Bot
} from 'lucide-react';

interface AICommandBarProps {
  activeProject?: Project | null;
  onNavigateToView: (view: string) => void;
}

interface AIResponse {
  query: string;
  headline: string;
  analysis: string;
  recommendation: string;
  actionText: string;
  actionTarget: string;
  evidence: {
    title: string;
    source: string;
    snippet: string;
  }[];
}

export default function AICommandBar({
  activeProject,
  onNavigateToView
}: AICommandBarProps) {
  if (!activeProject) return null;
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeResponse, setActiveResponse] = useState<AIResponse | null>(null);
  const [showEvidence, setShowEvidence] = useState(false);

  const quickPrompts = [
    'What should I work on today?',
    'Why is milestone 4 at risk?',
    'Find potential blockers in testing',
    'Explain this repository architecture',
    'Prepare me for my viva defense'
  ];

  const handleRunQuery = (promptText: string) => {
    setQuery(promptText);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      if (promptText.toLowerCase().includes('today') || promptText.toLowerCase().includes('work')) {
        setActiveResponse({
          query: promptText,
          headline: 'Prioritize Soft-NMS Edge Extraction & Unit Tests',
          analysis: 'Your core bottleneck is testing verification. 3 implementation tasks were pushed to the decoder module in the last 48 hours, but the APLS benchmark suite is stalled.',
          recommendation: 'Complete Task #104 (Soft-NMS angle thresholding) and initiate mock ground-truth evaluation.',
          actionText: 'Open Task #104',
          actionTarget: 'tasks',
          evidence: [
            {
              title: 'Commit 8b4a2f9 (3h ago)',
              source: 'Git main branch',
              snippet: 'feat(decoder): refine soft-NMS angle thresholding for complex roundabouts'
            },
            {
              title: 'Task #106 Status: Blocked',
              source: 'Testing Milestone',
              snippet: 'APLS Testing Validation is waiting for SpaceNet 5 Paris dataset verification.'
            }
          ]
        });
      } else if (promptText.toLowerCase().includes('milestone') || promptText.toLowerCase().includes('risk')) {
        setActiveResponse({
          query: promptText,
          headline: 'Milestone 4 (SpaceNet 5 Benchmark) is At Risk',
          analysis: 'Phase 4 requires APLS scores across 200 urban tiles. Task #106 is currently blocked because ground truth GeoJSON files for Paris have not been ingested into PostGIS.',
          recommendation: 'Ingest Paris Ground Truth GeoJSON or run temporary verification using Las Vegas subset.',
          actionText: 'View Milestone 4',
          actionTarget: 'roadmap',
          evidence: [
            {
              title: 'Issue #42 (SpaceNet 5 Metric Lag)',
              source: 'GitHub Issues',
              snippet: 'APLS calculation script throws missing file exception for Paris quadrant 4.'
            },
            {
              title: 'Milestone Target Date: Nov 02, 2026',
              source: 'Project Roadmap',
              snippet: 'Progress is at 42% with 15 days remaining before final sprint review.'
            }
          ]
        });
      } else if (promptText.toLowerCase().includes('viva') || promptText.toLowerCase().includes('defense')) {
        setActiveResponse({
          query: promptText,
          headline: 'Examiner Simulation: Ready for 24 Anticipated Questions',
          analysis: 'Based on your architectural memory and decision logs, examiners will likely target why Graph-Tensors were chosen over U-Net, and why APLS was prioritized over pixel IoU.',
          recommendation: 'Launch the interactive Viva Coach mode to practice voice and text defense with immediate AI grading.',
          actionText: 'Start Viva Coach Mode',
          actionTarget: 'viva',
          evidence: [
            {
              title: 'Project Memory Record #2',
              source: 'Architecture Decision Registry',
              snippet: 'Adopted dual-head Graph-Tensor network over standard semantic segmentation due to junction skeletonization disconnections.'
            }
          ]
        });
      } else {
        setActiveResponse({
          query: promptText,
          headline: 'NEXUS System Synthesis Complete',
          analysis: 'The repository contains 42 commits and 18 tasks across 5 milestones. Feature implementation is 82% complete, but documentation (61%) and testing (48%) lag behind.',
          recommendation: 'Maintain current cadence on core ML decoder while scheduling automated doc generation.',
          actionText: 'Inspect System Health',
          actionTarget: 'analytics',
          evidence: [
            {
              title: 'Health Telemetry',
              source: 'NEXUS Engine',
              snippet: 'Code execution: 82%, Docs: 61%, Testing: 48%, Code velocity: 88%'
            }
          ]
        });
      }
    }, 600);
  };

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4 select-none">
      {/* Active AI Response Card Modal */}
      {activeResponse && (
        <div className="mb-3 rounded-2xl glass-panel-cyan border border-cyan-500/40 p-4 shadow-[0_0_40px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-3">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-cyan-500/20">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00E5FF]" />
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-300">
                NEXUS Contextual Analysis
              </span>
            </div>
            <button
              onClick={() => { setActiveResponse(null); setShowEvidence(false); }}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-sm font-semibold text-white tracking-tight mb-1">
            {activeResponse.headline}
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            {activeResponse.analysis}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5">
            <button
              onClick={() => setShowEvidence(!showEvidence)}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{showEvidence ? 'Hide Sources' : 'Show Evidence (2)'}</span>
            </button>

            <button
              onClick={() => {
                onNavigateToView(activeResponse.actionTarget);
                setActiveResponse(null);
              }}
              className="text-xs font-medium text-black bg-cyan-400 hover:bg-cyan-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-[0_0_15px_rgba(0,229,255,0.4)]"
            >
              <span>{activeResponse.actionText}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Collapsible Evidence Section */}
          {showEvidence && (
            <div className="mt-3 pt-3 border-t border-cyan-500/20 space-y-2 animate-in fade-in">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Ground Truth Artifacts
              </span>
              {activeResponse.evidence.map((ev, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-black/40 border border-white/10 text-xs space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-cyan-300">{ev.title}</span>
                    <span className="text-[10px] font-mono text-slate-400">{ev.source}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono italic">
                    "{ev.snippet}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Context Chips Floating Above Bar */}
      <div className="flex items-center gap-1.5 mb-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded-md bg-black/60 border border-white/10 flex items-center gap-1 shrink-0">
          <FolderGit2 className="w-3 h-3 text-cyan-400" />
          {activeProject.name}
        </span>
        <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded-md bg-black/60 border border-white/10 flex items-center gap-1 shrink-0">
          <GitBranch className="w-3 h-3 text-sky-400" />
          {activeProject.branch}
        </span>
        <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded-md bg-black/60 border border-white/10 flex items-center gap-1 shrink-0">
          <FileSearch className="w-3 h-3 text-purple-400" />
          4 Research Papers
        </span>

        {/* Quick Clickable Suggestions */}
        {quickPrompts.slice(0, 2).map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleRunQuery(prompt)}
            className="text-[10px] font-mono text-cyan-300/80 hover:text-cyan-200 px-2 py-0.5 rounded-md bg-cyan-950/40 hover:bg-cyan-950/80 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors whitespace-nowrap shrink-0"
          >
            "{prompt}"
          </button>
        ))}
      </div>

      {/* Main Command Input Capsule */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          if (query.trim()) handleRunQuery(query);
        }}
        className="relative flex items-center rounded-2xl glass-panel-cyan border border-cyan-500/40 p-1.5 shadow-[0_0_30px_rgba(0,0,0,0.8)] focus-within:border-cyan-400 focus-within:shadow-[0_0_25px_rgba(0,229,255,0.3)] transition-all"
      >
        <div className="pl-3 pr-2 text-cyan-400 flex items-center justify-center">
          <Sparkles className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
        </div>

        <input
          type="text"
          placeholder="Ask NEXUS about this project... (e.g. 'What should I work on today?')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none py-2 px-1 font-sans"
        />

        <button
          type="submit"
          disabled={!query.trim() || isProcessing}
          className="p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 disabled:opacity-40 disabled:hover:bg-cyan-500/20 transition-all border border-cyan-500/30"
          title="Send query"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
