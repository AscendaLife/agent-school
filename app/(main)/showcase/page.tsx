import ActionButton from "@/components/ActionButton";

export default function ShowcasePage() {
  const works = [
    { name: "小助理 Aria", owner: "Ryan Wu", level: "訓練期 Lv.3", skills: ["🔍 搜尋","📚 知識庫","💬 LINE"], desc: "每天早上自動摘要 10 則科技新聞 + 推播 LINE，已穩定運行 30 天", type: "生活助手", likes: 42 },
    { name: "銷售小幫手 SalesBot", owner: "Sarah K", level: "畢業期 Lv.5", skills: ["👥 CRM","📧 Email","🧠 記憶"], desc: "為保險業務員自動追蹤 50 位客戶，每週產出拜訪提醒與報價書", type: "商業應用", likes: 87 },
    { name: "客服天使 Angel", owner: "Tom Chen", level: "進化期 Lv.4", skills: ["💬 LINE","📚 知識庫","⏰ 排程"], desc: "接管某電商 LINE 官方帳號，日均回覆 200+ 則，滿意度 94%", type: "業務客服", likes: 113 },
    { name: "財務管家 MoneyBot", owner: "Amy Lin", level: "成長期 Lv.2", skills: ["📊 試算表","📧 Email","⏰ 排程"], desc: "每天自動抓取發票、分類記帳、月底產出財務報表 Email 給老闆", type: "辦公流程", likes: 56 },
  ];
  return (
    <div className="max-w-4xl space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">🏆 <span className="text-gradient">成果展示</span></h1>
        <p className="text-white/40 text-sm mt-1.5">學員訓練完成的 Agent 實戰成果展示</p>
      </div>
      <div className="grid grid-cols-2 gap-5 stagger">
        {works.map((w, i) => (
          <div key={i} className="card card-interactive p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl flex-shrink-0">🤖</div>
              <div>
                <div className="font-semibold text-white">{w.name}</div>
                <div className="text-xs text-white/30">by {w.owner} · {w.level}</div>
              </div>
              <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">{w.type}</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-3">{w.desc}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {w.skills.map(s => <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-white/[0.06] text-white/60 border border-white/10">{s}</span>)}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <ActionButton className="text-xs text-white/30 hover:text-white/60 transition-all" toastMsg={`（示範）已為「${w.name}」按讚 ❤️`} doneLabel={`❤️ ${w.likes + 1}`}>❤️ {w.likes}</ActionButton>
              <ActionButton className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.06] text-white/60 hover:bg-white/10 border border-white/10 transition-all" toastMsg={`（示範）「${w.name}」詳情：${w.desc}`} toastKind="info">查看詳情</ActionButton>
            </div>
          </div>
        ))}
      </div>
      <div className="gradient-ring p-6 text-center">
        <div className="text-white/60 mb-3">完成訓練後，歡迎展示你的 Agent！</div>
        <a href="/training" className="btn-primary inline-block text-sm px-6 py-2.5 rounded-xl font-semibold">🎓 去訓練我的 Agent</a>
      </div>
    </div>
  );
}
