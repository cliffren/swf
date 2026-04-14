# Standard Repo Structure

新项目初始化时创建以下目录和文件：

```
project-root/
├── CLAUDE.md                  # 从 claude-md-template.md 生成
├── .gitignore                 # 排除 results/
├── docs/
│   ├── roadmap.md             # 从 phase-template.md 生成，填入项目信息
│   ├── design.md              # Phase 0 产出的设计文档
│   ├── adr/                   # 架构决策记录
│   │   └── .gitkeep
│   ├── experiments/           # 实验记录（markdown，进 git）
│   │   ├── benchmark/        # Phase 2: 标准化对比实验
│   │   │   └── .gitkeep
│   │   └── case/             # Phase 3: Case study / Feature demo
│   │       └── .gitkeep
│   └── paper/
│       ├── figures/           # 论文图表（进 git）
│       │   └── .gitkeep
│       └── .gitkeep
├── src/
│   └── .gitkeep
├── tests/
│   └── .gitkeep
├── configs/                   # 实验配置文件（进 git，可复现）
│   └── .gitkeep
├── results/                   # 实验产出（不进 git，太大）
│   ├── .gitkeep
│   └── figures/               # 论文图表产出（.svg/.png/.pdf）
│       └── .gitkeep
└── .claude/
    └── settings.json
```

## .gitignore 模板

```
# Experiment outputs (too large for git)
results/

# Data files
*.h5ad
*.h5
*.loom
*.rds
*.pkl
data/raw/

# Python
__pycache__/
*.egg-info/
.venv/

# OS
.DS_Store

# IDE
.vscode/
.idea/
```

## 文件说明

- **CLAUDE.md** — Agent 工作指南，必须维护
- **docs/roadmap.md** — 路线图，标记当前 Phase
- **docs/design.md** — 架构设计、核心公式（从 Ideas 评估阶段迁入）
- **docs/adr/** — 架构决策记录，agent 写、人审
- **docs/experiments/** — 实验结果，agent 产出
- **docs/paper/** — 论文 outline 和 draft
