---
name: exp
description: "Manage experiments: create records, log results, compare runs, and collect data for paper writing"
argument-hint: "[new|log|compare|collect]"
disable-model-invocation: true
---

# Experiment Management

Standardized experiment workflow: design → run → record → compare → collect for paper.

## Sub-commands

`$ARGUMENTS[0]` determines the action. If omitted, show help.

---

### `/swf:exp new <title>`

Create a new experiment record from template.

1. **Ask experiment type:**
   - `benchmark` — Phase 2 标准化对比实验（和 baseline 公平对比）
   - `case` — Phase 3 Case Study / Feature Demo（深入分析，讲故事）

2. **Auto-number:** scan the corresponding subdirectory for next number
   - Benchmark → `docs/experiments/benchmark/bench-<NNN>-<slug>.md`
   - Case → `docs/experiments/case/case-<NNN>-<slug>.md`

3. **Ask type-specific questions:**

   **Benchmark:**
   - 和哪些 baseline 比较？（方法名、来源、版本）
   - 用哪些数据集？
   - 评估哪些指标？
   - 公平性控制：相同数据划分？重复次数？超参调优方式？

   **Case Study:**
   - 为什么选这个 case？生物学背景？
   - 这个 case 要展示什么能力？
   - 数据来源（GEO ID 等）？
   - 论文里这个 case 想讲什么故事？

4. **Generate record** from corresponding template in `${CLAUDE_SKILL_DIR}/../reference/experiment-template.md`
5. **Auto-capture environment:**
   ```bash
   python --version
   pip list | grep -E "torch|scanpy|numpy|scipy|pandas"
   hostname
   nvidia-smi --query-gpu=name,memory.total --format=csv,noheader 2>/dev/null
   ```
6. **Generate config file** if applicable → `configs/<prefix>-<NNN>.yaml`
7. **Generate run command** and write into record
8. **Commit** the record and config
9. **Create results directory:** `mkdir -p results/<prefix>-<NNN>`
10. Remind: "实验记录已创建。运行实验后，用 `/swf:exp log <prefix>-<NNN>` 记录结果。"

---

### `/swf:exp log <NNN>`

Record results for a completed experiment.

1. **Read the experiment record** `docs/experiments/exp-<NNN>-*.md`
2. **Collect results:**
   - Check `results/exp-<NNN>/` for output files
   - If metrics file exists (`.json`, `.csv`), auto-extract key metrics
   - If figures exist, list them with paths
   - If log file exists, extract final metrics (loss, accuracy, etc.)
3. **Ask the user:**
   - 结果是否符合预期？
   - 关键发现是什么？
   - 有什么后续需要做？
4. **Update the experiment record:**
   - Fill in results table with metrics
   - Fill in figure references
   - Fill in conclusion
   - Update status to Completed (or Failed)
   - Record the current git commit hash
5. **Commit** the updated record
6. **Prompt next steps:**
   - "要和其他实验比较吗？(`/swf:exp compare`)"
   - "要更新 design.md 吗？(`/swf:update-design`)"
   - If results invalidate assumptions: "实验结果和 design.md 假设不一致，建议写 ADR 记录 (`/swf:adr`)"

---

### `/swf:exp compare [NNN] [NNN] ...`

Compare multiple experiments side by side.

1. **If no numbers given**, list all completed experiments and ask which to compare
2. **Read each experiment record**
3. **Generate comparison table:**

   ```markdown
   ## 实验对比

   | | EXP-001 Baseline | EXP-002 Sparse | EXP-003 Optimized |
   |---|---|---|---|
   | 方法 | Dense matrix | Sparse matrix | Sparse + cache |
   | Metric A | 0.85 | 0.84 | 0.91 |
   | Metric B | 0.72 | 0.75 | 0.78 |
   | 时间(s) | 120 | 45 | 38 |
   | 内存(GB) | 8.2 | 3.1 | 3.4 |
   | 关键差异 | — | 内存降 62% | 精度+速度最优 |
   ```

4. **Save** to `docs/experiments/comparison-<date>.md`
5. **Commit** the comparison

---

### `/swf:exp collect [phase]`

Collect experiment results for paper writing. Prepares data for `/swf:paper results`.

1. **Scan all completed experiments** in `docs/experiments/`
2. **Group by phase/purpose:**
   - Phase 2 验证: benchmark results
   - Phase 3 深入验证: case studies / feature demos
3. **Generate a collection summary** at `docs/experiments/collection-summary.md`:

   ```markdown
   ## 实验结果汇总（供论文使用）

   ### Benchmark Results (Phase 2)
   - EXP-001~003: 主要性能对比 → 对应论文 Fig.2-3
   - 最佳配置：EXP-003 的参数
   - 关键数据文件：results/exp-003/metrics.json

   ### Case Studies (Phase 3)
   - EXP-004: Case 1 XX 数据集 → 对应论文 Fig.5
   - EXP-005: Case 2 YY 数据集 → 对应论文 Fig.6

   ### 待补充
   - 缺少 ablation study
   - Case 3 还未运行
   ```

4. **Check for gaps:** identify missing experiments needed for the paper
5. **Commit** the summary

## Notes

- Experiment records are append-only — don't modify completed records, create new experiments instead
- If an experiment supersedes a previous one, update the old record's status to "Superseded by EXP-NNN"
- Always record negative results — they inform design decisions and prevent repeating failed approaches
- Config files should be self-contained: anyone with the config + code at the recorded commit should reproduce the result
