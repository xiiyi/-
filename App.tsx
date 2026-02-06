
import React, { useState, useCallback } from 'react';
import { GameStage } from './types.ts';
import Intro from './components/Intro.tsx';
import DayWeeding from './components/DayWeeding.tsx';
import NightHemp from './components/NightHemp.tsx';
import ChildPlanting from './components/ChildPlanting.tsx';
import Finale from './components/Finale.tsx';

const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<GameStage>(GameStage.INTRO);
  const [isAudioOn, setIsAudioOn] = useState(true);

  const nextStage = useCallback(() => {
    setCurrentStage(prev => {
      switch (prev) {
        case GameStage.INTRO: return GameStage.DAY_WEEDING;
        case GameStage.DAY_WEEDING: return GameStage.NIGHT_HEMP;
        case GameStage.NIGHT_HEMP: return GameStage.CHILD_PLANTING;
        case GameStage.CHILD_PLANTING: return GameStage.FINALE;
        default: return GameStage.INTRO;
      }
    });
  }, []);

  const renderStage = () => {
    switch (currentStage) {
      case GameStage.INTRO:
        return <Intro onStart={nextStage} />;
      case GameStage.DAY_WEEDING:
        return <DayWeeding onComplete={nextStage} />;
      case GameStage.NIGHT_HEMP:
        return <NightHemp onComplete={nextStage} />;
      case GameStage.CHILD_PLANTING:
        return <ChildPlanting onComplete={nextStage} />;
      case GameStage.FINALE:
        return <Finale onRestart={() => setCurrentStage(GameStage.INTRO)} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden paper-texture bg-[#f5f2e9] text-[#2c2c2c] selection:bg-amber-200">
      {/* Background Ambience Controls */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={() => setIsAudioOn(!isAudioOn)}
          className="px-4 py-2 rounded-full bg-white/50 backdrop-blur hover:bg-white/80 transition-colors border border-stone-200 shadow-sm text-sm"
        >
          {isAudioOn ? '🔊 意境音效已开启' : '🔇 意境音效已静音'}
        </button>
      </div>

      <main className="w-full h-full">
        {renderStage()}
      </main>
      
      {/* Decorative Ink Border */}
      <div className="absolute pointer-events-none inset-0 border-[20px] border-double border-stone-800/10 opacity-50 m-2"></div>
    </div>
  );
};

export default App;
