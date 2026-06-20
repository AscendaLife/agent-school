export default function CommunityPage() {
  const channels = [
    { emoji: "🙋", name: "自我介紹", count: 24 },
    { emoji: "📚", name: "學習心得", count: 18 },
    { emoji: "❓", name: "提問求助", count: 41 },
    { emoji: "🤖", name: "Agent 展示", count: 12 },
    { emoji: "💼", name: "接案分享", count: 9 },
    { emoji: "📢", name: "公告", count: 3 },
  ];
  const posts = [
    { user: "Alex同學", avatar: "A", time: "2 小時前", channel: "Agent 展示", content: "剛完成孵化期課程，孵出了我的第一隻 Agent「財務小管家」，搭配 Google Sheets 技能，自動每天記帳超方便！", likes: 14, replies: 5 },
    { user: "Mia Lin", avatar: "M", time: "5 小時前", channel: "學習心得", content: "RAG 知識庫那堂直播太精彩了，Jason 老師講得超清楚，錄播回放了兩遍。分享一個筆記：Chunking 大小對 RAG 品質影響很大，1000 tokens 是個不錯的起點。", likes: 27, replies: 11 },
    { user: "Ryan Wu", avatar: "R", time: "昨天", channel: "接案分享", content: "接了第一個 Agent 訓練任務（客服 Agent），對方很滿意！分享一下我的報價方法……", likes: 33, replies: 8 },
    { user: "Sarah K", avatar: "S", time: "2 天前", channel: "提問求助", content: "請問 Make.com 的 Webhook 如果收不到資料，通常是什麼問題？我試了很多次都是空的 😢", likes: 3, replies: 12 },
  ];
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">💬 交流中心</h1>
        <p className="text-white/40 text-sm mt-1">和同學分享心得、提問、揪團，一起把 Agent 玩到極致</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {channels.map(c => (
          <button key={c.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-purple-500/30 text-left transition-all">
            <span className="text-xl">{c.emoji}</span>
            <div>
              <div className="text-sm text-white font-medium">{c.name}</div>
              <div className="text-xs text-white/30">{c.count} 則貼文</div>
            </div>
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {posts.map((p, i) => (
          <div key={i} className="rounded-xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-sm flex-shrink-0">{p.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-white">{p.user}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">{p.channel}</span>
                  <span className="text-xs text-white/30 ml-auto">{p.time}</span>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{p.content}</p>
                <div className="flex gap-4 mt-3">
                  <button className="text-xs text-white/30 hover:text-white/60 transition-all">👍 {p.likes}</button>
                  <button className="text-xs text-white/30 hover:text-white/60 transition-all">💬 {p.replies} 則回覆</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
