"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/data";

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="w-56 flex-shrink-0 flex flex-col border-r border-white/10 bg-white/[0.03] p-4">
      <div className="mb-8">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          🎓 Agent School
        </div>
        <div className="text-xs text-white/40 mt-1">AI 特工訓練學校</div>
      </div>
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = path === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                active
                  ? "bg-purple-600/30 text-purple-300 border border-purple-500/30"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{item.emoji}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/20">
        <div className="text-xs text-purple-300 font-semibold">學員 SA26010001</div>
        <div className="text-xs text-white/40 mt-0.5">訓練學校 · 初階學員</div>
      </div>
    </aside>
  );
}
