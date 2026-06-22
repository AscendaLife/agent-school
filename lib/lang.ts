import * as OpenCC from "opencc-js";

export type Lang = "tw" | "cn";
const KEY = "agent-school-lang";

let _toCN: ((s: string) => string) | null = null;
/** 繁體 → 簡體（字集轉換） */
export function toCN(text: string): string {
  if (!_toCN) _toCN = OpenCC.Converter({ from: "tw", to: "cn" });
  return _toCN(text);
}

export function getLang(): Lang {
  if (typeof window === "undefined") return "tw";
  return (localStorage.getItem(KEY) as Lang) || "tw";
}

export function setLang(l: Lang) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, l);
  window.dispatchEvent(new CustomEvent("app-lang", { detail: l }));
}
