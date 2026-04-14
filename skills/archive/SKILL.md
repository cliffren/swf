---
name: archive
description: "Export Done/Canceled issues to Archive project as Documents, then guide user to delete originals to free quota"
argument-hint: "[project]"

---

# Archive Issues

Export completed issues to the Archive project as Documents, then guide user to delete originals in Linear web UI to free up the 250 issue quota.

## Input

`$ARGUMENTS` — optional project name. If omitted, archive across all projects.

## Workflow

1. **Query archivable issues:**
   - List all issues with status Done or Canceled (excluding Archive project itself)
   - If a project is specified, filter by that project
   - Group by project

2. **Show quota and preview:**
   ```
   当前 X/250 活跃 issues，其中 Y 个可归档：

   spaharmony (3):
   - TAO-11: 发布 v1 [Done, 2026-04-14]
   - ...

   Ideas (5):
   - TAO-5: Spatial Harmony 评估 [Done, 2026-04-14]
   - ...

   归档后释放 Y 个额度，剩余 Z/250。
   确认归档吗？
   ```

3. **Export to Archive project Document (按月合并):**
   - Check if a Document titled `归档 YYYY-MM` already exists in Archive project:
     - Use `list_documents` with `project: "Archive"` and search for current month title
   - If exists: use `update_document` to append new entries
   - If not: use `create_document` with `project: "Archive"`, titled `归档 YYYY-MM`
   - Content format: one line per issue, grouped by project and phase, minimal info only:
     ```markdown
     # 归档 2026-04

     ## spaharmony — Phase 1
     - [Done] TAO-11: 发布 v1：整理文档 + 发布 PyPI (2026-04-14)
     - [Done] TAO-14: v2: Harmony 主循环迁移至 CuPy (2026-04-18)

     ## Ideas
     - [Done] TAO-5: Spatial Harmony 评估 (2026-04-14)
     - [Canceled] TAO-99: 某个放弃的想法 (2026-04-10)
     ```
   - Only record: status, issue ID, title, completion date
   - Do NOT fetch descriptions, comments, or labels — saves token and these info live in git history

4. **Guide user to delete originals:**
   ```
   归档文档已创建：Archive 项目 → "归档 2026-04-14"

   请在 Linear 网页上删除已归档的 issues：
   1. 打开对应项目
   2. Filter → Status = Done
   3. 全选 → 右键 → Delete issue
   
   或逐个：选中 issue → 右键 → Delete issue

   ⚠️ 删除不可恢复，但数据已保存在 Archive 项目的文档中。
   ```

5. **After user confirms deletion:**
   - Re-check quota: "当前 Z/250 活跃 issues"

## Notes

- Never delete issues via MCP (Linear MCP doesn't support it anyway)
- Always export BEFORE telling user to delete
- Only record status, issue ID, title, and completion date — descriptions, comments, labels live in git history
- One Document per month, append if archiving multiple times in the same month
- The Archive project itself should never have issues, only Documents
