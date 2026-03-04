"use client";
import { useState, useEffect, useRef } from "react";
import { EXERCISE_DATABASE, ExerciseInfo } from "@/data/exercises";

interface SetData {
  id: number;
  weight: number;
  reps: number;
  isEdited: boolean;
}

interface Routine {
  id: string;
  name: string;
  level: "초급" | "중급" | "고급";
  exercises: ExerciseInfo[];
}

const ROUTINE_PRESETS: Routine[] = [
  {
    id: "beginner-full",
    name: "전신 무분할",
    level: "초급",
    exercises: [EXERCISE_DATABASE[1], EXERCISE_DATABASE[0], EXERCISE_DATABASE[2]], // 스쿼트, 벤치, 데드
  },
  {
    id: "intermediate-ppl",
    name: "3분할 (Push)",
    level: "중급",
    exercises: [EXERCISE_DATABASE[0], EXERCISE_DATABASE[3]], // 벤치, OHP
  }
];

export default function Home() {
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [sets, setSets] = useState<SetData[]>([]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  
  const [isTempoOn, setIsTempoOn] = useState(false);
  const [tempoCount, setTempoCount] = useState(0);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // 음성 엔진 초기화
  useEffect(() => {
    if (typeof window !== "undefined") {
      const utterance = new SpeechSynthesisUtterance();
      utterance.lang = "ko-KR";
      utterance.rate = 1.3;
      speechRef.current = utterance;
    }
  }, []);

  // [F2] 템포 엔진 로직
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTempoOn && !isResting && selectedRoutine) {
      interval = setInterval(() => {
        setTempoCount((prev) => {
          const nextCount = prev + 1;
          if (speechRef.current) {
            speechRef.current.text = nextCount.toString();
            window.speechSynthesis.speak(speechRef.current);
          }
          return nextCount;
        });
      }, 1000);
    } else {
      setTempoCount(0);
    }
    return () => clearInterval(interval);
  }, [isTempoOn, isResting, selectedRoutine]);

  // [F13] 휴식 타이머 로직
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isResting && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isResting && timeLeft === 0) {
      handleSkipRest();
    }
    return () => clearInterval(timer);
  }, [isResting, timeLeft]);

  const startRoutine = (routine: Routine) => {
    setSelectedRoutine(routine);
    setCurrentExIndex(0);
    setCurrentSetIndex(0);
    setupExercise(routine.exercises[0]);
  };

  const setupExercise = (ex: ExerciseInfo) => {
    const initialSets = Array(3).fill(null).map((_, i) => ({
      id: i + 1,
      weight: ex.defaultWeight,
      reps: ex.defaultReps,
      isEdited: false
    }));
    setSets(initialSets);
  };

  // [F1] Zero-Click 동기화 (v1.17 Override 방지 로직 적용)
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
    setIsResting(false);
    setTimeLeft(60);
    if (currentSetIndex < sets.length - 1) {
      setCurrentSetIndex(prev => prev + 1);
    } else if (currentExIndex < selectedRoutine!.exercises.length - 1) {
      const nextIndex = currentExIndex + 1;
      setCurrentExIndex(nextIndex);
      setCurrentSetIndex(0);
      setupExercise(selectedRoutine!.exercises[nextIndex]);
    } else {
      alert("전체 루틴 완료! 대단합니다.");
      setSelectedRoutine(null);
    }
  };

  // 루틴 선택 화면
  if (!selectedRoutine) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
        <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tighter">MINIMAL FIT</h1>
        <p className="text-gray-400 mb-12 font-bold">SELECT YOUR ROUTINE</p>
        <div className="w-full max-w-[400px] space-y-4">
          {ROUTINE_PRESETS.map((r) => (
            <button key={r.id} onClick={() => startRoutine(r)} className="w-full p-6 bg-white border-2 border-gray-100 rounded-[2rem] text-left shadow-sm active:scale-95 transition-all">
              <span className="text-[10px] font-black text-blue-600 px-2 py-1 bg-blue-50 rounded-md uppercase">{r.level}</span>
              <h3 className="text-xl font-black text-gray-800 mt-2">{r.name}</h3>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // [F13] 휴식 화면 (Full-screen Dark UI)
  if (isResting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-6 transition-all">
        <span className="text-2xl font-bold text-slate-700 tracking-[0.4em] mb-8">RESTING</span>
        <div className="text-[13rem] font-black text-blue-500 leading-none mb-20 drop-shadow-2xl">{timeLeft}</div>
        <button onClick={handleSkipRest} className="w-full max-w-[320px] py-8 border-2 border-white/10 rounded-full text-3xl font-black active:bg-white active:text-black transition-colors">SKIP</button>
      </div>
    );
  }

  const currentExercise = selectedRoutine.exercises[currentExIndex];
  const currentSet = sets[currentSetIndex];

  // 메인 운동 화면 (Centered UI)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 relative bg-white overflow-hidden">
      {isTempoOn && (
        <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-[0.03] pointer-events-none">
          <span className="text-[35rem] font-black animate-ping">{tempoCount}</span>
        </div>
      )}

      <header className="absolute top-12 w-full max-w-[480px] px-10 flex justify-between items-center">
        <button onClick={() => setSelectedRoutine(null)} className="text-gray-300 font-black text-sm tracking-widest">BACK</button>
        <button onClick={() => setIsTempoOn(!isTempoOn)} className={`px-4 py-2 rounded-xl font-black text-xs transition-all ${isTempoOn ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'bg-gray-100 text-gray-400'}`}>TEMPO</button>
      </header>

      <div className="flex flex-col items-center justify-center flex-1 w-full">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-black text-3xl uppercase tracking-tighter">{currentExercise.name}</span>
          <p className="text-gray-300 font-bold text-sm mt-1">{currentExercise.category} • {currentExercise.subCategory}</p>
        </div>

        <div className="text-xs font-black text-blue-500 bg-blue-50 px-4 py-1.5 rounded-full mb-10">SET {currentSetIndex + 1} / {sets.length}</div>
        
        <div className="flex items-center justify-center space-x-4 mb-20">
          <div className="flex flex-col items-center">
            <input type="number" value={currentSet.weight} onChange={(e) => updateSetValue(currentSetIndex, "weight", Number(e.target.value))} className="w-36 text-9xl font-black text-center border-none p-0 focus:ring-0 bg-transparent" />
            <span className="text-gray-200 font-black text-sm">KG</span>
          </div>
          <div className="text-6xl text-gray-100 font-light pb-8">×</div>
          <div className="flex flex-col items-center">
            <input type="number" value={currentSet.reps} onChange={(e) => updateSetValue(currentSetIndex, "reps", Number(e.target.value))} className="w-36 text-9xl font-black text-center border-none p-0 focus:ring-0 bg-transparent" />
            <span className="text-gray-200 font-black text-sm">REPS</span>
          </div>
        </div>
      </div>

      <button onClick={() => setIsResting(true)} className="w-full max-w-[400px] py-10 bg-gray-900 text-white rounded-[2.5rem] text-4xl font-black mb-12 shadow-2xl active:scale-95 transition-all">DONE</button>
    </div>
  );
}
