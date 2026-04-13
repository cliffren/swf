---
name: adr
description: "Write a new Architecture Decision Record (ADR) with auto-numbering"
argument-hint: <title>
disable-model-invocation: true
---

# Write ADR

Create a new Architecture Decision Record in the project's `docs/adr/` directory.

## Input

`$ARGUMENTS` — the ADR title (e.g., "使用 sparse matrix 存储表达矩阵"). If not provided, ask.

## Workflow

1. **Auto-number:**
   - Scan `docs/adr/` for existing ADRs
   - Next number = max existing + 1, zero-padded to 3 digits

2. **Gather context:**
   - Ask the user:
     - What decision was made?
     - What alternatives were considered?
     - Why was this option chosen?
   - Read `docs/design.md` for related context

3. **Write the ADR:**

   File: `docs/adr/<NNN>-<slug>.md`

   ```markdown
   # ADR-<NNN>: <Title>

   **Date:** <today>
   **Status:** Accepted

   ## Context
   <What problem or question prompted this decision>

   ## Decision
   <What was decided>

   ## Alternatives Considered
   <Other options and why they were rejected>

   ## Consequences
   <What this means going forward — positive and negative>

   ## References
   <Links to issues, papers, docs if relevant>
   ```

4. **Commit:**
   - `git add docs/adr/<NNN>-<slug>.md`
   - Commit with message: `docs: add ADR-<NNN> <title>`

5. **Prompt for design update:**
   - Check if the decision affects `docs/design.md`
   - If yes: "这个决策影响到 design.md，要运行 `/swf:design` 更新吗？"

## Rules

- ADRs are append-only: never modify existing ADRs
- If a decision supersedes a previous one, note it in Context and update the old ADR's status to "Superseded by ADR-NNN"
- Must be run from within a project repo directory
