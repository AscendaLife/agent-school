"use client";
import { useEffect, useState } from "react";
import { getLang, setLang, type Lang } from "@/lib/lang";

export default function LangToggle() {
  const [lang, setLangState] = useState<Lang>("tw");

  useEffect(() => {
    setLangState(getLang());
    const onLang = (e: Event) => setLangState((e as CustomEvent).detail as Lang);
    window.addEventListener("app-lang", onLang);
    return () => window.removeEventListener("app-lang", onLang);
  }, []);

  function choose(l: Lang) {
    if (l === lang) return;
    setLang(l);
    setLangState(l);
  }

  return (
    <div className="flex items-center rounded-full glass p-0.5 text-xs">
      <button
        onClick={() => choose("tw")}
        className={`px-2.5 py-1 rounded-full font-medium transition-all ${
          lang === "tw" ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : "text-white/45 hover:text-white"
        }`}
      >
        繁
      </button>
      <button
        onClick={() => choose("cn")}
        className={`px-2.5 py-1 rounded-full font-medium transition-all ${
          lang === "cn" ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : "text-white/45 hover:text-white"
        }`}
      >
        简
      </button>
    </div>
  );
}
