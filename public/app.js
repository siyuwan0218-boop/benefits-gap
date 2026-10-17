/* Benefits Gap Check — runs entirely in the browser.
   Rules and sources: RULES.md in the repo (ids like R-A1 below).
   Nothing you type leaves this page. Four anonymous counters only (open / calc / src / return). */
(function () {
  "use strict";

  // ---------- 2026 constants (see RULES.md) ----------
  const C = {
    year: 2026,
    deferral: 24500,            // R-A1
    catch50: 8000,              // R-A2
    catch60: 11250,             // R-A2
    total415: 72000,            // R-A3
    rothCatchupWage: 150000,    // R-A5
    espp25k: 25000,             // R-D2
    hsaSelf: 4400, hsaFamily: 8750, hsa55: 1000,   // R-F1
    ira: 7500,                  // R-B6
    stdDed: { single: 16100, mfj: 32200 },         // R-E2
    brackets: {                 // [floor of taxable income, marginal rate]  R-E2
      single: [[0, .10], [12400, .12], [50400, .22], [105700, .24], [201775, .32], [256225, .35], [640600, .37]],
      mfj:    [[0, .10], [24800, .12], [100800, .22], [211400, .24], [403550, .32], [512450, .35], [768700, .37]]
    },
    estDates: ["2026-04-15", "2026-06-15", "2026-09-15", "2027-01-15"],  // R-E5 / R-E9
    caSupp: 0.1023,             // R-E8
    hsaDeadline: "2027-04-15",  // R-F5
    iraDeadline: "2027-04-15"   // R-B6
  };

  // ---------- Sources (label shown, URL opened) ----------
  const SRC = {
    A1: { en: "IRS: 401(k) limit $24,500 for 2026", zh: "IRS：2026 年 401(k) 上限 $24,500", url: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500" },
    A2: { en: "IRS: catch-up contributions", zh: "IRS：追加供款规则", url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-catch-up-contributions" },
    A3: { en: "IRS: 401(k) overall limit ($72,000)", zh: "IRS：401(k) 总上限（$72,000）", url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits" },
    B2: { en: "IRS: in-plan Roth rollover FAQ", zh: "IRS：计划内 Roth 转换问答", url: "https://www.irs.gov/retirement-plans/retirement-plans-faqs-on-designated-roth-accounts" },
    B5: { en: "IRS: ACP test (after-tax contributions)", zh: "IRS：ACP 测试（税后供款）", url: "https://www.irs.gov/retirement-plans/401k-plan-fix-it-guide-the-plan-failed-the-401k-adp-and-acp-nondiscrimination-tests" },
    B6: { en: "IRS: Form 8606 instructions (pro-rata)", zh: "IRS：Form 8606 说明（pro-rata）", url: "https://www.irs.gov/instructions/i8606" },
    C1: { en: "IRS: 401(k) plan overview (match is set by the plan document)", zh: "IRS：401(k) 概览（match 由计划文件定）", url: "https://www.irs.gov/retirement-plans/plan-sponsor/401k-plan-overview" },
    D1: { en: "26 U.S.C. §423 (ESPP: 85%, $25,000, holding periods)", zh: "美国法典 26 U.S.C. §423（ESPP：85%、$25,000、持有期）", url: "https://www.law.cornell.edu/uscode/text/26/423" },
    D4: { en: "IRS Pub 525: ESPP dispositions, Form 3922", zh: "IRS Pub 525：ESPP 卖出规则、Form 3922", url: "https://www.irs.gov/publications/p525" },
    E1: { en: "IRS Pub 15 §7: supplemental wages 22% / 37%", zh: "IRS Pub 15 第 7 节：补充工资 22% / 37%", url: "https://www.irs.gov/publications/p15" },
    E2: { en: "IRS: 2026 tax brackets (Rev. Proc. 2025-32)", zh: "IRS：2026 年税档（Rev. Proc. 2025-32）", url: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill" },
    E4: { en: "IRS Pub 505: estimated tax, 90% / 100% / 110% rule, due dates", zh: "IRS Pub 505：预缴税、90% / 100% / 110% 规则、截止日", url: "https://www.irs.gov/publications/p505" },
    E6: { en: "IRS Form 2210 instructions: withholding counts as paid evenly", zh: "IRS Form 2210 说明：预扣视为全年平均缴纳", url: "https://www.irs.gov/instructions/i2210" },
    E8: { en: "CA EDD DE 44: 10.23% on stock/bonus", zh: "加州 EDD DE 44：股票 / 奖金预扣 10.23%", url: "https://edd.ca.gov/siteassets/files/pdf_pub_ctr/de44-25.pdf" },
    E9: { en: "CA FTB 2026 Form 540-ES instructions", zh: "加州 FTB 2026 年 540-ES 说明", url: "https://www.ftb.ca.gov/forms/2026/2026-540-es-instructions.html" },
    F1: { en: "IRS Rev. Proc. 2025-19: HSA limits 2026", zh: "IRS Rev. Proc. 2025-19：2026 年 HSA 上限", url: "https://www.irs.gov/irb/2025-21_IRB" },
    F3: { en: "IRS Pub 969: HSA rules, last-month rule", zh: "IRS Pub 969：HSA 规则、last-month rule", url: "https://www.irs.gov/publications/p969" },
    F6: { en: "CA FTB Schedule CA: no HSA deduction in California", zh: "加州 FTB Schedule CA：加州不认 HSA 扣除", url: "https://www.ftb.ca.gov/forms/2024/2024-540-ca-instructions.html" }
  };

  // ---------- Text ----------
  const T = {
    en: {
      title: "Benefits Gap Check",
      subtitle: "A few paycheck numbers in. A list of workplace-benefit dollars the rules say may still be open to you this year, with deadlines, the sentence to ask HR, and the source for each rule. Nothing leaves your browser.",
      h_inputs: "Your numbers",
      p_inputs: "Rough numbers are fine. Leave a field blank if it does not apply. Nothing is uploaded or saved.",
      g_you: "About you",
      l_salary: "Annual base salary ($)",
      l_pay: "Paychecks per year",
      l_filing: "Filing status",
      o_single: "Single", o_mfj: "Married filing jointly",
      l_age: "Age at the end of this year",
      o_u50: "Under 50", o_50: "50–54", o_55: "55–59", o_60: "60–63", o_64: "64 or older",
      l_state: "State",
      o_other: "Other state / no state income tax", o_ca: "California",
      l_prior: "Last year's adjusted gross income was over $150,000?",
      o_unknown: "Don't know", o_yes: "Yes", o_no: "No",
      g_401k: "401(k)",
      l_k_ytd: "Your 401(k) contributions so far this year ($, pre-tax + Roth)",
      l_k_pct: "Current contribution rate (% of pay)",
      h_k_pct: "Blank = estimated from what you have contributed so far.",
      l_m_rate: "Employer match rate (% of each dollar you put in)",
      l_m_cap: "Match applies up to this % of pay",
      l_trueup: "Does the plan have a match true-up?",
      l_aftertax: "Does the plan allow after-tax contributions with Roth conversion?",
      g_espp: "ESPP (employee stock purchase plan)",
      l_espp: "ESPP status",
      o_espp_none: "Employer has no ESPP", o_espp_no: "Offered, I am not enrolled", o_espp_yes: "Enrolled",
      l_espp_disc: "Discount (%)",
      l_espp_cap: "Max contribution (% of pay)",
      g_rsu: "RSUs",
      l_rsu_ytd: "RSU value vested so far this year ($)",
      l_rsu_more: "RSU value still to vest this year ($)",
      l_rsu_wh: "Federal withholding rate on vests (%)",
      g_hsa: "HSA",
      l_hsa: "High-deductible health plan (HDHP) coverage",
      o_hsa_none: "No HDHP / no HSA", o_hsa_self: "Self-only", o_hsa_family: "Family",
      l_hsa_ytd: "HSA contributions so far this year ($)",
      h_hsa_ytd: "Include what your employer deposited.",
      b_calc: "Check my gaps",
      b_example: "Fill an example",
      p_local: "Calculated on this device only.",
      h_results: "What the rules say may still be open",
      p_results_note: "Amounts are estimates from the numbers you typed and 2026 federal rules. Plan documents and payroll decide what actually applies. Nothing here is advice.",
      f_notadvice: "This page is general information about published rules, not tax, legal, or investment advice. It is not a substitute for your plan documents, a tax professional, or HR.",
      f_privacy: "Privacy: all math runs in your browser. No account, no cookies, no third-party scripts, no analytics vendors. The server keeps four anonymous daily counters (page opened, check run, source clicked, returning visit) and does not store IP addresses. The \"returning visit\" counter uses one flag saved in your browser; clear site data to remove it.",
      f_rules: "Rules were checked against IRS, U.S. Code, and California FTB/EDD documents on 2026-10-16. Each finding links its source.",
      f_how: "How the estimates work",
      f_how_body: "Paychecks remaining = paychecks per year × fraction of the year left. Unused 401(k) room = $24,500 (plus catch-up) − contributed. Lost match = per-paycheck match × paychecks with no contribution after you hit the cap, when there is no true-up. After-tax space = $72,000 − your deferrals − employer contributions. ESPP discount = purchase cap × discount ÷ (1 − discount). RSU gap = (marginal bracket − withholding rate) × RSU value; the marginal bracket comes from salary + RSUs − 401(k) − standard deduction. HSA room = 2026 limit − contributed.",
      f_feedback: "Found a wrong number? Say which rule, with a link if you have one.",
      f_issues: "GitHub Issues",
      f_source: "Source code and rules file",
      f_stats: "Public counters",
      yearNotice: (y) => `The rules on this page are for tax year ${C.year}. Today is in ${y}; limits may have changed.`,
      asof: (d, left, per) => `As of ${d}: about ${left} of ${per} paychecks left this year.`,
      need_salary: "Enter an annual salary to start.",
      tile_money: "Employer money at risk",
      tile_room: "Unused tax-advantaged room",
      tile_tax: "Possible tax shortfall",
      lbl_amount: "Amount", lbl_deadline: "By", lbl_ask: "Ask HR / payroll",
      none_title: "Nothing stands out",
      none_body: "With these numbers, no gap shows up in the six areas checked. Plan documents can still differ.",
      // findings
      k_room_t: "401(k) room still open this year",
      k_room_a: (r, per, n) => `${r} (about ${per} per paycheck over the remaining ${n})`,
      k_room_d: (lim, cu) => `Rules say employees can defer up to ${lim} in 2026${cu ? `, including a ${cu} catch-up at your age` : ""}. Pre-tax and Roth share this one limit. Payroll deductions have to land by the last paycheck of the year.`,
      k_room_dl: "Last 2026 paycheck",
      k_room_ask: "What is the last payroll date on which I can change my 401(k) election for this year?",
      k_full_t: "401(k) employee limit already reached",
      k_full_d: (lim) => `You reported ${lim} or more. Rules say contributions above the limit have to be returned by April 15 of next year, so it is worth checking that payroll stopped automatically.`,
      match_lost_t: "Match that may be lost by hitting the cap early",
      match_lost_a: (x, n) => `${x} (${n} paycheck${n === 1 ? "" : "s"} with no contribution after the cap)`,
      match_lost_d: (pc, cap) => `At the current rate the employee limit is reached around paycheck ${pc} of ${cap}. In plans that compute the match each pay period and have no true-up, paychecks with no employee contribution get no match. The IRS leaves the match formula and any true-up to the plan document.`,
      match_lost_d_unknown: " Whether your plan has a true-up is the one fact that decides this.",
      match_lost_d_no: " You said the plan has no true-up, so spreading contributions across all remaining paychecks keeps every match dollar.",
      match_lost_dl: "Next payroll election change",
      match_lost_ask: "Is the 401(k) match calculated per pay period or on annual pay? Is there a true-up, and when is it deposited?",
      trueup_yes_t: "True-up plan: front-loading is safe, timing is not",
      trueup_yes_d: "You said the plan has a true-up. Those deposits usually arrive after year-end, and many plans require you to be employed on December 31 to receive one. Worth knowing before a job change.",
      trueup_yes_ask: "When is the match true-up deposited, and do I need to be employed on 12/31 to receive it?",
      under_t: "Contributing below the match threshold",
      under_a: (x) => `about ${x} of match not earned over the rest of the year`,
      under_d: (p, cap) => `Your contribution rate (${p}%) is below the ${cap}% of pay the employer matches. Rules do not require any minimum; the plan simply matches what you put in, up to its cap.`,
      under_ask: "What is the minimum contribution rate to receive the full match this year?",
      mbdr_t: "After-tax 401(k) space (mega backdoor Roth)",
      mbdr_a: (x, per, n) => `up to about ${x} this year (about ${per} per paycheck over ${n})`,
      mbdr_d: (emp, er) => `Rules cap all 2026 additions to one employer's plan at $72,000: your deferrals (about ${emp}) plus employer money (about ${er}) plus any after-tax contributions. The rest of the $72,000 can be after-tax money only if the plan allows after-tax contributions and lets you convert them to Roth (in-plan conversion or in-service rollover). Many plans also cap after-tax contributions at a percentage of pay because of the ACP test. The limit is per employer, so a job change opens a second $72,000.`,
      mbdr_d_unknown: " Whether your plan allows this is the question to ask.",
      mbdr_dl: "Last 2026 paycheck (payroll) · conversion any time",
      mbdr_ask: "Does the plan accept after-tax (non-Roth) contributions? Is there an automatic in-plan Roth conversion or in-service withdrawal? What is the after-tax contribution cap?",
      mbdr_no_t: "After-tax 401(k) not available in this plan",
      mbdr_no_d: (x) => `You said the plan does not allow it, so the roughly ${x} of after-tax space under the $72,000 limit cannot be used here. Plans change; it is a yes/no question to repeat each open enrollment.`,
      espp_t: "ESPP discount not being collected",
      espp_a: (yr, rest) => `about ${yr} per year before tax (${rest} for the rest of this year)`,
      espp_d: (cap, disc, pay) => `Rules allow a qualified ESPP to sell stock at up to ${disc}% below market, capped at $25,000 of stock (at grant-date value) per calendar year, so the most you can put in is about $${pay.toLocaleString()} a year and your plan's ${cap}% of pay cap may be lower. Buying at ${100 - disc} and receiving 100 is the discount; a lookback feature can add more if the price rises during the offering. Shares held 2 years from grant and 1 year from purchase get the better tax treatment.`,
      espp_dl: "Next enrollment window (plan-specific)",
      espp_ask: "When is the next ESPP enrollment window, does the plan have a lookback, and what is the contribution cap?",
      espp_in_t: "ESPP: two dates decide the tax",
      espp_in_d: "You are enrolled. Rules treat a sale as qualifying only after both 2 years from the grant date and 1 year from the purchase date; earlier sales put the full purchase-day discount on your W-2. Your employer sends Form 3922 by January 31; the broker's 1099-B cost basis usually leaves out the discount already taxed as wages, so it is adjusted on Form 8949.",
      espp_in_ask: "Where can I download Form 3922 and the offering/purchase dates for each lot?",
      rsu_t: "RSU withholding below your likely tax rate",
      rsu_a: (lo, hi, wh) => (lo === hi ? `about ${hi}` : `about ${lo} to ${hi}`) + ` of federal tax not withheld at ${wh}%`,
      rsu_d: (wh, lo, hi, total) => `Rules let employers withhold a flat 22% on RSU vests under $1,000,000 of supplemental wages a year. Your RSU value this year (${total}) stacked on salary lands in the ${lo === hi ? lo : lo + "–" + hi} federal bracket, so ${wh}% withholding leaves a gap that shows up as a bill in April. No penalty applies if total withholding plus estimated payments reach 90% of this year's tax or 100% of last year's (110% if last year's AGI was over $150,000).`,
      rsu_d_prior: (p) => p === "yes" ? " You said last year's AGI was over $150,000, so the safe harbor is 110% of last year's tax." : (p === "no" ? " You said last year's AGI was $150,000 or less, so 100% of last year's tax is enough." : ""),
      rsu_d_mfj: " Married filing jointly: a spouse's income is not in this estimate, so the real bracket may be higher.",
      rsu_fix: (per, n) => `Extra withholding counts as paid evenly through the year, so adding about ${per} per remaining paycheck (${n}) on Form W-4 line 4(c) can close the gap without a penalty. Estimated payments only count for the quarter they are paid in.`,
      rsu_dl: (d) => `Next estimated-tax date ${d} · W-4 change by your last paycheck`,
      rsu_ask: "Can I elect a federal withholding rate above 22% on RSU vests, and does the election reset each year?",
      rsu_ok_t: "RSU withholding looks at or above your bracket",
      rsu_ok_d: (wh, hi) => `At ${wh}% withholding and an estimated ${hi} federal bracket, the RSUs themselves are not creating a federal shortfall. Other income can still change the picture.`,
      rsu_ca_t: "California RSU withholding",
      rsu_ca_d: (x) => `California withholds a flat 10.23% on stock and bonus pay (about ${x} on this year's RSUs). California's marginal rates at this income are often higher, and California estimated payments are due in 30% / 40% / 0% / 30% installments. Extra state withholding goes on form DE 4.`,
      rsu_ca_ask: "Can I increase California withholding on RSU vests, or do I need to file a DE 4?",
      hsa_t: "HSA room still open",
      hsa_a: (r, per, n) => `${r} (about ${per} per paycheck over ${n}, or a lump sum by April 15)`,
      hsa_d: (lim, cov, c55) => `Rules set the 2026 HSA limit at ${lim} for ${cov} HDHP coverage${c55 ? " including the $1,000 catch-up from age 55" : ""}; employer deposits count toward it. Contributions for 2026 can be made until April 15, 2027. If you were not HDHP-covered all year, the limit is prorated by month unless you are covered on December 1 and stay covered through December 2027 (last-month rule).`,
      hsa_d_ca: " California does not recognize the HSA deduction, so the state tax benefit is zero there.",
      hsa_dl: "Payroll: last 2026 paycheck · Direct: April 15, 2027",
      hsa_ask: "Does the employer deposit anything into the HSA, and is the payroll HSA deduction changeable mid-year?",
      hsa_over_t: "HSA contributions above the 2026 limit",
      hsa_over_d: (x, lim) => `You reported ${x} against a ${lim} limit. Rules allow excess contributions to be withdrawn with earnings before the filing deadline to avoid a 6% excise tax.`,
      rothcu_t: "Catch-up contributions must be Roth at your wage level",
      rothcu_d: "Starting in 2026, employees whose prior-year wages from the employer exceeded $150,000 can make catch-up contributions only as Roth. A plan with no Roth option cannot take catch-ups from them at all.",
      rothcu_ask: "Does the plan offer Roth catch-up contributions? If not, can I still make catch-ups in 2026?",
      ira_t: "Also worth checking: IRA",
      ira_d: "Separate from the 401(k), the 2026 IRA limit is $7,500 (plus $1,100 from age 50), with a deadline of April 15, 2027. Earners above the Roth income limits often use the backdoor route (non-deductible traditional IRA, then conversion); a balance in any traditional, SEP, SIMPLE, or rollover IRA on December 31 triggers the pro-rata rule.",
      src_lbl: "Sources:"
    },
    zh: {
      title: "公司福利漏拿检查",
      subtitle: "填几个工资单上的数字，得到一张清单：规则说今年你还可能用得上的福利额度、截止日、该问 HR 的那句话、每条规则的出处。所有计算都在你的浏览器里完成。",
      h_inputs: "你的数字",
      p_inputs: "大概数就行。不适用的留空。不上传，不保存。",
      g_you: "基本情况",
      l_salary: "年薪（美元，底薪）",
      l_pay: "一年发几次工资",
      l_filing: "报税身份",
      o_single: "单身", o_mfj: "夫妻合报",
      l_age: "今年年底的年龄",
      o_u50: "50 岁以下", o_50: "50–54", o_55: "55–59", o_60: "60–63", o_64: "64 岁及以上",
      l_state: "所在州",
      o_other: "其他州 / 无州所得税", o_ca: "加州",
      l_prior: "去年调整后总收入（AGI）超过 $150,000？",
      o_unknown: "不知道", o_yes: "是", o_no: "否",
      g_401k: "401(k)",
      l_k_ytd: "今年已存的 401(k)（美元，税前 + Roth）",
      l_k_pct: "目前供款比例（工资的 %）",
      h_k_pct: "留空 = 按已存金额估算。",
      l_m_rate: "公司 match 比例（你每存 1 元公司配多少 %）",
      l_m_cap: "match 最多配到工资的 %",
      l_trueup: "计划有没有 match 年终补齐（true-up）？",
      l_aftertax: "计划允许税后供款并转 Roth 吗？",
      g_espp: "ESPP（员工购股计划）",
      l_espp: "ESPP 状态",
      o_espp_none: "公司没有 ESPP", o_espp_no: "有，我没参加", o_espp_yes: "已参加",
      l_espp_disc: "折扣（%）",
      l_espp_cap: "最高可投工资的 %",
      g_rsu: "RSU",
      l_rsu_ytd: "今年已归属的 RSU 价值（美元）",
      l_rsu_more: "今年还会归属的 RSU 价值（美元）",
      l_rsu_wh: "归属时的联邦预扣率（%）",
      g_hsa: "HSA",
      l_hsa: "高免赔额医保（HDHP）",
      o_hsa_none: "没有 HDHP / 没有 HSA", o_hsa_self: "个人", o_hsa_family: "家庭",
      l_hsa_ytd: "今年已存的 HSA（美元）",
      h_hsa_ytd: "包括公司存的部分。",
      b_calc: "查我的漏项",
      b_example: "填一个例子",
      p_local: "只在这台设备上计算。",
      h_results: "规则说还可能用得上的",
      p_results_note: "金额是按你填的数字和 2026 年联邦规则估的。实际以计划文件和 payroll 为准。这里没有任何建议。",
      f_notadvice: "本页只是对已公布规则的一般性说明，不是税务、法律或投资建议。它不能代替你的计划文件、税务专业人士或 HR。",
      f_privacy: "隐私：所有计算在你的浏览器里完成。没有账号、没有 cookie、没有第三方脚本、没有分析服务商。服务器只记四个匿名的按日计数（打开页面、算了一次、点了出处、回访），不存 IP 地址。「回访」计数靠你浏览器里的一个标记；清除站点数据就没了。",
      f_rules: "规则于 2026-10-16 对照 IRS、美国法典和加州 FTB/EDD 文件核实。每条结果都链接出处。",
      f_how: "估算方法",
      f_how_body: "剩余发薪次数 = 每年发薪次数 × 今年剩余比例。401(k) 剩余额度 = $24,500（加追加）− 已存。丢掉的 match = 每期 match × 封顶后没有供款的期数（没有 true-up 时）。税后空间 = $72,000 − 你的递延 − 公司供款。ESPP 折扣 = 可投上限 × 折扣 ÷ (1 − 折扣)。RSU 缺口 = (边际税档 − 预扣率) × RSU 金额；边际税档按 年薪 + RSU − 401(k) − 标准扣除 估。HSA 剩余 = 2026 年上限 − 已存。",
      f_feedback: "发现数字不对？说是哪一条，有链接更好。",
      f_issues: "GitHub Issues",
      f_source: "源码与规则文件",
      f_stats: "公开计数",
      yearNotice: (y) => `本页规则对应 ${C.year} 税年。今天是 ${y} 年，上限可能已变。`,
      asof: (d, left, per) => `截至 ${d}：今年大约还剩 ${left} 次发薪（全年 ${per} 次）。`,
      need_salary: "先填年薪。",
      tile_money: "可能丢掉的公司钱",
      tile_room: "没用上的免税额度",
      tile_tax: "可能的补税缺口",
      lbl_amount: "金额", lbl_deadline: "截止", lbl_ask: "问 HR / payroll",
      none_title: "没有明显漏项",
      none_body: "按这些数字，六个方面都没有发现缺口。计划文件仍可能不同。",
      k_room_t: "今年 401(k) 还剩的额度",
      k_room_a: (r, per, n) => `${r}（剩下 ${n} 次发薪，每次约 ${per}）`,
      k_room_d: (lim, cu) => `规则说 2026 年员工最多可递延 ${lim}${cu ? `，含你这个年龄段的追加 ${cu}` : ""}。税前和 Roth 共用这一个上限。工资扣款要在今年最后一次发薪前到账。`,
      k_room_dl: "2026 年最后一次发薪",
      k_room_ask: "今年最后一次能改 401(k) 供款比例的 payroll 日期是哪天？",
      k_full_t: "401(k) 员工上限已到",
      k_full_d: (lim) => `你填的已达到 ${lim}。规则说超出部分要在明年 4 月 15 日前退回，值得确认 payroll 已自动停扣。`,
      match_lost_t: "提前封顶可能丢掉的 match",
      match_lost_a: (x, n) => `${x}（封顶后有 ${n} 次发薪没有供款）`,
      match_lost_d: (pc, cap) => `按现在的比例，大约在第 ${pc} 次发薪（全年 ${cap} 次）就到员工上限。按每期工资算 match 且没有 true-up 的计划，没有员工供款的那几期就没有 match。IRS 把 match 公式和有没有 true-up 都交给计划文件决定。`,
      match_lost_d_unknown: " 计划有没有 true-up，是决定这件事的唯一事实。",
      match_lost_d_no: " 你说计划没有 true-up，那么把供款摊到剩下的每次发薪，就能拿到全部 match。",
      match_lost_dl: "下一次 payroll 可改供款比例的日期",
      match_lost_ask: "401(k) match 是按每期工资算还是按全年工资算？有没有 true-up？什么时候到账？",
      trueup_yes_t: "有 true-up：提前存满不丢钱，但看时间",
      trueup_yes_d: "你说计划有 true-up。这笔钱通常年后才到账，很多计划要求 12 月 31 日仍在职才给。换工作前值得知道。",
      trueup_yes_ask: "true-up 什么时候到账？需要 12/31 在职才能拿到吗？",
      under_t: "供款比例低于 match 门槛",
      under_a: (x) => `今年剩下的时间大约有 ${x} 的 match 拿不到`,
      under_d: (p, cap) => `你的供款比例（${p}%）低于公司配到的 ${cap}%。规则不要求最低比例；计划只是按你存的配，配到它的上限为止。`,
      under_ask: "今年要拿到全部 match，最低供款比例是多少？",
      mbdr_t: "税后 401(k) 空间（mega backdoor Roth）",
      mbdr_a: (x, per, n) => `今年最多约 ${x}（剩下 ${n} 次发薪，每次约 ${per}）`,
      mbdr_d: (emp, er) => `规则把 2026 年进入同一雇主计划的全部供款封顶在 $72,000：你的递延（约 ${emp}）+ 公司的钱（约 ${er}）+ 税后供款。$72,000 剩下的部分只有在计划允许税后供款、并且能转成 Roth（计划内转换或在职滚存）时才用得上。很多公司因为 ACP 测试把税后供款封顶在工资的某个比例。这个上限按雇主算，换工作会多出一个 $72,000。`,
      mbdr_d_unknown: " 你的计划允不允许，就是要问的那个问题。",
      mbdr_dl: "payroll：2026 年最后一次发薪 · 转换：随时",
      mbdr_ask: "计划接受税后（非 Roth）供款吗？有自动计划内 Roth 转换或在职取出吗？税后供款上限是多少？",
      mbdr_no_t: "这个计划没有税后 401(k)",
      mbdr_no_d: (x) => `你说计划不允许，所以 $72,000 上限下大约 ${x} 的税后空间在这里用不上。计划会变，这个是非题每年 open enrollment 再问一次。`,
      espp_t: "没有拿的 ESPP 折扣",
      espp_a: (yr, rest) => `每年税前约 ${yr}（今年剩余时间约 ${rest}）`,
      espp_d: (cap, disc, pay) => `规则允许合格 ESPP 以最多低于市价 ${disc}% 卖股票给员工，每个日历年最多买 $25,000（按授予日价值）的股票，所以一年最多投入约 $${pay.toLocaleString()}，你的计划 ${cap}% 工资的上限可能更低。花 ${100 - disc} 拿到 100 就是折扣；有 lookback 的计划在股价上涨时折扣更多。授予日后满 2 年且购买日后满 1 年再卖，税务处理更好。`,
      espp_dl: "下一个报名窗口（各公司不同）",
      espp_ask: "下一个 ESPP 报名窗口是什么时候？计划有 lookback 吗？投入上限是多少？",
      espp_in_t: "ESPP：两个日期决定税",
      espp_in_d: "你已参加。规则只有在授予日后满 2 年且购买日后满 1 年卖出才算 qualifying；提前卖，购买日的全部折扣进 W-2。公司 1 月 31 日前给 Form 3922；券商 1099-B 的成本价通常不含已按工资计税的折扣，要在 Form 8949 上调整。",
      espp_in_ask: "在哪里下载 Form 3922 和每批股票的 offering / 购买日期？",
      rsu_t: "RSU 预扣率低于你大概的税率",
      rsu_a: (lo, hi, wh) => (lo === hi ? `约 ${hi}` : `约 ${lo} 到 ${hi}`) + ` 的联邦税没有按 ${wh}% 扣到`,
      rsu_d: (wh, lo, hi, total) => `规则允许雇主对一年内不超过 $1,000,000 的补充工资按 22% 统一预扣。你今年的 RSU（${total}）叠在年薪上，落在联邦 ${lo === hi ? lo : lo + "–" + hi} 档，所以 ${wh}% 的预扣会留下缺口，4 月报税时变成账单。全年预扣 + 预缴达到今年税的 90%，或去年税的 100%（去年 AGI 超过 $150,000 时 110%），就不罚款。`,
      rsu_d_prior: (p) => p === "yes" ? " 你说去年 AGI 超过 $150,000，所以安全线是去年税的 110%。" : (p === "no" ? " 你说去年 AGI 不超过 $150,000，所以去年税的 100% 就够。" : ""),
      rsu_d_mfj: " 夫妻合报：配偶收入不在这个估算里，实际税档可能更高。",
      rsu_fix: (per, n) => `加扣的工资预扣视为全年平均缴纳，所以在 W-4 第 4(c) 行每次发薪多扣约 ${per}（剩 ${n} 次）就能补上缺口且不罚款。预缴只算实际缴的那个季度。`,
      rsu_dl: (d) => `下一个预缴日 ${d} · W-4 改动要在最后一次发薪前`,
      rsu_ask: "RSU 归属时能选高于 22% 的联邦预扣率吗？这个选择每年会重置吗？",
      rsu_ok_t: "RSU 预扣率不低于你的税档",
      rsu_ok_d: (wh, hi) => `按 ${wh}% 预扣和估计的联邦 ${hi} 档，RSU 本身没有造成联邦缺口。其他收入仍可能改变结果。`,
      rsu_ca_t: "加州 RSU 预扣",
      rsu_ca_d: (x) => `加州对股票和奖金类工资统一预扣 10.23%（今年 RSU 约 ${x}）。这个收入水平的加州边际税率常常更高，加州预缴按 30% / 40% / 0% / 30% 四期。州税加扣填 DE 4 表。`,
      rsu_ca_ask: "RSU 归属时能提高加州预扣吗？还是要填 DE 4？",
      hsa_t: "HSA 还剩的额度",
      hsa_a: (r, per, n) => `${r}（剩 ${n} 次发薪每次约 ${per}，或 4 月 15 日前一次存入）`,
      hsa_d: (lim, cov, c55) => `规则把 2026 年 ${cov} HDHP 的 HSA 上限定为 ${lim}${c55 ? "，含 55 岁起的 $1,000 追加" : ""}；公司存的算在内。2026 年的额度可以存到 2027 年 4 月 15 日。如果不是全年都有 HDHP，上限按月份折算，除非 12 月 1 日有 HDHP 并一直保持到 2027 年 12 月（last-month rule）。`,
      hsa_d_ca: " 加州不认 HSA 扣除，州税上没有好处。",
      hsa_dl: "payroll：2026 年最后一次发薪 · 自己存：2027 年 4 月 15 日",
      hsa_ask: "公司会往 HSA 里存钱吗？payroll 的 HSA 扣款年中能改吗？",
      hsa_over_t: "HSA 存超了 2026 年上限",
      hsa_over_d: (x, lim) => `你填的 ${x} 超过上限 ${lim}。规则允许在报税截止日前连同收益取出超额部分，避免 6% 的消费税。`,
      rothcu_t: "你的工资水平，追加供款必须是 Roth",
      rothcu_d: "2026 年起，上一年在本雇主工资超过 $150,000 的员工，追加供款只能做 Roth。没有 Roth 选项的计划就不能接受他们的追加供款。",
      rothcu_ask: "计划有 Roth 追加供款吗？没有的话，我 2026 年还能追加吗？",
      ira_t: "顺便查一下：IRA",
      ira_d: "和 401(k) 分开算，2026 年 IRA 上限 $7,500（50 岁起加 $1,100），截止 2027 年 4 月 15 日。收入超过 Roth 限额的人常走后门（先存不抵扣的传统 IRA，再转换）；12 月 31 日任何传统 / SEP / SIMPLE / rollover IRA 有余额会触发 pro-rata 规则。",
      src_lbl: "出处："
    }
  };

  // ---------- helpers ----------
  const $ = (id) => document.getElementById(id);
  const num = (id) => { const v = parseFloat($(id).value); return Number.isFinite(v) && v >= 0 ? v : null; };
  const sel = (id) => $(id).value;
  const money = (n) => "$" + Math.round(n).toLocaleString("en-US");
  const pct = (r) => Math.round(r * 100) + "%";
  let lang = "en";
  const t = (k, ...a) => { const v = T[lang][k]; return typeof v === "function" ? v(...a) : (v == null ? k : v); };

  function todayDate() {
    const q = new URLSearchParams(location.search).get("today");
    if (q && /^\d{4}-\d{2}-\d{2}$/.test(q)) return new Date(q + "T12:00:00");
    return new Date();
  }
  function marginal(filing, taxable) {
    const b = C.brackets[filing]; let r = b[0][1];
    for (const [floor, rate] of b) if (taxable >= floor) r = rate;
    return r;
  }
  function nextEst(d) {
    const iso = d.toISOString().slice(0, 10);
    return C.estDates.find((x) => x >= iso) || C.estDates[C.estDates.length - 1];
  }

  // ---------- counters (anonymous) ----------
  function ev(name) {
    try {
      fetch("/api/e", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ev: name }), keepalive: true }).catch(() => {});
    } catch (_) { /* offline or file:// */ }
  }
  let calcSent = false;
  function markVisit() {
    try {
      const k = "bg_last_calc";
      const prev = localStorage.getItem(k);
      if (prev && Date.now() - Number(prev) > 24 * 3600e3) ev("return");
    } catch (_) { /* storage blocked */ }
  }
  function rememberCalc() {
    try { localStorage.setItem("bg_last_calc", String(Date.now())); } catch (_) { /* ignore */ }
  }

  // ---------- i18n render ----------
  function applyLang() {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.getAttribute("data-i18n")); });
    $("langBtn").textContent = lang === "en" ? "中文" : "English";
    document.title = t("title");
    if (!$("out").classList.contains("hidden")) compute();
  }

  // ---------- core ----------
  function compute() {
    const now = todayDate();
    const yr = now.getFullYear();
    const yn = $("yearNotice");
    if (yr !== C.year) { yn.textContent = t("yearNotice", yr); yn.classList.remove("hidden"); } else yn.classList.add("hidden");

    const salary = num("salary");
    const out = $("out"); const F = $("findings"); const tiles = $("tiles");
    out.classList.remove("hidden");
    if (!salary) { $("asof").textContent = t("need_salary"); tiles.innerHTML = ""; F.innerHTML = ""; return; }

    const P = parseInt(sel("periods"), 10);
    const start = new Date(yr, 0, 1), end = new Date(yr + 1, 0, 1);
    const frac = Math.min(1, Math.max(0, (now - start) / (end - start)));
    const elapsed = Math.min(P, Math.floor(frac * P));
    const left = Math.max(1, P - elapsed);
    const perPay = salary / P;
    const filing = sel("filing"); const age = sel("age"); const state = sel("state"); const prior = sel("prior");
    const catchUp = age === "60" ? C.catch60 : (age === "u50" ? 0 : C.catch50);
    const is55 = age === "55" || age === "60" || age === "64";
    $("asof").textContent = t("asof", now.toISOString().slice(0, 10), left, P);

    const findings = [];
    let moneyAtRisk = 0, room = 0, taxGap = 0;

    // --- 401(k) ---
    const kYtd = num("k_ytd") || 0;
    const limit = C.deferral + catchUp;
    const kPctIn = num("k_pct");
    const payPerPeriod = kPctIn != null ? perPay * kPctIn / 100 : (elapsed > 0 ? kYtd / elapsed : 0);
    const kPct = perPay > 0 ? payPerPeriod / perPay * 100 : 0;
    const kRoom = Math.max(0, limit - kYtd);
    const mRate = (num("m_rate") || 0) / 100, mCap = (num("m_cap") || 0) / 100;
    const matchPerPeriodMax = perPay * mCap * mRate;
    const trueup = sel("trueup"); const aftertax = sel("aftertax");

    if (kRoom > 0) {
      room += kRoom;
      findings.push({ kind: "room", title: t("k_room_t"), amount: t("k_room_a", money(kRoom), money(kRoom / left), left),
        detail: t("k_room_d", money(limit), catchUp ? money(catchUp) : ""), deadline: t("k_room_dl"), ask: t("k_room_ask"), src: ["A1", "A2"] });
    } else {
      findings.push({ kind: "info", title: t("k_full_t"), detail: t("k_full_d", money(limit)), src: ["A1"] });
    }

    // front-load / lost match
    if (mRate > 0 && mCap > 0) {
      let zeroPeriods = 0, capAt = null;
      if (kRoom <= 0) { zeroPeriods = left; capAt = elapsed; }
      else if (payPerPeriod > 0) {
        const toCap = Math.ceil(kRoom / payPerPeriod);
        if (toCap < left) { zeroPeriods = left - toCap; capAt = elapsed + toCap; }
      }
      if (zeroPeriods > 0 && trueup !== "yes") {
        const lost = zeroPeriods * matchPerPeriodMax;
        moneyAtRisk += lost;
        findings.push({ kind: "money", title: t("match_lost_t"), amount: t("match_lost_a", money(lost), zeroPeriods),
          detail: t("match_lost_d", capAt, P) + (trueup === "no" ? t("match_lost_d_no") : t("match_lost_d_unknown")),
          deadline: t("match_lost_dl"), ask: t("match_lost_ask"), src: ["C1", "A3"] });
      } else if (zeroPeriods > 0 && trueup === "yes") {
        findings.push({ kind: "info", title: t("trueup_yes_t"), detail: t("trueup_yes_d"), ask: t("trueup_yes_ask"), src: ["C1"] });
      }
      if (kRoom > 0 && kPct > 0 && kPct < mCap * 100 - 0.01) {
        const unmatched = (mCap - kPct / 100) * mRate * salary * (left / P);
        if (unmatched > 1) {
          moneyAtRisk += unmatched;
          findings.push({ kind: "money", title: t("under_t"), amount: t("under_a", money(unmatched)),
            detail: t("under_d", Math.round(kPct * 10) / 10, Math.round(mCap * 1000) / 10), deadline: t("match_lost_dl"), ask: t("under_ask"), src: ["C1"] });
        }
      }
    }

    // mega backdoor
    const deferralProjected = Math.min(C.deferral, kYtd + payPerPeriod * left);
    const employerFull = mRate * mCap * salary;
    const afterTaxSpace = Math.max(0, C.total415 - deferralProjected - employerFull);
    if (afterTaxSpace > 500) {
      if (aftertax === "no") {
        findings.push({ kind: "info", title: t("mbdr_no_t"), detail: t("mbdr_no_d", money(afterTaxSpace)), src: ["A3", "B2"] });
      } else {
        room += afterTaxSpace;
        findings.push({ kind: "room", title: t("mbdr_t"), amount: t("mbdr_a", money(afterTaxSpace), money(afterTaxSpace / left), left),
          detail: t("mbdr_d", money(deferralProjected), money(employerFull)) + (aftertax === "unknown" ? t("mbdr_d_unknown") : ""),
          deadline: t("mbdr_dl"), ask: t("mbdr_ask"), src: ["A3", "B2", "B5"] });
      }
    }

    // Roth catch-up rule
    if (catchUp > 0 && salary > C.rothCatchupWage) {
      findings.push({ kind: "info", title: t("rothcu_t"), detail: t("rothcu_d"), ask: t("rothcu_ask"), src: ["A2"] });
    }

    // --- ESPP ---
    const espp = sel("espp");
    if (espp === "no") {
      const d = Math.min(15, num("espp_disc") || 0) / 100; const cap = (num("espp_cap") || 0) / 100;
      if (d > 0 && cap > 0) {
        const maxPay = Math.round(C.espp25k * (1 - d));
        const purchase = Math.min(salary * cap, maxPay);
        const discYear = purchase * d / (1 - d);
        const discRest = discYear * left / P;
        moneyAtRisk += discRest;
        findings.push({ kind: "money", title: t("espp_t"), amount: t("espp_a", money(discYear), money(discRest)),
          detail: t("espp_d", Math.round(cap * 100), Math.round(d * 100), maxPay), deadline: t("espp_dl"), ask: t("espp_ask"), src: ["D1", "D4"] });
      }
    } else if (espp === "yes") {
      findings.push({ kind: "info", title: t("espp_in_t"), detail: t("espp_in_d"), ask: t("espp_in_ask"), src: ["D1", "D4"] });
    }

    // --- RSU ---
    const rsuTotal = (num("rsu_ytd") || 0) + (num("rsu_more") || 0);
    const wh = (num("rsu_wh") == null ? 22 : num("rsu_wh")) / 100;
    if (rsuTotal > 0) {
      const taxableHi = Math.max(0, salary + rsuTotal - deferralProjected - C.stdDed[filing]);
      const taxableLo = Math.max(0, taxableHi - rsuTotal);
      const rHi = marginal(filing, taxableHi), rLo = marginal(filing, taxableLo);
      const gapHi = Math.max(0, rHi - wh) * rsuTotal, gapLo = Math.max(0, rLo - wh) * rsuTotal;
      if (gapHi > 50) {
        taxGap += gapHi;
        findings.push({ kind: "tax", title: t("rsu_t"), amount: t("rsu_a", money(gapLo), money(gapHi), Math.round(wh * 100)),
          detail: t("rsu_d", Math.round(wh * 100), pct(rLo), pct(rHi), money(rsuTotal)) + t("rsu_d_prior", prior) + (filing === "mfj" ? t("rsu_d_mfj") : "") + " " + t("rsu_fix", money(gapHi / left), left),
          deadline: t("rsu_dl", nextEst(now)), ask: t("rsu_ask"), src: ["E1", "E2", "E4", "E6"] });
      } else {
        findings.push({ kind: "info", title: t("rsu_ok_t"), detail: t("rsu_ok_d", Math.round(wh * 100), pct(rHi)), src: ["E1", "E2"] });
      }
      if (state === "CA") {
        findings.push({ kind: "info", title: t("rsu_ca_t"), detail: t("rsu_ca_d", money(rsuTotal * C.caSupp)), ask: t("rsu_ca_ask"), src: ["E8", "E9"] });
      }
    }

    // --- HSA ---
    const hsa = sel("hsa");
    if (hsa !== "none") {
      const lim = (hsa === "family" ? C.hsaFamily : C.hsaSelf) + (is55 ? C.hsa55 : 0);
      const ytd = num("hsa_ytd") || 0;
      const hRoom = lim - ytd;
      if (hRoom > 0) {
        room += hRoom;
        findings.push({ kind: "room", title: t("hsa_t"), amount: t("hsa_a", money(hRoom), money(hRoom / left), left),
          detail: t("hsa_d", money(lim), lang === "zh" ? (hsa === "family" ? "家庭" : "个人") : (hsa === "family" ? "family" : "self-only"), is55) + (state === "CA" ? t("hsa_d_ca") : ""),
          deadline: t("hsa_dl"), ask: t("hsa_ask"), src: state === "CA" ? ["F1", "F3", "F6"] : ["F1", "F3"] });
      } else if (hRoom < 0) {
        findings.push({ kind: "info", title: t("hsa_over_t"), detail: t("hsa_over_d", money(ytd), money(lim)), src: ["F1", "F3"] });
      }
    }

    // --- IRA note ---
    findings.push({ kind: "info", title: t("ira_t"), detail: t("ira_d"), src: ["A1", "B6"] });

    // ---------- render ----------
    tiles.innerHTML = [
      ["money", t("tile_money"), money(moneyAtRisk)],
      ["room", t("tile_room"), money(room)],
      ["tax", t("tile_tax"), money(taxGap)]
    ].map(([k, l, v]) => `<div class="tile ${k}"><div class="k">${l}</div><div class="v">${v}</div></div>`).join("");

    const order = { money: 0, tax: 1, room: 2, info: 3 };
    findings.sort((a, b) => order[a.kind] - order[b.kind]);
    const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    F.innerHTML = findings.length ? findings.map((f) => `
      <article class="finding ${f.kind}">
        <h3>${esc(f.title)}</h3>
        ${f.amount ? `<p><span class="lbl">${t("lbl_amount")}</span><span class="amt">${esc(f.amount)}</span></p>` : ""}
        <p>${esc(f.detail)}</p>
        ${f.deadline ? `<p><span class="lbl">${t("lbl_deadline")}</span>${esc(f.deadline)}</p>` : ""}
        ${f.ask ? `<div class="ask"><span class="lbl">${t("lbl_ask")}</span>“${esc(f.ask)}”</div>` : ""}
        <div class="srcs">${t("src_lbl")} ${f.src.map((id) => `<a href="${SRC[id].url}" target="_blank" rel="noopener noreferrer" data-src="${id}">${esc(SRC[id][lang])}</a>`).join("")}</div>
      </article>`).join("") : `<article class="finding info"><h3>${t("none_title")}</h3><p>${t("none_body")}</p></article>`;

    if (!calcSent) { ev("calc"); calcSent = true; }
    rememberCalc();
  }

  // ---------- wiring ----------
  $("f").addEventListener("submit", (e) => { e.preventDefault(); compute(); $("out").scrollIntoView({ behavior: "smooth", block: "start" }); });
  $("langBtn").addEventListener("click", () => { lang = lang === "en" ? "zh" : "en"; applyLang(); });
  $("findings").addEventListener("click", (e) => { const a = e.target.closest("a[data-src]"); if (a) ev("src"); });
  $("exampleBtn").addEventListener("click", () => {
    const v = { salary: 180000, k_ytd: 20000, k_pct: 15, m_rate: 50, m_cap: 6, rsu_ytd: 60000, rsu_more: 20000, rsu_wh: 22, hsa_ytd: 1500, espp_disc: 15, espp_cap: 10 };
    for (const k in v) $(k).value = v[k];
    $("periods").value = "26"; $("filing").value = "single"; $("age").value = "u50"; $("state").value = "CA"; $("prior").value = "yes";
    $("trueup").value = "unknown"; $("aftertax").value = "unknown"; $("espp").value = "no"; $("hsa").value = "self";
    compute(); $("out").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  if (/^zh\b/i.test(navigator.language || "") && new URLSearchParams(location.search).get("lang") === "zh") lang = "zh";
  if (new URLSearchParams(location.search).get("lang") === "zh") lang = "zh";
  applyLang();
  markVisit();
  ev("open");
})();
