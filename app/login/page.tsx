"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, pass }),
      });
      const data = await res.json();
      if (data.ok) {
        router.push(params.get("from") ?? "/");
        router.refresh();
      } else {
        setError(data.error ?? "登入失敗");
      }
    } catch {
      setError("網路錯誤，請稍後再試");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎓</div>
          <div className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Agent School
          </div>
          <div className="text-white/40 text-sm mt-1">AI 特工訓練學校</div>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-8 backdrop-blur">
          <div className="text-white font-semibold text-lg mb-6 text-center">學員登入</div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">帳號</label>
              <input
                type="text"
                value={user}
                onChange={e => setUser(e.target.value)}
                placeholder="請輸入帳號"
                required
                autoComplete="username"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-white/20 text-sm outline-none focus:border-purple-500/60 focus:bg-white/[0.08] transition-all"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">密碼</label>
              <input
                type="password"
                value={pass}
                onChange={e => setPass(e.target.value)}
                placeholder="請輸入密碼"
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-white/20 text-sm outline-none focus:border-purple-500/60 focus:bg-white/[0.08] transition-all"
              />
            </div>

            {error && (
              <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                ⚠ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-40 text-white font-semibold text-sm transition-all mt-2"
            >
              {loading ? "登入中…" : "進入訓練學校"}
            </button>
          </form>
        </div>

        <div className="text-center text-white/20 text-xs mt-6">
          Agent School · 內部學員專用
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
