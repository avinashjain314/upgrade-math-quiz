/**
 * Web Audio API Sound Synthesizer & Procedural Focus Study Music Engine
 * 100% offline, zero external downloads, instant loading, guaranteed to never fail or 404!
 * 
 * Features:
 * - High-clarity sound effects for correct, incorrect, click, victory, and chest open.
 * - Auto-unlocks AudioContext on first user tap/click to comply with modern browser autoplay rules.
 * - Procedural Ambient Focus Background Music: soft, calming, warm chords designed to enhance mathematical concentration!
 * 
 * Upgrade Math Quiz by Avinash Sir
 */

const SoundEngine = {
  ctx: null,
  enabled: true,
  bgmEnabled: false,
  bgmInterval: null,
  bgmGainNode: null,

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    // Check saved BGM preference
    const savedBgm = localStorage.getItem('umq_bgm_enabled');
    this.bgmEnabled = savedBgm === 'true';
  },

  // Ensure AudioContext is resumed after a user gesture (vital for mobile/Chrome/Edge)
  async unlock() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch (e) {
        console.warn('Audio resume error:', e);
      }
    }
  },

  toggleMute() {
    this.enabled = !this.enabled;
    if (!this.enabled && this.bgmEnabled) {
      this.stopBgm();
    }
    this.updateSoundUi();
    return this.enabled;
  },

  updateSoundUi() {
    const sBtns = document.querySelectorAll('.sound-toggle-btn');
    sBtns.forEach(btn => {
      btn.innerText = this.enabled ? '🔊' : '🔇';
    });
  },

  // Play a single synthesized tone with ADSR envelope
  playTone(freq, type = 'sine', duration = 0.18, gainVal = 0.28) {
    if (!this.enabled) return;
    try {
      this.unlock();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      // Fast attack & smooth decay
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(gainVal, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch (e) {
      console.warn('Audio play failed silently', e);
    }
  },

  // 1. Cheerful chime on correct answer (Ascending C Major arpeggio)
  playCorrect() {
    if (!this.enabled) return;
    try {
      this.unlock();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        setTimeout(() => {
          this.playTone(freq, 'triangle', 0.22, 0.30);
        }, i * 65);
      });
    } catch (e) {}
  },

  // 2. Gentle soft tone for incorrect answer (Warm & non-punitive)
  playIncorrect() {
    if (!this.enabled) return;
    try {
      this.unlock();
      this.playTone(260, 'sine', 0.25, 0.22);
      setTimeout(() => {
        this.playTone(220, 'sine', 0.35, 0.20);
      }, 110);
    } catch (e) {}
  },

  // 3. Tactile button click
  playClick() {
    this.playTone(700, 'sine', 0.04, 0.15);
  },

  // 4. Grand victory fanfare on quiz completion
  playVictory() {
    if (!this.enabled) return;
    try {
      this.unlock();
      const fanfare = [
        { f: 523.25, d: 0.15, t: 0 },    // C5
        { f: 659.25, d: 0.15, t: 140 },  // E5
        { f: 783.99, d: 0.18, t: 280 },  // G5
        { f: 783.99, d: 0.15, t: 440 },  // G5
        { f: 880.00, d: 0.22, t: 600 },  // A5
        { f: 1046.50, d: 0.70, t: 780 }  // High C6
      ];
      fanfare.forEach(note => {
        setTimeout(() => {
          this.playTone(note.f, 'triangle', note.d, 0.32);
        }, note.t);
      });
    } catch (e) {}
  },

  // 5. Mystery Chest Open Magical Shimmer
  playChestOpen() {
    if (!this.enabled) return;
    try {
      this.unlock();
      const shimmerNotes = [440, 554.37, 659.25, 880, 1108.73, 1318.51, 1760];
      shimmerNotes.forEach((f, i) => {
        setTimeout(() => {
          this.playTone(f, 'sine', 0.30, 0.25);
        }, i * 60);
      });
    } catch (e) {}
  },

  // =============================================================
  // PROCEDURAL SOOTHING ZEN FOCUS CHIMES (BGM)
  // Gentle, high-clarity crystal wind chimes tuned to 528Hz Solfeggio harmony
  // 100% pure sine waves, zero low buzz, relaxing and soothing for kids!
  // =============================================================

  toggleBgm() {
    this.unlock();
    this.bgmEnabled = !this.bgmEnabled;
    localStorage.setItem('umq_bgm_enabled', this.bgmEnabled);

    if (this.bgmEnabled) {
      this.startBgm();
    } else {
      this.stopBgm();
    }
    this.updateBgmUi();
    return this.bgmEnabled;
  },

  startBgm() {
    if (!this.enabled) return;
    this.unlock();
    if (this.bgmInterval) return; // Already active

    try {
      if (!this.ctx) this.init();
      const AudioCtx = this.ctx;
      if (!AudioCtx) return;

      // Master BGM gain node with ultra-soft gentle volume (0.04)
      this.bgmGainNode = AudioCtx.createGain();
      this.bgmGainNode.gain.setValueAtTime(0.0001, AudioCtx.currentTime);
      this.bgmGainNode.gain.linearRampToValueAtTime(0.04, AudioCtx.currentTime + 1.5);
      this.bgmGainNode.connect(AudioCtx.destination);

      // Relaxing high-resonance pentatonic crystal chimes (pure Solfeggio 528Hz healing harmony)
      const chimePhrases = [
        [528.00, 660.00, 792.00, 1056.00], // C-note 528Hz Solfeggio harmony
        [440.00, 554.37, 659.25, 880.00],  // A4 soft peaceful harmony
        [523.25, 659.25, 783.99, 1046.50], // C5 crystal celesta
        [392.00, 493.88, 587.33, 783.99]   // G4 serene wind chime
      ];

      let phraseIndex = 0;

      const playChime = () => {
        if (!this.bgmEnabled || !this.ctx || !this.bgmGainNode) return;

        const currentNotes = chimePhrases[phraseIndex];
        phraseIndex = (phraseIndex + 1) % chimePhrases.length;

        // Play gentle staggered wind chime notes
        currentNotes.forEach((freq, idx) => {
          const noteTime = AudioCtx.currentTime + (idx * 0.22);
          const osc = AudioCtx.createOscillator();
          const noteGain = AudioCtx.createGain();

          osc.type = 'sine'; // PURE soft sine wave (zero harsh buzzing)
          osc.frequency.setValueAtTime(freq, noteTime);

          // Soft bell envelope: gentle attack, long tranquil decay
          noteGain.gain.setValueAtTime(0.0001, noteTime);
          noteGain.gain.linearRampToValueAtTime(0.06 / (idx + 1), noteTime + 0.15);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 3.8);

          osc.connect(noteGain);
          noteGain.connect(this.bgmGainNode);

          osc.start(noteTime);
          osc.stop(noteTime + 4.0);

          setTimeout(() => {
            try { osc.disconnect(); noteGain.disconnect(); } catch (e) {}
          }, 4200 + (idx * 220));
        });
      };

      playChime();
      this.bgmInterval = setInterval(playChime, 8500); // Relaxed 8.5s peaceful cadence
      this.updateBgmUi();
    } catch (e) {
      console.warn('Could not start soothing BGM:', e);
    }
  },

  stopBgm() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    if (this.bgmGainNode && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.bgmGainNode.gain.linearRampToValueAtTime(0.0001, now + 1.0);
        setTimeout(() => {
          if (this.bgmGainNode) {
            this.bgmGainNode.disconnect();
            this.bgmGainNode = null;
          }
        }, 1100);
      } catch (e) {}
    }
    this.updateBgmUi();
  },

  updateBgmUi() {
    const bgmBtns = document.querySelectorAll('.bgm-toggle-btn');
    bgmBtns.forEach(btn => {
      if (this.bgmEnabled) {
        btn.classList.add('bg-indigo-600', 'text-white', 'border-indigo-400');
        btn.classList.remove('bg-slate-900', 'text-slate-300');
        btn.innerHTML = '<span>🎵</span> <span>Zen Bells: ON</span>';
      } else {
        btn.classList.remove('bg-indigo-600', 'text-white', 'border-indigo-400');
        btn.classList.add('bg-slate-900', 'text-slate-300');
        btn.innerHTML = '<span>🎵</span> <span>Zen Bells: OFF</span>';
      }
    });
  }
};

// Global user gesture listener to automatically unlock Web Audio on first click/touch
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    SoundEngine.unlock();
  };
  window.addEventListener('pointerdown', unlockAudio, { once: true, passive: true });
  window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
  window.addEventListener('click', unlockAudio, { once: true, passive: true });
  window.addEventListener('keydown', unlockAudio, { once: true, passive: true });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SoundEngine;
}
