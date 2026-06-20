"use client";
import { useState } from "react";

const CERTS = [
  {
    id: "c1", emoji: "🥚", name: "孵化師", en: "Hatcher", lv: 1,
    color: "from-yellow-400 to-orange-400", borderColor: "border-yellow-500/30",
    req: "完成 Lv.1 課程 + 通過孵化期結業測驗（80 分）",
    skills: ["Prompt 設計", "Agent 個性塑造", "Chain-of-Thought", "記憶類型辨別"],
    validity: "永久有效", price: 0, status: "owned",
    badge: "首隻 Agent 誕生認證，象徵你已掌握 Agent 設計的核心基礎",
    questions: [
      { q: "下列何者最能描述「System Prompt」的功能？", opts: ["設定 AI 的對話語氣", "定義 Agent 的角色、任務與行為準則", "控制 API 的費用上限", "設定 Token 數量"], ans: 1 },
      { q: "「Chain-of-Thought」是什麼技巧？", opts: ["讓 AI 快速回答問題", "讓 AI 逐步拆解推理過程再給出答案", "限制 AI 的輸出長度", "讓 AI 搜尋網路資料"], ans: 1 },
      { q: "Zero-shot 與 Few-shot 最主要的差別是？", opts: ["模型大小不同", "是否提供範例示範", "是否使用網路搜尋", "Token 費用不同"], ans: 1 },
      { q: "Hallucination（幻覺）在 AI 中指的是？", opts: ["AI 畫出不存在的圖片", "AI 生成看似正確但實際錯誤的資訊", "AI 回應速度過慢", "AI 超出 Token 限制"], ans: 1 },
    ],
  },
  {
    id: "c2", emoji: "🐣", name: "技能師", en: "Skill Master", lv: 2,
    color: "from-green-400 to-teal-400", borderColor: "border-green-500/30",
    req: "完成 Lv.2 課程 + 通過技能師認證考試（75 分）",
    skills: ["RAG 知識庫建置", "Webhook 串接", "Make.com 自動化", "Email/LINE 推播"],
    validity: "永久有效", price: 0, status: "available",
    badge: "具備為 Agent 安裝真實工具技能的能力，可協助企業建立自動化流程",
    questions: [],
  },
  {
    id: "c3", emoji: "🐦", name: "訓練師", en: "Agent Trainer", lv: 3,
    color: "from-blue-400 to-indigo-500", borderColor: "border-blue-500/30",
    req: "完成 Lv.3 課程 + 繳交 1 份 Agent 作品 + 通過訓練師認證（85 分）",
    skills: ["ReAct 推理", "多步驟任務規劃", "錯誤自修正", "Context 管理"],
    validity: "2 年，到期免費續期", price: 980, status: "locked",
    badge: "業界認可的 Agent 訓練師，可對外承接 Agent 訓練專案，享有接案優先媒合",
    questions: [],
  },
  {
    id: "c4", emoji: "🦅", name: "架構師", en: "Agent Architect", lv: 4,
    color: "from-purple-500 to-pink-500", borderColor: "border-purple-500/30",
    req: "完成 Lv.4 + 繳交多 Agent 系統作品 + 架構師認證考試（88 分）",
    skills: ["Multi-Agent 系統", "A2A 協議設計", "CrewAI 框架", "MCP Server"],
    validity: "2 年，需繳 CPE 學分續期", price: 2980, status: "locked",
    badge: "可設計並部署企業級多 Agent 系統，Agent School 最高技術認證之一",
    questions: [],
  },
  {
    id: "c5", emoji: "🦁", name: "畢業大師", en: "Agent Master", lv: 5,
    color: "from-red-500 to-yellow-500", borderColor: "border-red-500/30",
    req: "完成全部 5 期課程 + 持有 C3/C4 + 畢業 Demo 通過審核",
    skills: ["完整 Agent 產品設計", "商業化變現", "技能市場上架", "企業導入顧問"],
    validity: "終身認證", price: 0, status: "locked",
    badge: "Agent School 最高榮譽。全台不超過 50 人。享畢業師資推薦 + 企業媒合直通",
    questions: [],
  },
];

export default function CertPage() {
  const [selected, setSelected] = useState<string | null>("c1");
  const [examMode, setExamMode] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const cert = CERTS.find(c => c.id === selected);
  const mockQ = cert?.questions ?? [];
  const score = submitted && mockQ.length > 0 ? Math.round((answers.filter((a, i) => a === mockQ[i]?.ans).length / mockQ.length) * 100) : 0;
  const passed = score >= 80;

  return (
    <div className="space-y-6 max-w-5xl animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">🏅 <span className="text-gradient">證照中心</span></h1>
        <p className="text-white/40 text-sm mt-1.5">5 級業界認證 · 永久上鏈 · 對外可驗真 · 認證師平均月接案收入 NT$2.3 萬</p>
      </div>

      {/* Progress */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-white font-semibold">我的認證進度</div>
          <div className="text-xs text-white/30">1 / 5 已取得</div>
        </div>
        <div className="flex gap-2">
          {CERTS.map((c) => (
            <div key={c.id} className="flex-1 text-center">
              <div className={`h-2 rounded-full mb-2 ${c.status === "owned" ? `bg-gradient-to-r ${c.color}` : c.status === "available" ? "bg-purple-500/30" : "bg-white/5"}`} />
              <div className="text-lg">{c.emoji}</div>
              <div className="text-xs text-white/30 mt-0.5">{c.name}</div>
              {c.status === "owned" && <div className="text-xs text-green-400 mt-0.5">已取得</div>}
              {c.status === "available" && <div className="text-xs text-purple-400 mt-0.5">可報考</div>}
              {c.status === "locked" && <div className="text-xs text-white/20 mt-0.5">🔒</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Cert cards */}
      <div className="grid grid-cols-5 gap-3 stagger">
        {CERTS.map((c) => (
          <button key={c.id} onClick={() => { setSelected(c.id); setExamMode(false); setSubmitted(false); setAnswers([]); }}
            className={`card p-4 text-left ${selected === c.id ? "border-white/30 glow-soft" : "card-interactive"} ${c.status === "locked" ? "opacity-50" : ""}`}>
            <div className="text-3xl mb-2">{c.emoji}</div>
            <div className={`text-xs font-bold bg-gradient-to-r ${c.color} bg-clip-text text-transparent`}>Lv.{c.lv}</div>
            <div className="font-bold text-white text-sm">{c.name}</div>
            <div className="text-xs text-white/30 mt-1">{c.en}</div>
            <div className="mt-2">
              {c.status === "owned" && <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/20">✓ 已取得</span>}
              {c.status === "available" && <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/20">可報考</span>}
              {c.status === "locked" && <span className="text-xs text-white/20">🔒 未解鎖</span>}
            </div>
          </button>
        ))}
      </div>

      {/* Detail */}
      {cert && !examMode && (
        <div className="gradient-ring p-6 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-4xl shadow-lg`}>{cert.emoji}</div>
              <div>
                <div className="text-xl font-bold text-white">
                  Lv.{cert.lv} {cert.name}
                  <span className="text-white/30 font-normal text-base ml-2">· {cert.en}</span>
                </div>
                <div className="text-sm text-white/50 mt-1 max-w-xl">{cert.badge}</div>
              </div>
            </div>
            <div className="flex-shrink-0 flex gap-2">
              {cert.status === "owned" && (
                <button className={`px-5 py-2 rounded-xl bg-gradient-to-r ${cert.color} text-black font-bold text-sm`}>⬇ 下載證書</button>
              )}
              {cert.status === "available" && (
                <button onClick={() => { setExamMode(true); setAnswers([]); setSubmitted(false); }}
                  className="btn-primary px-5 py-2 rounded-xl text-sm font-semibold">
                  📝 開始考試
                </button>
              )}
              {cert.status === "locked" && (
                <div className="px-5 py-2 rounded-xl bg-white/5 text-white/30 text-sm border border-white/10">完成課程後解鎖</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="card p-4">
              <div className="text-xs text-white/30 mb-2">📋 報考資格</div>
              <div className="text-sm text-white/70 leading-relaxed">{cert.req}</div>
            </div>
            <div className="card p-4">
              <div className="text-xs text-white/30 mb-2">⚡ 認證涵蓋技能</div>
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map(s => <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-white/[0.06] text-white/60 border border-white/10">{s}</span>)}
              </div>
            </div>
            <div className="card p-4">
              <div className="text-xs text-white/30 mb-2">⏳ 有效期 / 考費</div>
              <div className="text-sm text-white">{cert.validity}</div>
              <div className={`text-sm mt-1.5 font-semibold ${cert.price === 0 ? "text-green-400" : "text-purple-300"}`}>
                {cert.price === 0 ? "含於課程，免費應考" : `NT$ ${cert.price.toLocaleString()} /次`}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exam */}
      {cert && examMode && (
        <div className="card p-6 space-y-6" style={{ borderColor: "rgba(168, 85, 247, 0.3)" }}>
          {!submitted ? (
            <>
              <div className="flex items-center justify-between">
                <div className="font-bold text-white text-lg">📝 {cert.name} 認證考試</div>
                <div className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  {mockQ.length} 題 · 單選 · 及格 80 分
                </div>
              </div>
              {mockQ.length === 0 ? (
                <div className="text-center py-8 text-white/40">此證照考試系統建置中，請先完成對應課程</div>
              ) : (
                <>
                  <div className="space-y-6 stagger">
                  {mockQ.map((q, qi) => (
                    <div key={qi} className="card p-4 space-y-3">
                      <div className="text-sm font-semibold text-white">Q{qi + 1}. {q.q}</div>
                      <div className="grid grid-cols-2 gap-2">
                        {q.opts.map((opt, oi) => (
                          <button key={oi} onClick={() => { const a = [...answers]; a[qi] = oi; setAnswers(a); }}
                            className={`text-left p-3 rounded-xl border text-sm transition-all ${answers[qi] === oi ? "border-purple-500 bg-purple-500/20 text-white" : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white"}`}>
                            <span className="font-mono text-purple-400 mr-2">{String.fromCharCode(65 + oi)}.</span>{opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  </div>
                  <button onClick={() => setSubmitted(true)} disabled={answers.length < mockQ.length}
                    className="btn-primary w-full py-3 rounded-xl font-semibold disabled:opacity-30">
                    繳交答案 →
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="text-center py-10">
              <div className="text-7xl mb-4">{passed ? "🎉" : "😅"}</div>
              <div className="text-5xl font-bold text-white mb-2">{score} <span className="text-2xl text-white/40">分</span></div>
              <div className={`text-xl font-bold mb-6 ${passed ? "text-green-400" : "text-red-400"}`}>
                {passed ? "恭喜通過！🏅 孵化師認證核發" : `差 ${80 - score} 分及格，加油！`}
              </div>
              {passed ? (
                <div className="space-y-3">
                  <div className="text-white/40 text-sm">電子證書已寄至信箱 · 可前往「成果展示」公開分享</div>
                  <div className="flex justify-center gap-3">
                    <button className={`px-6 py-2.5 rounded-xl bg-gradient-to-r ${cert.color} text-black font-bold text-sm`}>⬇ 下載電子證書</button>
                    <button onClick={() => { setExamMode(false); setSubmitted(false); }} className="px-6 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/10 text-white border border-white/10 text-sm transition-all">返回</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => { setAnswers([]); setSubmitted(false); }} className="px-8 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/10 text-white border border-white/10 text-sm transition-all">重新作答</button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
