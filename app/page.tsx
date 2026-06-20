import Link from "next/link";
import { TASKS, COURSES } from "@/lib/data";

const STATS = [
  { label: "學習天數", value: "12", emoji: "📅", sub: "連續打卡中" },
  { label: "累計點數", value: "350", emoji: "🪙", sub: "+50 本週" },
  { label: "已訓練 Agent", value: "2", emoji: "🤖", sub: "可上架賺錢" },
  { label: "本月市場收益", value: "NT$0", emoji: "💰", sub: "上架後開始累積" },
];

const FLYWHEEL = [
  { emoji: "📖", label: "學課程", active: true },
  { emoji: "🎓", label: "訓 Agent", active: true },
  { emoji: "🏅", label: "考認證", active: false },
  { emoji: "🛒", label: "上架賣", active: false },
  { emoji: "💰", label: "賺分潤", active: false },
];

export default function Home() {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-purple-900/50 via-purple-900/30 to-pink-900/20 border border-purple-500/20 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-white/50 text-sm mb-1">歡迎回來，訓練師 👋</div>
            <div className="text-2xl font-bold text-white">你的 Agent 正在等待新技能</div>
            <div className="text-white/40 text-sm mt-1">距離下一堂直播課還有 <span className="text-purple-300 font-semibold">3 天</span> · 孵化師認證 <span className="text-yellow-400">已取得</span></div>
            <div className="mt-4 flex gap-3">
              <Link href="/training" className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-all">🎓 訓練我的 Agent</Link>
              <Link href="/cert" className="px-4 py-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 border border-yellow-500/30 text-sm font-medium transition-all">🏅 下一張證照</Link>
              <Link href="/market" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-all">🛒 Agent 市場</Link>
            </div>
          </div>
          {/* Mini flywheel */}
          <div className="hidden lg:flex flex-col items-center gap-1 flex-shrink-0">
            <div className="text-xs text-white/30 mb-1">Learn → Earn 飛輪</div>
            {FLYWHEEL.map((f, i) => (
              <div key={f.label} className="flex items-center gap-1">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${f.active ? "bg-purple-600/30 text-purple-200 border border-purple-500/30" : "bg-white/5 text-white/20 border border-white/5"}`}>
                  <span>{f.emoji}</span><span>{f.label}</span>
                </div>
                {i < FLYWHEEL.length - 1 && <div className={`w-px h-3 ${f.active ? "bg-purple-500/50" : "bg-white/10"}`} style={{ marginLeft: "50%" }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-xl bg-white/[0.04] border border-white/10 p-4 text-center hover:border-white/20 transition-all">
            <div className="text-2xl mb-1">{s.emoji}</div>
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
            <div className="text-xs text-white/20 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Market Spotlight + Live Schedule */}
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-white">🎥 近期直播課</div>
            <Link href="/learning" className="text-xs text-purple-400 hover:text-purple-300">全部課程</Link>
          </div>
          <div className="space-y-3">
            {COURSES.slice(0, 3).map(c => (
              <div key={c.id} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-purple-500/20 transition-all">
                <span className="text-lg flex-shrink-0">{c.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white font-medium truncate">{c.schedule[0].topic}</div>
                  <div className="text-xs text-white/40 mt-0.5">{c.schedule[0].date} · {c.schedule[0].time}</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 flex-shrink-0 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-white">🛒 熱賣 Agent</div>
            <Link href="/market" className="text-xs text-purple-400 hover:text-purple-300">進入市場</Link>
          </div>
          <div className="space-y-3">
            {[
              { name: "Luna 電商客服精靈", owner: "Trainer_Kevin", rental: 380, users: 142, cert: "🐦" },
              { name: "Nova 新聞摘要機器人", owner: "Trainer_Mike", rental: 120, users: 891, cert: "🐣" },
              { name: "Echo 知識庫管家", owner: "Trainer_Alex", rental: 660, users: 219, cert: "🦅" },
            ].map((a) => (
              <div key={a.name} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-purple-500/20 transition-all">
                <div className="min-w-0">
                  <div className="text-sm text-white font-medium truncate">{a.name}</div>
                  <div className="text-xs text-white/30 mt-0.5">{a.cert} {a.owner} · {a.users} 人使用</div>
                </div>
                <div className="text-xs text-green-400 font-semibold flex-shrink-0 ml-2">NT${a.rental}/月</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* My Agents + Tasks */}
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-white">🤖 我的 Agent</div>
            <Link href="/training" className="text-xs text-purple-400 hover:text-purple-300">+ 訓練新 Agent</Link>
          </div>
          <div className="space-y-3">
            {[
              { name: "小助理 Aria", skills: ["🔍", "📚", "💬"], level: "Lv.3 訓練期", status: "服役中", statusColor: "text-green-400 bg-green-500/10" },
              { name: "銷售小幫手 Max", skills: ["👥", "📧", "🧠"], level: "Lv.2 成長期", status: "訓練中", statusColor: "text-yellow-400 bg-yellow-500/10" },
            ].map((a) => (
              <div key={a.name} className="p-4 rounded-xl bg-gradient-to-br from-purple-900/30 to-transparent border border-purple-500/20 hover:border-purple-500/40 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm">🤖</div>
                    <div>
                      <div className="text-sm font-semibold text-white">{a.name}</div>
                      <div className="text-xs text-white/30">{a.level}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${a.statusColor}`}>{a.status}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">{a.skills.map(s => <span key={s} className="text-sm">{s}</span>)}</div>
                  <button className="text-xs px-3 py-1 rounded-lg bg-purple-600/20 text-purple-300 hover:bg-purple-600/40 transition-all">上架市場</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-white">💼 熱門任務</div>
            <Link href="/tasks" className="text-xs text-purple-400 hover:text-purple-300">全部任務</Link>
          </div>
          <div className="space-y-3">
            {TASKS.slice(0, 3).map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all">
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
      <div className="rounded-xl border border-dashed border-purple-500/30 p-5 flex items-center justify-between gap-4">
        <div>
          <div className="font-semibold text-white">準備好讓你的 Agent 出去工作了嗎？</div>
          <div className="text-sm text-white/40 mt-1">上架 Agent 到市場，每筆成交你拿 <span className="text-green-400 font-bold">70%</span>。頂尖學員月收 NT$8 萬。</div>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <Link href="/cert" className="px-4 py-2 rounded-lg bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-sm font-medium hover:bg-yellow-500/30 transition-all">先考認證</Link>
          <Link href="/market" className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-all">進入市場</Link>
        </div>
      </div>
    </div>
  );
}
