
import React, { useState, useEffect } from 'react';
import { KNOWLEDGE_BASE } from '../types.ts';

interface DayWeedingProps {
  onComplete: () => void;
}

const DayWeeding: React.FC<DayWeedingProps> = ({ onComplete }) => {
  const [weeds, setWeeds] = useState(Array.from({ length: 7 }, (_, i) => ({ 
    id: i, 
    x: 10 + i * 14 + Math.random() * 5,
    rotation: Math.random() * 20 - 10 
  })));
  const [showHint, setShowHint] = useState(true);
  const [lastRemovedPos, setLastRemovedPos] = useState<{x: number, y: number} | null>(null);

  const removeWeed = (id: number, x: number, y: number) => {
    setWeeds(prev => prev.filter(w => w.id !== id));
    setLastRemovedPos({ x, y });
    setShowHint(false);
    // 0.5秒后清除墨迹反馈
    setTimeout(() => setLastRemovedPos(null), 500);
  };

  useEffect(() => {
    if (weeds.length === 0) {
      setTimeout(onComplete, 2000);
    }
  }, [weeds, onComplete]);

  return (
    <div className="relative w-full h-full bg-[#e8f5e9]/30 overflow-hidden cursor-crosshair">
      {/* 顶部任务提示 */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 w-80 text-center animate-bounce">
        <div className="bg-amber-50/90 border-2 border-amber-200 p-3 rounded-lg shadow-lg gu-feng-border">
          <p className="ink-brush text-3xl text-amber-900">“昼出耘田”</p>
          <p className="text-sm text-amber-700 font-serif font-bold mt-1">【点击杂草将其除净】</p>
        </div>
      </div>

      {/* 动态背景：流云 */}
      <div className="absolute top-20 left-[-10%] w-[120%] h-40 opacity-10 pointer-events-none">
        <div className="w-64 h-20 bg-stone-400 blur-3xl rounded-full animate-cloud-move"></div>
      </div>

      {/* 稻田场景 */}
      <div className="absolute bottom-0 w-full h-[65%] border-t-4 border-stone-200 bg-gradient-to-b from-emerald-50 to-emerald-200/40">
        <div className="relative w-full h-full">
          {weeds.map((weed) => (
            <button
              key={weed.id}
              onClick={(e) => removeWeed(weed.id, e.clientX, e.clientY)}
              className="absolute group transition-all hover:scale-125"
              style={{ left: `${weed.x}%`, bottom: `20%`, transform: `rotate(${weed.rotation}deg)` }}
            >
              {/* 增强型杂草视觉：增加底色块方便点击 */}
              <div className="relative p-4">
                <div className="absolute inset-0 bg-stone-800/5 rounded-full blur-md group-hover:bg-stone-800/10 transition-colors"></div>
                
                {/* 杂草本体笔触 - 加粗 */}
                <div className="relative z-10">
                   <div className="w-2 h-24 bg-stone-800 rounded-full origin-bottom rotate-[-5deg] shadow-sm"></div>
                   <div className="absolute bottom-8 left-[-18px] w-1.5 h-16 bg-stone-700 rounded-full origin-bottom rotate-[-35deg]"></div>
                   <div className="absolute bottom-10 left-[12px] w-1.5 h-14 bg-stone-700 rounded-full origin-bottom rotate-[25deg]"></div>
                </div>
                
                {/* 引导光效 */}
                {showHint && weed.id === 0 && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 animate-bounce text-4xl filter drop-shadow-md">☝️</div>
                )}
              </div>
            </button>
          ))}

          {/* 点击时的墨迹迸发特效 */}
          {lastRemovedPos && (
            <div 
              className="absolute pointer-events-none animate-ping"
              style={{ left: lastRemovedPos.x, top: lastRemovedPos.y - 100 }}
            >
              <div className="w-16 h-16 bg-stone-800 rounded-full blur-xl opacity-40"></div>
              <div className="text-2xl ink-brush text-stone-900 -translate-y-10">除！</div>
            </div>
          )}
        </div>
      </div>

      {/* 知识卡片 */}
      {!showHint && (
        <div className="absolute left-10 bottom-10 w-72 bg-white/90 p-6 gu-feng-border rounded-sm shadow-2xl animate-slide-in">
           <div className="flex items-center gap-2 border-b-2 border-stone-100 pb-2 mb-3">
             <div className="w-8 h-8 bg-stone-800 text-white rounded-full flex items-center justify-center font-bold">耘</div>
             <h4 className="text-stone-800 font-bold text-2xl font-serif">
               {KNOWLEDGE_BASE.yun.word}
             </h4>
           </div>
           <p className="text-stone-600 font-serif leading-loose italic text-lg">{KNOWLEDGE_BASE.yun.meaning}</p>
        </div>
      )}

      <style>{`
        @keyframes cloud-move {
          from { transform: translateX(-10%); }
          to { transform: translateX(110%); }
        }
        .animate-cloud-move {
          animation: cloud-move 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default DayWeeding;
