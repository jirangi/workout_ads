"use client";
import { useState, useEffect, useRef } from "react";
import { EXERCISE_DATABASE, ExerciseInfo } from "../data/exercises"; // @/ 대신 ../ 사용으로 경로 안정성 확보

interface SetData {
  id: number;
  weight: number;
  reps: number;
  isEdited: boolean;
}

export default function Home() {
  const [selectedRoutine, setSelectedRoutine] = useState<any>(null);
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [sets, setSets] = useState<SetData[]>([]);
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

  const startRoutine = (name: string, exIds: string[]) => {
    const routineEx = exIds.map(id => EXERCISE_DATABASE.find(e => e.id === id)).filter(Boolean);
    setSelectedRoutine({ name, exercises: routineEx });
    setCurrentExIndex(0);
    setCurrentSetIndex(0);
    setupExercise(routineEx[0]);
  };

  const setupExercise = (ex: any) => {
    setSets(Array(3).fill(null).map((_, i) => ({
      id: i + 1, weight: ex.defaultWeight, reps: ex.defaultReps, isEdited: false
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
      alert("전체 완료!");
      setSelectedRoutine(null);
    }
  };

  if (!selectedRoutine) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
        <h1 className="text-5xl font-black mb-16 tracking-tighter">MINIMAL FIT</h1>
        <button onClick={() => startRoutine("초급 무분할", ["sq_quad", "bp_mid", "dl_back"])} className="w-full max-w-[400px] p-8 bg-white border-2 rounded-[2rem] text-left shadow-sm active:scale-95 transition-all">
          <span className="text-[10px] font-black text-blue-600 px-2 py-1 bg-blue-50 rounded-md uppercase">초급</span>
          <h3 className="text-xl font-black text-gray-800 mt-2">전신 무분할 시작</h3>
        </button>
      </div>
    );
  }

  if (isResting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-6">
        <span className="text-2xl font-bold text-slate-700 tracking-[0.4em] mb-8 uppercase">Resting</span>
        <div className="text-[12rem] font-black text-blue-500 mb-20">{timeLeft}</div>
        <button onClick={handleSkipRest} className="w-full max-w-[320px] py-8 border-2 border-white/10 rounded-full text-3xl font-black active:bg-white active:text-black">SKIP</button>
      </div>
    );
  }

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
        <button onClick={() => setSelectedRoutine(null)} className="text-gray-300 font-black text-sm">BACK</button>
        <button onClick={() => setIsTempoOn(!isTempoOn)} className={`px-4 py-2 rounded-xl font-black text-xs ${isTempoOn ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400'}`}>TEMPO</button>
      </header>

      <div className="flex flex-col items-center flex-1 justify-center w-full">
        <span className="text-blue-600 font-black text-3xl uppercase tracking-tighter">{currentExercise.name}</span>
        <p className="text-gray-300 font-bold text-sm mt-1">{currentExercise.category} • {currentExercise.subCategory}</p>
        <div className="text-xs font-black text-blue-500 bg-blue-50 px-4 py-1.5 rounded-full my-10">SET {currentSetIndex + 1} / {sets.length}</div>
        
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
