import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Minimal Fit - AI 운동 보조',
  description: 'AI 박자 가이드와 자동 동기화로 조작을 최소화하는 운동 앱',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-100 flex justify-center items-center min-h-screen antialiased">
        {/* [PRD 4조 준수] 
            1. 가로 최대 480px 고정 
            2. 세로 전체 높이(100vh) 사용 
            3. 중앙 정렬 및 그림자 효과로 앱 느낌 구현 
        */}
        <div 
          id="app-frame" 
          className="w-full max-w-[480px] h-[100vh] bg-white shadow-2xl relative overflow-hidden flex flex-col border-x border-gray-200"
        >
          {children}
        </div>
      </body>
    </html>
  );
}
