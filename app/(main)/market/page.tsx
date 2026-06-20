"use client";
import { useState } from "react";

const AGENTS = [
  {
    id: "a1", name: "Luna 電商客服精靈", owner: "Trainer_Kevin", ownerLv: "🐦訓練師",
    emoji: "🛒", price: 3800, rental: 380, tag: "熱銷", tagColor: "bg-red-500/20 text-red-400",
    skills: ["📧 Email", "👥 CRM", "📚 知識庫", "💬 LINE"],
    desc: "專為電商設計，可自動回覆客訴、追蹤訂單、生成退換貨表單。已服役 38 家店鋪。",
    rating: 4.9, reviews: 87, monthlyUsers: 142, cert: "🐦",
  },
  {
    id: "a2", name: "Max 銷售副駕駛", owner: "Trainer_Sarah", ownerLv: "🦅架構師",
    emoji: "💼", price: 8800, rental: 880, tag: "認證師出品", tagColor: "bg-purple-500/20 text-purple-300",
    skills: ["🧠 長期記憶", "👥 CRM", "📧 Email", "📊 試算表"],
    desc: "保險業務員專屬，自動生成提案書、追蹤客戶動態、每週發送跟進郵件。平均提升業績 35%。",
    rating: 5.0, reviews: 34, monthlyUsers: 67, cert: "🦅",
  },
  {
    id: "a3", name: "Nova 新聞摘要機器人", owner: "Trainer_Mike", ownerLv: "🐣技能師",
    emoji: "📰", price: 1200, rental: 120, tag: "入門推薦", tagColor: "bg-green-500/20 text-green-400",
    skills: ["🔍 搜尋", "💬 LINE", "⏰ 排程"],
    desc: "每天早上 8 點自動彙整科技/財經新聞，整理成 5 點摘要推播 LINE。零設定開箱即用。",
    rating: 4.7, reviews: 156, monthlyUsers: 891, cert: "🐣",
  },
  {
    id: "a4", name: "Aria 內容行銷助手", owner: "Trainer_Coco", ownerLv: "🐦訓練師",
    emoji: "✍️", price: 5500, rental: 550, tag: "本週新上架", tagColor: "bg-blue-500/20 text-blue-300",
    skills: ["🎨 圖像生成", "🔍 搜尋", "📊 試算表", "🌐 瀏覽器"],
    desc: "自動生成 IG/Threads 貼文文案 + 配圖，分析最佳發文時間，每月產出 60 篇內容無壓力。",
    rating: 4.8, reviews: 21, monthlyUsers: 43, cert: "🐦",
  },
  {
    id: "a5", name: "Echo 知識庫管家", owner: "Trainer_Alex", ownerLv: "🦅架構師",
    emoji: "📚", price: 6600, rental: 660, tag: "企業首選", tagColor: "bg-yellow-500/20 text-yellow-400",
    skills: ["📚 知識庫", "🔗 Webhook", "💻 程式執行", "🧠 長期記憶"],
    desc: "幫企業建立私有知識庫 Agent，支援 PDF/Word/網頁抓取，員工提問秒速回覆，準確率 93%。",
    rating: 4.9, reviews: 52, monthlyUsers: 219, cert: "🦅",
  },
  {
    id: "a6", name: "Spark 會議記錄秘書", owner: "Trainer_Mia", ownerLv: "🐣技能師",
    emoji: "📋", price: 2200, rental: 220, tag: "效率神器", tagColor: "bg-teal-500/20 text-teal-300",
    skills: ["📅 行事曆", "📧 Email", "📊 試算表"],
    desc: "會議後自動整理逐字稿、提取行動項目、指派負責人並寄送郵件確認。讓會議不再是黑洞。",
    rating: 4.6, reviews: 73, monthlyUsers: 334, cert: "🐣",
  },
];

const CATEGORIES = ["全部", "客服", "銷售", "內容創作", "資料整理", "企業知識庫", "個人助理"];

export default function MarketPage() {
  const [mode, setMode] = useState<"buy" | "rent">("rent");
  const [cat, setCat] = useState("全部");

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">🛒 Agent 市場</h1>
          <p className="text-white/40 text-sm mt-1">買/租其他學員訓練的 Agent · 上架你的 Agent 賺分潤 70%</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:opacity-90 transition-all">
          + 上架我的 Agent
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "上架 Agent 數", value: "247", sub: "本月 +38 隻", color: "text-purple-400" },
          { label: "本月成交金額", value: "NT$1.2M", sub: "學員互相買賣", color: "text-green-400" },
          { label: "平均評分", value: "4.8 ★", sub: "買家滿意度", color: "text-yellow-400" },
          { label: "認證師上架率", value: "78%", sub: "持證者轉化率高", color: "text-blue-400" },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-center">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-white font-medium mt-0.5">{s.label}</div>
            <div className="text-xs text-white/30 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1 bg-white/[0.03] rounded-xl p-1 border border-white/10">
          {(["rent", "buy"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${mode === m ? "bg-purple-600 text-white" : "text-white/40 hover:text-white"}`}>
              {m === "rent" ? "月租模式" : "買斷模式"}
            </button>
          ))}
        </div>
        <div className="flex gap-1 flex-wrap">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${cat === c ? "border-purple-500/50 bg-purple-500/10 text-purple-300" : "border-white/10 text-white/40 hover:text-white"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Agent grid */}
      <div className="grid grid-cols-2 gap-4">
        {AGENTS.map((a) => (
          <div key={a.id} className="rounded-xl bg-white/[0.04] border border-white/10 hover:border-purple-500/30 transition-all p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-900 to-pink-900 border border-purple-500/20 flex items-center justify-center text-2xl">
                  {a.emoji}
                </div>
                <div>
                  <div className="font-bold text-white">{a.name}</div>
                  <div className="text-xs text-white/40 mt-0.5">by {a.owner} <span className="ml-1">{a.ownerLv}</span></div>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${a.tagColor}`}>{a.tag}</span>
            </div>

            <p className="text-sm text-white/50 leading-relaxed mb-3">{a.desc}</p>

            <div className="flex flex-wrap gap-1 mb-4">
              {a.skills.map(s => (
                <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/50 border border-white/5">{s}</span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-white/30">
                <span>⭐ {a.rating} ({a.reviews})</span>
                <span>👤 {a.monthlyUsers} 人使用中</span>
                <span>認證 {a.cert}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-lg font-bold text-white">
                    NT$ {mode === "rent" ? a.rental.toLocaleString() : a.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-white/30">{mode === "rent" ? "/ 月" : "買斷"}</div>
                </div>
                <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all">
                  {mode === "rent" ? "立即租用" : "立即購買"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sell CTA */}
      <div className="rounded-xl bg-gradient-to-br from-purple-900/40 to-pink-900/20 border border-purple-500/20 p-6 text-center">
        <div className="text-2xl mb-2">💰</div>
        <div className="font-bold text-white text-lg mb-1">你的 Agent 也能賺錢</div>
        <div className="text-white/40 text-sm mb-4">上架後每筆交易你拿 <span className="text-green-400 font-bold">70%</span>，學校抽 30%。頂尖 Agent 月收 NT$3–8 萬。</div>
        <div className="flex justify-center gap-3">
          <button className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-all">前往訓練 Agent</button>
          <button className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm transition-all">查看上架教學</button>
        </div>
      </div>
    </div>
  );
}
