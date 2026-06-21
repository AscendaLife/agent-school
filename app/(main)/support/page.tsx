import ActionButton from "@/components/ActionButton";

export default function SupportPage() {
  const faqs = [
    { q: "如何報名課程？", a: "前往「學習中心」選擇課程，點擊「立即報名」後填寫資料並完成付款即可。" },
    { q: "直播課程可以錄播回看嗎？", a: "可以！所有直播課程均有錄影，報名後可在「學習中心 → 我的課程」中永久回看。" },
    { q: "Agent 訓練所生成的配置可以用在哪裡？", a: "生成的 System Prompt 可直接貼入 Claude、ChatGPT、Dify 等平台，工作流配置支援 Make.com 和 n8n。" },
    { q: "技能包如何安裝到我的 Agent？", a: "在「資源中心」找到套件點擊安裝，或前往「Agent 訓練所」選擇技能後系統自動整合到 Prompt。" },
    { q: "點數如何累積？", a: "完成課程（+100）、提交作業（+50）、完成任務（+50–1000）、活動參與（+20）均可獲得點數。" },
    { q: "如何申請接案任務？", a: "前往「任務中心」找到感興趣的任務，點擊「申請接案」後等待平台審核（1–2 個工作天）。" },
  ];
  return (
    <div className="max-w-2xl space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">🛎️ <span className="text-gradient">服務中心</span></h1>
        <p className="text-white/40 text-sm mt-1.5">學習過程有任何疑問，我們 1–2 個工作天內回覆</p>
      </div>

      <div className="gradient-ring p-5">
        <h2 className="font-semibold text-white mb-4">✍️ 線上提問</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-white/40 block mb-1.5">問題類型</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-purple-500/50">
              <option value="">請選擇類別</option>
              <option>課程內容</option>
              <option>Agent 訓練所</option>
              <option>帳號 / 登入</option>
              <option>點數 / 兌換</option>
              <option>活動報名</option>
              <option>合作 / 商務</option>
              <option>其他</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-white/40 block mb-1.5">主旨</label>
            <input placeholder="簡述你的問題" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-purple-500/50 placeholder:text-white/20" />
          </div>
          <div>
            <label className="text-xs text-white/40 block mb-1.5">內容描述</label>
            <textarea rows={4} placeholder="詳細描述你遇到的問題..." className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-purple-500/50 placeholder:text-white/20 resize-none" />
          </div>
          <ActionButton className="btn-primary w-full py-2.5 rounded-xl text-white font-semibold text-sm" toastMsg="（示範）已送出，我們會在 1–2 個工作天內回覆你" doneLabel="已送出 ✓">送出提問</ActionButton>
        </div>
        <div className="mt-4 pt-4 border-t border-white/5 text-xs text-white/30 text-center">
          客服時間：週一至週五 10:00–18:00 · support@agentschool.ai
        </div>
      </div>

      <div className="card p-5">
        <h2 className="font-semibold text-white mb-4">❓ 常見問答</h2>
        <div className="space-y-3 stagger">
          {faqs.map((f, i) => (
            <details key={i} className="card card-interactive group overflow-hidden">
              <summary className="px-4 py-3 text-sm text-white/70 cursor-pointer hover:text-white list-none flex items-center justify-between">
                {f.q}
                <span className="text-white/30 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-4 pb-3 text-sm text-white/40 leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
