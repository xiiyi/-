
import React, { useState, useEffect } from 'react';
import { getTeacherFeedback } from '../services/geminiService.ts';

interface FinaleProps {
  onRestart: () => void;
}

const POEM_LINES = [
  { text: '昼出耘田夜绩麻', highlights: [{ word: '耘', pinyin: 'yún' }] },
  { text: '村庄儿女各当家', highlights: [] },
  { text: '童孙未解供耕织', highlights: [{ word: '供', pinyin: 'gòng' }] },
  { text: '也傍桑阴学种瓜', highlights: [{ word: '傍', pinyin: 'bàng' }] },
];

const Finale: React.FC<FinaleProps> = ({ onRestart }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [teacherFeedback, setTeacherFeedback] = useState<string>('正在为您批阅画卷...');

  useEffect(() => {
    const loadFeedback = async () => {
      const feedback = await getTeacherFeedback("完成了所有劳作场景：耘田、绩麻、种瓜。");
      setTeacherFeedback(feedback);
    };
    loadFeedback();
  }, []);

  const startReciting = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setScore(Math.floor(Math.random() * 8) + 92);
    }, 4000);
  };

  return (
    <div className="relative w-full h-full bg-[#f4ece1] flex flex-col items-center justify-center p-10 select-none">
      {/* 宣纸长卷 */}
      <div className="relative w-full max-w-5xl h-[75vh] bg-[#fdfaf3] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-x-[20px] border-stone-800 rounded-sm flex overflow-hidden animate-open-scroll">
        <div className="absolute inset-0 paper-texture opacity-40 pointer-events-none"></div>
        
        {/* 内容区 */}
        <div className="flex flex-row-reverse w-full h-full items-center justify-around px-24 py-16">
          <div className="flex flex-col items-center space-y-6">
             <div className="ink-brush text-9xl text-stone-900 border-l-4 border-stone-300 pl-10 pr-4">四时田园杂兴</div>
             <div className="text-3xl font-serif text-stone-500 italic">— 范成大 —</div>
             
             {/* 老师评语 - Gemini 生成 */}
             <div className="mt-12 max-w-[200px] text-stone-600 font-serif leading-loose border-2 border-stone-200 p-4 bg-white/50 text-sm">
                <div className="text-amber-800 font-bold mb-1">【山人点评】</div>
                {teacherFeedback}
             </div>
          </div>

          {POEM_LINES.map((line, idx) => (
            <div key={idx} className="flex flex-col items-center text-5xl space-y-6 tracking-widest font-serif text-stone-800">
               {line.text.split('').map((char, cidx) => {
                 const highlight = line.highlights.find(h => h.word === char);
                 return (
                   <div key={cidx} className="relative group transition-transform hover:scale-110 cursor-help">
                     {char}
                     {highlight && (
                       <span className="absolute -right-16 top-0 text-base text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-sm border border-amber-200">
                         {highlight.pinyin}
                       </span>
                     )}
                   </div>
                 );
               })}
            </div>
          ))}
        </div>
      </div>

      {/* 底部交互区 */}
      <div className="mt-10 flex flex-col items-center space-y-6 z-20">
        {!score ? (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-stone-500 font-serif animate-pulse">“听你朗声诵读，如闻夏日清风”</p>
            <button
              onClick={startReciting}
              disabled={isRecording}
              className={`group relative px-12 py-4 rounded-sm font-bold text-2xl transition-all ${
                isRecording ? 'scale-95' : 'hover:scale-105'
              }`}
            >
              <div className={`absolute inset-0 border-2 border-stone-800 ${isRecording ? 'bg-red-50' : 'bg-transparent'}`}></div>
              <span className={`relative z-10 ink-brush ${isRecording ? 'text-red-600' : 'text-stone-800'}`}>
                {isRecording ? '正在聆听您的清音...' : '点击开始·互动朗诵'}
              </span>
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4 animate-pop-in">
             <div className="flex items-center gap-4 justify-center">
                <span className="text-3xl ink-brush text-stone-500">朗诵评价</span>
                <span className="text-6xl font-bold text-amber-700 drop-shadow-md">{score}</span>
                <span className="text-2xl font-serif text-amber-600">甲等</span>
             </div>
             <button 
               onClick={onRestart}
               className="px-10 py-2 border border-stone-400 text-stone-500 font-serif hover:bg-stone-800 hover:text-white transition-all text-sm rounded-full"
             >
               重新入画
             </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes open-scroll {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }
        .animate-open-scroll {
          animation: open-scroll 2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Finale;
