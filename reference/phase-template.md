# Phase Milestones Template

创建独立项目时，按以下顺序建立 Milestones。

**注意：Phase 不是严格线性的。** 以下工作可以提前启动：
- Methods 初稿 → 核心算法确定后（Phase 1 末期）
- 部分 Figure → 有 benchmark 结果后（Phase 2 中期）
- Introduction 草稿 → 文献调研做过后
- 性能对比图 → Phase 2 每跑完一轮就能画

`/swf:plan` 会主动建议可提前做的任务。issue 始终挂在它实际所属的 Phase milestone 下，不因为提前做就改归属。

## Phase 1 — 数据准备与开发
- 数据收集与预处理
- 系统/模型开发（含开发测试保证代码正确）

## Phase 2 — 验证与Benchmark
- 模拟数据测试（如果可行）
- 真实数据 Benchmark
- 性能评估（时间/内存/显存）
- 子图产出与整理
- 数据和中间结果归档

## Phase 3 — 深入验证
**算法论文 → Case 分析（2-3个）：**
- Case 分析 → 收集结果 → 讲生物故事

**框架论文 → 核心 Feature 验证（2-3个）：**
- Feature 验证 → 展示框架关键能力

- 子图产出与整理
- 数据和中间结果归档

## Phase 4 — Figure 组装

工具链：
- **框架图** → `/swf:fig framework` — Claude 通过 draw.io MCP 生成，迭代后导出 SVG，可在 draw.io 桌面版精修
- **数据图** → `/swf:fig plot` — Claude 写 matplotlib/seaborn 代码，可复现
- **拼装规划** → `/swf:fig assemble` — 列出所有子图状态，发现缺口
- **精修**（可选） → draw.io 桌面版 / Figma / Illustrator / PPT

任务清单：
- 框架图（主图1）— `/swf:fig framework`
- 主图2-3：Benchmark/验证结果 — `/swf:fig plot`
- 主图4：性能（时间/内存/显存）— `/swf:fig plot`
- 主图5-6：Case 结果或 Feature 展示 — `/swf:fig plot`
- 补充图
- 拼成 publication-quality 完整 figure
- 每个 figure 撰写 legend

## Phase 5 — 论文写作

按以下顺序推进（可提前的 section 见上方说明）：

| 顺序 | Section | `/swf:paper` 参数 | 可提前到 | 数据来源 |
|------|---------|------------------|---------|---------|
| 1 | Methods — 核心设计 | `methods-core` | Phase 1 末期 | design.md |
| 2 | Results — Benchmark | `results-benchmark` | Phase 2 完成后 | benchmark 实验记录 |
| 3 | Results — Case/Feature | `results-case` | Phase 3 完成后 | case study 实验记录 |
| 4 | Methods — 实现细节 | `methods-detail` | Phase 2 后 | design.md + ADRs + configs |
| 5 | Introduction | `intro` | Phase 2~3 间隙 | 文献调研 |
| 6 | Discussion | `discussion` | Results 后 | 全部实验结果 |
| 7 | Abstract | `abstract` | 最后 | 所有 section |
| 8 | Supplementary | `supp` | 同步 | 补充内容 |

- 几轮自己打磨
- 导师/同事 review → 修改 → 定稿

## Phase 6 — 投稿准备

代码与数据：
- 代码整理/README/示例数据/Tutorial
- 数据上传公共仓库（GEO、Zenodo、Figshare 等）
- 确认 repo 有 LICENSE，打 release tag

声明（`/swf:paper declarations`）：
- 作者列表、排序、单位确认
- Author contributions（每人具体贡献）
- Competing interests（每人声明）
- Funding（基金名称 + 编号）
- Data availability（公共仓库 URL）
- Code availability（GitHub URL + license + version）
- Ethics approval（如涉及）
- Acknowledgments
- 通讯作者 ORCID

投稿材料：
- 按期刊格式整理主文稿
- Cover letter
- Supplementary Information
- Extended Data figures
- Source Data files
- Reporting summary / checklist（按期刊模板）
- 推荐/回避审稿人列表

最终检查（`/swf:paper checklist`）：
- 运行投稿检查清单，逐项确认
- 提交

## Phase 7 — 投稿后
- 等待审稿
- 逐条回复 reviewer（rebuttal letter）
- 修改论文/补实验/补分析
- 提交修回稿
- 接收

## Phase 8 — 发表
- 校对 proof
- 处理出版社要求
- 正式发表
- 宣传推广
