/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Tv,
  Radio,
  Film,
  Gamepad2,
  Camera,
  PhoneCall,
  Calendar,
  Sparkles,
  ChevronRight,
  Package,
  Compass,
} from 'lucide-react';
import { ModalType } from '../types/index.ts';
import {
  playTvTurnOn,
  playCassetteClick,
  playVhsInsert,
  playArcadeCoin,
  playCameraShutter,
  playRotaryDial,
  playPaperTear,
  playBottleCapsJingle,
  playButtonClick,
} from '../utils/audio.ts';

interface NostalgiaRoomProps {
  onOpenStation: (station: NonNullable<ModalType>) => void;
  activeCalendarYear: number;
}

interface RoomObject {
  id: NonNullable<ModalType>;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  glowClass: string;
  description: string;
  positionHint: string;
  animationClass: string;
}

const ROOM_OBJECTS: RoomObject[] = [
  {
    id: 'tv',
    title: 'Tüplü Televizyon',
    category: 'TRT & Ekran Hatıraları',
    icon: Tv,
    accentColor: 'from-pink-500 to-rose-600',
    glowClass: 'hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] hover:border-pink-400',
    description: 'Dantelli örtüsüyle salonun baş köşesindeki tüplü TV.',
    positionHint: 'Salonun Baş Köşesi',
    animationClass: 'group-hover:animate-pulse',
  },
  {
    id: 'cassette',
    title: 'Çift Kasetçalar',
    category: 'Müzik & Kaset Rafı',
    icon: Radio,
    accentColor: 'from-cyan-500 to-blue-600',
    glowClass: 'hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:border-cyan-400',
    description: 'Makaraları dönen çift kasetçalar ve müzik rafı.',
    positionHint: 'Sehpa Üstü',
    animationClass: 'group-hover:rotate-1',
  },
  {
    id: 'vhs',
    title: 'VHS Kasetliği',
    category: 'Film Gecesi',
    icon: Film,
    accentColor: 'from-purple-500 to-indigo-600',
    glowClass: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:border-purple-400',
    description: 'Video kulübünden kiralanan renkli VHS kutuları.',
    positionHint: 'Televizyon Yanı',
    animationClass: 'group-hover:-translate-y-1',
  },
  {
    id: 'arcade',
    title: 'Atari / Piksel Konsolu',
    category: 'Piksel Dünyası',
    icon: Gamepad2,
    accentColor: 'from-emerald-500 to-teal-600',
    glowClass: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] hover:border-emerald-400',
    description: 'Joystick ve kasetli atari konsolu.',
    positionHint: 'Oda Halısı Üstü',
    animationClass: 'group-hover:scale-105',
  },
  {
    id: 'polaroid',
    title: 'Polaroid Fotoğraf Albümü',
    category: 'Sarı Fotoğraflar',
    icon: Camera,
    accentColor: 'from-amber-500 to-orange-600',
    glowClass: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:border-amber-400',
    description: 'Üst üste duran anı fotoğrafları albümü.',
    positionHint: 'Dantelli Sehpa',
    animationClass: 'group-hover:-rotate-1',
  },
  {
    id: 'phone',
    title: 'Eski Çevirmeli Telefon',
    category: '80’lerden Mesaj',
    icon: PhoneCall,
    accentColor: 'from-rose-500 to-red-600',
    glowClass: 'hover:shadow-[0_0_25px_rgba(244,63,94,0.6)] hover:border-rose-400',
    description: 'Kırmızı kadranlı çevirmeli PTT telefonu.',
    positionHint: 'Telefon Sehpası',
    animationClass: 'group-hover:brightness-125',
  },
  {
    id: 'calendar',
    title: 'Saatli Duvar Takvimi',
    category: '1980–1989 Tünel',
    icon: Calendar,
    accentColor: 'from-yellow-400 to-amber-600',
    glowClass: 'hover:shadow-[0_0_25px_rgba(234,179,8,0.6)] hover:border-yellow-400',
    description: 'Duvara asılı yapraklı maarif takvimi.',
    positionHint: 'Duvar Panosu',
    animationClass: 'group-hover:translate-x-0.5',
  },
  {
    id: 'memorybox',
    title: 'Gazoz Kapağı / Hatıra Kutusu',
    category: 'Mahalle Anıları',
    icon: Package,
    accentColor: 'from-fuchsia-500 to-pink-600',
    glowClass: 'hover:shadow-[0_0_25px_rgba(217,70,239,0.6)] hover:border-fuchsia-400',
    description: 'Teneke kutuda saklanan gazoz kapakları ve anılar.',
    positionHint: 'Köşe Rafı',
    animationClass: 'group-hover:rotate-2',
  },
];

const STATIONS_LIST = [
  { id: 'tv', title: 'Tüplü Televizyon', subtitle: 'Ekran Hatıraları', badge: 'TRT & Çizgi Diziler', icon: Tv, accent: 'from-pink-500 to-rose-600', desc: 'He-Man, Susam Sokağı, Tsubasa, Bizimkiler ve tek kanallı günler.' },
  { id: 'cassette', title: 'Çift Kasetçalar', subtitle: 'Kaset Rafı', badge: 'Pop, Arabesk & Rock', icon: Radio, accent: 'from-cyan-500 to-blue-600', desc: 'Sezen Aksu, MFÖ, Müslüm Gürses, Barış Manço kaset rafı.' },
  { id: 'vhs', title: 'VHS Kasetliği', subtitle: 'Film Gecesi', badge: 'Video Kulübü', icon: Film, accent: 'from-purple-500 to-indigo-600', desc: 'Geleceğe Dönüş, E.T., Rocky IV ve Yeşilçam klasikleri.' },
  { id: 'arcade', title: 'Atari / Piksel Konsolu', subtitle: 'Piksel Dünyası', badge: 'Oyna & Skor Yap', icon: Gamepad2, accent: 'from-emerald-500 to-teal-600', desc: 'Pac-Man, Tetris, Space Invaders ve piksel avcısı mini oyunu.' },
  { id: 'polaroid', title: 'Polaroid Fotoğraf Albümü', subtitle: 'Sarı Hatıralar', badge: 'Fotoğraf Koleksiyonu', icon: Camera, accent: 'from-amber-500 to-orange-600', desc: 'Saklambaç, leblebi tozu, kırmızı çanta ve yazlık hatıraları.' },
  { id: 'phone', title: 'Eski Çevirmeli Telefon', subtitle: '80’lerden Mesaj Var', badge: 'Rastgele Nostalji', icon: PhoneCall, accent: 'from-rose-500 to-red-600', desc: 'Kırmızı çevirmeli PTT telefonuyla sokak sözleri.' },
  { id: 'calendar', title: 'Saatli Duvar Takvimi', subtitle: 'Yıllık Zaman Tüneli', badge: '1980 – 1989', icon: Calendar, accent: 'from-yellow-400 to-amber-600', desc: '1980–1989 arası teknoloji, sinema ve müzik tarihçesi.' },
  { id: 'memorybox', title: 'Gazoz Kapağı / Bakkal Kutusu', subtitle: 'Mahalle Hatıraları', badge: 'Kendi Anını Yaz', icon: Package, accent: 'from-fuchsia-500 to-pink-600', desc: 'Kendi 80’ler çocukluk hatıranı ekle ve sakla.' },
];

export const NostalgiaRoom: React.FC<NostalgiaRoomProps> = ({
  onOpenStation,
  activeCalendarYear,
}) => {
  const [viewMode, setViewMode] = useState<'room' | 'grid'>('room');

  const handleSelect = (id: NonNullable<ModalType>) => {
    switch (id) {
      case 'tv':
        playTvTurnOn();
        break;
      case 'cassette':
        playCassetteClick();
        break;
      case 'vhs':
        playVhsInsert();
        break;
      case 'arcade':
        playArcadeCoin();
        break;
      case 'polaroid':
        playCameraShutter();
        break;
      case 'phone':
        playRotaryDial();
        break;
      case 'calendar':
        playPaperTear();
        break;
      case 'memorybox':
        playBottleCapsJingle();
        break;
      default:
        playButtonClick();
    }
    onOpenStation(id);
  };

  return (
    <section id="nostalji-odasi" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-pixel mb-2">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>İNTERAKTİF NOSTALJİ ODASI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            1980’ler Türkiye Salonu
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
            Aşağıdaki 8 nostaljik objeden dilediğine dokunarak o dönemin şarkılarına, filmlerine, oyunlarına ve hatıralarına açılan kapıları arala.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-700/80 self-start md:self-auto">
          <button
            onClick={() => {
              playButtonClick();
              setViewMode('room');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'room'
                ? 'bg-pink-600 text-white shadow-[0_0_12px_rgba(236,72,153,0.6)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Salon Sahnesi
          </button>
          <button
            onClick={() => {
              playButtonClick();
              setViewMode('grid');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-pink-600 text-white shadow-[0_0_12px_rgba(236,72,153,0.6)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Liste Görünümü
          </button>
        </div>
      </div>

      {/* 1. Salon Sahnesi */}
      {viewMode === 'room' && (
        <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#141b33] via-[#0d1426] to-[#070b16] border-2 border-slate-700/80 p-5 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
          
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[repeating-linear-gradient(45deg,#ec4899_0,#ec4899_2px,transparent_0,transparent_20px)]" />

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-24 sm:h-32 bg-gradient-to-t from-red-950/50 via-amber-950/25 to-transparent border-t-2 border-red-700/40 rounded-t-[3rem] pointer-events-none flex items-center justify-center">
            <span className="text-[11px] font-mono text-red-400/50 uppercase tracking-widest hidden sm:inline">
              ❖ GELENEKSEL TÜRK SALONU VE HALISI ❖
            </span>
          </div>

          <div className="text-center max-w-xl mx-auto mb-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/40 text-pink-300 text-xs font-pixel mb-2">
              <Compass className="w-3.5 h-3.5 text-cyan-300 animate-spin-slow" />
              <span>1980’LER EV ATMOSFERİ (SESLİ ETKİLEŞİM)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Salondaki Eşyalara Dokunarak Keşfedin
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Nesnelere tıklandığında kaset tıklaması, telefon çevirme sesi veya tüplü TV cızırtısı çalınır.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            {ROOM_OBJECTS.map((obj) => {
              const IconComp = obj.icon;
              return (
                <div
                  key={obj.id}
                  onClick={() => handleSelect(obj.id)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelect(obj.id);
                    }
                  }}
                  className={`group relative bg-slate-900/90 hover:bg-slate-800/95 rounded-2xl border-2 border-slate-700/80 p-4 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-pink-500/40 ${obj.glowClass} ${obj.animationClass}`}
                  aria-label={`${obj.title} nesnesini aç`}
                >
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <span className="text-[10px] font-pixel px-2 py-0.5 rounded-full bg-pink-600 text-white shadow-[0_0_10px_rgba(236,72,153,0.7)] opacity-0 group-hover:opacity-100 transition-opacity">
                      Keşfet
                    </span>
                  </div>

                  <div className="absolute top-3 left-3 text-[9px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {obj.positionHint}
                  </div>

                  <div className="my-6 flex flex-col items-center text-center">
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr ${obj.accentColor} p-0.5 shadow-lg group-hover:scale-110 transition-transform`}>
                      <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center text-white">
                        <IconComp className="w-8 h-8 sm:w-10 sm:h-10" />
                      </div>
                    </div>

                    <h4 className="mt-4 text-sm sm:text-base font-bold text-white group-hover:text-pink-300 transition-colors">
                      {obj.title}
                    </h4>
                    <span className="text-[11px] font-mono text-cyan-300 mt-0.5">
                      {obj.category}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-pink-400 group-hover:text-cyan-300 transition-colors">
                    <span className="text-[11px] text-slate-300 line-clamp-1">{obj.description}</span>
                    <ChevronRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Ses efektleri aktif (Kaset tıklaması, telefon çevirme, TV açılış sesi).</span>
            </div>
            <div className="text-slate-400 font-mono">
              Takvim Yılı: <span className="text-amber-400 font-bold">{activeCalendarYear}</span>
            </div>
          </div>

        </div>
      )}

      {/* 2. Liste Görünümü */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
          {STATIONS_LIST.map((station) => {
            const IconComp = station.icon;
            return (
              <div
                key={station.id}
                onClick={() => handleSelect(station.id as NonNullable<ModalType>)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(station.id as NonNullable<ModalType>);
                  }
                }}
                className="group relative flex items-start gap-4 p-5 rounded-2xl bg-slate-900/90 border-2 border-slate-800 hover:border-pink-500/50 hover:bg-slate-800/90 transition-all cursor-pointer shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-500/40"
              >
                <div className="absolute top-4 right-4 text-[10px] font-pixel px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40">
                  Dokun / Keşfet
                </div>

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${station.accent} p-0.5 shrink-0 shadow-md`}>
                  <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center text-white">
                    <IconComp className="w-7 h-7" />
                  </div>
                </div>

                <div className="flex-1 pr-20">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-white group-hover:text-pink-300 transition-colors">
                      {station.title}
                    </h3>
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-cyan-500/30">
                      {station.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {station.desc}
                  </p>
                  <div className="mt-2 text-xs font-semibold text-pink-400 group-hover:text-cyan-300 flex items-center gap-1">
                    <span>Paneli Görüntüle</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};
