---
name: done
description: "Complete the current task: write a summary comment on the Linear issue, mark it Done, and suggest next steps"
argument-hint: "[issue-id]"
disable-model-invocation: true
---

# Finish Current Task

Complete a task by documenting what was done and updating Linear.

## Input

`$ARGUMENTS` — optional issue ID (e.g., TAO-5). If omitted, look for the In Progress issue in the current project.

## Workflow

1. **Identify the task:**
   - If issue ID provided, fetch it
   - Otherwise, find the In Progress issue assigned to "me" in the current project
   - If multiple In Progress issues exist, list them and ask which one

2. **Generate summary:**
   - Review what changed: `git diff main...HEAD --stat` or recent commits since task started
   - Summarize the changes in a concise comment:
     ```
     ## 完成摘要
     - 做了什么（1-3 bullet points）
     - 关键文件变更
     - 测试状态

     ## 备注
     - 发现的后续问题（如果有）
     ```

3. **Confirm with user:**
   - Show the draft comment
   - Ask: "确认标记为 Done 吗？"

4. **Update Linear:**
   - Post the summary as a comment on the issue
   - Mark the issue as Done

5. **Suggest next steps:**
   - Check remaining Todo issues in the project
   - If there are more: "还有 N 个 Todo issue，要继续吗？(`/swf:next`)"
   - If none: "当前 milestone 的任务都完成了，要规划下一批吗？(`/swf:plan-next`)"
   - If ADR-worthy decisions were made: "这个任务涉及架构决策，要记录 ADR 吗？(`/swf:adr`)"
