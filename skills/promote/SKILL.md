---
name: promote
description: "Graduate an evaluated idea into a full project: create Linear Project with Phase milestones, GitHub repo, and standard directory structure"

---

# Promote Idea to Project

Graduate an idea from the Ideas project into a full independent project.

## Workflow

1. **Select the idea:**
   - List open (non-archived) issues in the Ideas project
   - Show evaluation progress for each (e.g., "3/5 评估 sub-issues 完成")
   - Let the user pick by number
   - Read the selected issue for context: title, description, any design.md draft

2. **Confirm project details:**
   - Ask for: 项目简称（用于 repo 名和 Linear Project 名）, one-line description, tech stack
   - Project path defaults to `~/Projects/<project-name>`, ask user to confirm or change
   - Show a confirmation summary before proceeding

3. **Create Linear Project:**
   - Name: the project name
   - Team: Tao's Linear
   - Description 包含（创建 repo 后回填）:
     ```
     <one-line description>

     **Repo:** <GitHub URL if remote, or local path if local-only>
     **Tech Stack:** <tech stack>
     **Created:** <date>
     ```

4. **Create Phase Milestones** (read `${CLAUDE_SKILL_DIR}/../reference/phase-template.md`):
   - Phase 1 — 数据准备与开发
   - Phase 2 — 验证与Benchmark
   - Phase 3 — 深入验证
   - Phase 4 — Figure 组装
   - Phase 5 — 论文写作
   - Phase 6 — 投稿准备
   - Phase 7 — 投稿后
   - Phase 8 — 发表

5. **Create repo:**
   - Ask user: "要在 GitHub 上创建远程仓库，还是只在本地用 git 追踪？"
   - **GitHub 远程仓库：**
     ```bash
     gh repo create <project-name> --private --description "<one-line description>"
     ```
     Clone the repo, then proceed to step 6
   - **本地 git 仓库：**
     ```bash
     mkdir ~/Projects/<project-name>
     cd ~/Projects/<project-name>
     git init
     ```
     Proceed to step 6 (skip push at the end)

6. **Initialize repo structure** (read `${CLAUDE_SKILL_DIR}/../reference/repo-structure.md`):
   - Create standard directory structure
   - Generate CLAUDE.md from template (`${CLAUDE_SKILL_DIR}/../reference/claude-md-template.md`)
   - In CLAUDE.md, set "当前阶段：Phase 1"
   - Copy (not move) files from Ideas workspace (`~/Projects/ideas/<idea-slug>/`):
     - `design.md` → `docs/design.md`
     - `framework.svg` → `docs/paper/figures/fig1-framework.svg` (if exists)
     - `literature-review.md` → `docs/literature-review.md` (if exists)
   - Keep the original Ideas workspace intact for reference
   - Commit (and push if remote repo)

7. **Archive the Ideas issue:**
   - Add a comment: "Promoted to project: <project-name>. Linear: <project-url>, GitHub: <repo-url>"
   - Mark as Done

8. **Report** — show the user all created resources with links

## Safety

- ALWAYS confirm with user before creating repo and project
- NEVER create a public repo without explicit user consent
