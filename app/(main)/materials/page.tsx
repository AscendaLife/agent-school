export default function MaterialsPage() {
  const links = [
    { title: "Agent Prompt 實戰手冊", desc: "從角色設定到工具呼叫，完整 Prompt 範例庫", url: "#", tag: "免費", emoji: "📖" },
    { title: "Make.com 串接速查表", desc: "常見模組設定、Webhook 格式、錯誤排除", url: "#", tag: "學員專屬", emoji: "⚡" },
    { title: "Dify 知識庫建置教學", desc: "RAG 最佳實踐、Chunking 策略、Reranking 設定", url: "#", tag: "學員專屬", emoji: "📚" },
    { title: "Agent Skill 模板庫", desc: "16 個即插即用 Skill 的完整配置說明", url: "#", tag: "學員專屬", emoji: "🎯" },
    { title: "CrewAI 多 Agent 範例集", desc: "5 個真實業務場景的多 Agent 架構圖與代碼", url: "#", tag: "進階", emoji: "🤖" },
    { title: "Agent 變現案例庫", desc: "10 個學員成功變現 Agent 的完整案例拆解", url: "#", tag: "進階", emoji: "💰" },
  ];
  const tagColor: Record<string, string> = {
    "免費": "bg-green-500/10 text-green-400 border-green-500/20",
    "學員專屬": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "進階": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  };
  return (
    <div className="max-w-3xl space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">📄 <span className="text-gradient">補充教材</span></h1>
        <p className="text-white/40 text-sm mt-1.5">延伸學習資源，深入掌握各項 Agent 應用主題</p>
      </div>
      <div className="grid grid-cols-1 gap-4 stagger">
        {links.map((l, i) => (
          <div key={i} className="card card-interactive flex items-center gap-4 p-5 group">
            <div className="text-3xl flex-shrink-0">{l.emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-white">{l.title}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${tagColor[l.tag]}`}>{l.tag}</span>
              </div>
              <p className="text-sm text-white/40">{l.desc}</p>
            </div>
            <button className="text-xs px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/10 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0">前往 →</button>
          </div>
        ))}
      </div>
      <div className="gradient-ring p-5 text-center">
        <div className="text-white/40 text-sm mb-3">想學的主題還沒看到？</div>
        <button className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold">✍️ 提出教材建議</button>
      </div>
    </div>
  );
}
