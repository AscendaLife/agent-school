import { COURSES } from "@/lib/data";
import ActionButton from "@/components/ActionButton";

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
    <div className="max-w-4xl space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">📅 <span className="text-gradient">行事曆</span></h1>
        <p className="text-white/40 text-sm mt-1.5">整合課程直播、平台活動、任務截止與個人排程</p>
      </div>

      {/* Filter badges */}
      <div className="flex gap-2 stagger">
        {Object.entries(typeColors).map(([type, cls]) => (
          <span key={type} className={`text-xs px-3 py-1.5 rounded-full border border-white/10 ${cls}`}>{type}</span>
        ))}
      </div>

      {/* Month view placeholder */}
      <div className="gradient-ring p-5">
        <div className="flex items-center justify-between mb-4">
          <ActionButton className="text-white/40 hover:text-white px-2 transition-colors" toastMsg="（示範）已是最早月份，2026 年 7 月起有排程" toastKind="info">←</ActionButton>
          <h2 className="font-semibold text-white text-lg">2026 年 7 月</h2>
          <ActionButton className="text-white/40 hover:text-white px-2 transition-colors" toastMsg="（示範）2026 年 8 月暫無公開排程" toastKind="info">→</ActionButton>
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
              <div key={day} className={`aspect-square flex flex-col items-center justify-center rounded-lg text-xs transition-all ${hasEvent ? "bg-gradient-to-br from-purple-600/30 to-pink-600/10 text-purple-200 font-semibold border border-purple-500/30 glow-soft" : "text-white/40 hover:bg-white/[0.06]"}`}>
                {day}
                {hasEvent && <div className="w-1 h-1 rounded-full bg-purple-400 mt-0.5" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming schedule */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white">近期排程</h2>
          <ActionButton className="btn-primary px-4 py-2 rounded-xl text-xs font-semibold" toastMsg="（示範）個人活動已加入你的行事曆">+ 新增個人活動</ActionButton>
        </div>
        <div className="space-y-2 stagger">
          {upcoming.map((e, i) => (
            <ActionButton key={i} className={`card-interactive flex items-center gap-3 p-3 rounded-xl border w-full text-left ${e.color}`} toastMsg={`（示範）${e.title} · ${e.date} ${e.time}`} toastKind="info">
              <div className="text-xs font-mono w-20 flex-shrink-0 opacity-70">{e.date}</div>
              <div className="text-xs opacity-60 w-24 flex-shrink-0">{e.time}</div>
              <div className="text-sm font-medium flex-1">{e.title}</div>
              <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${typeColors[e.type]}`}>{e.type}</span>
            </ActionButton>
          ))}
        </div>
      </div>
    </div>
  );
}
