/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Gamepad2,
  Trophy,
  RotateCcw,
  Sparkles,
  Play,
  Pause,
  ArrowLeft,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { ModalWrapper } from './ModalWrapper.tsx';
import { ARCADE_GAMES } from '../../data/nostalgiaData.ts';
import { playArcadeDot, playArcadeBonus, playArcadeCoin, playButtonClick } from '../../utils/audio.ts';

interface ArcadeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FallingItem {
  id: number;
  x: number; // percentage 5% to 95%
  y: number; // percentage 0% to 100%
  speed: number;
  type: 'dot' | 'bonus' | 'hazard';
}

export const ArcadeModal: React.FC<ArcadeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'game' | 'lore'>('game');
  
  // Game State
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('80s_arcade_highscore');
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const [playerX, setPlayerX] = useState<number>(50); // percentage
  const [items, setItems] = useState<FallingItem[]>([]);
  const requestRef = useRef<number | null>(null);
  const lastSpawnTime = useRef<number>(0);

  // Keyboard navigation for paddle (Left / Right Arrow)
  useEffect(() => {
    if (!isOpen || !isGameActive || isGameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        setPlayerX((prev) => Math.max(8, prev - 7));
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        setPlayerX((prev) => Math.min(92, prev + 7));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isGameActive, isGameOver]);

  // Main Game Loop
  useEffect(() => {
    if (!isGameActive || isGameOver) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const gameLoop = (time: number) => {
      // Spawn item every 650ms
      if (time - lastSpawnTime.current > 650) {
        lastSpawnTime.current = time;
        const rand = Math.random();
        const type: 'dot' | 'bonus' | 'hazard' = rand > 0.85 ? 'bonus' : rand > 0.7 ? 'hazard' : 'dot';
        const newItem: FallingItem = {
          id: Math.random(),
          x: Math.floor(Math.random() * 84) + 8,
          y: 0,
          speed: type === 'hazard' ? 1.4 : type === 'bonus' ? 1.6 : 1.1,
          type,
        };
        setItems((prev) => [...prev, newItem]);
      }

      // Update positions & check collisions
      setItems((prevItems) => {
        const nextItems: FallingItem[] = [];

        for (const item of prevItems) {
          const nextY = item.y + item.speed * 1.2;

          // Check collision with player paddle (at y: 88% - 96%)
          if (nextY >= 86 && nextY <= 96 && Math.abs(item.x - playerX) < 11) {
            if (item.type === 'dot') {
              playArcadeDot();
              setScore((s) => {
                const ns = s + 10;
                if (ns > highScore) {
                  setHighScore(ns);
                  try {
                    localStorage.setItem('80s_arcade_highscore', ns.toString());
                  } catch {}
                }
                return ns;
              });
            } else if (item.type === 'bonus') {
              playArcadeBonus();
              setScore((s) => {
                const ns = s + 50;
                if (ns > highScore) {
                  setHighScore(ns);
                  try {
                    localStorage.setItem('80s_arcade_highscore', ns.toString());
                  } catch {}
                }
                return ns;
              });
            } else if (item.type === 'hazard') {
              // Game Over on hazard
              setIsGameOver(true);
              setIsGameActive(false);
              return [];
            }
            continue; // Item collected
          }

          if (nextY < 100) {
            nextItems.push({ ...item, y: nextY });
          }
        }
        return nextItems;
      });

      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isGameActive, isGameOver, playerX, highScore]);

  const startGame = () => {
    playArcadeCoin();
    setScore(0);
    setItems([]);
    setIsGameOver(false);
    setIsGameActive(true);
  };

  const stopGame = () => {
    playButtonClick();
    setIsGameActive(false);
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Atari & Piksel Dünyası: 8-Bit Çağ"
      subtitle="Jetonlu arcade salonları, evdeki kara kutu atariler ve neon piksel oyunları."
      badge="ARCADE 1980"
      icon={Gamepad2}
      accentColor="border-emerald-500/70"
      maxWidthClass="max-w-5xl"
    >
      <div className="space-y-6">
        
        {/* Navigation Tabs: Mini Game vs Game Lore */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => {
              playButtonClick();
              setActiveTab('game');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-pixel transition-all cursor-pointer ${
              activeTab === 'game'
                ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            ▶ PİKSEL AVCISI OYUNU
          </button>
          <button
            onClick={() => {
              playButtonClick();
              setActiveTab('lore');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-pixel transition-all cursor-pointer ${
              activeTab === 'lore'
                ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            ★ 80’LER OYUN KLASİKLERİ
          </button>
        </div>

        {/* TAB 1: PLAYABLE MINI GAME */}
        {activeTab === 'game' && (
          <div className="space-y-4">
            
            {/* Game Dashboard: Score, High Score & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900 rounded-2xl border border-slate-700 font-pixel text-xs">
              <div className="flex items-center gap-4">
                <span className="text-cyan-300">
                  SKOR: <span className="text-white text-sm">{score}</span>
                </span>
                <span className="text-amber-400 flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" /> REKOR: {highScore}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {!isGameActive ? (
                  <button
                    onClick={startGame}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)] transition-all cursor-pointer"
                  >
                    {isGameOver ? 'YENİDEN OYNA' : 'OYUNU BAŞLAT'}
                  </button>
                ) : (
                  <button
                    onClick={stopGame}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 transition-all cursor-pointer"
                  >
                    DURDUR
                  </button>
                )}
              </div>
            </div>

            {/* The CRT Arcade Screen Stage */}
            <div className="relative w-full h-[320px] sm:h-[380px] bg-slate-950 rounded-3xl border-4 border-slate-800 overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.9)] select-none">
              
              {/* Scanlines Overlay */}
              <div className="absolute inset-0 crt-scanlines pointer-events-none z-20" />

              {/* Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none" />

              {/* Start Screen Prompt */}
              {!isGameActive && !isGameOver && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/75 p-6 text-center">
                  <span className="font-pixel text-xl sm:text-2xl text-emerald-400 tracking-wider animate-pulse mb-3">
                    PİKSEL AVCISI
                  </span>
                  <p className="font-crt text-lg text-slate-300 max-w-md">
                    Yukarıdan düşen sarı neon noktaları ve kirazları topla!
                    <br />
                    Kırmızı virüslerden uzak dur.
                  </p>
                  <p className="text-xs font-mono text-cyan-300 mt-2">
                    Kontroller: Klavyeden Sol / Sağ Ok tuşları veya ekrandaki butonlar
                  </p>
                  <button
                    onClick={startGame}
                    className="mt-5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-pixel text-xs font-bold hover:scale-105 transition-all shadow-[0_0_15px_rgba(16,185,129,0.7)] cursor-pointer"
                  >
                    OYUNA BAŞLA (1P START)
                  </button>
                </div>
              )}

              {/* Game Over Screen */}
              {isGameOver && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/85 p-6 text-center">
                  <span className="font-pixel text-2xl text-rose-500 tracking-widest mb-2 animate-bounce">
                    GAME OVER!
                  </span>
                  <div className="font-pixel text-sm text-cyan-300 mb-1">
                    TOPLANAN SKOR: {score}
                  </div>
                  {score >= highScore && score > 0 && (
                    <div className="font-pixel text-xs text-yellow-400 mb-4 animate-pulse">
                      ★ YENİ REKOR KIRILDI! ★
                    </div>
                  )}
                  <button
                    onClick={startGame}
                    className="px-6 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-pixel text-xs transition-all shadow-[0_0_15px_rgba(236,72,153,0.5)] cursor-pointer"
                  >
                    TEKRAR DENE
                  </button>
                </div>
              )}

              {/* Falling Neon Items */}
              {items.map((item) => (
                <div
                  key={item.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-transform duration-75"
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                >
                  {item.type === 'dot' && (
                    <div className="w-4 h-4 rounded-sm bg-yellow-400 shadow-[0_0_10px_#facc15] border border-white" />
                  )}
                  {item.type === 'bonus' && (
                    <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-pink-500 to-rose-400 shadow-[0_0_15px_#f43f5e] flex items-center justify-center font-pixel text-[8px] text-white">
                      ★
                    </div>
                  )}
                  {item.type === 'hazard' && (
                    <div className="w-5 h-5 rounded-sm bg-red-600 shadow-[0_0_12px_#ef4444] border border-red-300 flex items-center justify-center font-pixel text-[9px] text-white">
                      ✕
                    </div>
                  )}
                </div>
              ))}

              {/* Player Paddle (Spaceship / Paddle) */}
              <div
                className="absolute bottom-4 -translate-x-1/2 z-20 transition-all duration-75"
                style={{ left: `${playerX}%` }}
              >
                <div className="w-16 h-4 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 rounded-md shadow-[0_0_15px_#22d3ee] border border-white flex items-center justify-center">
                  <div className="w-4 h-2 bg-slate-900 rounded-sm"></div>
                </div>
              </div>

            </div>

            {/* Mobile / Touch On-Screen Controls */}
            <div className="flex items-center justify-between gap-4 p-2">
              <button
                onClick={() => {
                  playButtonClick();
                  setPlayerX((prev) => Math.max(8, prev - 12));
                }}
                className="flex-1 py-3 rounded-2xl bg-slate-800 active:bg-slate-700 border border-slate-700 flex items-center justify-center gap-2 text-cyan-300 font-pixel text-xs cursor-pointer shadow-md"
              >
                <ArrowLeft className="w-4 h-4" /> SOLA
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  setPlayerX((prev) => Math.min(92, prev + 12));
                }}
                className="flex-1 py-3 rounded-2xl bg-slate-800 active:bg-slate-700 border border-slate-700 flex items-center justify-center gap-2 text-cyan-300 font-pixel text-xs cursor-pointer shadow-md"
              >
                SAĞA <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* TAB 2: 80s GAME CLASSICS LORE */}
        {activeTab === 'lore' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ARCADE_GAMES.map((game) => (
              <div
                key={game.id}
                className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-md"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-white">
                    {game.name}
                  </h3>
                  <span className="text-[10px] font-pixel text-amber-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    {game.releaseYear}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-emerald-400">
                  {game.publisher} • {game.genre}
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {game.description}
                </p>
                <div className="mt-3 text-[10px] font-pixel text-pink-400 tracking-wider">
                  {game.tagline}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </ModalWrapper>
  );
};
