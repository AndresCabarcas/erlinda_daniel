import React, { useState, useEffect, useRef } from 'react';
import { Music, VolumeX, Sparkles } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingData';

export default function MusicPlayer({ autoPlayTrigger = 0 }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const synthIntervalRef = useRef(null);
  const isPlayingRef = useRef(false);

  // Sintetizador Web Audio API de respaldo romántico tipo caja de música / piano cálido
  const playRomanticSynthesizer = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Acordes románticos en Cmaj9, Fmaj7, G6, Am9
      const chords = [
        [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9
        [349.23, 440.00, 523.25, 659.25],         // Fmaj7
        [392.00, 493.88, 587.33, 659.25],         // G6
        [220.00, 261.63, 329.63, 392.00, 493.88]  // Am9
      ];

      let chordIndex = 0;

      const playChord = () => {
        if (!isPlayingRef.current) return;
        const currentChord = chords[chordIndex];

        currentChord.forEach((freq, noteIdx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const noteTime = ctx.currentTime + noteIdx * 0.12;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, noteTime);

          // Curva de volumen suave estilo caja de música
          gain.gain.setValueAtTime(0, noteTime);
          gain.gain.linearRampToValueAtTime(0.035, noteTime + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 3.2);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(noteTime);
          osc.stop(noteTime + 3.3);
        });

        chordIndex = (chordIndex + 1) % chords.length;
      };

      // Tocar primer acorde de inmediato
      playChord();

      if (!synthIntervalRef.current) {
        synthIntervalRef.current = setInterval(playChord, 3800);
      }
    } catch (e) {
      console.warn('Web Audio synthesis notice:', e);
    }
  };

  const stopRomanticSynthesizer = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  const startMusic = async () => {
    isPlayingRef.current = true;
    setIsPlaying(true);

    if (audioRef.current) {
      audioRef.current.volume = 0.55;
      try {
        await audioRef.current.play();
      } catch (err) {
        // Si el archivo mp3 no existe o está bloqueado por el navegador, usar sintetizador
        playRomanticSynthesizer();
      }
    } else {
      playRomanticSynthesizer();
    }
  };

  const pauseMusic = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);

    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopRomanticSynthesizer();
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  };

  // Reaccionar al disparador del sobre virtual
  useEffect(() => {
    if (autoPlayTrigger > 0) {
      startMusic();
    }
  }, [autoPlayTrigger]);

  // Listener para el primer toque o click en la pantalla en caso de políticas estrictas de autoplay
  useEffect(() => {
    const handleFirstGesture = () => {
      // Solo iniciar si el sobre ya fue interactuado o si el usuario toca la pantalla
      if (autoPlayTrigger > 0 && !isPlayingRef.current) {
        startMusic();
      }
    };

    window.addEventListener('click', handleFirstGesture, { passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { passive: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      stopRomanticSynthesizer();
    };
  }, [autoPlayTrigger]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        src={WEDDING_CONFIG.audioTrackUrl}
        loop
        preload="auto"
      />
      <button
        onClick={toggleMusic}
        className={`flex items-center gap-3 px-5 py-3 rounded-full shadow-2xl transition-all duration-500 backdrop-blur-md border ${
          isPlaying
            ? 'bg-sage-dark/95 text-white border-gold-accent shadow-gold animate-pulse'
            : 'bg-white/95 text-forest-deep border-sage-primary/40 hover:bg-sage-primary hover:text-white'
        }`}
        aria-label={isPlaying ? 'Silenciar música' : 'Reproducir música'}
        style={{
          boxShadow: isPlaying ? '0 10px 30px rgba(197, 168, 128, 0.45)' : '0 8px 25px rgba(0,0,0,0.12)'
        }}
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <>
              <Music className="w-5 h-5 animate-bounce" />
              <Sparkles className="w-3 h-3 text-gold-accent absolute -top-2 -right-2 animate-spin" />
            </>
          ) : (
            <VolumeX className="w-5 h-5 opacity-80" />
          )}
        </div>
        <span className="text-xs font-semibold tracking-wider uppercase">
          {isPlaying ? 'Música Romántica' : 'Reproducir Música'}
        </span>
      </button>
    </div>
  );
}
