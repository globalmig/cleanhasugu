import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "깨끗한 하수구 - 전문 하수구 청소 서비스 | 010-5117-2700",
  description: "막힌 하수구, 변기, 누수, 악취 문제를 빠르고 완벽하게 해결합니다. 24시간 긴급출동, 고압세척, 배관내시경 전문업체.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
