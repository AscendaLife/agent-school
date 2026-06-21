# Agent School — 互動契約（每個按鈕都要有功能）

目標：全站**沒有死按鈕**。任何使用者點得到的元素，點下去都要有可見回應。這是 mock 平台，所以「有功能」= 導航 / 改變本地狀態 / 彈出 toast 回饋，三者之一。

## 可用工具（已建好，直接用）
1. **`toast(message, kind?)`** — `import { toast } from "@/lib/toast"`。kind = "success"(預設) | "info" | "warning"。在任何 client 端 onClick 內呼叫即彈出右下角提示。
2. **`<ActionButton>`** — `import ActionButton from "@/components/ActionButton"`。給 **server component 頁面**（沒有 "use client" 的）用，讓死按鈕不必把整頁改成 client。Props：
   - `className`（**原封照抄**原本 button 的 className）
   - `href`（點擊後導向路由）
   - `toastMsg` + `toastKind`（點擊後彈提示）
   - `doneLabel`（點擊後文字變這個並鎖定，如「已報名 ✓」）
   - 用法：`<ActionButton className="原樣式" toastMsg="（示範）報名成功！" doneLabel="已報名 ✓">立即報名</ActionButton>`
3. **`<Link>`**（next/link）或 `router.push` — 單純導航。

## 判斷每個按鈕該做什麼（依序選最合適的）
1. **有明確目的頁** → 導航。例：「上架市場/上架我的 Agent」→ href `/market`；「聯絡業務/聯絡我們」→ `/support`；「查看課程」→ `/learning`；「去訓練」→ `/training`；「查看市場」→ `/market`。
2. **demo 交易/送出動作**（無真後端）→ toast 回饋，必要時加 doneLabel 鎖定：
   - 立即報名 / 加入學員 / 立即加入 → `toastMsg="（示範）報名成功！開課前會以 Email 通知"` `doneLabel="已報名 ✓"`
   - 立即購買 / 立即租用 / 購買 → `toastMsg="（示範）訂閱成功，Agent 已加入你的工作台"` `doneLabel="已擁有 ✓"`
   - 下載證書 / 下載 PDF / 下載配置 → `toastMsg="（示範）檔案已寄送至你的信箱"`（若原本已有真實下載邏輯則保留）
   - 領取證書 → `toastMsg="（示範）證書已核發"`
   - 兌換（redeem）→ 扣點數的本地狀態 OR `toastMsg="（示範）兌換成功！"` `doneLabel="已兌換"`
   - 申請 / 報考 / 送出申請 → `toastMsg="（示範）已送出，稍後通知結果"`
   - 建議教材 / 投稿 / 提交 → `toastMsg="（示範）已收到你的建議，感謝！"`
3. **互動數據**（client 頁可加本地 state）：
   - 點讚 ❤️ / likes → useState 計數 +1（再點 -1 亦可），即時更新數字。
   - 追蹤 / 關注 / 加入頻道 → toggle 文字（追蹤↔已追蹤）。
4. **表單送出**（support 聯絡表單等）→ `onSubmit` 加 `e.preventDefault()` + `toast("（示範）已送出，我們會盡快回覆你")`，並清空欄位。
5. **日曆日期格 / 篩選 chip** → 設為可選狀態（本地 state 高亮）或 toast 當日資訊。

## 鐵則
- **完整保留**已經有功能的按鈕（onClick / type=submit / 被 Link 包住的）—— 不要動它們。
- **className 一字不改**：把死 `<button className="X">` 換成 `<ActionButton className="X" ...>` 或補 onClick，視覺完全不變。
- client 頁（已有 "use client"）優先直接加 onClick + `toast(...)` 或 local state；**不要**為了用 ActionButton 把 client 頁拆掉。
- server 頁（無 "use client"）用 `<ActionButton>`，**不要**把整頁改成 "use client"。
- 不改文案（按鈕顯示字不變，除非用 doneLabel 切換）、不改資料、不改 lib/data.ts、不新增依賴、不執行 build。
- toast 訊息一律繁體中文，demo 動作冠上「（示範）」讓使用者知道是模擬。
- 保持上一版的視覺設計系統 class（.card / .btn-primary 等）不變。

## 驗收
該頁每一個 `<button>` 與看似可點的卡片：要嘛導航、要嘛改狀態、要嘛彈 toast。沒有任何點了沒反應的元素。
