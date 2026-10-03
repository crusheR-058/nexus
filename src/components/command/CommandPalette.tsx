'use client';

import React, { useState, useEffect } from 'react';
import { 
  Project, 
  Task 
} from '@/types';
import { 
  Search, 
  Command, 
  FolderGit2, 
  CheckSquare, 
  BookOpen, 
  CalendarClock, 
  Award, 
  FileText, 
  Bot, 
  ArrowRight, 
  X,
  PlusCircle,
  Cpu,
  FolderUp
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  tasks: Task[];
  onNavigateToView: (view: string) => void;
  onSelectProject: (project: Project) => void;
  onOpenUploadModal?: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  projects,
  tasks,
  onNavigateToView,
  onSelectProject,
  onOpenUploadModal
}: CommandPaletteProps) {
  const [search, setSearch] = useState('');

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    { id: 'upload', label: 'Upload Local Project Directory', category: 'Workspace', icon: FolderUp, target: 'upload' },
    { id: 'viva', label: 'Start Viva Defense Simulation', category: 'Superpower', icon: Award, target: 'viva' },
    { id: 'fyp', label: 'Open FYP 16-Chapter Progress Tracker', category: 'Superpower', icon: BookOpen, target: 'fyp' },
    { id: 'portfolio', label: 'Generate Portfolio & Documentation', category: 'Publish', icon: FileText, target: 'portfolio' },
    { id: 'tasks', label: 'Inspect Kanban Tasks Board', category: 'Execution', icon: CheckSquare, target: 'tasks' },
    { id: 'architecture', label: 'Launch Architecture Visualizer', category: 'Design', icon: Cpu, target: 'architecture' },
    { id: 'roadmap', label: 'View Milestone Timeline & Roadmap', category: 'Planning', icon: CalendarClock, target: 'roadmap' },
    { id: 'agents', label: 'Monitor AI Background Agents', category: 'System', icon: Bot, target: 'agents' }
  ];

  const filteredActions = quickActions.filter(a => 
    a.label.toLowerCase().includes(search.toLowerCase()) || 
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.tagline.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) || 
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl rounded-2xl glass-panel-cyan border border-cyan-500/40 shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            placeholder="Type a command, project, task, or documentation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none font-sans"
            autoFocus
          />
          <kbd className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4">
          {/* Quick Actions */}
          {filteredActions.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 py-1">
                Command Actions
              </div>
              <div className="space-y-0.5">
                {filteredActions.map(action => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => {
                        if (action.target === 'upload') {
                          onOpenUploadModal?.();
                        } else {
                          onNavigateToView(action.target);
                        }
                        onClose();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-500/30 border border-transparent transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-cyan-400" />
                        <span className="font-medium">{action.label}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 group-hover:text-cyan-300">
                        {action.category} ↵
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 py-1">
                Engineering Projects
              </div>
              <div className="space-y-0.5">
                {filteredProjects.map(proj => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      onSelectProject(proj);
                      onNavigateToView('overview');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/5 border border-transparent transition-all group"
                  >
                    <div className="flex items-center gap-2.5 truncate mr-2">
                      <FolderGit2 className="w-4 h-4 text-sky-400 shrink-0" />
                      <div className="text-left truncate">
                        <div className="font-medium truncate">{proj.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono truncate">{proj.tagline}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 px-1.5 py-0.5 rounded bg-black/40 shrink-0">
                      {proj.progress}%
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tasks */}
          {filteredTasks.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 py-1">
                Tasks & Deliverables
              </div>
              <div className="space-y-0.5">
                {filteredTasks.slice(0, 4).map(task => (
                  <button
                    key={task.id}
                    onClick={() => {
                      onNavigateToView('tasks');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/5 border border-transparent transition-all group"
                  >
                    <div className="flex items-center gap-2.5 truncate mr-2">
                      <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="truncate">{task.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      {task.status.replace('_', ' ')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="px-4 py-2.5 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-cyan-400">NEXUS Raycast Engine</span>
        </div>
      </div>
    </div>
  );
}
