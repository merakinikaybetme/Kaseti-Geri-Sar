/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Radio,
  Play,
  Pause,
  RotateCcw,
  ExternalLink,
  Music,
  Disc3,
  Edit3,
} from 'lucide-react';
import { ModalWrapper } from './ModalWrapper.tsx';
import { CASSETTE_TRACKS } from '../../data/nostalgiaData.ts';
import { CassetteCategory, CassetteTrack } from '../../types/index.ts';
import { playCassetteClick, playCassetteRewind, playButtonClick } from '../../utils/audio.ts';

interface CassetteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_NAMES: { id: CassetteCategory | 'tumu'; label: string }[] = [
  { id: 'tumu', label: 'Tüm Kasetler' },
  { id: 'turkce-pop', label: 'Türkçe Pop' },
  { id: 'arabesk', label: 'Arabesk' },
  { id: 'rock', label: 'Rock & Anadolu' },
  { id: 'yabanci', label: 'Yabancı Hit' },
  { id: 'cocukluk', label: 'Çocukluk' },
];

export const CassetteModal: React.FC<CassetteModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<CassetteCategory | 'tumu'>('tumu');
  const [activeTrack, setActiveTrack] = useState<CassetteTrack>(CASSETTE_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [tapeCounter, setTapeCounter] = useState<number>(12);
  const [isRewinding, setIsRewinding] = useState<boolean>(false);

  // Counter simulation while playing
  useEffect(() => {
    if (!isPlaying || isRewinding) return;
    const interval = setInterval(() => {
      setTapeCounter((prev) => (prev >= 999 ? 1 : prev + 1));
    }, 1200);
    return () => clearInterval(interval);
  }, [isPlaying, isRewinding]);

  const handleSelectTrack = (track: CassetteTrack) => {
    playCassetteClick();
    setActiveTrack(track);
    setIsPlaying(true);
    setIsRewinding(false);
  };

  const handleTogglePlay = () => {
    playCassetteClick();
    setIsPlaying((prev) => !prev);
  };

  const handleRewind = () => {
    playCassetteRewind();
    setIsRewinding(true);
    setIsPlaying(false);
    setTimeout(() => {
      setTapeCounter(0);
      setIsRewinding(false);
      setIsPlaying(true);
    }, 800);
  };

  const filteredTracks = CASSETTE_TRACKS.filter((track) => {
    if (selectedCategory === 'tumu') return true;
    return track.category === selectedCategory;
  });

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Kasetçalar: Kaset Rafı ve Müzik"
      subtitle="Çift kasetçalarlı teyp, kurşun kalemle kaset sarma günleri ve dönemin efsanevi albümleri."
      badge="HI-FI STEREO"
      icon={Radio}
      accentColor="border-cyan-500/70"
      maxWidthClass="max-w-5xl"
    >
      <div className="space-y-6">
        
        {/* ======================================================== */}
        {/* INTERACTIVE CASSETTE DECK / PLAYER AT THE TOP */}
        {/* ======================================================== */}
        <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-b from-[#182138] via-[#0f172a] to-[#080d1a] border-2 border-cyan-500/40 shadow-[0_10px_30px_rgba(6,182,212,0.25)]">
          
          {/* Deck Top Header: VU Meters & Counter */}
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400">
                AUTO-REVERSE CASSETTE DECK
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-pixel ${
                isPlaying 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 animate-pulse'
                  : 'bg-slate-800 text-slate-500'
              }`}>
                {isPlaying ? 'PLAYING' : 'PAUSED'}
              </span>
            </div>

            {/* Tape Counter */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400">COUNTER</span>
              <div className="bg-black px-2 py-0.5 rounded border border-slate-700 font-pixel text-xs text-amber-400 tracking-widest">
                {tapeCounter.toString().padStart(3, '0')}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            
            {/* The Physical Cassette Tape Visual (col-span-8) */}
            <div className="md:col-span-8">
              <div className="relative p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-2 border-slate-700 shadow-xl overflow-hidden">
                
                {/* Screws in corners */}
                <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-slate-500 border border-slate-700 text-[6px] flex items-center justify-center">+</div>
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-slate-500 border border-slate-700 text-[6px] flex items-center justify-center">+</div>
                <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-slate-500 border border-slate-700 text-[6px] flex items-center justify-center">+</div>
                <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-slate-500 border border-slate-700 text-[6px] flex items-center justify-center">+</div>

                {/* Cassette Label Area */}
                <div 
                  className="rounded-xl p-3 border-2 text-slate-900 shadow-inner"
                  style={{
                    backgroundColor: activeTrack.labelColor,
                    borderColor: 'rgba(255,255,255,0.4)',
                  }}
                >
                  <div className="flex justify-between items-start text-xs font-mono font-bold text-white drop-shadow">
                    <span className="bg-black/40 px-2 py-0.5 rounded">SIDE A • 60 MIN</span>
                    <span className="bg-black/40 px-2 py-0.5 rounded font-pixel text-[9px]">{activeTrack.year}</span>
                  </div>

                  <div className="my-2 bg-white/95 rounded-lg p-2.5 shadow-sm border border-black/10">
                    <div className="font-hand font-bold text-xl sm:text-2xl text-slate-900 truncate leading-none">
                      {activeTrack.title}
                    </div>
                    <div className="text-xs font-sans font-semibold text-slate-700 mt-1">
                      {activeTrack.artist} — <span className="italic">{activeTrack.album}</span>
                    </div>
                  </div>
                </div>

                {/* Cassette Tape Spools Window */}
                <div className="mt-3 bg-black/80 rounded-xl p-2.5 border border-slate-700 flex items-center justify-around relative">
                  
                  {/* Left Spool */}
                  <div className="relative flex items-center justify-center">
                    <div className={`w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-500 flex items-center justify-center shadow-inner ${
                      isPlaying ? 'animate-spin-slow' : isRewinding ? 'animate-spin' : ''
                    }`}>
                      <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-600 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 ml-2">L</span>
                  </div>

                  {/* Center Tape Window / Ribbon */}
                  <div className="h-6 w-24 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 rounded flex items-center justify-center border border-amber-900/60 shadow-inner">
                    <span className="text-[9px] font-mono text-amber-500/80 tracking-widest">
                      === TAPE ===
                    </span>
                  </div>

                  {/* Right Spool */}
                  <div className="relative flex items-center justify-center">
                    <span className="text-[9px] font-mono text-slate-500 mr-2">R</span>
                    <div className={`w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-500 flex items-center justify-center shadow-inner ${
                      isPlaying ? 'animate-spin-slow' : isRewinding ? 'animate-spin' : ''
                    }`}>
                      <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-600 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Deck Controls & Equalizer Bars (col-span-4) */}
            <div className="md:col-span-4 flex flex-col justify-between space-y-4">
              
              {/* Graphic Equalizer Simulation */}
              <div className="p-3 bg-black/80 rounded-2xl border border-slate-700/80">
                <div className="flex justify-between items-center mb-1.5 text-[9px] font-mono text-cyan-400">
                  <span>EQ STEREO</span>
                  <span>{isPlaying ? 'ACTIVE' : 'IDLE'}</span>
                </div>
                <div className="flex items-end justify-between gap-1 h-12">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex-1 bg-slate-900 rounded-t flex flex-col justify-end h-full">
                      <div
                        className={`w-full rounded-t transition-all duration-150 ${
                          isPlaying
                            ? 'bg-gradient-to-t from-cyan-500 via-pink-500 to-yellow-400'
                            : 'bg-slate-700 h-1'
                        }`}
                        style={{
                          height: isPlaying ? `${Math.floor(20 + Math.sin((i + tapeCounter) * 1.5) * 45 + 35)}%` : '4px',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Physical Transport Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleTogglePlay}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs transition-all cursor-pointer ${
                    isPlaying
                      ? 'bg-pink-600 border-pink-400 text-white shadow-[0_0_12px_rgba(236,72,153,0.5)]'
                      : 'bg-slate-800 border-slate-600 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'DURAKLAT' : 'ÇAL'}</span>
                </button>

                <button
                  onClick={handleRewind}
                  disabled={isRewinding}
                  className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 flex items-center justify-center gap-2 font-bold text-xs transition-all cursor-pointer disabled:opacity-50"
                  title="Kaseti Başa Sar (Kalemle sarma hissi!)"
                >
                  <RotateCcw className={`w-4 h-4 ${isRewinding ? 'animate-spin' : ''}`} />
                  <span>{isRewinding ? 'SARIYOR...' : 'GERİ SAR'}</span>
                </button>
              </div>

              {/* External YouTube Search / Listen Link */}
              <a
                href={activeTrack.searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playButtonClick()}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all cursor-pointer"
              >
                <Music className="w-3.5 h-3.5" />
                <span>YouTube’da Parçayı Ara & Dinle</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

            </div>

          </div>

        </div>

        {/* ======================================================== */}
        {/* CASSETTE RACK (KASET RAFI) SELECTION */}
        {/* ======================================================== */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Disc3 className="w-5 h-5 text-cyan-400" />
                <span>Kaset Rafı (Takmak için kasete tıkla)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Seçtiğin kaset yukarıdaki teybe takılır; spools döner ve detaylar yüklenir.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {CATEGORY_NAMES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    playButtonClick();
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                      : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Cassettes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredTracks.map((track) => {
              const isSelected = track.id === activeTrack.id;
              return (
                <div
                  key={track.id}
                  onClick={() => handleSelectTrack(track)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectTrack(track);
                    }
                  }}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-[1.02]'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-600 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-bold text-white leading-tight">
                        {track.title}
                      </div>
                      <div className="text-xs text-cyan-300 font-medium mt-0.5">
                        {track.artist}
                      </div>
                    </div>
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: track.labelColor }}
                    />
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>{track.year} • {track.duration}</span>
                    <span className="text-cyan-400 font-semibold group-hover:underline">
                      {isSelected ? 'Teypte Takılı' : 'Teybe Tak ▶'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 text-center">
            <span className="text-[11px] font-mono text-slate-500 inline-flex items-center gap-1">
              <Edit3 className="w-3.5 h-3.5" /> Şarkı listesi src/data/nostalgiaData.ts üzerinden kolayca genişletilebilir.
            </span>
          </div>

        </div>

      </div>
    </ModalWrapper>
  );
};
