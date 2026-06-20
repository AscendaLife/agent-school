import Link from "next/link";

const BOARD = [
  { rank: 1, name: "Trainer_Sarah", cert: "🦅", agents: 12, earnings: 68000, rating: 5.0, badge: "本月MVP" },
  { rank: 2, name: "Trainer_Alex", cert: "🦅", agents: 9, earnings: 52000, rating: 4.9, badge: "架構師之星" },
  { rank: 3, name: "Trainer_Kevin", cert: "🐦", agents: 7, earnings: 31000, rating: 4.9, badge: "" },
  { rank: 4, name: "Trainer_Coco", cert: "🐦", agents: 5, earnings: 24000, rating: 4.8, badge: "" },
  { rank: 5, name: "Trainer_Mia", cert: "🐣", agents: 4, earnings: 18000, rating: 4.7, badge: "新星上升" },
  { rank: 6, name: "Trainer_Mike", cert: "🐣", agents: 3, earnings: 14000, rating: 4.7, badge: "" },
  { rank: 7, name: "Trainer_Joy", cert: "🐣", agents: 3, earnings: 11000, rating: 4.6, badge: "" },
  { rank: 8, name: "訓練師 SA26010001", cert: "🥚", agents: 2, earnings: 0, rating: 0, badge: "你" },
];

const MEDALS = ["🥇", "🥈", "🥉"];

export default function LeaderboardPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white">🏆 訓練師排行榜</h1>
        <p className="text-white/40 text-sm mt-1">依本月 Agent 市場收益排名 · 每月 1 日更新</p>
      </div>

      {/* Top 3 podium */}
      <div className="rounded-xl bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/20 p-6">
        <div className="flex items-end justify-center gap-6">
          {[BOARD[1], BOARD[0], BOARD[2]].map((p, i) => {
            const heights = ["h-24", "h-32", "h-20"];
            const ranks = [2, 1, 3];
            return (
              <div key={p.rank} className="flex flex-col items-center gap-2">
                <div className="text-2xl font-bold text-white">{p.name.replace("Trainer_", "")}</div>
                <div className="text-sm text-white/50">{p.cert} 月收 NT${(p.earnings / 1000).toFixed(0)}k</div>
                <div className={`${heights[i]} w-24 rounded-t-xl flex items-center justify-center text-3xl ${i === 1 ? "bg-gradient-to-br from-yellow-400/30 to-orange-400/20 border border-yellow-400/30" : "bg-white/[0.06] border border-white/10"}`}>
                  {MEDALS[ranks[i] - 1]}
                </div>
                <div className="text-2xl font-black text-white/20">#{ranks[i]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full table */}
      <div className="rounded-xl bg-white/[0.04] border border-white/10 overflow-hidden">
        <div className="grid grid-cols-6 text-xs text-white/30 px-5 py-3 border-b border-white/5 bg-white/[0.02]">
          <span>排名</span><span className="col-span-2">訓練師</span><span>上架 Agent</span><span>本月收益</span><span>評分</span>
        </div>
        {BOARD.map((p) => (
          <div key={p.rank} className={`grid grid-cols-6 items-center px-5 py-4 border-b border-white/5 last:border-0 transition-all hover:bg-white/[0.03] ${p.badge === "你" ? "bg-purple-900/20 border-purple-500/20" : ""}`}>
            <div className="text-lg font-bold text-white/60">{p.rank <= 3 ? MEDALS[p.rank - 1] : `#${p.rank}`}</div>
            <div className="col-span-2 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                {p.name.slice(-2)}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{p.name}</div>
                <div className="text-xs text-white/30">{p.cert}</div>
              </div>
              {p.badge && p.badge !== "你" && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/20">{p.badge}</span>
              )}
              {p.badge === "你" && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/20">你</span>
              )}
            </div>
            <div className="text-sm text-white/60">{p.agents} 隻</div>
            <div className={`text-sm font-semibold ${p.earnings > 0 ? "text-green-400" : "text-white/20"}`}>
              {p.earnings > 0 ? `NT$${p.earnings.toLocaleString()}` : "—"}
            </div>
            <div className="text-sm text-yellow-400">{p.rating > 0 ? `⭐ ${p.rating}` : "—"}</div>
          </div>
        ))}
      </div>

      {/* My progress */}
      <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5">
        <div className="font-semibold text-white mb-4">📈 我的晉升路徑</div>
        <div className="flex items-center gap-4">
          <div className="flex-1 p-4 rounded-xl bg-purple-900/20 border border-purple-500/20 text-center">
            <div className="text-xs text-white/30 mb-1">現在排名</div>
            <div className="text-2xl font-black text-white">#8</div>
          </div>
          <div className="text-white/20 text-2xl">→</div>
          <div className="flex-1 p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
            <div className="text-xs text-white/30 mb-1">下一名差距</div>
            <div className="text-lg font-bold text-white">NT$11,000</div>
            <div className="text-xs text-white/30">Trainer_Joy #7</div>
          </div>
          <div className="text-white/20 text-2xl">→</div>
          <div className="flex-1 text-center">
            <div className="text-xs text-white/30 mb-2">如何提升？</div>
            <Link href="/training" className="text-xs px-3 py-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-500 transition-all">訓練 Agent 上架</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
