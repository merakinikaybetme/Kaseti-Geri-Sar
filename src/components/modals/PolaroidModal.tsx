/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Camera, Calendar, MapPin, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { ModalWrapper } from './ModalWrapper.tsx';
import { POLAROID_PHOTOS } from '../../data/nostalgiaData.ts';
import { PolaroidPhoto } from '../../types/index.ts';
import { playCameraShutter, playButtonClick } from '../../utils/audio.ts';

interface PolaroidModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PolaroidModal: React.FC<PolaroidModalProps> = ({ isOpen, onClose }) => {
  const [activePhoto, setActivePhoto] = useState<PolaroidPhoto | null>(null);

  const handleSelectPhoto = (photo: PolaroidPhoto) => {
    playCameraShutter();
    setActivePhoto(photo);
  };

  const handleNextPhoto = () => {
    if (!activePhoto) return;
    playCameraShutter();
    const currentIndex = POLAROID_PHOTOS.findIndex((p) => p.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % POLAROID_PHOTOS.length;
    setActivePhoto(POLAROID_PHOTOS[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!activePhoto) return;
    playCameraShutter();
    const currentIndex = POLAROID_PHOTOS.findIndex((p) => p.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + POLAROID_PHOTOS.length) % POLAROID_PHOTOS.length;
    setActivePhoto(POLAROID_PHOTOS[prevIndex]);
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Polaroid Fotoğraf Albümü"
      subtitle="Sarı tonlu fotoğraflar, mahalle sokakları, siyah önlükler ve yazlık hatıraları."
      badge="KODAK & FUJI 1980s"
      icon={Camera}
      accentColor="border-amber-500/70"
      maxWidthClass="max-w-5xl"
    >
      <div className="space-y-6">
        
        {/* ENLARGED SINGLE PHOTO VIEW */}
        {activePhoto ? (
          <div className="flex flex-col items-center">
            
            {/* Close Zoom / Back to Album */}
            <div className="w-full flex items-center justify-between mb-4">
              <button
                onClick={() => {
                  playButtonClick();
                  setActivePhoto(null);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Albüme Geri Dön
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevPhoto}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
                  title="Önceki Fotoğraf"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
                  title="Sonraki Fotoğraf"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Vintage Polaroid Card Zoomed */}
            <div className="w-full max-w-lg bg-[#faf8f2] text-slate-900 p-4 sm:p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-amber-200/60 relative">
              
              {/* Fake Washi Tape at Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-amber-200/80 -rotate-2 shadow-sm rounded-sm backdrop-blur-xs border-y border-amber-300/60" />

              {/* Square Photo Art Container with Warm Retro Sepia/Film Texture */}
              <div className={`aspect-square w-full rounded-xl bg-gradient-to-tr ${activePhoto.aspectColor} bg-slate-900 border-2 border-amber-950/20 p-5 flex flex-col justify-between shadow-inner relative overflow-hidden`}>
                
                {/* Vintage Vignette and Dust Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

                <div className="flex justify-between items-start z-10">
                  <span className="px-2.5 py-1 rounded bg-black/60 text-amber-300 text-xs font-mono font-bold border border-amber-500/30">
                    {activePhoto.category}
                  </span>
                  <span className="text-white/80 font-mono text-xs flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded">
                    <Calendar className="w-3 h-3 text-amber-300" /> {activePhoto.dateLabel}
                  </span>
                </div>

                <div className="z-10 my-auto text-center p-4">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-md">
                    {activePhoto.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-100/90 mt-2 max-w-sm mx-auto leading-relaxed drop-shadow">
                    {activePhoto.caption}
                  </p>
                </div>

                <div className="z-10 flex items-center justify-between text-[11px] font-mono text-white/70">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" /> {activePhoto.location}
                  </span>
                  <span className="font-pixel text-[9px] text-amber-300">ISO 400</span>
                </div>
              </div>

              {/* Bottom White Margin with Handwritten Note */}
              <div className="pt-4 text-center">
                <p className="font-hand font-bold text-2xl sm:text-3xl text-slate-800 leading-tight">
                  {activePhoto.handwrittenNote}
                </p>
                <div className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-widest">
                  Hatıra Arşivi • {activePhoto.dateLabel}
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* POLAROID ALBUM GRID VIEW */
          <div>
            <p className="text-xs text-slate-300 mb-5">
              Büyütmek ve arkasındaki el yazısı notu okumak için herhangi bir fotoğrafa dokunun.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {POLAROID_PHOTOS.map((photo, idx) => {
                // Subtle random-looking rotation angle for realistic desk stack
                const angles = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2'];
                const angleClass = angles[idx % angles.length];

                return (
                  <div
                    key={photo.id}
                    onClick={() => handleSelectPhoto(photo)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectPhoto(photo);
                      }
                    }}
                    className={`group bg-[#faf8f2] text-slate-900 p-3 rounded-xl border border-amber-200/60 shadow-lg hover:shadow-[0_15px_30px_rgba(245,158,11,0.25)] hover:scale-105 transition-all duration-300 cursor-pointer ${angleClass} flex flex-col justify-between`}
                  >
                    {/* Photo Visual */}
                    <div className={`aspect-square w-full rounded-lg bg-gradient-to-tr ${photo.aspectColor} bg-slate-900 border border-slate-900/10 p-3 flex flex-col justify-between relative overflow-hidden`}>
                      <span className="text-[10px] font-mono text-amber-300 self-end bg-black/60 px-1.5 py-0.5 rounded">
                        {photo.dateLabel}
                      </span>
                      <div className="my-auto text-center">
                        <div className="text-xs sm:text-sm font-bold text-white leading-tight drop-shadow">
                          {photo.title}
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-slate-300 truncate">
                        {photo.location}
                      </span>
                    </div>

                    {/* Handwritten Caption at Bottom */}
                    <div className="pt-2 text-center">
                      <span className="font-hand font-bold text-base sm:text-lg text-slate-800 line-clamp-1">
                        {photo.handwrittenNote}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </ModalWrapper>
  );
};
