"use client";
import { useState } from "react";
import { SKILLS } from "@/lib/data";

const STEPS = ["填寫 Agent 資料", "選擇技能包", "確認 & 生成"];

export default function TrainingPage() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [personality, setPersonality] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [copied, setCopied] = useState(false);

  const categories = [...new Set(SKILLS.map(s => s.category))];

  const selectedSkillObjs = selectedSkills.map(id => SKILLS.find(s => s.id === id)!).filter(Boolean);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(mockPrompt);
    } catch {
      // 降級：execCommand（非安全環境 / 無焦點時）
      const ta = document.createElement("textarea");
      ta.value = mockPrompt;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch { /* 仍失敗則放棄 */ }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadConfig = () => {
    const config = {
      agent: { name, purpose, personality: personality || "親切專業" },
      skills: selectedSkillObjs.map(s => ({ id: s.id, name: s.name, category: s.category })),
      systemPrompt: mockPrompt,
      generatedBy: "Agent School 訓練所",
      version: "1.0",
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name || "my-agent"}-config.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleSkill = (id: string) => {
    setSelectedSkills(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const mockPrompt = `你是 ${name || "AI 助理"}，${purpose || "協助用戶完成各種任務"}。

【個性設定】
${personality || "親切、專業、有效率"}

【已安裝技能】
${selectedSkills.map(id => SKILLS.find(s => s.id === id)?.name).join("、") || "（無）"}

【行為準則】
1. 始終以用戶需求為優先
2. 善用已安裝的技能完成任務
3. 回覆簡潔清晰，附上行動建議
4. 遇到無法處理的需求，誠實告知並建議其他方案`;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">🎓 Agent 訓練所</h1>
        <p className="text-white/40 text-sm mt-1">送來你的 Agent，選好技能，帶走一隻身懷絕技的 AI 特工</p>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-3">
        <button onClick={() => setIsNew(true)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isNew ? "bg-purple-600 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
          ✨ 孵化新 Agent
        </button>
        <button onClick={() => setIsNew(false)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!isNew ? "bg-purple-600 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}>
          📦 送訓現有 Agent
        </button>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i <= step ? "bg-purple-600 text-white" : "bg-white/10 text-white/30"}`}>{i + 1}</div>
            <span className={`text-sm ${i === step ? "text-white font-medium" : "text-white/30"}`}>{s}</span>
            {i < STEPS.length - 1 && <div className="w-8 h-px bg-white/10 mx-1" />}
          </div>
        ))}
      </div>

      {/* Step 0 */}
      {step === 0 && (
        <div className="rounded-xl bg-white/[0.04] border border-white/10 p-6 space-y-5">
          <div>
            <label className="text-sm text-white/60 block mb-1.5">Agent 名字 *</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="例：小助理 Aria、銷售小幫手 Max" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-purple-500/50 placeholder:text-white/20" />
          </div>
          <div>
            <label className="text-sm text-white/60 block mb-1.5">Agent 用途 *</label>
            <textarea value={purpose} onChange={e => setPurpose(e.target.value)} placeholder="例：幫我每天早上摘要新聞並推播到 LINE，同時管理我的行事曆" rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-purple-500/50 placeholder:text-white/20 resize-none" />
          </div>
          <div>
            <label className="text-sm text-white/60 block mb-1.5">個性風格</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {["親切專業", "幽默風趣", "嚴謹精準", "簡潔高效", "溫暖陪伴"].map(p => (
                <button key={p} onClick={() => setPersonality(p)} className={`text-xs px-3 py-1.5 rounded-full border transition-all ${personality === p ? "border-purple-500 bg-purple-500/20 text-purple-300" : "border-white/10 text-white/40 hover:border-white/20"}`}>{p}</button>
              ))}
            </div>
            <input value={personality} onChange={e => setPersonality(e.target.value)} placeholder="或自行描述個性..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-purple-500/50 placeholder:text-white/20" />
          </div>
          {!isNew && (
            <div>
              <label className="text-sm text-white/60 block mb-1.5">現有 Agent 的 System Prompt（選填）</label>
              <textarea placeholder="貼上你現有 Agent 的 Prompt，我們會在此基礎上升級技能" rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-purple-500/50 placeholder:text-white/20 resize-none" />
            </div>
          )}
          <button onClick={() => setStep(1)} disabled={!name || !purpose} className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-medium transition-all">
            下一步：選擇技能 →
          </button>
        </div>
      )}

      {/* Step 1 */}
      {step === 1 && (
        <div className="space-y-5">
          <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold text-white">⚡ 選擇技能包</div>
              <span className="text-xs text-purple-400">已選 {selectedSkills.length} 個</span>
            </div>
            {categories.map(cat => (
              <div key={cat} className="mb-5">
                <div className="text-xs text-white/30 uppercase tracking-wider mb-2">{cat}</div>
                <div className="grid grid-cols-2 gap-2">
                  {SKILLS.filter(s => s.category === cat).map(s => (
                    <button key={s.id} onClick={() => toggleSkill(s.id)} className={`flex items-center gap-3 p-3 rounded-xl text-left border transition-all ${selectedSkills.includes(s.id) ? "border-purple-500/50 bg-purple-500/10" : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05]"}`}>
                      <span className="text-xl flex-shrink-0">{s.emoji}</span>
                      <div>
                        <div className={`text-sm font-medium ${selectedSkills.includes(s.id) ? "text-purple-300" : "text-white/70"}`}>{s.name}</div>
                        <div className="text-xs text-white/30">{s.desc}</div>
                      </div>
                      {s.popular && <span className="ml-auto text-xs text-yellow-400/70 flex-shrink-0">熱門</span>}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(0)} className="flex-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 font-medium transition-all">← 返回</button>
            <button onClick={() => setStep(2)} disabled={selectedSkills.length === 0} className="flex-1 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-30 text-white font-medium transition-all">確認技能 →</button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="rounded-xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-semibold text-white mb-4">📋 訓練摘要確認</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-white/40">Agent 名字</span><span className="text-white font-medium">{name}</span></div>
              <div className="flex justify-between"><span className="text-white/40">個性風格</span><span className="text-white/70">{personality || "未設定"}</span></div>
              <div className="pt-3 border-t border-white/5">
                <span className="text-white/40 block mb-2">已選技能（{selectedSkills.length} 個）</span>
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map(id => {
                    const s = SKILLS.find(sk => sk.id === id)!;
                    return <span key={id} className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">{s.emoji} {s.name}</span>;
                  })}
                </div>
              </div>
              <div className="pt-3 border-t border-white/5">
                <span className="text-white/40 block mb-2">用途描述</span>
                <p className="text-white/60 text-xs leading-relaxed">{purpose}</p>
              </div>
            </div>
          </div>

          {!generated ? (
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 font-medium transition-all">← 返回</button>
              <button onClick={() => setGenerated(true)} className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-medium transition-all">
                🚀 開始訓練 Agent
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl bg-green-900/20 border border-green-500/30 p-4">
                <div className="text-green-400 font-semibold mb-1">✅ 訓練完成！你的 Agent 已準備就緒</div>
                <div className="text-xs text-white/40">以下是生成的 System Prompt，可直接貼入 Claude / ChatGPT / Dify</div>
              </div>
              {/* System Prompt */}
              <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-white/40 font-medium">🤖 生成的 System Prompt</span>
                  <button onClick={copyPrompt} className={`text-xs transition-all ${copied ? "text-green-400" : "text-purple-400 hover:text-purple-300"}`}>
                    {copied ? "✓ 已複製" : "📋 複製"}
                  </button>
                </div>
                <pre className="text-xs text-white/60 whitespace-pre-wrap leading-relaxed font-mono">{mockPrompt}</pre>
              </div>

              {/* Skill Workflow 視覺化 */}
              <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4">
                <div className="text-xs text-white/40 font-medium mb-4">🔗 封裝後的技能工作流</div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  <div className="flex-shrink-0 flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg">📥</div>
                    <span className="text-xs text-white/40">輸入</span>
                  </div>
                  <div className="text-white/20 flex-shrink-0">→</div>
                  <div className="flex-shrink-0 flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-lg">🧠</div>
                    <span className="text-xs text-white/40">{name || "Agent"}</span>
                  </div>
                  <div className="text-white/20 flex-shrink-0">→</div>
                  {selectedSkillObjs.map((s) => (
                    <div key={s.id} className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-purple-500/30 flex items-center justify-center text-lg">{s.emoji}</div>
                        <span className="text-xs text-white/40 max-w-[64px] truncate">{s.name}</span>
                      </div>
                      <div className="text-white/20 flex-shrink-0">→</div>
                    </div>
                  ))}
                  <div className="flex-shrink-0 flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-lg">✅</div>
                    <span className="text-xs text-white/40">產出</span>
                  </div>
                </div>
                <div className="mt-3 text-xs text-white/30 leading-relaxed border-t border-white/5 pt-3">
                  此工作流已可匯出為 Make.com / n8n 藍圖，或封裝為獨立 Skill 上架
                  <a href="/market" className="text-purple-400 hover:text-purple-300 ml-1">技能市場 →</a>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-3 gap-3">
                <button onClick={downloadConfig} className="py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 text-sm transition-all">📥 下載配置 JSON</button>
                <a href="/cert" className="py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 text-sm transition-all text-center">🏅 去考認證</a>
                <a href="/market" className="py-2.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 text-sm transition-all text-center">🛒 上架賺錢</a>
              </div>

              {/* Train another */}
              <button
                onClick={() => { setStep(0); setGenerated(false); setName(""); setPurpose(""); setPersonality(""); setSelectedSkills([]); }}
                className="w-full py-2.5 rounded-lg border border-dashed border-white/15 text-white/40 hover:text-white/70 hover:border-white/30 text-sm transition-all"
              >
                ✨ 再訓練一隻 Agent
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
