---
name: next
description: "Pick up the next Todo issue from Linear, mark it In Progress, and start working on it"
argument-hint: "[label]"

---

# Pick Up Next Task

Fetch the next available Todo issue from Linear and start executing it.

## Input

`$ARGUMENTS` — optional label filter (e.g., `dev`, `writing`, `agent:claude`). If omitted, pick the highest priority Todo.

## Workflow

1. **Find the current project:**
   - Determine the Linear project from the current repo (match by name)
   - If not in a project repo, ask the user which project

2. **Query Todo issues:**
   - List issues with status Todo in this project
   - If a label filter is provided, apply it
   - Sort by priority, then by creation date

3. **Present the candidate:**
   - Show the top issue: title, description, labels, priority
   - Ask: "开始这个任务？还是看下一个？"

4. **Start the task:**
   - Mark the issue as In Progress in Linear
   - Assign to "me"
   - Read the issue description for requirements/spec

5. **Load context if needed:**
   - If the task involves code changes, read relevant source files
   - If the task references design.md or ADRs, read those

6. **Begin execution:**
   - Follow the requirements from the issue description
   - Follow the project's CLAUDE.md conventions
   - For dev tasks, consider using Superpowers workflow (`/superpowers:brainstorming` or `/superpowers:writing-plans`)

## Notes

- Only picks up one task at a time
- If there are no Todo issues, suggest running `/swf:plan-next` to create new ones
- Respect executor labels: don't pick up `manual` tasks, only `agent:claude` or unlabeled
