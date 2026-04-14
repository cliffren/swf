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
   - Status: Todo
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

   | Sub-issue | Labels | Output template |
   |-----------|--------|----------------|
   | 文献调研：领域进展、找到 gap | `writing`, `agent:claude` | see below |
   | 评估意义/创新性/可行性 | `writing`, `agent:claude` | copy key insights into literature-review.md, keep feasibility.md as-is |
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
   - The sub-issues have dependencies:
     ```
     ① 文献调研 → ② 评估可行性 → ③ 技术选型 → ④ design.md 初稿
     ⑤ 框架图（独立，不阻塞，Backlog）
     ```
   - Note: idea discussion (step 2) happens BEFORE sub-issues are created, so it's not a sub-issue
   - ①~④ set to Todo, with blocking relations: ② blocked by ①, ③ blocked by ②, ④ blocked by ③
   - ⑤ 框架图 set to Backlog — optional during evaluation, can be done if time permits or deferred to after promote

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

5. **Between sub-issues — review and confirm before marking Done:**
   - After drafting each sub-issue's deliverable, DO NOT mark Done immediately. Instead:
     1. Present the result to the user (summary + key findings/decisions)
     2. Ask for feedback: "你觉得这个分析有什么需要补充或调整的吗？"
     3. Iterate based on user input — user may have domain knowledge, different perspectives, or additional requirements
     4. Only mark Done after user explicitly confirms: "可以" / "没问题" / "通过"
     5. Update the local file with the confirmed version
     6. Post brief summary to Linear issue comment
     7. Unblock the next sub-issue
     8. Ask: "下一步是 [next sub-issue]，要继续吗？"

   - After ② (可行性评估), add a gate check:
     - "基于文献和可行性分析，这个想法值得继续推进吗？"
     - If no → archive the idea, mark remaining sub-issues Canceled
     - If yes → continue to ③

6. **After ①~④ all Done:**
   - Check if ⑤ 框架图 is still in Backlog
   - Ask: "核心评估已完成。要现在画框架图吗？还是直接进入 promote？"
     - If user wants to draw → move ⑤ to Todo, start working on it. After ⑤ Done, mark main issue Done and prompt promote
     - If user wants to skip → mark ⑤ Canceled, mark main issue Done, prompt: "要用 `/swf:promote` 建独立项目吗？"
   - If ⑤ was already Done (user did it earlier) → mark main issue Done, prompt promote

## Literature Review Template

`literature-review.md` should follow this structure:

```markdown
# 文献调研：<idea name>

## 领域现状
<2-3 段概述当前领域的主要方法和进展>

## 关键文献

1. Smith et al. (2024) "Title" *Journal*. DOI: 10.xxxx/xxx
   - 做了什么：...
   - 和我们的关系：...

2. Zhang et al. (2023) "Title" *Journal*. DOI: 10.xxxx/xxx
   - 做了什么：...
   - 和我们的关系：...

(list 10-20 key papers)

## Gap 分析
<现有方法的不足、未解决的问题>

## 我们的机会
<这个想法如何填补 gap，和已有工作的区别>

## 意义与可行性（从可行性评估合并）
<完成可行性评估后，将关键观点合并到此处>
- 研究意义：...
- 创新性：...
- 可行性判断：...
- 潜在挑战：...
```

Notes:
- Use `(Smith et al., 2024)` or `[1]` inline citations in the text
- Always include DOI for each paper — makes it easy to import into EndNote later
- This is for evaluation, not publication — informal style is fine
- The citation list here feeds directly into Introduction writing in Phase 5

## References

For Linear workspace config, see: `${CLAUDE_SKILL_DIR}/../reference/linear-config.md`
