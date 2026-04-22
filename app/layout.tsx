import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://jinsoo-class.vercel.app";
const SITE_TITLE = "Lecture Summary | KAEA & AICLab";
const SITE_DESCRIPTION =
  "김진수 강사의 강의 아카이브 — 녹화·자료·참고 링크를 한 곳에서 확인하세요.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "Lecture Summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lecture Summary - KAEA & AICLab 강의 아카이브",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
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
