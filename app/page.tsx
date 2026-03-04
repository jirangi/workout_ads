"use client";
import { useState, useEffect, useRef } from "react";
import { EXERCISE_DATABASE } from "../data/exercises";

export default function Home() {
  const [selectionStep, setSelectionStep] = useState(0); // 0: Level, 1: Type, 2: Workout
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedRoutine, setSelectedRoutine] = useState<any>(null);
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [sets, setSets] = useState<any[]>([]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTempoOn, setIsTempoOn] = useState(false);
  const [tempoCount, setTempoCount] = useState(0);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      speechRef.current = new SpeechSynthesisUtterance();
      speechRef.current.lang = "ko-KR";
      speechRef.current.rate = 1.3;
    }
  }, []);

  // [F2] 템포 엔진 & [F13] 휴식 타이머 로직 (기존과 동일)
  useEffect(() => {
    let interval: any;
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

  useEffect(() => {
    let timer: any;
    if (isResting && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isResting && timeLeft === 0) {
      handleSkipRest();
    }
    return () => clearInterval(timer);
  }, [isResting, timeLeft]);

  // [F14] 루틴 시작 로직
  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
    setSelectionStep(1);
  };

  const handleTypeSelect = (type: string) => {
    // 임시 데이터 매핑 (나중에 DB 고도화 시 확장 가능)
    const exIds = type === "무분할" ? ["sq_quad", "bp_mid", "dl_back"] : ["bp_mid", "ld_width"];
    const routineEx = exIds.map(id => EXERCISE_DATABASE.find(e => e.id === id)).filter(Boolean);
    
    setSelectedRoutine({ name: `${selectedLevel} ${type}`, exercises: routineEx });
    setupExercise(routineEx[0]);
    setSelectionStep(2);
  };

  const setupExercise = (ex: any) => {
    setSets(Array(3).fill(null).map((_, i) => ({
      id: i + 1, weight: ex.defaultWeight, reps: ex.defaultReps, isEdited: false
    })));
  };

  // [F1] Zero-Click 동기화
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
    } else if (currentExIndex < selectedRoutine.exercises.length - 1) {
      const nextIndex = currentExIndex + 1;
      setCurrentExIndex(nextIndex);
      setCurrentSetIndex(0);
      setupExercise(selectedRoutine.exercises[nextIndex]);
    } else {
      alert("전체 루틴 완료!");
      setSelectionStep(0);
      setSelectedRoutine(null);
    }
  };

  // Step 0: 숙련도 선택
  if (selectionStep === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 text-center">
        <h1 className="text-4xl font-black mb-12 tracking-tighter">MINIMAL FIT</h1>
        <p className="text-gray-400 font-bold mb-8 uppercase tracking-widest text-xs">Choose Your Level</p>
        <div className="w-full max-w-[320px] space-y-4">
          {["초급", "중급", "고급"].map((level) => (
            <button key={level} onClick={() => handleLevelSelect(level)} className="w-full p-6 bg-white border-2 rounded-3xl font-black text-xl shadow-sm active:scale-95 transition-all">
              {level}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Step 1: 루틴 유형 선택
  if (selectionStep === 1) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 text-center">
        <header className="absolute top-12 left-10">
          <button onClick={() => setSelectionStep(0)} className="text-gray-300 font-bold">← BACK</button>
        </header>
        <h1 className="text-3xl font-black mb-12 tracking-tighter">{selectedLevel}</h1>
        <p className="text-gray-400 font-bold mb-8 uppercase tracking-widest text-xs">Select Routine Type</p>
        <div className="w-full max-w-[320px] space-y-4">
          {["추천루틴", "무분할", "2분할(상하체)"].map((type) => (
            <button key={type} onClick={() => handleTypeSelect(type)} className="w-full p-6 bg-white border-2 rounded-3xl font-black text-xl shadow-sm active:scale-95 transition-all">
              {type}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Step 2-1: 휴식 화면
  if (isResting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-6">
        <span className="text-2xl font-bold text-slate-700 tracking-[0.4em] mb-8 uppercase">Resting</span>
        <div className="text-[12rem] font-black text-blue-500 leading-none mb-20">{timeLeft}</div>
        <button onClick={handleSkipRest} className="w-full max-w-[320px] py-8 border-2 border-white/10 rounded-full text-3xl font-black active:bg-white active:text-black">SKIP</button>
      </div>
    );
  }

  // Step 2-2: 운동 화면
  const currentExercise = selectedRoutine.exercises[currentExIndex];
  const currentSet = sets[currentSetIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 relative bg-white overflow-hidden text-center">
      {isTempoOn && (
        <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-[0.03] pointer-events-none">
          <span className="text-[35rem] font-black animate-ping">{tempoCount}</span>
        </div>
      )}
      <header className="absolute top-12 w-full max-w-[480px] px-10 flex justify-between items-center">
        <button onClick={() => setSelectionStep(1)} className="text-gray-300 font-black text-sm">EXIT</button>
        <button onClick={() => setIsTempoOn(!isTempoOn)} className={`px-4 py-2 rounded-xl font-black text-xs ${isTempoOn ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'bg-gray-100 text-gray-400'}`}>TEMPO</button>
      </header>
      <div className="flex flex-col items-center flex-1 justify-center w-full">
        <span className="text-blue-600 font-black text-3xl uppercase tracking-tighter">{currentExercise.name}</span>
        <p className="text-gray-300 font-bold text-sm mt-1">{currentExercise.category} • {currentExercise.subCategory}</p>
        <div className="text-xs font-black text-blue-500 bg-blue-50 px-4 py-1.5 rounded-full my-10 uppercase tracking-tighter">Set {currentSetIndex + 1} / {sets.length}</div>
        <div className="flex items-center space-x-6 mb-20">
          <div className="flex flex-col items-center">
            <input type="number" value={currentSet.weight} onChange={(e) => updateSetValue(currentSetIndex, "weight", Number(e.target.value))} className="w-36 text-9xl font-black text-center border-none p-0 focus:ring-0" />
            <span className="text-gray-300 font-black text-sm uppercase">kg</span>
          </div>
          <div className="text-6xl text-gray-100 font-light pb-8">×</div>
          <div className="flex flex-col items-center">
            <input type="number" value={currentSet.reps} onChange={(e) => updateSetValue(currentSetIndex, "reps", Number(e.target.value))} className="w-36 text-9xl font-black text-center border-none p-0 focus:ring-0" />
            <span className="text-gray-300 font-black text-sm uppercase">reps</span>
          </div>
        </div>
      </div>
      <button onClick={() => setIsResting(true)} className="w-full max-w-[400px] py-10 bg-gray-900 text-white rounded-[2.5rem] text-4xl font-black mb-12 shadow-2xl active:scale-95 transition-all">DONE</button>
    </div>
  );
}
