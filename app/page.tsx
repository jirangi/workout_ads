"use client";
import { useState, useEffect, useRef } from "react";
import { EXERCISE_DATABASE } from "../data/exercises";

export default function Home() {
  // 상태 관리
  const [view, setView] = useState("HOME");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedRoutine, setSelectedRoutine] = useState<any>(null);
  const [lastRoutine, setLastRoutine] = useState<any>(null);
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [sets, setSets] = useState<any[]>([]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [userPoints, setUserPoints] = useState(1250); 
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTempoOn, setIsTempoOn] = useState(false);
  const [tempoCount, setTempoCount] = useState(0);
  const speechRef = useRef<any>(null);

  // 초기화 및 이전 루틴 로드 (가상)
  useEffect(() => {
    if (typeof window !== "undefined") {
      speechRef.current = new SpeechSynthesisUtterance();
      speechRef.current.lang = "ko-KR";
      speechRef.current.rate = 1.3;
      setLastRoutine({ name: "초급 무분할", exercises: [EXERCISE_DATABASE[0], EXERCISE_DATABASE[1]] });
    }
  }, []);

  // [F2] 템포 엔진
  useEffect(() => {
    let interval: any;
    if (isTempoOn && !isResting && view === "WORKOUT") {
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
  }, [isTempoOn, isResting, view]);

  // [F13] 휴식 타이머
  useEffect(() => {
    let timer: any;
    if (isResting && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isResting && timeLeft === 0) {
      handleSkipRest();
    }
    return () => clearInterval(timer);
  }, [isResting, timeLeft]);

  const setupExercise = (ex: any) => {
    setSets(Array(3).fill(null).map((_, i) => ({
      id: i + 1, weight: ex.defaultWeight || 40, reps: ex.defaultReps || 12, isEdited: false
    })));
  };

  const startRoutine = (routine: any) => {
    setSelectedRoutine(routine);
    setLastRoutine(routine);
    setCurrentExIndex(0);
    setCurrentSetIndex(0);
    setupExercise(routine.exercises[0]);
    setView("WORKOUT");
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
    setUserPoints(prev => prev + 30); // [F16] 리워드 적립
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
      alert("루틴 완료! 30FP 적립.");
      setView("HOME");
    }
  };

  // --- Views ---

  if (view === "HOME") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white text-center">
        <header className="absolute top-12 w-full px-10 flex justify-between items-center">
          <span className="font-black text-xl tracking-tighter">MINIMAL FIT</span>
          <button onClick={() => setView("MYPAGE")} className="bg-yellow-400 px-4 py-2 rounded-full font-black text-xs shadow-sm">
            {userPoints.toLocaleString()} FP
          </button>
        </header>
        <div className="w-full max-w-[340px] space-y-6">
          {lastRoutine && (
            <button onClick={() => startRoutine(lastRoutine)} className="w-full p-10 bg-blue-600 text-white rounded-[2.5rem] shadow-2xl active:scale-95 transition-all">
              <span className="block text-blue-200 text-xs font-bold mb-2 uppercase">Continue</span>
              <h2 className="text-2xl font-black italic">내 루틴 시작하기</h2>
            </button>
          )}
          <button onClick={() => setView("SELECT_LEVEL")} className="w-full py-6 border-2 border-gray-100 rounded-3xl font-black text-gray-800 hover:border-blue-500 transition-colors">
            루틴 변경 / 선택
          </button>
        </div>
      </div>
    );
  }

  if (view === "SELECT_LEVEL") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
        <header className="absolute top-12 left-10"><button onClick={() => setView("HOME")} className="text-gray-300 font-bold">← BACK</button></header>
        <h1 className="text-3xl font-black mb-12 uppercase italic">Routine Level</h1>
        <div className="w-full max-w-[320px] space-y-3">
          {["초급", "중급", "고급", "사용자 지정"].map((lvl) => (
            <button key={lvl} onClick={() => { if(lvl === "사용자 지정") alert("준비 중!"); else { setSelectedLevel(lvl); setView("SELECT_TYPE"); }}} className="w-full p-6 bg-white border-2 border-gray-100 rounded-[2rem] font-black text-xl active:scale-95">
              {lvl}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (view === "SELECT_TYPE") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 text-center">
        <header className="absolute top-12 left-10"><button onClick={() => setView("SELECT_LEVEL")} className="text-gray-300 font-bold">← BACK</button></header>
        <h1 className="text-3xl font-black mb-12 uppercase italic">{selectedLevel}</h1>
        <div className="w-full max-w-[320px] space-y-3">
          {["추천루틴", "무분할", "2분할(상하체)"].map((type) => (
            <button key={type} onClick={() => startRoutine({ name: `${selectedLevel} ${type}`, exercises: [EXERCISE_DATABASE[0], EXERCISE_DATABASE[1]] })} className="w-full p-6 bg-white border-2 border-gray-100 rounded-[2rem] font-black text-xl active:scale-95 text-left px-8">
              {type}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (view === "MYPAGE") {
    return (
      <div className="flex flex-col items-center min-h-screen p-8 bg-white">
        <header className="w-full flex justify-between items-center mb-12 mt-4">
          <button onClick={() => setView("HOME")} className="text-gray-300 font-black">← BACK</button>
          <span className="font-black text-xl">MY POINTS</span>
        </header>
        <div className="w-full bg-blue-600 rounded-[2.5rem] p-10 text-white mb-10 shadow-2xl">
          <p className="text-blue-200 font-bold text-xs mb-2 uppercase tracking-widest text-left">Available Balance</p>
          <h2 className="text-5xl font-black text-left">{userPoints.toLocaleString()} <span className="text-2xl">FP</span></h2>
        </div>
        <button onClick={() => setView("SHOP")} className="w-full py-6 bg-gray-100 rounded-3xl font-black text-gray-800">포인트 샵 입장</button>
      </div>
    );
  }

  if (isResting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-6">
        <div className="w-full h-40 bg-white/5 rounded-[2rem] mb-12 flex items-center justify-center border border-white/10 overflow-hidden text-center">
          <p className="text-white/20 font-black tracking-widest animate-pulse px-4">60s AD REWARD: 30FP</p>
        </div>
        <span className="text-2xl font-bold text-slate-700 tracking-[0.4em] mb-8 uppercase text-center">Resting</span>
        <div className="text-[12rem] font-black text-blue-500 leading-none mb-20 text-center">{timeLeft}</div>
        <button onClick={handleSkipRest} className="w-full max-w-[320px] py-8 border-2 border-white/10 rounded-full text-3xl font-black active:bg-white active:text-black">SKIP</button>
      </div>
    );
  }

  const currentEx = selectedRoutine.exercises[currentExIndex];
  const currentSet = sets[currentSetIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 relative bg-white text-center overflow-hidden">
      {isTempoOn && (
        <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-[0.03] pointer-events-none">
          <span className="text-[35rem] font-black animate-ping">{tempoCount}</span>
        </div>
      )}
      <header className="absolute top-12 w-full max-w-[480px] px-10 flex justify-between items-center">
        <button onClick={() => setView("HOME")} className="text-gray-300 font-black text-sm uppercase">Exit</button>
        <button onClick={() => setIsTempoOn(!isTempoOn)} className={`px-4 py-2 rounded-xl font-black text-xs ${isTempoOn ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'bg-gray-100 text-gray-400'}`}>TEMPO</button>
      </header>
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        <span className="text-blue-600 font-black text-3xl uppercase tracking-tighter">{currentEx.name}</span>
        <p className="text-gray-300 font-bold text-sm mt-1">{currentEx.category} • {currentEx.subCategory}</p>
        <div className="text-xs font-black text-blue-500 bg-blue-50 px-4 py-1.5 rounded-full my-10 uppercase tracking-tighter">Set {currentSetIndex + 1} / {sets.length}</div>
        <div className="flex items-center justify-center space-x-6 mb-20">
          <div className="flex flex-col items-center">
            <input type="number" value={currentSet.weight} onChange={(e) => updateSetValue(currentSetIndex, "weight", Number(e.target.value))} className="w-36 text-9xl font-black text-center border-none p-0 focus:ring-0 bg-transparent" />
            <span className="text-gray-300 font-black text-sm uppercase">kg</span>
          </div>
          <div className="text-6xl text-gray-100 font-light pb-8">×</div>
          <div className="flex flex-col items-center">
            <input type="number" value={currentSet.reps} onChange={(e) => updateSetValue(currentSetIndex, "reps", Number(e.target.value))} className="w-36 text-9xl font-black text-center border-none p-0 focus:ring-0 bg-transparent" />
            <span className="text-gray-300 font-black text-sm uppercase">reps</span>
          </div>
        </div>
      </div>
      <button onClick={() => setIsResting(true)} className="w-full max-w-[400px] py-10 bg-gray-900 text-white rounded-[2.5rem] text-4xl font-black mb-12 shadow-2xl active:scale-95 transition-all">DONE</button>
    </div>
  );
}
