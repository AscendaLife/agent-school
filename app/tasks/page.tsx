import { TASKS, SKILLS } from "@/lib/data";

const DIFF_COLOR: Record<string, string> = {
  初級: "text-green-400 bg-green-500/10 border-green-500/20",
  中級: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  高級: "text-red-400 bg-red-500/10 border-red-500/20",
};

export default function TasksPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">💼 任務中心</h1>
        <p className="text-white/40 text-sm mt-1">接案任務、報價、提升技能並賺取收益</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[["可接任務", "4", "💼"], ["審核中", "1", "⏳"], ["進行中", "1", "🔄"], ["累計收益", "NT$8,000", "💰"]].map(([label, val, emoji]) => (
          <div key={label} className="rounded-xl bg-white/[0.04] border border-white/10 p-4 text-center">
            <div className="text-xl mb-1">{emoji}</div>
            <div className="text-xl font-bold text-white">{val}</div>
            <div className="text-xs text-white/40">{label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold text-white">最新發布</h2>
        {TASKS.map(t => {
          const taskSkills = t.skills.map(id => SKILLS.find(s => s.id === id)!).filter(Boolean);
          return (
            <div key={t.id} className="rounded-xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white">{t.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${DIFF_COLOR[t.difficulty]}`}>{t.difficulty}</span>
                  </div>
                  <p className="text-sm text-white/50">{t.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {taskSkills.map(s => (
                      <span key={s.id} className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40">{s.emoji} {s.name}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xl font-bold text-green-400">NT${t.reward.toLocaleString()}</div>
                  <div className="text-xs text-white/30">+{t.points} 積分</div>
                  <div className="text-xs text-white/30 mt-0.5">截止 {t.deadline}</div>
                  <button className="mt-3 px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-all">申請接案</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
