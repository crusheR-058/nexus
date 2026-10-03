'use client';

import React from 'react';
import { Project } from '@/types';
import { 
  Network, 
  FolderKanban, 
  CheckSquare, 
  BookMarked, 
  Microscope, 
  GitFork, 
  CalendarClock, 
  Cpu, 
  BarChart3, 
  GraduationCap, 
  Award, 
  FileText, 
  Bot, 
  Activity, 
  BrainCircuit, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Sparkles,
  FlaskConical,
  Globe2
} from 'lucide-react';

export type NavView = 
  | 'overview' 
  | 'projects' 
  | 'tasks' 
  | 'roadmap' 
  | 'knowledge' 
  | 'research' 
  | 'repositories' 
  | 'architecture' 
  | 'testing'
  | 'analytics' 
  | 'fyp' 
  | 'viva' 
  | 'portfolio' 
  | 'agents' 
  | 'activity' 
  | 'universe'
  | 'settings';

interface SidebarProps {
  activeView: NavView;
  onSelectView: (view: NavView) => void;
  activeProject: Project;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({
  activeView,
  onSelectView,
  activeProject,
  isCollapsed,
  onToggleCollapse
}: SidebarProps) {
  const projectNav = [
    { id: 'overview', label: 'Intelligence Graph', icon: Network, badge: 'Hero' },
    { id: 'tasks', label: 'Tasks Engine', icon: CheckSquare, count: 7 },
    { id: 'roadmap', label: 'Milestone Roadmap', icon: CalendarClock },
    { id: 'repositories', label: 'Repository & Code', icon: GitFork },
    { id: 'architecture', label: 'System Topology', icon: Cpu },
    { id: 'knowledge', label: 'Knowledge & Memory', icon: BookMarked },
    { id: 'research', label: 'Research Lab', icon: Microscope },
    { id: 'testing', label: 'Testing & APLS', icon: FlaskConical, alert: true },
    { id: 'analytics', label: 'Health & Telemetry', icon: BarChart3 }
  ];

  const studentNav = [
    { id: 'fyp', label: 'FYP 16-Ch Thesis', icon: GraduationCap, badge: '16 Ch' },
    { id: 'viva', label: 'Viva Defense Coach', icon: Award, badge: 'AI Live' },
    { id: 'portfolio', label: 'Doc & Portfolio', icon: FileText }
  ];

  const globalNav = [
    { id: 'universe', label: 'Engineering Universe', icon: Globe2, badge: 'Global' },
    { id: 'projects', label: 'All Projects', icon: FolderKanban, count: 3 },
    { id: 'agents', label: 'AI Agents', icon: Bot, pulse: true },
    { id: 'activity', label: 'Activity Audit', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside 
      className={`relative h-full flex flex-col glass-panel border-r border-white/10 z-40 transition-all duration-300 select-none ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-14 flex items-center justify-between px-3.5 border-b border-white/10">
        <div className="flex items-center gap-2.5 overflow-hidden">
          {/* Futuristic Glowing Nexus Symbol */}
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-600/30 border border-cyan-500/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,229,255,0.25)]">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </div>

          {!isCollapsed && (
            <div className="flex flex-col truncate">
              <span className="text-sm font-bold tracking-widest text-white uppercase font-mono flex items-center gap-1.5">
                NEXUS
                <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                  v2.4
                </span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-tight truncate">
                AI Engineering Command
              </span>
            </div>
          )}
        </div>

        {/* Collapse Toggle Button */}
        <button
          onClick={onToggleCollapse}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Active Project Pill Indicator */}
      {!isCollapsed && (
        <div className="px-3 pt-3 pb-1">
          <div 
            onClick={() => onSelectView('overview')}
            className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400 cursor-pointer transition-all space-y-1 shadow-[0_0_15px_rgba(0,229,255,0.1)]"
          >
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-cyan-400 uppercase font-semibold">Active Project</span>
              <span className="text-slate-400">{activeProject.progress}%</span>
            </div>
            <div className="text-xs font-bold text-white truncate">
              {activeProject.name}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4">
        {/* Project Specific Workspace Tabs */}
        <div>
          {!isCollapsed && (
            <div className="px-2 mb-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
              Project Modules
            </div>
          )}
          <div className="space-y-0.5">
            {projectNav.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id as NavView)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,229,255,0.2)]' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  
                  {!isCollapsed && (
                    <span className="truncate flex-1 text-left">
                      {item.label}
                    </span>
                  )}

                  {!isCollapsed && item.count !== undefined && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5">
                      {item.count}
                    </span>
                  )}

                  {!isCollapsed && item.alert && (
                    <span className="text-[9px] font-mono px-1 rounded bg-amber-950/80 text-amber-300 border border-amber-800">
                      Gap
                    </span>
                  )}

                  {!isCollapsed && item.badge && (
                    <span className="text-[9px] font-mono px-1 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Engineering Superpowers */}
        <div>
          {!isCollapsed && (
            <div className="px-2 mb-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-purple-400">
              Superpowers
            </div>
          )}
          <div className="space-y-0.5">
            {studentNav.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id as NavView)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.25)]' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-purple-400' : 'text-slate-400'}`} />
                  
                  {!isCollapsed && (
                    <span className="truncate flex-1 text-left">
                      {item.label}
                    </span>
                  )}

                  {!isCollapsed && item.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/80">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Global Engineering Universe & Platform */}
        <div>
          {!isCollapsed && (
            <div className="px-2 mb-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
              System Universe
            </div>
          )}
          <div className="space-y-0.5">
            {globalNav.map(item => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id as NavView)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <div className="relative shrink-0">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    {item.pulse && (
                      <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    )}
                  </div>
                  
                  {!isCollapsed && (
                    <span className="truncate flex-1 text-left">
                      {item.label}
                    </span>
                  )}

                  {!isCollapsed && item.badge && (
                    <span className="text-[9px] font-mono px-1 rounded bg-black/40 text-slate-400 border border-white/5">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Profile Status */}
      <div className="p-2.5 border-t border-white/10">
        <div className={`flex items-center gap-2 p-1.5 rounded-lg bg-white/5 border border-white/5 ${
          isCollapsed ? 'justify-center' : ''
        }`}>
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-600 to-violet-600 flex items-center justify-center font-mono text-[10px] font-bold text-white shrink-0 shadow-[0_0_8px_rgba(0,229,255,0.4)]">
            OM
          </div>

          {!isCollapsed && (
            <div className="flex flex-col truncate flex-1">
              <span className="text-xs font-medium text-slate-200 truncate">
                OM Sharma
              </span>
              <span className="text-[10px] text-slate-400 font-mono truncate">
                Lead Engineer
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
