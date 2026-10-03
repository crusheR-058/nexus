'use client';

import React, { useState, useEffect } from 'react';
import { 
  Project, 
  GraphNode, 
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

import { Sparkles, AlertTriangle, CheckCircle2, ChevronRight, X } from 'lucide-react';

export default function NexusHome() {
  const [activeView, setActiveView] = useState<NavView>('overview');
  const [activeProject, setActiveProject] = useState<Project>(mockProjects[0]);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [showStatusGreeting, setShowStatusGreeting] = useState(true);

  // Global Keyboard shortcut listener for Cmd+K / Ctrl+K
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
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Command Bar */}
        <TopCommandBar
          projects={mockProjects}
          activeProject={activeProject}
          onSelectProject={(proj) => {
            setActiveProject(proj);
            setSelectedNode(null);
          }}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        {/* Project Detail Header & Tabs (Section 17) */}
        {isProjectWorkspace && (
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
            {activeView === 'overview' && (
              <div className="relative w-full h-full flex flex-col overflow-hidden">
                {/* First-Launch Status Greeting Banner (Section 61) */}
                {showStatusGreeting && (
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs shadow-2xl animate-in fade-in slide-in-from-top-2">
                    <span className="text-cyan-400 font-mono font-semibold">Good evening.</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-300 font-mono">6 active projects</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-amber-400 font-mono">3 tasks requiring attention</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-red-400 font-mono">2 blocked dependencies</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-emerald-400 font-mono">1 upcoming milestone</span>
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
                    nodes={mockGraphNodes}
                    edges={mockGraphEdges}
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
                  projects={mockProjects}
                  activeProject={activeProject}
                  onSelectProject={(proj) => {
                    setActiveProject(proj);
                    setActiveView('overview');
                  }}
                  onNavigateToView={(view) => setActiveView(view as NavView)}
                />
              </div>
            )}

            {activeView === 'tasks' && (
              <div className="flex-1 overflow-y-auto">
                <TasksView tasks={mockTasks} />
              </div>
            )}

            {activeView === 'roadmap' && (
              <div className="flex-1 overflow-y-auto">
                <RoadmapView
                  milestones={mockMilestones}
                  onNavigateToView={(view) => setActiveView(view as NavView)}
                />
              </div>
            )}

            {activeView === 'repositories' && (
              <div className="flex-1 overflow-y-auto">
                <RepositoriesView
                  repository={mockRepository}
                  commits={mockCommits}
                  pullRequests={mockPullRequests}
                />
              </div>
            )}

            {activeView === 'knowledge' && (
              <div className="flex-1 overflow-y-auto">
                <KnowledgeView
                  memoryItems={mockProjectMemory}
                  papers={mockResearchPapers}
                />
              </div>
            )}

            {activeView === 'research' && (
              <div className="flex-1 overflow-y-auto">
                <ResearchView papers={mockResearchPapers} />
              </div>
            )}

            {activeView === 'architecture' && (
              <div className="flex-1 overflow-y-auto">
                <ArchitectureView
                  nodes={mockArchitectureNodes}
                  edges={mockArchitectureEdges}
                />
              </div>
            )}

            {activeView === 'testing' && (
              <div className="flex-1 overflow-y-auto">
                <TestingView
                  testCases={mockTestCases}
                  benchmarks={mockBenchmarks}
                  onNavigateToView={(view) => setActiveView(view as NavView)}
                />
              </div>
            )}

            {activeView === 'fyp' && (
              <div className="flex-1 overflow-y-auto">
                <FYPView
                  sections={mockFYPSections}
                  onNavigateToView={(view) => setActiveView(view as NavView)}
                />
              </div>
            )}

            {activeView === 'viva' && (
              <div className="flex-1 overflow-y-auto">
                <VivaView questions={mockVivaQuestions} />
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
                  nodes={mockGlobalNodes}
                  edges={mockGlobalEdges}
                  projects={mockProjects}
                  onSelectProject={(proj) => {
                    setActiveProject(proj);
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

            {activeView === 'activity' && (
              <div className="flex-1 overflow-y-auto">
                <ActivityView events={mockActivityEvents} />
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

          {/* Right Contextual Intelligence Panel (available on overview) */}
          {activeView === 'overview' && (
            <RightIntelligencePanel
              activeProject={activeProject}
              selectedNode={selectedNode}
              insights={mockAIInsights}
              onClearSelection={() => setSelectedNode(null)}
              onNavigateToView={(view) => setActiveView(view as NavView)}
            />
          )}
        </div>
      </div>

      {/* Global Raycast Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        projects={mockProjects}
        tasks={mockTasks}
        onNavigateToView={(view) => setActiveView(view as NavView)}
        onSelectProject={(proj) => {
          setActiveProject(proj);
          setSelectedNode(null);
        }}
      />
    </div>
  );
}
