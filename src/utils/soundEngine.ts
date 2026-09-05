// Web Audio API Procedural Sound Synthesizer for Cyberpunk UI

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private humOsc: OscillatorNode | null = null;
  private humGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.humGain) {
      this.humGain.gain.setValueAtTime(0, this.ctx?.currentTime || 0);
    }
  }

  // Tactile metallic click / switch toggle
  public playClick(pitch = 1.0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800 * pitch, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120 * pitch, this.ctx.currentTime + 0.04);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
    filter.Q.setValueAtTime(3, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  // High-tech laser chirp / diagnostic node ping
  public playNodePing(freq = 1400) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.8, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.14);
  }

  // Heavy reactor surge / pulse shockwave
  public playSurge() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    // Sub-bass sweep
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.35);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.38);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  // Pneumatic gas purge / pressure release
  public playPurge() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    // White noise buffer for steam / pneumatic hiss
    const bufferSize = this.ctx.sampleRate * 0.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2200, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.45);
    filter.Q.setValueAtTime(2, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
    noise.stop(this.ctx.currentTime + 0.5);
  }

  // Servo movement sound for aperture rotation
  public playServo() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(280, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  // Update dynamic ambient turbine hum based on reactor power level
  public updateAmbientHum(powerPercent: number) {
    if (this.isMuted) {
      if (this.humGain && this.ctx) {
        this.humGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
      return;
    }
    this.initContext();
    if (!this.ctx) return;

    if (!this.humOsc) {
      this.humOsc = this.ctx.createOscillator();
      this.humGain = this.ctx.createGain();
      this.filterNode = this.ctx.createBiquadFilter();

      this.humOsc.type = 'triangle';
      this.humOsc.frequency.setValueAtTime(45, this.ctx.currentTime);

      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(140, this.ctx.currentTime);

      this.humGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      this.humOsc.connect(this.filterNode);
      this.filterNode.connect(this.humGain);
      this.humGain.connect(this.ctx.destination);

      this.humOsc.start();
    }

    const targetFreq = 40 + (powerPercent / 100) * 45;
    const targetGain = 0.02 + (powerPercent / 150) * 0.05;
    this.humOsc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.1);
    this.humGain?.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.1);
  }
}

export const soundFx = new SoundEngine();
