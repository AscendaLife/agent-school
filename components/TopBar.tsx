"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import FeatureGuide from "@/components/FeatureGuide";
import LangToggle from "@/components/LangToggle";

export default function TopBar() {
  const router = useRouter();
  const [menu, setMenu] = useState(false);

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-white/[0.07] bg-white/[0.015] backdrop-blur-xl flex-shrink-0">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-white/45">歡迎回來，</span>
        <span className="text-white font-semibold">訓練師</span>
        <span className="animate-float inline-block">👋</span>
      </div>

      <div className="flex items-center gap-3">
        <LangToggle />
        <FeatureGuide />
        <Link
          href="/cert"
          className="hidden md:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full glass hover:border-white/20 text-white/55 hover:text-white transition-all"
        >
          🥚 <span>孵化師</span>
        </Link>
        <Link
          href="/points"
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full glass hover:border-yellow-500/30 transition-all"
        >
          🪙 <span className="text-yellow-400 font-bold">350</span>
          <span className="text-white/40">點</span>
        </Link>

        <div className="relative">
          <button
            onClick={() => setMenu((m) => !m)}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold hover:ring-2 hover:ring-purple-400/50 transition-all glow-soft"
          >
            訓
          </button>
          {menu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenu(false)} />
              <div className="absolute right-0 top-12 z-20 w-48 card p-1.5 animate-fade-up">
                <div className="px-3 py-2.5 border-b border-white/[0.07] mb-1">
                  <div className="text-sm text-white font-semibold">訓練師 SA26010001</div>
                  <div className="text-xs text-white/35 mt-0.5">🥚 孵化師 · 初階學員</div>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
                >
                  👤 我的主頁
                </Link>
                <Link
                  href="/cert"
                  onClick={() => setMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
                >
                  🏅 我的證照
                </Link>
                <Link
                  href="/pricing"
                  onClick={() => setMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
                >
                  💎 升級方案
                </Link>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all"
                >
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
