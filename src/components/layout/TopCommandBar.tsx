'use client';

import React, { useState } from 'react';
import { 
  Project 
} from '@/types';
import { 
  Search, 
  ChevronDown, 
  Sparkles, 
  Bell, 
  Command, 
  GitBranch, 
  CheckCircle2, 
  AlertTriangle,
  FolderGit2,
  FolderUp,
  Plus
} from 'lucide-react';

interface TopCommandBarProps {
  projects: Project[];
  activeProject?: Project | null;
  onSelectProject: (project: Project) => void;
  onOpenCommandPalette: () => void;
  onOpenUploadModal: () => void;
}

export default function TopCommandBar({
  projects,
  activeProject,
  onSelectProject,
  onOpenCommandPalette,
  onOpenUploadModal
}: TopCommandBarProps) {
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className="h-14 w-full glass-panel border-b border-white/10 px-4 flex items-center justify-between z-30 select-none">
      {/* Left: Project Selector Breadcrumb & Upload Button */}
      <div className="flex items-center gap-2.5">
        {activeProject ? (
          <div className="relative">
            <button
              onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 transition-all text-xs"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-mono text-[11px]">Project:</span>
                <span className="font-semibold text-white tracking-tight">
                  {activeProject.name}
                </span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                {activeProject.progress}%
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Project Dropdown Menu */}
            {isProjectDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 rounded-xl glass-panel-cyan border border-cyan-500/30 p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 px-2 py-1">
                  Active Projects
                </div>
                <div className="space-y-1 mt-1">
                  {projects.map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectProject(p);
                        setIsProjectDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors ${
                        p.id === activeProject.id
                          ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40'
                          : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="truncate mr-2">
                        <div className="font-medium truncate">{p.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono truncate">{p.tagline}</div>
                      </div>
                      <span className="text-[10px] font-mono shrink-0 px-1.5 py-0.5 rounded bg-black/40 text-cyan-400">
                        {p.progress}%
                      </span>
                    </button>
                  ))}
                </div>

                <div className="pt-2 mt-2 border-t border-white/10">
                  <button
                    onClick={() => {
                      setIsProjectDropdownOpen(false);
                      onOpenUploadModal();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-medium transition-all"
                  >
                    <FolderUp className="w-3.5 h-3.5" />
                    <span>Upload Local Project</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}

        {/* Upload Project Button */}
        <button
          onClick={onOpenUploadModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 transition-all text-xs font-semibold shadow-[0_0_12px_rgba(0,229,255,0.2)]"
        >
          <FolderUp className="w-3.5 h-3.5" />
          <span>Upload Project</span>
        </button>

        {/* Branch / Git indicator */}
        {activeProject && (
          <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-slate-400 px-2 py-1 rounded bg-white/5 border border-white/5">
            <GitBranch className="w-3 h-3 text-slate-400" />
            <span>{activeProject.branch}</span>
          </div>
        )}
      </div>

      {/* Center: Global Search & Command Bar Trigger (⌘K) */}
      <div className="flex-1 max-w-md mx-4">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-950/60 hover:bg-slate-900 border border-white/10 hover:border-cyan-500/40 transition-all text-xs text-slate-400 group shadow-inner"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            <span className="font-mono text-[11px] text-slate-400 group-hover:text-slate-200 transition-colors">
              Search entities, tasks, code, research...
            </span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 rounded">
            <Command className="w-3 h-3" /> K
          </kbd>
        </button>
      </div>

      {/* Right: AI Status, Notifications & Lead Badge */}
      <div className="flex items-center gap-3">
        {/* AI Ready Indicator Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 shadow-[0_0_12px_rgba(0,229,255,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#00E5FF]" />
          <span>AI READY</span>
        </div>

        {/* Notifications Alert Bell */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </button>

          {isNotificationsOpen && (
            <div className="absolute top-full right-0 mt-2 w-80 rounded-xl glass-panel border border-white/15 p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white">System Events</span>
                <span className="text-[10px] font-mono text-cyan-400">Live Telemetry</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-1.5 text-amber-400 font-medium text-[11px]">
                    <AlertTriangle className="w-3 h-3" />
                    Testing Lagging Behind
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Testing suite is at 48% coverage while implementation reached 82%.
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium text-[11px]">
                    <CheckCircle2 className="w-3 h-3" />
                    PostGIS Migration Complete
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Spatial index verified. Latency reduced to 8.4ms.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/10">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-600 to-violet-600 flex items-center justify-center font-mono text-xs font-bold text-white shadow-[0_0_10px_rgba(0,229,255,0.3)]">
            OM
          </div>
        </div>
      </div>
    </header>
  );
}
