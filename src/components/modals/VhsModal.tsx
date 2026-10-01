/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Film, ExternalLink, Clapperboard, Star, Sparkles, Edit3 } from 'lucide-react';
import { ModalWrapper } from './ModalWrapper.tsx';
import { VHS_FILMS } from '../../data/nostalgiaData.ts';
import { VhsCategory, VhsFilm } from '../../types/index.ts';
import { playVhsInsert, playButtonClick } from '../../utils/audio.ts';

interface VhsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES: { id: VhsCategory | 'tumu'; label: string }[] = [
  { id: 'tumu', label: 'Tüm Filmler' },
  { id: 'bilim-kurgu', label: 'Bilim Kurgu' },
  { id: 'macera', label: 'Macera' },
  { id: 'aksiyon', label: 'Aksiyon' },
  { id: 'komedi', label: 'Komedi' },
  { id: 'aile', label: 'Aile' },
  { id: 'yesilcam', label: 'Yeşilçam 80\'ler' },
];

export const VhsModal: React.FC<VhsModalProps> = ({ isOpen, onClose }) => {
  const [selectedCat, setSelectedCat] = useState<VhsCategory | 'tumu'>('tumu');

  const filteredFilms = VHS_FILMS.filter((film) => {
    if (selectedCat === 'tumu') return true;
    return film.category === selectedCat;
  });

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="VHS Kasetliği: 80’ler Film Gecesi"
      subtitle="Semt video kulüpleri, hafta sonu kiralanan VHS kasetler ve ailecek izlenen efsanevi sinema klasikleri."
      badge="VHS HI-FI PAL"
      icon={Film}
      accentColor="border-purple-500/70"
      maxWidthClass="max-w-5xl"
    >
      <div className="space-y-6">
        
        {/* Video Club Membership Banner */}
        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-purple-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-400/50 flex items-center justify-center text-purple-300 font-pixel text-sm shrink-0">
              VHS
            </div>
            <div>
              <span className="font-bold font-mono text-purple-300 text-sm block">
                GÜNEŞ VİDEO KULÜBÜ • ÜYE NO: 1984
              </span>
              <span className="text-slate-300">
                Lütfen kaseti geri sarmadan iade etmeyiniz! (Kaset Sarma Cezası: 50 TL)
              </span>
            </div>
          </div>

          <span className="text-[10px] font-mono text-purple-400 bg-purple-900/60 px-3 py-1 rounded-full border border-purple-400/40 shrink-0">
            HQ HIGH QUALITY
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playVhsInsert();
                setSelectedCat(cat.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCat === cat.id
                  ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid of VHS Box Covers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFilms.map((film) => (
            <div
              key={film.id}
              className="group relative rounded-2xl bg-[#121626] border-2 border-slate-700/80 hover:border-purple-500 p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_10px_30px_rgba(168,85,247,0.25)]"
            >
              {/* Fake Plastic VHS Sleeve Spine on left edge */}
              <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-gradient-to-r from-black to-slate-800 rounded-l-2xl border-r border-black/60" />

              <div className="pl-2">
                {/* VHS Tape Box Top Sticker */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[9px] font-pixel px-2 py-0.5 rounded bg-black/80 text-purple-300 border border-purple-500/40">
                    {film.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {film.year}
                  </span>
                </div>

                {/* Title & Director */}
                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                  {film.title}
                </h3>
                {film.originalTitle && film.originalTitle !== film.title && (
                  <div className="text-[11px] text-slate-400 italic">
                    {film.originalTitle}
                  </div>
                )}
                <div className="text-xs text-slate-400 mt-1">
                  Yönetmen: <span className="text-slate-300">{film.director}</span>
                </div>

                {/* Synopsis */}
                <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                  {film.synopsis}
                </p>
              </div>

              {/* Action Button & IMDb link */}
              <div className="mt-4 pt-3 border-t border-slate-800 pl-2 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                  <Edit3 className="w-3 h-3" /> Veri Düzenle
                </span>

                <a
                  href={film.searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playButtonClick()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-[0_0_10px_rgba(168,85,247,0.4)] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <Clapperboard className="w-3.5 h-3.5" />
                  <span>IMDb / Fragman</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </ModalWrapper>
  );
};
