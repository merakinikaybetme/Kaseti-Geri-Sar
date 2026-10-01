/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Power, ArrowDown, Sparkles, Volume2, Tv } from 'lucide-react';
import { playTvTurnOn, playTvChannelStatic, playButtonClick } from '../utils/audio.ts';

interface HeroTVProps {
  onEnterRoom: () => void;
}

const ROTATING_PHRASES = [
  'Kaseti geri sar…',
  'Cumartesi sabahı çizgi film saati.',
  'Mahallede hava kararmadan eve dön.',
  'Bir bölümlük değil, bir ömürlük hatıralar.',
  'Edi ile Büdü\'nün maceraları...',
  'He-Man: Gölgelerin gücü adına!',
  'Mahalle bakkalından cam şişe gazoz.',
  'Kasetin B yüzüne geçme vakti.',
];

export const HeroTV: React.FC<HeroTVProps> = ({ onEnterRoom }) => {
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [isWarmingUp, setIsWarmingUp] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [channel, setChannel] = useState(1);

  // Rotating phrases every 4 seconds unless glitching
  useEffect(() => {
    if (!isPoweredOn) return;
    const interval = setInterval(() => {
      setActivePhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPoweredOn]);

  const togglePower = () => {
    playButtonClick();
    if (!isPoweredOn) {
      setIsWarmingUp(true);
      playTvTurnOn();
      setIsPoweredOn(true);
      setTimeout(() => {
        setIsWarmingUp(false);
      }, 700);
    } else {
      setIsPoweredOn(false);
    }
  };

  const handleScreenClick = () => {
    if (!isPoweredOn) {
      togglePower();
      return;
    }
    playTvChannelStatic();
    setIsGlitching(true);
    // Switch to next random/sequential phrase with CRT glitch effect
    setActivePhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
    setTimeout(() => {
      setIsGlitching(false);
    }, 400);
  };

  const cycleChannel = () => {
    playTvChannelStatic();
    setChannel((prev) => (prev % 3) + 1);
  };

  return (
    <section className="relative min-h-[86vh] sm:min-h-[90vh] flex flex-col items-center justify-center px-3 sm:px-6 py-6 sm:py-8 overflow-hidden">
      
      {/* Ambient 80s Neon Gradients in Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[300px] bg-gradient-to-r from-pink-600/15 via-purple-600/15 to-cyan-600/15 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Retro Title Header */}
      <div className="text-center max-w-3xl mb-4 sm:mb-6 space-y-2 sm:space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/40 text-pink-300 text-xs font-pixel tracking-wider shadow-[0_0_12px_rgba(236,72,153,0.3)]">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>1980’LER TÜRKİYE NOSTALJİSİ</span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 drop-shadow-[0_4px_12px_rgba(236,72,153,0.4)] block sm:inline">
            80’ler:
          </span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-400 drop-shadow-[0_4px_12px_rgba(6,182,212,0.4)]">
            Kaseti Geri Sar
          </span>
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-lg mx-auto leading-relaxed px-2">
          Tüplü televizyon ekranına dokunarak kanalları değiştirin, aşağıdaki 8 nostaljik eşyayı keşfedin.
        </p>
      </div>

      {/* Centerpiece: Vintage CRT Television with Lace Doily (Dantelli Örtü) */}
      <div className="relative w-full max-w-[580px]">
        
        {/* Antenna with Aluminum Foil at Tips */}
        <div className="absolute -top-10 sm:-top-14 left-1/2 -translate-x-1/2 flex items-end justify-center pointer-events-none z-20">
          <div className="relative">
            <div className="w-1.5 h-14 sm:h-18 bg-gradient-to-t from-slate-400 to-slate-200 rotate-[-26deg] origin-bottom-center shadow-md relative">
              <span className="absolute -top-2 -left-1 w-3 h-3 bg-slate-300 rounded-full border border-slate-500"></span>
            </div>
          </div>
          <div className="w-3 h-2.5 bg-slate-800 rounded-t-md border-t border-slate-600"></div>
          <div className="relative">
            <div className="w-1.5 h-14 sm:h-18 bg-gradient-to-t from-slate-400 to-slate-200 rotate-[26deg] origin-bottom-center shadow-md relative">
              <span className="absolute -top-2 -right-1 w-3.5 h-3.5 bg-slate-200 rounded-full border border-slate-400 shadow-[0_0_6px_rgba(255,255,255,0.9)] animate-pulse"></span>
            </div>
          </div>
        </div>

        {/* Traditional Turkish Crochet Lace Doily ("Dantelli Örtü") draped over the TV */}
        <div className="absolute -top-2.5 left-4 right-4 sm:left-10 sm:right-10 z-30 pointer-events-none drop-shadow-md">
          <div className="relative bg-white/95 text-slate-800 text-[9px] sm:text-[11px] py-0.5 px-3 rounded-t-md border-t border-x border-white/60 shadow">
            <div className="flex justify-between items-center text-slate-600/70 font-serif tracking-widest">
              <span>❖ ❖</span>
              <span className="font-hand font-bold text-slate-700 text-xs sm:text-sm">El Emeği Dantel Örtü</span>
              <span>❖ ❖</span>
            </div>
            <div className="absolute -bottom-2 left-0 right-0 flex justify-around">
              {[...Array(9)].map((_, i) => (
                <span key={i} className="w-2 h-2.5 bg-white/95 rounded-b-full border-b border-x border-slate-200 inline-block" />
              ))}
            </div>
          </div>
        </div>

        {/* TV Wooden Cabinet Body */}
        <div className="relative bg-gradient-to-b from-[#2b1810] via-[#1a0f0a] to-[#120804] p-3 sm:p-5 rounded-3xl border-4 border-[#3e2316] shadow-[0_15px_40px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.1)]">
          
          <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center">
            
            {/* CRT Screen Area */}
            <div className="col-span-9 sm:col-span-9">
              <div 
                onClick={handleScreenClick}
                className={`relative aspect-[4/3] bg-[#050810] rounded-[1.75rem] sm:rounded-[2rem] border-4 border-slate-900 overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.9),0_0_15px_rgba(0,0,0,0.6)] cursor-pointer group select-none transition-all ${
                  isGlitching ? 'brightness-125 saturate-150 scale-[0.99]' : ''
                }`}
                title="TV Ekranına dokunarak kanal değiştir / hatıra seç"
              >
                {/* Curved Screen Glare Reflections */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none rounded-[2rem] z-20" />
                
                {/* CRT Scanline Overlay */}
                <div className="absolute inset-0 crt-scanlines z-10" />

                {/* CRT Screen Off state */}
                {!isPoweredOn && (
                  <div className="absolute inset-0 bg-[#070a12] flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700/80 flex items-center justify-center text-slate-500 group-hover:text-pink-400 group-hover:scale-105 transition-all">
                      <Power className="w-5 h-5" />
                    </div>
                    <span className="mt-2 text-[11px] sm:text-xs font-crt text-slate-400 tracking-wider">
                      [ EKRANA DOKUNUP AÇ ]
                    </span>
                  </div>
                )}

                {/* CRT Power-on warm-up flash or channel glitch */}
                {(isWarmingUp || isGlitching) && (
                  <div className="absolute inset-0 bg-cyan-300/40 z-30 flex items-center justify-center animate-pulse">
                    <div className="w-full h-1 bg-white shadow-[0_0_20px_white]"></div>
                  </div>
                )}

                {/* CRT Active Screen Content */}
                {isPoweredOn && !isWarmingUp && (
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0a1829] to-[#040914] p-3 sm:p-5 flex flex-col justify-between animate-crt">
                    
                    {/* Top OSD Bar */}
                    <div className="flex items-center justify-between font-crt text-xs sm:text-sm text-cyan-300 tracking-widest crt-glow-cyan z-10">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        TRT-{channel} RENKLİ
                      </span>
                      <span>CH-{channel.toString().padStart(2, '0')}</span>
                      <span className="text-yellow-400 font-pixel text-[8px]">1980’S</span>
                    </div>

                    {/* Center Rotating Nostalgic Quote */}
                    <div className="my-auto text-center px-1 py-2 relative z-10">
                      <div className="text-[10px] font-pixel text-pink-400 mb-1 crt-glow-pink tracking-widest">
                        ••• EKRANA TIKLA • DEĞİŞTİR •••
                      </div>
                      <p className="text-base sm:text-xl md:text-2xl font-extrabold font-mono text-cyan-100 crt-glow-cyan leading-snug min-h-[3.5rem] flex items-center justify-center">
                        “{ROTATING_PHRASES[activePhraseIndex]}”
                      </p>
                      <div className="mt-2 text-[10px] text-cyan-400/80 font-mono animate-pulse">
                        (Dokun / Keşfet)
                      </div>
                    </div>

                    {/* Bottom Status OSD */}
                    <div className="flex items-center justify-between text-[10px] font-crt text-slate-400 z-10">
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Tv className="w-3 h-3" /> CANLI YAYIN
                      </span>
                      <span className="text-slate-500">PAL 625</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* TV Control Panel on the Right Side (col-span-3) */}
            <div className="col-span-3 sm:col-span-3 flex flex-col items-center justify-between h-full py-2 bg-[#1e110a] rounded-2xl border-2 border-[#331c10] p-2 shadow-inner space-y-2 sm:space-y-3">
              
              {/* Retro Brand-Safe Badge */}
              <div className="w-full text-center py-1 bg-gradient-to-r from-amber-700/50 via-yellow-600/60 to-amber-700/50 rounded border border-amber-500/40 shadow-sm">
                <span className="text-[8px] sm:text-[9px] font-bold font-mono tracking-widest text-amber-200">
                  NOSTALJİ TV
                </span>
              </div>

              {/* Rotary Channel Selector Dial */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-[8px] font-mono text-amber-400/80 uppercase">KANAL</span>
                <button
                  onClick={cycleChannel}
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-b from-slate-600 to-slate-800 border-2 border-slate-500 flex items-center justify-center shadow-lg active:rotate-45 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
                  title="Kanal Değiştir"
                >
                  <div className="w-1.5 h-5 bg-amber-400 rounded-sm"></div>
                </button>
              </div>

              {/* Speaker Grille Slots */}
              <div className="w-full space-y-1 py-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-1 bg-black/60 rounded-full"></div>
                ))}
              </div>

              {/* Power Push Button & Indicator LED with Hover/Focus states */}
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={togglePower}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-rose-400 hover:scale-105 ${
                    isPoweredOn
                      ? 'bg-rose-600 border-rose-400 text-white shadow-[0_0_10px_rgba(244,63,94,0.6)]'
                      : 'bg-slate-800 border-slate-600 text-slate-400 hover:text-white'
                  }`}
                  title="Aç / Kapa Güç Düğmesi"
                  aria-label="Televizyon Güç Düğmesi"
                >
                  <Power className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPoweredOn ? 'bg-emerald-400 shadow-[0_0_4px_#34d399]' : 'bg-red-500/50'}`}></span>
                  <span className="text-[7px] font-mono text-slate-400">GÜÇ</span>
                </div>
              </div>

            </div>

          </div>

          {/* Wooden TV Stand Legs */}
          <div className="absolute -bottom-5 left-6 w-5 h-6 bg-[#231209] rounded-b-md border-b-2 border-x-2 border-[#3e2316] shadow-md"></div>
          <div className="absolute -bottom-5 right-6 w-5 h-6 bg-[#231209] rounded-b-md border-b-2 border-x-2 border-[#3e2316] shadow-md"></div>
        </div>

      </div>

      {/* Main CTA Button: "80’lere Gir" */}
      <div className="mt-6 sm:mt-8 text-center">
        <button
          onClick={() => {
            playButtonClick();
            onEnterRoom();
          }}
          className="group relative inline-flex items-center gap-2.5 px-7 sm:px-9 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 text-white font-extrabold text-sm sm:text-base tracking-wider shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-pink-500/50"
        >
          <span className="relative z-10 tracking-widest">
            80’LERE GİR (KEŞFET)
          </span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform relative z-10" />
        </button>
      </div>

    </section>
  );
};
