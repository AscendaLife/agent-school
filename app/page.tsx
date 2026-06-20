import Link from "next/link";
import { TASKS, COURSES } from "@/lib/data";

const stats = [
  { label: "學習天數", value: "12", emoji: "📅" },
  { label: "累計點數", value: "350", emoji: "🪙" },
  { label: "已訓練 Agent", value: "2", emoji: "🤖" },
  { label: "技能解鎖", value: "8", emoji: "⚡" },
];

export default function Home() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div className="rounded-2xl bg-gradient-to-br from-purple-900/50 to-pink-900/30 border border-purple-500/20 p-6">
        <div className="text-white/50 text-sm mb-1">歡迎回來，訓練師 👋</div>
        <div className="text-2xl font-bold text-white">你的 Agent 正在等待新技能</div>
        <div className="text-white/40 text-sm mt-1">距離下一堂直播課還有 <span className="text-purple-300 font-semibold">3 天</span></div>
        <div className="mt-4 flex gap-3">
          <Link href="/training" className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-all">🎓 訓練我的 Agent</Link>
          <Link href="/learning" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-all">📖 查看課程</Link>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-white/[0.04] border border-white/10 p-4 text-center">
            <div className="text-2xl mb-1">{s.emoji}</div>
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-white">🎥 近期直播課</div>
            <Link href="/learning" className="text-xs text-purple-400 hover:text-purple-300">全部</Link>
          </div>
          <div className="space-y-3">
            {COURSES.slice(0, 3).map(c => c.schedule[0]).map((s, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <div className="w-2 h-2 rounded-full bg-red-400 mt-1.5 flex-shrink-0 animate-pulse" />
                <div>
                  <div className="text-sm text-white font-medium">{s.topic}</div>
                  <div className="text-xs text-white/40 mt-0.5">{s.date} · {s.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-white">💼 熱門任務</div>
            <Link href="/tasks" className="text-xs text-purple-400 hover:text-purple-300">全部</Link>
          </div>
          <div className="space-y-3">
            {TASKS.slice(0, 3).map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/5">
                <div>
                  <div className="text-sm text-white font-medium">{t.title}</div>
                  <div className="text-xs text-white/40 mt-0.5">難度：{t.difficulty} · 截止 {t.deadline}</div>
                </div>
                <div className="text-xs text-green-400 font-semibold flex-shrink-0 ml-2">NT${t.reward.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold text-white">🤖 我的 Agent</div>
          <Link href="/training" className="text-xs text-purple-400 hover:text-purple-300">訓練新 Agent</Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "小助理 Aria", skills: ["🔍 搜尋", "📚 知識庫", "💬 LINE"], level: "訓練期 Lv.3", status: "服役中" },
            { name: "銷售小幫手 Max", skills: ["👥 CRM", "📧 Email", "🧠 記憶"], level: "成長期 Lv.2", status: "訓練中" },
          ].map((a) => (
            <div key={a.name} className="p-4 rounded-xl bg-gradient-to-br from-purple-900/30 to-transparent border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg">🤖</div>
                <div>
                  <div className="text-sm font-semibold text-white">{a.name}</div>
                  <div className="text-xs text-white/40">{a.level}</div>
                </div>
                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${a.status === "服役中" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>{a.status}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {a.skills.map(s => (<span key={s} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/60">{s}</span>))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
