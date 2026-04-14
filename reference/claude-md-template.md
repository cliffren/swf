# CLAUDE.md Template

新项目初始化时使用此模板生成 CLAUDE.md：

```markdown
# 项目：{{PROJECT_NAME}}

{{ONE_LINE_DESCRIPTION}}

## 技术栈
{{TECH_STACK}}

## 工作方式
- 任务来源：Linear 项目 {{PROJECT_NAME}}，处理状态为 Todo、对应 agent 标签的 issue
- 开发流程：使用 Superpowers 工作流
- 完成后：在 issue 评论记录改动摘要，标为 Done
- 如果发现需要新任务，在 Linear 创建新 issue 而非直接做

## 行为准则
- 不确定就停下来问，不要悄悄选一个解释开始写
- 如果多种理解都说得通，列出来让我选，不要替我决定
- 如果有更简单的方案，主动说。该 push back 就 push back
- 只改必须改的代码，不"顺手"改相邻代码、注释或格式
- 不加没要求的 feature、抽象、灵活性、不可能场景的错误处理
- 200 行能 50 行搞定的，重写

## 科研代码规范
- 每个涉及公式的函数必须在 docstring 里标注对应的公式来源
- 必须有数值正确性测试（用手算或已知结果验证）
- 新算法必须和已有 baseline 交叉验证
- 每个任务先定义可验证的成功标准，再动手写代码

## 实验规范
- 每次实验必须先用 `/swf:exp new` 创建记录，再跑实验
- 参数不硬编码，用 config 文件或命令行参数
- 记录里必须包含：目的、参数、环境、复现命令、结果、结论
- 实验完成后用 `/swf:exp log` 补充结果，不要只跑不记
- 负面结果也要记录，注明失败原因和排除的方向
- results/ 目录不进 git，configs/ 和 docs/experiments/ 进 git

## 文档保护
- design.md 只能通过 `/swf:update-design` 更新，不能在开发任务中顺手改
- ADR 只增不改
- 如果实现和设计有冲突，先在 issue 评论里提出，等确认后再改设计

## 项目规划
参见 docs/roadmap.md，当前阶段：Phase _

## 当前架构
参见 docs/design.md
```
