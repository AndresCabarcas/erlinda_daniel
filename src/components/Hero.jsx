import React, { useEffect, useState } from 'react';
import { Heart, ChevronDown, Sparkles } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingData';

export default function Hero() {
  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState('');

  useEffect(() => {
    // Extraer parámetros de la URL para personalizar la invitación
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get('nombre') || params.get('n');
    const cupos = params.get('cupos') || params.get('c');

    if (nombre) setGuestName(decodeURIComponent(nombre));
    if (cupos) setGuestCount(decodeURIComponent(cupos));
  }, []);

  return (
    <header className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden">
      {/* Fondo fotográfico con overlay oscuro degradado eucalipto */}
      <div className="absolute inset-0 z-0">
        <img
          src="/photos/photo1.jpg"
          alt="Erlinda & Daniel"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          style={{ filter: 'brightness(0.55) contrast(1.05)' }}
        />
        <div 
          className="absolute inset-0" 
          style={{
            background: 'radial-gradient(circle at center, rgba(44,62,48,0.4) 0%, rgba(28,43,32,0.85) 100%)'
          }}
        />
      </div>

      {/* Elementos flotantes de adorno */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Monograma Romántico */}
        <div className="mb-4 inline-flex items-center justify-center p-4 rounded-full border border-gold-accent/40 bg-forest-darker/50 backdrop-blur-md shadow-gold animate-float">
          <span className="font-script text-4xl sm:text-5xl text-gold-accent px-3">
            {WEDDING_CONFIG.couple.monogram}
          </span>
        </div>

        <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-gold-light font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold-accent" />
          ¡Nos Casamos!
          <Sparkles className="w-4 h-4 text-gold-accent" />
        </p>

        {/* Nombres de los novios */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-white font-normal tracking-wide my-2 leading-none">
          <span>{WEDDING_CONFIG.couple.bride}</span>
          <span className="font-script text-gold-accent mx-3 sm:mx-6 text-4xl sm:text-6xl">&</span>
          <span>{WEDDING_CONFIG.couple.groom}</span>
        </h1>

        <div className="medallion-divider w-48 my-6">
          <span className="medallion-line" />
          <Heart className="w-5 h-5 text-gold-accent fill-gold-accent" />
          <span className="medallion-line reverse" />
        </div>

        {/* Estado de Fecha y Ubicación */}
        <p className="font-serif text-xl sm:text-2xl text-cream-bg/95 font-light tracking-widest max-w-lg mb-2">
          {WEDDING_CONFIG.isDateDefined ? WEDDING_CONFIG.dateDisplayText : "Una historia de amor bendecida por Dios"}
        </p>
        
        {!WEDDING_CONFIG.isDateDefined && (
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-accent/20 border border-gold-accent/50 text-gold-light text-xs tracking-widest uppercase mb-8">
            ✨ Fecha y Lugar: Próximamente ✨
          </span>
        )}

        {/* Tarjeta de Bienvenida Personalizada para el Invitado */}
        {guestName && (
          <div className="mt-4 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-gold-accent/30 max-w-md w-full shadow-2xl animate-fade-in">
            <p className="text-xs uppercase tracking-widest text-gold-light font-medium mb-1">
              Con cariño invitamos a:
            </p>
            <h3 className="font-serif text-2xl text-white font-bold tracking-wide">
              {guestName}
            </h3>
            {guestCount && (
              <span className="inline-block mt-2 px-3 py-1 bg-sage-primary/40 rounded-full text-xs text-white border border-sage-primary/60">
                Pases reservados: <strong className="text-gold-accent">{guestCount}</strong>
              </span>
            )}
          </div>
        )}

        {/* Botón de Scroll hacia abajo */}
        <a
          href="#versiculo"
          className="mt-12 group flex flex-col items-center gap-2 text-white/80 hover:text-gold-accent transition-colors duration-300"
        >
          <span className="text-xs uppercase tracking-widest font-light">Desliza para descubrir</span>
          <div className="p-2 rounded-full border border-white/30 group-hover:border-gold-accent group-hover:bg-gold-accent/10 transition-all">
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </a>
      </div>
    </header>
  );
}
