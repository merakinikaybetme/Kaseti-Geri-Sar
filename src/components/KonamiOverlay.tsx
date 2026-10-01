/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Gamepad2, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { playKonamiVictory, playButtonClick } from '../utils/audio.ts';

interface KonamiOverlayProps {
  arcadeMode: boolean;
  setArcadeMode: (active: boolean | ((prev: boolean) => boolean)) => void;
}

// Konami code: Up, Up, Down, Down, Left, Right, Left, Right, B, A
const TARGET_SEQUENCE = [
  'up',
  'up',
  'down',
  'down',
  'left',
  'right',
  'left',
  'right',
  'b',
  'a',
];

export const KonamiOverlay: React.FC<KonamiOverlayProps> = ({
  arcadeMode,
  setArcadeMode,
}) => {
  const bufferRef = useRef<string[]>([]);
  const [showCelebrationModal, setShowCelebrationModal] = useState<boolean>(false);
  const celebrationTimeoutRef = useRef<number | null>(null);

  const fireArcadeCelebration = useCallback(() => {
    setArcadeMode(true);
    playKonamiVictory();
    setShowCelebrationModal(true);

    try {
      // Dual confetti cannons
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5, x: 0.2 },
        colors: ['#ff007f', '#00f3ff', '#ffe600', '#a855f7'],
      });
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5, x: 0.8 },
        colors: ['#ff007f', '#00f3ff', '#ffe600', '#a855f7'],
      });
    } catch {
      // Ignore if canvas is unsupported
    }

    if (celebrationTimeoutRef.current) {
      window.clearTimeout(celebrationTimeoutRef.current);
    }
    celebrationTimeoutRef.current = window.setTimeout(() => {
      setShowCelebrationModal(false);
    }, 4500);
  }, [setArcadeMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keystrokes when typing inside inputs or textareas
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      const code = e.code || '';
      const rawKey = e.key ? e.key.toLowerCase() : '';

      let matchedToken: string | null = null;

      // Check Arrow keys (handling e.code, e.key, numpad, etc.)
      if (
        code === 'ArrowUp' ||
        code === 'Numpad8' ||
        rawKey === 'arrowup' ||
        rawKey === 'up'
      ) {
        matchedToken = 'up';
      } else if (
        code === 'ArrowDown' ||
        code === 'Numpad2' ||
        rawKey === 'arrowdown' ||
        rawKey === 'down'
      ) {
        matchedToken = 'down';
      } else if (
        code === 'ArrowLeft' ||
        code === 'Numpad4' ||
        rawKey === 'arrowleft' ||
        rawKey === 'left'
      ) {
        matchedToken = 'left';
      } else if (
        code === 'ArrowRight' ||
        code === 'Numpad6' ||
        rawKey === 'arrowright' ||
        rawKey === 'right'
      ) {
        matchedToken = 'right';
      } else if (code === 'KeyB' || rawKey === 'b') {
        matchedToken = 'b';
      } else if (code === 'KeyA' || rawKey === 'a') {
        matchedToken = 'a';
      }

      if (!matchedToken) {
        // Any unrelated key resets the buffer
        bufferRef.current = [];
        return;
      }

      // Add to rolling buffer
      bufferRef.current.push(matchedToken);

      // Keep only up to TARGET_SEQUENCE.length elements
      if (bufferRef.current.length > TARGET_SEQUENCE.length) {
        bufferRef.current.shift();
      }

      // Check if full buffer matches the Konami sequence
      if (bufferRef.current.length === TARGET_SEQUENCE.length) {
        const isMatch = bufferRef.current.every(
          (val, idx) => val === TARGET_SEQUENCE[idx]
        );

        if (isMatch) {
          bufferRef.current = [];
          fireArcadeCelebration();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      if (celebrationTimeoutRef.current) {
        window.clearTimeout(celebrationTimeoutRef.current);
      }
    };
  }, [fireArcadeCelebration]);

  return (
    <>
      {/* Big Celebratory Popup when Konami Code is successfully entered */}
      {showCelebrationModal && (
        <div
          role="dialog"
          aria-live="polite"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn pointer-events-none"
        >
          <div className="bg-slate-950 border-4 border-yellow-400 p-6 sm:p-8 rounded-3xl shadow-[0_0_60px_rgba(250,204,21,0.8),inset_0_0_20px_rgba(250,204,21,0.3)] text-center max-w-md w-full relative pointer-events-auto animate-bounce">
            
            <div className="w-16 h-16 rounded-2xl bg-yellow-400 text-slate-950 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_#facc15]">
              <Gamepad2 className="w-10 h-10 animate-pulse" />
            </div>

            <div className="font-pixel text-yellow-400 text-sm sm:text-base tracking-widest mb-2">
              ★ KONAMI KODU KABUL EDİLDİ! ★
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
              ARCADE MODU AKTİF!
            </h3>

            <p className="text-xs sm:text-sm text-cyan-300 font-mono mb-4">
              ↑ ↑ ↓ ↓ ← → ← → B A tuşlandı!
              <br />
              Sayfa 1980’ler neon renk paletine geçti.
            </p>

            <div className="inline-block px-4 py-2 rounded-xl bg-red-600 text-white font-pixel text-xs animate-pulse tracking-wider">
              INSERT COIN • 2 CREDITS
            </div>

            <button
              onClick={() => setShowCelebrationModal(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs border border-slate-600 transition-colors cursor-pointer"
            >
              Tamam, Oynamaya Devam Et
            </button>
          </div>
        </div>
      )}

      {/* Floating Widget when Arcade Mode is turned ON */}
      {arcadeMode && (
        <aside
          aria-label="Arcade Modu Bildirimi"
          className="fixed bottom-5 right-5 z-40"
        >
          <div className="bg-slate-950/95 border-2 border-yellow-400 p-3 sm:p-4 rounded-2xl shadow-[0_0_30px_rgba(250,204,21,0.7)] flex items-center gap-3 font-pixel text-xs text-yellow-300">
            <div className="w-8 h-8 rounded-lg bg-yellow-400 text-slate-950 flex items-center justify-center font-bold">
              <Gamepad2 className="w-5 h-5 animate-pulse" />
            </div>

            <div>
              <div className="text-white text-[11px] sm:text-xs tracking-wider flex items-center gap-1.5">
                <span className="text-yellow-400">★ ARCADE MODU AKTİF ★</span>
              </div>
              <div className="text-red-400 text-[10px] mt-0.5 animate-pulse font-mono font-bold">
                INSERT COIN • 2 CREDITS
              </div>
            </div>

            <button
              onClick={() => {
                playButtonClick();
                setArcadeMode(false);
              }}
              className="ml-2 p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              title="Arcade Modunu Kapat"
              aria-label="Arcade Modunu Kapat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}
    </>
  );
};
