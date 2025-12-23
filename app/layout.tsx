import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/**
 * Geist 폰트 설정
 * 모던하고 가독성 좋은 시스템 폰트
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * 메타데이터 설정
 * SEO 및 소셜 미디어 공유 최적화
 */
export const metadata: Metadata = {
  title: {
    default: "로닛 - 혼술/혼밥 큐레이션 플랫폼",
    template: "%s | 로닛",
  },
  description: "에디터 검증과 사용자 투표로 검증된 혼자 가기 좋은 식당과 술집. 혼밥, 혼술 스팟을 찾아보세요.",
  keywords: ["혼술", "혼밥", "맛집", "혼자", "식당", "술집", "1인", "큐레이션", "에디터", "인증"],
  authors: [{ name: "로닛 팀" }],
  creator: "로닛",
  publisher: "로닛",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://loneat.kr",
    siteName: "로닛",
    title: "로닛 - 혼술/혼밥 큐레이션 플랫폼",
    description: "에디터 검증과 사용자 투표로 검증된 혼자 가기 좋은 식당과 술집",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "로닛 - 혼술/혼밥 큐레이션",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "로닛 - 혼술/혼밥 큐레이션 플랫폼",
    description: "혼자 가기 좋은 식당과 술집을 찾아보세요",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

/**
 * 뷰포트 설정
 * 모바일 최적화
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F9FAFB" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
};

/**
 * 루트 레이아웃
 * 모든 페이지에 적용되는 기본 레이아웃입니다.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
