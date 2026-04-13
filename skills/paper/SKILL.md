---
name: paper
description: "Generate paper outline from project docs, or draft a specific section"
argument-hint: "[section]"
disable-model-invocation: true
---

# Paper Writing Assistant

Generate a paper outline or draft a specific section based on project documentation.

## Input

`$ARGUMENTS` — optional section name. If omitted, generate the full outline.

Valid section names:

| Section | 参数 | 建议写作时机 | 前置依赖 |
|---------|------|-------------|---------|
| Methods — 核心设计 | `methods-core` | Phase 1 末期（算法确定后） | design.md |
| Methods — 实现细节 | `methods-detail` | Phase 2 完成后 | design.md + ADRs + 实验配置 |
| Results — Benchmark | `results-benchmark` | Phase 2 完成后 | benchmark 实验记录 |
| Results — Case/Feature | `results-case` | Phase 3 完成后 | case study 实验记录 |
| Introduction | `intro` | Phase 2~3 间隙 | 文献调研 + outline |
| Discussion | `discussion` | Results 写完后 | 全部实验 + design 局限性 |
| Abstract | `abstract` | 最后写 | 所有其他 section |
| Supplementary | `supp` | 和主文同步 | 补充图表/方法/数据 |
| Declarations | `declarations` | Phase 6 | 作者/基金/数据可用性等 |
| Checklist | `checklist` | 投稿前 | 检查所有必备项 |

## Writing Order and Rationale

推荐顺序（不强制，但每一步都有理由）：

```
1. methods-core     ← 最先写，因为算法确定就能写，不依赖实验结果
2. results-benchmark← 跑完 benchmark 趁热写，数据还在脑子里
3. results-case     ← 跑完 case study 趁热写
4. methods-detail   ← 实验做完后补充数据处理、工具版本、参数选择等细节
5. intro            ← 知道自己做出了什么，才能写好 motivation 和 contribution
6. discussion       ← 需要看完所有 results 才能讨论
7. abstract         ← 全文定型后提炼
8. supp             ← 和主文同步，最后整理
```

## Workflow

### Generate outline (`/swf:paper`)

1. **Read project docs:**
   - `docs/design.md` — architecture and core methods
   - `docs/adr/` — key design decisions
   - `docs/experiments/` — results and findings
   - `docs/experiments/collection-summary.md` — if exists, use as primary results source
   - `docs/roadmap.md` — project scope

2. **Generate outline** and save to `docs/paper/outline.md`:
   ```markdown
   # <Project Name>: <Tentative Paper Title>

   ## Abstract
   - Key points to cover: ...

   ## Introduction
   - Motivation: <why this problem matters>
   - Gap: <what existing methods can't do>
   - Contribution: <what we do, 2-3 bullet points>
   - Paper structure: <brief roadmap of sections>

   ## Methods
   ### Core Design
   - <Subsection 1 from design.md>: key concepts, core formulas
   - <Subsection 2>: ...
   ### Implementation Details
   - Data preprocessing: ...
   - Training/optimization: ...
   - Tools and versions: ...

   ## Results
   ### Benchmark
   - Datasets: <which ones>
   - Baselines: <which methods>
   - Metrics: <which metrics>
   - Key findings: <1-2 sentences>
   - Figures: Fig.X — <description>
   ### Case Study / Feature Validation
   - Case 1: <dataset, question, finding>
   - Case 2: ...
   - Figures: Fig.X — <description>
   ### Performance
   - Runtime, memory, scalability
   - Figure: Fig.X — <description>

   ## Discussion
   - Interpretation of key results
   - Comparison with related work
   - Limitations
   - Future directions

   ## Supplementary
   - Supplementary figures
   - Supplementary methods
   - Supplementary tables

   ## Declarations (投稿前必备)
   - Author contributions: <每位作者的具体贡献>
   - Competing interests: <每位作者的利益冲突声明>
   - Funding: <基金名称 + 编号>
   - Data availability: <数据存放位置、获取方式>
   - Code availability: <repo URL + license + version/commit>
   - Ethics approval: <如涉及>
   - Acknowledgments: <致谢>

   ## Metadata
   - Authors & affiliations
   - Corresponding author (email, ORCID)
   - Keywords (3-7)
   - Cover letter outline
   ```

3. **Commit** the outline

### Draft a section (`/swf:paper <section>`)

1. **Read the outline** from `docs/paper/outline.md` (must exist first — run `/swf:paper` to generate)

2. **Read section-specific sources:**

   | Section | Reads |
   |---------|-------|
   | `methods-core` | `docs/design.md` |
   | `methods-detail` | `docs/design.md` + `docs/adr/` + `configs/` |
   | `results-benchmark` | `docs/experiments/benchmark/` + `results/` metrics |
   | `results-case` | `docs/experiments/case/` + `results/` figures |
   | `intro` | outline + design.md (contribution section) |
   | `discussion` | all experiments + design.md (limitations) |
   | `abstract` | all existing draft sections |
   | `supp` | anything not in main text |
   | `declarations` | project info + experiment records (auto-collect) |
   | `checklist` | all draft files + `${CLAUDE_SKILL_DIR}/../reference/paper-checklist.md` |

3. **Generate draft** and save to `docs/paper/draft-<section>.md`

4. **Check cross-references:**
   - `[CITE]` — where references are needed (user adds via EndNote)
   - `[FIG:X]` — where figures should be inserted, mapped to experiment records
   - `[TABLE:X]` — where tables should be inserted
   - `[EXP:bench-NNN]` / `[EXP:case-NNN]` — link to experiment record for data traceability

5. **Commit** the draft

### Draft declarations (`/swf:paper declarations`)

Auto-collect and draft all mandatory declarations:

1. **Author Contributions** — ask user for each author's role
2. **Competing Interests** — ask each author's declaration
3. **Funding** — ask for grant names and numbers
4. **Data Availability** — scan experiment records for datasets, list public repository IDs, draft statement
5. **Code Availability** — read `git remote -v` for repo URL, check LICENSE file, get current version tag or commit
6. **Ethics** — ask if applicable
7. **Acknowledgments** — ask user (remind: don't thank anonymous reviewers)

Save to `docs/paper/draft-declarations.md`

### Pre-submission checklist (`/swf:paper checklist`)

Read `${CLAUDE_SKILL_DIR}/../reference/paper-checklist.md` and verify each item against current state:

```
## 投稿检查清单

### 正文
- [x] Abstract <200 words, 无引用
- [x] Introduction 有 motivation/gap/contribution
- [ ] Methods 有数据预处理细节          ← 缺失！
- [x] 所有统计检验标注了单/双尾
- [ ] Figure legends 定义了所有 error bars ← 检查 Fig.3

### 声明
- [x] Author contributions — 每位作者具体贡献
- [x] Competing interests — 所有作者已声明
- [ ] Data availability — 数据未上传公共仓库  ← 待办！
- [x] Code availability — GitHub URL + MIT license

### 文件
- [x] 主文稿 PDF
- [ ] Cover letter                     ← 未写
- [ ] Reporting summary                ← 未填
```

Flag all missing items and suggest actions.

## Notes

- The outline must be generated before any section draft
- Drafts are starting points — expect heavy human editing
- Each section draft is a separate file, not appended to one big file
- When writing results, pull numbers directly from experiment records — never fabricate or round
- If experiment data is missing for a section, warn: "缺少数据：需要先完成 EXP-XXX"
- Negative results belong in Discussion (limitations), not hidden
- For complete checklist reference, see `${CLAUDE_SKILL_DIR}/../reference/paper-checklist.md`
