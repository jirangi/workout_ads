"use client";
import { useState, useEffect, useRef } from "react";
import { EXERCISE_DATABASE } from "../data/exercises";

export default function Home() {
  const [view, setView] = useState("HOME");
  const [selectedRoutine, setSelectedRoutine] = useState<any>(null);
  const [lastRoutine, setLastRoutine] = useState<any>(null);
  const [userPoints, setUserPoints] = useState(1250);
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
      setLastRoutine({ name: "초급 무분할", exercises: [EXERCISE_DATABASE[0], EXERCISE_DATABASE[1]] });
    }
  }, []);

  // [F13] 휴식 타이머 로직
  useEffect(() => {
    let timer: any;
    if (isResting && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isResting && timeLeft === 0) {
      handleSkipRest();
    }
    return () => clearInterval(timer);
  }, [isResting, timeLeft]);

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

  const setupExercise = (ex: any) => {
    setSets(Array(3).fill(null).map((_, i) => ({
      id: i + 1, weight: ex.defaultWeight || 40, reps: ex.defaultReps || 12, isEdited: false
    })));
  };

  const startRoutine = (routine: any) => {
    setSelectedRoutine(routine);
    setCurrentExIndex(0);
    setCurrentSetIndex(0);
    setupExercise(routine.exercises[0]);
    setView("WORKOUT");
  };

  const handleSkipRest = () => {
    // [F16] 광고 시청 리워드: 루틴 완료가 아닌 휴식(광고)을 넘길 때마다 적립
    const earnedAmount = 30;
    setUserPoints(prev => prev + earnedAmount);
    
    setIsResting(false);
    setTimeLeft(60);
    
    // 다음 세트 혹은 다음 운동으로 이동
    if (currentSetIndex < sets.length - 1) {
      setCurrentSetIndex(prev => prev + 1);
    } else if (currentExIndex < selectedRoutine.exercises.length - 1) {
      const nextIdx = currentExIndex + 1;
      setCurrentExIndex(nextIdx);
      setCurrentSetIndex(0);
      setupExercise(selectedRoutine.exercises[nextIdx]);
    } else {
      alert(`루틴 완료! 총 보상을 확인하세요.`);
      setView("HOME");
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

  // --- Views ---

  if (view === "HOME") {
    return (
      <div className="flex flex-col items-center min-h-screen p-6 bg-slate-50">
        <header className="w-full flex justify-between items-center py-6">
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter italic uppercase">Minimal Fit</h1>
          <button onClick={() => setView("MYPAGE")} className="bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-2 active:scale-95 transition-all">
            <span className="text-lg">💎</span>
            <span className="font-black text-sm text-slate-800">{userPoints.toLocaleString()} FP</span>
          </button>
        </header>

        <div className="w-full max-w-[400px] mt-10 space-y-8">
          {lastRoutine && (
            <button onClick={() => startRoutine(lastRoutine)} 
              className="w-full aspect-[16/9] bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-left text-white shadow-2xl shadow-blue-200 relative overflow-hidden active:scale-[0.98] transition-all">
              <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">Recent Routine</span>
              <h2 className="text-3xl font-black italic mb-2">내 루틴 시작하기</h2>
              <p className="text-blue-100 text-sm opacity-80">{lastRoutine.name}</p>
              <div className="absolute right-[-10%] bottom-[-10%] text-[150px] font-black italic text-white/5 pointer-events-none">FIT</div>
            </button>
          )}

          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setView("SELECT_LEVEL")} className="bg-white p-6 rounded-[2.2rem] border-2 border-slate-100 shadow-sm text-left active:scale-95 transition-all">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-4 text-xl">🔥</div>
              <span className="block font-black text-slate-800 text-sm">루틴 변경</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Level Up</span>
            </button>
            <button onClick={() => setView("SHOP")} className="bg-white p-6 rounded-[2.2rem] border-2 border-slate-100 shadow-sm text-left active:scale-95 transition-all">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-xl">🛒</div>
              <span className="block font-black text-slate-800 text-sm">포인트 샵</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Store</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === "SHOP" || view === "MYPAGE") {
    return (
      <div className="flex flex-col items-center min-h-screen p-8 bg-white font-sans">
        <header className="w-full flex justify-between items-center mb-10">
          <button onClick={() => setView("HOME")} className="text-slate-300 font-black text-sm uppercase tracking-widest">← Back</button>
          <span className="font-black text-xl text-slate-900">MY REWARDS</span>
        </header>
        <div className="w-full bg-slate-900 rounded-[2.5rem] p-10 text-white mb-10 shadow-2xl">
          <p className="text-slate-400 text-xs font-bold mb-2 uppercase tracking-widest">Wallet Balance</p>
          <h2 className="text-5xl font-black">{userPoints.toLocaleString()} <span className="text-2xl text-slate-500">FP</span></h2>
        </div>
        <div className="w-full">
           <h3 className="font-black text-slate-900 mb-6 px-2 text-xl italic uppercase">Point Shop</h3>
           <div className="space-y-4">
              {[{n: "스타벅스", p: 4500, e: "☕"}, {n: "단백질바", p: 2000, e: "🍫"}].map(i => (
                <div key={i.n} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border-2 border-slate-100">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{i.e}</span>
                    <span className="font-black text-slate-800">{i.n}</span>
                  </div>
                  <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-black">{i.p} FP</button>
                </div>
              ))}
           </div>
        </div>
      </div>
    );
  }

  if (isResting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-8">
        <div className="w-full aspect-square max-h-[300px] bg-white/5 rounded-[3rem] mb-12 flex flex-col items-center justify-center border border-white/10 text-center p-10">
          <div className="text-5xl mb-6">📺</div>
          <p className="text-blue-400 font-black text-xl mb-2 tracking-tighter">ADVERTISING</p>
          <p className="text-white/30 text-xs font-bold uppercase tracking-[0.2em] leading-relaxed">
            광고 시청 완료 시<br/>30 FP가 즉시 적립됩니다
          </p>
        </div>
        <div className="text-[12rem] font-black text-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">{timeLeft}</div>
        <div className="text-8xl font-black text-blue-500 mb-20">{timeLeft}s</div>
        <button onClick={handleSkipRest} className="w-full max-w-[320px] py-8 bg-white text-slate-950 rounded-full text-2xl font-black shadow-[0_0_50px_rgba(255,255,255,0.2)] active:scale-95 transition-all">
          SKIP & GET 30FP
        </button>
      </div>
    );
  }

  if (view === "WORKOUT") {
    const currentEx = selectedRoutine.exercises[currentExIndex];
    const currentSet = sets[currentSetIndex];
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white relative text-center">
        {isTempoOn && (
          <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-[0.03] pointer-events-none">
            <span className="text-[35rem] font-black animate-ping">{tempoCount}</span>
          </div>
        )}
        <header className="absolute top-12 w-full px-10 flex justify-between items-center">
          <button onClick={() => setView("HOME")} className="text-slate-300 font-black text-xs uppercase tracking-widest">Exit</button>
          <button onClick={() => setIsTempoOn(!isTempoOn)} className={`px-5 py-2 rounded-2xl font-black text-xs transition-all ${isTempoOn ? 'bg-red-500 text-white shadow-xl shadow-red-200' : 'bg-slate-100 text-slate-400'}`}>TEMPO</button>
        </header>

        <div className="flex flex-col items-center justify-center flex-1 w-full mt-10">
          <h2 className="text-blue-600 font-black text-4xl uppercase tracking-tighter italic mb-2">{currentEx.name}</h2>
          <p className="text-slate-300 font-bold text-sm mb-12 uppercase">{currentEx.category} • {currentEx.subCategory}</p>
          
          <div className="bg-slate-50 px-6 py-2 rounded-full mb-14">
            <span className="text-slate-400 font-black text-xs uppercase tracking-widest">Set</span>
            <span className="ml-3 text-slate-900 font-black text-xl">{currentSetIndex + 1} / {sets.length}</span>
          </div>

          <div className="flex items-center space-x-8 mb-24">
            <div className="flex flex-col items-center">
              <input type="number" value={currentSet.weight} onChange={(e) => updateSetValue(currentSetIndex, "weight", Number(e.target.value))} className="w-36 text-9xl font-black text-center border-none p-0 focus:ring-0 bg-transparent text-slate-900" />
              <span className="text-slate-300 font-black text-sm uppercase tracking-widest mt-2">kg</span>
            </div>
            <div className="text-6xl text-slate-200 font-light pb-10">×</div>
            <div className="flex flex-col items-center">
              <input type="number" value={currentSet.reps} onChange={(e) => updateSetValue(currentSetIndex, "reps", Number(e.target.value))} className="w-36 text-9xl font-black text-center border-none p-0 focus:ring-0 bg-transparent text-slate-900" />
              <span className="text-slate-300 font-black text-sm uppercase tracking-widest mt-2">reps</span>
            </div>
          </div>
        </div>

        <button onClick={() => setIsResting(true)} className="w-full max-w-[400px] py-10 bg-slate-900 text-white rounded-[2.5rem] text-4xl font-black mb-10 shadow-2xl active:scale-95 transition-all">
          DONE
        </button>
      </div>
    );
  }

  return null;
}
