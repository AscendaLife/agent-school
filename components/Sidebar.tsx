"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const GROUPS: { label: string; items: { href: string; label: string; emoji: string }[] }[] = [
  {
    label: "總覽",
    items: [
      { href: "/", label: "儀表板", emoji: "🏠" },
      { href: "/profile", label: "我的主頁", emoji: "👤" },
    ],
  },
  {
    label: "學習成長",
    items: [
      { href: "/learning", label: "學習中心", emoji: "📖" },
      { href: "/cert", label: "證照中心", emoji: "🏅" },
      { href: "/training", label: "Agent 訓練所", emoji: "🎓" },
    ],
  },
  {
    label: "接案變現",
    items: [
      { href: "/market", label: "Agent 市場", emoji: "🛒" },
      { href: "/tasks", label: "任務中心", emoji: "💼" },
      { href: "/skills", label: "技能市場", emoji: "⚡" },
      { href: "/leaderboard", label: "排行榜", emoji: "🏆" },
    ],
  },
  {
    label: "資源活動",
    items: [
      { href: "/calendar", label: "行事曆", emoji: "📅" },
      { href: "/resources", label: "資源中心", emoji: "🗂️" },
      { href: "/materials", label: "補充教材", emoji: "📄" },
      { href: "/events", label: "活動報名", emoji: "🎪" },
    ],
  },
  {
    label: "社群帳戶",
    items: [
      { href: "/community", label: "交流中心", emoji: "💬" },
      { href: "/showcase", label: "成果展示", emoji: "✨" },
      { href: "/points", label: "我的點數", emoji: "🪙" },
      { href: "/redeem", label: "兌換中心", emoji: "🎁" },
      { href: "/pricing", label: "定價方案", emoji: "💎" },
      { href: "/messages", label: "訊息中心", emoji: "📩" },
      { href: "/support", label: "服務中心", emoji: "🛎️" },
    ],
  },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="w-60 flex-shrink-0 flex flex-col border-r border-white/[0.07] bg-white/[0.015] backdrop-blur-xl">
      {/* Brand */}
      <div className="px-5 pt-6 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg glow-soft animate-float">
            🎓
          </div>
          <div>
            <div className="text-base font-black text-gradient leading-tight">Agent School</div>
            <div className="text-[10px] text-white/35 tracking-wide">AI 特工訓練學校</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-5">
        {GROUPS.map((group) => (
          <div key={group.label}>
            <div className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">
              {group.label}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = path === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-r from-purple-600/30 to-pink-600/10 text-white border border-purple-500/30 glow-soft"
                        : "text-white/55 hover:text-white hover:bg-white/[0.05] border border-transparent"
                    }`}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-gradient-to-b from-purple-400 to-pink-400" />
                    )}
                    <span className={`text-base transition-transform group-hover:scale-110 ${active ? "scale-110" : ""}`}>
                      {item.emoji}
                    </span>
                    <span className={active ? "font-semibold" : ""}>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer card */}
      <div className="p-3">
        <div className="gradient-ring p-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
              訓
            </div>
            <div className="min-w-0">
              <div className="text-xs text-white font-semibold truncate">SA26010001</div>
              <div className="text-[10px] text-white/40">🥚 孵化師 · 初階學員</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
