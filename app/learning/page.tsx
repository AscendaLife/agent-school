"use client";
import { useState } from "react";
import { COURSES, INSTRUCTORS } from "@/lib/data";

const CONCEPTS = [
  { lv: 1, name: "孵化", items: [
    { name: "AI Agent 是什麼", type: "核心概念" }, { name: "Prompt 設計", type: "進階心法" },
    { name: "System Prompt", type: "核心概念" }, { name: "Temperature", type: "技術名詞" },
    { name: "Zero-shot", type: "進階心法" }, { name: "Few-shot", type: "進階心法" },
    { name: "Chain-of-Thought", type: "進階心法" }, { name: "Role Prompting", type: "進階心法" },
    { name: "Token", type: "計費單位" }, { name: "Hallucination", type: "技術名詞" },
    { name: "Context Window", type: "技術名詞" }, { name: "LLM", type: "核心概念" },
  ]},
  { lv: 2, name: "成長", items: [
    { name: "Tool Use", type: "核心概念" }, { name: "Function Calling", type: "技術名詞" },
    { name: "Webhook", type: "技術名詞" }, { name: "API", type: "技術名詞" },
    { name: "Make.com", type: "工具/平台" }, { name: "n8n", type: "工具/平台" },
    { name: "RAG", type: "核心概念" }, { name: "Embedding", type: "技術名詞" },
    { name: "Vector DB", type: "工具/平台" }, { name: "Chunking", type: "技術名詞" },
    { name: "JSON", type: "技術名詞" }, { name: "No-code", type: "工具/平台" },
  ]},
  { lv: 3, name: "訓練", items: [
    { name: "ReAct 推理", type: "核心概念" }, { name: "Planning", type: "核心概念" },
    { name: "Memory", type: "核心概念" }, { name: "Fine-tuning", type: "技術名詞" },
    { name: "Prompt Template", type: "進階心法" }, { name: "Reranking", type: "技術名詞" },
    { name: "Knowledge Base", type: "核心概念" }, { name: "Workflow", type: "核心概念" },
  ]},
  { lv: 4, name: "進化", items: [
    { name: "Multi-Agent", type: "核心概念" }, { name: "A2A 協議", type: "技術名詞" },
    { name: "CrewAI", type: "工具/平台" }, { name: "MCP", type: "技術名詞" },
    { name: "MCP Server", type: "工具/平台" }, { name: "Supervisor 模式", type: "核心概念" },
    { name: "OpenAPI", type: "技術名詞" }, { name: "Integration", type: "核心概念" },
  ]},
  { lv: 5, name: "畢業", items: [
    { name: "Deploy 部署", type: "技術名詞" }, { name: "Edge Function", type: "技術名詞" },
    { name: "SaaS", type: "商業概念" }, { name: "Pricing 定價", type: "商業概念" },
    { name: "MVP", type: "商業概念" }, { name: "Personal Brand", type: "商業概念" },
    { name: "Network Effect", type: "商業概念" }, { name: "Moat 護城河", type: "商業概念" },
  ]},
];

const TYPE_COLOR: Record<string, string> = {
  "核心概念": "bg-purple-500/20 text-purple-300 border-purple-500/20",
  "進階心法": "bg-blue-500/20 text-blue-300 border-blue-500/20",
  "技術名詞": "bg-gray-500/20 text-gray-300 border-gray-500/20",
  "工具/平台": "bg-green-500/20 text-green-300 border-green-500/20",
  "商業概念": "bg-yellow-500/20 text-yellow-300 border-yellow-500/20",
  "計費單位": "bg-orange-500/20 text-orange-300 border-orange-500/20",
  "實作項目": "bg-pink-500/20 text-pink-300 border-pink-500/20",
};

const ENROLLED = [
  { title: "孵化期 Lv.1 — Agent 基礎入門", status: "已完成", date: "2026/06/15", score: 92 },
  { title: "成長期 Lv.2 — 技能模組整合", status: "進行中", date: "2026/07/19 開始", score: null },
];

const QUIZZES = [
  { title: "孵化期結業測驗", course: "Lv.1", questions: 20, passing: 80, time: 30, status: "已完成", score: 92 },
  { title: "成長期課後小測", course: "Lv.2", questions: 10, passing: 70, time: 15, status: "可作答", score: null },
  { title: "等級認證測驗", course: "全級", questions: 50, passing: 85, time: 60, status: "準備中", score: null },
  { title: "Agent 架構師認證", course: "Lv.4+", questions: 80, passing: 90, time: 120, status: "準備中", score: null },
];

export default function LearningPage() {
  const [tab, setTab] = useState<"novice"|"courses"|"mine"|"quiz">("novice");
  const [expandedLv, setExpandedLv] = useState<number|null>(1);

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white">📖 學習中心</h1>
        <p className="text-white/40 text-sm mt-1">真人直播 × 錄播回看 · 從孵化到畢業，五階段完整培訓</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/[0.03] rounded-xl p-1 border border-white/10 w-fit">
        {([["novice","🥚 新手村"],["courses","📚 課程總覽"],["mine","🎒 我的課程"],["quiz","📝 測驗與成績"]] as const).map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab===t ? "bg-purple-600 text-white" : "text-white/40 hover:text-white"}`}>{label}</button>
        ))}
      </div>

      {/* 新手村 */}
      {tab === "novice" && (
        <div className="space-y-6">
          <div className="rounded-xl bg-gradient-to-br from-purple-900/40 to-pink-900/20 border border-purple-500/20 p-5">
            <h2 className="font-bold text-white text-lg mb-1">🎓 Agent 修煉之路</h2>
            <p className="text-white/40 text-sm">從孵化期到畢業期，五大境界。每境界有對應「概念」與「工具」，逐一突破，Agent 功力自然大增。</p>
          </div>

          {/* Level ladder */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {CONCEPTS.map((c, i) => (
              <div key={c.lv} className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => setExpandedLv(expandedLv === c.lv ? null : c.lv)}
                  className={`flex flex-col items-center px-4 py-3 rounded-xl border transition-all ${expandedLv===c.lv ? "border-purple-500/50 bg-purple-500/10" : "border-white/10 bg-white/[0.04] hover:border-white/20"}`}>
                  <span className="text-2xl">{COURSES[i]?.emoji}</span>
                  <span className="text-xs text-white/60 mt-1">Lv.{c.lv}</span>
                  <span className="text-xs text-white font-medium">{c.name}</span>
                  <span className="text-xs text-white/30">{c.items.length} 概念</span>
                </button>
                {i < CONCEPTS.length - 1 && <div className="w-6 h-px bg-white/10 flex-shrink-0" />}
              </div>
            ))}
          </div>

          {/* Expanded concept cards */}
          {expandedLv !== null && (
            <div>
              <h3 className="font-semibold text-white mb-3">
                {COURSES[expandedLv-1]?.emoji} Lv.{expandedLv} {CONCEPTS[expandedLv-1]?.name}期 — 概念圖鑑
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {CONCEPTS[expandedLv-1]?.items.map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.04] border border-white/5 hover:border-purple-500/20 transition-all">
                    <div className="font-medium text-white text-sm mb-1">{item.name}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${TYPE_COLOR[item.type] || "bg-white/5 text-white/40"}`}>{item.type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 課程總覽 */}
      {tab === "courses" && (
        <div className="space-y-5">
          {/* Instructors */}
          <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5">
            <h2 className="font-semibold text-white mb-4">👨‍🏫 師資陣容</h2>
            <div className="grid grid-cols-4 gap-4">
              {INSTRUCTORS.map((ins) => (
                <div key={ins.id} className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm mx-auto mb-2">{ins.avatar}</div>
                  <div className="text-sm font-semibold text-white">{ins.name}</div>
                  <div className="text-xs text-purple-400">{ins.title}</div>
                  <div className="text-xs text-white/30 mt-1 leading-relaxed">{ins.bio}</div>
                </div>
              ))}
            </div>
          </div>

          {COURSES.map((c) => {
            const ins = INSTRUCTORS.find(i => i.id === c.instructor)!;
            return (
              <div key={c.id} className="rounded-xl bg-white/[0.04] border border-white/10 overflow-hidden">
                <div className={`h-1.5 bg-gradient-to-r ${c.color}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{c.emoji}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/30">Lv.{c.level}</span>
                          <span className="font-bold text-white text-lg">{c.name}</span>
                          <span className="text-white/30">·</span>
                          <span className="text-white/50 text-sm">{c.subtitle}</span>
                        </div>
                        <p className="text-sm text-white/40 mt-1 max-w-lg">{c.desc}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xl font-bold text-white">NT$ {c.price.toLocaleString()}</div>
                      <div className="text-xs text-white/30">{c.modules} 堂 · 真人直播</div>
                      <button className="mt-2 px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-all">立即報名</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">{ins.avatar}</div>
                    <span className="text-xs text-white/40">主講：<span className="text-white/60">{ins.name}</span> · {ins.title}</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {c.schedule.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5 text-xs">
                        <span className="text-red-400 animate-pulse">🔴</span>
                        <span className="text-white/50">{s.date}</span>
                        <span className="text-white/30">{s.time}</span>
                        <span className="text-white/40 truncate">{s.topic}</span>
                      </div>
                    ))}
                  </div>
                  {c.recordings.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {c.recordings.map((r, i) => (
                        <span key={i} className={`text-xs px-3 py-1.5 rounded-full border ${r.free ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-white/10 text-white/30"}`}>
                          {r.free ? "🆓" : "🔒"} {r.title} · {r.duration}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.lessons.map((l, i) => (
                      <span key={i} className={`text-xs px-2 py-0.5 rounded-md border ${TYPE_COLOR[l.type] || "bg-white/5 text-white/40 border-white/5"}`}>{l.name}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 我的課程 */}
      {tab === "mine" && (
        <div className="space-y-4">
          {ENROLLED.map((e, i) => (
            <div key={i} className="rounded-xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">{e.title}</div>
                  <div className="text-xs text-white/30 mt-1">{e.date}</div>
                </div>
                <div className="flex items-center gap-3">
                  {e.score && <div className="text-sm font-bold text-green-400">成績：{e.score} 分</div>}
                  <span className={`text-xs px-3 py-1 rounded-full ${e.status === "已完成" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"}`}>{e.status}</span>
                  <button className="px-4 py-1.5 rounded-lg bg-purple-600/20 text-purple-300 border border-purple-500/20 hover:bg-purple-600/40 text-xs transition-all">
                    {e.status === "已完成" ? "▶ 回放" : "進入課程"}
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="rounded-xl bg-white/[0.03] border border-dashed border-white/10 p-8 text-center">
            <div className="text-3xl mb-2">📚</div>
            <div className="text-white/30 text-sm">想報名更多課程？</div>
            <button onClick={() => setTab("courses")} className="mt-3 text-xs px-4 py-2 rounded-lg bg-purple-600/20 text-purple-300 border border-purple-500/20 hover:bg-purple-600/40 transition-all">查看全部課程</button>
          </div>
        </div>
      )}

      {/* 測驗與成績 */}
      {tab === "quiz" && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 mb-2">
            {[["課後小測", "隨堂測驗，完成可得積分"],["等級認證", "通過可取得官方等級證書"],["架構師認證", "最高級別，業界認可資格"]].map(([t, d]) => (
              <div key={t} className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                <div className="font-semibold text-white text-sm">{t}</div>
                <div className="text-xs text-white/30 mt-1">{d}</div>
              </div>
            ))}
          </div>
          {QUIZZES.map((q, i) => (
            <div key={i} className="flex items-center justify-between p-5 rounded-xl bg-white/[0.04] border border-white/10">
              <div>
                <div className="font-semibold text-white">{q.title}</div>
                <div className="text-xs text-white/30 mt-1">{q.course} · {q.questions} 題 · 及格 {q.passing} 分 · 限時 {q.time} 分鐘</div>
              </div>
              <div className="flex items-center gap-3">
                {q.score && <div className="text-sm font-bold text-green-400">{q.score} 分</div>}
                <span className={`text-xs px-3 py-1 rounded-full border ${
                  q.status === "已完成" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                  q.status === "可作答" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                  "bg-white/5 text-white/30 border-white/10"
                }`}>{q.status}</span>
                {q.status === "可作答" && (
                  <button className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-all">開始作答</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
