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

2. **Create evaluation sub-issues** under the main issue:

   | Sub-issue | Labels |
   |-----------|--------|
   | 文献调研：领域进展、找到 gap | `writing`, `manual` |
   | 评估意义/创新性/可行性 | `writing`, `manual` |
   | 技术选型 | `dev`, `agent:claude` |
   | 撰写 design.md 初稿 | `writing`, `agent:claude` |
   | 画框架图初版 | `figures`, `manual` |

3. **Confirm** — show the user what was created with links

## References

For Linear workspace config, see: `${CLAUDE_SKILL_DIR}/../reference/linear-config.md`

## Notes

- All sub-issues start in Backlog status
- The user decides the order and timing of evaluation
- When all evaluation sub-issues are Done, prompt the user: "评估完成，要用 `/swf:promote` 建独立项目吗？"
