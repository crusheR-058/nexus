'use client';

import React, { useState } from 'react';
import { ProjectMemory, ResearchPaper } from '@/types';
import { 
  BookMarked, 
  BrainCircuit, 
  Search, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  Calendar, 
  User, 
  Layers,
  ChevronRight
} from 'lucide-react';

interface KnowledgeViewProps {
  memoryItems: ProjectMemory[];
  papers: ResearchPaper[];
}

export default function KnowledgeView({
  memoryItems,
  papers
}: KnowledgeViewProps) {
  const [memoryQuery, setMemoryQuery] = useState('');
  const [memoryAnswer, setMemoryAnswer] = useState<string | null>(null);

  const handleAskMemory = (q: string) => {
    setMemoryQuery(q);
    if (q.toLowerCase().includes('postgres') || q.toLowerCase().includes('database')) {
      setMemoryAnswer('Decision Record #1 (Oct 01, 2026): PostgreSQL 16 with PostGIS extension was chosen because the system requires native spatial geometric queries (ST_DWithin, ST_Length) with spatial GIST indexes and ACID transactional integrity for tasks/users. MongoDB and Neo4j lacked the required geospatial performance.');
    } else if (q.toLowerCase().includes('graph') || q.toLowerCase().includes('unet') || q.toLowerCase().includes('tensor')) {
      setMemoryAnswer('Decision Record #2 (Sep 14, 2026): Adopted dual-head Graph-Tensor network over standard semantic U-Net segmentation. Classical pixel thresholding and skeletonization break road connectivity at intersections under tree canopy and overpasses. Graph-tensors predict vertices and angles in unified continuous space.');
    } else if (q.toLowerCase().includes('apls') || q.toLowerCase().includes('metric') || q.toLowerCase().includes('iou')) {
      setMemoryAnswer('Decision Record #3 (Sep 02, 2026): APLS (Average Path Length Similarity) was mandated as the primary benchmark because a single 5-pixel break in a road leaves pixel IoU at 99.8% but ruins network routing (0% drivability). APLS measures metric shortest paths and penalizes false disconnections.');
    } else {
      setMemoryAnswer('Project Memory contains 3 formal architectural decisions, 4 academic research papers, and full commit provenance. Ask specific questions regarding database selection, model topology, or evaluation metrics.');
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-violet-400">
              Persistent Context & Registry
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Knowledge Hub & Project Memory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Immutable architectural decision records, rationale logs, and scientific literature indexed with pgvector.
          </p>
        </div>
      </div>

      {/* Project Memory Query Assistant */}
      <div className="rounded-2xl glass-panel-violet border border-purple-500/40 p-6 space-y-4 shadow-[0_0_30px_rgba(139,92,246,0.15)]">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-purple-400" />
          <h2 className="text-sm font-bold text-white tracking-tight font-mono">
            Ask Project Memory
          </h2>
        </div>
        <p className="text-xs text-slate-300">
          Query why technical decisions were made, alternatives considered, and constraint justifications.
        </p>

        <div className="flex flex-wrap gap-2">
          {[
            'Why did we choose PostgreSQL?',
            'Why Graph-Tensor instead of U-Net?',
            'Why APLS metric over IoU?'
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleAskMemory(prompt)}
              className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 hover:bg-purple-500/20 text-slate-300 hover:text-purple-200 border border-white/10 hover:border-purple-500/30 transition-colors"
            >
              "{prompt}"
            </button>
          ))}
        </div>

        {memoryAnswer && (
          <div className="p-4 rounded-xl bg-black/70 border border-purple-500/40 space-y-1.5 animate-in fade-in">
            <div className="text-[10px] font-mono uppercase text-purple-400 font-semibold">
              Project Memory Rationale Retrieved
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {memoryAnswer}
            </p>
          </div>
        )}
      </div>

      {/* Decision Registry Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white tracking-tight uppercase font-mono">
            Architectural Decision Records (ADRs)
          </h3>
          <span className="text-[10px] font-mono text-slate-400">
            {memoryItems.length} Immutable Decisions
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {memoryItems.map(item => (
            <div
              key={item.id}
              className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded uppercase font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {item.category}
                  </span>
                  <span className="text-slate-400">{item.timestamp}</span>
                </div>

                <h4 className="text-xs font-bold text-white leading-tight">
                  {item.title}
                </h4>

                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-200 font-medium">
                  {item.decision}
                </div>

                <div className="text-[11px] text-slate-400 leading-relaxed">
                  <span className="text-slate-300 font-semibold font-mono">Rationale: </span>
                  {item.rationale}
                </div>
              </div>

              {/* Alternatives Considered */}
              <div className="pt-2 border-t border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  Alternatives Ruled Out:
                </span>
                <div className="flex flex-wrap gap-1">
                  {item.alternativesConsidered.map((alt, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-slate-400 border border-white/5">
                      {alt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
