/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Tv, Search, ExternalLink, Sparkles, Filter, Edit3 } from 'lucide-react';
import { ModalWrapper } from './ModalWrapper.tsx';
import { TV_MEMORIES } from '../../data/nostalgiaData.ts';
import { playButtonClick, playTvChannelStatic } from '../../utils/audio.ts';

interface TvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = ['Tümü', 'Çizgi Film', 'Dizi', 'Program', 'TRT Klasiği'] as const;

export const TvModal: React.FC<TvModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMemories = useMemo(() => {
    return TV_MEMORIES.filter((item) => {
      const matchesCat = selectedCategory === 'Tümü' || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.trivia.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Tüplü Televizyon: Ekran Hatıraları"
      subtitle="Tek kanal TRT günlerinden renkli yayına, Cumartesi sabahı çizgi filmlerinden Pazar dizilerine."
      badge="TRT 1 & TRT 2"
      icon={Tv}
      accentColor="border-pink-500/70"
      maxWidthClass="max-w-5xl"
    >
      <div className="space-y-6">
        
        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playTvChannelStatic();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-pink-600 text-white shadow-[0_0_12px_rgba(236,72,153,0.5)]'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Dizi veya çizgi film ara..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        {/* Informational Banner */}
        <div className="p-3.5 rounded-2xl bg-pink-950/30 border border-pink-500/30 flex items-start gap-3 text-xs text-pink-200">
          <Sparkles className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Telif haklarına uygun olarak tüm videolar resmî YouTube arama ve arşiv kaynaklarına yönlendirilir.
            <span className="inline-flex items-center gap-1 ml-1 text-pink-300 font-mono">
              [<Edit3 className="w-3 h-3 inline" /> Bağlantıyı src/data/nostalgiaData.ts üzerinden düzenleyebilirsiniz]
            </span>
          </p>
        </div>

        {/* TV Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMemories.map((item) => (
            <div
              key={item.id}
              className="group bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-pink-500/50 p-5 flex flex-col justify-between transition-all hover:bg-slate-800/80 shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-pink-300 transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-[11px] font-mono text-cyan-300">
                      {item.years}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-pink-400 border border-pink-500/30 shrink-0">
                    {item.category}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mt-2">
                  {item.description}
                </p>

                {/* Trivia / Hatıra Notu */}
                <div className="mt-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-amber-200/90 flex items-start gap-2">
                  <span className="font-bold text-amber-400 shrink-0">Biliyor muydunuz?</span>
                  <p>{item.trivia}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1" title="Veri dosyasından bağlantıyı özelleştirebilirsiniz">
                  <Edit3 className="w-3 h-3 text-slate-400" /> Bağlantıyı düzenle
                </span>

                <a
                  href={item.searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playButtonClick()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold shadow-[0_0_10px_rgba(236,72,153,0.4)] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  <span>{item.searchLabel}</span>
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
