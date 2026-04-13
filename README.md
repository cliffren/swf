# SWF — Scientific Workflow

[中文文档](README_zh.md)

A Claude Code plugin for managing multi-project research workflows. Covers the full lifecycle from initial idea to published paper, with Linear as the task coordination hub.

## Installation

```bash
# Prerequisite: connect Linear MCP
claude mcp add --transport http linear-server https://mcp.linear.app/mcp -s user

# Prerequisite: ensure GitHub CLI is authenticated
gh auth status

# Install the plugin
claude plugin install /path/to/swf
```

## Core Philosophy

**A research project's lifecycle:**

```
Idea → Evaluate → Establish → Develop → Validate → Deep Analysis → Figures → Write Paper → Submit → Publish
```

**What SWF does:** Manages *what to do* — which project, which phase, which task, when to do it.

**What SWF doesn't do:** Doesn't manage *how to write code* — that's handled by development plugins like Superpowers.

**How they work together:**

```
/swf:next       → Pick up a task from Linear
                    ↓
                  Superpowers handles development (brainstorm → plan → TDD → review)
                    ↓
/swf:done       → Record completion, mark Done
```

## Project Lifecycle

### Phase 0: Ideas Funnel

All ideas go through the Ideas Project for evaluation before becoming independent projects.

```
/swf:idea "Gene Regulatory Network Inference"
│  → Creates main issue in Ideas Project
│  → Auto-creates 5 evaluation sub-issues:
│     Literature review, feasibility, tech selection, design.md draft, architecture diagram
│
├─ Evaluation passes → /swf:promote
│     → Interactive: select idea, choose project name
│     → Creates Linear Project + Phase 1~8 Milestones
│     → Creates GitHub repo + standard directory structure + CLAUDE.md
│     → Archives the Ideas issue
│
└─ Evaluation fails → Archive with notes
```

For existing projects, use `/swf:import`: analyzes the repo to infer current phase, creates Linear Project, scaffolds missing docs without touching existing files.

### Phase 1~8: Project Progression

Each project has 8 phases, mapped to Linear Project Milestones:

| Phase | Stage | Primary Work |
|-------|-------|-------------|
| 1 | Data Preparation & Development | Write code, build systems |
| 2 | Validation & Benchmark | Standardized comparisons against baselines |
| 3 | Deep Validation | Case studies / Feature demonstrations |
| 4 | Figure Assembly | Publication-quality figures |
| 5 | Paper Writing | Draft by section |
| 6 | Submission Preparation | Declarations, materials, checklists |
| 7 | Post-Submission | Peer review, revision |
| 8 | Publication | Proofing, promotion |

**Phases are not strictly linear.** You can draft Methods as early as late Phase 1, and create figures during experiment downtime. `/swf:plan` proactively suggests tasks that can be started ahead of schedule.

## All Skills (14)

### Project Lifecycle

| Command | Description |
|---------|-------------|
| `/swf:idea <name>` | Log a new idea with evaluation sub-issues |
| `/swf:promote` | Interactively select an idea, create independent Project + repo |
| `/swf:import` | Import an existing project, infer phase from repo, scaffold missing docs |
| `/swf:archive [project]` | Clean up Done issues, show quota usage (free tier: 250 limit) |

### Task Execution

| Command | Description |
|---------|-------------|
| `/swf:context` | Read CLAUDE.md + roadmap + design.md + Linear + git log, summarize project state |
| `/swf:next [label]` | Pick up next Todo issue from Linear, mark In Progress, start working |
| `/swf:done [issue-id]` | Write completion summary comment, mark Done, suggest next steps |

### Planning & Monitoring

| Command | Description |
|---------|-------------|
| `/swf:status [project]` | Global dashboard or single project detail (phase, issue counts) |
| `/swf:daily [type-label]` | Cross-project daily tasks, filterable by dev/writing/figures etc. |
| `/swf:plan <project>` | Read design.md + current progress, plan current and parallelizable issues |

### Experiment Management

| Command | Description |
|---------|-------------|
| `/swf:exp new <title>` | Create experiment record (benchmark or case), auto-capture environment |
| `/swf:exp log <id>` | Record results and conclusions for a completed experiment |
| `/swf:exp compare [id...]` | Side-by-side comparison table of multiple experiments |
| `/swf:exp collect` | Summarize all results, map to paper figures, identify gaps |

### Documentation

| Command | Description |
|---------|-------------|
| `/swf:adr <title>` | Write Architecture Decision Record (auto-numbered, append-only) |
| `/swf:design` | Update design.md based on recent ADRs/experiments/code changes |
| `/swf:paper [section]` | Generate paper outline or draft a specific section |
| `/swf:paper declarations` | Auto-collect author contributions, funding, data/code availability |
| `/swf:paper checklist` | Pre-submission checklist (based on Nature-series requirements) |

## Experiment Management

Experiments are stored separately by type with dedicated templates:

```
docs/experiments/
├── benchmark/              ← Phase 2: Standardized comparisons
│   └── bench-001-xxx.md       Fair comparison, statistical significance, reproducibility
└── case/                   ← Phase 3: Deep analysis
    └── case-001-xxx.md        Biological context, narrative, domain insights
```

| | Benchmark | Case Study |
|--|-----------|------------|
| Prefix | `bench-NNN` | `case-NNN` |
| Core Question | Better than baselines? | What insights can we find? |
| Unique Fields | Comparison table, fairness controls | Biological background, storyline |
| Result Format | Mean +/- std | Key findings + narrative |

Experiment records go into git (`docs/experiments/`), configs go into git (`configs/`), outputs do NOT go into git (`results/`).

## Paper Writing

### Sections & Timing

| Order | Section | Command | Earliest Start | Data Source |
|-------|---------|---------|---------------|------------|
| 1 | Methods — Core Design | `/swf:paper methods-core` | Late Phase 1 | design.md |
| 2 | Results — Benchmark | `/swf:paper results-benchmark` | After Phase 2 | Experiment records |
| 3 | Results — Case Study | `/swf:paper results-case` | After Phase 3 | Experiment records |
| 4 | Methods — Details | `/swf:paper methods-detail` | After Phase 2 | design.md + ADRs + configs |
| 5 | Introduction | `/swf:paper intro` | Phase 2~3 gaps | Literature review |
| 6 | Discussion | `/swf:paper discussion` | After Results | All experiments |
| 7 | Abstract | `/swf:paper abstract` | Last | Full manuscript |
| 8 | Supplementary | `/swf:paper supp` | Ongoing | Supplementary materials |

### Submission Preparation

`/swf:paper declarations` auto-collects:
- Author contributions (specific contribution per author)
- Competing interests, Funding (grant names + numbers)
- Data/Code availability (repo URL + license + version)
- Ethics approvals, Acknowledgments

`/swf:paper checklist` verifies:
- Completeness of each main text section
- Figure legends define error bars and n values
- Statistical tests specify one/two-tailed
- Data deposited in public repositories
- Cover letter, Reporting summary, and other submission files

## Daily Usage

### Starting Your Day

```bash
# Cross-project daily tasks
/swf:daily

# Filter by type (Monday = writing day, Wednesday = experiments...)
/swf:daily writing
```

### Working on a Project

```bash
cd ~/Projects/RegOracle
/swf:context              # Where is the project? What's in progress?
/swf:next dev             # Pick up a dev task
# ...use Superpowers for development...
/swf:done                 # Complete, record, see what's next
```

### Periodic Operations

```bash
/swf:plan RegOracle       # Plan next batch of issues
/swf:adr "Switch to sparse matrix"  # Record architecture decision
/swf:design               # Sync design.md
/swf:status               # Global progress dashboard
/swf:archive              # Clean up Done issues
```

### Multi-Project Parallel Work

```
/swf:status
→ | Project   | Phase   | In Progress | Todo |
  | RegOracle | Phase 3 | 1           | 3    |
  | PRAI      | Phase 1 | 2           | 5    |
  | SEAFA     | Phase 5 | 0           | 4    |
```

`/swf:daily` aggregates tasks by label across projects, reducing context switching.

## Standard Repo Structure

Generated by `/swf:promote` or scaffolded by `/swf:import`:

```
project-root/
├── CLAUDE.md                     # Agent working guide
├── .gitignore                    # Excludes results/ and data files
├── docs/
│   ├── roadmap.md                # Roadmap, marks current Phase
│   ├── design.md                 # Architecture design (modify only via /swf:design)
│   ├── adr/                      # Architecture Decision Records (append-only)
│   ├── experiments/
│   │   ├── benchmark/            # Phase 2 experiment records
│   │   └── case/                 # Phase 3 experiment records
│   └── paper/                    # Paper outline and section drafts
├── src/
├── tests/
├── configs/                      # Experiment config files (in git)
└── results/                      # Experiment outputs (NOT in git)
```

## Linear Configuration

### Structure

- **Ideas Project** — Evaluation funnel (global, persistent)
- **Independent Projects** — One per research project, with Phase 1~8 Milestones
- GitHub repo URL recorded in Project description

### Label System

```
type (task type)              executor (who does it)
├── dev        coding         ├── agent:claude   Claude Code
├── experiment  experiments   ├── agent:codex    Codex
├── writing    docs/paper     └── manual         requires human
├── figures    charts/plots
└── admin      submissions/comms
```

### Status Flow

`Backlog → Todo → In Progress → Done`

## Dependencies

- **Linear MCP** — `claude mcp add --transport http linear-server https://mcp.linear.app/mcp -s user`
- **GitHub CLI** — `gh`, for repo creation
- **Git** — version control
- **Superpowers plugin** (recommended) — development execution workflow
