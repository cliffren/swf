# Experiment Record Templates

每次实验产出一个记录文件，存放在 `docs/experiments/` 下。
按类型分子目录存放：

```
docs/experiments/
├── benchmark/          ← Phase 2: 标准化对比实验
│   ├── bench-001-baseline-comparison.md
│   └── bench-002-param-sweep.md
└── case/               ← Phase 3: Case study / Feature demo
    ├── case-001-dataset-a-analysis.md
    └── case-002-feature-validation.md
```

---

## Benchmark 模板（Phase 2）

文件命名：`docs/experiments/benchmark/bench-<NNN>-<slug>.md`

目的：和 baseline 公平对比，证明方法有效。强调**可复现、公平性、统计显著性**。

```markdown
# BENCH-<NNN>: <实验标题>

**日期:** <YYYY-MM-DD>
**类型:** Benchmark
**Phase:** 2
**状态:** Running / Completed / Failed / Superseded by BENCH-XXX
**Linear Issue:** <issue-id>
**Git Commit:** <实验代码对应的 commit hash>

## 目的
<验证什么？和哪些 baseline 比？>

## 实验设计

### 对比方法
| 方法 | 来源 | 版本/commit | 备注 |
|------|------|------------|------|
| Ours | 本项目 | <commit> | |
| Baseline A | <paper/repo> | <version> | |
| Baseline B | <paper/repo> | <version> | |

### 数据集
| 数据集 | 样本量 | 特征数 | 来源 | 备注 |
|--------|--------|--------|------|------|
| Dataset 1 | | | | |
| Dataset 2 | | | | |

### 评估指标
- Metric A: <定义，越高/低越好>
- Metric B: <定义>
- 运行时间、内存占用

### 公平性控制
- 所有方法使用相同的数据划分（seed: ）
- 所有方法使用相同的预处理流程
- 运行 N 次取均值±标准差（N = ）
- 超参调优方式：<grid search / 默认参数 / 各自最优>

### 参数

| 参数 | 值 | 说明 |
|------|-----|------|
| random_seed | 42 | |
| n_repeats | 5 | 统计显著性 |
| ... | | |

### 环境
- 机器：<hostname>
- GPU：<型号、数量>
- 关键依赖版本：<python, torch, scanpy 等>

### 复现命令

\`\`\`bash
conda activate <env>

# Our method
python src/benchmark.py --method ours --data data/ --seed 42 --output results/bench-<NNN>/

# Baseline A
python baselines/run_a.py --data data/ --seed 42 --output results/bench-<NNN>/

# Baseline B
python baselines/run_b.py --data data/ --seed 42 --output results/bench-<NNN>/
\`\`\`

## 结果

### 主要指标（均值 ± 标准差）

| 方法 | Dataset 1 Metric A | Dataset 1 Metric B | Dataset 2 Metric A | Dataset 2 Metric B |
|------|-------------------|-------------------|-------------------|-------------------|
| Ours | | | | |
| Baseline A | | | | |
| Baseline B | | | | |

### 性能

| 方法 | 时间(s) | 内存(GB) | GPU显存(GB) |
|------|---------|---------|------------|
| Ours | | | |
| Baseline A | | | |
| Baseline B | | | |

### 图表
- `results/bench-<NNN>/comparison.png` — 方法对比图
- `results/bench-<NNN>/performance.png` — 性能对比图

### 原始数据位置
- 输出目录：`results/bench-<NNN>/`
- 指标汇总：`results/bench-<NNN>/metrics.csv`

## 结论
<方法在哪些指标上胜出？在哪些场景下不行？>
<统计显著性如何？>

## 论文对应
- 对应论文 Figure: Fig._
- 对应论文 Table: Table._
```

---

## Case Study 模板（Phase 3）

文件命名：`docs/experiments/case/case-<NNN>-<slug>.md`

目的：在具体场景中深入分析，展示方法的生物学/实际意义。强调**故事线、可视化、领域洞察**。

```markdown
# CASE-<NNN>: <Case 标题>

**日期:** <YYYY-MM-DD>
**类型:** Case Study
**Phase:** 3
**状态:** Running / Completed / Failed
**Linear Issue:** <issue-id>
**Git Commit:** <commit hash>

## 背景
<为什么选这个 case？有什么已知的生物学背景？>
<参考文献>

## 分析目标
<这个 case 要展示什么能力？要回答什么生物学问题？>

## 数据
- 数据集：<名称、来源、GEO/ArrayExpress ID>
- 样本描述：<物种、组织、条件等>
- 预处理：<步骤摘要>

## 分析流程

### Step 1: <步骤名>
<做了什么、参数设置>

### Step 2: <步骤名>
<做了什么>

### ...

### 复现命令

\`\`\`bash
conda activate <env>

# Step 1
python src/analysis.py --step preprocess --data <path> --output results/case-<NNN>/

# Step 2
python src/analysis.py --step analyze --input results/case-<NNN>/step1/ --output results/case-<NNN>/step2/

# Visualization
python src/plot_case.py --input results/case-<NNN>/ --output results/case-<NNN>/figures/
\`\`\`

## 结果

### 关键发现
1. <发现 1 — 和已知生物学一致/新发现>
2. <发现 2>
3. <发现 3>

### 图表
- `results/case-<NNN>/figures/overview.png` — <描述>
- `results/case-<NNN>/figures/detail.png` — <描述>
- `results/case-<NNN>/figures/comparison.png` — <和已有方法对比>

### 生物学解读
<结果说明了什么生物学意义？>
<和已有文献的关联？>
<能否被独立实验验证？>

## 故事线
<这个 case 在论文里怎么讲？>
<1-2 段话概括这个 case 要传达的信息>

## 论文对应
- 对应论文 Figure: Fig._
- 对应论文文字：Results Section _

## 后续
- [ ] <需要跟进的事项>
```

## 实验目录结构

```
project-root/
├── docs/experiments/
│   ├── exp-001-baseline-benchmark.md     ← 实验记录（markdown）
│   ├── exp-002-param-sweep.md
│   └── exp-003-real-data.md
├── results/                               ← 实验产出（不进 git）
│   ├── exp-001/
│   │   ├── metrics.json
│   │   ├── figure_1.png
│   │   └── train.log
│   └── exp-002/
│       └── ...
└── configs/                               ← 实验配置文件（进 git）
    ├── exp-001.yaml
    └── exp-002.yaml
```

### 约定

1. **docs/experiments/*.md 进 git** — 这是永久记录
2. **results/ 不进 git** — 太大，用 .gitignore 排除。归档到共享存储
3. **configs/ 进 git** — 可复现的前提
4. **每次实验对应一个固定的 commit** — 记录中写明 commit hash，确保代码和结果对得上
5. **参数不要硬编码** — 用 config 文件或命令行参数，方便扫描和记录
