import Link from "next/link";
import { TASKS, COURSES } from "@/lib/data";

const STATS = [
  { label: "學習天數", value: "12", emoji: "📅", sub: "連續打卡中", accent: "text-blue-400" },
  { label: "累計點數", value: "350", emoji: "🪙", sub: "+50 本週", accent: "text-yellow-400" },
  { label: "已訓練 Agent", value: "2", emoji: "🤖", sub: "可上架賺錢", accent: "text-purple-400" },
  { label: "本月市場收益", value: "NT$0", emoji: "💰", sub: "上架後開始累積", accent: "text-green-400" },
];

const FLYWHEEL = [
  { emoji: "📖", label: "學課程", active: true },
  { emoji: "🎓", label: "訓 Agent", active: true },
  { emoji: "🏅", label: "考認證", active: false },
  { emoji: "🛒", label: "上架賣", active: false },
  { emoji: "💰", label: "賺分潤", active: false },
];

const HOT_AGENTS = [
  { name: "Luna 電商客服精靈", owner: "Trainer_Kevin", rental: 380, users: 142, cert: "🐦" },
  { name: "Nova 新聞摘要機器人", owner: "Trainer_Mike", rental: 120, users: 891, cert: "🐣" },
  { name: "Echo 知識庫管家", owner: "Trainer_Alex", rental: 660, users: 219, cert: "🦅" },
];

const MY_AGENTS = [
  { name: "小助理 Aria", skills: ["🔍", "📚", "💬"], level: "Lv.3 訓練期", status: "服役中", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { name: "銷售小幫手 Max", skills: ["👥", "📧", "🧠"], level: "Lv.2 成長期", status: "訓練中", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
];

export default function Home() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-up">
      {/* Hero */}
      <div className="gradient-ring overflow-hidden">
        <div className="relative p-7">
          <div className="absolute -top-16 -right-10 w-56 h-56 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
          <div className="relative flex items-start justify-between gap-6">
            <div>
              <div className="text-white/50 text-sm mb-1.5">歡迎回來，訓練師 👋</div>
              <div className="text-3xl font-black text-white tracking-tight">
                你的 Agent 正在等待<span className="text-gradient">新技能</span>
              </div>
              <div className="text-white/45 text-sm mt-2">
                距離下一堂直播課還有 <span className="text-purple-300 font-semibold">3 天</span>
                <span className="mx-2 text-white/20">·</span>
                孵化師認證 <span className="text-yellow-400 font-semibold">已取得</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/training" className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold">🎓 訓練我的 Agent</Link>
                <Link href="/cert" className="px-5 py-2.5 rounded-xl text-sm font-medium bg-yellow-500/15 hover:bg-yellow-500/25 text-yellow-300 border border-yellow-500/25 transition-all">🏅 下一張證照</Link>
                <Link href="/market" className="px-5 py-2.5 rounded-xl text-sm font-medium bg-white/[0.06] hover:bg-white/10 text-white border border-white/10 transition-all">🛒 Agent 市場</Link>
              </div>
            </div>

            {/* Mini flywheel */}
            <div className="hidden lg:flex flex-col items-stretch gap-1.5 flex-shrink-0 w-40">
              <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1 text-center">Learn → Earn 飛輪</div>
              {FLYWHEEL.map((f) => (
                <div
                  key={f.label}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    f.active
                      ? "bg-gradient-to-r from-purple-600/30 to-pink-600/10 text-purple-100 border border-purple-500/30"
                      : "bg-white/[0.03] text-white/25 border border-white/5"
                  }`}
                >
                  <span className="text-sm">{f.emoji}</span>
                  <span>{f.label}</span>
                  {f.active && <span className="ml-auto text-green-400 text-[10px]">●</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
        {STATS.map((s) => (
          <div key={s.label} className="card card-interactive p-5 text-center">
            <div className="text-2xl mb-1.5">{s.emoji}</div>
            <div className={`text-2xl font-bold ${s.accent}`}>{s.value}</div>
            <div className="text-xs text-white/50 mt-1 font-medium">{s.label}</div>
            <div className="text-[11px] text-white/25 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Live + Market */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-white flex items-center gap-2">🎥 近期直播課</div>
            <Link href="/learning" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">全部課程 →</Link>
          </div>
          <div className="space-y-2.5 stagger">
            {COURSES.slice(0, 3).map((c) => (
              <div key={c.id} className="card card-interactive flex items-start gap-3 p-3.5">
                <span className="text-xl flex-shrink-0 animate-float">{c.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white font-medium truncate">{c.schedule[0].topic}</div>
                  <div className="text-xs text-white/40 mt-0.5">{c.schedule[0].date} · {c.schedule[0].time}</div>
                </div>
                <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-red-400 animate-pulse-ring" />
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-white flex items-center gap-2">🛒 熱賣 Agent</div>
            <Link href="/market" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">進入市場 →</Link>
          </div>
          <div className="space-y-2.5 stagger">
            {HOT_AGENTS.map((a) => (
              <div key={a.name} className="card card-interactive flex items-center justify-between p-3.5">
                <div className="min-w-0">
                  <div className="text-sm text-white font-medium truncate">{a.name}</div>
                  <div className="text-xs text-white/35 mt-0.5">{a.cert} {a.owner} · {a.users} 人使用</div>
                </div>
                <div className="text-xs text-green-400 font-bold flex-shrink-0 ml-2">NT${a.rental}/月</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* My Agents + Tasks */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-white flex items-center gap-2">🤖 我的 Agent</div>
            <Link href="/training" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">+ 訓練新 Agent</Link>
          </div>
          <div className="space-y-3 stagger">
            {MY_AGENTS.map((a) => (
              <div key={a.name} className="gradient-ring p-4">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-base">🤖</div>
                    <div>
                      <div className="text-sm font-semibold text-white">{a.name}</div>
                      <div className="text-xs text-white/35">{a.level}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${a.statusColor}`}>{a.status}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5 text-base">{a.skills.map((s) => <span key={s}>{s}</span>)}</div>
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-purple-600/20 text-purple-300 hover:bg-purple-600/40 transition-all">上架市場</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-white flex items-center gap-2">💼 熱門任務</div>
            <Link href="/tasks" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">全部任務 →</Link>
          </div>
          <div className="space-y-2.5 stagger">
            {TASKS.slice(0, 3).map((t) => (
              <div key={t.id} className="card card-interactive flex items-center justify-between p-3.5">
                <div className="min-w-0">
                  <div className="text-sm text-white font-medium truncate">{t.title}</div>
                  <div className="text-xs text-white/40 mt-0.5">{t.difficulty} · 截止 {t.deadline}</div>
                </div>
                <div className="text-sm text-green-400 font-bold flex-shrink-0 ml-2">+NT${t.reward.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Earn CTA */}
      <div className="gradient-ring p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="font-semibold text-white text-lg">準備好讓你的 Agent 出去工作了嗎？</div>
          <div className="text-sm text-white/45 mt-1">上架 Agent 到市場，每筆成交你拿 <span className="text-green-400 font-bold">70%</span>。頂尖學員月收 NT$8 萬。</div>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <Link href="/cert" className="px-4 py-2.5 rounded-xl bg-yellow-500/15 border border-yellow-500/25 text-yellow-300 text-sm font-medium hover:bg-yellow-500/25 transition-all">先考認證</Link>
          <Link href="/market" className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold">進入市場</Link>
        </div>
      </div>
    </div>
  );
}
