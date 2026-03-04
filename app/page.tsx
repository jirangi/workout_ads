"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  // 휴식 타이머 로직
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isResting && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsResting(false);
      setTimeLeft(60);
    }
    return () => clearInterval(timer);
  }, [isResting, timeLeft]);

  if (isResting) {
    return (
      <div className="flex flex-col items-center justify-center animate-pulse">
        <h2 className="text-3xl font-bold text-gray-400 mb-4">REST</h2>
        <div className="text-9xl font-black text-blue-600 mb-8">{timeLeft}</div>
        <button 
          onClick={() => setIsResting(false)}
          className="px-8 py-4 bg-gray-200 text-gray-600 rounded-full font-bold"
        >
          건너뛰기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 text-center">
      <header className="absolute top-10 w-full px-10 flex justify-between items-center text-gray-400">
        <span className="font-bold text-lg text-blue-500">Minimal Fit</span>
        <span className="text-sm">종목 (1/3)</span>
      </header>

      <div className="space-y-2 mb-10">
        <h1 className="text-5xl font-black tracking-tighter">벤치프레스</h1>
        <p className="text-xl text-gray-400 font-medium">Set 1 / 3</p>
      </div>

      <div className="flex flex-col items-center space-y-4 mb-12">
        <div className="text-6xl font-bold tracking-tight italic">
          45<span className="text-2xl not-italic ml-1">kg</span>
          <span className="mx-3 text-gray-300">×</span>
          12<span className="text-2xl not-italic ml-1">개</span>
        </div>
      </div>

      <button 
        onClick={() => setIsResting(true)}
        className="w-full py-8 bg-blue-600 text-white rounded-3xl text-3xl font-black shadow-lg active:scale-95 transition-transform"
      >
        세트 완료
      </button>
      
      <p className="mt-8 text-gray-300 font-medium uppercase tracking-widest text-xs">[ 벤치프레스 가이드 ]</p>
    </div>
  );
}
