"use client";
import { useState, useEffect, useRef } from "react";
import { EXERCISE_DATABASE } from "../data/exercises";

export default function Home() {
  // 화면 전환 상태: 'HOME' | 'TYPE' | 'WORKOUT' | 'REST' | 'MYPAGE' | 'SHOP'
  const [view, setView] = useState("HOME");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedRoutine, setSelectedRoutine] = useState<any>(null);
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [sets, setSets] = useState<any[]>([]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  
  // 리워드 시스템 상태
  const [userPoints, setUserPoints] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  
  const [isTempoOn, setIsTempoOn] = useState(false);
  const speechRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      speechRef.current = new SpeechSynthesisUtterance();
      speechRef.current.lang = "ko-KR";
      speechRef.current.rate = 1.3;
    }
  }, []);

  // [F16] 리워드 적립 로직: 휴식 완료 시 30FP 적립 (7:3 배분 반영)
  const addReward = () => {
    const reward = 30; 
    setUserPoints(prev => prev + reward);
  };

  const handleSkipRest = () => {
    addReward(); // 포인트 적립
    setIsResting(false);
    setTimeLeft(60);
    if (currentSetIndex < sets.length - 1) {
      setCurrentSetIndex(prev => prev + 1);
    } else if (currentExIndex < selectedRoutine.exercises.length - 1) {
      const nextIndex = currentExIndex + 1;
      setCurrentExIndex(nextIndex);
      setCurrentSetIndex(0);
      setupExercise(selectedRoutine.exercises[nextIndex]);
    } else {
      alert("전체 루틴 완료! 리워드가 적립되었습니다.");
      setView("HOME");
      setSelectedRoutine(null);
    }
  };

  const setupExercise = (ex: any) => {
    setSets(Array(3).fill(null).map((_, i) => ({
      id: i + 1, weight: ex.defaultWeight, reps: ex.defaultReps, isEdited: false
    })));
  };

  // --- UI Components ---

  // 메인 홈 & 마이페이지 정보
  if (view === "HOME") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 text-center">
        <div className="absolute top-12 right-10 text-right">
          <button onClick={() => setView("MYPAGE")} className="text-gray-900 font-black text-sm bg-yellow-400 px-4 py-2 rounded-full shadow-sm">
            {userPoints.toLocaleString()} FP
          </button>
        </div>
        <h1 className="text-5xl font-black mb-16 tracking-tighter">MINIMAL FIT</h1>
        <div className="w-full max-w-[320px] space-y-4">
          {["초급", "중급", "고급"].map((level) => (
            <button key={level} onClick={() => { setSelectedLevel(level); setView("TYPE"); }} className="w-full p-8 bg-white border-2 rounded-[2rem] font-black text-2xl shadow-xl active:scale-95 transition-all">
              {level}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // [F17] 마이페이지 & 샵 UI
  if (view === "MYPAGE" || view === "SHOP") {
    const shopItems = [
      { id: 1, name: "아메리카노", price: 1500, img: "☕" },
      { id: 2, name: "단백질 쉐이크", price: 3000, img: "🥤" },
      { id: 3, name: "Minimal Fit 티셔츠", price: 15000, img: "👕" },
    ];

    return (
      <div className="flex flex-col items-center min-h-screen p-8 bg-white overflow-y-auto">
        <header className="w-full flex justify-between items-center mb-12 mt-4">
          <button onClick={() => setView("HOME")} className="text-gray-300 font-black">← BACK</button>
          <span className="font-black text-xl">MY POINTS</span>
        </header>

        <div className="w-full bg-blue-600 rounded-[2.5rem] p-10 text-white mb-10 shadow-2xl">
          <p className="text-blue-200 font-bold text-sm mb-2 uppercase tracking-widest">Available Balance</p>
          <h2 className="text-5xl font-black">{userPoints.toLocaleString()} <span className="text-2xl">FP</span></h2>
        </div>

        <div className="w-full text-left">
          <h3 className="font-black text-2xl mb-6 px-2">POINT SHOP</h3>
          <div className="grid grid-cols-2 gap-4 pb-20">
            {shopItems.map(item => (
              <div key={item.id} className="bg-gray-50 p-6 rounded-[2rem] border-2 border-gray-100 flex flex-col items-center text-center">
                <span className="text-4xl mb-4">{item.img}</span>
                <span className="font-bold text-gray-800 text-sm mb-1">{item.name}</span>
                <span className="font-black text-blue-600">{item.price} FP</span>
                <button 
                  onClick={() => alert(userPoints >= item.price ? "구매가 완료되었습니다!" : "포인트가 부족합니다.")}
                  className="mt-4 px-4 py-2 bg-gray-900 text-white text-[10px] font-black rounded-full"
                >
                  BUY NOW
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // [F13] 휴식 및 광고 화면
  if (isResting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-6">
        <div className="w-full h-40 bg-white/5 rounded-[2rem] mb-12 flex items-center justify-center border border-white/10 overflow-hidden">
          <p className="text-white/20 font-black tracking-widest animate-pulse">60s AD REWARD: 30FP</p>
        </div>
        <span className="text-2xl font-bold text-slate-700 tracking-[0.4em] mb-8 uppercase">Resting</span>
        <div className="text-[12rem] font-black text-blue-500 leading-none mb-20">{timeLeft}</div>
        <button onClick={handleSkipRest} className="w-full max-w-[320px] py-8 border-2 border-white/10 rounded-full text-3xl font-black active:bg-white active:text-black">SKIP</button>
      </div>
    );
  }

  // 루틴 유형 선택 & 운동 화면 로직은 v1.42와 동일하되 view 상태에 따라 조건부 렌더링...
  // (생략된 부분은 v1.42의 Step 1, Step 2-2 로직과 동일)
  return <div>{/* 운동 진행 화면 UI */}</div>;
}
