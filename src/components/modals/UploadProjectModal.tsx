'use client';

import React, { useState, useRef } from 'react';
import { 
  FolderUp, 
  FileCode, 
  Upload, 
  Sparkles, 
  X, 
  CheckCircle2, 
  Loader2, 
  ArrowRight,
  Layers,
  FolderGit2,
  FileArchive,
  Terminal,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { parseLocalProjectFiles } from '@/lib/projectParser';
import { ProjectBundle } from '@/types';

interface UploadProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectIngested: (bundle: ProjectBundle) => void;
}

export default function UploadProjectModal({
  isOpen,
  onClose,
  onProjectIngested
}: UploadProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'folder' | 'files' | 'manual'>('folder');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  
  // Manual input form state
  const [manualName, setManualName] = useState('');
  const [manualDescription, setManualDescription] = useState('');
  const [manualStack, setManualStack] = useState('Next.js, TypeScript, Tailwind');
  const [manualRepo, setManualRepo] = useState('');

  const folderInputRef = useRef<HTMLInputElement>(null);
  const filesInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const handleProcessFiles = async (files: File[]) => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);
    setProcessingStatus('Ingesting local project tree...');

    try {
      // Step 1: Analyze directory
      await new Promise(r => setTimeout(r, 400));
      setProcessingStatus(`Scanning ${files.length} project files...`);

      // Step 2: Parse configurations
      await new Promise(r => setTimeout(r, 450));
      setProcessingStatus('Parsing dependencies, package scripts, & README...');

      // Step 3: Run parser
      const bundle = await parseLocalProjectFiles(files);

      // Step 4: Synthesize Graph & Intelligence
      await new Promise(r => setTimeout(r, 400));
      setProcessingStatus('Synthesizing Intelligence Graph & Viva coach...');

      await new Promise(r => setTimeout(r, 300));
      triggerConfetti();
      onProjectIngested(bundle);
      onClose();
    } catch (err) {
      console.error('Project ingestion error:', err);
      alert('Error analyzing project files. Please try again or select individual files.');
    } finally {
      setIsProcessing(false);
      setProcessingStatus('');
    }
  };

  const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      handleProcessFiles(filesArray);
    }
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      handleProcessFiles(filesArray);
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      handleProcessFiles(filesArray);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) return;

    setIsProcessing(true);
    setProcessingStatus('Initializing custom project workspace...');

    // Create a virtual package.json and README.md file
    const virtualPkg = new File(
      [JSON.stringify({
        name: manualName,
        description: manualDescription,
        scripts: { dev: 'next dev', build: 'next build', test: 'vitest run' },
        dependencies: manualStack.split(',').reduce((acc, s) => ({ ...acc, [s.trim().toLowerCase()]: 'latest' }), {})
      })],
      'package.json',
      { type: 'application/json' }
    );

    const virtualReadme = new File(
      [`# ${manualName}\n\n${manualDescription}\n\n## Tech Stack\n${manualStack}`],
      'README.md',
      { type: 'text/markdown' }
    );

    await handleProcessFiles([virtualPkg, virtualReadme]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl glass-panel-cyan border border-cyan-500/40 p-6 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Glow ambient background effect */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-violet-600/15 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.25)]">
              <FolderUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Ingest Local Project
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                  Client-Side Offline
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Select your local project folder to construct an autonomous intelligence graph.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 mt-4 p-1 rounded-xl bg-black/40 border border-white/10 relative z-10">
          <button
            onClick={() => setActiveTab('folder')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'folder'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Select Local Folder</span>
          </button>

          <button
            onClick={() => setActiveTab('files')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'files'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileArchive className="w-4 h-4" />
            <span>Select Config / Files</span>
          </button>

          <button
            onClick={() => setActiveTab('manual')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'manual'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Initialize Manual</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto mt-4 space-y-4 relative z-10 py-1">
          {/* FOLDER UPLOAD TAB */}
          {activeTab === 'folder' && (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all ${
                dragActive 
                  ? 'border-cyan-400 bg-cyan-500/10 scale-[1.01]' 
                  : 'border-white/15 hover:border-cyan-500/40 bg-black/30'
              }`}
            >
              {/* Native webkitdirectory input */}
              <input
                ref={folderInputRef}
                type="file"
                // @ts-expect-error webkitdirectory is standard for Chromium/Webkit/Gecko directory pickers
                webkitdirectory=""
                directory=""
                multiple
                onChange={handleFolderChange}
                className="hidden"
              />

              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 shadow-[0_0_20px_rgba(0,229,255,0.15)] group-hover:scale-110 transition-transform">
                <FolderUp className="w-8 h-8" />
              </div>

              <h3 className="text-sm font-semibold text-white mb-1">
                Upload Entire Project Directory
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mb-5 font-mono">
                Click below to select your project directory from your computer. Files are read securely inside your browser.
              </p>

              <button
                type="button"
                onClick={() => folderInputRef.current?.click()}
                disabled={isProcessing}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold text-xs transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:scale-105 active:scale-95"
              >
                <FolderUp className="w-4 h-4" />
                <span>Choose Project Folder</span>
              </button>

              <div className="flex items-center gap-4 mt-6 text-[11px] font-mono text-slate-500">
                <span>Next.js</span>
                <span>•</span>
                <span>React</span>
                <span>•</span>
                <span>Python / PyTorch</span>
                <span>•</span>
                <span>Rust / Go</span>
                <span>•</span>
                <span>Full-Stack</span>
              </div>
            </div>
          )}

          {/* FILES UPLOAD TAB */}
          {activeTab === 'files' && (
            <div className="border-2 border-dashed border-white/15 hover:border-cyan-500/40 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-black/30">
              <input
                ref={filesInputRef}
                type="file"
                multiple
                accept=".json,.md,.toml,.txt,.ts,.tsx,.py,.rs,.go"
                onChange={handleFilesChange}
                className="hidden"
              />

              <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-4 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                <FileCode className="w-8 h-8" />
              </div>

              <h3 className="text-sm font-semibold text-white mb-1">
                Select Project Manifest / Config Files
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mb-5 font-mono">
                Select your <code className="text-cyan-300">package.json</code>, <code className="text-cyan-300">README.md</code>, <code className="text-cyan-300">requirements.txt</code>, or source files.
              </p>

              <button
                type="button"
                onClick={() => filesInputRef.current?.click()}
                disabled={isProcessing}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-105 active:scale-95"
              >
                <FileCode className="w-4 h-4" />
                <span>Choose Manifest Files</span>
              </button>
            </div>
          )}

          {/* MANUAL QUICK CREATE TAB */}
          {activeTab === 'manual' && (
            <form onSubmit={handleManualSubmit} className="space-y-4 bg-black/30 p-5 rounded-2xl border border-white/10">
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Autonomous Drone Navigation"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500 focus:outline-none text-xs text-white placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                  Description & Problem Statement
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe what this engineering project solves and its core architecture..."
                  value={manualDescription}
                  onChange={(e) => setManualDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500 focus:outline-none text-xs text-white placeholder-slate-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Next.js, PyTorch, Docker"
                    value={manualStack}
                    onChange={(e) => setManualStack(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500 focus:outline-none text-xs text-white placeholder-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                    GitHub / Repo URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/user/project"
                    value={manualRepo}
                    onChange={(e) => setManualRepo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500 focus:outline-none text-xs text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={!manualName.trim() || isProcessing}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-black font-semibold text-xs transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Initialize Project</span>
                </button>
              </div>
            </form>
          )}

          {/* Ingestion Processing Bar */}
          {isProcessing && (
            <div className="p-4 rounded-xl glass-panel-cyan border border-cyan-500/40 animate-pulse flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-cyan-400 animate-spin shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white truncate">
                  {processingStatus}
                </div>
                <div className="text-[10px] text-cyan-300 font-mono">
                  Constructing nodes, edges, milestones, and thesis sections...
                </div>
              </div>
            </div>
          )}

          {/* Privacy & Engine Note */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-400 font-mono flex items-start gap-2.5">
            <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-200 font-semibold">100% Client-Side Ingestion:</span> Your codebase is processed in-memory directly in your browser. No proprietary code files are uploaded to external cloud servers.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
