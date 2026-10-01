/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Trash2,
  AlertTriangle,
  Sparkles,
  Calendar,
  User,
  Tag,
  Check,
} from 'lucide-react';
import { ModalWrapper } from './ModalWrapper.tsx';
import { INITIAL_MEMORIES } from '../../data/nostalgiaData.ts';
import { UserMemory } from '../../types/index.ts';
import { playButtonClick } from '../../utils/audio.ts';

interface MemoryBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = '80s_neighborhood_memories';

export const MemoryBoxModal: React.FC<MemoryBoxModalProps> = ({ isOpen, onClose }) => {
  const [memories, setMemories] = useState<UserMemory[]>([]);
  const [isConfirmingClearAll, setIsConfirmingClearAll] = useState<boolean>(false);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Form State
  const [author, setAuthor] = useState('');
  const [era, setEra] = useState('1985 Yazı');
  const [tag, setTag] = useState('Mahalle Oyunu');
  const [memoryText, setMemoryText] = useState('');
  const [formError, setFormError] = useState('');

  // Load from localStorage safely
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMemories(parsed);
          return;
        }
      }
      // If nothing saved, initialize with sample starters
      setMemories(INITIAL_MEMORIES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MEMORIES));
    } catch {
      // In case localStorage is blocked or corrupted
      setMemories(INITIAL_MEMORIES);
    }
  }, []);

  const saveMemories = (newList: UserMemory[]) => {
    setMemories(newList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    } catch (e) {
      console.warn('localStorage could not be updated:', e);
    }
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memoryText.trim()) {
      setFormError('Lütfen anınızı yazınız.');
      return;
    }

    const newMemory: UserMemory = {
      id: 'mem-' + Date.now(),
      author: author.trim() || 'Gizli Mahalleli',
      era: era.trim() || '1980’ler',
      tag: tag.trim() || 'Hatıra',
      memoryText: memoryText.trim(),
      createdAt: Date.now(),
    };

    const updated = [newMemory, ...memories];
    saveMemories(updated);
    playButtonClick();

    // Reset Form
    setMemoryText('');
    setAuthor('');
    setFormError('');
    setShowAddForm(false);
  };

  const handleDeleteSingle = (id: string) => {
    playButtonClick();
    const updated = memories.filter((m) => m.id !== id);
    saveMemories(updated);
  };

  const handleClearAll = () => {
    playButtonClick();
    saveMemories([]);
    setIsConfirmingClearAll(false);
  };

  const handleRestoreSamples = () => {
    playButtonClick();
    saveMemories(INITIAL_MEMORIES);
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Gazoz Kapağı Kutusu: Mahalle Hatıraları"
      subtitle="Bakkaldan alınan Elvan gazoz kapakları, teneke kutularda saklanan sırlar ve sizin çocukluk anılarınız."
      badge="ANILAR KUTUSU"
      icon={Package}
      accentColor="border-fuchsia-500/70"
      maxWidthClass="max-w-5xl"
    >
      <div className="space-y-6">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-fuchsia-950/30 border border-fuchsia-500/30">
          <div>
            <span className="text-xs font-mono font-bold text-fuchsia-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>TOPLAM HATIRA: {memories.length}</span>
            </span>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Yazdığınız anılar yalnızca kendi tarayıcınızın belleğinde (localStorage) güvenle saklanır.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!showAddForm ? (
              <button
                onClick={() => {
                  playButtonClick();
                  setShowAddForm(true);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-[0_0_12px_rgba(217,70,239,0.4)] transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Kendi Anını Ekle
              </button>
            ) : (
              <button
                onClick={() => {
                  playButtonClick();
                  setShowAddForm(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-700 cursor-pointer"
              >
                Vazgeç
              </button>
            )}

            {memories.length > 0 && !isConfirmingClearAll && (
              <button
                onClick={() => {
                  playButtonClick();
                  setIsConfirmingClearAll(true);
                }}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-slate-700 transition-all cursor-pointer"
                title="Tüm Anıları Temizle"
                aria-label="Tüm Anıları Temizle"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* CONFIRMATION DIALOG FOR CLEAR ALL */}
        {isConfirmingClearAll && (
          <div className="p-4 rounded-2xl bg-rose-950/80 border-2 border-rose-500 text-white flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-300 shrink-0" />
              <div>
                <div className="font-bold text-sm">Tüm anılar silinsin mi?</div>
                <div className="text-xs text-rose-200">
                  Bu işlem tüm kayıtlı gazoz kapağı hatıralarını tarayıcınızdan kalıcı olarak temizler.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => {
                  playButtonClick();
                  setIsConfirmingClearAll(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs cursor-pointer"
              >
                İptal Et
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Evet, Tümünü Sil
              </button>
            </div>
          </div>
        )}

        {/* NEW MEMORY CREATION FORM */}
        {showAddForm && (
          <form
            onSubmit={handleAddMemory}
            className="p-5 sm:p-6 rounded-2xl bg-slate-900 border-2 border-fuchsia-500/50 shadow-xl space-y-4 animate-fadeIn"
          >
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-fuchsia-400" />
              <span>Yeni 80’ler Hatırası Bırak</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Adınız veya Mahalle Lakabınız
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Örn: Leblebici Ahmet, Ayşe"
                  maxLength={30}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Yıl veya Mevsim
                </label>
                <input
                  type="text"
                  value={era}
                  onChange={(e) => setEra(e.target.value)}
                  placeholder="Örn: 1986 Yazı, 1983 Kışı"
                  maxLength={25}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">
                  Kategori
                </label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                >
                  <option value="Mahalle Oyunu">Mahalle Oyunu</option>
                  <option value="Bakkal & Gazoz">Bakkal & Gazoz</option>
                  <option value="Soba & Ev">Soba & Ev</option>
                  <option value="Kaset & Müzik">Kaset & Müzik</option>
                  <option value="Okul & Önlük">Okul & Önlük</option>
                  <option value="Televizyon">Televizyon</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                Hatıranız (Kısa ve Samimi)
              </label>
              <textarea
                value={memoryText}
                onChange={(e) => {
                  setMemoryText(e.target.value);
                  if (formError) setFormError('');
                }}
                rows={3}
                placeholder="Örn: Sokak lambaları yandığında annemin balkondan bağırdığı o son saklambaç turu..."
                maxLength={400}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none"
              />
              {formError && (
                <p className="text-xs text-rose-400 mt-1">{formError}</p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Kutuya At (Kaydet)
              </button>
            </div>
          </form>
        )}

        {/* MEMORIES LIST GRID */}
        {memories.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
            <Package className="w-12 h-12 text-slate-600 mx-auto" />
            <h4 className="text-base font-bold text-slate-300">
              Gazoz Kapağı Kutusu Boş
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Henüz kayıtlı bir hatıra yok. Kendi anınızı yazabilir veya başlangıç anılarını geri getirebilirsiniz.
            </p>
            <button
              onClick={handleRestoreSamples}
              className="mt-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-mono transition-all cursor-pointer"
            >
              Örnek Anıları Geri Getir
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {memories.map((mem) => (
              <div
                key={mem.id}
                className="group relative p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#141224] border border-slate-800 hover:border-fuchsia-500/50 transition-all shadow-md flex flex-col justify-between"
              >
                {/* Washi tape accent */}
                <div className="absolute -top-2 left-6 w-16 h-4 bg-fuchsia-500/20 border-x border-fuchsia-400/40 rounded-sm pointer-events-none" />

                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-fuchsia-600/30 border border-fuchsia-400/40 flex items-center justify-center text-fuchsia-300 text-[10px] font-bold">
                        {mem.author.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-xs font-bold text-white">
                        {mem.author}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-amber-500/30">
                        {mem.era}
                      </span>
                      <button
                        onClick={() => handleDeleteSingle(mem.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
                        title="Bu anıyı sil"
                        aria-label="Anıyı Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-200 font-sans leading-relaxed mt-2 whitespace-pre-wrap">
                    “{mem.memoryText}”
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="text-fuchsia-400 font-semibold">#{mem.tag}</span>
                  <span>Gazoz Kapağı Koleksiyonu</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </ModalWrapper>
  );
};
