---
name: update-design
description: "Review recent ADRs, experiments, and code changes, then update docs/design.md accordingly"
disable-model-invocation: true
---

# Update Design Document

Review recent changes and update `docs/design.md` to keep it current.

## Workflow

1. **Gather what changed:**
   - Read all ADRs in `docs/adr/` — identify any not yet reflected in design.md
   - Read experiment results in `docs/experiments/` — any findings that change the design
   - Check recent git history for architectural changes
   - Read current `docs/design.md`

2. **Identify deltas:**
   - List specific sections of design.md that need updating
   - For each delta, note the source (which ADR, experiment, or commit)

3. **Present changes to user:**
   ```
   ## design.md 需要更新的部分

   1. **Section: 数据存储层**
      原因：ADR-003 决定使用 sparse matrix
      变更：将 dense array 描述改为 sparse matrix，更新相关 API

   2. **Section: 性能估算**
      原因：实验 exp-002 显示内存占用低于预期
      变更：更新内存估算数据

   确认更新吗？
   ```

4. **Apply changes** after user confirms:
   - Edit `docs/design.md` with the identified changes
   - Preserve the document's overall structure and style
   - Add a changelog entry at the bottom if one exists

5. **Commit:**
   - `git add docs/design.md`
   - Commit with message: `docs: update design.md (based on ADR-NNN, exp-NNN)`

## Rules

- NEVER modify design.md without user confirmation
- NEVER delete existing content without explicit approval — prefer updating or annotating
- If there are no changes needed, say so: "design.md 已是最新，无需更新"
- This is the ONLY approved way to modify design.md (per CLAUDE.md conventions)
