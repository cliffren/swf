# Linear Workspace Configuration

## Workspace & Team
- SWF uses whatever Linear workspace the Linear MCP server is authenticated against. Nothing is hardcoded.
- Team resolution rule (shared by all skills and the project-manager agent):
  1. Call `list_teams`.
  2. Exactly one team → use it.
  3. Multiple teams → ask the user which team SWF should use, then reuse that answer for the session.
- `/swf:init-linear` creates the labels and the Ideas/Archive projects in that team.

## Projects
- **Ideas** — 立项评估漏斗，所有新想法在此管理

## Labels

### type（任务类型）
- `dev` — 编码开发
- `experiment` — 实验运行
- `writing` — 文档/论文写作
- `figures` — 图表制作
- `admin` — 提交/沟通/杂务

### executor（执行者）
- `agent:claude` — Claude Code 处理
- `agent:codex` — Codex 处理
- `manual` — 需要手动操作

## Status Flow
Backlog → Todo → In Progress → Done / Canceled

- **Backlog**: 想法池/待定 — 不确定要不要做的事。不是"排队等执行"
- **Todo**: 确定要做 — 已进入计划，等待执行
- **In Progress**: 正在做
- **Done**: 完成
- **Canceled**: 取消/否决

## Issue Conventions
- 一个 issue = 半天到两天的工作量
- 细节用 sub-issue 或 checklist
- 完成的 issue 及时归档（免费版 250 issue 上限）
- PR/commit 中写 `Fixes XXX-12` 自动关联 issue
