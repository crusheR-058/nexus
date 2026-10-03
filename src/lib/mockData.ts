import { 
  Project, 
  GraphNode, 
  GraphEdge, 
  Task, 
  Milestone, 
  Repository, 
  Commit, 
  PullRequest, 
  DocumentItem, 
  ResearchPaper, 
  ArchitectureNode, 
  ArchitectureEdge, 
  ProjectMemory, 
  FYPSection, 
  VivaQuestion, 
  ActivityEvent, 
  AIAgent, 
  AIInsight,
  TestCase,
  TestingBenchmark
} from '../types';

export const mockProjects: Project[] = [
  {
    id: 'proj-satellite',
    name: 'Satellite Road Extraction',
    slug: 'satellite-road-extraction',
    tagline: 'Autonomous Geospatial Topology & Vectorization Engine',
    description: 'An end-to-end deep learning pipeline to extract topological road graphs directly from high-resolution satellite imagery (30cm GSD) using graph-tensor decoders and iterative trajectory tracking.',
    type: 'fyp',
    status: 'development',
    progress: 78,
    health: 'good',
    repositoryUrl: 'https://github.com/nexus-lab/satellite-road-extraction',
    branch: 'main',
    healthDimensions: {
      execution: 82,
      documentation: 61,
      testing: 48,
      codeActivity: 88,
      milestones: 74,
      dependencies: 65,
    },
    stats: {
      tasksCount: 18,
      completedTasksCount: 11,
      commitsCount: 42,
      docsCount: 6,
      papersCount: 4,
      openIssuesCount: 3,
    },
    lastUpdated: '12 minutes ago',
    tags: ['Computer Vision', 'PyTorch', 'PostGIS', 'Graph Neural Networks', 'FYP'],
  },
  {
    id: 'proj-orbit',
    name: 'Orbit — AI Research Intelligence',
    slug: 'orbit-ai-research',
    tagline: 'Multi-Agent Semantic Knowledge Retrieval for arXiv',
    description: 'Autonomous research assistant capable of parsing 10,000+ preprint papers daily, clustering semantic citation graphs, and summarizing cross-domain methodology breakthroughs.',
    type: 'research',
    status: 'development',
    progress: 64,
    health: 'good',
    repositoryUrl: 'https://github.com/nexus-lab/orbit-research-agent',
    branch: 'release/v0.8',
    healthDimensions: {
      execution: 70,
      documentation: 85,
      testing: 60,
      codeActivity: 75,
      milestones: 62,
      dependencies: 80,
    },
    stats: {
      tasksCount: 24,
      completedTasksCount: 14,
      commitsCount: 68,
      docsCount: 9,
      papersCount: 18,
      openIssuesCount: 2,
    },
    lastUpdated: '2 hours ago',
    tags: ['Agents', 'LLM', 'LangChain', 'Vector Search', 'pgvector'],
  },
  {
    id: 'proj-drone',
    name: 'Autonomous Drone Pathing Engine',
    slug: 'autonomous-drone-pathing',
    tagline: 'Real-time ROS2 SLAM & Obstacle Avoidance',
    description: 'Sub-15ms visual-inertial odometry and dynamic 3D spline trajectory replanning for quadrotors navigating dense canopy environments without GPS signals.',
    type: 'hackathon',
    status: 'testing',
    progress: 91,
    health: 'warning',
    repositoryUrl: 'https://github.com/nexus-lab/drone-pathing-ros2',
    branch: 'feature/fast-lio',
    healthDimensions: {
      execution: 94,
      documentation: 45,
      testing: 52,
      codeActivity: 90,
      milestones: 88,
      dependencies: 40,
    },
    stats: {
      tasksCount: 15,
      completedTasksCount: 13,
      commitsCount: 54,
      docsCount: 3,
      papersCount: 5,
      openIssuesCount: 4,
    },
    lastUpdated: '1 day ago',
    tags: ['ROS2', 'C++', 'CUDA', 'PointClouds', 'Robotics'],
  }
];

export const mockGraphNodes: GraphNode[] = [
  // Core Center Node
  {
    id: 'node-project-core',
    label: 'Satellite Road Extraction',
    subtitle: 'Active Engineering Core',
    type: 'project',
    category: 'core',
    x: 0,
    y: 0,
    progress: 78,
    status: 'In Development',
    metrics: [
      { label: 'Progress', value: '78%' },
      { label: 'Health', value: 'Good' },
      { label: 'Sprint', value: '4 of 6' }
    ],
    description: 'Active master project workspace synthesizing deep learning vision models, topology graph extraction, and GIS exports.',
    lastActivity: '3h ago'
  },
  // Code & Repository Branch
  {
    id: 'node-repo',
    label: 'satellite-road-extract',
    subtitle: 'GitHub Repository',
    type: 'repository',
    category: 'code',
    x: -220,
    y: -40,
    progress: 82,
    status: 'main (synced)',
    metrics: [
      { label: 'Stars', value: '142' },
      { label: 'Branches', value: '4' },
      { label: 'Open PRs', value: '2' }
    ],
    description: 'Core repository containing training pipelines, inference ONNX runtime scripts, and web tile server.',
    techStack: ['Python 3.11', 'PyTorch 2.4', 'FastAPI', 'ONNX Runtime'],
    lastActivity: 'Commit pushed 3h ago'
  },
  {
    id: 'node-commit-latest',
    label: 'feat(decoder): refine edge confidence',
    subtitle: 'Commit 8b4a2f9',
    type: 'commit',
    category: 'code',
    x: -360,
    y: -120,
    status: 'Verified',
    metrics: [
      { label: 'Author', value: 'OM (Lead)' },
      { label: 'Changes', value: '+148 / -32' }
    ],
    description: 'Implemented softnms graph prune algorithm to reduce false positive parallel highway edges.',
    lastActivity: '3h ago'
  },
  {
    id: 'node-issue-testing',
    label: 'Issue #42: Spacenet 5 Metric Lag',
    subtitle: 'Critical Blocker',
    type: 'issue',
    category: 'code',
    x: -330,
    y: 60,
    status: 'Open (High)',
    metrics: [
      { label: 'Priority', value: 'High' },
      { label: 'Affected', value: 'Testing Suite' }
    ],
    description: 'APLS (Average Path Length Similarity) benchmark failing on suburban roundabouts with dense foliage.',
    lastActivity: 'Updated 5h ago'
  },
  // Tasks Branch
  {
    id: 'node-task-hub',
    label: 'Tasks Engine',
    subtitle: '18 Total · 7 Active',
    type: 'task',
    category: 'tasks',
    x: -120,
    y: -180,
    progress: 68,
    status: 'Sprint On Track',
    metrics: [
      { label: 'Done', value: '11' },
      { label: 'In Progress', value: '4' },
      { label: 'Blocked', value: '2' }
    ],
    description: 'Action items coordinated across model fine-tuning, GeoJSON parsing, and unit test generation.'
  },
  {
    id: 'node-task-edge',
    label: 'Implement Edge Extraction',
    subtitle: 'Task #104 · In Progress',
    type: 'task',
    category: 'tasks',
    x: -240,
    y: -270,
    progress: 75,
    status: 'In Progress',
    metrics: [
      { label: 'Assignee', value: 'OM' },
      { label: 'Due', value: 'Tomorrow' }
    ],
    description: 'Likely next action according to AI pipeline analyzer. Connects orientation vectors to graph adjacency matrix.',
    dependencies: ['Skeleton cleanup', 'Spacenet5 validation']
  },
  {
    id: 'node-task-testing',
    label: 'APLS Testing Validation',
    subtitle: 'Task #108 · Blocked',
    type: 'task',
    category: 'tasks',
    x: -60,
    y: -300,
    progress: 30,
    status: 'Blocked',
    metrics: [
      { label: 'Blocker', value: 'Missing Dataset B' }
    ],
    description: 'Requires Ground Truth GeoJSON files to complete path consistency validation across 200 tiles.'
  },
  // Research Branch
  {
    id: 'node-research-hub',
    label: 'Research Lab',
    subtitle: '4 Papers · 2 Survey Memos',
    type: 'research',
    category: 'research',
    x: 180,
    y: -170,
    progress: 90,
    status: 'Synthesis Complete',
    metrics: [
      { label: 'Papers Analyzed', value: '4' },
      { label: 'Key Concepts', value: '16' }
    ],
    description: 'Survey of iterative graph generation vs segmentation mask vectorization models.'
  },
  {
    id: 'node-paper-sat2graph',
    label: 'Sat2Graph (He et al., ECCV)',
    subtitle: 'Foundational Paper',
    type: 'research',
    category: 'research',
    x: 320,
    y: -230,
    status: 'Annotated',
    metrics: [
      { label: 'Citations', value: '312' },
      { label: 'Year', value: '2020' }
    ],
    description: 'Introduces graph-tensor representations encoding both road vertices and connecting angles in unified feature maps.'
  },
  {
    id: 'node-paper-roadtracer',
    label: 'RoadTracer (Bastani et al., CVPR)',
    subtitle: 'Iterative Exploration',
    type: 'research',
    category: 'research',
    x: 340,
    y: -110,
    status: 'Reviewed',
    metrics: [
      { label: 'Technique', value: 'DQN Agent' }
    ],
    description: 'Explores satellite images incrementally using an agent stepping along predicted road segments.'
  },
  // Architecture Branch
  {
    id: 'node-architecture',
    label: 'System Architecture',
    subtitle: 'Pipeline Topology',
    type: 'architecture',
    category: 'architecture',
    x: 120,
    y: 190,
    progress: 85,
    status: 'Operational',
    metrics: [
      { label: 'Inference Latency', value: '142ms/tile' },
      { label: 'GPU Memory', value: '4.8 GB' }
    ],
    description: 'End-to-end data pipeline connecting DigitalGlobe WMS imagery to client-side Deck.gl vector canvas.',
    techStack: ['FastAPI', 'PyTorch C++ LibTorch', 'PostGIS', 'Deck.gl']
  },
  {
    id: 'node-service-decoder',
    label: 'Orientation Graph Decoder',
    subtitle: 'Deep Learning Model',
    type: 'architecture',
    category: 'architecture',
    x: 270,
    y: 220,
    status: 'Optimized',
    metrics: [
      { label: 'Precision', value: '89.4%' },
      { label: 'Recall', value: '86.1%' }
    ],
    description: 'Convolutional neural network predicting angle spectrum vectors for road junction graph generation.'
  },
  {
    id: 'node-db-postgis',
    label: 'PostgreSQL + PostGIS',
    subtitle: 'Geospatial Vector DB',
    type: 'decision',
    category: 'governance',
    x: -90,
    y: 210,
    status: 'Production Ready',
    metrics: [
      { label: 'Spatial Index', value: 'GIST Indexed' },
      { label: 'Road Vertices', value: '480k nodes' }
    ],
    description: 'Selected for relational integrity, spatial topological queries (ST_DWithin), and vector similarity search.'
  },
  // Milestones Branch
  {
    id: 'node-milestone-m3',
    label: 'Milestone 3: Graph Construction',
    subtitle: 'Target: Oct 18, 2026',
    type: 'milestone',
    category: 'milestone',
    x: 210,
    y: 20,
    progress: 74,
    status: 'On Track',
    metrics: [
      { label: 'Remaining Tasks', value: '3' },
      { label: 'Days Left', value: '15' }
    ],
    description: 'Complete graph extraction module from tile imagery with less than 5% topological disconnection rate.'
  },
  {
    id: 'node-portfolio',
    label: 'Portfolio & Viva Ready',
    subtitle: 'Final Deliverables',
    type: 'portfolio',
    category: 'governance',
    x: 20,
    y: 320,
    progress: 55,
    status: 'In Progress',
    metrics: [
      { label: 'FYP Chapters', value: '11 of 16' },
      { label: 'Viva Confidence', value: '84%' }
    ],
    description: 'Automated documentation, presentation slide deck, IEEE paper draft, and interactive web demo.'
  }
];

export const mockGraphEdges: GraphEdge[] = [
  // Center to Major Hubs
  { id: 'edge-core-repo', source: 'node-project-core', target: 'node-repo', label: 'source code', type: 'implements', animated: true },
  { id: 'edge-core-tasks', source: 'node-project-core', target: 'node-task-hub', label: 'execution', type: 'belongs_to', animated: true },
  { id: 'edge-core-research', source: 'node-project-core', target: 'node-research-hub', label: 'foundations', type: 'references' },
  { id: 'edge-core-arch', source: 'node-project-core', target: 'node-architecture', label: 'infrastructure', type: 'implements' },
  { id: 'edge-core-milestone', source: 'node-project-core', target: 'node-milestone-m3', label: 'active sprint', type: 'validates', animated: true },
  { id: 'edge-core-portfolio', source: 'node-project-core', target: 'node-portfolio', label: 'deliverable', type: 'deploys' },

  // Repository Children
  { id: 'edge-repo-commit', source: 'node-repo', target: 'node-commit-latest', label: 'head', type: 'implements' },
  { id: 'edge-repo-issue', source: 'node-repo', target: 'node-issue-testing', label: 'blocker', type: 'dependency' },

  // Tasks Children & Connections
  { id: 'edge-taskhub-edge', source: 'node-task-hub', target: 'node-task-edge', label: 'current', type: 'belongs_to' },
  { id: 'edge-taskhub-test', source: 'node-task-hub', target: 'node-task-testing', label: 'blocked', type: 'dependency' },
  { id: 'edge-taskedge-milestone', source: 'node-task-edge', target: 'node-milestone-m3', label: 'fulfills', type: 'validates' },
  { id: 'edge-issue-tasktest', source: 'node-issue-testing', target: 'node-task-testing', label: 'blocks', type: 'dependency' },

  // Research Children
  { id: 'edge-research-sat2graph', source: 'node-research-hub', target: 'node-paper-sat2graph', label: 'methodology', type: 'references' },
  { id: 'edge-research-roadtracer', source: 'node-research-hub', target: 'node-paper-roadtracer', label: 'comparison', type: 'references' },

  // Architecture Children
  { id: 'edge-arch-decoder', source: 'node-architecture', target: 'node-service-decoder', label: 'pipeline step', type: 'implements' },
  { id: 'edge-arch-db', source: 'node-architecture', target: 'node-db-postgis', label: 'vector store', type: 'implements' },
  { id: 'edge-decoder-taskedge', source: 'node-service-decoder', target: 'node-task-edge', label: 'code target', type: 'references' },
  { id: 'edge-db-portfolio', source: 'node-db-postgis', target: 'node-portfolio', label: 'schema docs', type: 'deploys' }
];

export const mockTasks: Task[] = [
  {
    id: 'task-104',
    title: 'Implement Edge Extraction Soft-NMS',
    description: 'Replace standard hard non-maximum suppression with distance-weighted soft-NMS to handle overlapping motorway lanes without breaking connectivity.',
    priority: 'high',
    status: 'in_progress',
    assignee: {
      name: 'OM Sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      role: 'Lead ML Engineer'
    },
    dueDate: 'Oct 05, 2026',
    estimatedTime: '2h 30m',
    dependencies: ['Dataset Validation', 'Skeleton Clean'],
    projectId: 'proj-satellite',
    milestoneId: 'ms-graph-construction',
    githubIssue: {
      number: 38,
      url: 'https://github.com/nexus-lab/satellite-road-extract/issues/38'
    },
    aiContext: 'High priority. Directly impacts Milestone 3 completion and unlocks integration test pipeline.',
    tags: ['Graph Theory', 'PyTorch', 'Computer Vision']
  },
  {
    id: 'task-105',
    title: 'PostgreSQL + PostGIS Schema Migration',
    description: 'Create spatial GIST indexes on edge linestrings and benchmark bounding box query speeds under 100k nodes.',
    priority: 'medium',
    status: 'done',
    assignee: {
      name: 'OM Sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      role: 'Lead ML Engineer'
    },
    dueDate: 'Sep 29, 2026',
    estimatedTime: '4h 00m',
    dependencies: [],
    projectId: 'proj-satellite',
    milestoneId: 'ms-architecture',
    aiContext: 'Completed and verified. Spatial query latency dropped from 120ms to 8.4ms.',
    tags: ['Database', 'PostGIS', 'SQL']
  },
  {
    id: 'task-106',
    title: 'SpaceNet 5 Metric Benchmark Pipeline',
    description: 'Build automated validation worker that computes APLS (Average Path Length Similarity) against ground-truth city center maps.',
    priority: 'urgent',
    status: 'blocked',
    assignee: {
      name: 'OM Sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      role: 'Lead ML Engineer'
    },
    dueDate: 'Oct 08, 2026',
    estimatedTime: '6h 15m',
    dependencies: ['Dataset B Paris GeoJSON'],
    projectId: 'proj-satellite',
    milestoneId: 'ms-testing',
    githubIssue: {
      number: 42,
      url: 'https://github.com/nexus-lab/satellite-road-extract/issues/42'
    },
    aiContext: 'POTENTIAL BLOCKER: Awaiting download verification of SpaceNet Paris subset.',
    tags: ['Testing', 'Benchmarks', 'SpaceNet']
  },
  {
    id: 'task-107',
    title: 'FastAPI Tile Inference WebSocket Streamer',
    description: 'Implement chunked streaming of GeoJSON line segments as inference tiles complete, rendering progressive edges in client UI.',
    priority: 'medium',
    status: 'todo',
    assignee: {
      name: 'Dev Assistant',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      role: 'Fullstack Dev'
    },
    dueDate: 'Oct 12, 2026',
    estimatedTime: '3h 45m',
    dependencies: ['Implement Edge Extraction Soft-NMS'],
    projectId: 'proj-satellite',
    milestoneId: 'ms-graph-construction',
    aiContext: 'Allows real-time progress preview for viva examiners and demonstration showcase.',
    tags: ['WebSockets', 'FastAPI', 'Streaming']
  },
  {
    id: 'task-108',
    title: 'Chapter 5: Methodology Draft for FYP Report',
    description: 'Document mathematical formulation of the graph-tensor decoder and write algorithmic pseudocode for junction tracking.',
    priority: 'high',
    status: 'in_progress',
    assignee: {
      name: 'OM Sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      role: 'Lead ML Engineer'
    },
    dueDate: 'Oct 14, 2026',
    estimatedTime: '5h 00m',
    dependencies: [],
    projectId: 'proj-satellite',
    milestoneId: 'ms-fyp-docs',
    aiContext: 'Documentation gap detected: Implementation is 3 weeks ahead of report writeup.',
    tags: ['FYP', 'Documentation', 'Academic']
  },
  {
    id: 'task-109',
    title: 'ONNX Runtime TensorRT Acceleration',
    description: 'Export PyTorch backbone to ONNX with dynamic batch sizing and compile with TensorRT 10.2 for sub-50ms inference.',
    priority: 'low',
    status: 'backlog',
    assignee: {
      name: 'OM Sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      role: 'Lead ML Engineer'
    },
    dueDate: 'Oct 25, 2026',
    estimatedTime: '8h 00m',
    dependencies: ['Implement Edge Extraction Soft-NMS'],
    projectId: 'proj-satellite',
    milestoneId: 'ms-deployment',
    tags: ['ONNX', 'TensorRT', 'Optimization']
  }
];

export const mockMilestones: Milestone[] = [
  {
    id: 'ms-research',
    title: 'Phase 1: Literature Survey & Baseline',
    description: 'Comprehensive evaluation of RoadTracer vs Sat2Graph architectures on Vegas & Paris aerial datasets.',
    targetDate: 'Aug 28, 2026',
    status: 'completed',
    progress: 100,
    tasksCount: 6,
    completedTasksCount: 6,
    phase: 'Phase 1'
  },
  {
    id: 'ms-architecture',
    title: 'Phase 2: Topology Model & Ingestion Engine',
    description: 'Built tile chunking pipeline, ResNeXt-50 dual-head feature encoder, and PostGIS vector storage.',
    targetDate: 'Sep 22, 2026',
    status: 'completed',
    progress: 100,
    tasksCount: 8,
    completedTasksCount: 8,
    phase: 'Phase 2'
  },
  {
    id: 'ms-graph-construction',
    title: 'Phase 3: Deep Graph Extraction Decoder',
    description: 'Vector orientation decoding, soft-NMS junction synthesis, and graph continuity reconstruction.',
    targetDate: 'Oct 18, 2026',
    status: 'on_track',
    progress: 74,
    tasksCount: 7,
    completedTasksCount: 5,
    phase: 'Phase 3'
  },
  {
    id: 'ms-testing',
    title: 'Phase 4: Full SpaceNet 5 Benchmark Suite',
    description: 'Automated APLS testing, IoU pixel comparison, and topological connectivity stress analysis.',
    targetDate: 'Nov 02, 2026',
    status: 'at_risk',
    progress: 42,
    tasksCount: 5,
    completedTasksCount: 2,
    phase: 'Phase 4',
    blockers: ['Awaiting SpaceNet 5 Paris ground truth GeoJSON ingestion']
  },
  {
    id: 'ms-fyp-docs',
    title: 'Phase 5: FYP Report, Presentation & Viva Prep',
    description: 'Comprehensive 16-chapter thesis report, defense presentation slide deck, and simulated viva coach testing.',
    targetDate: 'Nov 20, 2026',
    status: 'on_track',
    progress: 60,
    tasksCount: 6,
    completedTasksCount: 3,
    phase: 'Phase 5'
  }
];

export const mockRepository: Repository = {
  name: 'satellite-road-extract',
  url: 'https://github.com/nexus-lab/satellite-road-extract',
  defaultBranch: 'main',
  stars: 142,
  forks: 28,
  openIssues: 3,
  openPRs: 2,
  latestCommit: {
    sha: '8b4a2f9',
    message: 'feat(decoder): refine soft-NMS angle thresholding for complex roundabouts',
    author: 'OM Sharma',
    timestamp: '3 hours ago'
  },
  healthScores: {
    code: 82,
    documentation: 61,
    testing: 48
  },
  languages: {
    Python: 76.4,
    TypeScript: 14.8,
    Shell: 4.8,
    C: 4.0
  }
};

export const mockCommits: Commit[] = [
  {
    id: 'c-1',
    sha: '8b4a2f9',
    message: 'feat(decoder): refine soft-NMS angle thresholding for complex roundabouts',
    author: { name: 'OM Sharma', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face' },
    timestamp: '3 hours ago',
    branch: 'main',
    additions: 148,
    deletions: 32,
    changedFiles: 4,
    verified: true
  },
  {
    id: 'c-2',
    sha: '9c12a81',
    message: 'fix(postgis): add ST_Transform to EPSG:4326 before GeoJSON serialization',
    author: { name: 'OM Sharma', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face' },
    timestamp: '18 hours ago',
    branch: 'main',
    additions: 24,
    deletions: 6,
    changedFiles: 2,
    verified: true
  },
  {
    id: 'c-3',
    sha: '4d87f0b',
    message: 'perf(inference): optimize tile overlap batching with torch.no_grad()',
    author: { name: 'OM Sharma', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face' },
    timestamp: '2 days ago',
    branch: 'main',
    additions: 92,
    deletions: 45,
    changedFiles: 3,
    verified: true
  },
  {
    id: 'c-4',
    sha: '1f38e6e',
    message: 'test(apls): introduce mock ground truth graph for unit testing',
    author: { name: 'OM Sharma', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face' },
    timestamp: '4 days ago',
    branch: 'main',
    additions: 210,
    deletions: 12,
    changedFiles: 5,
    verified: true
  }
];

export const mockPullRequests: PullRequest[] = [
  {
    id: 'pr-14',
    number: 14,
    title: 'feat: add real-time WebSocket tile progress streaming',
    author: 'om-sharma',
    status: 'open',
    commentsCount: 3,
    createdAt: 'Yesterday',
    labels: ['feature', 'backend', 'websocket']
  },
  {
    id: 'pr-13',
    number: 13,
    title: 'fix: resolve GPU out-of-memory on 4096x4096px aerial tiles',
    author: 'om-sharma',
    status: 'merged',
    commentsCount: 5,
    createdAt: '3 days ago',
    labels: ['bugfix', 'cuda', 'memory']
  }
];

export const mockProjectMemory: ProjectMemory[] = [
  {
    id: 'mem-1',
    title: 'Database Engine Selection: PostgreSQL + PostGIS',
    category: 'technology',
    decision: 'Selected PostgreSQL 16 with PostGIS extension for spatial vector storage and pgvector for satellite tile embeddings.',
    rationale: 'Project requires both relational integrity for tasks/users and native geospatial operations (ST_DWithin, ST_Length, ST_Intersection) at scale. MongoDB and DynamoDB lacked native spatial graph indices.',
    alternativesConsidered: ['MongoDB GeoJSON', 'Neo4j Spatial', 'Pure SQLite Spatialite'],
    timestamp: 'Oct 01, 2026',
    author: 'OM Sharma'
  },
  {
    id: 'mem-2',
    title: 'Model Architecture: Graph-Tensor vs Pixel Segmentation',
    category: 'architecture',
    decision: 'Adopted dual-head Graph-Tensor network (inspired by Sat2Graph) over pure U-Net semantic segmentation.',
    rationale: 'Standard semantic segmentation requires aggressive thresholding and heuristic thinning (skeletonization), causing disconnection artifacts in road intersections. Graph-tensor directly predicts road vertices and adjacency vectors.',
    alternativesConsidered: ['Vanilla U-Net with Thinning', 'DeepLabV3+ with Post-morphology', 'DQN Agent (RoadTracer)'],
    timestamp: 'Sep 14, 2026',
    author: 'OM Sharma'
  },
  {
    id: 'mem-3',
    title: 'Evaluation Metric: APLS over Standard F1/IoU',
    category: 'requirement',
    decision: 'Mandated APLS (Average Path Length Similarity) as the primary benchmark metric for thesis results.',
    rationale: 'A road network disconnected by a single 5-pixel gap has 99% pixel IoU but 0% route drivability. APLS penalizes topological disconnections mathematically by comparing all-pairs shortest paths.',
    alternativesConsidered: ['Pixel Intersection-over-Union (IoU)', 'Junction F1-score', 'Precision-Recall AUC'],
    timestamp: 'Sep 02, 2026',
    author: 'OM Sharma'
  }
];

export const mockResearchPapers: ResearchPaper[] = [
  {
    id: 'paper-sat2graph',
    title: 'Sat2Graph: A Road Graph Extraction Approach with Graph Tensor Representation',
    authors: ['Songtao He', 'Favyen Bastani', 'Satvat Jagwani', 'Mohammad Alizadeh', 'Hari Balakrishnan'],
    publicationYear: 2020,
    venue: 'ECCV 2020 (European Conference on Computer Vision)',
    abstract: 'We present Sat2Graph, an automated system that extracts road graphs directly from satellite imagery. Prior work produces binary masks that are hard to convert into graphs without disconnections. We formulate a novel graph-tensor representation encoding graph topology directly in convolutional outputs.',
    methodology: 'Dual-branch CNN: Head 1 predicts vertex locations; Head 2 predicts directional angle tensors for neighboring junctions. Graph assembly performs non-maximum suppression in continuous angle space.',
    dataset: 'SpaceNet 3 (Las Vegas, Paris, Shanghai) + 20-City Aerial Dataset (800 sq km)',
    results: 'Outperforms iterative exploration methods (RoadTracer) with 16x faster inference and 9.4% higher APLS score.',
    limitations: 'Susceptible to overpasses where roads cross at different vertical elevations without intersection.',
    keyConcepts: ['Graph Tensor', 'Topological Vectorization', 'APLS Metric', 'Angular NMS'],
    citationsCount: 312,
    url: 'https://arxiv.org/abs/2007.09540'
  },
  {
    id: 'paper-roadtracer',
    title: 'RoadTracer: Automatic Extraction of Road Networks from Aerial Images',
    authors: ['Favyen Bastani', 'Songtao He', 'Sofiane Abbar', 'Mohammad Alizadeh', 'Hari Balakrishnan'],
    publicationYear: 2018,
    venue: 'CVPR 2018',
    abstract: 'Extracting road networks using pixel-level segmentation requires heuristics that break connectivity. RoadTracer uses an iterative exploration agent guided by a CNN to step along roads one vertex at a time.',
    methodology: 'Dynamic action space where an agent places vertices incrementally, checking a walk stop probability function.',
    dataset: 'DigitalGlobe 30cm RGB images covering 15 global metropolitan areas.',
    results: 'Improved junction connectivity by 45% compared to segmentation baselines.',
    limitations: 'Inference time scales linearly with total road length; error propagation occurs if a wrong step is taken.',
    keyConcepts: ['Iterative Exploration', 'Step-wise Agent', 'Road Topology'],
    citationsCount: 468,
    url: 'https://arxiv.org/abs/1805.08639'
  }
];

export const mockArchitectureNodes: ArchitectureNode[] = [
  {
    id: 'arch-tile-streamer',
    title: 'Satellite Tile Streamer',
    serviceType: 'gateway',
    tech: 'FastAPI / GDAL',
    x: 80,
    y: 120,
    latencyMs: 14,
    status: 'healthy',
    description: 'Splits raw 10,000x10,000 GeoTIFF scenes into 1024x1024 overlapping tiles with 64px border buffer.'
  },
  {
    id: 'arch-backbone',
    title: 'Feature Extraction Backbone',
    serviceType: 'ai_engine',
    tech: 'PyTorch / ResNeXt-50',
    x: 320,
    y: 120,
    latencyMs: 65,
    status: 'healthy',
    description: 'Multi-scale Feature Pyramid Network (FPN) extracting rich spatial representations at 1/4, 1/8, and 1/16 scales.'
  },
  {
    id: 'arch-decoder',
    title: 'Graph Tensor Decoder',
    serviceType: 'ai_engine',
    tech: 'CUDA Custom Kernel',
    x: 580,
    y: 120,
    latencyMs: 42,
    status: 'healthy',
    description: 'Predicts junction coordinate likelihoods and 16-bin angular connection tensors.'
  },
  {
    id: 'arch-topology-cleaner',
    title: 'Topology Graph Assembler',
    serviceType: 'service',
    tech: 'Python / NetworkX / C++',
    x: 580,
    y: 280,
    latencyMs: 18,
    status: 'healthy',
    description: 'Performs angle-space Soft-NMS, edge linking, and snaps dangling segment endpoints within 12 meters.'
  },
  {
    id: 'arch-postgis',
    title: 'PostgreSQL + PostGIS',
    serviceType: 'database',
    tech: 'Postgres 16 / PostGIS 3.4',
    x: 320,
    y: 280,
    latencyMs: 6,
    status: 'healthy',
    description: 'Stores extracted road segments as spatial MultiLineString geometry indexed with R-Tree GIST.'
  },
  {
    id: 'arch-deckgl-client',
    title: 'Interactive Vector UI',
    serviceType: 'client',
    tech: 'Next.js / Deck.gl / MapLibre',
    x: 80,
    y: 280,
    latencyMs: 12,
    status: 'healthy',
    description: 'GPU-accelerated vector tile visualization rendering 500,000 road segments smoothly at 60 FPS.'
  }
];

export const mockArchitectureEdges: ArchitectureEdge[] = [
  { id: 'ae-1', from: 'arch-tile-streamer', to: 'arch-backbone', protocol: 'HTTP/REST', latency: '4ms' },
  { id: 'ae-2', from: 'arch-backbone', to: 'arch-decoder', protocol: 'gRPC', latency: '2ms' },
  { id: 'ae-3', from: 'arch-decoder', to: 'arch-topology-cleaner', protocol: 'gRPC', latency: '3ms' },
  { id: 'ae-4', from: 'arch-topology-cleaner', to: 'arch-postgis', protocol: 'SQL', latency: '5ms' },
  { id: 'ae-5', from: 'arch-postgis', to: 'arch-deckgl-client', protocol: 'WebSocket', latency: '8ms' }
];

export const mockFYPSections: FYPSection[] = [
  {
    id: 'fyp-1',
    title: '1. Problem Statement',
    order: 1,
    status: 'complete',
    wordCount: 840,
    requiredWordCount: 800,
    feedback: 'Clear motivation addressing why pixel-level semantic segmentation fails at road network routing.',
    aiSuggestions: ['Add satellite sensor resolution comparison table (Sentinel-2 vs WorldView-3)']
  },
  {
    id: 'fyp-2',
    title: '2. Project Objectives',
    order: 2,
    status: 'complete',
    wordCount: 650,
    requiredWordCount: 600,
    feedback: 'Explicit measurable goals: sub-150ms tile extraction, >80% APLS score, and PostGIS vector exporter.',
    aiSuggestions: ['Include energy efficiency / GPU FLOP budget objective']
  },
  {
    id: 'fyp-3',
    title: '3. Literature Survey',
    order: 3,
    status: 'complete',
    wordCount: 2450,
    requiredWordCount: 2200,
    feedback: 'Comprehensive coverage of 14 key papers spanning 2018–2025.',
    aiSuggestions: ['Add citation for recent 2025 diffusion-based vectorization methods']
  },
  {
    id: 'fyp-4',
    title: '4. System Requirements & Specifications',
    order: 4,
    status: 'complete',
    wordCount: 1120,
    requiredWordCount: 1000,
    feedback: 'Covers hardware (RTX 4090 / CUDA 12), memory footprint, and software stack.',
    aiSuggestions: []
  },
  {
    id: 'fyp-5',
    title: '5. Theoretical Foundations',
    order: 5,
    status: 'complete',
    wordCount: 1680,
    requiredWordCount: 1500,
    feedback: 'Rigorous mathematical formulation of Graph-Tensor space and Soft-NMS angle clustering.',
    aiSuggestions: ['Add proof of convergence for iterative endpoint snapping']
  },
  {
    id: 'fyp-6',
    title: '6. System Architecture & Design',
    order: 6,
    status: 'complete',
    wordCount: 1940,
    requiredWordCount: 1800,
    feedback: 'High-fidelity architectural diagrams and microservice breakdown.',
    aiSuggestions: ['Provide database ER schema diagram alongside PostGIS table definitions']
  },
  {
    id: 'fyp-7',
    title: '7. Implementation Details',
    order: 7,
    status: 'in_progress',
    wordCount: 2200,
    requiredWordCount: 3000,
    feedback: 'Good code walkthrough of ResNeXt feature pyramid, but edge decoder logic needs expansion.',
    aiSuggestions: ['Include algorithmic pseudocode for the soft-NMS angle clustering']
  },
  {
    id: 'fyp-8',
    title: '8. Testing & Validation Suite',
    order: 8,
    status: 'needs_revision',
    wordCount: 920,
    requiredWordCount: 1800,
    feedback: 'CRITICAL GAP: Testing section lags significantly behind implementation. APLS benchmark data missing.',
    aiSuggestions: ['Run SpaceNet 5 Paris evaluation script to populate benchmark score tables']
  },
  {
    id: 'fyp-9',
    title: '9. Experimental Results & Analysis',
    order: 9,
    status: 'in_progress',
    wordCount: 1400,
    requiredWordCount: 2200,
    feedback: 'Preliminary Las Vegas dataset results look promising (84.2% APLS). Rural dataset results pending.',
    aiSuggestions: ['Add visual comparison figure: Ground Truth vs RoadTracer vs NEXUS System']
  },
  {
    id: 'fyp-10',
    title: '10. Discussion & Critical Evaluation',
    order: 10,
    status: 'in_progress',
    wordCount: 880,
    requiredWordCount: 1400,
    feedback: 'Analysis of tree canopy occlusion and highway cloverleaf complexity.',
    aiSuggestions: []
  },
  {
    id: 'fyp-11',
    title: '11. Limitations & Edge Cases',
    order: 11,
    status: 'complete',
    wordCount: 950,
    requiredWordCount: 800,
    feedback: 'Honest evaluation of multi-level bridge overpasses and desert sand road detection limits.',
    aiSuggestions: []
  },
  {
    id: 'fyp-12',
    title: '12. Future Scope & Enhancements',
    order: 12,
    status: 'complete',
    wordCount: 780,
    requiredWordCount: 700,
    feedback: 'Road classification (lanes, speed limits, surface type) and real-time drone feed integration.',
    aiSuggestions: []
  },
  {
    id: 'fyp-13',
    title: '13. Conclusion',
    order: 13,
    status: 'complete',
    wordCount: 650,
    requiredWordCount: 600,
    feedback: 'Concise summary of achievements and thesis contributions.',
    aiSuggestions: []
  },
  {
    id: 'fyp-14',
    title: '14. References & Bibliography',
    order: 14,
    status: 'complete',
    wordCount: 1450,
    requiredWordCount: 1200,
    feedback: '38 academic citations formatted in IEEE style.',
    aiSuggestions: []
  },
  {
    id: 'fyp-15',
    title: '15. Presentation Deck & Visuals',
    order: 15,
    status: 'in_progress',
    wordCount: 420,
    requiredWordCount: 500,
    feedback: 'Slide structure ready; video demonstration clip embedded.',
    aiSuggestions: []
  },
  {
    id: 'fyp-16',
    title: '16. Viva Preparation & Defense Strategy',
    order: 16,
    status: 'complete',
    wordCount: 1800,
    requiredWordCount: 1500,
    feedback: '24 anticipated examiner questions categorized and practiced.',
    aiSuggestions: []
  }
];

export const mockVivaQuestions: VivaQuestion[] = [
  {
    id: 'vq-1',
    category: 'architecture',
    question: 'Why did you choose a Graph-Tensor representation instead of standard U-Net semantic segmentation followed by OpenCV skeletonization?',
    sampleAnswer: 'Standard U-Net segmentation produces a binary pixel mask. Converting a pixel mask to a graph requires mathematical morphological thinning (skeletonization), which has two fatal flaws: (1) it is extremely sensitive to minor pixel noise causing spurious spurs, and (2) at intersections with occlusions (like trees or bridges), it fragments road continuity, destroying the topological graph routing. By predicting a Graph-Tensor directly, our model jointly outputs junction vertices and directional angle vectors in continuous space, maintaining route topology even under partial occlusions.',
    keyPoints: [
      'Pixel segmentation ignores topological graph connectivity',
      'Morphological skeletonization introduces spurious dead-end spurs',
      'Graph-Tensor predicts vertices and angle vectors in unified continuous space',
      'Preserves route traversability across occluded spans'
    ],
    difficulty: 'advanced',
    followUpQuestion: 'How does your model differentiate between an intersection at grade versus a highway flyover bridge crossing another road?'
  },
  {
    id: 'vq-2',
    category: 'technical',
    question: 'Explain why APLS (Average Path Length Similarity) is mathematically superior to Intersection-over-Union (IoU) for evaluating road graphs.',
    sampleAnswer: 'Intersection-over-Union measures purely spatial pixel overlap. If a 10km highway has a 5-meter gap where an overpass was misclassified, the pixel IoU is over 99.8% (looks nearly perfect), but the graph is completely severed and route planning cannot pass through (0% drivability). APLS measures metric path distance between all pairs of nodes in the ground truth graph compared to the shortest path in the extracted graph. If a gap severs connectivity, the path distance goes to infinity (or maximum penalty), correctly reflecting the catastrophic failure in routing.',
    keyPoints: [
      'IoU measures geometric pixel area overlap, not network traversability',
      'A tiny 5-pixel disconnection preserves 99% IoU but breaks 100% of routes through that link',
      'APLS samples all-pairs shortest paths using Dijkstra routing',
      'Penalizes false disconnections and topological dead-ends proportionally'
    ],
    difficulty: 'intermediate',
    followUpQuestion: 'What is the algorithmic time complexity of calculating APLS over a graph with V vertices and E edges?'
  },
  {
    id: 'vq-3',
    category: 'implementation',
    question: 'Why did you select PostgreSQL with PostGIS over specialized Graph Databases like Neo4j for this project?',
    sampleAnswer: 'While Neo4j excels at arbitrary social graphs, our data is fundamentally geospatial (coordinates in WGS84, meters on Earth ellipsoid, spatial bounding boxes). PostGIS provides hardware-accelerated R-Tree and GIST spatial indices, native spatial joins (e.g. ST_DWithin, ST_SnapToGrid), and full SQL relational integrity linking tasks, milestones, and imagery tiles. Furthermore, pgvector allows storing satellite tile visual embeddings inside the same ACID-compliant database.',
    keyPoints: [
      'Spatial R-Tree/GIST indexing optimized for 2D geometry',
      'Native PostGIS topological functions (ST_DWithin, ST_Intersection)',
      'Single transactional ACID store with pgvector embeddings',
      'Eliminated dual-database sync complexity'
    ],
    difficulty: 'fundamental',
    followUpQuestion: 'How do you handle coordinate projection transformations between WGS84 (EPSG:4326) and Web Mercator (EPSG:3857) during live tile streaming?'
  },
  {
    id: 'vq-4',
    category: 'defense',
    question: 'What happens when your model encounters cloud cover, dense smoke, or shadowed tall buildings in satellite tiles?',
    sampleAnswer: 'Our system handles occlusions through two mechanisms: first, during training we apply heavy CutOut and synthetic cloud augmentation to force the feature extractor to infer trajectory momentum from surrounding unobstructed segments. Second, during post-processing graph assembly, the endpoint snapping algorithm performs trajectory extrapolation up to 35 meters along the predicted departure angle vector, bridging typical tree shadows and localized cloud edges.',
    keyPoints: [
      'Synthetic cloud and shadow augmentation in training pipeline',
      'Trajectory momentum learned in FPN features',
      'Vector extrapolation up to 35 meters along orientation vectors',
      'Explicit confidence scoring flags uncertain bridges for human review'
    ],
    difficulty: 'advanced',
    followUpQuestion: 'What confidence threshold triggers manual review, and what is your false-positive bridging rate?'
  }
];

export const mockAIInsights: AIInsight[] = [
  {
    id: 'ins-1',
    type: 'gap',
    title: 'Testing Documentation Gap',
    description: 'The graph extraction pipeline is progressing rapidly, but testing suite coverage (48%) is significantly behind implementation (82%). 2 milestones are approaching.',
    severity: 'warning',
    actionLabel: 'Open Testing Task',
    actionTarget: 'task-106',
    evidenceSource: 'Git Commits (42) vs Unit Tests (3)'
  },
  {
    id: 'ins-2',
    type: 'blocker',
    title: 'Potential Dependency Blocker',
    description: 'Task #106 (APLS Benchmark Suite) is blocked on SpaceNet 5 Paris GeoJSON ground truth ingestion. Milestone 4 is at risk.',
    severity: 'critical',
    actionLabel: 'Inspect Blocker',
    actionTarget: 'task-106',
    evidenceSource: 'Issue #42 & Milestone 4 Tracker'
  },
  {
    id: 'ins-3',
    type: 'pattern',
    title: 'Commit Distribution Pattern',
    description: '88% of recent commits are concentrated in model decoder logic. Web client streaming frontend has had no updates in 5 days.',
    severity: 'info',
    actionLabel: 'View Repository',
    actionTarget: 'repositories',
    evidenceSource: 'Git commit telemetry (last 14 days)'
  }
];

export const mockActivityEvents: ActivityEvent[] = [
  {
    id: 'act-1',
    timestamp: '12m ago',
    type: 'commit',
    title: 'Commit pushed to main',
    description: 'feat(decoder): refine soft-NMS angle thresholding for complex roundabouts (8b4a2f9)',
    user: 'OM Sharma',
    metadata: '+148 / -32 lines'
  },
  {
    id: 'act-2',
    timestamp: '1h ago',
    type: 'ai_insight',
    title: 'NEXUS Analysis Generated',
    description: 'Identified testing coverage lag and recommended prioritizing Task #106 APLS verification.',
    user: 'NEXUS AI'
  },
  {
    id: 'act-3',
    timestamp: '3h ago',
    type: 'task_completed',
    title: 'Task Completed',
    description: 'PostgreSQL + PostGIS Schema Migration marked as Done.',
    user: 'OM Sharma'
  },
  {
    id: 'act-4',
    timestamp: '6h ago',
    type: 'doc_added',
    title: 'Research Paper Added',
    description: 'Sat2Graph (He et al., ECCV 2020) added to project knowledge hub and indexed with pgvector.',
    user: 'OM Sharma'
  },
  {
    id: 'act-5',
    timestamp: '1d ago',
    type: 'milestone_updated',
    title: 'Milestone 3 Progress: 74%',
    description: 'Phase 3: Deep Graph Extraction Decoder on track with 5 of 7 tasks finished.',
    user: 'System'
  }
];

export const mockAIAgents: AIAgent[] = [
  {
    id: 'agent-codebase',
    name: 'Codebase Analyst',
    role: 'Automated Repository & Architecture Inspector',
    status: 'completed',
    description: 'Scans commit history, dependency trees, and fragile code modules to detect technical debt and architectural drift.',
    progressPercent: 100,
    steps: [
      { name: 'Read repository file tree (42 files)', status: 'done', timestamp: '10:40 AM' },
      { name: 'Inspected PyTorch model layers & tensor shapes', status: 'done', timestamp: '10:41 AM' },
      { name: 'Analyzed PostGIS SQL query execution plans', status: 'done', timestamp: '10:42 AM' },
      { name: 'Compared recent 14 commits vs milestone specs', status: 'done', timestamp: '10:43 AM' }
    ],
    outputSummary: 'Analysis Ready: Identified soft-NMS angle clustering bottleneck at high junction densities. Testing coverage is 48% (lagging 34% behind code execution).'
  },
  {
    id: 'agent-viva',
    name: 'Viva Defense Coach',
    role: 'Academic Examiner Simulation',
    status: 'idle',
    description: 'Generates rigorous examiner cross-examination questions from actual project memory, architecture decisions, and code commits.',
    progressPercent: 85,
    steps: [
      { name: 'Ingested 16 FYP report chapters', status: 'done' },
      { name: 'Extracted architectural decisions & trade-offs', status: 'done' },
      { name: 'Generated 24 defense questions across 6 categories', status: 'done' },
      { name: 'Ready for interactive speech/text simulation', status: 'active' }
    ]
  },
  {
    id: 'agent-docs',
    name: 'Documentation & Portfolio Generator',
    role: 'Technical Publication Agent',
    status: 'idle',
    description: 'Synthesizes code, architecture, and research into publication-grade README, SRS, IEEE paper drafts, and portfolio case studies.',
    progressPercent: 90,
    steps: [
      { name: 'Aggregated repository stats & architecture nodes', status: 'done' },
      { name: 'Synthesized theoretical foundations & results', status: 'done' },
      { name: 'Ready to export Markdown, LaTeX, and LinkedIn artifacts', status: 'active' }
    ]
  }
];

export const mockTestCases: TestCase[] = [
  {
    id: 'tc-1',
    name: 'test_soft_nms_intersection_clustering',
    suite: 'Topology Assembly Suite',
    status: 'passed',
    durationMs: 42,
    assertion: 'assert len(predicted_angles) == 4 and abs(angle[0] - 90) < 5.0',
    file: 'tests/test_topology.py'
  },
  {
    id: 'tc-2',
    name: 'test_postgis_gist_spatial_query_latency',
    suite: 'Database & Ingestion Suite',
    status: 'passed',
    durationMs: 8,
    assertion: 'assert query_time_ms < 15.0 and spatial_matches >= 120',
    file: 'tests/test_db_spatial.py'
  },
  {
    id: 'tc-3',
    name: 'test_gdal_tile_overlap_consistency',
    suite: 'Data Ingestion Suite',
    status: 'passed',
    durationMs: 65,
    assertion: 'assert tile_overlap_pixels == 64 and edge_snapping_error < 0.01',
    file: 'tests/test_gdal.py'
  },
  {
    id: 'tc-4',
    name: 'test_spacenet_paris_apls_metric_eval',
    suite: 'SpaceNet 5 Evaluation Suite',
    status: 'failed',
    durationMs: 310,
    assertion: 'assert apls_score > 0.80 # FAILED: Ground truth file missing for quadrant 4',
    file: 'tests/test_apls.py'
  },
  {
    id: 'tc-5',
    name: 'test_flyover_elevation_disconnection',
    suite: 'Topology Assembly Suite',
    status: 'pending',
    durationMs: 0,
    assertion: 'assert highway_bridge_overpass_is_non_planar == True',
    file: 'tests/test_topology.py'
  }
];

export const mockBenchmarks: TestingBenchmark[] = [
  {
    metric: 'APLS (Average Path Length Similarity)',
    groundTruthBaseline: '0.748 (RoadTracer Baseline)',
    nexusScore: '0.842 (NEXUS Graph-Tensor)',
    delta: '+9.4%',
    status: 'optimal'
  },
  {
    metric: 'Pixel IoU (Intersection over Union)',
    groundTruthBaseline: '0.712',
    nexusScore: '0.789',
    delta: '+7.7%',
    status: 'optimal'
  },
  {
    metric: 'Topological Disconnection Rate',
    groundTruthBaseline: '14.2% breaks / km',
    nexusScore: '4.8% breaks / km',
    delta: '-66.2%',
    status: 'optimal'
  },
  {
    metric: 'Tile Inference Latency (1024x1024)',
    groundTruthBaseline: '2,240ms (DQN Agent)',
    nexusScore: '142ms (ONNX TensorRT)',
    delta: '15.8x faster',
    status: 'optimal'
  },
  {
    metric: 'Test Suite Code Coverage',
    groundTruthBaseline: '80.0% Target',
    nexusScore: '48.0% Current',
    delta: '-32.0%',
    status: 'critical'
  }
];

export const mockGlobalNodes: GraphNode[] = [
  {
    id: 'g-om',
    label: 'OM Sharma',
    subtitle: 'Lead Engineer Universe',
    type: 'project',
    category: 'core',
    x: 0,
    y: 0,
    progress: 88,
    metrics: [{ label: 'Active Projects', value: '3' }, { label: 'Tech Stack', value: '12' }]
  },
  // Projects Hub
  { id: 'g-projects', label: 'Engineering Projects', subtitle: '3 Active · 1 Shipped', type: 'project', category: 'core', x: -280, y: -90 },
  { id: 'g-p1', label: 'Satellite Road Extraction', subtitle: 'FYP · 78%', type: 'project', category: 'core', x: -440, y: -160, progress: 78 },
  { id: 'g-p2', label: 'Orbit Research AI', subtitle: 'Research · 64%', type: 'research', category: 'research', x: -460, y: -40, progress: 64 },
  { id: 'g-p3', label: 'Drone Pathing ROS2', subtitle: 'Hackathon · 91%', type: 'project', category: 'tasks', x: -380, y: 70, progress: 91 },

  // Technologies Hub
  { id: 'g-tech', label: 'Core Technologies', subtitle: 'Production Stack', type: 'architecture', category: 'architecture', x: 260, y: -90 },
  { id: 'g-t1', label: 'PyTorch / CUDA', subtitle: 'Deep Learning & Tensors', type: 'architecture', category: 'architecture', x: 420, y: -180 },
  { id: 'g-t2', label: 'Next.js & TypeScript', subtitle: 'Client Command Center', type: 'architecture', category: 'code', x: 440, y: -70 },
  { id: 'g-t3', label: 'PostgreSQL + PostGIS', subtitle: 'Spatial Vector Engine', type: 'decision', category: 'governance', x: 380, y: 50 },

  // Research Hub
  { id: 'g-res', label: 'Research & Literature', subtitle: 'Preprints & Surveys', type: 'research', category: 'research', x: 0, y: 220 },
  { id: 'g-r1', label: 'Sat2Graph (ECCV 2020)', subtitle: 'Graph-Tensor Representation', type: 'research', category: 'research', x: -160, y: 310 },
  { id: 'g-r2', label: 'RoadTracer (CVPR 2018)', subtitle: 'Iterative Exploration Baselines', type: 'research', category: 'research', x: 160, y: 310 }
];

export const mockGlobalEdges: GraphEdge[] = [
  { id: 'ge-1', source: 'g-om', target: 'g-projects', label: 'builds', animated: true },
  { id: 'ge-2', source: 'g-om', target: 'g-tech', label: 'masters', animated: true },
  { id: 'ge-3', source: 'g-om', target: 'g-res', label: 'studies', animated: true },

  { id: 'ge-p1', source: 'g-projects', target: 'g-p1', label: 'active fyp' },
  { id: 'ge-p2', source: 'g-projects', target: 'g-p2', label: 'research agent' },
  { id: 'ge-p3', source: 'g-projects', target: 'g-p3', label: 'slam robotics' },

  { id: 'ge-t1', source: 'g-tech', target: 'g-t1', label: 'vision models' },
  { id: 'ge-t2', source: 'g-tech', target: 'g-t2', label: 'ui & streaming' },
  { id: 'ge-t3', source: 'g-tech', target: 'g-t3', label: 'spatial vector' },

  { id: 'ge-r1', source: 'g-res', target: 'g-r1', label: 'citations' },
  { id: 'ge-r2', source: 'g-res', target: 'g-r2', label: 'benchmarks' },

  // Cross connections
  { id: 'ge-cross1', source: 'g-p1', target: 'g-t1', label: 'powered by' },
  { id: 'ge-cross2', source: 'g-p1', target: 'g-t3', label: 'persisted in' },
  { id: 'ge-cross3', source: 'g-p1', target: 'g-r1', label: 'methodology' }
];

