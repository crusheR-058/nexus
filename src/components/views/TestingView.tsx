'use client';

import React, { useState } from 'react';
import { TestCase, TestingBenchmark } from '@/types';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Play, 
  Terminal, 
  AlertTriangle, 
  Sparkles, 
  Layers, 
  ShieldAlert, 
  RefreshCw,
  TrendingUp,
  FileCode
} from 'lucide-react';

interface TestingViewProps {
  testCases: TestCase[];
  benchmarks: TestingBenchmark[];
  onNavigateToView: (view: string) => void;
}

export default function TestingView({
  testCases: initialTestCases,
  benchmarks,
  onNavigateToView
}: TestingViewProps) {
  const [testCases, setTestCases] = useState<TestCase[]>(initialTestCases);
  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'pytest -v --tb=short tests/',
    'tests/test_topology.py::test_soft_nms_intersection_clustering PASSED [20%]',
    'tests/test_db_spatial.py::test_postgis_gist_spatial_query_latency PASSED [40%]',
    'tests/test_gdal.py::test_gdal_tile_overlap_consistency PASSED [60%]',
    'tests/test_apls.py::test_spacenet_paris_apls_metric_eval FAILED [80%]',
    'AssertionError: Ground truth file missing for quadrant 4 in SpaceNet 5 Paris',
    '================= 3 passed, 1 failed, 1 pending in 0.42s ================='
  ]);

  const handleRunSuite = () => {
    setIsRunning(true);
    setTerminalOutput(prev => [...prev, '> Starting test runner with pytest-xdist (4 workers)...']);

    setTimeout(() => {
      setIsRunning(false);
      setTerminalOutput(prev => [
        ...prev,
        'tests/test_topology.py::test_soft_nms_intersection_clustering PASSED',
        'tests/test_db_spatial.py::test_postgis_gist_spatial_query_latency PASSED (8ms)',
        'tests/test_gdal.py::test_gdal_tile_overlap_consistency PASSED (65ms)',
        'tests/test_apls.py::test_spacenet_paris_apls_metric_eval FAILED (Missing Ground Truth)',
        'SUMMARY: 3 passed, 1 failed. Coverage: 48.0% (Critical gap detected)'
      ]);
    }, 1200);
  };

  const passedCount = testCases.filter(t => t.status === 'passed').length;
  const failedCount = testCases.filter(t => t.status === 'failed').length;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Verification & Benchmarking Engine
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Testing Suite & SpaceNet Benchmarks
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              48% Coverage · Action Required
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Topological network connectivity validation, Dijkstra all-pairs shortest path APLS metrics, and pytest runner.
          </p>
        </div>

        <button
          onClick={handleRunSuite}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-semibold transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] disabled:opacity-50 shrink-0"
        >
          <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Running Test Suite...' : 'Execute All Tests'}</span>
        </button>
      </div>

      {/* Primary Alert Callout */}
      <div className="p-5 rounded-2xl glass-panel-cyan border border-amber-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              SpaceNet 5 Paris APLS Benchmark Fails on Quadrant 4
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              Task #106 is currently blocked because ground truth GeoJSON files for Paris suburban districts are missing from the ingestion bucket.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateToView('tasks')}
          className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-semibold transition-colors shrink-0"
        >
          Inspect Task #106
        </button>
      </div>

      {/* Benchmark Matrix Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
            Empirical Benchmark Scorecard vs SOTA Baselines
          </h2>
          <span className="text-[10px] font-mono text-cyan-400">
            Las Vegas & Paris 30cm Imagery
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {benchmarks.map((b, idx) => (
            <div key={idx} className="p-4 rounded-xl glass-panel border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-slate-400 truncate max-w-[180px]">{b.metric}</span>
                <span className={`px-1.5 py-0.5 rounded font-bold ${
                  b.status === 'optimal' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                  'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}>
                  {b.delta}
                </span>
              </div>

              <div className="text-base font-bold text-white font-mono">
                {b.nexusScore}
              </div>

              <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-white/5">
                Baseline: {b.groundTruthBaseline}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column: Test Cases List & Interactive PyTest Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test Cases List */}
        <div className="rounded-2xl glass-panel border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                Automated Test Specifications ({testCases.length})
              </h3>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="text-emerald-400">{passedCount} Passed</span>
              <span>·</span>
              <span className="text-red-400">{failedCount} Failed</span>
            </div>
          </div>

          <div className="space-y-2.5">
            {testCases.map(t => (
              <div key={t.id} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {t.status === 'passed' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : t.status === 'failed' ? (
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    ) : (
                      <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                    <span className="font-mono font-medium text-white">{t.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{t.durationMs}ms</span>
                </div>

                <div className="text-[10px] font-mono text-slate-400 pl-6 flex items-center justify-between">
                  <span>{t.suite}</span>
                  <span className="text-slate-500">{t.file}</span>
                </div>

                <div className="text-[10px] font-mono text-cyan-300/80 bg-black/40 p-1.5 rounded pl-2">
                  {t.assertion}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live PyTest Terminal */}
        <div className="rounded-2xl glass-panel border border-cyan-500/30 p-5 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-white font-mono">
                  pytest Execution Telemetry
                </h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="mt-3 p-4 rounded-xl bg-black/80 border border-white/10 font-mono text-xs text-slate-300 space-y-1.5 min-h-[300px] overflow-y-auto">
              {terminalOutput.map((line, idx) => (
                <div 
                  key={idx}
                  className={`${
                    line.includes('PASSED') ? 'text-emerald-400' :
                    line.includes('FAILED') || line.includes('AssertionError') ? 'text-red-400 font-bold' :
                    line.includes('pytest') ? 'text-cyan-400' :
                    'text-slate-400'
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Environment: Python 3.11 · PyTorch 2.4 · CUDA 12.4</span>
            <span className="text-cyan-400">SpaceNet 5 Metric Kernel</span>
          </div>
        </div>
      </div>
    </div>
  );
}
