'use client';

import React, { useState } from 'react';
import { Project } from '@/types';
import { 
  FolderGit2, 
  ArrowRight, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  GitBranch, 
  Layers, 
  Cpu, 
  ExternalLink,
  Sparkles,
  FolderUp
} from 'lucide-react';

interface ProjectsViewProps {
  projects: Project[];
  activeProject?: Project | null;
  onSelectProject: (project: Project) => void;
  onNavigateToView: (view: string) => void;
  onOpenUploadModal?: () => void;
}

export default function ProjectsView({
  projects,
  activeProject,
  onSelectProject,
  onNavigateToView,
  onOpenUploadModal
}: ProjectsViewProps) {
  const [showNewModal, setShowNewModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectTagline, setNewProjectTagline] = useState('');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Workspace Overview
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Engineering Projects Portfolio
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Connected systems currently mapped within your engineering command center.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onOpenUploadModal && (
            <button
              onClick={onOpenUploadModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-xs transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:scale-105 shrink-0"
            >
              <FolderUp className="w-4 h-4" />
              <span>Upload Local Project</span>
            </button>
          )}

          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-xs transition-all hover:scale-105 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>New Blank Project</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(proj => {
          const isActive = proj.id === activeProject?.id;
          return (
            <div
              key={proj.id}
              className={`rounded-2xl p-6 glass-panel border transition-all duration-300 flex flex-col justify-between ${
                isActive 
                  ? 'border-cyan-400/80 shadow-[0_0_30px_rgba(0,229,255,0.2)] bg-slate-950/90' 
                  : 'border-white/10 hover:border-white/20 hover:bg-slate-950/70'
              }`}
            >
              <div>
                {/* Status & Tag Pill */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                    {proj.type.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono">
                    <span className={`w-2 h-2 rounded-full ${proj.health === 'good' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    <span className="text-slate-400">{proj.status}</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {proj.name}
                </h2>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2">
                  {proj.tagline}
                </p>

                {/* Progress Bar */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-cyan-400 font-bold">{proj.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>

                {/* Health Dimensions Multi-Gauge */}
                <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-3 gap-2 text-[10px] font-mono">
                  <div className="p-2 rounded bg-white/5 border border-white/5">
                    <div className="text-slate-400">Execution</div>
                    <div className="text-slate-100 font-semibold mt-0.5">{proj.healthDimensions.execution}%</div>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/5">
                    <div className="text-slate-400">Docs</div>
                    <div className="text-slate-100 font-semibold mt-0.5">{proj.healthDimensions.documentation}%</div>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/5">
                    <div className="text-slate-400">Testing</div>
                    <div className={`${proj.healthDimensions.testing < 50 ? 'text-amber-400' : 'text-slate-100'} font-semibold mt-0.5`}>
                      {proj.healthDimensions.testing}%
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1">
                  {proj.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  Updated {proj.lastUpdated}
                </span>

                <button
                  onClick={() => {
                    onSelectProject(proj);
                    onNavigateToView('overview');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  <span>{isActive ? 'Current Graph' : 'Switch Workspace'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Project Modal Simulation */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl glass-panel-cyan border border-cyan-500/40 p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Create Engineering Project
            </h3>
            <p className="text-xs text-slate-300">
              Initialize a connected project system with repository links, milestones, architecture graphs, and memory registry.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-mono text-slate-400">Project Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sub-Millimeter Edge Vectorizer"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-lg bg-black/50 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
                />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-400">Tagline / Mission</label>
                <input
                  type="text"
                  placeholder="e.g. Autonomous embedded edge topology pipeline"
                  value={newProjectTagline}
                  onChange={(e) => setNewProjectTagline(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-lg bg-black/50 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowNewModal(false)}
                className="px-4 py-2 rounded-lg text-xs text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Project "${newProjectName || 'New Project'}" initialized with automatic graph topology!`);
                  setShowNewModal(false);
                }}
                className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-semibold transition-colors"
              >
                Initialize Project Graph
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
