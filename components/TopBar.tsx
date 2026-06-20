"use client";
export default function TopBar() {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-white/10 bg-white/[0.02] flex-shrink-0">
      <div className="text-sm text-white/50">
        歡迎回來，<span className="text-white font-medium">訓練師 👋</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-xs text-white/40 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          🪙 <span className="text-yellow-400 font-semibold">350</span> 點數
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
          訓
        </div>
      </div>
    </header>
  );
}
