"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function TopBar() {
  const router = useRouter();
  const [menu, setMenu] = useState(false);

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-white/10 bg-white/[0.02] flex-shrink-0">
      <div className="text-sm text-white/50">
        歡迎回來，<span className="text-white font-medium">訓練師 👋</span>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/points" className="text-xs text-white/40 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 transition-all">
          🪙 <span className="text-yellow-400 font-semibold">350</span> 點數
        </Link>
        <div className="relative">
          <button
            onClick={() => setMenu(m => !m)}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold hover:ring-2 hover:ring-purple-400/40 transition-all"
          >
            訓
          </button>
          {menu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenu(false)} />
              <div className="absolute right-0 top-10 z-20 w-44 rounded-xl bg-[#1a1a2e] border border-white/10 shadow-xl p-1.5">
                <div className="px-3 py-2 border-b border-white/5 mb-1">
                  <div className="text-sm text-white font-medium">訓練師 SA26010001</div>
                  <div className="text-xs text-white/30">🥚 孵化師 · 初階學員</div>
                </div>
                <Link href="/profile" onClick={() => setMenu(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all">
                  👤 我的主頁
                </Link>
                <Link href="/cert" onClick={() => setMenu(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all">
                  🏅 我的證照
                </Link>
                <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all">
                  🚪 登出
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
