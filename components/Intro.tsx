
import React from 'react';

interface IntroProps {
  onStart: () => void;
}

const Intro: React.FC<IntroProps> = ({ onStart }) => {
  return (
    <div className="relative flex flex-col items-center justify-center h-full animate-fade-in">
      {/* 装饰性背景墨迹 */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-stone-300/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-stone-300/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="z-10 bg-white/40 p-12 gu-feng-border rounded-sm backdrop-blur-sm max-w-2xl text-center">
        <h1 className="text-8xl font-bold ink-brush tracking-tighter text-stone-900 mb-6 drop-shadow-sm">
          四时田园杂兴
        </h1>
        <p className="text-xl text-stone-500 font-serif mb-10 tracking-widest">— 范成大 —</p>

        <div className="space-y-4 mb-12 text-3xl font-serif text-stone-800 leading-relaxed">
          <p className="border-b border-stone-200 pb-2">昼出耘田夜绩麻，</p>
          <p className="border-b border-stone-200 pb-2">村庄儿女各当家。</p>
          <p className="border-b border-stone-200 pb-2">童孙未解供耕织，</p>
          <p>也傍桑阴学种瓜。</p>
        </div>

        <button
          onClick={onStart}
          className="group relative px-16 py-5 overflow-hidden"
        >
          <div className="absolute inset-0 bg-stone-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          <span className="relative z-10 text-stone-800 group-hover:text-stone-50 text-2xl font-bold ink-brush tracking-[0.5em] border-2 border-stone-800 px-8 py-2">
            入画体验
          </span>
        </button>
      </div>

      <div className="mt-8 text-stone-400 text-sm font-serif italic animate-pulse">
        请点击“入画体验”开启夏日乡村之旅
      </div>
    </div>
  );
};

export default Intro;
