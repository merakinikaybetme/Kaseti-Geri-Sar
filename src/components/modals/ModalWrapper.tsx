/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { playButtonClick } from '../../utils/audio.ts';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: React.ComponentType<{ className?: string }>;
  accentColor?: string;
  children: React.ReactNode;
  maxWidthClass?: string;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  icon: IconComp,
  accentColor = 'border-pink-500',
  children,
  maxWidthClass = 'max-w-4xl',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC key and trap focus
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        playButtonClick();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Focus the modal container
    modalRef.current?.focus();

    // Prevent background scrolling while modal is active
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playButtonClick();
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`relative w-full ${maxWidthClass} my-auto rounded-3xl bg-[#0b101f] border-2 ${accentColor} shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(236,72,153,0.25)] overflow-hidden focus:outline-none flex flex-col max-h-[90vh]`}
      >
        {/* Subtle CRT Scanlines inside modal */}
        <div className="absolute inset-0 crt-scanlines pointer-events-none z-10 opacity-30" />

        {/* Modal Header */}
        <div className="relative z-20 px-5 sm:px-8 py-5 border-b border-slate-800 bg-[#0d1428] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {IconComp && (
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
                <IconComp className="w-5 h-5" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {title}
                </h2>
                {badge && (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-cyan-500/40">
                    {badge}
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="text-xs text-slate-400 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Close button with ESC tip */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
              ESC ile Kapat
            </span>
            <button
              onClick={() => {
                playButtonClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-500/50 text-slate-400 hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Pencereyi Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Scrollable Area */}
        <div className="relative z-20 p-5 sm:p-8 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};
