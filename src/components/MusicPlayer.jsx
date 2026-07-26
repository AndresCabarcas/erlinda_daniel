import React, { useState, useEffect, useRef } from 'react';
import { Music, VolumeX, Sparkles } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingData';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const synthIntervalRef = useRef(null);

  // Sintetizador Web Audio API de respaldo para melodía nupcial romántica
  const playRomanticSynthesizer = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Acordes románticos en C maj7 / F maj7 / G / Am
      const chords = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [349.23, 440.00, 523.25, 659.25], // Fmaj7
        [392.00, 493.88, 587.33, 698.46], // G7
        [220.00, 261.63, 329.63, 392.00]  // Am7
      ];

      let chordIndex = 0;

      const playChord = () => {
        const currentChord = chords[chordIndex];
        currentChord.forEach((freq, noteIdx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + noteIdx * 0.15);
          
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + noteIdx * 0.15 + 0.2);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime + noteIdx * 0.15);
          osc.stop(ctx.currentTime + 3.3);
        });

        chordIndex = (chordIndex + 1) % chords.length;
      };

      playChord();
      synthIntervalRef.current = setInterval(playChord, 3600);
    } catch (e) {
      console.log('Web Audio fallback initialized');
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

  const toggleMusic = () => {
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      stopRomanticSynthesizer();
      setIsPlaying(false);
    } else {
      let playedAudio = false;
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play()
          .then(() => {
            playedAudio = true;
            setIsPlaying(true);
          })
          .catch(() => {
            // Si el archivo mp3 no está presente aún, activa la melodía sintética romántica
            playRomanticSynthesizer();
            setIsPlaying(true);
          });
      } else {
        playRomanticSynthesizer();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    // Escuchar intento de interacción inicial para reproducción suave
    const handleFirstTouch = () => {
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
    };

    window.addEventListener('click', handleFirstTouch);
    window.addEventListener('touchstart', handleFirstTouch);

    return () => {
      stopRomanticSynthesizer();
    };
  }, []);

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
            ? 'bg-sage-dark/90 text-white border-gold-accent shadow-gold animate-pulse'
            : 'bg-white/90 text-forest-deep border-sage-primary/40 hover:bg-sage-primary hover:text-white'
        }`}
        aria-label={isPlaying ? 'Silenciar música' : 'Reproducir música'}
        style={{
          boxShadow: isPlaying ? '0 10px 30px rgba(197, 168, 128, 0.4)' : '0 8px 25px rgba(0,0,0,0.12)'
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
