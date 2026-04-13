# Paper Submission Checklist

参考 Nature 系列期刊要求。不同期刊略有差异，以目标期刊 guidelines 为准。

## 正文 Sections

| Section | 说明 | 数据来源 |
|---------|------|---------|
| Title | 简明，不超过 2 行，避免术语 | — |
| Abstract | 150-200 words，不引用文献，单段 | 全文提炼 |
| Introduction | 背景、gap、贡献，不是文献综述 | 文献调研 |
| Results | 按主题分小节，配图表 | 实验记录 |
| Discussion | 解读、与已有工作对比、局限性、展望 | 实验 + 文献 |
| Methods | 在线版，最多 3000 words | design.md + configs |

## Methods 必含子项

| 子项 | 说明 |
|------|------|
| 数据描述 | 每个数据集的来源、大小、版本、GEO/ArrayExpress ID |
| 数据预处理 | 完整流程，参数，可复现 |
| 核心算法/模型 | 公式推导或引用，关键超参 |
| 实现细节 | 训练策略、优化器、硬件、运行时间 |
| 工具与版本 | 所有使用的软件包及版本号 |
| 统计方法 | 所有统计检验类型、单/双尾、显著性阈值 |
| 代码可用性 | GitHub URL、license、版本/commit |
| 数据可用性 | 原始数据和处理后数据的获取方式 |

## 图表

| 项目 | 说明 |
|------|------|
| Main Figures | 通常 4-6 张，300 dpi+，最宽 180mm |
| Figure Legends | 每张 <250 words，定义所有 error bars、统计量、n 值 |
| Tables | 带标题和脚注 |
| Extended Data | 最多 10 张，正文引用，同行评审 |
| Supplementary Figures | 补充图，单独编号 |
| Supplementary Tables | 大型数据表（如 Excel） |

## 必备声明（容易遗漏）

| 声明 | 必需？ | 说明 |
|------|--------|------|
| Author Contributions | 必需 | 每位作者的具体贡献，不能只列名字 |
| Competing Interests | 必需 | 每位作者都要声明，没有也要写"无" |
| Funding | 必需 | 基金名称 + 编号，和致谢分开 |
| Data Availability | 必需 | 数据在哪、怎么获取、有无限制 |
| Code Availability | 必需（有代码时） | repo URL + license + 版本 |
| Materials Availability | 视情况 | 特殊材料的获取方式 |
| Ethics Approval | 视情况 | 伦理委员会名称和批准编号 |
| Acknowledgments | 可选 | 简洁，不感谢匿名审稿人 |
| ORCID | 必需（通讯作者） | 通讯作者必须提供 |

## 元信息（投稿前准备）

| 项目 | 说明 |
|------|------|
| 作者列表与排序 | 贡献大小排序，确认每位作者同意 |
| 通讯作者 | 邮箱、电话 |
| 作者单位 | 主要单位（工作完成地），如已换用 Present Address 标注 |
| Keywords | 3-7 个，按字母顺序 |
| Cover Letter | 说明创新性、为什么适合该期刊 |

## 投稿文件清单

- [ ] 主文稿（单个 PDF 或 Word，正文+图）
- [ ] Supplementary Information（PDF，<30MB 每文件）
- [ ] Extended Data figures（单独文件）
- [ ] 源数据文件（Source Data）
- [ ] Cover letter
- [ ] 推荐/回避审稿人列表
- [ ] Reporting summary / checklist（按期刊模板填）

## 容易踩的坑

1. Figure legend 里没写 n 值和 error bar 定义 → desk reject
2. 统计检验没说单尾还是双尾 → reviewer 必问
3. Data availability 写了"available upon request" → 很多期刊不接受，必须存公共仓库
4. Code availability 没有具体 commit/version → 不可复现
5. Author contributions 太笼统（"all authors contributed equally"）→ 不符合要求
6. Methods 里没有数据预处理细节 → reviewer 无法评估
7. 工具版本没写 → 结果不可复现
8. 致谢里感谢了匿名审稿人 → 不符合 Nature 规定
