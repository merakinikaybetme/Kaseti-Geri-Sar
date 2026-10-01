/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ModalType = 
  | 'tv' 
  | 'cassette' 
  | 'vhs' 
  | 'arcade' 
  | 'polaroid' 
  | 'phone' 
  | 'calendar' 
  | 'memorybox' 
  | null;

export interface TvMemory {
  id: string;
  title: string;
  category: 'Çizgi Film' | 'Dizi' | 'Program' | 'TRT Klasiği';
  years: string;
  description: string;
  trivia: string;
  searchUrl: string;
  searchLabel: string;
}

export type CassetteCategory = 'turkce-pop' | 'arabesk' | 'rock' | 'yabanci' | 'cocukluk';

export interface CassetteTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  category: CassetteCategory;
  duration: string;
  labelColor: string;
  searchUrl: string;
}

export type VhsCategory = 'aile' | 'macera' | 'bilim-kurgu' | 'komedi' | 'aksiyon' | 'yesilcam';

export interface VhsFilm {
  id: string;
  title: string;
  originalTitle?: string;
  year: number;
  director: string;
  category: VhsCategory;
  synopsis: string;
  badge: string;
  searchUrl: string;
}

export interface ArcadeGame {
  id: string;
  name: string;
  releaseYear: number;
  publisher: string;
  genre: string;
  description: string;
  tagline: string;
}

export interface PolaroidPhoto {
  id: string;
  title: string;
  dateLabel: string;
  location: string;
  caption: string;
  handwrittenNote: string;
  category: string;
  aspectColor: string;
}

export interface PhoneQuote {
  id: number;
  text: string;
  context: string;
}

export interface TimelineYearData {
  year: number;
  theme: string;
  accentColor: string;
  tech: string;
  cinema: string;
  tv: string;
  music: string;
  dailyLife: string;
  keyHighlight: string;
}

export interface UserMemory {
  id: string;
  author: string;
  era: string;
  memoryText: string;
  tag: string;
  createdAt: number;
}
