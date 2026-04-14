# SWF — Scientific Workflow

[中文文档](README_zh.md)

A Claude Code plugin for managing multi-project research workflows. Covers the full lifecycle from initial idea to published paper, with Linear as the task coordination hub.

## Installation

**Install as a global (user-scope) plugin.** SWF commands operate across projects (`/swf:dashboard`, `/swf:daily`, `/swf:idea`, etc.), so they need to be available in every directory. Installing as a project plugin would limit access to a single repo.

```bash
# Prerequisite: connect Linear MCP
claude mcp add --transport http linear-server https://mcp.linear.app/mcp -s user

# Prerequisite: ensure GitHub CLI is authenticated
gh auth status

# 1. Add the marketplace
/plugin marketplace add cliffren/swf

# 2. Install the plugin
/plugin install swf@cliffren-swf

# 3. Reload
/reload-plugins
```

Steps 1-3 are run inside the Claude Code prompt (not bash). After installation, run `/swf:init-linear` to set up your Linear workspace.

## Core Philosophy

**A research project's lifecycle:**

```
Idea → Evaluate → Establish → Develop → Validate → Deep Analysis → Figures → Write Paper → Submit → Publish
```

**What SWF does:** Manages *what to do* — which project, which phase, which task, when to do it.

**What SWF doesn't do:** Doesn't manage *how to write code* — that's handled by development plugins like Superpowers.

**Zero-handoff between sessions:**

```
Session A: work on task → /swf:done → summary in Linear, code in git → close
Session B: /swf:load → full context restored from Linear + git → continue
```

No manual notes, no handoff documents. State lives in Linear and git, not in session memory.

**How SWF and Superpowers work together:**

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
/swf:idea "Scalable Single-Cell Analysis"
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

## All Skills (16)

Skills are divided into two scopes:

- **Global** — run from anywhere, operate across projects via Linear
- **Project** — run from inside a project repo (`cd ~/Projects/my-project`), operate on local files + that project's Linear issues

### Global Commands (run from anywhere)

| Command | Description |
|---------|-------------|
| `/swf:init-linear` | One-time Linear workspace setup: labels, Ideas project, Archive project |
| `/swf:idea <name>` | Log a new idea into the Ideas project with evaluation sub-issues |
| `/swf:promote` | Graduate an evaluated idea into an independent Project + repo |
| `/swf:import` | Import an existing project into the SWF workflow |
| `/swf:dashboard [project]` | Cross-project dashboard, or single project detail |
| `/swf:daily [type-label]` | Today's tasks across all projects, filterable by label |
| `/swf:archive [project]` | Show quota usage and archive Done/Canceled issues |

> **Note on archiving:** Linear's free plan limits 250 active issues. Since Linear MCP doesn't support archive or delete, `/swf:archive` exports Done/Canceled issues as Documents into the Archive project, then guides you to manually delete the originals in Linear's web UI to free up quota.

### Project Commands (run from inside a project repo)

**Task Execution:**

| Command | Description |
|---------|-------------|
| `/swf:load` | Read CLAUDE.md + design.md + Linear + git log, summarize current state |
| `/swf:next [label]` | Pick up next Todo issue, mark In Progress, start working |
| `/swf:done [issue-id]` | Write completion summary, mark Done, suggest next steps |
| `/swf:plan-next <project>` | Plan next batch of issues from design docs and current progress |

**Experiments:**

| Command | Description |
|---------|-------------|
| `/swf:exp new <title>` | Create experiment record (benchmark or case), auto-capture environment |
| `/swf:exp log <id>` | Record results and conclusions for a completed experiment |
| `/swf:exp compare [id...]` | Side-by-side comparison table of multiple experiments |
| `/swf:exp collect` | Summarize all results, map to paper figures, identify gaps |

**Figures:**

| Command | Description |
|---------|-------------|
| `/swf:fig framework <desc>` | Create framework diagram via draw.io MCP (or Figma MCP) |
| `/swf:fig plot <desc>` | Write matplotlib/seaborn code to generate data plots |
| `/swf:fig assemble` | Inventory sub-figures, create assembly tasks in Linear, generate legends |
| `/swf:fig legend [fig-number]` | Write figure legend (Nature-style, validates error bars/n values/stats) |
| `/swf:fig list` | List all figures with status |

**Documentation:**

| Command | Description |
|---------|-------------|
| `/swf:adr <title>` | Write Architecture Decision Record (auto-numbered, append-only) |
| `/swf:update-design` | Update design.md based on recent ADRs/experiments/code changes |
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

### Agent Automation Patterns

**Batch execution (recommended):**
```bash
# You plan and review, agent executes
/swf:plan-next my-project          # Plan a batch of issues
# Review the plan, confirm
"Do all of these tasks"             # Agent runs through them sequentially
# Come back later, review results
```

Agent picks up each issue, executes it, writes a completion summary comment on Linear, and moves to the next. You can leave it running overnight — every task will have a comment recording what was done.

**Why this works:** Each issue has clear acceptance criteria and references to design.md, so the agent can work independently without asking clarifying questions.

**Full automation (possible but not recommended):**
```bash
/loop "Check current project: if there are Todo issues, pick up one or a batch with /swf:next and do them. If none, run /swf:plan-next to plan the next batch, then continue."
```

This can work, but you lose control over design decisions, phase transitions, and experiment interpretation. The sweet spot is: **human controls direction and pace, agent handles batch execution.**

### Starting Your Day (global — from any directory)

```bash
/swf:dashboard               # Cross-project progress dashboard
/swf:daily                # What should I work on today?
/swf:daily writing        # Monday = writing day, filter by label
```

### Working on a Project (project — cd into repo first)

```bash
cd ~/Projects/my-project
/swf:context              # Where is the project? What's in progress?
/swf:next dev             # Pick up a dev task
# ...use Superpowers for development...
/swf:done                 # Complete, record, see what's next
```

### Periodic Operations

```bash
# Global
/swf:idea "new research direction"   # Log a new idea
/swf:dashboard               # Check all projects
/swf:archive              # Clean up Done issues

# Project (from inside repo)
/swf:plan-next my-project      # Plan next batch of issues
/swf:adr "Switch to sparse matrix"  # Record architecture decision
/swf:update-design               # Sync design.md
```

### Multi-Project Parallel Work

```
/swf:dashboard
→ | Project   | Phase   | In Progress | Todo |
  | Project A | Phase 3 | 1           | 3    |
  | Project B | Phase 1 | 2           | 5    |
  | Project C | Phase 5 | 0           | 4    |
```

`/swf:daily` aggregates tasks by label across projects, reducing context switching.

## Standard Repo Structure

Generated by `/swf:promote` or scaffolded by `/swf:import`:

```
project-root/
├── CLAUDE.md                     # Agent working guide
├── .gitignore                    # Excludes results/ and data files
├── docs/
│   ├── design.md                 # Architecture design (modify only via /swf:update-design)
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

### Why Linear

Linear is not just a task database — it's an interactive control center:

- **Visual project and task boards** — see all issues across projects at a glance
- **Freely edit and create issues** — add tasks, adjust priorities, rewrite descriptions anytime from the web or mobile app
- **Dispatch tasks to agents directly** — send issues to Claude Code or other coding tools from Linear's UI
- **Cross-device access** — web, desktop, and mobile apps, all synced

SWF commands and Linear's own UI are complementary entry points to the same workflow. There's more to explore in [Linear's documentation](https://linear.app/docs).

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
- **draw.io MCP** (recommended) — `claude mcp add -s user drawio -- npx @next-ai-drawio/mcp-server@latest`
- **Figma MCP** (optional) — available via Claude Code's built-in Figma integration
