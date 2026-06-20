import { SKILLS } from "@/lib/data";

export default function SkillsPage() {
  const categories = [...new Set(SKILLS.map(s => s.category))];
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">⚡ 技能市場</h1>
        <p className="text-white/40 text-sm mt-1">為你的 Agent 安裝強大技能，每個技能都是即插即用的模組</p>
      </div>
      {categories.map(cat => (
        <div key={cat}>
          <h2 className="font-semibold text-white/60 text-sm uppercase tracking-wider mb-3">{cat}</h2>
          <div className="grid grid-cols-2 gap-3">
            {SKILLS.filter(s => s.category === cat).map(s => (
              <div key={s.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-purple-500/30 transition-all group">
                <div className="text-3xl">{s.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">{s.name}</span>
                    {s.popular && <span className="text-xs text-yellow-400/80 border border-yellow-400/20 px-1.5 rounded-full">熱門</span>}
                  </div>
                  <p className="text-xs text-white/40 mt-0.5">{s.desc}</p>
                </div>
                <button className="text-xs px-3 py-1.5 rounded-lg bg-purple-600/20 text-purple-300 border border-purple-500/20 hover:bg-purple-600/40 transition-all opacity-0 group-hover:opacity-100">安裝</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
