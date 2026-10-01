/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Calendar,
  Cpu,
  Film,
  Tv,
  Music,
  Coffee,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ModalWrapper } from './ModalWrapper.tsx';
import { TIMELINE_DATA } from '../../data/nostalgiaData.ts';
import { TimelineYearData } from '../../types/index.ts';
import { playPaperTear, playButtonClick } from '../../utils/audio.ts';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedYear: number;
  onSelectYear: (year: number) => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  selectedYear,
  onSelectYear,
}) => {
  const currentData: TimelineYearData =
    TIMELINE_DATA.find((y) => y.year === selectedYear) || TIMELINE_DATA[0];

  const handlePrevYear = () => {
    playPaperTear();
    if (selectedYear > 1980) onSelectYear(selectedYear - 1);
  };

  const handleNextYear = () => {
    playPaperTear();
    if (selectedYear < 1989) onSelectYear(selectedYear + 1);
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Saatli Duvar Takvimi: 1980–1989"
      subtitle="Günün sözü, namaz vakitleri, sinema, teknoloji ve gündelik hayatla yaprak yaprak bir onyıl."
      badge="SAATLİ MAARİF"
      icon={Calendar}
      accentColor="border-yellow-500/70"
      maxWidthClass="max-w-5xl"
    >
      <div className="space-y-6">
        
        {/* Year Selector Tabs (1980 - 1989) */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-mono text-slate-400">
              YIL SEÇİNİZ (CRT EKRAN VE TON DEĞİŞİR):
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevYear}
                disabled={selectedYear <= 1980}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 cursor-pointer"
                title="Önceki Yıl"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextYear}
                disabled={selectedYear >= 1989}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 cursor-pointer"
                title="Sonraki Yıl"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
            {TIMELINE_DATA.map((item) => {
              const isSelected = item.year === selectedYear;
              return (
                <button
                  key={item.year}
                  onClick={() => {
                    playPaperTear();
                    onSelectYear(item.year);
                  }}
                  className={`py-2 px-1 rounded-xl text-center font-pixel text-xs transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-bold border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.6)] scale-105'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-white'
                  }`}
                >
                  {item.year}
                </button>
              );
            })}
          </div>
        </div>

        {/* Vintage Wall Calendar Leaf (Saatli Maarif Takvimi Tasarımı) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#faf6ed] text-slate-900 border-4 border-amber-800/40 shadow-2xl relative overflow-hidden">
          
          {/* Calendar Hanging Hole & String at Top */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-3.5 h-3.5 rounded-full bg-slate-800 border-2 border-amber-300 shadow-inner"></div>
          </div>

          {/* Calendar Header */}
          <div className="border-b-2 border-red-900/30 pb-4 mb-6 text-center mt-2">
            <span className="text-[11px] font-mono tracking-widest text-red-800 uppercase font-bold block">
              SAATLİ MAARİF NOSTALJİ TAKVİMİ
            </span>
            <h3 className="text-4xl sm:text-6xl font-extrabold text-red-900 font-serif tracking-tight mt-1">
              {currentData.year}
            </h3>
            <p className="text-sm sm:text-base font-bold text-slate-700 mt-1 italic">
              “{currentData.theme}”
            </p>
          </div>

          {/* 5 Deep-Dive Categories Required by User */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1. Teknoloji */}
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-300/80 shadow-sm flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-cyan-900 uppercase">
                  TEKNOLOJİ
                </span>
                <p className="text-xs text-slate-800 mt-1 leading-relaxed">
                  {currentData.tech}
                </p>
              </div>
            </div>

            {/* 2. Sinema */}
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-300/80 shadow-sm flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                <Film className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-purple-900 uppercase">
                  SİNEMA
                </span>
                <p className="text-xs text-slate-800 mt-1 leading-relaxed">
                  {currentData.cinema}
                </p>
              </div>
            </div>

            {/* 3. Televizyon */}
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-300/80 shadow-sm flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-800 flex items-center justify-center shrink-0">
                <Tv className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-pink-900 uppercase">
                  TELEVİZYON
                </span>
                <p className="text-xs text-slate-800 mt-1 leading-relaxed">
                  {currentData.tv}
                </p>
              </div>
            </div>

            {/* 4. Müzik */}
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-300/80 shadow-sm flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Music className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-emerald-900 uppercase">
                  MÜZİK
                </span>
                <p className="text-xs text-slate-800 mt-1 leading-relaxed">
                  {currentData.music}
                </p>
              </div>
            </div>

            {/* 5. Gündelik Hayat (Spans 2 columns) */}
            <div className="md:col-span-2 p-4 rounded-2xl bg-amber-100/70 border border-amber-300/80 shadow-sm flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                <Coffee className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-amber-950 uppercase">
                  GÜNDELİK HAYAT & SOKAK KÜLTÜRÜ
                </span>
                <p className="text-xs text-slate-900 mt-1 leading-relaxed">
                  {currentData.dailyLife}
                </p>
              </div>
            </div>

          </div>

          {/* Key Highlight Banner */}
          <div className="mt-5 p-3.5 rounded-2xl bg-red-950 text-white flex items-center justify-between text-xs font-mono shadow-md">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Yılın Öne Çıkanı: {currentData.keyHighlight}</span>
            </span>
            <span className="text-amber-400 font-bold hidden sm:inline">1980’S</span>
          </div>

        </div>

      </div>
    </ModalWrapper>
  );
};
