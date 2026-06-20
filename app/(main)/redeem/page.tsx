import { REDEEM_ITEMS } from "@/lib/data";

export default function RedeemPage() {
  const categories = [...new Set(REDEEM_ITEMS.map(r => r.category))];
  return (
    <div className="max-w-4xl space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">🎁 <span className="text-gradient">兌換中心</span></h1>
        <p className="text-white/40 text-sm mt-1.5">用點數兌換課程折抵、訓練權益與實體好禮</p>
      </div>

      <div className="gradient-ring overflow-hidden">
        <div className="relative flex items-center justify-between gap-4 p-5">
          <div className="absolute -top-12 -right-8 w-40 h-40 rounded-full bg-yellow-500/15 blur-3xl pointer-events-none" />
          <div className="relative flex items-center gap-3">
            <span className="text-3xl animate-float">🪙</span>
            <div>
              <div className="text-xs text-white/40">可用點數</div>
              <div className="text-3xl font-black text-yellow-400 leading-tight">350 <span className="text-base font-semibold text-white/50">點</span></div>
            </div>
          </div>
          <div className="relative hidden sm:block text-xs text-white/35 max-w-[200px] text-right">學習打卡、完成任務、考取認證皆可累積點數</div>
        </div>
      </div>

      {categories.map(cat => (
        <div key={cat}>
          <h2 className="font-semibold text-white/60 text-sm uppercase tracking-wider mb-3">{cat}</h2>
          <div className="grid grid-cols-2 gap-3 stagger">
            {REDEEM_ITEMS.filter(r => r.category === cat).map(r => (
              <div key={r.id} className="card card-interactive flex items-center justify-between p-4">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{r.name}</div>
                  <div className="text-xs text-white/30 mt-0.5">庫存：{r.stock <= 10 ? `剩 ${r.stock}` : "充足"}</div>
                </div>
                <div className="text-right ml-3 flex-shrink-0">
                  <div className="text-sm font-bold text-yellow-400">{r.points} 點</div>
                  <button disabled={r.points > 350} className="btn-primary mt-1.5 px-3 py-1 rounded-lg text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0 disabled:hover:brightness-100">兌換</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
