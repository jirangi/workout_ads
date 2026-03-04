"use client";
import { useState, useEffect, useRef } from "react";
import { EXERCISE_DATABASE } from "../data/exercises";

export default function Home() {
  const [view, setView] = useState("HOME");
  const [selectedRoutine, setSelectedRoutine] = useState<any>(null);
  const [lastRoutine, setLastRoutine] = useState<any>(null);
  const [userPoints, setUserPoints] = useState(1250);
  const [rewardCountToday, setRewardCountToday] = useState(0); // [F16] 일일 한도
  
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [sets, setSets] = useState<any[]>([]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTempoOn, setIsTempoOn] = useState(false);
  const speechRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      speechRef.current = new SpeechSynthesisUtterance();
      speechRef.current.lang = "ko-KR";
      speechRef.current.rate = 1.3;
      
      // [F14] 최초 진입 체크 (lastRoutine이 없으면 레벨 선택으로)
      if (!lastRoutine) {
        setView("SELECT_LEVEL");
      }
    }
  }, [lastRoutine]);

  // [F13] 휴식 타이머
  useEffect(() => {
    let timer: any;
    if (isResting && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
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

  const handleSkipRest = () => {
    // [F16] 일일 2회 한도 적립 로직
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
      alert("전체 완료!");
      setView("HOME");
    }
  };

  // [F1] Zero-Click 동기화 (isEdited 필드 활용)
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
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter italic">MINIMAL FIT</h1>
          {/* [F17] 포인트 + 샵 통합 버튼 */}
          <button onClick={() => setView("SHOP")} className="bg-white px-4 py-2 rounded-2xl shadow-sm border flex items-center space-x-2 active:scale-95 transition-all">
            <span className="text-lg">💎</span>
            <span className="font-black text-sm text-slate-800">{userPoints.toLocaleString()} <span className="text-slate-400">FP</span></span>
            <span className="text-slate-200 ml-1">|</span>
            <span className="text-slate-800 font-bold ml-1">SHOP</span>
          </button>
        </header>

        <div className="w-full max-w-[400px] mt-10">
          {lastRoutine && (
            <button onClick={() => startRoutine(lastRoutine)} 
              className="w-full aspect-[16/9] bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 text-left text-white shadow-2xl shadow-blue-200 relative overflow-hidden active:scale-[0.98] transition-all mb-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">Recommended</span>
              <h2 className="text-3xl font-black italic mb-2">내 루틴 시작하기</h2>
              <p className="text-blue-100 text-sm opacity-80">{lastRoutine.name}</p>
              <div className="absolute right-[-10%] bottom-[-10%] text-[150px] font-black italic text-white/5 pointer-events-none">FIT</div>
            </button>
          )}

          {/* [F14] 하단 버튼 가로 정렬 (50:50) */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <button onClick={() => setView("SELECT_LEVEL")} className="bg-white p-8 rounded-[2.2rem] border-2 border-slate-100 shadow-sm flex flex-col items-center justify-center active:scale-95 transition-all">
              <span className="text-2xl mb-2">🔥</span>
              <span className="font-black text-slate-800 text-sm">루틴 변경</span>
            </button>
            <button onClick={() => setView("SHOP")} className="bg-white p-8 rounded-[2.2rem] border-2 border-slate-100 shadow-sm flex flex-col items-center justify-center active:scale-95 transition-all">
              <span className="text-2xl mb-2">🎁</span>
              <span className="font-black text-slate-800 text-sm">리워드 샵</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === "SELECT_LEVEL") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-slate-50">
        <h2 className="text-3xl font-black mb-12 italic text-slate-900 uppercase">루틴 생성 / 변경</h2>
        <div className="w-full max-w-[320px] space-y-3">
          {["초급", "중급", "고급", "사용자 지정"].map((lvl) => (
            <button key={lvl} onClick={() => { setSelectedLevel(lvl); setView("SELECT_TYPE"); }} className="w-full p-7 bg-white rounded-[2rem] shadow-sm font-black text-xl active:scale-95 transition-all">
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
        <header className="absolute top-12 left-8"><button onClick={() => setView("SELECT_LEVEL")} className="text-slate-300 font-bold">← BACK</button></header>
        <h2 className="text-3xl font-black mb-12 italic text-slate-900 uppercase">{selectedLevel} 루틴</h2>
        <div className="w-full max-w-[320px] space-y-3">
          {["추천루틴", "무분할", "2분할(상하체)"].map((type) => (
            <button key={type} onClick={() => startRoutine({
              name: `${selectedLevel} ${type}`,
              exercises: [EXERCISE_DATABASE[0], EXERCISE_DATABASE[1]]
            })} className="w-full p-7 bg-white rounded-[2rem] shadow-sm font-black text-xl active:scale-95 transition-all">
              {type}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (isResting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-8">
        <div className="w-full aspect-video bg-white/5 rounded-[2.5rem] mb-12 flex items-center justify-center border border-white/10 text-center">
          <p className="text-white/20 font-black tracking-widest animate-pulse">AD REWARD (MAX 2/DAY)<br/>+30FP 적립 중</p>
        </div>
        <div className="text-[12rem] font-black text-blue-500 mb-20">{timeLeft}</div>
        <button onClick={handleSkipRest} className="w-full max-w-[320px] py-8 border-2 border-white/10 rounded-full text-3xl font-black active:bg-white active:text-black">SKIP</button>
      </div>
    );
  }

  if (view === "WORKOUT") {
    const currentEx = selectedRoutine.exercises[currentExIndex];
    const currentSet = sets[currentSetIndex];
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white relative text-center">
        <header className="absolute top-12 w-full px-10 flex justify-between items-center">
          <button onClick={() => setView("HOME")} className="text-slate-300 font-black text-xs uppercase tracking-widest">Exit</button>
          <button onClick={() => setIsTempoOn(!isTempoOn)} className={`px-4 py-2 rounded-xl font-black text-xs ${isTempoOn ? 'bg-red-500 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>TEMPO</button>
        </header>
        <div className="flex flex-col items-center flex-1 justify-center w-full">
          <span className="text-blue-600 font-black text-3xl uppercase tracking-tighter italic">{currentEx.name}</span>
          <p className="text-slate-300 font-bold text-sm mt-1 mb-12">{currentEx.category} • {currentEx.subCategory}</p>
          <div className="text-xs font-black text-blue-500 bg-blue-50 px-5 py-2 rounded-full mb-12 uppercase">Set {currentSetIndex + 1} / {sets.length}</div>
          <div className="flex items-center space-x-6 mb-24">
            <div className="flex flex-col items-center">
              <input type="number" value={currentSet.weight} onChange={(e) => updateSetValue(currentSetIndex, "weight", Number(e.target.value))} className="w-32 text-8xl font-black text-center border-none p-0 focus:ring-0" />
              <span className="text-slate-300 font-black text-sm uppercase">kg</span>
            </div>
            <div className="text-6xl text-slate-100 font-light pb-10">×</div>
            <div className="flex flex-col items-center">
              <input type="number" value={currentSet.reps} onChange={(e) => updateSetValue(currentSetIndex, "reps", Number(e.target.value))} className="w-32 text-8xl font-black text-center border-none p-0 focus:ring-0" />
              <span className="text-slate-300 font-black text-sm uppercase">reps</span>
            </div>
          </div>
        </div>
        <button onClick={() => setIsResting(true)} className="w-full max-w-[400px] py-10 bg-slate-900 text-white rounded-[2.5rem] text-4xl font-black mb-10 shadow-2xl active:scale-95 transition-all">DONE</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-white">
      <header className="w-full flex justify-between items-center mb-10">
        <button onClick={() => setView("HOME")} className="text-slate-300 font-black">← BACK</button>
        <span className="font-black text-xl uppercase tracking-widest">Store</span>
      </header>
      <div className="w-full bg-blue-600 rounded-[2rem] p-8 text-white mb-10 shadow-xl">
        <h2 className="text-4xl font-black">{userPoints.toLocaleString()} FP</h2>
      </div>
      <div className="w-full space-y-4">
        {[{n:"커피",p:1500},{n:"보충제",p:3500}].map(i=>(
          <div key={i.n} className="flex justify-between p-6 bg-slate-50 rounded-3xl border">
            <span className="font-black">{i.n}</span>
            <button onClick={()=>alert("구매 시뮬레이션")} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black">{i.p} FP</button>
          </div>
        ))}
      </div>
    </div>
  );
}
