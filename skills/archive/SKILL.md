---
name: archive
description: "Show quota usage and list issues eligible for archival. Linear auto-archives Done issues after 1 month."
argument-hint: "[project]"

---

# Archive Status

Show issue quota usage and remind how Linear's auto-archive works.

## Input

`$ARGUMENTS` — optional project name. If omitted, check across all projects.

## Workflow

1. **Show quota:**
   - Count total active (non-archived) issues across all projects
   - Count issues by status: Todo / In Progress / Done / Canceled
   - Display: "当前 X/250 活跃 issues"

2. **List archivable issues (Done/Canceled):**
   - These will be auto-archived by Linear, no manual action needed
   - Show count and titles grouped by project

3. **Report:**
   ```
   ## Issue 额度

   活跃 issues: X/250

   | 状态 | 数量 |
   |------|------|
   | Todo | X |
   | In Progress | X |
   | Done | X（将在 1 个月后自动归档）|
   | Canceled | X（将在 1 个月后自动归档）|

   ## 提醒
   Linear 免费版限制 250 个未归档 issue。
   Done/Canceled 的 issue 会在 1 个月后自动归档，归档后不占额度。
   自动归档周期可在 Team Settings → Issue statuses & automations 调整（最短 1 个月）。
   ```
