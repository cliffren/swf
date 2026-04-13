---
name: import
description: "Import an existing research project into the SWF workflow: create Linear Project with milestones, add standard docs to existing repo"
disable-model-invocation: true
---

# Import Existing Project

Bring an existing research project into the SWF workflow without disrupting current work.

## Workflow

1. **Identify the project:**
   - Ask: repo 路径或 GitHub URL
   - Read the repo to understand current state:
     - `ls` top-level structure
     - Check for existing CLAUDE.md, README, docs/
     - `git log --oneline -10` recent history
     - Check language/framework from files

2. **Assess current phase:**
   - Analyze repo signals to infer phase:
     - 有 `src/` 但没有 `results/` 或实验记录 → 可能 Phase 1
     - 有 benchmark 脚本或结果文件 → 可能 Phase 2
     - 有 case study 分析脚本或结果 → 可能 Phase 3
     - 有 figure 组装脚本、publication-quality 图片 → 可能 Phase 4
     - 有 `docs/paper/`、论文 draft、.tex 文件 → 可能 Phase 5
     - 有 cover letter、submission 相关文件 → 可能 Phase 6+
     - 检查 git log 中的关键词（benchmark, figure, draft, revision 等）
   - Present your assessment with evidence:
     ```
     根据 repo 分析，我判断项目在 Phase 2（验证与 Benchmark）：
     - src/ 下核心代码已完成（最近 commit 多是 bugfix 而非新功能）
     - 有 benchmarks/ 目录和部分结果
     - 但还没有 case study 相关代码
     你觉得准确吗？
     ```
   - Let the user confirm or correct

3. **Gather project info:**
   - 项目简称（用于 Linear Project 名，通常和 repo 名一致）
   - 一句话描述
   - 技术栈
   - GitHub repo URL（从 `git remote -v` 自动获取）

4. **Create Linear Project:**
   - Name: project name
   - Team: Tao's Linear
   - Description:
     ```
     <one-line description>

     **GitHub:** <repo-url>
     **Tech Stack:** <tech stack>
     **Imported:** <date>
     **Imported at:** Phase <N>
     ```

5. **Create Phase Milestones** (read `${CLAUDE_SKILL_DIR}/../reference/phase-template.md`):
   - Create all Phase 1~8 milestones
   - Phases before current: leave empty (historical work not tracked)
   - Current phase: will populate with issues next

6. **Scaffold missing docs** (non-destructive — never overwrite existing files):

   | File | If exists | If missing |
   |------|-----------|------------|
   | CLAUDE.md | Keep as-is, suggest merging SWF conventions | Generate from template |
   | docs/roadmap.md | Keep as-is | Generate, mark current phase |
   | docs/design.md | Keep as-is | Create placeholder, remind user to fill |
   | docs/adr/ | Keep as-is | Create directory |
   | docs/experiments/benchmark/ | Keep as-is | Create directory |
   | docs/experiments/case/ | Keep as-is | Create directory |
   | docs/paper/ | Keep as-is | Create directory |
   | configs/ | Keep as-is | Create directory |
   | results/ | Keep as-is | Create directory |
   | .gitignore | Merge SWF entries (results/, *.h5ad, etc.) without deleting existing rules | Generate from template |

7. **Handle existing CLAUDE.md:**
   - If exists, show a diff of what SWF conventions would add:
     - 行为准则 section
     - 实验规范 section
     - 文档保护 section
     - 工作方式 section（Linear 关联）
   - Ask: "要合并这些内容到现有 CLAUDE.md 吗？还是保持原样？"
   - If merge: append new sections, don't touch existing content

8. **Seed current phase issues:**
   - Ask: "当前阶段有哪些正在做或待做的事？我来建成 Linear issues。"
   - For each item the user describes:
     - Create issue with appropriate labels (type + executor)
     - Assign to current phase milestone
   - If user says "暂时不建"，skip this step

9. **Commit and report:**
   - Commit new/modified files: `docs: integrate SWF workflow`
   - Show summary:
     ```
     ## 导入完成：<project-name>

     Linear Project: <url>
     当前阶段: Phase <N>
     新增文件: <list>
     修改文件: <list>
     保持不动: <list>

     下一步:
     - /swf:context  查看项目全貌
     - /swf:plan     规划当前阶段的 issues
     ```

## Safety

- NEVER overwrite existing files — only create missing ones or merge with confirmation
- NEVER delete or reorganize existing code or directory structure
- NEVER move existing docs to new locations without asking
- Respect the project's existing conventions — SWF adapts to the project, not the other way around
