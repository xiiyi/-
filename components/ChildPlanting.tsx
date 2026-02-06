
import React, { useState, useEffect } from 'react';
import { KNOWLEDGE_BASE } from '../types.ts';

interface ChildPlantingProps {
  onComplete: () => void;
}

const ChildPlanting: React.FC<ChildPlantingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0); // 0: Idle/Intro, 1: Ready to Dig, 2: Ready to Sow, 3: Ready to Cover, 4: Done
  const [showGuide, setShowGuide] = useState(true);
  const [knowledgePoint, setKnowledgePoint] = useState<keyof typeof KNOWLEDGE_BASE | null>(null);

  const handleAction = (nextStep: number, k: keyof typeof KNOWLEDGE_BASE) => {
    setStep(nextStep);
    setKnowledgePoint(k);
    if (nextStep === 4) {
      setTimeout(onComplete, 3500);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#fdfaf1] overflow-hidden select-none">
      {/* 场景装饰：淡墨桑叶 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-900/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* 玩法引导画轴 */}
      {showGuide && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4">
          <div className="bg-[#fdfaf3] gu-feng-border p-10 max-w-lg text-center animate-pop-in shadow-2xl relative">
            <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 bg-amber-700 text-white px-6 py-1 ink-brush text-xl rounded-full">
              种瓜秘籍
            </div>
            <h3 className="text-3xl ink-brush text-stone-800 mb-6">“也傍桑阴学种瓜”</h3>
            <div className="space-y-4 text-left font-serif text-stone-700 text-lg leading-relaxed">
              <p>1. <span className="text-amber-700 font-bold">傍阴挖坑</span>：在茂密的桑树荫下寻找泥土。</p>
              <p>2. <span className="text-amber-700 font-bold">供职撒籽</span>：模仿大人的样子播撒瓜种。</p>
              <p>3. <span className="text-amber-700 font-bold">掩土合缝</span>：细心盖上泥土，静待成长。</p>
            </div>
            <button 
              onClick={() => { setShowGuide(false); setStep(1); }}
              className="mt-8 px-12 py-3 bg-stone-800 text-white ink-brush text-2xl hover:bg-stone-700 transition-colors rounded-sm"
            >
              领悟，开始
            </button>
          </div>
        </div>
      )}

      {/* 核心交互区 */}
      <div className="flex flex-col items-center justify-center h-full space-y-12 z-10 relative">
        <div className="text-center animate-fade-in">
          <h2 className="text-5xl ink-brush text-stone-800 mb-2 tracking-widest">童孙学种瓜</h2>
          <p className="text-stone-400 font-serif italic">— 未解供耕织，也傍桑阴学 —</p>
        </div>

        {/* 桑阴互动点 */}
        <div className="relative flex flex-col items-center">
          {/* 角色/点击区域 */}
          <div 
            onClick={() => setKnowledgePoint('tongsun')}
            className={`w-44 h-44 bg-white/60 rounded-full border-4 transition-all duration-500 flex items-center justify-center text-7xl shadow-xl mb-12 relative group ${
              step > 0 && step < 4 ? 'border-amber-400 animate-pulse' : 'border-stone-100'
            }`}
          >
            <span className="group-hover:scale-110 transition-transform cursor-pointer">👦</span>
            {/* 动态光环引导 */}
            {step > 0 && step < 4 && (
              <div className="absolute inset-0 border-4 border-amber-400 rounded-full animate-ping opacity-20"></div>
            )}
          </div>
          
          {/* 操作按钮组 */}
          <div className="flex space-x-6">
            <button 
              disabled={step !== 1}
              onClick={() => handleAction(2, 'bang')}
              className={`px-10 py-4 rounded-sm border-2 transition-all font-serif text-xl relative ${
                step === 1 ? 'border-amber-600 text-amber-900 bg-amber-50 shadow-lg scale-110 z-20' : 'border-stone-200 text-stone-300 scale-100'
              }`}
            >
              {step === 1 && <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-3xl animate-bounce">☝️</span>}
              壹·挖坑
            </button>
            <button 
              disabled={step !== 2}
              onClick={() => handleAction(3, 'gong')}
              className={`px-10 py-4 rounded-sm border-2 transition-all font-serif text-xl relative ${
                step === 2 ? 'border-amber-600 text-amber-900 bg-amber-50 shadow-lg scale-110 z-20' : 'border-stone-200 text-stone-300 scale-100'
              }`}
            >
              {step === 2 && <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-3xl animate-bounce">☝️</span>}
              贰·撒籽
            </button>
            <button 
              disabled={step !== 3}
              onClick={() => handleAction(4, 'bang')}
              className={`px-10 py-4 rounded-sm border-2 transition-all font-serif text-xl relative ${
                step === 3 ? 'border-amber-600 text-amber-900 bg-amber-50 shadow-lg scale-110 z-20' : 'border-stone-200 text-stone-300 scale-100'
              }`}
            >
              {step === 3 && <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-3xl animate-bounce">☝️</span>}
              叁·掩土
            </button>
          </div>
        </div>

        {/* 瓜苗成长 */}
        {step >= 4 && (
          <div className="absolute bottom-10 flex flex-col items-center">
             <div className="w-2 h-40 bg-green-700/80 rounded-full origin-bottom animate-grow shadow-lg"></div>
             <div className="text-6xl mt-4 animate-bounce">🍉</div>
             <div className="text-amber-800 font-serif font-bold text-2xl mt-4 animate-fade-in">瓜熟蒂落，勤学有成！</div>
          </div>
        )}
      </div>

      {/* 知识卡片 */}
      {knowledgePoint && (
        <div className="absolute top-10 right-10 p-8 bg-white/95 backdrop-blur-md rounded-sm gu-feng-border shadow-2xl max-w-sm animate-pop-in z-50">
          <button 
            onClick={() => setKnowledgePoint(null)}
            className="absolute top-3 right-3 text-stone-400 hover:text-stone-600 text-xl"
          >
            ✕
          </button>
          <div className="flex items-baseline gap-3 mb-4 border-b border-stone-100 pb-2">
            <span className="text-4xl font-bold text-stone-800 font-serif">{KNOWLEDGE_BASE[knowledgePoint].word}</span>
            <span className="text-amber-700 font-serif italic">[{KNOWLEDGE_BASE[knowledgePoint].pinyin}]</span>
          </div>
          <p className="text-stone-700 leading-loose text-xl font-serif">
            {KNOWLEDGE_BASE[knowledgePoint].meaning}
          </p>
        </div>
      )}
      
      <style>{`
        @keyframes grow {
          from { transform: scaleY(0); opacity: 0; }
          to { transform: scaleY(1); opacity: 1; }
        }
        .animate-grow {
          animation: grow 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};

export default ChildPlanting;
