"use client";
import { useRouter } from "next/navigation";
import { toast, type ToastKind } from "@/lib/toast";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** 點擊後導向的路由（優先於 toast） */
  href?: string;
  /** 點擊後顯示的提示訊息（demo 動作回饋） */
  toastMsg?: string;
  toastKind?: ToastKind;
  /** 點擊後切換成此文字並鎖定（如「報名」→「已報名 ✓」） */
  doneLabel?: string;
  title?: string;
  disabled?: boolean;
};

import { useState } from "react";

export default function ActionButton({
  children,
  className,
  href,
  toastMsg,
  toastKind = "success",
  doneLabel,
  title,
  disabled,
}: Props) {
  const router = useRouter();
  const [done, setDone] = useState(false);

  function onClick() {
    if (disabled) return;
    if (toastMsg) toast(toastMsg, toastKind);
    if (doneLabel) setDone(true);
    if (href) router.push(href);
  }

  return (
    <button onClick={onClick} className={className} title={title} disabled={disabled || done}>
      {done && doneLabel ? doneLabel : children}
    </button>
  );
}
