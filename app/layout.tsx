import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent School — AI 特工訓練學校",
  description: "送你的 Agent 來受訓，帶走一隻身懷絕技的 AI 特工",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className="h-full">
      <body className="h-full bg-[#0f0f1a] text-[#e8e8f0]">
        {children}
      </body>
    </html>
  );
}
