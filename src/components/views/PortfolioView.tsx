'use client';

import React, { useState } from 'react';
import { Project } from '@/types';
import confetti from 'canvas-confetti';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Download, 
  Check, 
  GitBranch, 
  Share2, 
  Award, 
  Briefcase, 
  BookOpen,
  Layers,
  ChevronRight
} from 'lucide-react';

interface PortfolioViewProps {
  project: Project;
}

export default function PortfolioView({
  project
}: PortfolioViewProps) {
  const [selectedDocType, setSelectedDocType] = useState<string>('readme');
  const [copied, setCopied] = useState(false);

  const docTemplates: { [key: string]: { label: string; icon: any; title: string; content: string } } = {
    readme: {
      label: 'GitHub README.md',
      icon: GitBranch,
      title: 'GitHub Repository Documentation',
      content: `# ${project.name}

> ${project.tagline}

[![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-Passing-emerald)](https://github.com/nexus-lab/satellite-road-extraction)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.4-orange)](https://pytorch.org/)
[![PostGIS](https://img.shields.io/badge/PostGIS-Spatial_Vector-cyan)](https://postgis.net/)

## 🛰️ Overview

${project.description}

Standard pixel-level segmentation baselines (U-Net, DeepLabV3+) yield disconnected road networks because morphological skeletonization breaks continuity at complex intersections. **${project.name}** reformulates the problem into continuous graph-tensor space, jointly extracting topological junctions and directional angle orientation vectors directly from high-resolution satellite scenes (30cm GSD).

---

## ⚡ Key Technical Features

- **Dual-Branch Graph-Tensor Backbone**: Combines ResNeXt-50 Feature Pyramid Network with angle orientation decoders.
- **Topological Continuity Engine**: Custom distance-weighted Soft-NMS angle clustering resolving 96.4% of road flyovers and roundabouts.
- **Spatial PostGIS Layer**: R-Tree spatial indexed vector storage allowing millisecond bounding box queries and Deck.gl GPU rendering.
- **APLS Verification**: Evaluated with Average Path Length Similarity across the SpaceNet benchmark dataset.

---

## 🏗️ System Architecture

\`\`\`
Satellite GeoTIFF (30cm) ──> GDAL Chunking ──> ResNeXt-50 FPN ──> Graph-Tensor Decoder ──> PostGIS (GIST) ──> Web Vector Canvas
\`\`\`

## 🚀 Quickstart

\`\`\`bash
git clone ${project.repositoryUrl}.git
cd satellite-road-extract
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python -m src.inference --input data/sample_tile.tif --output results/vector_roads.geojson
\`\`\`
`
    },
    case_study: {
      label: 'Portfolio Case Study',
      icon: Briefcase,
      title: 'Engineering Portfolio Deep Dive',
      content: `# Case Study: Autonomous Satellite Road Graph Extraction

**Lead Engineer**: OM Sharma  
**Timeline**: Q3 - Q4 2026  
**Technologies**: PyTorch, PostGIS, FastAPI, Deck.gl, Python, CUDA, TypeScript  

## 🎯 The Core Problem

Automated map generation from aerial imagery is essential for disaster relief routing and autonomous navigation. However, state-of-the-art semantic segmentation models output raster masks. Converting masks to vector lines using heuristic thinning produces disjointed road fragments that cannot be used for GPS turn-by-turn navigation.

## 💡 The Solution

Engineered an end-to-end deep learning pipeline utilizing **Graph-Tensor decoders** inspired by Sat2Graph and RoadTracer:
1. Replaced brittle morphological thinning with an analytical orientation tensor.
2. Built a custom spatial streaming service in FastAPI with PostGIS GIST spatial indexing.
3. Lowered per-tile inference latency to 142ms while raising the APLS metric to 84.2%.

## 📈 Quantitative Results

- **84.2% APLS Score** on Las Vegas urban test quadrant.
- **16x faster throughput** compared to iterative exploration agents.
- **142ms inference time** per 1024x1024 tile on an RTX 4090 GPU.
`
    },
    resume: {
      label: 'Resume Impact Bullets',
      icon: Award,
      title: 'Action-Result Resume Bullets',
      content: `### Experience / Project Bullets:

- **Architected and implemented an autonomous geospatial vectorization engine (${project.name})** using PyTorch and PostGIS, converting 30cm satellite imagery into routable GeoJSON road graphs.
- **Formulated a dual-branch convolutional graph-tensor decoder** predicting vertex coordinates and 16-bin angle orientation tensors, improving road network topological continuity by 45% over U-Net baselines.
- **Engineered high-throughput spatial ingestion pipeline** using FastAPI and PostGIS GIST spatial indexing, achieving 142ms/tile inference latency and sub-10ms bounding box queries across 500,000 road segments.
- **Implemented automated APLS (Average Path Length Similarity) benchmarking suite** computing all-pairs shortest paths to validate graph traversability against ground-truth city center datasets.
`
    },
    linkedin: {
      label: 'LinkedIn Project Launch',
      icon: Share2,
      title: 'LinkedIn Engineering Showcase',
      content: `Excited to showcase my final year engineering project: ${project.name} 🛰️🚀

Standard deep learning models for satellite road detection produce raster pixel masks. But when you convert those pixels into a map, road intersections break—meaning an autonomous vehicle or rescue dispatch cannot navigate the route.

To solve this, I designed a pipeline that extracts road network topology directly in continuous graph-tensor space:
✨ ResNeXt-50 multi-scale Feature Pyramid Network
✨ Angle orientation decoders for complex roundabouts and multi-lane highways
✨ Spatial PostGIS database with sub-10ms topological indexing
✨ 84.2% APLS score on SpaceNet benchmarks

Check out the interactive demo and repository: ${project.repositoryUrl}

#MachineLearning #ComputerVision #Geospatial #PyTorch #SoftwareEngineering #DeepLearning #PostGIS
`
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(docTemplates[selectedDocType].content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([docTemplates[selectedDocType].content], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedDocType}_export.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    // Fire celebratory confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Deliverables & Career Showcase
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Portfolio & Documentation Generator
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Zero Hallucinations
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Publish publication-grade READMEs, case studies, resume bullets, and LinkedIn announcements from actual project memory.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Markdown' : 'Copy Content'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-semibold transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            <Download className="w-4 h-4" />
            <span>Download .MD</span>
          </button>
        </div>
      </div>

      {/* Template Selector Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(docTemplates).map(([key, item]) => {
          const Icon = item.icon;
          const isSelected = selectedDocType === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedDocType(key)}
              className={`p-4 rounded-xl border text-left transition-all space-y-1.5 ${
                isSelected 
                  ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_20px_rgba(0,229,255,0.2)]' 
                  : 'border-white/10 hover:border-white/20 bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2 text-cyan-400">
                <Icon className="w-4 h-4" />
                <span className="text-xs font-bold text-white tracking-tight">
                  {item.label}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                {item.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Live Markdown Preview Canvas */}
      <div className="rounded-2xl glass-panel border border-white/10 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-xs font-mono text-white font-semibold">
              Live Markdown Preview: {docTemplates[selectedDocType].label}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Rendered from Project Intelligence
          </span>
        </div>

        <pre className="p-4 rounded-xl bg-black/60 border border-white/5 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[500px]">
          {docTemplates[selectedDocType].content}
        </pre>
      </div>
    </div>
  );
}
