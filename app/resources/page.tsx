"use client";
import { useState } from "react";

const KITS = [
  { name: "Agent Starter Pack", author: "Alex Chen", version: "v1.2.0", desc: "新手孵化必備套件：含基礎 Prompt 模板、記憶模組、FAQ 回覆工作流，適合第一次建 Agent。", category: "入門套件", trial: true, installs: 240, hot: true },
  { name: "RAG Knowledge Builder", author: "Mia Lin", version: "v2.0.1", desc: "一鍵建立企業知識庫：自動切塊、Embedding、Reranking 全套流程，支援 PDF / DOCX / 網頁。", category: "知識庫", trial: true, installs: 188, hot: true },
  { name: "LINE Bot 快速部署包", author: "Jason Wu", version: "v1.5.3", desc: "5 分鐘讓 Agent 在 LINE 上線：含 Webhook 接收、訊息格式處理、Flex Message 模板。", category: "通訊整合", trial: false, installs: 312, hot: true },
  { name: "Make.com Agent 控制台", author: "Jason Wu", version: "v1.1.0", desc: "Chrome 擴充套件，瀏覽器一鍵觸發 Make.com 場景，支援截圖、文字、檔案傳輸。", category: "自動化", trial: true, installs: 95, hot: false },
  { name: "Multi-Agent 協調器", author: "Alex Chen", version: "v0.9.5", desc: "CrewAI 快速啟動包：含 Supervisor、Worker 角色模板與任務分配工作流。", category: "多 Agent", trial: false, installs: 67, hot: false },
  { name: "Agent 商業化工具箱", author: "Sarah Ko", version: "v1.0.2", desc: "接案必備：報價單產生器、合約模板、客戶 CRM、收款流程一條龍。", category: "商業工具", trial: false, installs: 144, hot: true },
];

const TEMPLATES = [
  { name: "每日新聞摘要推播", author: "Mia Lin", category: "生活助手", desc: "定時搜尋新聞 → AI 摘要 → LINE 推播", trial: true },
  { name: "客服 Agent 自動分流", author: "Jason Wu", category: "業務客服", desc: "分析來訊 → 判斷類別 → 自動回覆或轉人工", trial: true },
  { name: "Email 智能分類整理", author: "Alex Chen", category: "辦公流程", desc: "收信 → AI 分類 → 重要信件提醒 → 自動歸檔", trial: false },
  { name: "社群內容自動產生", author: "Sarah Ko", category: "行銷工具", desc: "輸入主題 → AI 產文 → 圖片生成 → 排程發布", trial: true },
  { name: "Agent 日報自動產生", author: "Mia Lin", category: "辦公流程", desc: "彙整當日任務 → 生成日報 → Email 給主管", trial: false },
  { name: "電商訂單管理 Agent", author: "Jason Wu", category: "電子商務", desc: "收訂單 → 庫存查詢 → 物流追蹤 → 通知買家", trial: false },
];

const PLUGINS = [
  { name: "Agent Monitor Pro", author: "Alex Chen", version: "v1.0.0", desc: "即時監控 Agent 運行狀態、Token 用量、錯誤率，Chrome 側邊欄顯示。" },
  { name: "Prompt Tester", author: "Mia Lin", version: "v0.8.2", desc: "對比測試多個 Prompt 版本的輸出品質，自動評分。" },
  { name: "Skill Injector", author: "Jason Wu", version: "v1.1.0", desc: "一鍵將技能包注入現有 Agent 的 System Prompt。" },
];

export default function ResourcesPage() {
  const [tab, setTab] = useState<"browse"|"mine">("browse");
  const [category, setCategory] = useState("套件");

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">🗂️ 資源中心</h1>
        <p className="text-white/40 text-sm mt-1">Agent 套件、場景範本、擴充插件，即裝即用</p>
      </div>

      {/* Tab */}
      <div className="flex gap-2">
        {(["browse","mine"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab===t ? "bg-purple-600 text-white" : "bg-white/5 text-white/40 hover:bg-white/10"}`}>
            {t === "browse" ? "🔍 資源瀏覽" : "🧪 我的試用"}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[["應用套件","6個","📦"],["場景範本","6個","📋"],["擴充插件","3個","🔌"],["教學影片","8支","🎥"]].map(([label, val, emoji]) => (
          <button key={label} onClick={() => setCategory(label.replace("應用","").replace("擴充",""))} className={`p-4 rounded-xl border text-left transition-all ${category===label.replace("應用","").replace("擴充","") ? "border-purple-500/50 bg-purple-500/10" : "border-white/10 bg-white/[0.04] hover:border-white/20"}`}>
            <div className="text-xl mb-1">{emoji}</div>
            <div className="text-white font-semibold">{val}</div>
            <div className="text-xs text-white/40">{label}</div>
          </button>
        ))}
      </div>

      {/* Kits */}
      {tab === "browse" && (
        <div className="space-y-4">
          <h2 className="font-semibold text-white">應用套件</h2>
          <div className="grid grid-cols-2 gap-4">
            {KITS.map((k, i) => (
              <div key={i} className="rounded-xl bg-white/[0.04] border border-white/10 p-4 hover:border-purple-500/30 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm">{k.name}</span>
                      {k.hot && <span className="text-xs text-yellow-400/80 border border-yellow-400/20 px-1.5 rounded-full">熱門</span>}
                      {k.trial && <span className="text-xs text-green-400/80 border border-green-400/20 px-1.5 rounded-full">可試用</span>}
                    </div>
                    <div className="text-xs text-white/30 mt-0.5">{k.author} · {k.version} · {k.installs} 安裝</div>
                  </div>
                </div>
                <p className="text-xs text-white/40 leading-relaxed mb-3">{k.desc}</p>
                <div className="flex gap-2">
                  <button className="flex-1 text-xs py-1.5 rounded-lg bg-purple-600/20 text-purple-300 border border-purple-500/20 hover:bg-purple-600/40 transition-all">安裝套件</button>
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white/40 hover:bg-white/10 transition-all">詳細介紹</button>
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-semibold text-white pt-2">場景範本</h2>
          <div className="grid grid-cols-2 gap-3">
            {TEMPLATES.map((t, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-purple-500/30 transition-all">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-white">{t.name}</span>
                  {t.trial && <span className="text-xs text-green-400/80 border border-green-400/20 px-1.5 rounded-full">可試用</span>}
                </div>
                <div className="text-xs text-white/30 mb-1">{t.author} · {t.category}</div>
                <p className="text-xs text-white/40">{t.desc}</p>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 text-xs py-1.5 rounded-lg bg-purple-600/20 text-purple-300 border border-purple-500/20 hover:bg-purple-600/40 transition-all">使用範本</button>
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white/40 hover:bg-white/10 transition-all">預覽流程</button>
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-semibold text-white pt-2">擴充插件（Chrome）</h2>
          <div className="space-y-3">
            {PLUGINS.map((p, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-purple-500/30 transition-all group">
                <div className="text-2xl">🔌</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">{p.name}</span>
                    <span className="text-xs text-white/30">{p.version} · {p.author}</span>
                  </div>
                  <p className="text-xs text-white/40 mt-0.5">{p.desc}</p>
                </div>
                <button className="text-xs px-4 py-1.5 rounded-lg bg-purple-600/20 text-purple-300 border border-purple-500/20 hover:bg-purple-600/40 opacity-0 group-hover:opacity-100 transition-all">安裝</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "mine" && (
        <div className="rounded-xl bg-white/[0.03] border border-dashed border-white/10 p-10 text-center">
          <div className="text-3xl mb-3">🧪</div>
          <div className="text-white/40">你還沒有試用中的資源</div>
          <button onClick={() => setTab("browse")} className="mt-4 text-xs px-4 py-2 rounded-lg bg-purple-600/20 text-purple-300 border border-purple-500/20 hover:bg-purple-600/40 transition-all">前往瀏覽資源</button>
        </div>
      )}
    </div>
  );
}
