import { COURSES, INSTRUCTORS } from "@/lib/data";

export default function LearningPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white">📖 學習中心</h1>
        <p className="text-white/40 text-sm mt-1">真人直播 × 錄播回看 · 從零到部署，五階段完整培訓</p>
      </div>

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

      {/* Courses */}
      <div className="space-y-5">
        <h2 className="font-semibold text-white">🎓 五階段課程</h2>
        {COURSES.map((c) => {
          const ins = INSTRUCTORS.find(i => i.id === c.instructor)!;
          return (
            <div key={c.id} className="rounded-xl bg-white/[0.04] border border-white/10 overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${c.color}`} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`text-4xl`}>{c.emoji}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/40">Lv.{c.level}</span>
                        <span className="font-bold text-white text-lg">{c.name}</span>
                        <span className="text-white/40">·</span>
                        <span className="text-white/60 text-sm">{c.subtitle}</span>
                      </div>
                      <p className="text-sm text-white/50 mt-1 max-w-lg">{c.desc}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xl font-bold text-white">NT$ {c.price.toLocaleString()}</div>
                    <div className="text-xs text-white/30">{c.modules} 堂 · 真人直播</div>
                    <button className="mt-2 px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-all">立即報名</button>
                  </div>
                </div>

                {/* 講師 */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">{ins.avatar}</div>
                  <span className="text-xs text-white/50">主講：<span className="text-white/70">{ins.name}</span> · {ins.title}</span>
                </div>

                {/* 課表 */}
                <div className="mt-4">
                  <div className="text-xs text-white/40 mb-2 font-medium">📅 直播課表</div>
                  <div className="grid grid-cols-2 gap-2">
                    {c.schedule.map((s, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5 text-xs">
                        <span className="text-red-400">🔴</span>
                        <span className="text-white/70">{s.date}</span>
                        <span className="text-white/30">{s.time}</span>
                        <span className="text-white/50 truncate">{s.topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 錄播 */}
                {c.recordings.length > 0 && (
                  <div className="mt-3">
                    <div className="text-xs text-white/40 mb-2 font-medium">▶️ 錄播 / 試聽</div>
                    <div className="flex flex-wrap gap-2">
                      {c.recordings.map((r, i) => (
                        <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border ${r.free ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-white/10 bg-white/5 text-white/40"}`}>
                          {r.free ? "🆓" : "🔒"} {r.title} · {r.duration}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 課綱 */}
                <div className="mt-4">
                  <div className="text-xs text-white/40 mb-2 font-medium">📋 課綱 ({c.lessons.length} 主題)</div>
                  <div className="flex flex-wrap gap-2">
                    {c.lessons.map((l, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/5 text-white/50">
                        {l.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
