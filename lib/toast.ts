export type ToastKind = "success" | "info" | "warning";

/** 觸發一個全域 toast 提示。可在任何 client 端事件中呼叫。 */
export function toast(message: string, kind: ToastKind = "success") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("app-toast", { detail: { message, kind } }));
}
