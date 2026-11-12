/**
 * Web Audio API Sound Synthesizer
 * 100% offline, zero asset downloads, guaranteed to never fail or 404!
 * Upgrade Math Quiz by Avinash Sir
 */

const SoundEngine = {
  ctx: null,
  enabled: true,

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  },

  resumeContext() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  toggleMute() {
    this.enabled = !this.enabled;
    return this.enabled;
  },

  // Play a single pleasant beep/tone
  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
    if (!this.enabled) return;
    try {
      this.init();
      this.resumeContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play failed silently', e);
    }
  },

  // Cheerful chime on correct answer
  playCorrect() {
    if (!this.enabled) return;
    try {
      this.init();
      this.resumeContext();
      // Arpeggio C5 -> E5 -> G5 -> C6
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        setTimeout(() => {
          this.playTone(freq, 'triangle', 0.18, 0.15);
        }, i * 65);
      });
    } catch (e) {}
  },

  // Gentle low tone for incorrect answer
  playIncorrect() {
    if (!this.enabled) return;
    try {
      this.init();
      this.resumeContext();
      this.playTone(220, 'sawtooth', 0.25, 0.1);
      setTimeout(() => {
        this.playTone(185, 'sawtooth', 0.35, 0.08);
      }, 120);
    } catch (e) {}
  },

  // Button click
  playClick() {
    this.playTone(600, 'sine', 0.05, 0.05);
  },

  // Victory fanfare on quiz completion
  playVictory() {
    if (!this.enabled) return;
    try {
      this.init();
      this.resumeContext();
      // C, E, G, G, A, C (Fanfare)
      const fanfare = [
        { f: 523.25, d: 0.12, t: 0 },
        { f: 659.25, d: 0.12, t: 130 },
        { f: 783.99, d: 0.15, t: 260 },
        { f: 783.99, d: 0.15, t: 400 },
        { f: 880.00, d: 0.20, t: 550 },
        { f: 1046.50, d: 0.60, t: 720 }
      ];
      fanfare.forEach(note => {
        setTimeout(() => {
          this.playTone(note.f, 'triangle', note.d, 0.2);
        }, note.t);
      });
    } catch (e) {}
  },

  // Mystery Chest Open Shimmer
  playChestOpen() {
    if (!this.enabled) return;
    try {
      this.init();
      this.resumeContext();
      const shimmerNotes = [440, 554, 659, 880, 1108, 1318, 1760];
      shimmerNotes.forEach((f, i) => {
        setTimeout(() => {
          this.playTone(f, 'sine', 0.25, 0.12);
        }, i * 70);
      });
    } catch (e) {}
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SoundEngine;
}
