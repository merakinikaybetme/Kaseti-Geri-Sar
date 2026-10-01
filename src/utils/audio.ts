/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// 80s Retro Web Audio Synthesizer with Master Volume Control
let audioCtx: AudioContext | null = null;
let masterGainNode: GainNode | null = null;
let currentVolume = 0.75;
let isMuted = false;

// Try to restore saved preferences
if (typeof window !== 'undefined') {
  try {
    const savedVol = localStorage.getItem('80s_volume');
    if (savedVol !== null) {
      const parsed = parseFloat(savedVol);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
        currentVolume = parsed;
      }
    }
    const savedMuted = localStorage.getItem('80s_muted');
    if (savedMuted !== null) {
      isMuted = savedMuted === 'true';
    }
  } catch {
    // Ignore localStorage restrictions
  }
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function getMasterDestination(ctx: AudioContext): AudioNode {
  if (!masterGainNode) {
    masterGainNode = ctx.createGain();
    masterGainNode.gain.setValueAtTime(
      isMuted ? 0 : currentVolume,
      ctx.currentTime
    );
    masterGainNode.connect(ctx.destination);
  } else {
    // Sync current state
    masterGainNode.gain.setValueAtTime(
      isMuted ? 0 : currentVolume,
      ctx.currentTime
    );
  }
  return masterGainNode;
}

/**
 * Global master volume setter (0.0 to 1.0)
 */
export function setVolume(volume: number) {
  currentVolume = Math.max(0, Math.min(1, volume));
  try {
    localStorage.setItem('80s_volume', currentVolume.toString());
  } catch {
    // Ignore storage issues
  }
  const ctx = getAudioContext();
  if (ctx && masterGainNode) {
    masterGainNode.gain.setValueAtTime(
      isMuted ? 0 : currentVolume,
      ctx.currentTime
    );
  }
}

/**
 * Get current volume (0.0 to 1.0)
 */
export function getVolume(): number {
  return currentVolume;
}

/**
 * Global mute toggle
 */
export function setMuted(muted: boolean) {
  isMuted = muted;
  try {
    localStorage.setItem('80s_muted', isMuted.toString());
  } catch {
    // Ignore storage issues
  }
  const ctx = getAudioContext();
  if (ctx && masterGainNode) {
    masterGainNode.gain.setValueAtTime(
      isMuted ? 0 : currentVolume,
      ctx.currentTime
    );
  }
}

/**
 * Check if muted
 */
export function getIsMuted(): boolean {
  return isMuted;
}

/**
 * Standard tactile button click
 */
export function playButtonClick() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(440, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.05);

  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(getMasterDestination(ctx));

  osc.start();
  osc.stop(ctx.currentTime + 0.05);
}

/**
 * 1. TV (Tüplü TV): Açılış uğultusu ve yüksek frekanslı CRT bobin cızırtısı
 */
export function playTvTurnOn() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const master = getMasterDestination(ctx);

  // High pitch CRT coil whistle
  const whistle = ctx.createOscillator();
  const whistleGain = ctx.createGain();
  whistle.type = 'sine';
  whistle.frequency.setValueAtTime(3500, now);
  whistle.frequency.linearRampToValueAtTime(14500, now + 0.35);

  whistleGain.gain.setValueAtTime(0.001, now);
  whistleGain.gain.linearRampToValueAtTime(0.08, now + 0.08);
  whistleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

  whistle.connect(whistleGain);
  whistleGain.connect(master);
  whistle.start(now);
  whistle.stop(now + 0.45);

  // Power transformer thump / degauss hum
  const thump = ctx.createOscillator();
  const thumpGain = ctx.createGain();
  thump.type = 'triangle';
  thump.frequency.setValueAtTime(80, now);
  thump.frequency.exponentialRampToValueAtTime(45, now + 0.3);

  thumpGain.gain.setValueAtTime(0.25, now);
  thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  thump.connect(thumpGain);
  thumpGain.connect(master);
  thump.start(now);
  thump.stop(now + 0.35);
}

/**
 * 1. TV: Kanal değiştirme / CRT ekran paraziti ve mekanik tıkırtı
 */
export function playTvChannelStatic() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 0.16;
  const master = getMasterDestination(ctx);

  // Synthesized noise burst for TV static
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(2400, now);
  filter.Q.setValueAtTime(1.5, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(master);

  noise.start(now);
  noise.stop(now + duration);

  // Heavy rotary knob clunk
  const clunk = ctx.createOscillator();
  const clunkGain = ctx.createGain();
  clunk.type = 'square';
  clunk.frequency.setValueAtTime(150, now);
  clunk.frequency.exponentialRampToValueAtTime(50, now + 0.06);

  clunkGain.gain.setValueAtTime(0.15, now);
  clunkGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  clunk.connect(clunkGain);
  clunkGain.connect(master);
  clunk.start(now);
  clunk.stop(now + 0.06);
}

/**
 * 2. Kaset (Çift Kasetçalar): Mekanik kaset yuvası açılma/kapanma çıtırtısı
 */
export function playCassetteClick() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const master = getMasterDestination(ctx);

  // Primary plastic snap
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = 'square';
  osc1.frequency.setValueAtTime(220, now);
  osc1.frequency.exponentialRampToValueAtTime(70, now + 0.04);
  gain1.gain.setValueAtTime(0.2, now);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
  osc1.connect(gain1);
  gain1.connect(master);
  osc1.start(now);
  osc1.stop(now + 0.04);

  // Secondary magnetic head engagement clack
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(360, now + 0.05);
  osc2.frequency.exponentialRampToValueAtTime(110, now + 0.12);
  gain2.gain.setValueAtTime(0.16, now + 0.05);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
  osc2.connect(gain2);
  gain2.connect(master);
  osc2.start(now + 0.05);
  osc2.stop(now + 0.12);
}

/**
 * 2. Kaset: Hızlı kaset sarma vızıltısı (Rewind motor whir)
 */
export function playCassetteRewind() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 0.55;
  const master = getMasterDestination(ctx);

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(250, now);
  osc.frequency.linearRampToValueAtTime(800, now + 0.25);
  osc.frequency.linearRampToValueAtTime(120, now + duration);

  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.12, now + 0.15);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(master);

  osc.start(now);
  osc.stop(now + duration);
}

/**
 * 3. VHS (Video Kasetliği): VCR motorlu kaset çekme ve oturma sesi (Ka-thunk)
 */
export function playVhsInsert() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const master = getMasterDestination(ctx);

  // Motor sliding hum
  const motor = ctx.createOscillator();
  const motorGain = ctx.createGain();
  motor.type = 'sawtooth';
  motor.frequency.setValueAtTime(180, now);
  motor.frequency.linearRampToValueAtTime(240, now + 0.15);
  motor.frequency.linearRampToValueAtTime(90, now + 0.28);

  motorGain.gain.setValueAtTime(0.01, now);
  motorGain.gain.linearRampToValueAtTime(0.09, now + 0.08);
  motorGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

  motor.connect(motorGain);
  motorGain.connect(master);
  motor.start(now);
  motor.stop(now + 0.28);

  // Heavy mechanical lock "ka-thunk"
  const thunk = ctx.createOscillator();
  const thunkGain = ctx.createGain();
  thunk.type = 'square';
  thunk.frequency.setValueAtTime(130, now + 0.2);
  thunk.frequency.exponentialRampToValueAtTime(40, now + 0.35);

  thunkGain.gain.setValueAtTime(0.2, now + 0.2);
  thunkGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  thunk.connect(thunkGain);
  thunkGain.connect(master);
  thunk.start(now + 0.2);
  thunk.stop(now + 0.35);
}

/**
 * 4. Atari: Jeton atma sesi (Insert Coin 8-bit chime)
 */
export function playArcadeCoin() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const master = getMasterDestination(ctx);

  // High metallic coin bell
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = 'square';
  osc1.frequency.setValueAtTime(987.77, now); // B5
  gain1.gain.setValueAtTime(0.14, now);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  osc1.connect(gain1);
  gain1.connect(master);
  osc1.start(now);
  osc1.stop(now + 0.08);

  // High octave reward tone
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'square';
  osc2.frequency.setValueAtTime(1318.51, now + 0.08); // E6
  gain2.gain.setValueAtTime(0.16, now + 0.08);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
  osc2.connect(gain2);
  gain2.connect(master);
  osc2.start(now + 0.08);
  osc2.stop(now + 0.32);
}

/**
 * 4. Atari: Puan yakalama sesi
 */
export function playArcadeDot() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.setValueAtTime(900, ctx.currentTime + 0.04);

  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

  osc.connect(gain);
  gain.connect(getMasterDestination(ctx));

  osc.start();
  osc.stop(ctx.currentTime + 0.08);
}

/**
 * 4. Atari: Bonus meyve / yıldız sesi
 */
export function playArcadeBonus() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [440, 554.37, 659.25, 880];
  const master = getMasterDestination(ctx);

  notes.forEach((freq, idx) => {
    const t = ctx.currentTime + idx * 0.06;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    osc.connect(gain);
    gain.connect(master);
    osc.start(t);
    osc.stop(t + 0.07);
  });
}

/**
 * 5. Polaroid: Analog kamera deklanşörü ve film çıkartma motoru
 */
export function playCameraShutter() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const master = getMasterDestination(ctx);

  // Shutter aperture click
  const click = ctx.createOscillator();
  const clickGain = ctx.createGain();
  click.type = 'triangle';
  click.frequency.setValueAtTime(1200, now);
  click.frequency.exponentialRampToValueAtTime(180, now + 0.04);
  clickGain.gain.setValueAtTime(0.22, now);
  clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
  click.connect(clickGain);
  clickGain.connect(master);
  click.start(now);
  click.stop(now + 0.04);

  // Eject motor whir (Polaroid film dispensing motor)
  const whir = ctx.createOscillator();
  const whirGain = ctx.createGain();
  whir.type = 'sawtooth';
  whir.frequency.setValueAtTime(320, now + 0.06);
  whir.frequency.linearRampToValueAtTime(420, now + 0.18);
  whir.frequency.linearRampToValueAtTime(260, now + 0.28);

  whirGain.gain.setValueAtTime(0.01, now + 0.06);
  whirGain.gain.linearRampToValueAtTime(0.1, now + 0.12);
  whirGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

  whir.connect(whirGain);
  whirGain.connect(master);
  whir.start(now + 0.06);
  whir.stop(now + 0.28);
}

/**
 * 6. Telefon: Çevirmeli PTT telefon kadran çıtırtısı (Rotary dial pulses)
 */
export function playRotaryDial() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const master = getMasterDestination(ctx);

  // 5 rapid ratchet pulses
  for (let i = 0; i < 5; i++) {
    const t = now + i * 0.05;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(950 + (i % 2) * 220, t);
    gain.gain.setValueAtTime(0.11, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
    osc.connect(gain);
    gain.connect(master);
    osc.start(t);
    osc.stop(t + 0.035);
  }
}

/**
 * 6. Telefon: Ahize kaldırma / hat sesi (Handset pick-up clack)
 */
export function playPhoneHandset() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const master = getMasterDestination(ctx);

  // Bakelite cradle clack
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(280, now);
  osc.frequency.exponentialRampToValueAtTime(90, now + 0.06);
  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
  osc.connect(gain);
  gain.connect(master);
  osc.start(now);
  osc.stop(now + 0.06);

  // Subtle dial tone blip (440 + 350 Hz)
  const tone1 = ctx.createOscillator();
  const tone2 = ctx.createOscillator();
  const toneGain = ctx.createGain();

  tone1.type = 'sine';
  tone1.frequency.setValueAtTime(350, now + 0.07);
  tone2.type = 'sine';
  tone2.frequency.setValueAtTime(440, now + 0.07);

  toneGain.gain.setValueAtTime(0.06, now + 0.07);
  toneGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

  tone1.connect(toneGain);
  tone2.connect(toneGain);
  toneGain.connect(master);

  tone1.start(now + 0.07);
  tone2.start(now + 0.07);
  tone1.stop(now + 0.22);
  tone2.stop(now + 0.22);
}

/**
 * 7. Takvim: Saatli maarif takvimi yaprağını koparma ve kağıt hışırtısı
 */
export function playPaperTear() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 0.15;
  const master = getMasterDestination(ctx);

  // Filtered white noise tear burst
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.setValueAtTime(1600, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(master);

  noise.start(now);
  noise.stop(now + duration);
}

/**
 * 8. Hatıra Kutusu: Teneke kutu kapağı açılışı ve metalik gazoz kapakları şıngırtısı
 */
export function playBottleCapsJingle() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const master = getMasterDestination(ctx);

  // Tin lid pop
  const pop = ctx.createOscillator();
  const popGain = ctx.createGain();
  pop.type = 'triangle';
  pop.frequency.setValueAtTime(320, now);
  pop.frequency.exponentialRampToValueAtTime(140, now + 0.04);
  popGain.gain.setValueAtTime(0.18, now);
  popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
  pop.connect(popGain);
  popGain.connect(master);
  pop.start(now);
  pop.stop(now + 0.04);

  // 4 high metallic bottle cap chimes (tıkır tıkır)
  const capFrequencies = [2400, 3100, 2750, 3400];
  capFrequencies.forEach((freq, idx) => {
    const t = now + 0.04 + idx * 0.035;
    const chime = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    chime.type = 'sine';
    chime.frequency.setValueAtTime(freq, t);

    chimeGain.gain.setValueAtTime(0.1, t);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

    chime.connect(chimeGain);
    chimeGain.connect(master);
    chime.start(t);
    chime.stop(t + 0.045);
  });
}

/**
 * Konami Kodu zafer melodisi
 */
export function playKonamiVictory() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [
    { freq: 392, dur: 0.1 },  // G4
    { freq: 523, dur: 0.1 },  // C5
    { freq: 659, dur: 0.1 },  // E5
    { freq: 784, dur: 0.15 }, // G5
    { freq: 659, dur: 0.1 },  // E5
    { freq: 784, dur: 0.35 }, // G5
  ];

  let time = ctx.currentTime;
  const master = getMasterDestination(ctx);

  notes.forEach((n) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(n.freq, time);

    gain.gain.setValueAtTime(0.15, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + n.dur);

    osc.connect(gain);
    gain.connect(master);

    osc.start(time);
    osc.stop(time + n.dur);
    time += n.dur + 0.02;
  });
}
