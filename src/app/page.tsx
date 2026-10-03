'use client';

import React, { useState, useEffect } from 'react';
import { 
  Project, 
  GraphNode, 
  GraphEdge,
  ProjectBundle,
  TaskStatus 
} from '@/types';
import { 
  mockProjects, 
  mockGraphNodes, 
  mockGraphEdges, 
  mockTasks, 
  mockMilestones, 
  mockRepository, 
  mockCommits, 
  mockPullRequests, 
  mockProjectMemory, 
  mockResearchPapers, 
  mockArchitectureNodes, 
  mockArchitectureEdges, 
  mockFYPSections, 
  mockVivaQuestions, 
  mockAIInsights, 
  mockActivityEvents, 
  mockAIAgents,
  mockTestCases,
  mockBenchmarks,
  mockGlobalNodes,
  mockGlobalEdges
} from '@/lib/mockData';

import Sidebar, { NavView } from '@/components/layout/Sidebar';
import TopCommandBar from '@/components/layout/TopCommandBar';
import ProjectWorkspaceHeader from '@/components/layout/ProjectWorkspaceHeader';
import ProjectGraph from '@/components/graph/ProjectGraph';
import RightIntelligencePanel from '@/components/intelligence/RightIntelligencePanel';
import AICommandBar from '@/components/ai/AICommandBar';
import CommandPalette from '@/components/command/CommandPalette';
import UploadProjectModal from '@/components/modals/UploadProjectModal';
import EmptyWorkspaceView from '@/components/views/EmptyWorkspaceView';

import ProjectsView from '@/components/views/ProjectsView';
import TasksView from '@/components/views/TasksView';
import RoadmapView from '@/components/views/RoadmapView';
import RepositoriesView from '@/components/views/RepositoriesView';
import KnowledgeView from '@/components/views/KnowledgeView';
import ResearchView from '@/components/views/ResearchView';
import ArchitectureView from '@/components/views/ArchitectureView';
import TestingView from '@/components/views/TestingView';
import FYPView from '@/components/views/FYPView';
import VivaView from '@/components/views/VivaView';
import PortfolioView from '@/components/views/PortfolioView';
import AgentsView from '@/components/views/AgentsView';
import ActivityView from '@/components/views/ActivityView';
import AnalyticsView from '@/components/views/AnalyticsView';
import SettingsView from '@/components/views/SettingsView';
import UniverseView from '@/components/views/UniverseView';

import { Sparkles, AlertTriangle, CheckCircle2, ChevronRight, X, FolderUp } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'nexus_user_projects_v2';

export default function NexusHome() {
  const [activeView, setActiveView] = useState<NavView>('overview');
  const [projectBundles, setProjectBundles] = useState<ProjectBundle[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [showStatusGreeting, setShowStatusGreeting] = useState(true);
  const [isLoadedFromStorage, setIsLoadedFromStorage] = useState(false);

  // Load user projects from localStorage on mount (No mock data loaded by default!)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed: ProjectBundle[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjectBundles(parsed);
          setActiveProjectId(parsed[0].project.id);
        }
      }
    } catch (e) {
      console.warn('Could not read projects from localStorage', e);
    } finally {
      setIsLoadedFromStorage(true);
    }
  }, []);

  // Save projects to localStorage whenever updated
  const saveProjectsToStorage = (bundles: ProjectBundle[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bundles));
    } catch (e) {
      console.warn('Could not save projects to localStorage', e);
    }
  };

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handler: Ingest a newly uploaded local project
  const handleProjectIngested = (newBundle: ProjectBundle) => {
    setProjectBundles(prev => {
      // If already exists with same id or slug, update it
      const filtered = prev.filter(b => b.project.id !== newBundle.project.id && b.project.slug !== newBundle.project.slug);
      const updated = [newBundle, ...filtered];
      saveProjectsToStorage(updated);
      return updated;
    });
    setActiveProjectId(newBundle.project.id);
    setActiveView('overview');
    setSelectedNode(null);
  };

  // Handler: Optional sample project loader (on demand only)
  const handleLoadSampleProject = () => {
    const sampleBundle: ProjectBundle = {
      project: mockProjects[0],
      graphNodes: mockGraphNodes,
      graphEdges: mockGraphEdges,
      tasks: mockTasks,
      milestones: mockMilestones,
      repository: mockRepository,
      commits: mockCommits,
      pullRequests: mockPullRequests,
      projectMemory: mockProjectMemory,
      researchPapers: mockResearchPapers,
      architectureNodes: mockArchitectureNodes,
      architectureEdges: mockArchitectureEdges,
      fypSections: mockFYPSections,
      vivaQuestions: mockVivaQuestions,
      aiInsights: mockAIInsights,
      activityEvents: mockActivityEvents,
      testCases: mockTestCases,
      benchmarks: mockBenchmarks
    };
    handleProjectIngested(sampleBundle);
  };

  // Extract active bundle
  const activeBundle = projectBundles.find(b => b.project.id === activeProjectId) || projectBundles[0] || null;
  const activeProject = activeBundle ? activeBundle.project : null;
  const projectsList = projectBundles.map(b => b.project);

  // Global nodes & edges for Universe view
  const currentGlobalNodes: GraphNode[] = projectBundles.length > 0
    ? projectBundles.map((b, idx) => ({
        id: `global-${b.project.id}`,
        label: b.project.name,
        subtitle: `${b.project.progress}% Complete`,
        type: 'project',
        category: 'core',
        x: Math.round(Math.cos((idx / projectBundles.length) * Math.PI * 2) * 260),
        y: Math.round(Math.sin((idx / projectBundles.length) * Math.PI * 2) * 260),
        progress: b.project.progress,
        status: b.project.status,
        techStack: b.project.tags
      }))
    : [];

  const currentGlobalEdges: GraphEdge[] = projectBundles.length > 1
    ? projectBundles.slice(1).map((b, i) => ({
        id: `global-edge-${i}`,
        source: `global-${projectBundles[0].project.id}`,
        target: `global-${b.project.id}`,
        label: 'shares engineering core',
        type: 'dependency' as const
      }))
    : [];

  // Determine if active view belongs to an open project workspace
  const isProjectWorkspace = [
    'overview',
    'tasks',
    'roadmap',
    'repositories',
    'architecture',
    'knowledge',
    'research',
    'testing',
    'fyp',
    'viva',
    'portfolio',
    'analytics'
  ].includes(activeView);

  // If still checking initial client storage, render sleek loader shell
  if (!isLoadedFromStorage) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#050809] text-cyan-400 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>INITIALIZING NEXUS WORKSPACE...</span>
        </div>
      </div>
    );
  }

  // EMPTY STATE: If no projects uploaded yet, show EmptyWorkspaceView
  if (projectBundles.length === 0) {
    return (
      <div className="flex h-screen w-screen overflow-hidden bg-[#050809] text-[#F3F4F6]">
        {/* Simplified Sidebar */}
        <Sidebar
          activeView={activeView}
          onSelectView={setActiveView}
          activeProject={null}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          onOpenUploadModal={() => setIsUploadModalOpen(true)}
        />

        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          <TopCommandBar
            projects={[]}
            activeProject={null}
            onSelectProject={() => {}}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
          />

          <div className="flex-1 relative overflow-hidden flex">
            <EmptyWorkspaceView
              onProjectIngested={handleProjectIngested}
              onOpenUploadModal={() => setIsUploadModalOpen(true)}
              onLoadSampleProject={handleLoadSampleProject}
            />
          </div>
        </div>

        {/* Upload Modal */}
        <UploadProjectModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onProjectIngested={handleProjectIngested}
        />

        {/* Command Palette */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          projects={[]}
          tasks={[]}
          onNavigateToView={(view) => setActiveView(view as NavView)}
          onSelectProject={() => {}}
          onOpenUploadModal={() => setIsUploadModalOpen(true)}
        />
      </div>
    );
  }

  // ACTIVE WORKSPACE WITH UPLOADED USER PROJECT
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#050809] text-[#F3F4F6]">
      {/* Left Application Shell: Navigation Rail */}
      <Sidebar
        activeView={activeView}
        onSelectView={(view) => {
          setActiveView(view);
          if (view !== 'overview') setSelectedNode(null);
        }}
        activeProject={activeProject}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Command Bar */}
        <TopCommandBar
          projects={projectsList}
          activeProject={activeProject}
          onSelectProject={(proj) => {
            setActiveProjectId(proj.id);
            setSelectedNode(null);
          }}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenUploadModal={() => setIsUploadModalOpen(true)}
        />

        {/* Project Detail Header & Tabs */}
        {isProjectWorkspace && activeProject && (
          <ProjectWorkspaceHeader
            project={activeProject}
            activeView={activeView}
            onSelectView={(view) => {
              setActiveView(view);
              if (view !== 'overview') setSelectedNode(null);
            }}
          />
        )}

        {/* View Switcher Container */}
        <div className="flex-1 relative overflow-hidden flex">
          {/* Main Content Area */}
          <div className="flex-1 relative overflow-hidden flex flex-col">
            {activeView === 'overview' && activeBundle && (
              <div className="relative w-full h-full flex flex-col overflow-hidden">
                {/* First-Launch Status Greeting Banner */}
                {showStatusGreeting && (
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs shadow-2xl animate-in fade-in slide-in-from-top-2">
                    <span className="text-cyan-400 font-mono font-semibold">Active: {activeProject?.name}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-300 font-mono">{activeBundle.graphNodes.length} graph nodes</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-amber-400 font-mono">{activeBundle.tasks.filter(t => t.status === 'in_progress').length} active tasks</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-emerald-400 font-mono">{activeBundle.milestones.length} milestones</span>
                    <button
                      onClick={() => setShowStatusGreeting(false)}
                      className="ml-2 text-slate-500 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Hero Feature: Interactive Project Intelligence Graph */}
                <div className="flex-1 relative w-full h-full">
                  <ProjectGraph
                    nodes={activeBundle.graphNodes}
                    edges={activeBundle.graphEdges}
                    selectedNodeId={selectedNode?.id || null}
                    onSelectNode={(node) => setSelectedNode(node)}
                    onOpenDetails={(node) => {
                      if (node.category === 'tasks') setActiveView('tasks');
                      else if (node.category === 'code') setActiveView('repositories');
                      else if (node.category === 'research') setActiveView('research');
                      else if (node.category === 'architecture') setActiveView('architecture');
                    }}
                  />

                  {/* Floating AI Command Bar at Bottom */}
                  <AICommandBar
                    activeProject={activeProject}
                    onNavigateToView={(view) => setActiveView(view as NavView)}
                  />
                </div>
              </div>
            )}

            {activeView === 'projects' && (
              <div className="flex-1 overflow-y-auto">
                <ProjectsView
                  projects={projectsList}
                  activeProject={activeProject}
                  onSelectProject={(proj) => {
                    setActiveProjectId(proj.id);
                    setActiveView('overview');
                  }}
                  onNavigateToView={(view) => setActiveView(view as NavView)}
                  onOpenUploadModal={() => setIsUploadModalOpen(true)}
                />
              </div>
            )}

            {activeView === 'tasks' && activeBundle && (
              <div className="flex-1 overflow-y-auto">
                <TasksView tasks={activeBundle.tasks} />
              </div>
            )}

            {activeView === 'roadmap' && activeBundle && (
              <div className="flex-1 overflow-y-auto">
                <RoadmapView
                  milestones={activeBundle.milestones}
                  onNavigateToView={(view) => setActiveView(view as NavView)}
                />
              </div>
            )}

            {activeView === 'repositories' && activeBundle && (
              <div className="flex-1 overflow-y-auto">
                <RepositoriesView
                  repository={activeBundle.repository}
                  commits={activeBundle.commits}
                  pullRequests={activeBundle.pullRequests}
                />
              </div>
            )}

            {activeView === 'knowledge' && activeBundle && (
              <div className="flex-1 overflow-y-auto">
                <KnowledgeView
                  memoryItems={activeBundle.projectMemory}
                  papers={activeBundle.researchPapers}
                />
              </div>
            )}

            {activeView === 'research' && activeBundle && (
              <div className="flex-1 overflow-y-auto">
                <ResearchView papers={activeBundle.researchPapers} />
              </div>
            )}

            {activeView === 'architecture' && activeBundle && (
              <div className="flex-1 overflow-y-auto">
                <ArchitectureView
                  nodes={activeBundle.architectureNodes}
                  edges={activeBundle.architectureEdges}
                />
              </div>
            )}

            {activeView === 'testing' && activeBundle && (
              <div className="flex-1 overflow-y-auto">
                <TestingView
                  testCases={activeBundle.testCases}
                  benchmarks={activeBundle.benchmarks}
                  onNavigateToView={(view) => setActiveView(view as NavView)}
                />
              </div>
            )}

            {activeView === 'fyp' && activeBundle && (
              <div className="flex-1 overflow-y-auto">
                <FYPView
                  sections={activeBundle.fypSections}
                  onNavigateToView={(view) => setActiveView(view as NavView)}
                />
              </div>
            )}

            {activeView === 'viva' && activeBundle && (
              <div className="flex-1 overflow-y-auto">
                <VivaView questions={activeBundle.vivaQuestions} />
              </div>
            )}

            {activeView === 'portfolio' && (
              <div className="flex-1 overflow-y-auto">
                <PortfolioView project={activeProject} />
              </div>
            )}

            {activeView === 'universe' && (
              <div className="flex-1 overflow-hidden">
                <UniverseView
                  nodes={currentGlobalNodes}
                  edges={currentGlobalEdges}
                  projects={projectsList}
                  onSelectProject={(proj) => {
                    setActiveProjectId(proj.id);
                    setActiveView('overview');
                  }}
                  onNavigateToView={(view) => setActiveView(view as NavView)}
                />
              </div>
            )}

            {activeView === 'agents' && (
              <div className="flex-1 overflow-y-auto">
                <AgentsView
                  agents={mockAIAgents}
                  onNavigateToView={(view) => setActiveView(view as NavView)}
                />
              </div>
            )}

            {activeView === 'activity' && activeBundle && (
              <div className="flex-1 overflow-y-auto">
                <ActivityView events={activeBundle.activityEvents} />
              </div>
            )}

            {activeView === 'analytics' && (
              <div className="flex-1 overflow-y-auto">
                <AnalyticsView
                  project={activeProject}
                  onNavigateToView={(view) => setActiveView(view as NavView)}
                />
              </div>
            )}

            {activeView === 'settings' && (
              <div className="flex-1 overflow-y-auto">
                <SettingsView />
              </div>
            )}
          </div>

          {/* Right Contextual Intelligence Panel */}
          {activeView === 'overview' && activeBundle && (
            <RightIntelligencePanel
              activeProject={activeProject}
              selectedNode={selectedNode}
              insights={activeBundle.aiInsights}
              onClearSelection={() => setSelectedNode(null)}
              onNavigateToView={(view) => setActiveView(view as NavView)}
            />
          )}
        </div>
      </div>

      {/* Upload Local Project Modal */}
      <UploadProjectModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onProjectIngested={handleProjectIngested}
      />

      {/* Global Raycast Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        projects={projectsList}
        tasks={activeBundle ? activeBundle.tasks : []}
        onNavigateToView={(view) => setActiveView(view as NavView)}
        onSelectProject={(proj) => {
          setActiveProjectId(proj.id);
          setSelectedNode(null);
        }}
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
      />
    </div>
  );
}
