import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minimal Fit",
  description: "AI Workout Guide",
  manifest: "/manifest.json", // PWA 설정을 위해 필요
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Minimal Fit",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover", // 아이폰 노치 영역까지 활용
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-black flex justify-center items-center min-h-[100dvh]">
        {/* 모바일 꽉 차는 중앙 프레임 */}
        <main className="w-full max-w-[480px] h-[100dvh] bg-white shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
