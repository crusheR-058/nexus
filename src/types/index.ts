export type ProjectType = 'personal' | 'hackathon' | 'research' | 'startup' | 'fyp';
export type ProjectStatus = 'planning' | 'development' | 'testing' | 'deployed' | 'completed';
export type HealthStatus = 'good' | 'warning' | 'critical';

export interface HealthDimensions {
  execution: number;
  documentation: number;
  testing: number;
  codeActivity: number;
  milestones: number;
  dependencies: number;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  type: ProjectType;
  status: ProjectStatus;
  progress: number;
  health: HealthStatus;
  repositoryUrl: string;
  branch: string;
  healthDimensions: HealthDimensions;
  stats: {
    tasksCount: number;
    completedTasksCount: number;
    commitsCount: number;
    docsCount: number;
    papersCount: number;
    openIssuesCount: number;
  };
  lastUpdated: string;
  tags: string[];
}

export type NodeCategory = 'core' | 'code' | 'tasks' | 'research' | 'architecture' | 'governance' | 'milestone';

export interface GraphNode {
  id: string;
  label: string;
  subtitle: string;
  type: 'project' | 'goal' | 'milestone' | 'task' | 'repository' | 'commit' | 'issue' | 'document' | 'research' | 'architecture' | 'dataset' | 'deployment' | 'portfolio' | 'decision';
  category: NodeCategory;
  x: number;
  y: number;
  progress?: number;
  status?: string;
  metrics?: {
    label: string;
    value: string | number;
  }[];
  description?: string;
  dependencies?: string[];
  techStack?: string[];
  lastActivity?: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: 'dependency' | 'implements' | 'validates' | 'references' | 'belongs_to' | 'deploys';
  animated?: boolean;
}

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'review' | 'done' | 'blocked';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignee: {
    name: string;
    avatar: string;
    role: string;
  };
  dueDate: string;
  estimatedTime?: string;
  dependencies: string[];
  projectId: string;
  milestoneId?: string;
  githubIssue?: {
    number: number;
    url: string;
  };
  aiContext?: string;
  tags: string[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  status: 'on_track' | 'at_risk' | 'delayed' | 'completed';
  progress: number;
  tasksCount: number;
  completedTasksCount: number;
  phase: string;
  blockers?: string[];
}

export interface Repository {
  name: string;
  url: string;
  defaultBranch: string;
  stars: number;
  forks: number;
  openIssues: number;
  openPRs: number;
  latestCommit: {
    sha: string;
    message: string;
    author: string;
    timestamp: string;
  };
  healthScores: {
    code: number;
    documentation: number;
    testing: number;
  };
  languages: { [lang: string]: number };
}

export interface Commit {
  id: string;
  sha: string;
  message: string;
  author: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  branch: string;
  additions: number;
  deletions: number;
  changedFiles: number;
  verified: boolean;
}

export interface PullRequest {
  id: string;
  number: number;
  title: string;
  author: string;
  status: 'open' | 'merged' | 'closed';
  commentsCount: number;
  createdAt: string;
  labels: string[];
}

export interface DocumentItem {
  id: string;
  title: string;
  type: 'spec' | 'srs' | 'readme' | 'api' | 'architecture' | 'notes' | 'report';
  content: string;
  lastModified: string;
  tags: string[];
  wordCount: number;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  publicationYear: number;
  venue: string;
  abstract: string;
  methodology: string;
  dataset: string;
  results: string;
  limitations: string;
  keyConcepts: string[];
  citationsCount: number;
  url: string;
}

export interface ArchitectureNode {
  id: string;
  title: string;
  serviceType: 'client' | 'gateway' | 'service' | 'database' | 'ai_engine' | 'queue' | 'cache';
  tech: string;
  x: number;
  y: number;
  latencyMs?: number;
  status: 'healthy' | 'degraded' | 'offline';
  description: string;
}

export interface ArchitectureEdge {
  id: string;
  from: string;
  to: string;
  protocol: 'HTTP/REST' | 'gRPC' | 'WebSocket' | 'SQL' | 'Redis Protocol';
  latency: string;
}

export interface ProjectMemory {
  id: string;
  title: string;
  category: 'architecture' | 'technology' | 'requirement' | 'constraint' | 'research' | 'problem';
  decision: string;
  rationale: string;
  alternativesConsidered: string[];
  timestamp: string;
  author: string;
}

export interface FYPSection {
  id: string;
  title: string;
  order: number;
  status: 'complete' | 'in_progress' | 'needs_revision' | 'missing';
  wordCount: number;
  requiredWordCount: number;
  feedback: string;
  aiSuggestions: string[];
}

export interface VivaQuestion {
  id: string;
  category: 'basic' | 'technical' | 'architecture' | 'implementation' | 'defense' | 'limitations';
  question: string;
  sampleAnswer: string;
  keyPoints: string[];
  difficulty: 'fundamental' | 'intermediate' | 'advanced';
  followUpQuestion: string;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  type: 'commit' | 'task_completed' | 'doc_added' | 'ai_insight' | 'milestone_updated' | 'deploy';
  title: string;
  description: string;
  user: string;
  metadata?: string;
}

export interface AIAgent {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'running' | 'completed';
  description: string;
  progressPercent: number;
  steps: {
    name: string;
    status: 'pending' | 'active' | 'done';
    timestamp?: string;
  }[];
  outputSummary?: string;
}

export interface AIInsight {
  id: string;
  type: 'insight' | 'blocker' | 'pattern' | 'gap';
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  actionLabel?: string;
  actionTarget?: string;
  evidenceSource?: string;
}

export interface TestCase {
  id: string;
  name: string;
  suite: string;
  status: 'passed' | 'failed' | 'running' | 'pending';
  durationMs: number;
  assertion: string;
  file: string;
}

export interface TestingBenchmark {
  metric: string;
  groundTruthBaseline: string;
  nexusScore: string;
  delta: string;
  status: 'optimal' | 'warning' | 'critical';
}

