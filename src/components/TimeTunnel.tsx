/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Clock, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { TIMELINE_DATA } from '../data/nostalgiaData.ts';
import { TimelineYearData } from '../types/index.ts';
import { playButtonClick } from '../utils/audio.ts';

interface TimeTunnelProps {
  selectedYear: number;
  onSelectYear: (year: number) => void;
  onOpenCalendarModal: () => void;
}

export const TimeTunnel: React.FC<TimeTunnelProps> = ({
  selectedYear,
  onSelectYear,
  onOpenCalendarModal,
}) => {
  const currentData: TimelineYearData =
    TIMELINE_DATA.find((y) => y.year === selectedYear) || TIMELINE_DATA[0];

  return (
    <section id="zaman-tuneli" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-pixel mb-3">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>1980 — 1989 TARİHSEL ÇİZELGE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          80’ler Zaman Tüneli
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
          Türkiye ve dünyada 80’ler; renkli televizyona geçişten Berlin Duvarı’nın yıkılışına, Walkman devriminden Bizimkiler dizisine kadar her yıl ayrı bir dönüm noktasıydı.
        </p>
      </div>

      {/* Horizontal Neon Year Selector Bar */}
      <div className="relative mb-10">
        {/* Connecting neon rail line */}
        <div className="absolute top-1/2 left-4 right-4 h-1 bg-gradient-to-r from-cyan-500 via-pink-500 to-amber-500 -translate-y-1/2 opacity-30 pointer-events-none rounded-full" />

        <div className="grid grid-cols-5 md:grid-cols-10 gap-2 relative z-10">
          {TIMELINE_DATA.map((item) => {
            const isSelected = item.year === selectedYear;
            return (
              <button
                key={item.year}
                onClick={() => {
                  playButtonClick();
                  onSelectYear(item.year);
                }}
                className={`py-3 px-1 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer border-2 ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.6)] scale-110 -translate-y-1 z-20'
                    : 'bg-[#0b101f] border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                }`}
                aria-label={`${item.year} yılı detayları`}
              >
                <span className={`font-pixel text-xs sm:text-sm font-bold ${isSelected ? 'text-cyan-300' : 'text-slate-400'}`}>
                  {item.year}
                </span>
                <span className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: item.accentColor }} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Year Spotlight Card */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#111933] via-[#0d1428] to-[#070b16] border-2 border-cyan-500/50 p-6 sm:p-10 shadow-[0_0_40px_rgba(6,182,212,0.25)] overflow-hidden">
        
        {/* Ambient Glow */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 blur-[100px] rounded-full pointer-events-none opacity-20"
          style={{ backgroundColor: currentData.accentColor }}
        />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-4xl sm:text-6xl font-black font-serif text-white tracking-tight">
                {currentData.year}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-cyan-950 border border-cyan-500/50 text-cyan-300">
                ÖZEL DÖNEM
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-300 mt-1">
              “{currentData.theme}”
            </h3>
          </div>

          <button
            onClick={() => {
              playButtonClick();
              onOpenCalendarModal();
            }}
            className="px-5 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer shrink-0"
          >
            <span>Saatli Maarif Takviminde Aç</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase">
              ⚡ Teknoloji
            </span>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              {currentData.tech}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] font-mono font-bold text-purple-400 uppercase">
              🎬 Sinema
            </span>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              {currentData.cinema}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] font-mono font-bold text-pink-400 uppercase">
              📺 Televizyon
            </span>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              {currentData.tv}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase">
              🎵 Müzik
            </span>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              {currentData.music}
            </p>
          </div>

        </div>

        {/* Highlight footer */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs text-slate-300 font-mono">
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Yılın Simgesi: <strong>{currentData.keyHighlight}</strong></span>
          </span>
          <span className="text-slate-500 hidden md:inline">
            Gündelik Hayat: {currentData.dailyLife}
          </span>
        </div>

      </div>

    </section>
  );
};
