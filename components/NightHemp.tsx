
import React, { useState, useEffect, useRef } from 'react';
import { KNOWLEDGE_BASE } from '../types.ts';

interface NightHempProps {
  onComplete: () => void;
}

const NightHemp: React.FC<NightHempProps> = ({ onComplete }) => {
  const [swipeCount, setSwipeCount] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const lastX = useRef<number | null>(null);
  const targetCount = 12;

  // 处理滑动逻辑（鼠标和触摸通用）
  const handleSwipe = (currentX: number) => {
    if (lastX.current !== null && Math.abs(currentX - lastX.current) > 30) {
      setSwipeCount(prev => Math.min(prev + 1, targetCount));
      setIsSwiping(true);
      lastX.current = currentX;
      // 短暂延迟后重置滑动状态
      setTimeout(() => setIsSwiping(false), 150);
    } else if (lastX.current === null) {
      lastX.current = currentX;
    }
  };

  // 鼠标事件处理
  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || isPressed) {
      handleSwipe(e.clientX);
    } else {
      lastX.current = null;
    }
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    lastX.current = null;
  };

  // 触摸事件处理
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      handleSwipe(touch.clientX);
    }
  };

  const handleTouchStart = () => {
    setIsPressed(true);
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
    lastX.current = null;
  };

  useEffect(() => {
    if (swipeCount >= targetCount) {
      setTimeout(onComplete, 2000);
    }
  }, [swipeCount, onComplete]);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full bg-[#1a1a1a] overflow-hidden flex flex-col items-center justify-center cursor-ew-resize select-none touch-none"
    >
      {/* 宣纸纹理蒙版 */}
      <div className="absolute inset-0 paper-texture opacity-10 pointer-events-none"></div>

      {/* 油灯 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[100px] animate-pulse"></div>

      {/* 引导画轴 */}
      {swipeCount === 0 && (
        <div className="absolute top-20 z-20 animate-fade-in text-center">
          <div className="bg-stone-800 text-amber-100 px-10 py-4 border-2 border-stone-600 rounded-sm shadow-2xl">
            <h3 className="ink-brush text-3xl mb-2">“夜绩麻”</h3>
            <p className="font-serif text-sm text-stone-400">玩法：按住鼠标左键左右反复滑动，模拟将麻搓成线</p>
            <div className="mt-4 flex justify-center gap-2">
              <span className="animate-bounce">⬅️</span>
              <span className="animate-bounce delay-150">➡️</span>
            </div>
          </div>
        </div>
      )}

      {/* 绩麻核心视觉 */}
      <div className="z-10 flex flex-col items-center space-y-10">
        <div className="relative group">
          {/* 线绳模拟 */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-1 bg-amber-100/50 rounded-full transition-all duration-300 ${isSwiping ? 'h-64 translate-y-2 rotate-2' : 'h-60 rotate-0'}`}
                style={{
                  opacity: 0.2 + (i * 0.15),
                  transform: `rotate(${(swipeCount * 2) - 10}deg)`
                }}
              ></div>
            ))}
          </div>

          {/* 进度光环 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-40 h-40 border-2 border-amber-900/30 rounded-full animate-spin-slow"></div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="text-amber-200 text-4xl ink-brush tracking-widest opacity-80">
            搓麻成线... {Math.round((swipeCount / targetCount) * 100)}%
          </div>
          <p className="text-stone-500 font-serif italic italic">“夜绩麻，村庄儿女各当家”</p>
        </div>
      </div>

      {/* 知识浮窗 */}
      {swipeCount > 2 && (
        <div className="absolute bottom-20 right-20 p-6 bg-stone-800/80 border-2 border-stone-600 rounded-sm shadow-2xl animate-pop-in">
          <h4 className="text-amber-400 font-bold text-2xl font-serif mb-2">{KNOWLEDGE_BASE.ji.word}</h4>
          <p className="text-stone-300 font-serif text-lg leading-relaxed">{KNOWLEDGE_BASE.ji.meaning}</p>
        </div>
      )}

      {swipeCount >= targetCount && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-50">
          <div className="text-6xl ink-brush text-amber-200 animate-pop-in">
            月上柳梢头，绩麻亦有情
          </div>
          <div className="mt-8 h-px w-64 bg-amber-200/30"></div>
        </div>
      )}

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NightHemp;
