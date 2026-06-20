import { SKILLS } from "@/lib/data";

export default function SkillsPage() {
  const categories = [...new Set(SKILLS.map(s => s.category))];
  return (
    <div className="max-w-4xl space-y-8 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          ⚡ 技能<span className="text-gradient">市場</span>
        </h1>
        <p className="text-white/40 text-sm mt-1.5">為你的 Agent 安裝強大技能，每個技能都是即插即用的模組</p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4 stagger">
        <div className="card card-interactive p-5 text-center">
          <div className="text-2xl mb-1.5">🧩</div>
          <div className="text-2xl font-bold text-white">{SKILLS.length}</div>
          <div className="text-xs text-white/50 mt-1 font-medium">可安裝技能</div>
        </div>
        <div className="card card-interactive p-5 text-center">
          <div className="text-2xl mb-1.5">🗂️</div>
          <div className="text-2xl font-bold text-purple-400">{categories.length}</div>
          <div className="text-xs text-white/50 mt-1 font-medium">技能分類</div>
        </div>
        <div className="card card-interactive p-5 text-center">
          <div className="text-2xl mb-1.5">🔥</div>
          <div className="text-2xl font-bold text-yellow-400">{SKILLS.filter(s => s.popular).length}</div>
          <div className="text-xs text-white/50 mt-1 font-medium">熱門技能</div>
        </div>
      </div>

      {categories.map(cat => (
        <div key={cat}>
          <div className="flex items-center gap-2.5 mb-3">
            <h2 className="font-semibold text-white/60 text-sm uppercase tracking-wider">{cat}</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.06] text-white/40 border border-white/10">
              {SKILLS.filter(s => s.category === cat).length}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 stagger">
            {SKILLS.filter(s => s.category === cat).map(s => (
              <div key={s.id} className="card card-interactive flex items-center gap-4 p-4 group">
                <div className="text-3xl flex-shrink-0">{s.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">{s.name}</span>
                    {s.popular && <span className="text-xs text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">熱門</span>}
                  </div>
                  <p className="text-xs text-white/40 mt-0.5">{s.desc}</p>
                </div>
                <button className="text-xs px-3 py-1.5 rounded-lg bg-purple-600/20 text-purple-300 border border-purple-500/20 hover:bg-purple-600/40 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0">安裝</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
