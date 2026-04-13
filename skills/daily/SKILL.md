---
name: daily
description: "Show today's tasks across all projects, optionally filtered by type label (dev, writing, figures, experiment, admin)"
argument-hint: "[type-label]"
disable-model-invocation: true
---

# Daily Task View

Show what to work on today, across all projects.

## Input

`$ARGUMENTS` — optional type label filter (e.g., `writing`, `dev`, `figures`). If omitted, show all.

## Workflow

1. **Query Linear:**
   - Fetch all Todo and In Progress issues assigned to "me"
   - If a type label is provided, filter by it
   - Group by project

2. **Output format:**
   ```
   ## 今日待办 (2026-04-13)
   [过滤: writing]

   ### In Progress — 继续做
   - PRJ-8: 撰写 Results 初稿 (Project A, Phase 5)
   - PRJ-3: design.md 初稿 (Ideas)

   ### Todo — 可以开始
   - PRJ-10: Introduction 初稿 (Project A, Phase 5)
   - PRJ-5: 文献综述 (Project B, Phase 1)

   共 4 个任务
   ```

3. **Suggest focus:**
   - If there are In Progress tasks, suggest finishing those first
   - If filtered by label, note how many other labels have pending tasks

## Batch Day Reference

Based on the workflow design, suggest focus areas by day:
- 周一：`writing` 任务
- 周三：`figures` / `experiment` 任务
- 周五：`admin` 任务
- 其他时间：`dev` 任务

This is a suggestion, not a constraint.
