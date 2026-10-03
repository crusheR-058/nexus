'use client';

import React, { useState } from 'react';
import { ResearchPaper } from '@/types';
import { 
  Microscope, 
  BookOpen, 
  ExternalLink, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Quote, 
  AlertTriangle,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface ResearchViewProps {
  papers: ResearchPaper[];
}

export default function ResearchView({
  papers
}: ResearchViewProps) {
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper>(papers[0]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400">
              Academic Foundations & Literature
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Research Synthesis Lab
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {papers.length} Peer-Reviewed Papers
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Methodology extraction, algorithmic cross-comparisons, and empirical benchmark results.
          </p>
        </div>
      </div>

      {/* Main Grid: Papers List & Deep Paper Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Paper Cards */}
        <div className="space-y-4 lg:col-span-1">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Ingested Citations
          </span>

          <div className="space-y-3">
            {papers.map(p => {
              const isSelected = selectedPaper.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPaper(p)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected 
                      ? 'border-purple-400 bg-purple-950/30 shadow-[0_0_20px_rgba(168,85,247,0.2)]' 
                      : 'border-white/5 hover:border-white/20 bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-purple-400">{p.venue}</span>
                    <span className="text-slate-400">{p.citationsCount} citations</span>
                  </div>

                  <h3 className="text-xs font-bold text-white leading-tight">
                    {p.title}
                  </h3>

                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {p.authors.join(', ')}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {p.keyConcepts.slice(0, 2).map((c, i) => (
                      <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Deep Paper Analysis Canvas */}
        <div className="lg:col-span-2 rounded-2xl glass-panel-violet border border-purple-500/30 p-6 space-y-6">
          {/* Header */}
          <div className="space-y-2 pb-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider">
                {selectedPaper.venue} ({selectedPaper.publicationYear})
              </span>
              <a 
                href={selectedPaper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-purple-300 hover:text-white flex items-center gap-1"
              >
                <span>arXiv / PDF Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <h2 className="text-lg font-bold text-white tracking-tight">
              {selectedPaper.title}
            </h2>

            <p className="text-xs text-slate-400 font-mono">
              Authors: {selectedPaper.authors.join(', ')}
            </p>
          </div>

          {/* Abstract */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Paper Abstract
            </span>
            <p className="text-xs text-slate-300 leading-relaxed p-3.5 rounded-xl bg-black/40 border border-white/5">
              {selectedPaper.abstract}
            </p>
          </div>

          {/* Structured Extraction Triad */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <div className="text-[10px] font-mono uppercase text-cyan-400 font-semibold">
                Methodology & Algorithmic Approach
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {selectedPaper.methodology}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <div className="text-[10px] font-mono uppercase text-emerald-400 font-semibold">
                Reported Results & Benchmarks
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {selectedPaper.results}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <div className="text-[10px] font-mono uppercase text-sky-400 font-semibold">
                Dataset Evaluated
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {selectedPaper.dataset}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-amber-500/30 space-y-1">
              <div className="text-[10px] font-mono uppercase text-amber-400 font-semibold">
                Known Limitations & Edge Cases
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {selectedPaper.limitations}
              </p>
            </div>
          </div>

          {/* Key Concepts Tags */}
          <div className="space-y-2 pt-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Ontology Concept Tags
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedPaper.keyConcepts.map((concept, idx) => (
                <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {concept}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
