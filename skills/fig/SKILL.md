---
name: fig
description: "Create and manage publication figures: framework diagrams via draw.io/Figma MCP, data plots via code, and figure assembly"
argument-hint: "[framework|plot|assemble|list]"

---

# Figure Management

Create, iterate, and organize publication-quality figures for papers.

## Sub-commands

`$ARGUMENTS[0]` determines the action. If omitted, show help.

---

### `/swf:fig framework <description>`

Create a framework/architecture diagram (typically Fig.1 of a paper).

1. **Choose tool based on need:**
   - **draw.io MCP** — default choice. Best for flowcharts, pipelines, architecture diagrams. Claude has full control: create, edit, export.
   - **Figma MCP** — use when the user asks, or when working with existing Figma designs. Best for polished visual design and FigJam collaboration.

2. **Ask the user:** "用 draw.io 还是 Figma 画？"
   - If user has no preference, default to draw.io (Claude has more control)

3. **draw.io workflow:**
   - Call `start_session` to open browser preview
   - Ask the user to describe what the diagram should show
   - Call `create_new_diagram` with well-structured XML:
     - Use large shapes (width >= 200, height >= 60)
     - Center layout on canvas
     - Use thick lines (strokeWidth >= 2)
     - Use a consistent color palette
     - Add proper spacing (150-200px between shapes)
   - Iterate: user says what to change → call `edit_diagram`
   - When satisfied, call `export_diagram` to save:
     - `.drawio` → for further editing in draw.io desktop
     - `.svg` → for paper inclusion (vector, scalable)
     - `.png` → for quick preview
   - Save to `results/figures/` or `docs/paper/figures/`

4. **Figma workflow:**
   - Use `generate_diagram` to create in FigJam
   - Or use `create_new_file` + `use_figma` for Figma design files
   - Use `get_screenshot` to preview
   - Export from Figma UI

5. **Record in experiment log:**
   - Note which figure this is for (e.g., Fig.1 — Method Overview)
   - Record the source file path

---

### `/swf:fig plot <description>`

Generate a data visualization figure from experiment results.

1. **Read experiment data:**
   - Check `results/` for metrics files
   - Check `docs/experiments/` for relevant experiment records
   - Identify what data to plot

2. **Generate matplotlib/seaborn code:**
   - Create a Python script in `src/plots/` or `scripts/`
   - Follow publication conventions:
     - Font size >= 12pt for labels
     - Clear axis labels with units
     - Legend if multiple series
     - Color-blind friendly palette
     - High DPI (300+)
   - Save figure to `results/figures/`

3. **Run and iterate:**
   - Execute the script
   - Show the user the result
   - Adjust based on feedback
   - Commit the plotting script (reproducible)

---

### `/swf:fig assemble`

Plan figure assembly, create tasks in Linear for manual assembly, and generate legends.

1. **Read paper outline** from `docs/paper/outline.md`
2. **List all available sub-figures:**
   - Framework diagrams in `results/figures/`
   - Data plots in `results/figures/`
   - Experiment result figures from `docs/experiments/`
3. **Generate assembly plan:**
   ```
   ## Figure Assembly Plan

   ### Fig.1 — Method Overview (框架图)
   - Source: results/figures/framework.svg
   - Status: Done
   - Tool: draw.io

   ### Fig.2 — Benchmark Comparison (数据图)
   - Panel a: results/figures/benchmark-accuracy.pdf
   - Panel b: results/figures/benchmark-speed.pdf
   - Status: Panel a done, Panel b missing
   - Tool: matplotlib

   ### Fig.3 — Case Study Results
   - Panel a-c: results/case-001/figures/
   - Status: Not started
   ```
4. **Identify gaps:**
   - Missing sub-figures → suggest `/swf:fig plot` or `/swf:fig framework`
   - Missing legends → will generate in step 6

5. **Create Linear issues** for manual assembly work (user confirms before creating):
   - Each Figure that has all sub-figures ready → one issue:
     ```
     Title: 拼装 Fig.2 — Benchmark Comparison
     Labels: figures, manual
     Milestone: Phase 4
     Description:
       子图文件：
       - Panel a: results/figures/benchmark-accuracy.pdf
       - Panel b: results/figures/benchmark-speed.pdf
       拼装要求：
       - 加 a/b panel 标签（大写，粗体，左上角）
       - 统一字体和字号
       - 对齐面板边距
       - 导出为 results/figures/fig2-benchmark.pdf (300 dpi+)
     ```
   - Figures with missing sub-figures → skip, note in plan

6. **Generate legends** for all figures with sub-figures ready:
   - Call the same logic as `/swf:fig legend`
   - Save to `docs/paper/figure-legends.md`

---

### `/swf:fig list`

List all figures in the project with their status.

1. **Scan** `results/figures/`, `docs/paper/figures/`, and experiment result directories
2. **Cross-reference** with paper outline to map to Fig.1, Fig.2, etc.
3. **Show status table:**
   ```
   | Figure | Description | Source | Format | Status |
   |--------|-------------|--------|--------|--------|
   | Fig.1  | Framework   | draw.io | .svg  | Done   |
   | Fig.2a | Benchmark   | matplotlib | .pdf | Done |
   | Fig.2b | Performance | — | — | Missing |
   ```

### `/swf:fig legend [fig-number]`

Write figure legends for publication.

1. **If fig-number given** (e.g., `fig1`), write legend for that figure only. If omitted, write legends for all figures.

2. **Gather information for each figure:**
   - Read the figure file (get dimensions, panels)
   - Read related experiment records for methods/data details
   - Read paper outline for context on what the figure demonstrates

3. **Generate legend following journal conventions** (Nature-style):

   ```markdown
   **Figure 1 | Method overview.**
   **a**, Data preprocessing pipeline. Raw expression matrices are filtered
   for quality control (Methods) and normalized using ... **b**, Model
   architecture. The encoder takes ... and produces ... **c**, Training
   procedure. The model is trained on ... with ... loss function.
   Data shown are from Dataset A (n = 5,000 cells).
   ```

   Rules:
   - Title sentence: bold, describes the WHOLE figure, ends with period
   - Panel descriptions: bold letter, comma, then description
   - Must define ALL error bars (e.g., "error bars represent s.d.")
   - Must state ALL n values (e.g., "n = 3 biological replicates")
   - Must define ALL statistical tests (e.g., "two-tailed Student's t-test")
   - Total length < 250 words per figure
   - Describe what is SHOWN, not the result or conclusion

4. **Save** to `docs/paper/figure-legends.md`

5. **Validate against checklist:**
   - [ ] Every panel mentioned?
   - [ ] All error bars defined?
   - [ ] All n values stated?
   - [ ] All statistical tests described?
   - [ ] Under 250 words?
   - [ ] Describes depiction, not interpretation?

---

## Color Palettes for Publication

When generating figures, use these color-blind friendly palettes:

**Qualitative (categorical data):**
```
#4477AA, #EE6677, #228833, #CCBB44, #66CCEE, #AA3377, #BBBBBB
```

**Sequential (continuous data):**
Use matplotlib's `viridis`, `plasma`, or `cividis` colormaps.

## Notes

- Framework diagrams: iterate with Claude via MCP, then optionally refine in draw.io desktop or Illustrator
- Data plots: always generate via code (reproducible), never draw manually
- All plotting scripts should be committed to git
- Final figures for submission should be in `results/figures/` with clear naming: `fig1-framework.svg`, `fig2a-benchmark.pdf`, etc.
