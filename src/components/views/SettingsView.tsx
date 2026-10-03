'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  Database, 
  GitFork, 
  Cpu, 
  ShieldCheck, 
  KeyRound, 
  Check, 
  Sparkles,
  Save
} from 'lucide-react';

export default function SettingsView() {
  const [aiProvider, setAiProvider] = useState('gemini');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              System Configuration
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            NEXUS Workspace Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure database persistence, AI model gateways, and GitHub OAuth integrations.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-semibold transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)]"
        >
          {saved ? <Check className="w-4 h-4 text-black" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved Config' : 'Save Changes'}</span>
        </button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* AI Provider Gateway */}
        <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-white">AI Gateway Abstraction Layer</h3>
              <p className="text-xs text-slate-400">Select model provider for RAG retrieval and viva defense coach.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {[
              { id: 'gemini', name: 'Google Gemini 2.5 Flash', badge: 'Active (Recommended)' },
              { id: 'claude', name: 'Anthropic Claude 3.5 Sonnet', badge: 'Available' },
              { id: 'openai', name: 'OpenAI GPT-4o', badge: 'Available' }
            ].map(prov => (
              <button
                key={prov.id}
                onClick={() => setAiProvider(prov.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  aiProvider === prov.id
                    ? 'border-cyan-400 bg-cyan-950/30 text-white shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-semibold">{prov.name}</div>
                <div className="text-[10px] font-mono text-cyan-400 mt-1">{prov.badge}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Database & Supabase */}
        <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Database & Vector Storage</h3>
              <p className="text-xs text-slate-400">PostgreSQL with pgvector for project memory and spatial tile embeddings.</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div>
              <label className="font-mono text-slate-400">Supabase Connection URI</label>
              <input
                type="text"
                disabled
                value="postgresql://postgres.nexus-cluster:5432/postgres?sslmode=require"
                className="w-full mt-1 p-2.5 rounded-lg bg-black/50 border border-white/10 text-slate-400 font-mono text-xs cursor-not-allowed"
              />
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>pgvector and PostGIS extensions operational</span>
            </div>
          </div>
        </div>

        {/* GitHub Integration */}
        <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
          <div className="flex items-center gap-2">
            <GitFork className="w-5 h-5 text-sky-400" />
            <div>
              <h3 className="text-sm font-bold text-white">GitHub OAuth & Telemetry</h3>
              <p className="text-xs text-slate-400">Connected account: om-sharma (Organization: nexus-lab)</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-slate-200 font-mono">Webhook Real-time Sync Active</span>
            </div>
            <button className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs border border-white/10">
              Re-authenticate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
