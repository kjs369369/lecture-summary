import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lecture Summary | KAEA & AICLab",
  description: "김진수 강사의 강의 아카이브 — 녹화·자료·링크 한 곳에.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-paper font-body text-ink">{children}</body>
    </html>
  );
}
