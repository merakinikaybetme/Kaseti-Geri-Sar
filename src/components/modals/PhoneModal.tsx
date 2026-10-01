/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PhoneCall, RotateCcw, Sparkles, MessageSquare, Volume2 } from 'lucide-react';
import { ModalWrapper } from './ModalWrapper.tsx';
import { PHONE_QUOTES } from '../../data/nostalgiaData.ts';
import { PhoneQuote } from '../../types/index.ts';
import { playRotaryDial, playPhoneHandset, playButtonClick } from '../../utils/audio.ts';

interface PhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhoneModal: React.FC<PhoneModalProps> = ({ isOpen, onClose }) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);
  const [isDialing, setIsDialing] = useState<boolean>(false);
  const [dialRotation, setDialRotation] = useState<number>(0);

  const currentQuote: PhoneQuote = PHONE_QUOTES[currentQuoteIndex];

  const handleNextMessage = () => {
    if (isDialing) return;
    setIsDialing(true);
    playRotaryDial();

    // Rotate dial animation
    setDialRotation(180);
    setTimeout(() => {
      setDialRotation(0);
    }, 450);

    setTimeout(() => {
      let nextIdx = Math.floor(Math.random() * PHONE_QUOTES.length);
      // Avoid immediate repeat
      if (nextIdx === currentQuoteIndex) {
        nextIdx = (nextIdx + 1) % PHONE_QUOTES.length;
      }
      setCurrentQuoteIndex(nextIdx);
      setIsDialing(false);
    }, 500);
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Eski Çevirmeli Telefon: 80’lerden Mesaj Var"
      subtitle="Kırmızı PTT kadranlı telefonundan gelen sesler ve unutulmayan mahalle anonsları."
      badge="PTT 1980"
      icon={PhoneCall}
      accentColor="border-rose-500/70"
      maxWidthClass="max-w-4xl"
    >
      <div className="space-y-6">
        
        {/* Main Rotary Phone Display Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#240e14] via-[#170a0e] to-[#0a0406] border-2 border-rose-500/40 shadow-[0_15px_40px_rgba(244,63,94,0.2)]">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Rotary Dial Illustration (col-span-5) */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-b from-rose-700 via-rose-900 to-rose-950 border-4 border-rose-500 shadow-2xl p-4 flex items-center justify-center">
                
                {/* Dial Center */}
                <div className="absolute w-14 h-14 rounded-full bg-white border-2 border-slate-300 shadow-md flex flex-col items-center justify-center text-slate-800 z-20">
                  <span className="font-bold text-[9px] font-mono tracking-widest text-rose-700">PTT</span>
                  <span className="text-[7px] text-slate-500 font-mono">ANKARA</span>
                </div>

                {/* Rotating Dial Disk with Finger Holes */}
                <div
                  className="w-full h-full rounded-full border-2 border-white/40 flex items-center justify-center transition-transform duration-500 ease-out"
                  style={{ transform: `rotate(${dialRotation}deg)` }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num, i) => {
                    const angle = (i * 30) - 60;
                    return (
                      <div
                        key={num}
                        className="absolute w-8 h-8 rounded-full bg-white/90 border border-slate-400 flex items-center justify-center text-slate-900 font-extrabold text-xs shadow-inner"
                        style={{
                          transform: `rotate(${angle}deg) translate(62px) rotate(${-angle}deg)`,
                        }}
                      >
                        {num}
                      </div>
                    );
                  })}
                </div>

                {/* Finger Stop Metal Hook */}
                <div className="absolute bottom-6 right-8 w-4 h-6 bg-slate-200 border border-slate-400 rounded-sm z-30 shadow-md rotate-45" />

              </div>

              <span className="mt-3 text-[11px] font-mono text-rose-300/80">
                {isDialing ? 'Numara Çevriliyor...' : 'Kadran Hazır (Hat Açık)'}
              </span>
            </div>

            {/* Message Display Area (col-span-7) */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              
              <div className="p-5 sm:p-6 rounded-2xl bg-black/60 border border-rose-500/30 shadow-inner">
                <div className="flex items-center justify-between mb-3 text-xs font-mono text-rose-400">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" /> GELEN NOSTALJİ NOTU
                  </span>
                  <span className="text-[10px] bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                    NOT #{currentQuote.id}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-lg sm:text-xl font-bold font-mono text-white leading-relaxed min-h-[4.5rem] flex items-center">
                  {currentQuote.text}
                </p>

                {/* Quote Context */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Dönem Bağlamı:</span>
                  <span className="text-amber-400 font-semibold">{currentQuote.context}</span>
                </div>
              </div>

              {/* Action Button: Dial another message */}
              <button
                onClick={handleNextMessage}
                disabled={isDialing}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-sm tracking-wider shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:shadow-[0_0_30px_rgba(244,63,94,0.6)] transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <RotateCcw className={`w-4 h-4 ${isDialing ? 'animate-spin' : ''}`} />
                <span>{isDialing ? 'KADRAN DÖNÜYOR...' : 'BİR MESAJ DAHA ÇEVİR'}</span>
              </button>

            </div>

          </div>

        </div>

        {/* Quick Directory of All Messages */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
            Tüm Hatıra Mesajları Listesi ({PHONE_QUOTES.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
            {PHONE_QUOTES.map((q, idx) => (
              <div
                key={q.id}
                onClick={() => {
                  playPhoneHandset();
                  setCurrentQuoteIndex(idx);
                }}
                role="button"
                tabIndex={0}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  idx === currentQuoteIndex
                    ? 'bg-rose-950/60 border-rose-400 text-white'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <p className="line-clamp-2">{q.text}</p>
                <span className="text-[10px] text-rose-400/80 font-mono mt-1 block">
                  {q.context}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </ModalWrapper>
  );
};
