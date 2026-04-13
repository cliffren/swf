---
name: idea
description: "Log a new research idea into the Ideas project with standard evaluation sub-issues"
argument-hint: <idea-name>
disable-model-invocation: true
---

# New Research Idea

Create a new research idea in the Linear Ideas project and set up standard evaluation sub-issues.

## Input

`$ARGUMENTS` — the name/title of the research idea. If not provided, ask the user.

## Workflow

1. **Create the main issue** in the Ideas project:
   - Title: `$ARGUMENTS`
   - Status: Backlog
   - Ask the user for a 1-2 sentence description of the idea

2. **Discuss and clarify the idea** with the user before creating sub-issues:
   - Ask one question at a time:
     - "这个想法要解决什么问题？"
     - "和现有方法/工具的区别是什么？"
     - "大致的技术思路是什么？"
     - "预期的贡献是什么？（方法创新？性能提升？新应用？）"
   - Summarize the discussion into a clear idea statement
   - Save to `~/Projects/ideas/<idea-slug>/idea-statement.md`
   - Update the main issue description with the idea statement

3. **Create evaluation sub-issues** under the main issue:

   | Sub-issue | Labels |
   |-----------|--------|
   | 文献调研：领域进展、找到 gap | `writing`, `agent:claude` |
   | 评估意义/创新性/可行性 | `writing`, `agent:claude` |
   | 技术选型 | `writing`, `agent:claude` |
   | 撰写 design.md 初稿 | `writing`, `agent:claude` |
   | 画框架图初版 | `figures`, `agent:claude` |

3. **Create local workspace:**
   - Create directory: `~/Projects/ideas/<idea-slug>/`
   - This is NOT a git repo, just a local workspace for evaluation drafts
   - Evaluation outputs go here as markdown files:
     ```
     ~/Projects/ideas/<idea-slug>/
     ├── idea-statement.md        ← 想法讨论梳理
     ├── literature-review.md     ← 文献调研
     ├── feasibility.md           ← 可行性评估
     ├── tech-selection.md        ← 技术选型
     ├── design.md                ← design.md 初稿
     └── framework.svg            ← 框架图
     ```
   - After each sub-issue is done, post a brief summary (3-5 sentences) as a Linear issue comment, with detailed content in the local file
   - When `/swf:promote` runs, it migrates `design.md` and `framework.svg` into the new repo

4. **Set up evaluation order:**
   - The 5 sub-issues have dependencies:
     ```
     ① 文献调研 → ② 评估可行性 → ③ 技术选型 → ④ design.md 初稿 → ⑤ 框架图
     ```
   - Note: idea discussion (step 2) happens BEFORE sub-issues are created, so it's not a sub-issue
   - Set ① to Todo, rest to Backlog
   - Use Linear's blocking relations: ② blocked by ①, ③ blocked by ②, etc.

4. **Guide next steps:**
   - Show the user what was created with links
   - Prompt:
     ```
     已创建想法和 5 个评估任务。建议按以下顺序推进：

     1. 文献调研 → 了解领域现状和 gap
     2. 评估可行性 → 基于文献判断值不值得做
     3. 技术选型 → 确定实现方案
     4. design.md → 写架构设计初稿
     5. 框架图 → 画方法总览图

     第一个任务"文献调研"已设为 Todo。
     要现在开始吗？我可以直接帮你做文献调研。
     ```
   - If user says yes, start working on the first sub-issue (mark In Progress, begin literature review)
   - If user says no, leave it for later

5. **Between sub-issues:**
   - After completing each sub-issue, automatically:
     - Mark it Done
     - Move the next sub-issue from Backlog to Todo
     - Ask: "下一步是 [next sub-issue]，要继续吗？"
   - After ② (可行性评估), add a gate check:
     - "基于文献和可行性分析，这个想法值得继续推进吗？"
     - If no → archive the idea, mark remaining sub-issues Canceled
     - If yes → continue to ③

6. **After all sub-issues Done:**
   - Prompt: "评估全部完成，要用 `/swf:promote` 建独立项目吗？"

## References

For Linear workspace config, see: `${CLAUDE_SKILL_DIR}/../reference/linear-config.md`
