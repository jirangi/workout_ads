"use client";
import { useState, useEffect, useRef } from "react";
import { EXERCISE_DATABASE } from "../data/exercises";

export default function Home() {
  const [view, setView] = useState("HOME");
  const [selectedRoutine, setSelectedRoutine] = useState<any>(null);
  const [userPoints, setUserPoints] = useState(1250); 
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTempoOn, setIsTempoOn] = useState(false);
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [sets, setSets] = useState<any[]>([]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const speechRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      speechRef.current = new SpeechSynthesisUtterance();
      speechRef.current.lang = "ko-KR";
      speechRef.current.rate = 1.3;
    }
  }, []);

  const startRoutine = (routine: any) => {
    setSelectedRoutine(routine);
    setCurrentExIndex(0);
    setCurrentSetIndex(0);
    setupExercise(routine.exercises[0]);
    setView("WORKOUT");
  };

  const setupExercise = (ex: any) => {
    setSets(Array(3).fill(null).map((_, i) => ({
      id: i + 1, weight: ex.defaultWeight || 40, reps: ex.defaultReps || 12, isEdited: false
    })));
  };

  const updateSetValue = (index: number, field: "weight" | "reps", value: number) => {
    const newSets = [...sets];
    newSets[index][field] = value;
    if (index > 0) newSets[index].isEdited = true;
    if (index === 0) {
      for (let i = 1; i < newSets.length; i++) {
        if (!newSets[i].isEdited) newSets[i][field] = value;
      }
    }
    setSets(newSets);
  };

  const handleSkipRest = () => {
    setUserPoints(prev => prev + 30); // 7:3 수익 배분 리워드
    setIsResting(false);
    setTimeLeft(60);
    if (currentSetIndex < sets.length - 1) {
      setCurrentSetIndex(prev => prev + 1);
    } else if (currentExIndex < selectedRoutine.exercises.length - 1) {
      const nextIdx = currentExIndex + 1;
      setCurrentExIndex(nextIdx);
      setCurrentSetIndex(0);
      setupExercise(selectedRoutine.exercises[nextIdx]);
    } else {
      setView("HOME");
    }
  };

  // --- UI 컴포넌트 ---
  if (view === "HOME") {
    return (
      <div className="flex flex-col items-center justify-between min-h-screen p-8 bg-gray-50">
        <header className="w-full flex justify-between items-center py-4">
          <span className="font-black text-2xl tracking-tighter text-blue-600">MINIMAL FIT</span>
          <button onClick={() => setView("MYPAGE")} className="bg-yellow-400 px-4 py-2 rounded-full font-black text-xs shadow-lg active:scale-95 transition-all">
            {userPoints.toLocaleString()} FP 💰
          </button>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[400px] space-y-6">
          <button onClick={() => startRoutine({ name: "최근 운동 루틴", exercises: [EXERCISE_DATABASE[0], EXERCISE_DATABASE[1]] })} 
            className="w-full p-10 bg-blue-600 text-white rounded-[2.5rem] shadow-2xl text-left relative overflow-hidden active:scale-95 transition-all">
            <span className="text-blue-200 font-bold text-xs uppercase mb-2 block">Quick Start</span>
            <h2 className="text-3xl font-black italic">내 루틴 시작하기</h2>
            <div className="mt-4 text-blue-100 text-sm font-medium opacity-80">벤치프레스 외 2개</div>
            <div className="absolute right-[-20px] bottom-[-20px] text-[120px] opacity-10 font-black italic">FIT</div>
          </button>

          <button onClick={() => setView("SELECT_LEVEL")} className="w-full py-6 bg-white border-2 border-gray-100 rounded-[2rem] font-black text-gray-800 shadow-sm active:scale-95 transition-all">
            루틴 변경 / 선택 →
          </button>
        </div>

        <footer className="w-full text-center text-gray-300 text-[10px] font-bold py-4">
          © 2026 MINIMAL FIT AUTOMATION
        </footer>
      </div>
    );
  }

  // (SELECT_LEVEL, WORKOUT, REST UI 코드 등...)
  // [공통 레이아웃: flex items-center justify-center 적용]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* 운동 및 휴식 UI 로직 v1.44와 동일 유지하되 배치만 정교화 */}
    </div>
  );
}
