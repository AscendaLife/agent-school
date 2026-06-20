# Agent School — 設計系統契約 v2

所有頁面必須遵循此規範，確保全站視覺一致。這是「premium AI 產品」深色美學：有深度、有層次、有發光、有微動效，但克制不花俏。

## 核心原則
1. **層次感**：用 aurora 背景 + 玻璃卡片 + 柔和陰影製造深度，不要平。
2. **節奏**：頁面有清楚的視覺主次。標題區 → 數據/重點 → 主內容 → 次要內容。
3. **留白與密度**：卡片內距 `p-5`/`p-6`，區塊間距 `space-y-6`，網格 `gap-4`/`gap-5`。
4. **克制的發光**：只有主 CTA、active 狀態、hero 用發光，其餘保持安靜。
5. **微動效**：列表用 `.stagger`，卡片用 `.card-interactive`，入場用 `.animate-fade-up`。

## 全域 CSS 類別（已在 globals.css 定義，直接用）
- `.card` — 標準卡片表面（漸層 + 邊框 + 模糊 + 內陰影）。**取代** 舊的 `bg-white/[0.04] border border-white/10`。
- `.card-interactive` — 加在 `.card` 上，hover 會上浮 + 紫色邊框發光。用於可點/可 hover 的卡。
- `.glass` — 輕量玻璃面（小元件、chip 容器）。
- `.glow-purple` / `.glow-soft` — 發光陰影。
- `.text-gradient` — 紫→粉漸層文字。用於頁面大標題的關鍵詞或品牌字。
- `.gradient-ring` — 漸層描邊容器（hero / 重點卡）。內容需有自己的 padding。
- `.btn-primary` — 主要漸層按鈕（紫→粉 + 發光）。取代舊的 `bg-purple-600`。
- `.animate-fade-up` — 入場上浮淡入。
- `.animate-float` — 緩慢漂浮（裝飾性 emoji / icon）。
- `.animate-pulse-ring` — 脈衝光圈（直播紅點、live 狀態）。
- `.stagger` — 加在列表容器上，子元素依序淡入。

## 顏色語意（一致使用）
- 主色：紫 `purple-500/600` → 粉 `pink-500/600` 漸層。
- 成功 / 收益 / 已完成：`green-400` `emerald-400`。
- 警告 / 熱門 / 倒數：`yellow-400` `amber-400`。
- 資訊 / 連結 / 進行中：`blue-400` `indigo-400`。
- 文字階層：主 `text-white`，次 `text-white/60`，輔助 `text-white/40`，極弱 `text-white/30`。

## 標準組件配方

### 頁面標題區（每頁開頭）
```tsx
<div className="animate-fade-up">
  <h1 className="text-2xl font-bold text-white tracking-tight">
    <span className="text-gradient">關鍵詞</span> 其餘標題
  </h1>
  <p className="text-white/40 text-sm mt-1.5">副標說明</p>
</div>
```
（emoji 可放標題前；若標題本身就是 emoji + 字，讓主要名詞用 `.text-gradient`）

### 數據統計卡（KPI）
```tsx
<div className="card card-interactive p-5 text-center">
  <div className="text-2xl mb-1">{emoji}</div>
  <div className="text-2xl font-bold text-white">{value}</div>
  <div className="text-xs text-white/40 mt-0.5">{label}</div>
</div>
```
容器用 `grid grid-cols-4 gap-4 stagger`。

### 標準內容卡
```tsx
<div className="card p-5">…</div>
```
可點的列表項 / 卡片加 `card-interactive`。

### 主要按鈕 / 次要按鈕
```tsx
<button className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold">主行動</button>
<button className="px-5 py-2.5 rounded-xl text-sm font-medium bg-white/[0.06] hover:bg-white/10 text-white border border-white/10 transition-all">次行動</button>
```

### chip / 標籤
```tsx
<span className="text-xs px-2.5 py-1 rounded-full bg-white/[0.06] text-white/60 border border-white/10">…</span>
```
語意色標籤：把 `bg-white/[0.06] text-white/60` 換成對應語意色的 `/10` 底 + `/20` 邊 + `400` 字。

## 改寫規則（套用到既有頁面時）
1. 所有 `bg-white/[0.04] border border-white/10 rounded-xl` → 改為 `.card`。
2. hover 有變化的卡 → 額外加 `card-interactive`，移除手寫的 `hover:border-...`。
3. 主 CTA `bg-purple-600 hover:bg-purple-500` → `.btn-primary`。
4. 頁面最外層容器加 `animate-fade-up`；主要列表/網格容器加 `stagger`。
5. 頁面大標題的核心名詞包進 `<span className="text-gradient">`。
6. hero / 最重要的一張卡 → 用 `.gradient-ring` 描邊。
7. 圓角統一偏大：卡 `rounded-2xl`/`rounded-xl`，按鈕 `rounded-xl`，chip `rounded-full`。
8. **不要改任何文案、數據、連結、互動邏輯、import 的資料** — 只動視覺結構與 className。
9. 保持 `"use client"`（若原本有）與所有 state / 事件處理不變。

## 禁止
- 不要引入新依賴（無 framer-motion 等）。
- 不要改 `lib/data.ts`。
- 不要改路由、檔名、資料流。
- 不要過度動畫（無旋轉、無浮誇彈跳）；動效要 subtle、premium。
- 不要把所有東西都加發光 —— 只有重點才發光。
