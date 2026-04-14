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
   - Content format, grouped by project, each entry with date:
     ```markdown
     # 归档 2026-04

     ## spaharmony

     ### TAO-11: 发布 v1：整理文档 + 发布 PyPI
     - **Status:** Done
     - **Completed:** 2026-04-14
     - **Labels:** dev, manual
     - **Milestone:** Phase 1 — 数据准备与开发
     - **Description:**
       整理现有 v1 代码...
     - **Comments:**
       (include all comments if any)

     ---

     ### TAO-XX: ...

     ## Ideas

     ### TAO-5: Spatial Harmony 评估
     - ...
     ```

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
- Include full issue content in the Document: title, description, labels, milestone, comments, completion date
- One Document per month, append if archiving multiple times in the same month
- The Archive project itself should never have issues, only Documents
