export default function MessagesPage() {
  const msgs = [
    { from: "系統", content: "歡迎加入 Agent School！你的學員編號是 SA26010001", time: "2026/6/1", read: true },
    { from: "Jason Wu 老師", content: "下週的直播課請提前安裝 Make.com，課前我會發安裝教學影片", time: "2026/6/18", read: true },
    { from: "任務系統", content: "你申請的「電商客服 Agent」任務已進入審核，預計 1-2 個工作天內回覆", time: "2026/6/20", read: false },
    { from: "Alex同學", content: "你好，請問你的 Agent「小助理 Aria」是用什麼技能組合的？", time: "2026/6/21", read: false },
  ];
  const unread = msgs.filter((m) => !m.read).length;
  return (
    <div className="max-w-3xl space-y-6 animate-fade-up">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">📩 <span className="text-gradient">訊息中心</span></h1>
          <p className="text-white/40 text-sm mt-1.5">課程通知、任務進度與同學互動，都在這裡</p>
        </div>
        {unread > 0 && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 flex-shrink-0">
            {unread} 則未讀
          </span>
        )}
      </div>
      <div className="space-y-2.5 stagger">
        {msgs.map((m, i) => (
          <div key={i} className={`card card-interactive flex items-start gap-3 p-4 ${!m.read ? "gradient-ring" : ""}`}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold flex-shrink-0">{m.from[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-white truncate">{m.from}</span>
                <span className="text-xs text-white/30 flex-shrink-0">{m.time}</span>
              </div>
              <p className={`text-sm mt-1 ${m.read ? "text-white/50" : "text-white/70"}`}>{m.content}</p>
            </div>
            {!m.read && <div className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0 mt-1.5 animate-pulse-ring" />}
          </div>
        ))}
      </div>
    </div>
  );
}
