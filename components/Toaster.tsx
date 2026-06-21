"use client";
import { useEffect, useState } from "react";

type Item = { id: number; message: string; kind: string };

const ICON: Record<string, string> = {
  success: "✅",
  info: "💡",
  warning: "⚠️",
};

const RING: Record<string, string> = {
  success: "border-green-500/30",
  info: "border-blue-500/30",
  warning: "border-yellow-500/30",
};

export default function Toaster() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    let n = 0;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { message: string; kind: string };
      const id = ++n;
      setItems((prev) => [...prev, { id, message: detail.message, kind: detail.kind || "success" }]);
      setTimeout(() => setItems((prev) => prev.filter((i) => i.id !== id)), 2600);
    };
    window.addEventListener("app-toast", handler);
    return () => window.removeEventListener("app-toast", handler);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2.5 pointer-events-none">
      {items.map((i) => (
        <div
          key={i.id}
          className={`card ${RING[i.kind]} px-4 py-3 flex items-center gap-2.5 text-sm text-white shadow-xl animate-fade-up pointer-events-auto min-w-[200px] max-w-sm`}
        >
          <span className="text-base flex-shrink-0">{ICON[i.kind]}</span>
          <span className="leading-snug">{i.message}</span>
        </div>
      ))}
    </div>
  );
}
