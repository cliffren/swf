---
name: plan-next
description: "Read project state and design docs, then create the next batch of Linear issues for a project"
argument-hint: <project>

---

# Plan Next Issues

Analyze current project state and create the next batch of issues in Linear.

## Input

`$ARGUMENTS` — project name. Required. If not provided, ask.

## Workflow

1. **Load project state:**
   - Read `docs/design.md` — what needs to be built
   - Read `docs/roadmap.md` — current phase and what's been checked off
   - Read recent ADRs — any recent design decisions
   - Check Linear: completed issues (what's done), remaining Todo issues (what's planned)
   - Check git log: recent changes

2. **Identify the gap:**
   - What does the current phase require (from roadmap)?
   - What's already done?
   - What's already in Todo/In Progress?
   - What's missing?

3. **Suggest parallelizable work from later phases:**
   - Some work can start before its phase is "current":
     - Phase 5 的 Methods 初稿 → 核心算法确定后（Phase 1 末期）就能写
     - Phase 4 的部分图 → Phase 2 有结果后就能做
     - Phase 5 的 Introduction → 文献调研做过就能起草
   - Present these as optional: "以下任务可以提前做，比如等实验跑的间隙："
   - Mark these issues with their actual Phase milestone, not the current one

3. **Draft new issues:**
   - Each issue = half-day to two-day effort
   - Include: title, description with clear acceptance criteria, labels (type + executor), milestone
   - For dev tasks, reference the relevant section of design.md
   - For experiment tasks, specify inputs/outputs/success criteria

5. **Present to user:**
   ```
   ## 规划：MyProject Phase 2

   基于 design.md 和当前进度，建议新建以下 issues：

   1. [dev, agent:codex] 实现 XX 模块的 benchmark 脚本
      描述：...
   2. [experiment, manual] 在数据集 A 上运行 benchmark
      描述：...
   3. [figures, agent:claude] 生成性能对比图
      描述：...

   --- 可提前做（等实验间隙）---
   4. [writing, agent:claude] Methods 核心算法描述（Phase 5）
   5. [figures, agent:claude] 已有 benchmark 结果可视化（Phase 4）

   确认创建吗？可以修改后再创建。
   ```

6. **Create issues** after user confirms:
   - Create each issue in Linear with correct project, milestone, labels
   - Report created issues with IDs and links

## Status Usage

- **Todo** — confirmed work, will be done. All planned issues default to Todo.
- **Backlog** — tentative, not sure if needed. Use only when the issue is speculative:
  - "可能需要 ablation study，看 reviewer 要求再定"
  - "如果性能不够再考虑优化"
- **In Progress** — currently being worked on (set by `/swf:next`)
- Do NOT use Backlog as "queued but not started yet" — that's what Todo is for.

## Notes

- Never create issues without user confirmation
- If the current phase looks complete, suggest moving to the next phase
- Suggest breaking large tasks into sub-issues if they exceed 2 days

## Quota Check

When loading project state (step 1), count total non-archived issues from the results — no extra API call needed.
- If count + new issues > 200: warn "当前 X/250 issues，建议运行 /swf:archive"
- If count + new issues > 240: block and suggest archiving first
- Only plan the current Phase's issues, don't over-plan future Phases unless user asks
