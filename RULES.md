# benefits-gap 规则库（RULES.md）

核实日：2026-10-16。核实人：venture-desk（Claude）。
每条一行结论，后面跟出处 URL。优先 IRS / 法典原文；拿不到原文的标「未核实」。
单页 `public/index.html` 里每条提示都引用这里的编号（R-xx）。改规则先改这里，再改页面。
这不是税务建议。所有数字以 IRS 当年文件为准。

---

## A. 401(k) 2026 年上限

| 编号 | 结论 | 出处 | 核实 |
|---|---|---|---|
| R-A1 | 2026 年员工选择性递延（税前 + Roth 合计）上限 **$24,500**（2025 年 $23,500）。 | IRS 新闻稿 IR-2025-111（2025-11-13）https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500 ；Notice 2025-67 https://www.irs.gov/pub/irs-drop/n-25-67.pdf | ✅ 2026-10-16 |
| R-A2 | 50 岁及以上追加供款 **$8,000**；当年满 60–63 岁的人追加上限 **$11,250**（代替 $8,000）。追加供款不计入 415(c) 总上限。 | 同上；IRS Retirement topics – Catch-up contributions https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-catch-up-contributions ；IRS COLA 表 https://www.irs.gov/retirement-plans/cola-increases-for-dollar-limitations-on-benefits-and-contributions | ✅ 2026-10-16 |
| R-A3 | 415(c) 年度总上限（员工递延 + 雇主 match + 雇主其他供款 + 税后供款 + 没收再分配）为 **$72,000** 与 **100% 报酬** 中较小者；含追加时 $80,000（60–63 岁 $83,250）。 | IRS 401(k) contribution limits 页 https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits ；法典 26 U.S.C. §415(c)(2)「annual addition = employer contributions + employee contributions + forfeitures」 https://www.law.cornell.edu/uscode/text/26/415 | ✅ 2026-10-16 |
| R-A4 | 415(c) 上限按「同一雇主（含关联雇主）维护的计划」算；换到不相关的新雇主，新雇主处另起一个 $72,000。$24,500 的递延上限则是按人算，全年所有雇主合计。 | IRS 401(k) limits 页原文「total annual additions to a participant's accounts in plans maintained by one employer (and any related employer)」；递延上限按人见同页「Deferral limits」 | ✅ 2026-10-16 |
| R-A5 | 2026 年起，**上一年在本雇主的 FICA 工资超过 $150,000** 的人，追加供款必须做成 Roth；计划没有 Roth 选项的，这类人就不能追加。最终规则 T.D. 10033 自 2027 税年起强制，2026 年按「合理善意」标准执行。 | IRS Catch-up 页原文「Beginning in 2026 … must make catch-up contributions on a Roth basis if prior-year wages with the plan sponsor exceeded $150,000 (for 2026)」；T.D. 10033，IRB 2025-40 https://www.irs.gov/irb/2025-40_IRB | ✅ 2026-10-16（$150,000 这个 2026 数字只在 IRS 网页上，Notice 2025-67 原文未逐字核对） |
| R-A6 | 2026 年计入供款的报酬上限 $360,000；高收入员工（HCE）门槛：上年报酬 > $160,000。 | IRS COLA 表（同 R-A2） | ✅ 2026-10-16 |

## B. Mega backdoor Roth（税后 401(k) 供款 → Roth）

| 编号 | 结论 | 出处 | 核实 |
|---|---|---|---|
| R-B1 | 税后供款空间 = **$72,000 − 你的递延（最多 $24,500）− 雇主全年供款（match + 其他）**。这是由 R-A3 推出的算法，不是 IRS 单独列的数字。 | 26 U.S.C. §415(c)；IRS 401(k) limits 页（同 R-A3） | ✅ 算法推导 |
| R-B2 | 要能做，计划文件必须同时允许：(a) 税后（非 Roth）员工供款；(b) 把税后供款转成 Roth —— 计划内 Roth 转换（in-plan Roth rollover），或在职取出（in-service distribution）滚到 Roth IRA。两条都由计划自己定，IRS 不强制。 | IRS Designated Roth accounts FAQ 原文「If your plan allows it, you can roll over any vested plan balance … The plan can specify which of these amounts are eligible for in-plan Roth rollovers」 https://www.irs.gov/retirement-plans/retirement-plans-faqs-on-designated-roth-accounts | ✅ 2026-10-16 |
| R-B3 | 转换时只对「税后本金之外的收益」计税；转得越快，计税收益越少。 | 同上 FAQ：「include the taxable amount (fair market value minus your basis in the distribution)」 | ✅ 2026-10-16 |
| R-B4 | 一次分配可以把税前部分和税后部分分别定向（税前 → 传统 IRA / 计划，税后 → Roth IRA），IRS 把同时发出的多笔视为一笔分配。适用于 2015-01-01 起的分配。 | Notice 2014-54，IRB 2014-41 https://www.irs.gov/irb/2014-41_IRB （原文「treated as a single distribution … the entire pretax amount is assigned to the amount of the distribution that is directly rolled over」） | ✅ 2026-10-16 |
| R-B5 | 常见公司限制：税后供款要过 ACP 非歧视测试（把 match 和税后供款一起比 HCE 与非 HCE），不过的话 HCE 的税后供款会被退回；很多公司因此把税后供款封顶在工资的某个百分比。封顶比例是公司规则，不是 IRS 规则。 | IRS 401(k) Fix-It Guide：ACP「dividing each participant's matching and after-tax contributions by the participant's compensation」 https://www.irs.gov/retirement-plans/401k-plan-fix-it-guide-the-plan-failed-the-401k-adp-and-acp-nondiscrimination-tests | ✅ 2026-10-16（具体公司封顶比例：未核实，按公司问） |
| R-B6 | 普通 backdoor Roth（传统 IRA 不抵扣 → 转 Roth）和 mega backdoor 是两件事，可以同时做；传统 / SEP / SIMPLE / rollover IRA 在 12/31 有余额会触发 pro-rata 规则。2026 年 IRA 上限 $7,500（50+ 追加 $1,100）。 | IRS IR-2025-111（同 R-A1）；pro-rata：IRS Form 8606 说明 https://www.irs.gov/instructions/i8606 | ✅ 上限已核；8606 条文未逐字核对 |

## C. 401(k) 提前封顶丢 match 与 true-up

| 编号 | 结论 | 出处 | 核实 |
|---|---|---|---|
| R-C1 | IRS 没有规定 match 怎么算、多久算一次。match 公式、计算频率、有没有年终补齐（true-up）全由计划文件（SPD）决定。 | IRS 401(k) Plan Overview 原文「If the plan document permits, the employer can make matching contributions」 https://www.irs.gov/retirement-plans/plan-sponsor/401k-plan-overview | ✅ 2026-10-16 |
| R-C2 | 判断方法：如果 match 按每期工资算（per pay period）且没有 true-up，那么你提前存满 $24,500 之后的每期工资都没有你的供款，也就没有 match。损失 ≈ 封顶之后剩余工资期对应的 match 上限。有 true-up 的计划会在年终或次年初补差。 | 这是算术，不是法规。解释性参考（非官方）：The Finance Buff「401k match every payroll vs true-up」 https://thefinancebuff.com/401k-match-every-payroll-true-up.html ；Betterment at Work「True-Ups」 https://www.betterment.com/work/resources/true-ups | ⚠️ 非官方来源，只用于解释 |
| R-C3 | 该问 HR / payroll 的一句话：「Is our 401(k) match calculated per pay period or on annual compensation, and is there a true-up? If yes, when is it deposited?」 | — | — |
| R-C4 | 年中离职的人可能拿不到 true-up（很多计划要求 12/31 在职）。这也是计划条款。 | 同 R-C1（计划文件）；解释性参考同 R-C2 | ⚠️ 条款因公司而异 |

## D. ESPP（§423 合格员工购股计划）

| 编号 | 结论 | 出处 | 核实 |
|---|---|---|---|
| R-D1 | 折扣最多 15%：购买价不得低于「授予日 FMV 的 85%」与「购买日 FMV 的 85%」中较低者。「lookback」就是计划选了两者取低。 | 26 U.S.C. §423(b)(6) https://www.law.cornell.edu/uscode/text/26/423 ；26 CFR §1.423-2(g) https://www.law.cornell.edu/cfr/text/26/1.423-2 | ✅ 2026-10-16 |
| R-D2 | $25,000 规则：每个日历年最多买「按授予日 FMV 计 $25,000」的股票（即 15% 折扣时实际最多付 $21,250 / 年）；按期权存续的每个日历年累计；一个 offering 没用完的额度不能转到另一个 offering。 | 26 U.S.C. §423(b)(8)；26 CFR §1.423-2(i)（Example 1：$100 授予价 → 每年最多 250 股） | ✅ 2026-10-16 |
| R-D3 | offering 最长期限：购买价以购买日 FMV 定的最长 5 年；否则 27 个月。 | 26 U.S.C. §423(b)(7)；26 CFR §1.423-2(h) | ✅ 2026-10-16 |
| R-D4 | 持有期：授予日后满 2 年 **且** 购买日后满 1 年再卖 = qualifying disposition，普通收入部分 = min(授予日折扣, 实际利得)，其余是资本利得；没满 = disqualifying，购买日的折扣全部按工资计入 W-2。 | IRS Pub 525「Employee stock purchase plan」「Option granted at a discount」 https://www.irs.gov/publications/p525 | ✅ 2026-10-16 |
| R-D5 | 公司每年 1 月 31 日前要给你 Form 3922（当年买的 ESPP 股票）；1099-B 上的成本价常常没含已计入工资的折扣，要在 Form 8949 自己调。 | IRS Pub 525（同上，「you should receive Form 3922 … by January 31, 2026」） | ✅ 2026-10-16 |
| R-D6 | 持股 5% 以上的人不能参加。 | 26 U.S.C. §423(b)(3) | ✅ 2026-10-16 |
| R-D7 | 报名窗口（enrollment window）与每期购买日由公司定；错过报名 = 错过整期折扣。 | 公司规则，非 IRS | — |

## E. RSU 预扣与预缴缺口

| 编号 | 结论 | 出处 | 核实 |
|---|---|---|---|
| R-E1 | RSU 归属属于补充工资。年内补充工资合计 ≤ $100 万时，雇主可以对单独发放的补充工资按 **22% 统一预扣**（或并入常规工资算）；超过 $100 万的部分强制 **37%**，不看 W-4。 | IRS Pub 15 (2026) 第 7 节 Supplemental Wages https://www.irs.gov/publications/p15 | ✅ 2026-10-16 |
| R-E2 | 2026 年单身联邦税档：10% ≤ $12,400；12% ≤ $50,400；22% ≤ $105,700；24% ≤ $201,775；32% ≤ $256,225；35% ≤ $640,600；37% 以上。单身标准扣除 $16,100。 | IRS IR-2025-103（2025-10-09），Rev. Proc. 2025-32 https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill | ✅ 2026-10-16 |
| R-E3 | 缺口算法：应税收入落在 24% 档及以上的人，RSU 按 22% 预扣就少扣了（边际税率 − 22%）× RSU 金额；加州另算。这是算术，不是法规。 | 由 R-E1 + R-E2 推出 | ✅ 推导 |
| R-E4 | 安全港（不罚 underpayment penalty）：全年预扣 + 按时预缴 ≥ 当年税的 90%，或 ≥ 上年税的 100%；**上年 AGI > $150,000 的人要 110%**。欠税不到 $1,000 也不罚。 | IRS Pub 505 (2026) 第 2 章「General Rule」「Higher Income Taxpayers」 https://www.irs.gov/publications/p505 | ✅ 2026-10-16 |
| R-E5 | 2026 年联邦预缴截止日：**2026-04-15、2026-06-15、2026-09-15、2027-01-15**；2027-01-31 前报税并付清可免最后一期。 | IRS Pub 505 (2026)「When To Pay Estimated Tax」；Form 1040-ES (2026) https://www.irs.gov/pub/irs-pdf/f1040es.pdf | ✅ 2026-10-16 |
| R-E6 | 工资预扣默认视为四期平均缴纳（「one-fourth … on each payment due date」），所以年底在 W-4 第 4(c) 行加扣可以补全年的缺口；预缴（1040-ES）只算实际缴的那期。 | IRS Form 2210 说明 https://www.irs.gov/instructions/i2210 ；Pub 505 第 1 章「How Do You Increase Your Withholding?」 | ✅ 2026-10-16 |
| R-E7 | 公司可能每年把 RSU 预扣率重置回 22%，或根本不让选。要问 payroll：「Can I elect a higher federal withholding rate on RSU vests, and does it reset each year?」 | 公司规则，非 IRS（美卡论坛原帖楼主 nycycr 2026-07-20 描述的情况） | — |
| R-E8 | 加州：奖金与股票类补充工资的州预扣统一 **10.23%**，其他补充工资 6.6%。 | EDD DE 44 (2025) https://edd.ca.gov/siteassets/files/pdf_pub_ctr/de44-25.pdf ；EDD DE 231PS https://edd.ca.gov/siteassets/files/pdf_pub_ctr/de231ps.pdf | ⚠️ 2026 版 DE 44 未核实；费率自 2009-11 起未变 |
| R-E9 | 加州预缴：欠税 ≥ $500 要预缴；四期比例 **30% / 40% / 0% / 30%**，截止 2026-04-15、06-15、09-15（不缴）、2027-01-15；安全港 90% 当年或 100% 上年，上年加州 AGI > $150,000 要 110%，当年加州 AGI ≥ $100 万的只能按当年 90%。加扣用 EDD DE 4。 | FTB 2026 Form 540-ES 说明 https://www.ftb.ca.gov/forms/2026/2026-540-es-instructions.html | ✅ 2026-10-16 |

## F. HSA 2026

| 编号 | 结论 | 出处 | 核实 |
|---|---|---|---|
| R-F1 | 2026 年 HSA 上限：个人 HDHP **$4,400**，家庭 HDHP **$8,750**；55 岁及以上另加 $1,000。雇主存的钱计入同一个上限。 | Rev. Proc. 2025-19，IRB 2025-21 https://www.irs.gov/irb/2025-21_IRB ；IRS Pub 969 https://www.irs.gov/publications/p969 | ✅ 2026-10-16 |
| R-F2 | 2026 年 HDHP 定义：最低免赔额 $1,700（个人）/ $3,400（家庭）；最高自付 $8,500 / $17,000。 | Rev. Proc. 2025-19（同上） | ✅ 2026-10-16 |
| R-F3 | 不是全年合格的人，上限按合格月份 ÷ 12 折算；**last-month rule**：12 月 1 日那天合格，就可以按全年上限存。 | IRS Pub 969「Last-month rule」 | ✅ 2026-10-16 |
| R-F4 | 用了 last-month rule 的人有测试期：从当年 12 月到次年 12 月 31 日必须一直合格；中途不合格（死亡或残疾除外），多存的部分计入收入并加 10% 额外税。 | IRS Pub 969「Testing period」（例：2025-12-01 到 2026-12-31） | ✅ 2026-10-16 |
| R-F5 | 当年 HSA 可以存到次年 4 月 15 日。 | IRS Pub 969「When To Contribute」 | ✅ 2026-10-16 |
| R-F6 | 加州不认 HSA：联邦扣除要在 Schedule CA 加回，账户内收益当年在加州计税。 | FTB Schedule CA (540) 说明 line 13「California does not conform」 https://www.ftb.ca.gov/forms/2024/2024-540-ca-instructions.html ；FTB Pub 1001 (2025) https://www.ftb.ca.gov/forms/2025/2025-1001-publication.pdf | ✅ 2026-10-16（2025 版 Schedule CA 行号未核对） |

## G. 页面用到但不是法规的默认值（全部可改）

| 编号 | 默认值 | 说明 |
|---|---|---|
| G1 | 一年 26 个发薪期（双周） | 用户可改成 24 / 12 / 52 |
| G2 | 今天的日期由浏览器取 | 用来算「还剩几个发薪期」「下一个预缴截止日」 |
| G3 | 预扣缺口只算联邦 22% 对应的部分；加州 10.23% 对应的缺口用加州 9.3% / 10.3% / 11.3% 档粗算 | 加州 2026 税档：FTB 尚未发布 2026 版，页面用 2025 档并标「上年档」 |
| G4 | ESPP 的「错过的折扣」= 参与上限 × 15% | 公司上限按 min(工资 × 公司比例, $25,000 规则) 估 |

## H. 不做的事

- 不算具体税额，不出「你应该」的句子，只写「规则说符合 X 的人可以 Y」。
- 不读工资单、不传文件、不存任何输入。
- 不覆盖：非合格 ESPP、ISO、NSO、457(b)、403(b)、自雇 Solo 401(k)、州外税。
