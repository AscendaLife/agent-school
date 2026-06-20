export default function PointsPage() {
  const records = [
    { type: "手動發放", desc: "入學歡迎禮", value: "+200", time: "2026/6/1" },
    { type: "課程完成", desc: "孵化期 Lv.1 結業", value: "+100", time: "2026/6/15" },
    { type: "任務積分", desc: "電商客服 Agent 任務", value: "+50", time: "2026/6/20" },
  ];
  return (
    <div className="max-w-2xl space-y-6">
      <div><h1 className="text-2xl font-bold text-white">🪙 我的點數</h1><p className="text-white/40 text-sm mt-1">點數來自課程、任務；收益為現金獎勵</p></div>
      <div className="grid grid-cols-3 gap-4">
        {[["學習點數", "350", "可兌換好禮"], ["任務積分", "50", "接案累積"], ["累計收益", "NT$8,000", "已入帳"]].map(([label, val, sub]) => (
          <div key={label} className="rounded-xl bg-white/[0.04] border border-white/10 p-5 text-center">
            <div className="text-2xl font-bold text-white">{val}</div>
            <div className="text-sm text-white/60 mt-1">{label}</div>
            <div className="text-xs text-white/30 mt-0.5">{sub}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5">
        <h2 className="font-semibold text-white mb-4">點數紀錄</h2>
        <div className="space-y-3">
          {records.map((r, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div>
                <div className="text-sm text-white">{r.desc}</div>
                <div className="text-xs text-white/30">{r.type} · {r.time}</div>
              </div>
              <span className="text-sm font-semibold text-green-400">{r.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
