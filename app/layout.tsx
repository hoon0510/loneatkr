import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "로닛 - 혼밥/혼술 큐레이션",
  description: "혼자 식사하고 술 마시기 좋은 곳을 찾아보세요. 전문 에디터 큐레이션과 사용자 투표로 검증된 맛집 추천.",
  keywords: ["혼밥", "혼술", "맛집", "큐레이션", "1인 식당"],
  authors: [{ name: "로닛" }],
  openGraph: {
    title: "로닛 - 혼밥/혼술 큐레이션",
    description: "혼자 식사하고 술 마시기 좋은 곳을 찾아보세요",
    url: "https://loneat.kr",
    siteName: "로닛",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
