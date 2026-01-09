"use client";

import { useGameStore } from "@/store/useGameStore";
import { useTranslation } from "react-i18next";
import { generateTombalaCard, checkTombalaWin } from "@/utils/tombalaLogic";
import { generateBingoCard, checkBingoWin } from "@/utils/bingoLogic";
import BingoCard from "@/components/BingoCard";
import "@/i18n/config";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export default function Home() {
  const { 
    playMode, 
    setPlayMode, 
    gameType,
    setGameType,
    gameState, 
    userCard, 
    setUserCard, 
    addDrawnNumber, 
    isGameOver, 
    setIsGameOver,
    cinkoCount,
    setCinkoCount,
    isAutoFill,
    setIsAutoFill,
    markedNumbers,
    toggleMarkedNumber,
    resetGame 
  } = useGameStore();
  
  const { t, i18n } = useTranslation();
  const [lastDrawn, setLastDrawn] = useState<number | null>(null);
  const [showCinkoMsg, setShowCinkoMsg] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBack = () => {
    resetGame();
    setPlayMode('none');
  };

  const startOfflineGame = (type: 'tombala' | 'bingo') => {
    resetGame();
    setGameType(type);
    setShowCinkoMsg(null);
    const newCard = type === 'tombala' ? generateTombalaCard() : generateBingoCard();
    setUserCard(newCard);
    setPlayMode('offline');
  };

  const drawNumber = () => {
    if (isGameOver) return;

    const maxNum = gameType === 'tombala' ? 90 : 75;
    let nextNum;
    
    if (gameState.drawnNumbers.length >= maxNum) return;

    do {
      nextNum = Math.floor(Math.random() * maxNum) + 1;
    } while (gameState.drawnNumbers.includes(nextNum));

    addDrawnNumber(nextNum);
    setLastDrawn(nextNum);
  };

  useEffect(() => {
    if (!userCard || isGameOver) return;

    if (gameType === 'tombala') {
      const result = checkTombalaWin(userCard as (number | null)[][], markedNumbers);
      if (result.rowsCompleted > cinkoCount) {
        const newCinko = result.rowsCompleted;
        setCinkoCount(newCinko);
        if (newCinko === 1) setShowCinkoMsg(t('cinko1'));
        else if (newCinko === 2) setShowCinkoMsg(t('cinko2'));
        setTimeout(() => setShowCinkoMsg(null), 3000);
      }
      if (result.isBingo) {
        setIsGameOver(true);
        setShowCinkoMsg(t('tulum'));
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ef4444', '#3b82f6', '#eab308']
        });
      }
    } else {
      const result = checkBingoWin(userCard as number[][], markedNumbers);
      if (result) {
        setIsGameOver(true);
        setShowCinkoMsg("BINGO!");
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ef4444', '#3b82f6', '#eab308']
        });
      }
    }
  }, [markedNumbers, userCard, gameType, cinkoCount, isGameOver, t, setCinkoCount, setIsGameOver]);

  if (!mounted) return <div className="min-h-screen bg-slate-900" />;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const LanguageSwitcher = () => (
    <div className="fixed top-4 right-4 flex gap-1 z-50 bg-slate-900/80 backdrop-blur-sm p-1 rounded-xl border border-slate-700">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`p-1.5 md:p-2 rounded-lg border transition-all ${
            i18n.language === lang.code
              ? 'bg-blue-600 border-blue-400'
              : 'bg-slate-800 border-slate-700 hover:border-slate-500'
          }`}
          title={lang.name}
        >
          <span className="text-sm md:text-base">{lang.flag}</span>
        </button>
      ))}
    </div>
  );

  if (playMode === 'none') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-slate-900 text-white relative">
        <LanguageSwitcher />
        <h1 className="text-3xl md:text-5xl font-extrabold mb-8 md:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-center px-4">
          {t('welcome')}
        </h1>

        <div className="flex flex-col gap-8 md:gap-12 w-full max-w-4xl px-2">
          {/* Online Section */}
          <div className="space-y-4">
            <h2 className="text-sm md:text-xl font-bold text-blue-400 uppercase tracking-widest text-center opacity-80">{t('online_multiplayer')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => { setGameType('tombala'); setPlayMode('online'); }}
                className="bg-slate-800 p-4 md:p-6 rounded-2xl border-2 border-slate-700 hover:border-blue-500 transition-all shadow-xl hover:scale-[1.02] text-center"
              >
                <div className="text-2xl md:text-3xl mb-2">🔴</div>
                <h3 className="text-lg md:text-xl font-bold uppercase">{t('tombala_classic')}</h3>
                <p className="text-slate-400 text-[10px] md:text-xs mt-1">{t('tombala_desc')}</p>
              </button>
              <button
                onClick={() => { setGameType('bingo'); setPlayMode('online'); }}
                className="bg-slate-800 p-4 md:p-6 rounded-2xl border-2 border-slate-700 hover:border-blue-500 transition-all shadow-xl hover:scale-[1.02] text-center"
              >
                <div className="text-2xl md:text-3xl mb-2">🟡</div>
                <h3 className="text-lg md:text-xl font-bold uppercase">{t('bingo_classic')}</h3>
                <p className="text-slate-400 text-[10px] md:text-xs mt-1">{t('bingo_desc')}</p>
              </button>
            </div>
          </div>

          {/* Offline Section */}
          <div className="space-y-4">
            <h2 className="text-sm md:text-xl font-bold text-purple-400 uppercase tracking-widest text-center opacity-80">{t('offline_practice')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => startOfflineGame('tombala')}
                className="bg-slate-800 p-4 md:p-6 rounded-2xl border-2 border-slate-700 hover:border-purple-500 transition-all shadow-xl hover:scale-[1.02] text-center"
              >
                <div className="text-2xl md:text-3xl mb-2">🏠</div>
                <h3 className="text-lg md:text-xl font-bold uppercase">{t('tombala_classic')}</h3>
                <p className="text-slate-400 text-[10px] md:text-xs mt-1">{t('tombala_desc')}</p>
              </button>
              <button
                onClick={() => startOfflineGame('bingo')}
                className="bg-slate-800 p-4 md:p-6 rounded-2xl border-2 border-slate-700 hover:border-purple-500 transition-all shadow-xl hover:scale-[1.02] text-center"
              >
                <div className="text-2xl md:text-3xl mb-2">🃏</div>
                <h3 className="text-lg md:text-xl font-bold uppercase">{t('bingo_classic')}</h3>
                <p className="text-slate-400 text-[10px] md:text-xs mt-1">{t('bingo_desc')}</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (playMode === 'offline') {
    return (
      <main className="flex min-h-screen flex-col items-center p-4 md:p-12 lg:p-24 bg-slate-900 text-white relative">
        <LanguageSwitcher />
        <button
          onClick={handleBack}
          className="fixed top-4 left-4 z-50 text-slate-400 hover:text-white transition-colors flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-700 text-sm md:text-base"
        >
          ← {t('back')}
        </button>

        <h2 className="text-xl md:text-3xl font-bold mt-12 md:mt-0 mb-6 md:mb-8 text-purple-400 uppercase tracking-tighter italic text-center">
          {gameType === 'tombala' ? t('tombala_classic') : t('bingo_classic')}
        </h2>

        {showCinkoMsg && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none p-4">
            <div className="bg-yellow-500 text-black px-8 md:px-12 py-4 md:py-6 rounded-full text-3xl md:text-6xl font-black shadow-[0_0_50px_rgba(234,179,8,0.5)] animate-in zoom-in duration-300 text-center">
              {showCinkoMsg}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_350px] gap-6 md:gap-12 w-full max-w-6xl items-center lg:items-start">
          <div className="flex flex-col items-center w-full overflow-x-auto pb-4 scrollbar-hide">
            <div className="min-w-[320px] w-full flex justify-center">
              {userCard && (
                <BingoCard 
                  card={userCard} 
                  drawnNumbers={gameState.drawnNumbers} 
                  markedNumbers={markedNumbers}
                  type={gameType} 
                  onNumberClick={toggleMarkedNumber}
                />
              )}
            </div>
            
            <div className="mt-6 flex flex-col items-center gap-3 w-full max-w-[450px]">
              <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-full border border-slate-700 shadow-md">
                <span className="text-xs md:text-sm font-bold text-slate-300">{t('auto_fill')}:</span>
                <button
                  onClick={() => setIsAutoFill(!isAutoFill)}
                  className={`relative w-10 h-5 md:w-12 md:h-6 rounded-full transition-colors duration-200 focus:outline-none ${
                    isAutoFill ? 'bg-green-600' : 'bg-slate-600'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                      isAutoFill ? 'translate-x-5 md:translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>
              {!isAutoFill && (
                <p className="text-[9px] md:text-[10px] text-yellow-500 animate-pulse font-bold uppercase tracking-wider text-center">
                  {t('manual_mark_hint')}
                </p>
              )}
            </div>

            {gameType === 'tombala' && (
              <div className="mt-6 grid grid-cols-3 gap-2 md:gap-4 w-full max-w-[600px]">
                {[1, 2, 3].map((num) => (
                  <div 
                    key={num}
                    className={`p-2 md:p-4 rounded-xl border-2 text-center transition-all ${
                      cinkoCount >= num 
                        ? "bg-green-500/20 border-green-500 text-green-400 font-bold scale-105" 
                        : "bg-slate-800/50 border-slate-700 text-slate-500"
                    }`}
                  >
                    <div className="text-[8px] md:text-xs uppercase mb-0.5 md:mb-1">
                      {num === 1 ? t('cinko1') : num === 2 ? t('cinko2') : t('tulum')}
                    </div>
                    <div className="text-base md:text-xl">{cinkoCount >= num ? "✅" : "🔒"}</div>
                  </div>
                ))}
              </div>
            )}

            {isGameOver && (
              <div className="mt-6 p-4 md:p-8 bg-yellow-500/20 border-4 border-yellow-500 rounded-2xl text-center animate-bounce shadow-[0_0_30px_rgba(234,179,8,0.3)] w-full max-w-[450px]">
                <h3 className="text-3xl md:text-5xl font-black text-yellow-500 mb-1 md:mb-2">
                  {gameType === 'tombala' ? 'TOMBALA!' : 'BINGO!'}
                </h3>
                <p className="text-white text-sm md:text-lg font-bold">{t('congrats')}</p>
              </div>
            )}
          </div>

          <div className="bg-slate-800 p-5 md:p-8 rounded-2xl border border-slate-700 shadow-xl w-full max-w-[450px] lg:sticky lg:top-8">
            <div className="text-center mb-6 md:mb-8">
              <div className="text-slate-400 text-xs md:text-sm mb-1 md:mb-2">{t('last_drawn')}</div>
              <div className="text-5xl md:text-7xl font-black text-yellow-500 h-14 md:h-20 flex items-center justify-center">
                {lastDrawn || "--"}
              </div>
            </div>

            <button
              onClick={drawNumber}
              disabled={isGameOver}
              className={`w-full py-3 md:py-4 rounded-xl font-bold text-lg md:text-xl transition-all shadow-lg mb-6 md:mb-8 ${
                isGameOver 
                  ? "bg-slate-700 cursor-not-allowed text-slate-500" 
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 active:scale-95"
              }`}
            >
              {isGameOver ? t('game_over') : t('draw_number')}
            </button>

            <div className="space-y-3">
              <div className="text-slate-400 text-xs md:text-sm">{t('drawn_count')} ({gameState.drawnNumbers.length})</div>
              <div className="flex flex-wrap gap-1.5 max-h-32 md:max-h-48 overflow-y-auto p-2 bg-slate-900/50 rounded-lg">
                {gameState.drawnNumbers.map((num, i) => (
                  <span key={i} className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-slate-700 rounded-full text-[10px] md:text-xs font-bold border border-slate-600">
                    {num}
                  </span>
                )).reverse()}
              </div>
            </div>

            <button
              onClick={startOfflineGame}
              className="w-full mt-6 md:mt-8 py-2 text-slate-400 hover:text-white transition-colors text-xs md:text-sm underline"
            >
              {t('restart')}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-900 text-white relative">
      <LanguageSwitcher />
      <button
        onClick={handleBack}
        className="absolute top-8 left-8 text-slate-400 hover:text-white transition-colors flex items-center gap-2"
      >
        ← {t('back')}
      </button>

      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8 text-blue-400">Bingo Real-Time</h1>
      </div>

      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700 w-full max-w-md text-center">
        <p className="text-xl mb-4">
          {t('game_status')}: <span className="capitalize text-green-400">{t(gameState.status)}</span>
        </p>
        
        <div className="space-y-4">
          <button className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold transition-colors">
            {t('create_room')}
          </button>
          <button className="w-full py-3 px-6 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold transition-colors">
            {t('join_room')}
          </button>
        </div>
      </div>

      <div className="mt-12 text-slate-500 text-xs">
        Next.js + Tailwind + Zustand + Zod + Socket.io
      </div>
    </main>
  );
}
