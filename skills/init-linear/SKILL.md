---
name: init-linear
description: "Initialize Linear workspace for SWF workflow: create label system, Ideas project, Archive project, and configure team settings"

---

# Initialize Linear Workspace

One-time setup to prepare Linear workspace for the SWF workflow.

## Workflow

1. **Check current state:**
   - List existing teams, projects, labels
   - Report what's already set up vs what's missing
   - Skip anything that already exists

2. **Create Label groups and labels:**

   ```
   type（任务类型）
   ├── dev          #4EA7FC  编码开发
   ├── experiment   #F2C94C  实验运行
   ├── writing      #6FCF97  文档/论文写作
   ├── figures      #BB87FC  图表制作
   └── admin        #BDBDBD  提交/沟通/杂务

   executor（执行者）
   ├── agent:claude  #D2915D  Claude Code 处理
   ├── agent:codex   #26B5CE  Codex 处理
   └── manual        #EB5757  需要手动操作
   ```

   - First create parent groups with `create_issue_label` using `isGroup: true`:
     - `type` (isGroup: true)
     - `executor` (isGroup: true)
   - Then create sub-labels with `parent` parameter pointing to the group name:
     - e.g., `create_issue_label(name: "dev", color: "#4EA7FC", description: "编码开发", parent: "type")`
   - Skip any that already exist

3. **Create Ideas project:**
   - Name: Ideas
   - Icon: :bulb:
   - Description: "立项评估漏斗。每个想法作为一个 issue，评估任务作为 sub-issue。评估通过 → 归档 issue，建独立 Project 和 GitHub repo。评估否决 → 归档 issue，留记录。"
   - Skip if already exists

4. **Create Archive project:**
   - Name: Archive
   - Icon: :file_cabinet:
   - Description: "归档中心。所有项目的 Done/Canceled issues 导出为 Documents 存放于此。用于释放 250 issue 额度。"
   - Skip if already exists

5. **Clean up default issues (if present):**
   - Check for Linear onboarding issues (titles like "Get familiar with Linear", "Set up your teams", etc.)
   - Ask user: "发现 X 个 Linear 默认引导 issue，要标记为 Canceled 吗？"
   - If yes, mark them Canceled

6. **Remind team settings:**
   ```
   请在 Linear 网页上手动配置以下设置：

   Settings → Team Settings → Workflows & automations:
   - Auto-close parent issue: 开启（子 issue 全完成时自动关闭父 issue）
   - Auto-archive closed items after: 1 month（最短选项）

   完成后 SWF 工作流即可使用。
   ```

7. **Report:**
   ```
   ## Linear 初始化完成

   ✓ Labels: type (5) + executor (3)
   ✓ Ideas 项目
   ✓ Archive 项目
   ○ 默认 issue 已清理

   手动设置提醒：
   - [ ] Auto-close parent issue
   - [ ] Auto-archive = 1 month

   下一步：
   - /swf:idea <name>    记录第一个研究想法
   - /swf:import         导入已有项目
   ```

## Notes

- This skill is idempotent — safe to run multiple times, skips existing items
- Only creates workspace-level resources, not project-specific ones
- Team settings (auto-close, auto-archive) cannot be set via MCP, must be done manually in web UI
