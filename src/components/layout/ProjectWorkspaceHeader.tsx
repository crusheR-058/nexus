'use client';

import React from 'react';
import { Project } from '@/types';
import { NavView } from '@/components/layout/Sidebar';
import { 
  Network, 
  CheckSquare, 
  CalendarClock, 
  GitFork, 
  Cpu, 
  BookMarked, 
  Microscope, 
  FlaskConical, 
  GraduationCap, 
  Award, 
  FileText, 
  Activity, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface ProjectWorkspaceHeaderProps {
  project?: Project | null;
  activeView: NavView;
  onSelectView: (view: NavView) => void;
}

export default function ProjectWorkspaceHeader({
  project,
  activeView,
  onSelectView
}: ProjectWorkspaceHeaderProps) {
  if (!project) return null;
  const tabs = [
    { id: 'overview', label: 'Graph', icon: Network },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, count: 7 },
    { id: 'roadmap', label: 'Roadmap', icon: CalendarClock },
    { id: 'repositories', label: 'Repository', icon: GitFork },
    { id: 'architecture', label: 'Architecture', icon: Cpu },
    { id: 'knowledge', label: 'Memory', icon: BookMarked },
    { id: 'research', label: 'Research', icon: Microscope },
    { id: 'testing', label: 'Testing & APLS', icon: FlaskConical, alert: true },
    { id: 'fyp', label: 'FYP Thesis', icon: GraduationCap },
    { id: 'viva', label: 'Viva Coach', icon: Award },
    { id: 'portfolio', label: 'Portfolio', icon: FileText }
  ];

  return (
    <div className="w-full glass-panel border-b border-white/10 px-4 select-none shrink-0 z-20">
      {/* Top Meta Strip */}
      <div className="py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00E5FF]" />
            <h1 className="text-sm font-bold text-white tracking-tight">
              {project.name}
            </h1>
          </div>

          <span className="text-slate-600 hidden sm:inline">·</span>

          <span className="text-[11px] font-mono text-slate-300 truncate max-w-md hidden sm:inline">
            {project.tagline}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Progress:</span>
            <span className="text-cyan-400 font-bold">{project.progress}%</span>
          </div>

          <span className="text-slate-600">·</span>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Status:</span>
            <span className="text-emerald-400 uppercase font-semibold text-[10px]">
              {project.status}
            </span>
          </div>

          <span className="text-slate-600">·</span>

          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white flex items-center gap-1"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Horizontal Nav Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1.5">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectView(tab.id as NavView)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,229,255,0.2)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>

              {tab.count !== undefined && (
                <span className="text-[10px] font-mono px-1 rounded-full bg-white/5 text-slate-400">
                  {tab.count}
                </span>
              )}

              {tab.alert && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
