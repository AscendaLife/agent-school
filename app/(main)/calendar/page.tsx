import { COURSES } from "@/lib/data";

const ALL_EVENTS = [
  ...COURSES.flatMap(c => c.schedule.map(s => ({
    date: s.date, time: s.time, type: "課程直播" as const,
    title: `[${c.name}] ${s.topic}`, color: "bg-purple-500/20 border-purple-500/30 text-purple-300",
  }))),
  { date: "2026/07/10", time: "19:00–21:00", type: "平台活動" as const, title: "[說明會] Agent School 招生說明會", color: "bg-blue-500/20 border-blue-500/30 text-blue-300" },
  { date: "2026/07/25", time: "14:00–16:00", type: "平台活動" as const, title: "[講座] 用 Agent 每月多賺 5 萬", color: "bg-blue-500/20 border-blue-500/30 text-blue-300" },
  { date: "2026/07/15", time: "23:59", type: "任務截止" as const, title: "[截止] 電商客服 Agent 任務", color: "bg-red-500/20 border-red-500/30 text-red-300" },
  { date: "2026/07/20", time: "23:59", type: "任務截止" as const, title: "[截止] 每日新聞摘要 Agent", color: "bg-red-500/20 border-red-500/30 text-red-300" },
].sort((a, b) => a.date.localeCompare(b.date));

export default function CalendarPage() {
  const upcoming = ALL_EVENTS.filter(e => e.date >= "2026/07/01").slice(0, 12);
  const typeColors: Record<string, string> = {
    "課程直播": "bg-purple-500/20 text-purple-300",
    "平台活動": "bg-blue-500/20 text-blue-300",
    "任務截止": "bg-red-500/20 text-red-300",
  };
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">📅 行事曆</h1>
        <p className="text-white/40 text-sm mt-1">整合課程直播、平台活動、任務截止與個人排程</p>
      </div>

      {/* Filter badges */}
      <div className="flex gap-2">
        {Object.entries(typeColors).map(([type, cls]) => (
          <span key={type} className={`text-xs px-3 py-1.5 rounded-full ${cls}`}>{type}</span>
        ))}
      </div>

      {/* Month view placeholder */}
      <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5">
        <div className="flex items-center justify-between mb-4">
          <button className="text-white/40 hover:text-white px-2">←</button>
          <h2 className="font-semibold text-white text-lg">2026 年 7 月</h2>
          <button className="text-white/40 hover:text-white px-2">→</button>
        </div>
        {/* Simple week grid */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-white/30 mb-2">
          {["日","一","二","三","四","五","六"].map(d => <div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {/* July 2026 starts on Wednesday (offset 3) */}
          {Array.from({length: 3}).map((_, i) => <div key={`e${i}`} />)}
          {Array.from({length: 31}).map((_, i) => {
            const day = i + 1;
            const dateStr = `2026/07/${String(day).padStart(2, "0")}`;
            const hasEvent = ALL_EVENTS.some(e => e.date === dateStr);
            return (
              <div key={day} className={`aspect-square flex flex-col items-center justify-center rounded-lg text-xs transition-all ${hasEvent ? "bg-purple-600/20 text-purple-300 font-semibold border border-purple-500/30" : "text-white/40 hover:bg-white/5"}`}>
                {day}
                {hasEvent && <div className="w-1 h-1 rounded-full bg-purple-400 mt-0.5" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming schedule */}
      <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white">近期排程</h2>
          <button className="text-xs px-3 py-1.5 rounded-lg bg-purple-600/20 text-purple-300 border border-purple-500/20 hover:bg-purple-600/30 transition-all">+ 新增個人活動</button>
        </div>
        <div className="space-y-2">
          {upcoming.map((e, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${e.color}`}>
              <div className="text-xs font-mono w-20 flex-shrink-0 opacity-70">{e.date}</div>
              <div className="text-xs opacity-60 w-24 flex-shrink-0">{e.time}</div>
              <div className="text-sm font-medium flex-1">{e.title}</div>
              <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${typeColors[e.type]}`}>{e.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
