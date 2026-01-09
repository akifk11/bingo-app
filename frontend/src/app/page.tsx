"use client";

import { useGameStore } from "@/store/useGameStore";
import { useTranslation } from "react-i18next";
import "@/i18n/config";

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export default function Home() {
  const { playMode, setPlayMode, gameState } = useGameStore();
  const { t, i18n } = useTranslation();

  const handleBack = () => {
    setPlayMode('none');
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const LanguageSwitcher = () => (
    <div className="absolute top-8 right-8 flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`p-2 rounded-lg border transition-all ${
            i18n.language === lang.code
              ? 'bg-blue-600 border-blue-400'
              : 'bg-slate-800 border-slate-700 hover:border-slate-500'
          }`}
          title={lang.name}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );

  if (playMode === 'none') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-900 text-white relative">
        <LanguageSwitcher />
        <h1 className="text-5xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-center">
          {t('welcome')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
          <button
            onClick={() => setPlayMode('online')}
            className="group relative bg-slate-800 p-8 rounded-2xl border-2 border-slate-700 hover:border-blue-500 transition-all shadow-xl hover:scale-105 text-center"
          >
            <div className="text-4xl mb-4">🌐</div>
            <h2 className="text-2xl font-bold mb-2">{t('online_play')}</h2>
            <p className="text-slate-400 text-sm">{t('online_desc')}</p>
          </button>

          <button
            onClick={() => setPlayMode('offline')}
            className="group relative bg-slate-800 p-8 rounded-2xl border-2 border-slate-700 hover:border-purple-500 transition-all shadow-xl hover:scale-105 text-center"
          >
            <div className="text-4xl mb-4">🏠</div>
            <h2 className="text-2xl font-bold mb-2">{t('offline_play')}</h2>
            <p className="text-slate-400 text-sm">{t('offline_desc')}</p>
          </button>
        </div>
      </main>
    );
  }

  if (playMode === 'offline') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-900 text-white relative">
        <LanguageSwitcher />
        <div className="bg-slate-800 p-12 rounded-2xl border border-slate-700 text-center max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-purple-400">{t('offline_mode')}</h2>
          <p className="mb-8 text-slate-300 italic">"{t('coming_soon')}"</p>
          <button
            onClick={handleBack}
            className="w-full py-3 px-6 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold transition-colors"
          >
            {t('back')}
          </button>
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
