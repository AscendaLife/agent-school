"use client";
import { useEffect } from "react";
import { getLang, toCN, type Lang } from "@/lib/lang";

const CJK = /[一-鿿]/;
const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "CODE", "PRE"]);

type TNode = Text & { __tw?: string; __cn?: string };

function processNode(node: TNode) {
  const parent = node.parentElement;
  if (parent && SKIP_TAGS.has(parent.tagName)) return;
  const cur = node.nodeValue;
  if (!cur || !CJK.test(cur)) return;
  if (node.__cn === cur) return; // 已是我們轉好的簡體，且未被 React 改動
  const original = cur; // 繁體原文（首次，或 React 重新渲染後的新繁體）
  const converted = toCN(original);
  if (converted !== original) {
    node.__tw = original;
    node.__cn = converted;
    node.nodeValue = converted;
  }
}

function restoreNode(node: TNode) {
  if (node.__tw != null && node.nodeValue === node.__cn) {
    node.nodeValue = node.__tw;
  }
}

function walk(root: Node, fn: (n: TNode) => void) {
  const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: TNode[] = [];
  let n = tw.nextNode();
  while (n) {
    nodes.push(n as TNode);
    n = tw.nextNode();
  }
  nodes.forEach(fn);
}

export default function LangApplier() {
  useEffect(() => {
    let lang: Lang = getLang();

    const applyAll = () => walk(document.body, processNode);
    const restoreAll = () => walk(document.body, restoreNode);

    // 初次：若為簡體，整頁轉換
    if (lang === "cn") applyAll();

    // 監看 DOM 變化（路由切換、彈窗、toast 等動態內容）
    const observer = new MutationObserver((muts) => {
      if (lang !== "cn") return;
      for (const m of muts) {
        if (m.type === "characterData") {
          processNode(m.target as TNode);
        } else {
          m.addedNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) processNode(node as TNode);
            else if (node.nodeType === Node.ELEMENT_NODE) walk(node, processNode);
          });
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    // 語言切換
    const onLang = (e: Event) => {
      lang = (e as CustomEvent).detail as Lang;
      if (lang === "cn") applyAll();
      else restoreAll();
      document.documentElement.lang = lang === "cn" ? "zh-CN" : "zh-TW";
    };
    window.addEventListener("app-lang", onLang);

    document.documentElement.lang = lang === "cn" ? "zh-CN" : "zh-TW";

    return () => {
      observer.disconnect();
      window.removeEventListener("app-lang", onLang);
    };
  }, []);

  return null;
}
