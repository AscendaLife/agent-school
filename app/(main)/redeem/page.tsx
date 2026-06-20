import { REDEEM_ITEMS } from "@/lib/data";

export default function RedeemPage() {
  const categories = [...new Set(REDEEM_ITEMS.map(r => r.category))];
  return (
    <div className="max-w-4xl space-y-6">
      <div><h1 className="text-2xl font-bold text-white">🎁 兌換中心</h1><p className="text-white/40 text-sm mt-1">用點數兌換課程折抵、訓練權益與實體好禮</p></div>
      <div className="text-sm text-white/40 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3">可用點數：<span className="text-yellow-400 font-bold text-lg ml-1">350</span> 點</div>
      {categories.map(cat => (
        <div key={cat}>
          <h2 className="font-semibold text-white/60 text-sm uppercase tracking-wider mb-3">{cat}</h2>
          <div className="grid grid-cols-2 gap-3">
            {REDEEM_ITEMS.filter(r => r.category === cat).map(r => (
              <div key={r.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <div>
                  <div className="text-sm font-semibold text-white">{r.name}</div>
                  <div className="text-xs text-white/30 mt-0.5">庫存：{r.stock <= 10 ? `剩 ${r.stock}` : "充足"}</div>
                </div>
                <div className="text-right ml-3">
                  <div className="text-sm font-bold text-yellow-400">{r.points} 點</div>
                  <button disabled={r.points > 350} className="mt-1.5 px-3 py-1 rounded-lg text-xs bg-purple-600 hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-all">兌換</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
