# NEXUS — AI Engineering Command Center

> **Tagline:** Your AI Engineering Command Center.  
> **Secondary:** Plan. Build. Understand. Ship.

NEXUS is an AI-native workspace for engineering students, researchers, developers, hackathon participants, and technical teams to **plan, build, understand, document, test, and showcase their projects**.

Instead of a generic project-management dashboard or a chatbot wrapper, NEXUS operates as an **operating system for an engineer's work**, visualizing every project as a living connected system:

```text
Project ──> Goals ──> Milestones ──> Tasks ──> Code ──> Commits ──> Issues
   │
   └──> Architecture ──> Research ──> Testing ──> Documentation ──> Portfolio
```

---

## ⚡ Key Highlights & Architecture

### 1. Project Intelligence Graph (Signature Visual Hero)
* **Living Technical System**: Radial node clusters spanning Code, Tasks, Architecture, Foundations, Milestones, and Portfolio around the active project core.
* **Animated Particles**: Subtle glowing particles traveling along active bezier relationship curves.
* **Full Interactivity**: Pan, smooth wheel zoom, direct node dragging, category filtering (`Code`, `Tasks`, `Research`, `Architecture`, `Milestones`), instant node search, fit view, and dedicated **Focus Mode** (`Crosshair`).
* **Context Synchronization**: Selecting any node illuminates connected paths and synchronizes the **Contextual Right Intelligence Panel**.

### 2. Contextual Right Intelligence Panel
* Dynamic dual-mode context adapting between **Project Intelligence** (progress, health dimensions, active sprint, next actions) and **Node Intelligence** (service metrics, tech stack, dependencies, and direct drill-down CTAs).

### 3. Floating AI Command Bar with Grounded Evidence
* Context chips reflecting active workspace state (`[Project: Satellite Road Extraction]`, `[Branch: main]`, `[4 Research Sources]`).
* Quick-action prompts (`"What should I work on today?"`, `"Why is milestone 4 at risk?"`, `"Prepare me for my viva defense"`).
* Verifiable Evidence modal (`[Show Evidence]`) citing exact commit SHAs (`8b4a2f9`), issue IDs (`#42`), and Architectural Decision Records (ADRs) without hallucination.

### 4. Project Workspace Modules (Section 17)
* **Tasks Engine**: Multi-column Kanban (`Todo`, `In Progress`, `Blocked`, `Review`, `Done`) with priority badges, time estimates, and an **AI Task Planner** modal synthesizing a 6-phase engineering plan.
* **Roadmap**: Gantt-aligned timeline spanning Q3/Q4 milestones with real-time blocker warnings.
* **Repositories & Codebase Intelligence**: Git commit telemetry with additions/deletions, PR reviews, code health triad, and AST semantic search terminal (`"Which areas are most fragile?"`, `"Where is authentication handled?"`).
* **Architecture Visualizer**: Interactive microservice topology canvas with protocol latencies (`HTTP/REST`, `gRPC`, `PostgreSQL Wire`, `WebSockets`) and an AI architecture generator.
* **Knowledge Hub & Project Memory**: Immutable Architectural Decision Records (ADRs) with rationale, alternatives considered, and an interactive query assistant (`"Why did we choose PostgreSQL?"`).
* **Research Synthesis Lab**: Deep analysis of peer-reviewed papers (`Sat2Graph`, `RoadTracer`) with extracted methodologies, datasets, benchmark results, and limitation audits.
* **Testing & SpaceNet Benchmarks**: Empirical scorecard (APLS metric, IoU, topological disconnection rate, tile latency, coverage) and real-time pytest execution terminal.
* **FYP Thesis Center**: 16-chapter academic thesis tracker (Problem Statement, Methodology, System Architecture, Testing Suite, etc.) with word count tracking and supervisor review feedback.
* **Viva Defense Coach**: Interactive examiner simulation with structured evaluation pillars: *What was correct*, *What was missing*, *How to improve*, and *Anticipated follow-up questions*.
* **Portfolio & Documentation Generator**: One-click generation and export of GitHub `README.md`, Portfolio Case Studies, Resume Impact Bullets, and LinkedIn Announcements with live preview, copy-to-clipboard, and download with celebratory confetti.

### 5. Global Engineering Universe Graph (Section 35 & 36)
* Maps the engineer's overarching identity (**OM Sharma**) connecting active projects, production tech stacks (`PyTorch`, `Next.js`, `PostGIS`), and research foundations into a living knowledge graph.

### 6. Raycast-Style Global Command Palette
* Accessible anywhere via **`⌘K`** / **`Ctrl+K`** for instant keyboard-driven search and navigation across all entities, actions, and projects.

---

## 🛠️ Technology Stack

* **Frontend**: Next.js 16 (App Router + Turbopack), React 19, TypeScript
* **Styling**: Tailwind CSS v4, custom glassmorphism, glowing accents, cybernetic canvas grid
* **Icons**: Lucide Icons
* **Visualization**: Interactive Canvas / SVG graph with bezier links and animated particle flows
* **Export & Delight**: Canvas-Confetti, Markdown exporter

---

## 🚀 Getting Started

### Prerequisites
* Node.js v18.0 or newer
* npm v9.0 or newer

### Installation

```bash
# Clone the repository
git clone https://github.com/crusheR-058/nexus.git
cd nexus

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to experience the engineering command center.

### Production Build

```bash
npm run build
npm run start
```

---

## 📄 License

MIT License. Designed and engineered for the next generation of builders.
