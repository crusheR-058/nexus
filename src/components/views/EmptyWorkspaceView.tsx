'use client';

import React, { useRef, useState } from 'react';
import { 
  FolderUp, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  FolderGit2, 
  Network, 
  BrainCircuit, 
  GraduationCap, 
  Award,
  Layers,
  FileCode2,
  Terminal,
  ArrowRight
} from 'lucide-react';
import { parseLocalProjectFiles } from '@/lib/projectParser';
import { ProjectBundle } from '@/types';
import confetti from 'canvas-confetti';

interface EmptyWorkspaceViewProps {
  onProjectIngested: (bundle: ProjectBundle) => void;
  onOpenUploadModal: () => void;
  onLoadSampleProject?: () => void;
}

export default function EmptyWorkspaceView({
  onProjectIngested,
  onOpenUploadModal,
  onLoadSampleProject
}: EmptyWorkspaceViewProps) {
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const folderInputRef = useRef<HTMLInputElement>(null);

  const handleProcessFiles = async (files: File[]) => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);
    setStatusMessage(`Scanning ${files.length} project files...`);

    try {
      await new Promise(r => setTimeout(r, 400));
      setStatusMessage('Parsing dependencies, package scripts, & README...');

      const bundle = await parseLocalProjectFiles(files);
      await new Promise(r => setTimeout(r, 400));
      setStatusMessage('Synthesizing Intelligence Graph & Viva Coach...');

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}

      onProjectIngested(bundle);
    } catch (err) {
      console.error('Error ingesting files:', err);
      alert('Could not parse project files. Please try again.');
    } finally {
      setIsProcessing(false);
      setStatusMessage('');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 select-none overflow-y-auto grid-canvas-bg">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      {/* Hidden input for folder pick */}
      <input
        ref={folderInputRef}
        type="file"
        // @ts-expect-error webkitdirectory standard
        webkitdirectory=""
        directory=""
        multiple
        onChange={(e) => {
          if (e.target.files) handleProcessFiles(Array.from(e.target.files));
        }}
        className="hidden"
      />

      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center text-center">
        {/* Glowing badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-6 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>AI Engineering Command Center v2.4</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 font-sans">
          Upload Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">Local Project</span>
        </h1>
        <p className="text-sm text-slate-300 max-w-lg mb-8 leading-relaxed font-mono">
          NEXUS is ready. Connect any local repository to generate an interactive Project Intelligence Graph, automated 16-chapter thesis, and Viva defense coach.
        </p>

        {/* Big Interactive Dropzone / Upload Box */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`w-full p-8 rounded-2xl glass-panel-cyan border-2 border-dashed transition-all cursor-pointer ${
            dragActive 
              ? 'border-cyan-400 bg-cyan-500/15 scale-[1.02]' 
              : 'border-cyan-500/30 hover:border-cyan-400 bg-black/40'
          }`}
          onClick={() => folderInputRef.current?.click()}
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-4 shadow-[0_0_25px_rgba(0,229,255,0.3)]">
            <FolderUp className="w-8 h-8" />
          </div>

          <h3 className="text-base font-bold text-white mb-1">
            Drag & Drop Your Project Folder Here
          </h3>
          <p className="text-xs text-slate-400 font-mono mb-6 max-w-md mx-auto">
            Or click anywhere to browse your local file system. Supports Next.js, React, Python, Rust, Go, or Thesis repos.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                folderInputRef.current?.click();
              }}
              disabled={isProcessing}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:scale-105 active:scale-95"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Select Project Directory</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenUploadModal();
              }}
              disabled={isProcessing}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-xs transition-all hover:scale-105 active:scale-95"
            >
              <FileCode2 className="w-4 h-4 text-cyan-400" />
              <span>More Options / Manifest</span>
            </button>
          </div>

          {/* Processing status */}
          {isProcessing && (
            <div className="mt-6 p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-xs text-cyan-300 font-mono animate-pulse">
              {statusMessage}
            </div>
          )}
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-8">
          <div className="p-3.5 rounded-xl glass-panel border border-white/10 text-left">
            <Network className="w-4 h-4 text-cyan-400 mb-2" />
            <h4 className="text-xs font-semibold text-white">Intelligence Graph</h4>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
              Auto-mapped dependencies, architecture layers, and cross-category rays.
            </p>
          </div>

          <div className="p-3.5 rounded-xl glass-panel border border-white/10 text-left">
            <GraduationCap className="w-4 h-4 text-purple-400 mb-2" />
            <h4 className="text-xs font-semibold text-white">16-Chapter FYP Thesis</h4>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
              Instant academic thesis draft synthesized from your code structure.
            </p>
          </div>

          <div className="p-3.5 rounded-xl glass-panel border border-white/10 text-left">
            <Award className="w-4 h-4 text-emerald-400 mb-2" />
            <h4 className="text-xs font-semibold text-white">Viva Defense Coach</h4>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
              AI examiner grilling session tailored to your exact tech stack.
            </p>
          </div>
        </div>

        {/* Optional Demo Loader */}
        {onLoadSampleProject && (
          <div className="mt-8 flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span>Want to explore first without uploading?</span>
            <button
              onClick={onLoadSampleProject}
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 font-semibold"
            >
              Load Sample FYP Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
