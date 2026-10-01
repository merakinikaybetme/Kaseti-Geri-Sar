/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroTV } from './components/HeroTV.tsx';
import { NostalgiaRoom } from './components/NostalgiaRoom.tsx';
import { TimeTunnel } from './components/TimeTunnel.tsx';
import { Footer } from './components/Footer.tsx';
import { KonamiOverlay } from './components/KonamiOverlay.tsx';

// Modals
import { TvModal } from './components/modals/TvModal.tsx';
import { CassetteModal } from './components/modals/CassetteModal.tsx';
import { VhsModal } from './components/modals/VhsModal.tsx';
import { ArcadeModal } from './components/modals/ArcadeModal.tsx';
import { PolaroidModal } from './components/modals/PolaroidModal.tsx';
import { PhoneModal } from './components/modals/PhoneModal.tsx';
import { CalendarModal } from './components/modals/CalendarModal.tsx';
import { MemoryBoxModal } from './components/modals/MemoryBoxModal.tsx';

import { ModalType } from './types/index.ts';
import confetti from 'canvas-confetti';
import { playKonamiVictory } from './utils/audio.ts';

export default function App() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedYear, setSelectedYear] = useState<number>(1984);
  const [arcadeMode, setArcadeMode] = useState<boolean>(false);

  const handleToggleArcade = () => {
    if (!arcadeMode) {
      playKonamiVictory();
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#ff007f', '#00f3ff', '#ffe600', '#a855f7'],
        });
      } catch {}
      setArcadeMode(true);
    } else {
      setArcadeMode(false);
    }
  };

  const handleOpenStation = (station: NonNullable<ModalType>) => {
    setActiveModal(station);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleEnterRoom = () => {
    const el = document.getElementById('nostalji-odasi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      arcadeMode
        ? 'bg-[#09021a] text-yellow-100 selection:bg-yellow-400 selection:text-black'
        : 'bg-[#070b16] text-slate-100'
    }`}>
      
      {/* Arcade Mode Top Marquee Banner when active */}
      {arcadeMode && (
        <div className="w-full bg-yellow-400 text-slate-950 font-pixel text-xs py-2 px-4 text-center font-bold tracking-widest shadow-[0_0_20px_#facc15] sticky top-0 z-50 animate-pulse">
          ★★★ INSERT COIN • ARCADE MODU AKTİF • 1980S HYPER-NEON ★★★
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        arcadeMode={arcadeMode}
        onToggleArcade={handleToggleArcade}
        onOpenStation={handleOpenStation}
      />

      <main>
        {/* Section 1: Opening Screen (CRT Television & Hero) */}
        <HeroTV onEnterRoom={handleEnterRoom} />

        {/* Section 2: Interactive Nostalgia Room (8 Clickable Stations) */}
        <NostalgiaRoom
          onOpenStation={handleOpenStation}
          activeCalendarYear={selectedYear}
        />

        {/* Section 3: Time Tunnel (1980 - 1989) */}
        <TimeTunnel
          selectedYear={selectedYear}
          onSelectYear={setSelectedYear}
          onOpenCalendarModal={() => setActiveModal('calendar')}
        />
      </main>

      {/* Modals for 8 Stations */}
      <TvModal
        isOpen={activeModal === 'tv'}
        onClose={handleCloseModal}
      />

      <CassetteModal
        isOpen={activeModal === 'cassette'}
        onClose={handleCloseModal}
      />

      <VhsModal
        isOpen={activeModal === 'vhs'}
        onClose={handleCloseModal}
      />

      <ArcadeModal
        isOpen={activeModal === 'arcade'}
        onClose={handleCloseModal}
      />

      <PolaroidModal
        isOpen={activeModal === 'polaroid'}
        onClose={handleCloseModal}
      />

      <PhoneModal
        isOpen={activeModal === 'phone'}
        onClose={handleCloseModal}
      />

      <CalendarModal
        isOpen={activeModal === 'calendar'}
        onClose={handleCloseModal}
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
      />

      <MemoryBoxModal
        isOpen={activeModal === 'memorybox'}
        onClose={handleCloseModal}
      />

      {/* Konami Easter Egg Controller */}
      <KonamiOverlay
        arcadeMode={arcadeMode}
        setArcadeMode={setArcadeMode}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
