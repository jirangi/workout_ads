"use client";
import { useState, useEffect, useRef } from "react";
import { EXERCISE_DATABASE, ExerciseInfo } from "../data/exercises";

export default function Home() {
  const [view, setView] = useState("HOME");
  const [selectedRoutine, setSelectedRoutine] = useState<any>(null);
  const [lastRoutine, setLastRoutine] = useState<any>(null);
  const [userPoints, setUserPoints] = useState(1250);
  const [rewardCountToday, setRewardCountToday] = useState(0); 

  // [F23] 순환형 루틴 관리를 위한 카테고리별 마지막 인덱스
  const [lastIndices, setLastIndices] = useState<Record<string, number>>({
    "가슴": -1, "등": -1, "하체": -1, "어깨": -1, "팔": -1, "복근": -1
  });

  const [workoutStartTime, setWorkoutStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [sets, setSets] = useState<any[]>([]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTempoOn, setIsTempoOn] = useState(false);
  const [tempoCount, setTempoCount] = useState(0);
  const speechRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      speechRef.current = new SpeechSynthesisUtterance();
      speechRef.current.lang = "ko-KR";
      speechRef.current.rate = 1.3;
      if (!lastRoutine) setView("SELECT_LEVEL");
    }
  }, [lastRoutine]);

  // [F20] 글로벌 타이머
  useEffect(() => {
    let timer: any;
    if ((view === "WORKOUT" || view === "REST") && workoutStartTime) {
      timer = setInterval(() => setElapsedTime(Math.floor((Date.now() - workoutStartTime) / 1000)), 1000);
    }
    return () => clearInterval(timer);
  }, [view, workoutStartTime]);

  useEffect(() => {
    let timer: any;
    if (isResting && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (isResting && timeLeft === 0) {
      handleSkipRest();
    }
    return () => clearInterval(timer);
  }, [isResting, timeLeft]);

  // [F23] 순환형 루틴 생성 로직 (PPL 추천 루틴 기반)
  const generateRollingRoutine = (level: string, splitType: string) => {
    let exerciseCount = level === "초급" ? 4 : level === "중급" ? 6 : 9;
    let targetCats: string[] = [];
    if (splitType === "상체") targetCats = ["가슴", "등", "어깨", "팔"];
    else if (splitType === "하체") targetCats = ["하체", "복근"];
    else targetCats = ["가슴", "등", "하체", "어깨"];

    let newExercises: ExerciseInfo[] = [];
    let updatedIndices = { ...lastIndices };

    // 각 카테고리별로 다음 순번 종목 추출
    targetCats.forEach(cat => {
      const catExs = EXERCISE_DATABASE.filter(e => e.category === cat);
      if (catExs.length > 0) {
        const nextIdx = (updatedIndices[cat] + 1) % catExs.length;
        newExercises.push(catExs[nextIdx]);
        updatedIndices[cat] = nextIdx;
      }
    });

    setLastIndices(updatedIndices);
    startRoutine({ name: `${level} ${splitType} (Rolling)`, exercises: newExercises.slice(0, exerciseCount) });
  };

  const startRoutine = (routine: any) => {
    setSelectedRoutine(routine);
    setLastRoutine(routine);
    setCurrentExIndex(0);
    setCurrentSetIndex(0);
    setWorkoutStartTime(Date.now());
    setElapsedTime(0);
    setupExercise(routine.exercises[0]);
    setView("WORKOUT");
  };

  const setupExercise = (ex: any) => {
    setSets(Array(3).fill(null).map((_, i) => ({
      id: i + 1, weight: ex.defaultWeight, reps: ex.defaultReps, isEdited: false
    })));
  };

  const handleSkipRest = () => {
    if (rewardCountToday < 2) {
      setUserPoints(prev => prev + 30);
      setRewardCountToday(prev => prev + 1);
    }
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
      setView("SESSION_FINISH");
    }
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

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // --- Views ---

  if (view === "HOME") {
    return (
      <div className="flex flex-col items-center min-h-screen p-6 bg-slate-50">
        <header className="w-full flex justify-between items-center py-6">
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter italic uppercase">Minimal Fit</h1>
          <button onClick={() => setView("SHOP")} className="bg-white px-4 py-2 rounded-2xl shadow-sm border flex items-center space-x-2 active:scale-95 transition-all">
            <span className="text-lg">💎</span>
            <span className="font-black text-sm">{userPoints.toLocaleString()} FP</span>
          </button>
        </header>
        <div className="w-full max-w-[400px] mt-10 space-y-4">
          <button onClick={() => generateRollingRoutine("초급", "무분할")} 
            className="w-full aspect-[16/9] bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 text-left text-white shadow-2xl relative overflow-hidden active:scale-95 transition-all">
            <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">Daily Rolling</span>
            <h2 className="text-3xl font-black italic">내 루틴 시작하기</h2>
            <p className="text-blue-100 text-sm opacity-80 mt-1">지난 운동 다음 종목부터 시작합니다 →</p>
          </button>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setView("SELECT_LEVEL")} className="bg-white p-8 rounded-[2.2rem] border-2 border-slate-100 shadow-sm flex flex-col items-center justify-center active:scale-95 transition-all">
              <span className="text-2xl mb-2">⚡</span>
              <span className="font-black text-slate-800 text-sm">루틴 변경</span>
            </button>
            <button onClick={() => setView("SHOP")} className="bg-white p-8 rounded-[2.2rem] border-2 border-slate-100 shadow-sm flex flex-col items-center justify-center active:scale-95 transition-all">
              <span className="text-2xl mb-2">🛍️</span>
              <span className="font-black text-slate-800 text-sm">리워드 샵</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === "ROUTINE_CHECK") {
    return (
      <div className="fixed inset-0 bg-white z-50 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black italic uppercase">Today's Routine</h2>
          <button onClick={() => setView("WORKOUT")} className="text-slate-400 font-black">CLOSE ✕</button>
        </header>
        <div className="space-y-4">
          {selectedRoutine?.exercises.map((ex: any, idx: number) => (
            <div key={idx} className={`p-6 rounded-3xl border-2 ${idx === currentExIndex ? 'border-blue-500 bg-blue-50' : 'border-slate-100 bg-slate-50'}`}>
              <p className="text-[10px] font-bold text-slate-400 uppercase">{ex.subTarget} | {ex.equipment}</p>
              <p className="font-black text-slate-800">{ex.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === "SESSION_FINISH") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-blue-600 text-white text-center">
        <h2 className="text-5xl font-black italic mb-4 uppercase">Session Done!</h2>
        <div className="bg-white/10 p-10 rounded-[3rem] mb-12 w-full max-w-[320px]">
          <p className="text-blue-200 font-bold text-sm uppercase mb-2">Duration</p>
          <p className="text-6xl font-black">{formatTime(elapsedTime)}</p>
        </div>
        <button onClick={() => setView("HOME")} className="w-full max-w-[320px] py-8 bg-white text-blue-600 rounded-full text-2xl font-black shadow-2xl active:scale-95 transition-all">
          오늘 운동 끝내기
        </button>
      </div>
    );
  }

  if (isResting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-8 text-center">
        <div className="w-full aspect-video bg-white/5 rounded-[2.5rem] mb-12 flex items-center justify-center border border-white/10 p-6">
          <p className="text-white/20 font-black tracking-widest animate-pulse uppercase leading-tight italic">Reward Ad Loading...<br/>Get 30FP on skip</p>
        </div>
        <div className="text-[12rem] font-black text-blue-500 leading-none mb-20">{timeLeft}</div>
        <button onClick={handleSkipRest} className="w-full max-w-[320px] py-8 border-2 border-white/10 rounded-full text-3xl font-black active:bg-white active:text-black transition-all">SKIP</button>
      </div>
    );
  }

  if (view === "WORKOUT" && selectedRoutine) {
    const currentEx = selectedRoutine.exercises[currentExIndex];
    const currentSet = sets[currentSetIndex];
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white relative text-center">
        <header className="absolute top-12 w-full px-10 flex justify-between items-center">
          <button onClick={() => setView("ROUTINE_CHECK")} className="text-blue-600 font-black text-xs uppercase underline">Check Routine</button>
          <div className="text-slate-400 font-black text-sm uppercase">{formatTime(elapsedTime)}</div>
          <button onClick={() => setView("SESSION_FINISH")} className="text-red-500 font-black text-xs uppercase">End Session</button>
        </header>
        <div className="flex flex-col items-center flex-1 justify-center w-full mt-10">
          <span className="text-blue-600 font-black text-4xl uppercase tracking-tighter italic mb-1">{currentEx.name}</span>
          <p className="text-slate-400 font-bold text-[10px] uppercase mb-10 tracking-[0.2em]">{currentEx.subTarget} | {currentEx.equipment}</p>
          <div className="text-xs font-black text-blue-500 bg-blue-50 px-5 py-2 rounded-full mb-12 uppercase">Set {currentSetIndex + 1} / {sets.length}</div>
          <div className="flex items-center space-x-6 mb-24">
            <div className="flex flex-col items-center">
              <input type="number" value={currentSet.weight} onChange={(e) => updateSetValue(currentSetIndex, "weight", Number(e.target.value))} className="w-32 text-8xl font-black text-center border-none p-0 focus:ring-0 bg-transparent text-slate-900" />
              <span className="text-slate-300 font-black text-sm uppercase italic">kg</span>
            </div>
            <div className="text-6xl text-slate-100 font-light pb-10">×</div>
            <div className="flex flex-col items-center">
              <input type="number" value={currentSet.reps} onChange={(e) => updateSetValue(currentSetIndex, "reps", Number(e.target.value))} className="w-32 text-8xl font-black text-center border-none p-0 focus:ring-0 bg-transparent text-slate-900" />
              <span className="text-slate-300 font-black text-sm uppercase italic">reps</span>
            </div>
          </div>
        </div>
        <button onClick={() => setIsResting(true)} className="w-full max-w-[400px] py-10 bg-slate-900 text-white rounded-[2.5rem] text-4xl font-black mb-10 shadow-2xl active:scale-95 transition-all">DONE</button>
      </div>
    );
  }

  // SELECT_LEVEL 등 온보딩 뷰 (v1.56 디자인 계승)
  if (view === "SELECT_LEVEL") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-slate-50">
        <h2 className="text-3xl font-black mb-12 italic uppercase">숙련도 선택</h2>
        <div className="w-full max-w-[320px] space-y-4">
          {["초급", "중급", "고급", "사용자 지정"].map((lvl) => (
            <button key={lvl} onClick={() => { setSelectedLevel(lvl); setView("SELECT_TYPE"); }} className="w-full p-7 bg-white rounded-[2rem] shadow-sm font-black text-xl active:scale-95 hover:bg-blue-600 hover:text-white transition-all">
              {lvl}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (view === "SELECT_TYPE") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-slate-50">
        <header className="absolute top-12 left-8"><button onClick={() => setView("SELECT_LEVEL")} className="text-slate-300 font-black">← BACK</button></header>
        <h2 className="text-3xl font-black mb-12 italic uppercase">{selectedLevel} Routine</h2>
        <div className="w-full max-w-[320px] space-y-4">
          {["무분할", "상체", "하체"].map((type) => (
            <button key={type} onClick={() => generateRollingRoutine(selectedLevel, type)} className="w-full p-7 bg-white rounded-[2rem] shadow-sm font-black text-xl active:scale-95 transition-all">
              {type}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (view === "SHOP") {
    return (
      <div className="flex flex-col items-center min-h-screen p-8 bg-white">
        <header className="w-full flex justify-between items-center mb-10">
          <button onClick={() => setView("HOME")} className="text-slate-300 font-black">← Back</button>
          <span className="font-black text-xl text-slate-900 uppercase tracking-widest">Shop</span>
        </header>
        <div className="w-full bg-blue-600 rounded-[2.5rem] p-10 text-white mb-10 shadow-xl text-left">
          <p className="text-blue-200 text-xs font-bold mb-2 uppercase tracking-widest font-black">Wallet Balance</p>
          <h2 className="text-5xl font-black">{userPoints.toLocaleString()} FP</h2>
        </div>
        <p className="text-slate-400 font-bold text-center">150종의 운동으로 포인트를 모으세요!</p>
      </div>
    );
  }

  return null;
}
