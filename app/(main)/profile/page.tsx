import Link from "next/link";
import ActionButton from "@/components/ActionButton";

export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-4xl animate-fade-up">
      {/* Header card */}
      <div className="gradient-ring overflow-hidden">
        <div className="relative p-6">
          <div className="absolute -top-16 -right-10 w-56 h-56 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
          <div className="relative flex items-start gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl flex-shrink-0 glow-soft">🤖</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <div className="text-2xl font-black text-white tracking-tight">訓練師 <span className="text-gradient">SA26010001</span></div>
                <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">🥚 孵化師認證</span>
              </div>
              <div className="text-white/40 text-sm">加入於 2026/06/08 · Lv.1 孵化期在讀</div>
              <div className="flex items-center gap-4 mt-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">2</div>
                  <div className="text-xs text-white/30">我的 Agent</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <div className="text-lg font-bold text-white">350</div>
                  <div className="text-xs text-white/30">累積點數</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <div className="text-lg font-bold text-white">#8</div>
                  <div className="text-xs text-white/30">排行榜</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">NT$0</div>
                  <div className="text-xs text-white/30">本月收益</div>
                </div>
              </div>
            </div>
            <ActionButton className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.06] text-white/60 hover:text-white hover:bg-white/10 border border-white/10 transition-all flex-shrink-0" toastMsg="（示範）主頁編輯功能即將開放" toastKind="info">編輯主頁</ActionButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* My Agents */}
        <div className="col-span-2 space-y-4">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold text-white">🤖 我的 Agent</div>
              <Link href="/training" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">+ 訓練新 Agent</Link>
            </div>
            <div className="space-y-3 stagger">
              {[
                { name: "小助理 Aria", lv: "Lv.3 訓練期", status: "服役中", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", skills: ["🔍", "📚", "💬"], earnings: 0, listed: false },
                { name: "銷售小幫手 Max", lv: "Lv.2 成長期", status: "訓練中", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", skills: ["👥", "📧", "🧠"], earnings: 0, listed: false },
              ].map((a) => (
                <div key={a.name} className="card card-interactive flex items-center gap-4 p-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl flex-shrink-0">🤖</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-white text-sm">{a.name}</div>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${a.statusColor}`}>{a.status}</span>
                    </div>
                    <div className="text-xs text-white/30 mt-0.5">{a.lv} · 技能：{a.skills.join(" ")}</div>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/training" className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.06] text-white/50 hover:text-white hover:bg-white/10 border border-white/10 transition-all">繼續訓練</Link>
                    <ActionButton className="text-xs px-3 py-1.5 rounded-lg bg-purple-600/20 text-purple-300 hover:bg-purple-600/40 transition-all" href="/market" toastMsg="（示範）前往市場上架你的 Agent">上架市場</ActionButton>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course progress */}
          <div className="card p-5">
            <div className="font-semibold text-white mb-4">📖 學習進度</div>
            <div className="space-y-3 stagger">
              {[
                { name: "🥚 孵化期 Lv.1", progress: 100, status: "已完成", score: 92 },
                { name: "🐣 成長期 Lv.2", progress: 0, status: "未開始", score: null },
              ].map((c) => (
                <div key={c.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-white">{c.name}</div>
                    <div className="text-xs text-white/40">
                      {c.score ? <span className="text-green-400">成績 {c.score} 分</span> : c.status}
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Certs */}
          <div className="card p-5">
            <div className="font-semibold text-white mb-3">🏅 我的證照</div>
            <div className="space-y-2 stagger">
              {[
                { name: "孵化師", emoji: "🥚", color: "from-yellow-400 to-orange-400", owned: true },
                { name: "技能師", emoji: "🐣", color: "from-green-400 to-teal-400", owned: false },
                { name: "訓練師", emoji: "🐦", color: "from-blue-400 to-indigo-500", owned: false },
                { name: "架構師", emoji: "🦅", color: "from-purple-500 to-pink-500", owned: false },
                { name: "畢業大師", emoji: "🦁", color: "from-red-500 to-yellow-500", owned: false },
              ].map((c) => (
                <div key={c.name} className={`flex items-center gap-2 p-2 rounded-lg ${c.owned ? "bg-yellow-500/10 border border-yellow-500/20" : "opacity-30"}`}>
                  <span className="text-lg">{c.emoji}</span>
                  <span className="text-sm text-white">{c.name}</span>
                  {c.owned && <span className="ml-auto text-xs text-yellow-400">✓</span>}
                </div>
              ))}
            </div>
            <Link href="/cert" className="mt-3 block text-center text-xs text-purple-400 hover:text-purple-300 transition-colors">前往報考 →</Link>
          </div>

          {/* Earnings */}
          <div className="card p-5">
            <div className="font-semibold text-white mb-3">💰 收益總覽</div>
            <div className="text-center py-4">
              <div className="text-3xl font-black text-white">NT$0</div>
              <div className="text-xs text-white/30 mt-1">本月市場收益</div>
              <div className="text-xs text-white/20 mt-1">累計 NT$0</div>
            </div>
            <div className="p-3 rounded-lg bg-purple-900/20 border border-purple-500/20 text-xs text-purple-300 text-center leading-relaxed">
              上架 Agent 即可開始獲得分潤<br />
              <Link href="/market" className="underline mt-1 inline-block">查看市場 →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
