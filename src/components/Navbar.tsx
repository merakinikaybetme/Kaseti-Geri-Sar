/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Volume1,
  VolumeX,
  Gamepad2,
  Tv,
  Clock,
  BookOpen,
} from 'lucide-react';
import {
  setMuted,
  getIsMuted,
  setVolume,
  getVolume,
  playButtonClick,
} from '../utils/audio.ts';

interface NavbarProps {
  arcadeMode: boolean;
  onToggleArcade: () => void;
  onOpenStation: (
    station:
      | 'tv'
      | 'cassette'
      | 'vhs'
      | 'arcade'
      | 'polaroid'
      | 'phone'
      | 'calendar'
      | 'memorybox'
  ) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  arcadeMode,
  onToggleArcade,
  onOpenStation,
}) => {
  const [muted, setLocalMuted] = useState<boolean>(getIsMuted());
  const [volume, setLocalVolume] = useState<number>(getVolume());
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);
  const volumeControlRef = useRef<HTMLDivElement>(null);

  // Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        volumeControlRef.current &&
        !volumeControlRef.current.contains(e.target as Node)
      ) {
        setShowVolumeSlider(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleMute = () => {
    const nextState = !muted;
    setLocalMuted(nextState);
    setMuted(nextState);
    if (!nextState) {
      playButtonClick();
    }
  };

  const handleVolumeChange = (newVal: number) => {
    const clamped = Math.max(0, Math.min(1, newVal));
    setLocalVolume(clamped);
    setVolume(clamped);
    if (muted && clamped > 0) {
      setLocalMuted(false);
      setMuted(false);
    }
  };

  const getVolumeIcon = () => {
    if (muted || volume === 0) {
      return <VolumeX className="w-4 h-4 text-slate-400" />;
    }
    if (volume < 0.45) {
      return <Volume1 className="w-4 h-4 text-pink-300" />;
    }
    return <Volume2 className="w-4 h-4 text-pink-300" />;
  };

  const volumePercent = muted ? 0 : Math.round(volume * 100);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#070b16]/90 border-b border-pink-500/20 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            playButtonClick();
          }}
          className="flex items-center gap-2 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-lg p-1 shrink-0"
          aria-label="80'ler Kaseti Geri Sar Ana Sayfa"
        >
          {/* Cassette Tape Mini Icon */}
          <div className="relative w-8 h-5 sm:w-9 sm:h-6 bg-slate-800 border-2 border-pink-500 rounded flex items-center justify-center shadow-[0_0_10px_rgba(236,72,153,0.4)] group-hover:scale-105 transition-transform">
            <div className="w-4 h-2.5 sm:w-5 sm:h-3 bg-slate-950 rounded-sm flex items-center justify-between px-0.5">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full border border-pink-400"></span>
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full border border-cyan-400"></span>
            </div>
          </div>
          <div>
            <span className="text-sm sm:text-lg font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 drop-shadow">
              80’LER
            </span>
            <span className="text-[10px] sm:text-xs text-cyan-300/80 block -mt-1 font-mono tracking-widest">
              KASETİ GERİ SAR
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 px-1 scrollbar-none text-xs font-medium">
          <a
            href="#nostalji-odasi"
            onClick={() => playButtonClick()}
            className="px-2.5 sm:px-3 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/65 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Tv className="w-3.5 h-3.5 text-pink-400" />
            <span>Nostalji Odası</span>
          </a>
          <a
            href="#zaman-tuneli"
            onClick={() => playButtonClick()}
            className="px-2.5 sm:px-3 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/65 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Zaman Tüneli</span>
          </a>
          <button
            onClick={() => {
              playButtonClick();
              onOpenStation('memorybox');
            }}
            className="px-2.5 sm:px-3 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/65 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Anı Kutusu</span>
          </button>
        </nav>

        {/* Right Actions: Arcade & Global Volume Controller */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Arcade Mode Toggle */}
          <button
            onClick={() => {
              playButtonClick();
              onToggleArcade();
            }}
            className={`px-2 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-pixel flex items-center gap-1 transition-all cursor-pointer border ${
              arcadeMode
                ? 'bg-yellow-400 text-slate-950 border-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.7)] animate-pulse'
                : 'bg-slate-900/80 text-cyan-300 border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(6,182,212,0.4)]'
            }`}
            title="Konami Kodu / Arcade Modu: ↑↑↓↓←→←→BA"
            aria-label={arcadeMode ? 'Arcade Modunu Kapat' : 'Arcade Modunu Aç'}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {arcadeMode ? 'ARCADE: AKTİF' : 'ARCADE'}
            </span>
          </button>

          {/* Global Retro Volume Controller */}
          <div className="relative" ref={volumeControlRef}>
            <div className="flex items-center bg-slate-900/90 rounded-full border border-pink-500/40 p-0.5 shadow-[0_0_10px_rgba(236,72,153,0.25)]">
              {/* Mute / Unmute Button */}
              <button
                onClick={handleToggleMute}
                className="p-1.5 sm:p-2 rounded-full hover:bg-pink-900/30 transition-colors cursor-pointer flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-pink-400"
                title={muted ? 'Sesi Aç' : 'Sesi Kapat'}
                aria-label={muted ? 'Sesi Aç' : 'Sesi Kapat'}
              >
                {getVolumeIcon()}
              </button>

              {/* Volume Percentage / Toggle Slider Button */}
              <button
                onClick={() => {
                  playButtonClick();
                  setShowVolumeSlider((prev) => !prev);
                }}
                className="pr-2 sm:pr-2.5 pl-0.5 text-[10px] sm:text-xs font-mono font-bold text-cyan-300 hover:text-cyan-200 transition-colors cursor-pointer flex items-center gap-1"
                title="Ses Şiddetini Ayarla"
                aria-label={`Ses Düzeyi: %${volumePercent}`}
              >
                <span>%{volumePercent}</span>
              </button>
            </div>

            {/* Retro Volume Slider Popover */}
            {showVolumeSlider && (
              <div className="absolute right-0 top-12 w-52 p-3.5 rounded-2xl bg-[#0c1222] border-2 border-pink-500/60 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(236,72,153,0.3)] z-50 animate-fadeIn">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-pixel text-pink-300">
                    SES AYARI
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    %{volumePercent}
                  </span>
                </div>

                {/* Range Slider Track */}
                <div className="relative py-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={muted ? 0 : Math.round(volume * 100)}
                    onChange={(e) => {
                      const val = Number(e.target.value) / 100;
                      handleVolumeChange(val);
                    }}
                    onMouseUp={() => playButtonClick()}
                    onTouchEnd={() => playButtonClick()}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500 focus:outline-none"
                    aria-label="Ses şiddeti ayar kaydırıcısı"
                  />
                  {/* Subtle LED Volume Gauge */}
                  <div className="flex justify-between items-center px-0.5 mt-1 text-[8px] font-mono text-slate-500">
                    <span>%0</span>
                    <span>%50</span>
                    <span>%100</span>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="grid grid-cols-4 gap-1 mt-2 pt-2 border-t border-slate-800/80">
                  {[0, 30, 75, 100].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => {
                        handleVolumeChange(preset / 100);
                        playButtonClick();
                      }}
                      className={`py-1 text-[9px] font-pixel rounded-lg transition-all cursor-pointer ${
                        Math.round(volume * 100) === preset && !muted
                          ? 'bg-pink-600 text-white font-bold shadow-[0_0_8px_rgba(236,72,153,0.6)]'
                          : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      {preset === 0 ? 'SESSİZ' : `%${preset}`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
