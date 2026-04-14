---
name: archive
description: "List Done/Canceled issues ready for archival and show quota usage. Archival itself must be done in Linear web UI (MCP limitation)."
argument-hint: "[project]"

---

# Archive Helper

List completed issues ready for archival and show quota usage. Due to Linear MCP limitations, actual archival must be done in the Linear web UI.

## Input

`$ARGUMENTS` — optional project name. If omitted, check across all projects.

## Workflow

1. **List archivable issues:**
   - Query Linear for issues with status Done or Canceled
   - If a project is specified, filter by that project
   - Show count and list titles

2. **Show quota:**
   - Count total active (non-archived) issues
   - Display: "当前 X/250 issues，其中 Y 个可归档"

3. **Guide user to archive in Linear web UI:**
   ```
   可归档的 issues（共 Y 个）：

   Done:
   - TAO-5: xxx
   - TAO-11: xxx

   Canceled:
   - TAO-1: xxx

   当前 X/250 活跃 issues，归档后剩余 Z/250。

   请在 Linear 网页上归档：
   1. 打开项目 → Filter → Status = Done
   2. 全选 → 右键 → Archive
   或者用快捷键选中后按 Backspace
   ```

## Notes

- Only list issues in Done or Canceled status
- Never suggest archiving In Progress or Todo issues
- Linear MCP currently does not support archive mutations — this skill is advisory only
- When Linear MCP adds archive support, upgrade this skill to execute directly
