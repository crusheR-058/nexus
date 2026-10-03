'use client';

import React, { useState } from 'react';
import { VivaQuestion } from '@/types';
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ArrowRight, 
  Send, 
  RefreshCw, 
  MessageSquare, 
  Mic, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface VivaViewProps {
  questions: VivaQuestion[];
}

interface EvaluationResult {
  score: number;
  correct: string;
  missing: string;
  improve: string;
  followUp: string;
}

export default function VivaView({
  questions
}: VivaViewProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<VivaQuestion>(questions[0]);
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'technical', label: 'Technical Theory' },
    { id: 'implementation', label: 'Implementation' },
    { id: 'defense', label: 'Defense & Limitations' }
  ];

  const filteredQuestions = questions.filter(q => {
    if (activeCategory !== 'all' && q.category !== activeCategory) return false;
    return true;
  });

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);

    setTimeout(() => {
      setIsEvaluating(false);
      // Realistic contextual grading based on the question
      if (selectedQuestion.id === 'vq-1') {
        setEvaluation({
          score: 88,
          correct: 'Correctly noted that U-Net produces a binary pixel segmentation mask and that morphological skeletonization is brittle at junction intersections.',
          missing: 'Did not explicitly mention how graph-tensors encode the directional angle vector space in continuous 16-bin outputs.',
          improve: 'Emphasize that graph-tensors eliminate the need for heuristic thinning altogether, reducing inference disconnections by 45%.',
          followUp: selectedQuestion.followUpQuestion
        });
      } else if (selectedQuestion.id === 'vq-2') {
        setEvaluation({
          score: 92,
          correct: 'Outstanding explanation of the 99% pixel IoU trap versus true topological road drivability.',
          missing: 'Could highlight that APLS samples shortest paths along the entire Dijkstra graph matrix.',
          improve: 'Mention the exact mathematical formula: APLS = 1 - min(1, sum(|L_gt - L_prop| / L_gt)).',
          followUp: selectedQuestion.followUpQuestion
        });
      } else {
        setEvaluation({
          score: 85,
          correct: 'Accurately recognized spatial GIST indexes and PostGIS native vector operations as the primary motivation.',
          missing: 'Remember to mention pgvector integration for satellite image tile embeddings within the same ACID store.',
          improve: 'State that eliminating a separate graph DB avoided dual-write distributed transaction failure modes.',
          followUp: selectedQuestion.followUpQuestion
        });
      }
    }, 1000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400">
              Interactive Academic Simulation
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Viva Defense Coach
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Live Examiner Engine
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Cross-examination training grounded in your actual project decisions, code commits, and research foundations.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-colors shrink-0 ${
              activeCategory === c.id
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.25)]'
                : 'text-slate-400 hover:text-white bg-white/5 border border-white/5'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Questions List */}
        <div className="space-y-3 lg:col-span-1">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Examiner Question Bank ({filteredQuestions.length})
          </span>

          <div className="space-y-2.5">
            {filteredQuestions.map(q => {
              const isSelected = selectedQuestion.id === q.id;
              return (
                <div
                  key={q.id}
                  onClick={() => {
                    setSelectedQuestion(q);
                    setUserAnswer('');
                    setEvaluation(null);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                    isSelected 
                      ? 'border-purple-400 bg-purple-950/40 shadow-[0_0_20px_rgba(168,85,247,0.25)]' 
                      : 'border-white/5 hover:border-white/20 bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-purple-400 uppercase font-semibold">{q.category}</span>
                    <span className="text-slate-400 uppercase">{q.difficulty}</span>
                  </div>

                  <h3 className="text-xs font-bold text-white leading-snug">
                    {q.question}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Interactive Defense & AI Grading Canvas */}
        <div className="lg:col-span-2 rounded-2xl glass-panel-violet border border-purple-500/30 p-6 space-y-6">
          {/* Question Banner */}
          <div className="space-y-3 pb-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-purple-400 uppercase font-semibold">
                Category: {selectedQuestion.category} · {selectedQuestion.difficulty}
              </span>
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Examiner Roleplay
              </span>
            </div>

            <h2 className="text-base font-bold text-white tracking-tight leading-snug">
              {selectedQuestion.question}
            </h2>
          </div>

          {/* User Answer Input Area */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
              <span>Your Defense Statement:</span>
              <span className="text-slate-500 text-[10px]">Speak or type your technical reasoning</span>
            </label>

            <textarea
              rows={4}
              placeholder="e.g. Standard semantic segmentation fails because converting a pixel mask to a graph requires mathematical morphological thinning, which fragments continuity at intersections..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-black/60 border border-white/10 focus:border-purple-400 text-xs text-white placeholder-slate-500 focus:outline-none font-sans leading-relaxed"
            />

            <div className="flex items-center justify-between pt-1">
              {/* Quick Fill Sample Answer Button for Demo testing */}
              <button
                type="button"
                onClick={() => setUserAnswer(selectedQuestion.sampleAnswer)}
                className="text-[11px] font-mono text-purple-300 hover:text-white underline underline-offset-2"
              >
                Insert Recommended Model Answer
              </button>

              <button
                onClick={handleSubmitAnswer}
                disabled={!userAnswer.trim() || isEvaluating}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-black font-semibold text-xs transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] disabled:opacity-40"
              >
                <Sparkles className={`w-4 h-4 ${isEvaluating ? 'animate-spin' : ''}`} />
                <span>{isEvaluating ? 'Evaluating Defense...' : 'Submit to Examiner'}</span>
              </button>
            </div>
          </div>

          {/* AI Structured Evaluation Output */}
          {evaluation && (
            <div className="mt-6 pt-6 border-t border-purple-500/30 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-400" />
                  <span className="text-xs font-mono uppercase font-bold text-white">
                    NEXUS Examiner Evaluation Report
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-xs font-mono font-bold text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                  Score: {evaluation.score} / 100
                </div>
              </div>

              {/* Four Feedback Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    What Was Technically Correct
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {evaluation.correct}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-amber-400 font-bold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    What Was Missing / Incomplete
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {evaluation.missing}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    How to Deliver a High-Distinction Answer
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {evaluation.improve}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-purple-400 font-bold flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    Anticipated Examiner Follow-up Question
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed italic">
                    "{evaluation.followUp}"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
