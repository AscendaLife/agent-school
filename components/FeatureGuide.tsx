"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { GUIDES } from "@/lib/guides";

export default function FeatureGuide() {
  const path = usePathname();
  const guide = GUIDES[path];
  const [open, setOpen] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // 載入中文語音
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const pick = () => {
      const voices = window.speechSynthesis.getVoices();
      voiceRef.current =
        voices.find((v) => v.lang === "zh-TW") ||
        voices.find((v) => v.lang === "zh-HK") ||
        voices.find((v) => v.lang.startsWith("zh")) ||
        voices[0] ||
        null;
    };
    pick();
    window.speechSynthesis.onvoiceschanged = pick;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // 關閉 / 換頁時停止語音
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    // 換頁自動關閉並停語音
    setOpen(false);
    stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  function play() {
    if (!guide || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(guide.voice);
    if (voiceRef.current) u.voice = voiceRef.current;
    u.lang = voiceRef.current?.lang || "zh-TW";
    u.rate = 1.02;
    u.pitch = 1.0;
    u.onend = () => {
      setSpeaking(false);
      setPaused(false);
    };
    u.onerror = () => {
      setSpeaking(false);
      setPaused(false);
    };
    window.speechSynthesis.speak(u);
    setSpeaking(true);
    setPaused(false);
  }

  function togglePause() {
    if (!window.speechSynthesis) return;
    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    } else {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  }

  function stop() {
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
  }

  if (!guide) return null;

  return (
    <>
      {/* 觸發按鈕（頂欄） */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/20 border border-purple-500/30 text-purple-100 hover:from-purple-600/50 hover:to-pink-600/30 transition-all"
        title="語音功能導覽"
      >
        <span className="text-sm">🔊</span>
        <span className="hidden sm:inline font-medium">功能導覽</span>
      </button>

      {/* 彈窗 */}
      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-up"
          onClick={() => {
            setOpen(false);
            stop();
          }}
        >
          <div
            className="card max-w-2xl w-full max-h-[88vh] overflow-y-auto p-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 插畫 */}
            <div className="relative">
              <div className="p-5 pb-0">
                <div
                  className="rounded-xl overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: guide.svg }}
                />
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  stop();
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white/70 hover:text-white flex items-center justify-center transition-all"
              >
                ✕
              </button>
            </div>

            <div className="p-6 pt-5 space-y-5">
              {/* 標題 + 語音控制 */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <span>{guide.emoji}</span>
                    <span className="text-gradient">{guide.title}</span>
                  </h2>
                  <p className="text-white/50 text-sm mt-1">{guide.tagline}</p>
                </div>
              </div>

              {/* 語音播放列 */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                {!speaking ? (
                  <button
                    onClick={play}
                    className="btn-primary px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
                  >
                    ▶ 播放語音導覽
                  </button>
                ) : (
                  <>
                    <button
                      onClick={togglePause}
                      className="px-4 py-2 rounded-lg text-sm font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all flex items-center gap-1.5"
                    >
                      {paused ? "▶ 繼續" : "⏸ 暫停"}
                    </button>
                    <button
                      onClick={stop}
                      className="px-4 py-2 rounded-lg text-sm font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all"
                    >
                      ⏹ 停止
                    </button>
                  </>
                )}
                <div className="flex items-center gap-1 ml-1">
                  {speaking && !paused ? (
                    <>
                      <span className="w-1 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
                      <span className="w-1 h-4 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
                      <span className="w-1 h-2.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
                      <span className="text-xs text-purple-300 ml-1.5">朗讀中…</span>
                    </>
                  ) : (
                    <span className="text-xs text-white/40 ml-1">🔊 用語音聽完整介紹</span>
                  )}
                </div>
              </div>

              {/* 這是什麼 */}
              <div>
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">💡 這是什麼</h3>
                <p className="text-sm text-white/60 leading-relaxed">{guide.whatIs}</p>
              </div>

              {/* 主要功能 */}
              <div>
                <h3 className="text-sm font-bold text-white mb-2.5 flex items-center gap-1.5">⚡ 主要功能</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {guide.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.04] border border-white/8">
                      <span className="text-lg flex-shrink-0">{f.icon}</span>
                      <span className="text-xs text-white/65 leading-relaxed">{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 怎麼使用 */}
              <div>
                <h3 className="text-sm font-bold text-white mb-2.5 flex items-center gap-1.5">📋 怎麼使用</h3>
                <div className="space-y-2">
                  {guide.steps.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/8">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-base flex-shrink-0">
                        {s.icon}
                      </div>
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs font-bold text-white/30">{i + 1}</span>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-white">{s.title}</div>
                          <div className="text-xs text-white/45">{s.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
