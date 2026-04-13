# SWF — Scientific Workflow

[English](README.md)

Claude Code 插件，用于管理多项目科研工作流。覆盖从灵感到论文发表的全生命周期，以 Linear 为任务调度中心。

## 安装

**请安装为全局（用户级）插件。** SWF 的命令是跨项目的（`/swf:status`、`/swf:daily`、`/swf:idea` 等），需要在任何目录下都能使用。如果装成项目插件，切换目录后就不可用了。

```bash
# 前置：连接 Linear MCP
claude mcp add --transport http linear-server https://mcp.linear.app/mcp -s user

# 前置：确保 GitHub CLI 已登录
gh auth status

# 1. 添加 marketplace
/plugin marketplace add cliffren/swf

# 2. 安装插件
/plugin install swf@cliffren-swf

# 3. 重载
/reload-plugins
```

第 1-3 步在 Claude Code 提示符中输入（不是 bash）。安装后所有 `/swf:*` 命令全局可用。

## 核心理念

**一个科研项目的生命周期：**

```
想法 → 评估 → 立项 → 开发 → 验证 → 深入分析 → 做图 → 写论文 → 投稿 → 发表
```

**SWF 做什么：** 管理"做什么"——哪个项目、哪个阶段、哪个任务、什么时候做。

**SWF 不做什么：** 不管"怎么写代码"——具体开发流程交给 Superpowers 等开发类插件。

**两者如何配合：**

```
/swf:next       → 从 Linear 领一个任务
                    ↓
                  Superpowers 执行开发（brainstorm → plan → TDD → review）
                    ↓
/swf:done       → 记录完成，标 Done
```

## 项目生命周期

### Phase 0：Ideas 漏斗

所有想法先进 Ideas Project 评估，通过后才建独立项目。

```
/swf:idea "单细胞可扩展分析"
│  → 在 Ideas Project 建主 issue
│  → 自动建 5 个评估 sub-issues：
│     文献调研、可行性评估、技术选型、design.md 初稿、框架图
│
├─ 评估通过 → /swf:promote
│     → 交互式选择想法、确定项目简称
│     → 建 Linear Project + Phase 1~8 Milestones
│     → 建 GitHub repo + 标准目录 + CLAUDE.md
│     → 归档 Ideas issue
│
└─ 评估否决 → 归档，留记录
```

已有项目用 `/swf:import` 导入：自动分析 repo 推断当前 Phase，建 Linear Project，补齐缺失文档，不动已有文件。

### Phase 1~8：独立项目推进

每个正式项目有 8 个 Phase，对应 Linear Project 中的 8 个 Milestones：

| Phase | 阶段 | 主要工作 |
|-------|------|---------|
| 1 | 数据准备与开发 | 写代码、搭建系统 |
| 2 | 验证与 Benchmark | 标准化对比实验 |
| 3 | 深入验证 | Case study / Feature demo |
| 4 | Figure 组装 | Publication-quality 图表 |
| 5 | 论文写作 | 按 section 撰写 |
| 6 | 投稿准备 | 声明、材料、检查清单 |
| 7 | 投稿后 | 审稿、修回 |
| 8 | 发表 | 校对、推广 |

**Phase 不是严格线性的。** Methods 初稿在 Phase 1 末就能写，等实验的间隙可以做图。`/swf:plan` 会主动建议可提前做的任务。

## 全部 Skills（15 个）

Skills 分为两个作用域：

- **全局命令** — 在任何目录下运行，通过 Linear 跨项目操作
- **项目命令** — 在项目 repo 目录内运行（`cd ~/Projects/my-project`），操作本地文件和该项目的 Linear issues

### 全局命令（在任何目录下运行）

| 命令 | 说明 |
|------|------|
| `/swf:idea <name>` | 新想法进 Ideas 漏斗，建评估 sub-issues |
| `/swf:promote` | 交互式选择想法，建独立 Project + repo |
| `/swf:import` | 导入已有项目，分析 repo 推断 Phase，补齐文档 |
| `/swf:status [project]` | 跨项目仪表盘，或单项目详情 |
| `/swf:daily [type-label]` | 跨项目今日待办，可按 label 过滤 |
| `/swf:archive [project]` | 清理 Done issues，显示 250 额度使用情况 |

### 项目命令（在项目 repo 目录内运行）

**任务执行：**

| 命令 | 说明 |
|------|------|
| `/swf:context` | 读 CLAUDE.md + roadmap + design.md + Linear + git log，汇报当前状态 |
| `/swf:next [label]` | 领下一个 Todo issue，标 In Progress，开始执行 |
| `/swf:done [issue-id]` | 写完成摘要，标 Done，提示下一步 |
| `/swf:plan <project>` | 读 design.md + 当前进度，规划当前和可提前做的 issues |

**实验：**

| 命令 | 说明 |
|------|------|
| `/swf:exp new <title>` | 建实验记录（区分 benchmark/case），自动捕获环境和参数 |
| `/swf:exp log <id>` | 跑完后填结果、写结论 |
| `/swf:exp compare [id...]` | 多实验对比表 |
| `/swf:exp collect` | 汇总所有结果，标注对应论文 Figure，发现缺口 |

**图表：**

| 命令 | 说明 |
|------|------|
| `/swf:fig framework <描述>` | 通过 draw.io MCP（或 Figma MCP）创建框架图 |
| `/swf:fig plot <描述>` | 写 matplotlib/seaborn 画图代码（可复现，提交到 git） |
| `/swf:fig assemble` | 盘点子图，在 Linear 建手动拼装任务，生成 figure legends |
| `/swf:fig legend [fig编号]` | 写 figure legend（Nature 格式，自动检查 error bars/n 值/统计量） |
| `/swf:fig list` | 列出所有图表及状态 |

**文档：**

| 命令 | 说明 |
|------|------|
| `/swf:adr <title>` | 写架构决策记录（自动编号，只增不改） |
| `/swf:design` | 根据最近 ADR/实验/代码变更，更新 design.md |
| `/swf:paper [section]` | 生成论文 outline 或起草指定 section |
| `/swf:paper declarations` | 自动收集作者贡献、基金、数据/代码可用性等声明 |
| `/swf:paper checklist` | 投稿前逐项检查（参考 Nature 系列要求） |

## 实验管理详解

实验按类型隔离存放，使用不同模板：

```
docs/experiments/
├── benchmark/              ← Phase 2: 标准化对比
│   └── bench-001-xxx.md       公平对比、统计显著性、可复现
└── case/                   ← Phase 3: 深入分析
    └── case-001-xxx.md        生物学背景、故事线、领域洞察
```

| | Benchmark | Case Study |
|--|-----------|------------|
| 编号 | `bench-NNN` | `case-NNN` |
| 核心问题 | 比 baseline 好吗？ | 能发现什么 insight？ |
| 独有字段 | 对比方法表、公平性控制 | 生物学背景、故事线 |
| 结果格式 | 均值±标准差 | 关键发现 + 叙事 |

实验记录进 git（`docs/experiments/`），配置进 git（`configs/`），产出不进 git（`results/`）。

## 论文写作详解

### Section 与写作时机

| 顺序 | Section | 命令 | 最早可写 | 数据来源 |
|------|---------|------|---------|---------|
| 1 | Methods 核心设计 | `/swf:paper methods-core` | Phase 1 末 | design.md |
| 2 | Results Benchmark | `/swf:paper results-benchmark` | Phase 2 后 | 实验记录 |
| 3 | Results Case | `/swf:paper results-case` | Phase 3 后 | 实验记录 |
| 4 | Methods 实现细节 | `/swf:paper methods-detail` | Phase 2 后 | design.md + ADRs + configs |
| 5 | Introduction | `/swf:paper intro` | Phase 2~3 间隙 | 文献调研 |
| 6 | Discussion | `/swf:paper discussion` | Results 后 | 全部实验 |
| 7 | Abstract | `/swf:paper abstract` | 最后 | 全文 |
| 8 | Supplementary | `/swf:paper supp` | 同步 | 补充内容 |

### 投稿准备

`/swf:paper declarations` 自动收集：
- Author contributions（每人具体贡献）
- Competing interests、Funding（基金+编号）
- Data/Code availability（repo URL + license + version）
- Ethics、Acknowledgments

`/swf:paper checklist` 逐项检查：
- 正文各 section 完整性
- Figure legend 是否定义了 error bars 和 n 值
- 统计检验是否标注了单/双尾
- 数据是否上传公共仓库
- Cover letter、Reporting summary 等文件

## 日常使用

### 早上开始工作（全局 — 在任何目录下）

```bash
/swf:status               # 跨项目进度仪表盘
/swf:daily                # 今天做什么？
/swf:daily writing        # 周一写作日，按 label 过滤
```

### 进入某个项目（项目内 — 先 cd 到 repo）

```bash
cd ~/Projects/my-project
/swf:context              # 项目到哪了、正在做什么
/swf:next dev             # 领一个 dev 任务
# ...用 superpowers 开发...
/swf:done                 # 完成、记录、看下一个
```

### 阶段性操作

```bash
# 全局
/swf:idea "新研究方向"     # 记录新想法
/swf:status               # 查看所有项目
/swf:archive              # 清理 Done issues

# 项目内（在 repo 目录里）
/swf:plan my-project      # 规划下一批 issues
/swf:adr "改用 sparse"    # 记录架构决策
/swf:design               # 同步更新设计文档
```

### 多项目并行

```
/swf:status
→ | 项目      | Phase   | 进行中 | 待办 |
  | Project A | Phase 3 | 1     | 3   |
  | Project B | Phase 1 | 2     | 5   |
  | Project C | Phase 5 | 0     | 4   |
```

`/swf:daily` 按 label 跨项目聚合同类工作，减少上下文切换。

## 项目 Repo 标准结构

`/swf:promote` 和 `/swf:import` 生成/补齐以下结构：

```
project-root/
├── CLAUDE.md                     # Agent 工作指南
├── .gitignore                    # 排除 results/ 和数据文件
├── docs/
│   ├── roadmap.md                # 路线图，标记当前 Phase
│   ├── design.md                 # 架构设计（仅通过 /swf:design 修改）
│   ├── adr/                      # 架构决策记录（只增不改）
│   ├── experiments/
│   │   ├── benchmark/            # Phase 2 实验记录
│   │   └── case/                 # Phase 3 实验记录
│   └── paper/                    # 论文 outline 和各 section draft
├── src/
├── tests/
├── configs/                      # 实验配置文件（进 git）
└── results/                      # 实验产出（不进 git）
```

## Linear 配置

### 结构

- **Ideas Project** — 立项评估漏斗（全局，长期存在）
- **独立 Project** — 每个正式项目一个，包含 Phase 1~8 Milestones
- GitHub repo URL 记录在 Project 描述中

### Label 体系

```
type（任务类型）             executor（执行者）
├── dev       编码开发       ├── agent:claude   Claude Code 处理
├── experiment 实验运行      ├── agent:codex    Codex 处理
├── writing    文档/论文     └── manual         需要手动操作
├── figures    图表制作
└── admin      提交/沟通/杂务
```

### 状态流

`Backlog → Todo → In Progress → Done`

## 依赖

- **Linear MCP** — `claude mcp add --transport http linear-server https://mcp.linear.app/mcp -s user`
- **GitHub CLI** — `gh`，用于创建 repo
- **Git** — 版本控制
- **Superpowers 插件**（推荐） — 开发执行流程
- **draw.io MCP**（推荐） — `claude mcp add -s user drawio -- npx @next-ai-drawio/mcp-server@latest`
- **Figma MCP**（可选） — Claude Code 内置 Figma 集成
