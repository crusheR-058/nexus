'use client';

import React, { useState } from 'react';
import { Repository, Commit, PullRequest } from '@/types';
import { 
  GitFork, 
  GitBranch, 
  GitCommit, 
  GitPullRequest, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  FileCode, 
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Terminal,
  Activity
} from 'lucide-react';

interface RepositoriesViewProps {
  repository: Repository;
  commits: Commit[];
  pullRequests: PullRequest[];
}

export default function RepositoriesView({
  repository,
  commits,
  pullRequests
}: RepositoriesViewProps) {
  const [activeTab, setActiveTab] = useState<'commits' | 'prs' | 'fragile' | 'intelligence'>('commits');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  const handleAskCodebase = (q: string) => {
    setAiQuestion(q);
    if (q.includes('fragile')) {
      setAiAnswer('The most fragile module is `src/decoder/soft_nms.py` (Complexity score 18.4). It handles simultaneous angle clustering under dense highway overpasses and currently lacks automated APLS regression tests.');
    } else if (q.includes('auth')) {
      setAiAnswer('Authentication is routed through `src/api/auth.py` using JWT bearer tokens validated against the Supabase PostgREST layer. Spatial tile requests require the `read:imagery` scope.');
    } else if (q.includes('duplicate')) {
      setAiAnswer('Potential duplicate vector math discovered between `src/geo/projection.py` (lines 45-80) and `src/utils/bounding_box.py` (lines 12-48). Both calculate haversine distance independently.');
    } else {
      setAiAnswer('The repository architecture follows a decoupled pipeline: GDAL tile ingestion -> ResNeXt-50 feature extraction -> Orientation angle tensor decoder -> PostGIS spatial commit.');
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400">
              GitHub Integration & Codebase Core
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            {repository.name}
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1">
              <GitBranch className="w-3 h-3" />
              {repository.defaultBranch}
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time GitHub sync with AST parser, dependency graphs, and automated vulnerability detection.
          </p>
        </div>

        <a
          href={repository.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors shrink-0"
        >
          <span>View on GitHub</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>

      {/* Repository Health Triad */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">Code Architecture</span>
            <span className="text-emerald-400 font-bold">{repository.healthScores.code}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${repository.healthScores.code}%` }} />
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            Clean modular separation between model inference and PostGIS serializers.
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">Documentation Coverage</span>
            <span className="text-cyan-400 font-bold">{repository.healthScores.documentation}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${repository.healthScores.documentation}%` }} />
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            API endpoints documented. Mathematical tensor equations need docstring polish.
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel-cyan border border-amber-500/30 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-amber-400 font-semibold">Testing Coverage (Lagging)</span>
            <span className="text-amber-400 font-bold">{repository.healthScores.testing}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${repository.healthScores.testing}%` }} />
          </div>
          <p className="text-[11px] text-slate-300 pt-1">
            APLS validation suite is 34% behind implementation commits.
          </p>
        </div>
      </div>

      {/* Codebase Intelligence Q&A Terminal */}
      <div className="rounded-2xl glass-panel border border-cyan-500/30 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-bold text-white tracking-tight font-mono">
            Codebase Semantic Intelligence
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            'Which areas are most fragile?',
            'Where is authentication handled?',
            'Find potentially duplicated logic',
            'Explain this repository architecture'
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleAskCodebase(prompt)}
              className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-200 border border-white/10 hover:border-cyan-500/30 transition-colors"
            >
              "{prompt}"
            </button>
          ))}
        </div>

        {aiAnswer && (
          <div className="p-4 rounded-xl bg-black/60 border border-cyan-500/30 space-y-1 animate-in fade-in">
            <div className="text-[10px] font-mono uppercase text-cyan-400">
              Query: {aiQuestion}
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {aiAnswer}
            </p>
          </div>
        )}
      </div>

      {/* Tabs: Commits / PRs / Fragile Modules */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <button
            onClick={() => setActiveTab('commits')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'commits' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Recent Commits ({commits.length})
          </button>
          <button
            onClick={() => setActiveTab('prs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'prs' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Pull Requests ({pullRequests.length})
          </button>
        </div>

        {/* Commits List */}
        {activeTab === 'commits' && (
          <div className="space-y-3">
            {commits.map(c => (
              <div 
                key={c.id}
                className="p-4 rounded-xl glass-panel border border-white/5 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <GitCommit className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-white tracking-tight">
                      {c.message}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-1 flex items-center gap-2">
                      <span>{c.author.name}</span>
                      <span>·</span>
                      <span>{c.timestamp}</span>
                      <span>·</span>
                      <span className="px-1.5 py-0.2 rounded bg-black/40 text-cyan-400 border border-white/5">
                        {c.sha}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono shrink-0">
                  <span className="text-emerald-400">+{c.additions}</span>
                  <span className="text-red-400">-{c.deletions}</span>
                  <span className="text-slate-400 text-[10px]">{c.changedFiles} files</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pull Requests List */}
        {activeTab === 'prs' && (
          <div className="space-y-3">
            {pullRequests.map(pr => (
              <div 
                key={pr.id}
                className="p-4 rounded-xl glass-panel border border-white/5 hover:border-white/20 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <GitPullRequest className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-white">
                      #{pr.number}: {pr.title}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      by {pr.author} · {pr.createdAt} · {pr.commentsCount} review notes
                    </div>
                  </div>
                </div>

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                  pr.status === 'merged' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                  'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  {pr.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
