/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUp, Heart, Sparkles, Tv, Radio, Gamepad2, Disc } from 'lucide-react';
import { playButtonClick } from '../utils/audio.ts';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    playButtonClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-slate-800 bg-[#050812] text-slate-400 py-12 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Decorative top neon line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">
        
        {/* Cassette Tape Decorative Badge */}
        <div className="flex items-center gap-2 text-pink-400 font-pixel text-xs tracking-wider">
          <Disc className="w-4 h-4 animate-spin-slow text-cyan-400" />
          <span>SIDE B • TRACK COMPLETED</span>
        </div>

        {/* Required Main Slogan */}
        <div className="max-w-2xl">
          <p className="text-lg sm:text-xl font-bold font-mono text-white tracking-wide leading-relaxed">
            “80’ler: Kaseti Geri Sar — Hatıralar yeniden oynatılmaz, ama yeniden hissedilebilir.”
          </p>
        </div>

        {/* Required Legal / External Links Note */}
        <div className="max-w-xl text-xs text-slate-500 leading-relaxed font-sans">
          <p>
            Film, video ve müzik bağlantıları harici ve ilgili içerik sahiplerinin platformlarına yönlendirir.
          </p>
          <p className="text-[11px] text-slate-600 mt-1">
            Konami Kodu Easter Egg: Klavyeden <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">↑ ↑ ↓ ↓ ← → ← → B A</kbd> tuşlayın.
          </p>
        </div>

        {/* Quick Links & Back to Top */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
          <a
            href="#nostalji-odasi"
            onClick={() => playButtonClick()}
            className="hover:text-cyan-300 transition-colors"
          >
            Nostalji Odası
          </a>
          <span>•</span>
          <a
            href="#zaman-tuneli"
            onClick={() => playButtonClick()}
            className="hover:text-pink-300 transition-colors"
          >
            Zaman Tüneli (1980–1989)
          </a>
          <span>•</span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <span>Başa Dön</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-4 border-t border-slate-900 w-full text-[11px] text-slate-600 font-mono">
          © 1980’ler Nostalji Deneyimi • Tamamen Türkçe & İnteraktif Web Projesi
        </div>

      </div>
    </footer>
  );
};
