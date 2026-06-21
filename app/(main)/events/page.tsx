import ActionButton from "@/components/ActionButton";

export default function EventsPage() {
  const upcoming = [
    { title: "Agent School 招生說明會", date: "2026/07/10", time: "19:00–21:00", type: "線上說明會", seats: 80, enrolled: 34, free: true, desc: "了解 Agent School 五階段課程架構、師資與就業方向，現場可直接報名課程享早鳥優惠。" },
    { title: "用 Agent 每月多賺 5 萬", date: "2026/07/25", time: "14:00–16:00", type: "線上講座", seats: 200, enrolled: 112, free: true, desc: "Sarah Ko 分享三個學員真實案例，拆解從接案到規模化的完整路徑。" },
    { title: "Multi-Agent 工作坊（小班制）", date: "2026/08/09", time: "10:00–17:00", type: "實體工作坊", seats: 20, enrolled: 18, free: false, price: 2800, desc: "手把手帶做 CrewAI 多 Agent 系統，含午餐與茶點，台北信義區。" },
  ];
  const past = [
    { title: "Prompt 工程師的一天", date: "2026/06/15", type: "線上講座", attendees: 340 },
    { title: "Agent School 開幕說明會", date: "2026/06/01", type: "線上說明會", attendees: 520 },
  ];
  return (
    <div className="max-w-3xl space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">🎪 <span className="text-gradient">活動報名</span></h1>
        <p className="text-white/40 text-sm mt-1.5">講座、說明會、研討會、工作坊一站式報名</p>
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold text-white">即將舉辦 ({upcoming.length})</h2>
        <div className="space-y-4 stagger">
          {upcoming.map((e, i) => (
            <div key={i} className="card card-interactive p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white">{e.title}</span>
                    {e.free ? <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">免費</span>
                      : <span className="text-xs px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">NT${e.price}</span>}
                  </div>
                  <p className="text-sm text-white/40 mb-3">{e.desc}</p>
                  <div className="flex items-center gap-4 text-xs text-white/30">
                    <span>📅 {e.date}</span>
                    <span>🕐 {e.time}</span>
                    <span>🏷️ {e.type}</span>
                    <span>👥 {e.enrolled}/{e.seats} 人</span>
                  </div>
                  {/* Seats progress */}
                  <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${e.enrolled/e.seats > 0.8 ? "bg-red-500" : "bg-gradient-to-r from-purple-500 to-pink-500"}`} style={{width: `${e.enrolled/e.seats*100}%`}} />
                  </div>
                  {e.enrolled/e.seats > 0.8 && <div className="text-xs text-red-400 mt-1">⚠️ 名額即將額滿</div>}
                </div>
                <ActionButton className="btn-primary flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold" toastMsg="（示範）報名成功！開課前會以 Email 通知" doneLabel="已報名 ✓">立即報名</ActionButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="font-semibold text-white">歷史活動 ({past.length})</h2>
        <div className="space-y-3 stagger">
          {past.map((e, i) => (
            <div key={i} className="card card-interactive flex items-center justify-between p-4">
              <div>
                <div className="text-sm text-white/50">{e.title}</div>
                <div className="text-xs text-white/20 mt-0.5">{e.date} · {e.type} · {e.attendees} 人參加</div>
              </div>
              <ActionButton className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.06] text-white/40 hover:text-white/70 hover:bg-white/10 border border-white/10 transition-all" toastMsg="（示範）回放即將開始播放" toastKind="info">看回放</ActionButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
