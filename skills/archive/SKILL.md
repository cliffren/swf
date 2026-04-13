---
name: archive
description: "Clean up Done issues to stay under Linear's 250 issue limit. Show quota usage."
argument-hint: "[project]"
disable-model-invocation: true
---

# Archive Done Issues

Clean up completed issues to manage Linear's free-tier 250 issue limit.

## Input

`$ARGUMENTS` — optional project name. If omitted, archive across all projects.

## Workflow

1. **List Done issues:**
   - Query Linear for issues with status Done
   - If a project is specified, filter by that project
   - Show count and list titles

2. **Show quota:**
   - Count total active (non-archived) issues
   - Display: "当前 X/250 issues，其中 Y 个 Done 可归档"

3. **Confirm with user:**
   - Show the list of issues to be archived
   - Ask: "确认归档这些 issue 吗？"

4. **Archive:**
   - Set each confirmed issue to archived
   - Report results

## Notes

- Only archive issues in Done or Canceled status
- Never archive In Progress or Todo issues
- Issues in the Ideas project that were rejected (Canceled) can also be archived
