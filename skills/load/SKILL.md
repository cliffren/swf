---
name: load
description: "Load project context for a new session: read CLAUDE.md, roadmap, design.md, Linear issues, and recent git history to quickly get up to speed"

---

# Load Project Context

Read key project files and Linear state to build a complete picture of where the project stands.

## Workflow

1. **Read project files** (skip if file doesn't exist):
   - `CLAUDE.md` — 工作方式和规范
   - `docs/roadmap.md` — 当前阶段和进度
   - `docs/design.md` — 架构设计

2. **Check Linear:**
   - Find the Linear project matching the current repo name
   - List In Progress issues (who's doing what right now)
   - List Todo issues (what's queued up next)
   - Note current milestone/phase

3. **Check git history:**
   - Last 5 commits (`git log --oneline -5`)
   - Any uncommitted changes (`git status --short`)

4. **Summarize to user:**

   ```
   ## 项目：<name>
   ## 当前阶段：Phase X — <phase-name>

   ### 正在进行
   - <issue-id>: <title> [<labels>]

   ### 待办
   - <issue-id>: <title> [<labels>]

   ### 最近改动
   - <commit messages>

   ### 建议下一步
   <based on roadmap and current state>
   ```

## Notes

- This skill is read-only — it never modifies anything
- Must be run from within a project repo directory
- If no Linear project matches, still show local file info and note "未找到对应 Linear 项目"
