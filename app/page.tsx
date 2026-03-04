'use client';

import React, { useState, useEffect, useRef } from 'react';

// --- [PRD v1.01 데이터 규격 준수] ---
type UnitType = 'weight' | 'count' | 'time';
interface Exercise {
  id: string; name: string; category: string; unitType: UnitType;
  weight: number; count: number; time: number; tempo: number;
  sets: number; lastUpdated: string; 
}

const INITIAL_EXERCISES: Exercise[] = [
  { id: 'ex_1', name: '벤치프레스', category: '가슴', unitType: 'weight', weight: 40, count: 12, time: 0, tempo: 1.0, sets: 3, lastUpdated: '2026-02-10' },
  { id: 'ex_2', name: '복근운동', category: '복근', unitType: 'time', weight: 0, count: 0, time: 40, tempo: 1.0, sets: 3, lastUpdated: '2026-03-04' },
  { id: 'ex_3', name: '스쿼트', category: '하체', unitType: 'count', weight: 0, count: 15, time: 0, tempo: 1.0, sets: 4, lastUpdated: '2026-03-04' }
];

export default function MinimalFit() {
  const [exercises, setExercises] = useState<Exercise[]>(INITIAL_EXERCISES);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [mode, setMode] = useState<'workout' | 'rest' | 'report'>('workout');
  const [isEditing, setIsEditing] = useState(false);
  const [beat, setBeat] = useState<'One' | 'Two' | 'Ready'>('Ready');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // [F4] 2주 단위 자동 증량 로직 중급자용 스마트 증량 로직 (Progression)]
  useEffect(() => {
    const today = new Date();
    const updated = exercises.map(ex => {
      if (ex.unitType === 'weight') {
        const lastDate = new Date(ex.lastUpdated);
        if (Math.floor((today.getTime() - lastDate.getTime()) / (86400000)) >= 14) {
          return { ...ex, weight: ex.weight + 5, lastUpdated: today.toISOString().split('T')[0] };
        }
      }
      return ex;
    });
    setExercises(updated);
  }, []);

  // [F1] Zero-Click 세트 동기화 Zero-Click 세트 동기화 (Set Sync)]
  const updateVal = (field: keyof Exercise, val: number) => {
    const newExs = [...exercises];
    newExs[currentIdx] = { ...newExs[currentIdx], [field]: Math.max(0, val) };
    setExercises(newExs);
  };

  // [F2] AI 박자 가이드 엔진 0.1s 단위 AI 박자 가이드 (Tempo Engine)]
  const startTempo = () => {
    let turn: 'One' | 'Two' = 'One';
    let timeLeft = exercises[currentIdx].time;
    timerRef.current = setInterval(() => {
      setBeat(turn);
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(turn));
      if (turn === 'Two') timeLeft -= (exercises[currentIdx].tempo * 2);
      if (timeLeft <= 0) { clearInterval(timerRef.current!); handleComplete(); }
      turn = turn === 'One' ? 'Two' : 'One';
    }, exercises[currentIdx].tempo * 1000);
  };

  const handleComplete = () => {
    if (currentSet < exercises[currentIdx].sets) { setCurrentSet(s => s + 1); setMode('rest'); }
    else if (currentIdx < exercises.length - 1) { setCurrentIdx(i => i + 1); setCurrentSet(1); setMode('rest'); }
    else setMode('report');
  };

  if (mode === 'rest') return <div className="flex flex-col h-full items-center justify-center">...휴식 중 UI...</div>;

  const ex = exercises[currentIdx];

  return (
    <div className="flex flex-col h-full" onClick={() => isEditing && setIsEditing(false)}>
      <header className="flex justify-between p-4 border-b font-bold">
        <span>종목 ({currentIdx + 1}/{exercises.length})</span>
        <button onClick={() => setMode('report')} className="text-red-500">종료</button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
        <div className="w-full h-48 bg-gray-50 rounded-3xl flex items-center justify-center border-2 border-dashed font-bold">
          {ex.unitType === 'time' ? <span className="text-7xl text-red-500">{beat}</span> : `[ ${ex.name} 가이드 ]`}
        </div>

        {/* [F1/F3 반영] 모드 전환 탭 빅 스텝퍼 UI & 자동 확정 (Interaction)] */}
        <div className="flex space-x-2">
          {['weight', 'count', 'time'].map(m => (
            <button key={m} onClick={(e) => { e.stopPropagation(); updateVal('unitType', m as any); }} 
              className={`px-4 py-1 rounded-full text-xs border ${ex.unitType === m ? 'bg-blue-600 text-white' : 'text-gray-400'}`}>
              {m === 'weight' ? '무게+횟수' : m === 'count' ? '횟수' : '시간'}
            </button>
          ))}
        </div>

        <h1 className="text-4xl font-black">{ex.name}</h1>
        <h2 className="text-blue-600 font-bold">Set {currentSet} / {ex.sets}</h2>

        {/* [F3] 빅 스텝퍼 UI */}
        {!isEditing ? (
          <div onClick={(e) => { e.stopPropagation(); setIsEditing(true); }} className="text-5xl font-black text-blue-600 border-b-4 border-blue-600 p-2">
            {ex.unitType === 'weight' ? `${ex.weight}kg x ${ex.count}개` : ex.unitType === 'count' ? `${ex.count}회` : `${ex.time}초`}
          </div>
        ) : (
          <div className="flex space-x-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col items-center">
              <button onClick={() => updateVal(ex.unitType === 'weight' ? 'weight' : 'count', (ex.unitType === 'weight' ? ex.weight : ex.count) + 1)} className="w-20 h-16 bg-blue-50 text-3xl rounded-2xl mb-2">▲</button>
              <span className="text-2xl font-bold">{ex.unitType === 'weight' ? `${ex.weight}kg` : `${ex.count}회`}</span>
              <button onClick={() => updateVal(ex.unitType === 'weight' ? 'weight' : 'count', (ex.unitType === 'weight' ? ex.weight : ex.count) - 1)} className="w-20 h-16 bg-blue-50 text-3xl rounded-2xl mt-2">▼</button>
            </div>
          </div>
        )}
      </main>

      <footer className="p-6">
        <button onClick={ex.unitType === 'time' ? startTempo : handleComplete} className="w-full h-24 bg-blue-600 text-white text-3xl font-black rounded-3xl">
          {ex.unitType === 'time' ? '카운트 시작' : '세트 완료'}
        </button>
      </footer>
    </div>
  );
}
