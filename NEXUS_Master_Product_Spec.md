# NEXUS --- AI Engineering Command Center

## Master Product + UI + Build Specification

> **Tagline:** Your AI Engineering Command Center.\
> **Secondary:** Plan. Build. Understand. Ship.

------------------------------------------------------------------------

# 1. Product Vision

NEXUS is an AI-native workspace for engineering students, developers,
researchers, hackathon participants, and technical teams to **plan,
build, understand, document, test, and showcase their projects**.

NEXUS is intentionally **not**:

-   a generic project-management dashboard
-   a Notion clone
-   a generic AI chatbot
-   an AI wrapper with a chat box
-   a collection of unrelated SaaS cards

Instead, NEXUS should feel like an **operating system for an engineer's
work**.

The central product idea is:

> **Every engineering project is a connected system.**

A project contains relationships between:

``` text
Project
  ↓
Goals
  ↓
Milestones
  ↓
Tasks
  ↓
Code
  ↓
Commits
  ↓
Issues
  ↓
Documents
  ↓
Research
  ↓
Architecture
  ↓
Testing
  ↓
Deployment
  ↓
Portfolio
```

NEXUS visualizes these relationships and adds an intelligence layer that
understands the context.

AI should not dominate the product.

AI should quietly:

-   understand
-   connect
-   analyze
-   recommend
-   summarize
-   retrieve
-   generate
-   assist execution

The user remains in control.

------------------------------------------------------------------------

# 2. Visual Direction

The uploaded reference video should be treated as **visual
inspiration**, not something to copy literally.

Extract the following design principles:

-   cinematic dark interface
-   immersive workspace
-   interactive node/relationship graph
-   glowing nodes and connection lines
-   floating glass information panels
-   subtle cyan/teal/violet illumination
-   high-contrast typography
-   premium spacing
-   layered depth
-   restrained futuristic aesthetics
-   dense but controlled information
-   contextual information panels
-   floating controls
-   smooth micro-interactions
-   AI integrated into the workflow rather than represented as a
    separate chatbot

Do **not** copy:

-   branding
-   logos
-   text
-   exact layouts
-   domain-specific content
-   exact component designs

The result must feel like an original NEXUS product.

------------------------------------------------------------------------

# 3. Brand

## Name

**NEXUS**

## Tagline

**Your AI Engineering Command Center.**

## Secondary tagline

**Plan. Build. Understand. Ship.**

## Personality

NEXUS should feel:

-   intelligent
-   technical
-   premium
-   calm
-   futuristic
-   trustworthy
-   engineering-focused
-   minimal
-   sophisticated

Avoid:

-   childish startup aesthetics
-   excessive gradients
-   generic purple AI interfaces
-   giant AI robot imagery
-   glowing brains
-   excessive glassmorphism
-   oversized rounded cards
-   "AI MAGIC" language
-   visual clutter
-   gaming-dashboard aesthetics

------------------------------------------------------------------------

# 4. Core Product Concept

NEXUS revolves around a **Project Intelligence Graph**.

The graph is not decorative.

It is the primary representation of the user's engineering universe.

A project can contain nodes representing:

-   project
-   goals
-   milestones
-   tasks
-   repository
-   commits
-   issues
-   pull requests
-   documents
-   research
-   architecture
-   datasets
-   technologies
-   deployments
-   portfolio artifacts
-   decisions
-   dependencies

Connections represent relationships.

For example:

``` text
                    PROJECT
                       │
          ┌────────────┼────────────┐
          │            │            │
       MILESTONE      CODE       RESEARCH
          │            │            │
        TASKS       GITHUB       PAPERS
          │            │            │
      DEPENDENCY    COMMITS      CONCEPTS
```

The user should be able to navigate their project by exploring these
relationships.

------------------------------------------------------------------------

# 5. Homepage --- Core Experience

The homepage should **not** be a conventional SaaS dashboard.

Do not start with:

``` text
Statistics
Statistics
Statistics
Statistics
```

Instead, the homepage should immediately communicate:

> **"This is an engineering command center."**

The graph is the visual hero.

The recommended homepage structure:

``` text
╭────────────────────────────────────────────────────────────╮
│ NEXUS     Projects / NEXUS                    ⌘K    ● OM   │
├────┬───────────────────────────────────────────────┬───────┤
│    │                                               │       │
│ ◉  │                  · · · · ·                   │PROJECT│
│    │             ·──────●──────·                  │       │
│ P  │          ·──●      NEXUS     ●──·             │ NEXUS │
│    │        ·      ·     │     ·      ·           │ 82%   │
│ T  │       ●       │     ●     │       ●          │       │
│    │       │       GitHub      │    Research      │ AI    │
│ K  │       ●          │        │       ●           │INSIGHT│
│    │        ·         ●        ●      ·           │       │
│ R  │          ·──────●────────●──────·             │ NEXT  │
│    │                                               │ACTION │
│    │                                               │       │
│    │       ┌──────────────────────────────┐        │       │
│    │       │ Ask NEXUS about this project │  →     │       │
│    │       └──────────────────────────────┘        │       │
╰────┴───────────────────────────────────────────────┴───────╯
```

## Homepage regions

### Left

Compact navigation rail.

### Center

Large interactive Project Intelligence Graph.

### Right

Contextual Intelligence Panel.

### Bottom center

Floating AI Command Bar.

### Top

Minimal command/navigation bar.

The graph should remain visually dominant.

------------------------------------------------------------------------

# 6. Global Application Shell

Create a persistent application shell.

## Left navigation

Minimal vertical navigation rail.

Top:

-   NEXUS logo

Navigation:

-   Overview
-   Projects
-   Tasks
-   Knowledge
-   Research
-   Repositories
-   Milestones
-   Analytics

Workspace section:

-   active projects

Utility:

-   Command Center
-   AI Agents
-   Activity
-   Settings

The sidebar must be collapsible.

Collapsed:

-   icons only

Expanded:

-   icons + labels

Use smooth width transitions.

The sidebar should never visually overpower the graph.

------------------------------------------------------------------------

# 7. Top Command Bar

Create a floating top command/navigation bar.

Example:

``` text
[NEXUS]   [Project: Satellite Road Extraction]   [⌘ K Search...]

                                      AI READY     ◉ OM
```

Elements:

-   NEXUS logo
-   project/workspace selector
-   global search
-   command palette
-   notifications
-   AI status
-   user avatar

Use:

-   translucent surface
-   subtle border
-   minimal shadow
-   low visual weight

------------------------------------------------------------------------

# 8. Project Intelligence Graph

This is the signature NEXUS feature.

The center of the graph is the active project.

Example:

``` text
                    Research
                       ●
                      /
              ●──────●
           Tasks     │
                     │
GitHub ●────────── PROJECT ──────────● Milestone
                     │
                     │
                 Architecture
                     ●
```

Center node example:

**Satellite Road Extraction**

Around it:

-   Goals
-   Milestones
-   Repository
-   Tasks
-   Documents
-   Research
-   Architecture
-   Issues
-   Datasets
-   Deployment
-   Portfolio

------------------------------------------------------------------------

# 9. Graph Visual Language

Nodes should appear as:

-   small glowing circles
-   compact glass capsules
-   larger nodes for important entities

Connections:

-   thin
-   semi-transparent
-   subtly glowing
-   minimally animated

Do not use excessive particles.

The graph should feel like a **living technical system**, not a sci-fi
screensaver.

## Node emphasis

When a node is selected:

-   selected node gets a soft halo
-   related paths brighten
-   related nodes become emphasized
-   unrelated nodes dim
-   right panel changes context
-   graph smoothly focuses on the selected node

------------------------------------------------------------------------

# 10. Graph Interactions

Support:

-   pan
-   zoom
-   node selection
-   node hover
-   drag nodes
-   double-click to expand
-   collapse branches
-   focus mode
-   reset view
-   node search
-   entity filters
-   layer visibility

Floating graph controls:

``` text
+
−

Fit

Focus

Filters

Layers

Search
```

Controls should sit lightly over the canvas.

------------------------------------------------------------------------

# 11. Semantic Graph Behavior

The graph must actually represent data relationships.

Example:

If the user selects:

**Recommendation Engine**

show:

``` text
RECOMMENDATION ENGINE

Status:
In Development

Progress:
68%

Technology:
Python
FastAPI
Embeddings
PostgreSQL

Dependencies:
Job ingestion
User profile
Vector search

Related Tasks:
4

Open Issues:
1

Latest Activity:
Recommendation ranking updated 3h ago

[Open Module]
```

Selecting another node changes the contextual panel.

The graph and the right panel should always feel connected.

------------------------------------------------------------------------

# 12. Right Intelligence Panel

The right panel is contextual.

Do not permanently display a large AI chat interface.

The panel should adapt to what the user is inspecting.

Examples:

-   Project → Project Intelligence
-   Repository → Repository Intelligence
-   Task → Task Intelligence
-   Research paper → Research Insight
-   Architecture node → Architecture Insight
-   Milestone → Milestone Health

------------------------------------------------------------------------

# 13. Project Intelligence Panel

Example:

``` text
PROJECT

Satellite Road Extraction

Status
● Development

Progress
78%

Health
Good

────────────────────────

AI INSIGHT

The graph extraction pipeline is progressing well,
but testing is significantly behind implementation.

2 milestones are approaching.

────────────────────────

NEXT ACTION

Complete edge generation validation.

[Open Task]

────────────────────────

RELATED

18 tasks
12 commits
4 documents
3 research papers
```

Do not fabricate analytics when real data is unavailable.

Use mock data only during development.

------------------------------------------------------------------------

# 14. AI Insight System

AI insights should appear as concise contextual intelligence.

Examples:

### AI INSIGHT

> Your implementation has progressed faster than your documentation.

### POTENTIAL BLOCKER

> Task #42 depends on dataset validation.

### PROJECT PATTERN

> Most recent commits are concentrated in the backend. Frontend progress
> has slowed.

### DOCUMENTATION GAP

> Implementation has advanced significantly faster than project
> documentation.

These should feel like observations from an intelligent system, not
generic AI text.

------------------------------------------------------------------------

# 15. AI Command Center

At the bottom of the main workspace, create a floating command bar.

Example:

``` text
┌────────────────────────────────────────────────────┐
│ Ask NEXUS about this project...               →   │
└────────────────────────────────────────────────────┘
```

Context chips may appear above it:

``` text
Project
Repository
+3 sources
```

Users can ask:

-   What should I work on today?
-   Why is this milestone delayed?
-   Explain this repository.
-   Find potential blockers.
-   Summarize today's progress.
-   Generate documentation.
-   Analyze this architecture.
-   Prepare me for my viva.
-   What changed since yesterday?
-   What dependencies are currently blocking progress?

------------------------------------------------------------------------

# 16. AI Response Design

Do not turn NEXUS into a standard ChatGPT clone.

AI responses should appear as contextual intelligence cards.

Example:

``` text
NEXUS ANALYSIS

Your current bottleneck is testing.

3 implementation tasks were completed in the
last 48 hours, but only 1 test case was added.

Recommended next action:

→ Validate graph extraction against dataset B.

[Open Task]

[Show Evidence]
```

AI responses should preserve context and evidence.

------------------------------------------------------------------------

# 17. Project Detail Page

Opening a project should transition into a deeper workspace.

Header:

-   project name
-   description
-   status
-   progress
-   repository
-   last updated
-   actions

Navigation:

-   Overview
-   Tasks
-   Roadmap
-   Repository
-   Knowledge
-   Research
-   Architecture
-   Testing
-   Activity
-   Portfolio

Maintain the immersive visual language.

Do not turn this into a generic CRUD application.

------------------------------------------------------------------------

# 18. Project Overview

Include:

-   project identity
-   progress
-   project health
-   milestones
-   current focus
-   AI insights
-   recent activity
-   graph

Use floating sections and visual hierarchy instead of excessive
rectangular cards.

------------------------------------------------------------------------

# 19. Task Management

Support statuses:

-   Backlog
-   Todo
-   In Progress
-   Review
-   Done
-   Blocked

Task object:

``` text
Title
Description
Priority
Status
Assignee
Due Date
Dependencies
Project
Milestone
GitHub Issue
AI Context
```

Example:

``` text
IMPLEMENT EDGE EXTRACTION

IN PROGRESS

Milestone:
Graph Construction

Dependencies:
Skeleton cleanup

Estimated:
2h 30m

AI:
"Likely next action."
```

------------------------------------------------------------------------

# 20. AI Task Planning

User can enter:

> Break this project into tasks.

NEXUS generates:

``` text
Phase 1 — Research

Phase 2 — Architecture

Phase 3 — Implementation

Phase 4 — Testing

Phase 5 — Deployment

Phase 6 — Documentation
```

Each phase contains:

-   milestones
-   tasks
-   dependencies

AI-generated plans must be editable.

Important changes require user review.

------------------------------------------------------------------------

# 21. Roadmap

Create a visual project timeline.

Example:

``` text
Q4

Research
████████

Architecture
    ███████

Development
       █████████████

Testing
              ███████

Deployment
                     ████
```

Milestones should be interactive.

Clicking a milestone opens its contextual panel.

------------------------------------------------------------------------

# 22. GitHub Integration

NEXUS should support GitHub integration.

Repository page:

-   repository name
-   branch
-   latest commit
-   open PRs
-   open issues
-   contributors
-   activity
-   architecture map
-   AI analysis

Example:

``` text
REPOSITORY HEALTH

Code
████████░░ 82%

Documentation
██████░░░░ 61%

Testing
█████░░░░░ 48%

Activity
High

AI:
"Testing coverage is currently lagging behind implementation."
```

------------------------------------------------------------------------

# 23. Codebase Intelligence

Once connected to GitHub, NEXUS should understand:

-   repository structure
-   files
-   modules
-   dependencies
-   commits
-   issues
-   PRs
-   architecture
-   documentation

Users can ask:

-   Explain this codebase.
-   Where is authentication handled?
-   What modules depend on the recommendation engine?
-   What changed this week?
-   Find potentially duplicated logic.
-   Which areas are most fragile?

Answers should use actual repository context.

------------------------------------------------------------------------

# 24. Knowledge Hub

Create a knowledge workspace.

Supported inputs:

-   PDFs
-   research papers
-   documentation
-   specifications
-   notes
-   Markdown
-   text files

Knowledge sections:

-   Documents
-   Research
-   Decisions
-   Notes
-   References
-   AI summaries

------------------------------------------------------------------------

# 25. Project Memory

Every project gets persistent memory.

Store:

-   architecture decisions
-   technology decisions
-   requirements
-   constraints
-   research conclusions
-   known problems
-   important discussions
-   design decisions

Example:

``` text
DECISION

PostgreSQL selected.

Reason:
Relational project data and strong querying requirements.

Date:
Oct 2, 2026
```

Users can ask:

> Why did we choose PostgreSQL?

NEXUS should answer from Project Memory.

------------------------------------------------------------------------

# 26. Research Mode

Research workspace should support papers and technical documents.

Extract:

-   title
-   authors
-   methodology
-   dataset
-   approach
-   results
-   limitations
-   relevant concepts

Generate:

-   research map
-   concept relationships
-   literature connections
-   potential research gaps

Use the same graph language.

------------------------------------------------------------------------

# 27. Architecture Visualizer

Allow users to build technical architecture visually.

Example:

``` text
Frontend
    ↓
API
    ↓
Backend
    ↓
Database

AI Service
    ↓
LLM
    ↓
Vector Database
```

Nodes should be draggable.

Edges should be editable.

Allow AI to generate an architecture from a description.

Example:

> Generate an architecture for a Next.js SaaS with Supabase and an AI
> recommendation engine.

The result should be editable.

------------------------------------------------------------------------

# 28. Project Health

Do not reduce the project to one meaningless score.

Show dimensions:

``` text
EXECUTION
████████░░

DOCUMENTATION
██████░░░░

TESTING
█████░░░░

CODE ACTIVITY
████████░░

MILESTONES
███████░░░

DEPENDENCIES
██████░░░░
```

Then explain important gaps.

Example:

> Implementation has advanced significantly faster than project
> documentation.

------------------------------------------------------------------------

# 29. Activity Stream

Create a unified project activity stream.

Example:

``` text
3h ago
GitHub commit pushed

2h ago
Task completed

1h ago
Research document added

45m ago
AI generated architecture analysis

20m ago
Milestone updated
```

Related activities should be visually connected.

------------------------------------------------------------------------

# 30. Final Year Project Mode

NEXUS should have a dedicated Final Year Project workflow.

Project types:

-   Personal Project
-   Hackathon
-   Research
-   Startup
-   Final Year Project

When Final Year Project is selected, enable:

``` text
Problem Statement
Objectives
Literature Survey
Requirements
Methodology
System Architecture
Implementation
Testing
Results
Discussion
Conclusion
Future Scope
References
Final Report
Presentation
Viva Preparation
```

Track completion of every section.

------------------------------------------------------------------------

# 31. FYP AI Assistant

Example:

``` text
FINAL YEAR PROJECT STATUS

Problem Statement
✓ Complete

Objectives
✓ Complete

Literature Survey
✓ Complete

Methodology
◐ Needs revision

Testing
⚠ Missing

Results
⚠ Missing

References
✓ Complete
```

The AI should identify gaps but must not fabricate academic work.

------------------------------------------------------------------------

# 32. Viva Mode

NEXUS should read the project's actual context and generate:

-   basic questions
-   technical questions
-   architecture questions
-   implementation questions
-   research questions
-   defense questions
-   limitations questions
-   future-scope questions

Example:

``` text
QUESTION

Why did you choose PostgreSQL?

Your Answer:
...

NEXUS FEEDBACK

What was correct:
...

What was missing:
...

Improve:
...

Possible follow-up:
...
```

------------------------------------------------------------------------

# 33. Documentation Generator

Generate:

-   README
-   SRS
-   technical specification
-   architecture documentation
-   API documentation
-   testing report
-   research methodology
-   final-year project report
-   presentation outline
-   viva preparation
-   portfolio case study
-   resume bullets
-   LinkedIn project post

All generated content should be based on actual project information.

Never fabricate implementation details.

------------------------------------------------------------------------

# 34. Portfolio Mode

When a project is complete:

``` text
PROJECT COMPLETE 🎉

Generate:

[GitHub README]

[Portfolio Case Study]

[Resume Bullets]

[LinkedIn Post]

[Project Presentation]

[Demo Landing Page]

[Technical Report]
```

Everything should be editable before export.

------------------------------------------------------------------------

# 35. Personal Engineering Dashboard

The user's global homepage should eventually show:

``` text
Good evening.

6 active projects.

3 tasks requiring attention.

2 blocked dependencies.

1 upcoming milestone.
```

Then show the global engineering graph.

Projects may include:

-   FYP
-   Hackathon
-   NEXUS
-   personal projects
-   research

Selecting a project transitions into its graph.

------------------------------------------------------------------------

# 36. Global Knowledge Graph

Long-term NEXUS should represent the user's engineering universe.

Example:

``` text
                           OM
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
       PROJECTS        TECHNOLOGIES       RESEARCH
          │                 │                 │
     ┌────┼────┐      ┌─────┼─────┐           │
   NEXUS  FYP  Hack   Next.js  Python        Papers
                         │
                    PostgreSQL
```

This can eventually connect:

-   projects
-   skills
-   technologies
-   research
-   repositories
-   portfolio artifacts

The user's engineering identity becomes a living knowledge graph.

------------------------------------------------------------------------

# 37. Search

Global search should feel like Raycast.

Shortcut:

**⌘ K / Ctrl K**

Search:

-   projects
-   tasks
-   repositories
-   documents
-   research
-   people
-   technologies
-   issues
-   decisions

Support keyboard navigation.

------------------------------------------------------------------------

# 38. Command Palette

Commands:

``` text
Create project
Create task
Search
Open repository
Ask NEXUS
Generate documentation
Analyze project
Add research
Open roadmap
Start viva
Generate portfolio
Settings
```

------------------------------------------------------------------------

# 39. AI Agents

Eventually support specialized agents:

-   Project Analyst
-   Research Analyst
-   Codebase Analyst
-   Documentation Agent
-   Testing Agent
-   Architecture Agent
-   Portfolio Agent
-   Viva Coach

They should not appear as separate chatbot products.

They should behave like specialized engineering tools.

------------------------------------------------------------------------

# 40. Agent Execution UI

Example:

``` text
CODEBASE ANALYST

✓ Read repository structure
✓ Inspected 42 files
✓ Analyzed dependencies
✓ Compared recent commits

Analysis ready.

[View Analysis]
```

The user should understand what the agent actually did.

------------------------------------------------------------------------

# 41. Motion & Micro-Interactions

Use polished, restrained motion.

Examples:

-   graph nodes gently pulse
-   connections animate on selection
-   panels fade/slide into view
-   hover creates subtle illumination
-   progress bars animate on initial load
-   command palette opens instantly
-   selected graph nodes create a soft halo
-   page transitions are smooth
-   graph focus uses spring-like movement

Avoid:

-   constant animation
-   excessive particles
-   giant spinning objects
-   aggressive parallax
-   distracting effects

------------------------------------------------------------------------

# 42. Glassmorphism Rules

Use glass selectively.

Suggested surface:

``` css
background: rgba(10, 20, 22, 0.72);
backdrop-filter: blur(...);
border: 1px solid rgba(...);
```

Do not make every component glass.

The graph/canvas must remain the visual hero.

------------------------------------------------------------------------

# 43. Responsive Design

Desktop is the primary experience.

Tablet:

-   collapse navigation
-   preserve graph workspace
-   adapt intelligence panel

Mobile:

-   simplify graph
-   introduce focus mode
-   use bottom navigation
-   stack contextual panels
-   preserve premium visual language

------------------------------------------------------------------------

# 44. Accessibility

Support:

-   keyboard navigation
-   focus states
-   ARIA labels
-   screen-reader-friendly controls
-   sufficient contrast
-   reduced-motion mode

Do not sacrifice accessibility for aesthetics.

------------------------------------------------------------------------

# 45. Technology Stack

Recommended stack:

## Frontend

-   Next.js latest stable
-   React
-   TypeScript
-   Tailwind CSS
-   shadcn/ui
-   Framer Motion
-   Lucide Icons

## Visualization

-   React Flow for architecture diagrams
-   D3 and/or Cytoscape for knowledge/project graphs

Use the simplest technology that can deliver the required interaction
and performance.

## Backend

-   Next.js server actions/API routes initially
-   Node.js services where appropriate
-   Python/FastAPI for specialized AI/data processing if required

## Database

-   Supabase
-   PostgreSQL
-   pgvector

## Authentication

-   Supabase Auth

## Storage

-   Supabase Storage

## Integrations

-   GitHub OAuth/API

## Deployment

-   Vercel

## AI

Use an AI provider abstraction layer.

Do not tightly couple the application to a single model provider.

------------------------------------------------------------------------

# 46. Database Schema

Core tables:

``` text
users

workspaces

projects

project_members

tasks

milestones

repositories

commits

issues

pull_requests

documents

research_documents

knowledge_chunks

project_memory

architecture_nodes

architecture_edges

project_dependencies

activity_events

ai_conversations

ai_runs

agents

generated_artifacts

viva_questions

portfolio_content
```

Use:

-   foreign keys
-   timestamps
-   indexes
-   project-level isolation
-   appropriate constraints

Use vector embeddings where required.

------------------------------------------------------------------------

# 47. AI Architecture

Conceptually:

``` text
User
  ↓
NEXUS AI Gateway
  ↓
Context Builder
  ↓
Project Memory
  ↓
Retriever
  ↓
GitHub / Documents / Tasks / Research
  ↓
LLM
  ↓
Structured Response
  ↓
NEXUS UI
```

The AI should never blindly receive the entire database.

Build contextual retrieval.

------------------------------------------------------------------------

# 48. RAG

Use:

-   document chunking
-   embeddings
-   pgvector
-   metadata filtering
-   project-level isolation
-   semantic retrieval
-   hybrid retrieval where appropriate
-   source provenance

When AI makes a claim based on project information, provide:

**Show Evidence**

Users should be able to inspect the source.

------------------------------------------------------------------------

# 49. AI Trust Model

The AI should distinguish between:

``` text
Known
Inferred
Suggested
Unknown
```

Never:

-   pretend to inspect a repository when it did not
-   fabricate project metrics
-   fabricate commits
-   fabricate research findings
-   silently modify important data

Destructive or externally visible actions require confirmation.

------------------------------------------------------------------------

# 50. GitHub Sync

Support:

-   Connect GitHub
-   Select repository
-   Sync commits
-   Sync issues
-   Sync pull requests
-   Sync branches
-   Sync releases
-   View activity
-   AI analysis
-   Architecture discovery

Eventually:

-   create issue
-   create branch
-   create PR

External actions must require user confirmation.

------------------------------------------------------------------------

# 51. Demo Data

Until integrations exist, use realistic mock data.

Suggested demo project:

**Satellite Road Extraction**

or:

**Orbit --- AI Research Intelligence**

Populate:

-   projects
-   tasks
-   milestones
-   commits
-   research
-   documents
-   architecture
-   AI insights
-   activity

The first-run experience should never look empty.

------------------------------------------------------------------------

# 52. Empty States

Example:

``` text
NO PROJECTS YET

Your engineering workspace is empty.

[Create Your First Project]

AI suggestion:
Start with an existing GitHub repository.
```

Empty states should still feel polished.

------------------------------------------------------------------------

# 53. Loading States

Do not use generic spinners everywhere.

Use:

-   skeletons
-   subtle graph placeholders
-   soft glow
-   progressive rendering

Example:

``` text
Mapping project context...
```

------------------------------------------------------------------------

# 54. Error States

Example:

``` text
GITHUB SYNC FAILED

GitHub returned an authorization error.

[Reconnect GitHub]
```

Do not expose raw stack traces to normal users.

------------------------------------------------------------------------

# 55. Design System

Use an 8px spacing system.

Corner radius:

-   mostly 8--14px
-   avoid huge rounded containers

Use:

-   thin borders
-   subtle shadows
-   high information density
-   strong typography
-   clean icons
-   minimal decoration

------------------------------------------------------------------------

# 56. Color Philosophy

Suggested palette:

``` text
Background:
#050809
#071012
#0A1113

Surface:
#0C1517
#101B1E
#122124

Primary:
Soft white

Secondary:
Muted blue-gray

Accent:
Cyan / teal

Secondary accent:
Violet

Highlight:
Subtle amber

Error:
Muted red

Success:
Teal / green
```

Glow should be restrained.

The interface must not look like a neon gaming UI.

------------------------------------------------------------------------

# 57. Interaction Philosophy

Every visible element must have purpose.

If a glow exists, it should communicate:

-   active
-   selected
-   connected
-   processing
-   AI
-   important

Nothing should glow purely because it looks cool.

Users should be able to:

-   click
-   drag
-   search
-   filter
-   edit
-   create
-   navigate
-   inspect
-   organize

without requiring AI.

AI enhances the workflow.

It does not replace normal product interaction.

------------------------------------------------------------------------

# 58. Performance

The graph may contain many nodes.

Optimize:

-   graph rendering
-   virtualization
-   memoization
-   graph calculations
-   animation
-   database queries
-   AI requests

Do not render thousands of unnecessary DOM elements.

------------------------------------------------------------------------

# 59. Suggested Codebase Structure

``` text
app/
  dashboard/
  projects/
  tasks/
  knowledge/
  research/
  repositories/
  architecture/
  portfolio/
  viva/
  settings/

components/
  graph/
  dashboard/
  projects/
  tasks/
  ai/
  github/
  knowledge/
  architecture/
  ui/

lib/
  ai/
  github/
  supabase/
  rag/
  graph/
  analytics/

types/

hooks/

services/
```

Keep architecture modular.

------------------------------------------------------------------------

# 60. Development Roadmap

## Phase 1 --- Visual Foundation

Build:

-   application shell
-   sidebar
-   top command bar
-   immersive graph
-   right intelligence panel
-   AI command bar
-   project overview
-   project navigation
-   responsive layout

Use mock data.

Focus heavily on visual quality.

------------------------------------------------------------------------

## Phase 2 --- Core Project System

Build:

-   projects
-   tasks
-   milestones
-   roadmap
-   project memory
-   activity

------------------------------------------------------------------------

## Phase 3 --- Backend

Build:

-   Supabase
-   authentication
-   database
-   persistence

------------------------------------------------------------------------

## Phase 4 --- GitHub Intelligence

Build:

-   GitHub integration
-   repository sync
-   commits
-   issues
-   PRs
-   repository analysis

------------------------------------------------------------------------

## Phase 5 --- Knowledge & RAG

Build:

-   document ingestion
-   embeddings
-   pgvector
-   retrieval
-   project memory
-   source evidence

------------------------------------------------------------------------

## Phase 6 --- AI Intelligence

Build:

-   AI project planning
-   AI insights
-   AI agents
-   architecture analysis
-   codebase analysis

------------------------------------------------------------------------

## Phase 7 --- Student Superpowers

Build:

-   FYP mode
-   Viva mode
-   documentation generation
-   portfolio generation
-   resume generation

------------------------------------------------------------------------

# 61. First-Launch Experience

When the user opens NEXUS, the experience should immediately
communicate:

> **This is an engineering command center.**

The user should see:

``` text
Good evening.

6 active projects.

3 tasks requiring attention.

2 blocked dependencies.

1 upcoming milestone.
```

Then the engineering graph.

The graph should feel alive but controlled.

The right panel should provide useful context.

The AI command bar should invite interaction without dominating the
screen.

------------------------------------------------------------------------

# 62. Example First Project

Use:

**Satellite Road Extraction**

Example graph:

``` text
                           Research
                              ●
                             /
                            /
                     ●─────●
                   Tasks    │
                            │
                 ●──────── PROJECT ────────●
               GitHub       │             Milestone
                            │
                            ●
                       Architecture
                            │
                            ●
                         Testing
```

Right panel:

``` text
PROJECT INTELLIGENCE

Satellite Road Extraction

● Development

Progress
78%

AI INSIGHT

The graph extraction pipeline is progressing well,
but testing is significantly behind implementation.

NEXT ACTION

Complete edge generation validation.

[Open Task]

RELATED

18 Tasks
12 Commits
4 Documents
3 Research Papers
```

Bottom:

``` text
┌────────────────────────────────────────────────────┐
│ Ask NEXUS about this project...               →   │
└────────────────────────────────────────────────────┘
```

------------------------------------------------------------------------

# 63. Long-Term Product

NEXUS eventually becomes:

``` text
                         NEXUS
                           │
            ┌──────────────┼──────────────┐
            │              │              │
         PROJECTS       KNOWLEDGE       CAREER
            │              │              │
       ┌────┴────┐       Papers         Resume
       │         │       Notes           Portfolio
     GitHub     Tasks     Docs            Skills
       │         │
     Commits   Milestones
```

It becomes the engineer's persistent operating layer.

------------------------------------------------------------------------

# 64. The Core Differentiator

The defining experience should be:

> **The project graph + contextual intelligence.**

Not:

> "We have an AI chatbot."

Not:

> "We have a Kanban board."

Not:

> "We have a dashboard."

The product story is:

> **NEXUS understands how your engineering work is connected.**

If a task changes:

-   milestone status can change
-   dependencies can change
-   project health can change
-   AI insight can change
-   documentation gaps can change

If a GitHub commit happens:

-   activity updates
-   repository context updates
-   project graph updates
-   AI can summarize the change

If a research paper is uploaded:

-   knowledge graph expands
-   research context updates
-   related project components become discoverable

This connectedness is what makes NEXUS special.

------------------------------------------------------------------------

# 65. Quality Bar

Do not settle for a generic SaaS dashboard.

Every screen should feel intentionally designed.

The product should feel like:

> **Linear meets an AI research laboratory meets a developer command
> center.**

But maintain a distinct NEXUS identity.

The final interface should be portfolio-grade.

It should look credible enough to be presented as a serious
startup/product.

------------------------------------------------------------------------

# 66. Most Important Requirement

**Build the experience, not just the components.**

The:

-   graph
-   projects
-   tasks
-   repository
-   AI intelligence
-   research
-   knowledge
-   architecture
-   milestones
-   documentation
-   portfolio

must all feel like parts of the same system.

NEXUS should feel alive.

It should feel like it understands the user's engineering work.

It should feel like a control center.

It should feel like a product someone would actually want to use every
day.

------------------------------------------------------------------------

# 67. Final Product Statement

NEXUS is:

> **An AI-native engineering command center that turns projects, code,
> research, tasks, architecture, documentation, and career outputs into
> one connected workspace.**

The ultimate goal:

``` text
IDEA
  ↓
PLAN
  ↓
RESEARCH
  ↓
ARCHITECT
  ↓
BUILD
  ↓
TEST
  ↓
DOCUMENT
  ↓
DEPLOY
  ↓
PRESENT
  ↓
PORTFOLIO
```

NEXUS should help the engineer through the entire lifecycle.

**Plan. Build. Understand. Ship.**
