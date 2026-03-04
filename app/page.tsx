"use client";
import { useState, useEffect, useRef } from "react";

// 루틴 데이터 구조 정의
interface Exercise {
  name: string;
  defaultWeight: number;
  defaultReps: number;
}

interface Routine {
  id: string;
  name: string;
  level: "초급" | "중급" | "고급";
  description: string;
  exercises: Exercise[];
}

const ROUTINE_PRESETS: Routine[] = [
  {
    id: "beginner-full",
    name: "전신 무분할",
    level: "초급",
    description: "핵심 대근육 위주 기초 체력 증진",
    exercises: [
      { name: "스쿼트", defaultWeight: 40, defaultReps: 12 },
      { name: "벤치프레스", defaultWeight: 40, defaultReps: 12 },
      { name: "데드리프트", defaultWeight: 60, defaultReps: 8 },
    ],
  },
  {
    id: "intermediate-3day",
    name: "3분할 (PPL)",
    level: "중급",
    description: "미는 운동 / 당기는 운동 / 하체",
    exercises: [
      { name: "벤치프레스", defaultWeight: 60, defaultReps: 10 },
      { name: "오버헤드 프레스", defaultWeight: 30, defaultReps: 12 },
      { name: "딥스", defaultWeight: 0, defaultReps: 15 },
    ],
  },
  {
    id: "advanced-5day",
    name: "5분할 (Bro Split)",
    level: "고급",
    description: "부위별 극대화된 타격",
    exercises: [
      { name: "인클라인 덤벨 프레스", defaultWeight: 25, defaultReps: 12 },
      { name: "케이블 플라이", defaultWeight: 15, defaultReps: 15 },
    ],
  },
];

export default function Home() {
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [sets, setSets] = useState<any[]>([]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTempoOn, setIsTempoOn] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // 루틴 선택 시 초기 세트 세팅
  const startRoutine = (routine: Routine) => {
    setSelectedRoutine(routine);
    const firstEx = routine.exercises[0];
    const initialSets = Array(3).fill(null).map((_, i) => ({
      id: i + 1,
      weight: firstEx.defaultWeight,
      reps: firstEx.defaultReps,
      isEdited: false
    }));
    setSets(initialSets);
  };

  // ... (음성 카운트 및 동기화 로직은 v1.30과 동일하게 유지)

  // 루틴 선택 화면
  if (!selectedRoutine) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-50">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Minimal Fit</h1>
        <p className="text-gray-500 mb-10 font-medium">오늘의 루틴을 선택하세요</p>
        
        <div className="w-full space-y-4">
          {ROUTINE_PRESETS.map((r) => (
            <button
              key={r.id}
              onClick={() => startRoutine(r)}
              className="w-full p-6 bg-white border-2 border-gray-100 rounded-3xl text-left shadow-sm active:scale-95 transition-all hover:border-blue-500"
            >
              <span className="text-xs font-bold text-blue-600 px-2 py-1 bg-blue-50 rounded-lg">{r.level}</span>
              <h3 className="text-xl font-black text-gray-800 mt-2">{r.name}</h3>
              <p className="text-sm text-gray-400 mt-1">{r.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 운동 진행 화면 (v1.30 UI 구조 활용)
  const currentExercise = selectedRoutine.exercises[currentExerciseIndex];
  const currentSet = sets[currentSetIndex];

  return (
    <div className="flex flex-col items-center justify-between w-full h-full px-8 py-14 bg-white relative overflow-hidden">
      <header className="w-full flex justify-between items-center">
        <button onClick={() => setSelectedRoutine(null)} className="text-gray-300 text-sm font-bold">← BACK</button>
        <div className="flex flex-col items-end">
          <span className="text-blue-600 font-black text-xl tracking-tighter uppercase">{currentExercise.name}</span>
          <span className="text-gray-400 text-xs font-bold">NEXT: {selectedRoutine.exercises[currentExerciseIndex+1]?.name || 'FINISH'}</span>
        </div>
      </header>
      
      {/* (v1.30의 메인 입력 및 버튼 로직 배치...) */}
      <div className="text-center">
         <div className="text-sm font-black text-blue-500 bg-blue-50 px-4 py-1.5 rounded-full mb-4 inline-block">
            SET {currentSetIndex + 1} / {sets.length}
         </div>
         <div className="flex items-center justify-center space-x-4">
            <div className="text-8xl font-black">{currentSet.weight}<span className="text-xl text-gray-300">kg</span></div>
            <div className="text-4xl text-gray-200">×</div>
            <div className="text-8xl font-black">{currentSet.reps}<span className="text-xl text-gray-300">reps</span></div>
         </div>
      </div>

      <button onClick={() => setIsResting(true)} className="w-full py-9 bg-gray-900 text-white rounded-[2.5rem] text-4xl font-black">DONE</button>
    </div>
  );
}
