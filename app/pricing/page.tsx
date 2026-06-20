import Link from "next/link";

const PLANS = [
  {
    name: "免費試聽", price: 0, period: "", color: "from-white/10 to-white/5", border: "border-white/10",
    tag: "", highlight: false,
    features: [
      "3 堂免費試聽課（Lv.1 精選）",
      "孵化師概念圖鑑（全覽）",
      "訓練 1 隻基礎 Agent（唯讀）",
      "Agent 市場瀏覽",
      "社群交流中心",
    ],
    cta: "馬上免費試聽", ctaLink: "/learning",
    notIncluded: ["直播課程", "Agent 上架 / 接案", "認證考試", "任務中心"],
  },
  {
    name: "學員月費", price: 1980, period: "/ 月", color: "from-purple-900/60 to-blue-900/40", border: "border-purple-500/30",
    tag: "最受歡迎", highlight: true,
    features: [
      "全部 5 期課程錄播無限觀看",
      "每月 5 次 Agent 訓練配額",
      "任務中心接案資格",
      "Agent 上架 · 分潤 60%",
      "孵化師 / 技能師 免費應考",
      "補充教材 + 資源中心全開",
      "交流中心學員頻道",
    ],
    cta: "立即加入學員", ctaLink: "/learning",
    notIncluded: ["VIP 直播優先位", "訓練師 / 架構師認證"],
  },
  {
    name: "認證師 Pro", price: 28000, period: "一次性", color: "from-yellow-900/40 to-orange-900/30", border: "border-yellow-500/30",
    tag: "學費可賺回", highlight: false,
    features: [
      "全部 5 期直播課 VIP 前排位",
      "無限 Agent 訓練配額",
      "訓練師 / 架構師認證考試資格",
      "Agent 上架 · 分潤 75%",
      "1-on-1 老師諮詢 × 4 次",
      "畢業 Demo 審核 + 師資推薦函",
      "企業媒合直通管道",
      "Agent School 校友終身社群",
    ],
    cta: "申請認證師方案", ctaLink: "/learning",
    notIncluded: [],
  },
  {
    name: "企業版", price: 29800, period: "/ 月", color: "from-slate-800/60 to-slate-900/40", border: "border-slate-500/20",
    tag: "B2B", highlight: false,
    features: [
      "5 席學員帳號",
      "無限 Agent 訓練 + 私有部署",
      "企業私有知識庫建置",
      "專屬客戶成功經理",
      "SLA 99.9% 服務保障",
      "員工批次認證方案",
    ],
    cta: "聯絡業務諮詢", ctaLink: "/support",
    notIncluded: [],
  },
];

const FLYWHEEL = [
  { step: "1", emoji: "📖", title: "報名課程", desc: "選擇對應級別，加入直播或看錄播" },
  { step: "2", emoji: "🎓", title: "訓練 Agent", desc: "送訓練所生成 System Prompt + Workflow" },
  { step: "3", emoji: "🏅", title: "考取認證", desc: "通過考試，取得業界認可的電子證照" },
  { step: "4", emoji: "🛒", title: "上架市場", desc: "把訓練好的 Agent 掛牌出售或出租" },
  { step: "5", emoji: "💰", title: "賺回學費", desc: "分潤 60–75%，頂尖學員月收 NT$8 萬" },
];

export default function PricingPage() {
  return (
    <div className="space-y-10 max-w-5xl">
      <div className="text-center">
        <h1 className="text-3xl font-black text-white">💎 方案與定價</h1>
        <p className="text-white/40 mt-2">學費不是成本，是投資。你的 Agent 上市後可以賺回來。</p>
      </div>

      {/* Flywheel */}
      <div className="rounded-2xl bg-gradient-to-br from-purple-900/40 to-pink-900/20 border border-purple-500/20 p-6">
        <div className="text-center mb-6">
          <div className="font-bold text-white text-lg">🔄 Learn → Train → Earn 飛輪</div>
          <div className="text-white/40 text-sm mt-1">認證師平均 <span className="text-green-400 font-bold">6 個月</span>內靠市場收入覆蓋學費</div>
        </div>
        <div className="flex items-center justify-between gap-2">
          {FLYWHEEL.map((f, i) => (
            <div key={f.step} className="flex items-center gap-2 flex-1">
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-12 h-12 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center text-2xl mb-2">{f.emoji}</div>
                <div className="text-xs font-bold text-white">{f.title}</div>
                <div className="text-xs text-white/30 mt-0.5 leading-relaxed">{f.desc}</div>
              </div>
              {i < FLYWHEEL.length - 1 && <div className="text-purple-500 text-lg flex-shrink-0">→</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-4 gap-4">
        {PLANS.map((p) => (
          <div key={p.name} className={`relative rounded-2xl bg-gradient-to-br ${p.color} border ${p.border} p-5 flex flex-col`}>
            {p.tag && (
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-3 py-1 rounded-full font-bold whitespace-nowrap ${p.highlight ? "bg-purple-600 text-white" : "bg-yellow-500 text-black"}`}>
                {p.tag}
              </div>
            )}
            <div className="mb-4 mt-2">
              <div className="text-white font-bold text-base">{p.name}</div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-white">
                  {p.price === 0 ? "免費" : `NT$${p.price.toLocaleString()}`}
                </span>
                {p.period && <span className="text-white/30 text-sm">{p.period}</span>}
              </div>
            </div>

            <div className="space-y-2 flex-1 mb-5">
              {p.features.map(f => (
                <div key={f} className="flex items-start gap-2 text-xs text-white/70">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>{f}
                </div>
              ))}
              {p.notIncluded.map(f => (
                <div key={f} className="flex items-start gap-2 text-xs text-white/20">
                  <span className="mt-0.5 flex-shrink-0">✗</span>{f}
                </div>
              ))}
            </div>

            <Link href={p.ctaLink}
              className={`text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${p.highlight ? "bg-purple-600 hover:bg-purple-500 text-white" : "bg-white/10 hover:bg-white/15 text-white"}`}>
              {p.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* ROI calculator teaser */}
      <div className="rounded-xl bg-white/[0.04] border border-white/10 p-6">
        <div className="font-bold text-white text-lg mb-4">📊 學員真實收益案例</div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: "Trainer_Sarah", plan: "認證師 Pro", months: 4, earned: 68000, note: "電商客服 Agent 月租×142家" },
            { name: "Trainer_Kevin", plan: "學員月費", months: 7, earned: 31000, note: "銷售 Agent 買斷×6家企業" },
            { name: "Trainer_Nova", plan: "認證師 Pro", months: 2, earned: 24000, note: "新聞摘要 Agent 月租×891人" },
          ].map((c) => (
            <div key={c.name} className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="font-semibold text-white text-sm">{c.name}</div>
              <div className="text-xs text-purple-300 mt-0.5">{c.plan}</div>
              <div className="text-xl font-black text-green-400 mt-2">NT${c.earned.toLocaleString()}</div>
              <div className="text-xs text-white/30 mt-0.5">入學後第 {c.months} 個月</div>
              <div className="text-xs text-white/40 mt-2 leading-relaxed">{c.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
