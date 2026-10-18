/**
 * Audio synthesis helper using Web Speech API and Web Audio API
 */

export const playKhmerVoice = (
  text: string,
  voiceType: 'female' | 'male' | 'storyteller' | 'energetic' = 'female',
  rate: number = 1.0,
  pitch: number = 1.0,
  onEnd?: () => void
) => {
  if (typeof window === 'undefined') return;

  // Try Web Speech API first
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    // Try finding Khmer or Southeast Asian / neutral voice
    const khmerVoice = voices.find(v => v.lang.includes('km') || v.lang.includes('kh'));
    if (khmerVoice) {
      utterance.voice = khmerVoice;
    }

    if (voiceType === 'female') {
      utterance.pitch = pitch * 1.25;
      utterance.rate = rate * 1.0;
    } else if (voiceType === 'male') {
      utterance.pitch = pitch * 0.8;
      utterance.rate = rate * 0.95;
    } else if (voiceType === 'storyteller') {
      utterance.pitch = pitch * 0.9;
      utterance.rate = rate * 0.9;
    } else if (voiceType === 'energetic') {
      utterance.pitch = pitch * 1.35;
      utterance.rate = rate * 1.2;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      playToneFallback(voiceType, onEnd);
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      playToneFallback(voiceType, onEnd);
    }
  } else {
    playToneFallback(voiceType, onEnd);
  }
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

/**
 * Web Audio synthesizer chime preview to guarantee audio always plays reliably
 */
export const playToneFallback = (voiceType: string, onEnd?: () => void) => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = voiceType === 'female' ? 'sine' : 'triangle';
    const baseFreq = voiceType === 'female' ? 440 : 220;
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.3, ctx.currentTime + 0.3);
    osc.frequency.exponentialRampToValueAtTime(baseFreq, ctx.currentTime + 0.6);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.85);

    setTimeout(() => {
      if (onEnd) onEnd();
      ctx.close();
    }, 900);
  } catch (err) {
    console.warn('Audio fallback error:', err);
    if (onEnd) onEnd();
  }
};
