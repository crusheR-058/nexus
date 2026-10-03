'use client';

import React, { useState } from 'react';
import { Task, TaskStatus } from '@/types';
import { 
  CheckSquare, 
  Clock, 
  AlertCircle, 
  ExternalLink, 
  Sparkles, 
  Plus, 
  Filter, 
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Layers,
  ChevronRight,
  X
} from 'lucide-react';

interface TasksViewProps {
  tasks: Task[];
  onUpdateTaskStatus?: (taskId: string, newStatus: TaskStatus) => void;
}

export default function TasksView({
  tasks: initialTasks,
  onUpdateTaskStatus
}: TasksViewProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [showAIPlannerModal, setShowAIPlannerModal] = useState(false);
  const [plannerPrompt, setPlannerPrompt] = useState('Break this project into tasks across 6 engineering phases');
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any | null>(null);

  const columns: { id: TaskStatus; label: string; color: string }[] = [
    { id: 'todo', label: 'Todo', color: 'border-slate-700 text-slate-300' },
    { id: 'in_progress', label: 'In Progress', color: 'border-cyan-500/50 text-cyan-300' },
    { id: 'blocked', label: 'Blocked', color: 'border-amber-500/50 text-amber-300' },
    { id: 'review', label: 'Review', color: 'border-purple-500/50 text-purple-300' },
    { id: 'done', label: 'Done', color: 'border-emerald-500/50 text-emerald-300' }
  ];

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    if (onUpdateTaskStatus) onUpdateTaskStatus(taskId, newStatus);
  };

  const handleGenerateAIPlan = () => {
    setIsGeneratingPlan(true);
    setTimeout(() => {
      setIsGeneratingPlan(false);
      setGeneratedPlan({
        project: 'Satellite Road Extraction',
        phases: [
          {
            name: 'Phase 1 — Literature & Baseline Survey',
            milestone: 'Evaluation of RoadTracer & Sat2Graph',
            tasks: [
              'Benchmark SpaceNet 3 baseline with classical OpenCV skeletonization',
              'Extract mathematical loss formulations for angle tensor cross-entropy'
            ]
          },
          {
            name: 'Phase 2 — System Architecture & Data Engine',
            milestone: 'Tile Ingestion & PostGIS Vector Pipeline',
            tasks: [
              'Implement GDAL tile chunker with 64px spatial overlap buffer',
              'Create PostGIS spatial GIST indices for road linestring queries'
            ]
          },
          {
            name: 'Phase 3 — Deep Graph Extraction Decoder',
            milestone: 'ResNeXt-50 + Orientation Graph Tensor',
            tasks: [
              'Implement Soft-NMS angle clustering for intersecting highways',
              'Snap dangling edge endpoints within 12m spatial radius'
            ]
          },
          {
            name: 'Phase 4 — Benchmark Testing & Validation',
            milestone: 'SpaceNet 5 APLS Evaluation Suite',
            tasks: [
              'Run all-pairs shortest path Dijkstra comparison against Ground Truth',
              'Compute metric graph disconnect percentage across 200 tiles'
            ]
          },
          {
            name: 'Phase 5 — TensorRT Deployment & Web Tile Streamer',
            milestone: 'Production Edge Inference Service',
            tasks: [
              'Export ONNX model and compile TensorRT FP16 execution engine',
              'Implement WebSocket GeoJSON segment streamer in FastAPI'
            ]
          },
          {
            name: 'Phase 6 — Academic Thesis & Viva Defense Preparation',
            milestone: 'Final Deliverables & Defense Ready',
            tasks: [
              'Write Chapter 5 Theoretical Foundations and Chapter 8 Testing Suite',
              'Complete interactive viva defense questions on spatial graph theory'
            ]
          }
        ]
      });
    }, 1200);
  };

  const filteredTasks = tasks.filter(t => {
    if (filterPriority !== 'all' && t.priority !== filterPriority) return false;
    return true;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 select-none">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
              Execution Layer
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Tasks & Action Engine
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {tasks.length} Action Items
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Coordinated deliverables directly wired into milestones and code commits.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAIPlannerModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass-panel-cyan border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-xs font-semibold transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)]"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>AI Task Planner</span>
          </button>
        </div>
      </div>

      {/* Kanban Board View */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {columns.map(col => {
          const colTasks = filteredTasks.filter(t => t.status === col.id);
          return (
            <div key={col.id} className="flex flex-col rounded-2xl glass-panel border border-white/10 p-3 min-h-[550px]">
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold uppercase tracking-wider font-mono ${col.color}`}>
                    {col.label}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5">
                  {colTasks.length}
                </span>
              </div>

              {/* Task Cards Column */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {colTasks.map(task => (
                  <div
                    key={task.id}
                    className="p-3.5 rounded-xl glass-panel border border-white/10 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all duration-200 space-y-2.5 group shadow-sm"
                  >
                    {/* Priority & Due */}
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className={`px-1.5 py-0.5 rounded uppercase font-semibold ${
                        task.priority === 'urgent' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                        task.priority === 'high' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                      }`}>
                        {task.priority}
                      </span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.estimatedTime || task.dueDate}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xs font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors leading-tight">
                      {task.title}
                    </h3>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {task.description}
                    </p>

                    {/* AI Context Badge if available */}
                    {task.aiContext && (
                      <div className="p-1.5 rounded bg-cyan-950/40 border border-cyan-500/20 text-[10px] text-cyan-300 font-mono flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span className="truncate">{task.aiContext}</span>
                      </div>
                    )}

                    {/* Tags & Assignee */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={task.assignee.avatar}
                          alt={task.assignee.name}
                          className="w-5 h-5 rounded-full object-cover border border-white/10"
                        />
                        <span className="text-[10px] text-slate-400 font-mono truncate max-w-[80px]">
                          {task.assignee.name}
                        </span>
                      </div>

                      {/* Quick Move Dropdown */}
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value as TaskStatus)}
                        className="bg-slate-900 text-[10px] font-mono text-slate-300 rounded px-1.5 py-0.5 border border-white/10 focus:outline-none focus:border-cyan-400"
                      >
                        <option value="todo">Todo</option>
                        <option value="in_progress">In Progress</option>
                        <option value="blocked">Blocked</option>
                        <option value="review">Review</option>
                        <option value="done">Done</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Task Planning Modal */}
      {showAIPlannerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl rounded-2xl glass-panel-cyan border border-cyan-500/40 p-6 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  AI Engineering Task Planner
                </h3>
              </div>
              <button
                onClick={() => { setShowAIPlannerModal(false); setGeneratedPlan(null); }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Instruct NEXUS to break down your high-level project goals into realistic engineering milestones, task sequences, and dependency mappings.
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={plannerPrompt}
                onChange={(e) => setPlannerPrompt(e.target.value)}
                className="flex-1 p-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans"
              />
              <button
                onClick={handleGenerateAIPlan}
                disabled={isGeneratingPlan}
                className="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-semibold transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] disabled:opacity-50 flex items-center gap-2"
              >
                <Sparkles className={`w-4 h-4 ${isGeneratingPlan ? 'animate-spin' : ''}`} />
                <span>{isGeneratingPlan ? 'Synthesizing Plan...' : 'Generate Plan'}</span>
              </button>
            </div>

            {/* Generated Plan Breakdown */}
            {generatedPlan && (
              <div className="mt-4 pt-4 border-t border-cyan-500/30 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
                    Generated 6-Phase Engineering Breakdown
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    Ready for Review
                  </span>
                </div>

                <div className="space-y-3">
                  {generatedPlan.phases.map((ph: any, idx: number) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono flex items-center justify-center">
                          {idx + 1}
                        </span>
                        {ph.name}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 pl-6">
                        Target Milestone: <span className="text-slate-200">{ph.milestone}</span>
                      </div>
                      <div className="pl-6 space-y-1 pt-1">
                        {ph.tasks.map((tsk: string, tIdx: number) => (
                          <div key={tIdx} className="text-xs text-slate-300 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            <span>{tsk}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      alert('Generated tasks incorporated into project roadmap and task engine!');
                      setShowAIPlannerModal(false);
                      setGeneratedPlan(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold transition-colors"
                  >
                    Accept & Commit to Project Tasks
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
