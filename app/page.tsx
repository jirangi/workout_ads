"use client";
import { useState, useEffect } from "react";

interface SetData {
  id: number;
  weight: number;
  reps: number;
  isEdited: boolean;
}

export default function Home() {
  // 초기 세트 데이터 (3세트 기준)
  const [sets, setSets] = useState<SetData[]>([
    { id: 1, weight: 45, reps: 12, isEdited: false },
    { id: 2, weight: 45, reps: 12, isEdited: false },
    { id: 3, weight: 45, reps: 12, isEdited: false },
  ]);

  const [currentSetIndex, setCurrentSetIndex] = useState(0); // 0-based index
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  // 휴식 타이머 로직
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isResting && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      handleSkipRest();
    }
    return () => clearInterval(timer);
  }, [isResting, timeLeft]);

  // [F1] Zero-Click 동기화 입력 핸들러
  const updateSetValue = (index: number, field: "weight" | "reps", value: number) => {
    const newSets = [...sets];
    newSets[index][field] = value;
    
    // 사용자가 직접 수정했음을 표시
    if (index > 0) {
      newSets[index].isEdited = true;
    }

    // 1세트(index 0) 수정 시, 수정되지 않은 나머지 세트 동기화
    if (index === 0) {
      for (let i = 1; i < newSets.length; i++) {
        if (!newSets[i].isEdited) {
          newSets[i][field] = value;
        }
      }
    }
    setSets(newSets);
  };

  const handleSetComplete = () => {
    setIsResting(true);
    setTimeLeft(60);
  };

  const handleSkipRest = () => {
    setIsResting(false);
    if (currentSetIndex < sets.length - 1) {
      setCurrentSetIndex((prev) => prev + 1);
    } else {
      alert("모든 운동 완료!");
      setCurrentSetIndex(0);
      // 모든 세트 편집 상태 초기화 (새 운동 시작 대비)
      setSets(sets.map(s => ({ ...s, isEdited: false })));
    }
  };

  const currentSet = sets[currentSetIndex];

  if (isResting) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-blue-50">
        <h2 className="text-3xl font-bold text-blue-300 mb-4 tracking-widest">REST</h2>
        <div className="text-9xl font-black text-blue-600 mb-12">{timeLeft}</div>
        <button 
          onClick={handleSkipRest}
          className="px-12 py-5 bg-white text-blue-600 border-2 border-blue-600 rounded-full font-bold text-xl active:scale-95 transition-transform shadow-lg"
        >
          SKIP
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-8 text-center h-full">
      <header className="absolute top-12 w-full px-10 flex justify-between items-center text-gray-400 font-bold">
        <span className="text-blue-500 tracking-tighter text-xl">MINIMAL FIT</span>
        <span className="text-sm bg-gray-100 px-4 py-1 rounded-full text-gray-600">
          {currentSetIndex + 1} / {sets.length} SET
        </span>
      </header>

      <div className="mb-10 mt-10">
        <h1 className="text-6xl font-black tracking-tighter text-gray-900 mb-2">벤치프레스</h1>
        <p className="text-2xl text-blue-400 font-bold italic underline decoration-4 underline-offset-8">
          SET {currentSetIndex + 1}
        </p>
      </div>

      {/* [F3] 빅 스텝퍼 UI 타겟 영역 */}
      <div className="flex items-center justify-center space-x-2 mb-16 w-full">
        <div className="flex flex-col items-center flex-1">
          <input
            type="number"
            value={currentSet.weight}
            onChange={(e) => updateSetValue(currentSetIndex, "weight", Number(e.target.value))}
            className="w-full text-7xl font-black text-center bg-transparent border-none focus:ring-0 p-0 text-gray-800"
          />
          <span className="text-xl font-bold text-gray-300 uppercase">kg</span>
        </div>
        
        <div className="text-5xl font-light text-gray-200 mb-6">×</div>

        <div className="flex flex-col items-center flex-1">
          <input
            type="number"
            value={currentSet.reps}
            onChange={(e) => updateSetValue(currentSetIndex, "reps", Number(e.target.value))}
            className="w-full text-7xl font-black text-center bg-transparent border-none focus:ring-0 p-0 text-gray-800"
          />
          <span className="text-xl font-bold text-gray-300 uppercase">reps</span>
        </div>
      </div>

      <button 
        onClick={handleSetComplete}
        className="w-full py-10 bg-gray-900 text-white rounded-[40px] text-4xl font-black shadow-2xl active:scale-95 transition-all"
      >
        DONE
      </button>

      <div className="mt-10 flex space-x-2">
        {sets.map((s, i) => (
          <div 
            key={s.id} 
            className={`w-3 h-3 rounded-full ${i === currentSetIndex ? 'bg-blue-600 w-8' : 'bg-gray-200'} transition-all`}
          />
        ))}
      </div>
    </div>
  );
}
