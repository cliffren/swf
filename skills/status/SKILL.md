---
name: status
description: "Dashboard view of all projects or a single project: current phase, issue counts, blockers"
argument-hint: "[project]"
disable-model-invocation: true
---

# Project Status Dashboard

Show a high-level overview of all research projects, or drill into a specific one.

## Input

`$ARGUMENTS` — optional project name. If omitted, show all projects.

## Workflow

### All projects (no argument)

1. **List all Linear projects** (exclude Ideas project from main list)
2. **For each project**, show:
   - Current phase (based on which milestone has In Progress issues)
   - Issue counts: In Progress / Todo / Done
   - Any blockers or overdue items
3. **Show Ideas pipeline** separately:
   - Number of ideas being evaluated
   - Any ready to promote

4. **Output format:**
   ```
   ## 项目总览

   | 项目 | 当前阶段 | 进行中 | 待办 | 已完成 |
   |------|---------|--------|------|--------|
   | RegOracle | Phase 2 | 2 | 5 | 12 |
   | PRAI | Phase 1 | 1 | 3 | 4 |

   ## Ideas 管道
   - 3 个想法评估中
   - 1 个评估完成，可 promote
   ```

### Single project (with argument)

1. **Fetch project details** from Linear
2. **Show by milestone:**
   ```
   ## RegOracle — Phase 2: 验证与Benchmark

   ### Phase 1 — 数据准备与开发 (Done)
   ✓ 5/5 issues completed

   ### Phase 2 — 验证与Benchmark (Current)
   - [In Progress] REG-8: 真实数据 benchmark (agent:claude)
   - [In Progress] REG-9: 性能评估 (manual)
   - [Todo] REG-10: 子图整理 (figures)
   - [Todo] REG-11: 数据归档 (admin)

   ### Phase 3~8: 未开始
   ```
