"use client";

import React from "react";

interface BingoCardProps {
  card: (number | null)[][] | number[][];
  drawnNumbers: number[];
  markedNumbers: number[];
  type: 'tombala' | 'bingo';
  onNumberClick?: (num: number) => void;
}

const BingoCard: React.FC<BingoCardProps> = ({ card, drawnNumbers, markedNumbers, type, onNumberClick }) => {
  const isDrawn = (num: number | null) => num !== null && (num === 0 || drawnNumbers.includes(num));
  const isMarked = (num: number | null) => num !== null && (num === 0 || markedNumbers.includes(num));

  if (type === 'bingo') {
    const bingoCard = card as number[][];
    return (
      <div className="relative p-2 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-yellow-500 max-w-[450px] w-full mx-auto">
        <div className="grid grid-cols-5 gap-1 mb-2 bg-white/10 rounded-t-sm p-2">
          {["B", "I", "N", "G", "O"].map((letter) => (
            <div key={letter} className="text-center font-black text-3xl md:text-5xl text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              {letter}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-1 bg-slate-200 p-1 md:p-2 rounded-sm border-2 border-yellow-900/20">
          {bingoCard.map((row, rowIndex) =>
            row.map((num, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => num !== 0 && onNumberClick?.(num)}
                className={`
                  relative aspect-square flex items-center justify-center rounded-sm font-black text-xl md:text-2xl transition-all duration-300 border border-slate-300 cursor-pointer
                  ${isMarked(num) ? "bg-slate-100 text-slate-400" : "bg-white text-slate-800 shadow-inner hover:bg-slate-50"}
                `}
              >
                <span className={num === 0 ? "text-[10px] leading-none" : ""}>
                  {num === 0 ? "FREE" : num}
                </span>
                {isMarked(num) && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-4/5 h-4/5 rounded-full bg-red-600/70 border-2 border-red-800 animate-in zoom-in-50 duration-300 flex items-center justify-center shadow-lg overflow-hidden">
                       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 to-transparent"></div>
                    </div>
                  </div>
                )}
                {/* Yanlış işaretleme uyarısı */}
                {isMarked(num) && !isDrawn(num) && num !== 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></div>
                )}
              </div>
            ))
          )}
        </div>
        <div className="mt-2 px-2 flex justify-between items-center text-[10px] font-mono text-yellow-200/50 uppercase tracking-widest">
          <span>Serial: B-772</span>
          <span>BINGO CLASSIC</span>
        </div>
      </div>
    );
  }

  // Tombala Layout (3x9)
  const tombalaCard = card as (number | null)[][];
  return (
    <div className="relative p-1 md:p-4 bg-[#c41e3a] rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.6)] border-[6px] border-[#8b0000] max-w-[850px] w-full mx-auto overflow-hidden">
      {/* Kağıt Dokusu */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
      
      <div className="relative z-10 grid grid-cols-9 gap-[2px] md:gap-1 bg-[#1a1a1a] p-1 md:p-2 rounded-sm shadow-inner">
        {tombalaCard.map((row, rowIndex) =>
          row.map((num, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => num !== null && onNumberClick?.(num)}
              className={`
                relative aspect-square md:aspect-video flex items-center justify-center rounded-sm font-black text-xl md:text-4xl transition-all duration-300 border-b-2 border-r-2 
                ${num === null 
                  ? "bg-[#2a2a2a] border-[#333]" 
                  : "bg-[#f5f5f5] text-[#222] border-[#ddd] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] cursor-pointer hover:bg-white"}
              `}
            >
              {/* Sayı Izgarası Dokusu */}
              {num !== null && (
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
              )}

              {/* Sayı */}
              {num !== null && <span className="z-10 drop-shadow-sm">{num}</span>}

              {/* Damga Efekti (Tombala Pulu) */}
              {isMarked(num) && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <div className="w-[85%] h-[85%] rounded-full bg-blue-700/85 border-[3px] border-blue-900 animate-in zoom-in-50 duration-200 flex items-center justify-center shadow-lg">
                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
                     <div className="w-2/3 h-2/3 rounded-full border border-blue-400/30"></div>
                  </div>
                </div>
              )}

              {/* Yanlış işaretleme uyarısı */}
              {isMarked(num) && !isDrawn(num) && num !== null && (
                <div className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white z-30 flex items-center justify-center text-[10px] text-white font-bold">!</div>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* Alt Dekorasyon */}
      <div className="mt-3 px-4 flex justify-between items-center text-[12px] font-black text-white/90 uppercase tracking-[0.2em] italic">
        <div className="flex items-center gap-2">
          <span className="bg-white text-[#c41e3a] px-2 py-0.5 rounded-sm shadow-sm">KART NO: 1903-T</span>
        </div>
        <div className="flex flex-col items-center leading-none">
          <span className="text-[16px] not-italic tracking-[0.3em] font-serif">TOMBALA</span>
          <span className="text-[8px] tracking-[0.5em] opacity-70">TURKISH CLASSIC</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-white text-[#c41e3a] px-2 py-0.5 rounded-sm shadow-sm">SERİ: A-42</span>
        </div>
      </div>
    </div>
  );
};

export default BingoCard;
