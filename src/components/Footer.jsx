import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingData';

export default function Footer() {
  return (
    <footer className="py-16 px-4 bg-forest-darker text-white text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="medallion-divider w-48 mx-auto mb-8">
          <span className="medallion-line" />
          <Heart className="w-5 h-5 text-gold-accent fill-gold-accent" />
          <span className="medallion-line reverse" />
        </div>

        <p className="font-serif text-2xl sm:text-3xl text-cream-bg font-light max-w-2xl mx-auto leading-relaxed mb-6">
          «Lo que comenzó como un sueño en el corazón de Dios, hoy se convierte en una promesa para toda la vida.»
        </p>

        <div className="font-script text-5xl sm:text-6xl text-gold-accent mb-6">
          {WEDDING_CONFIG.couple.bride} & {WEDDING_CONFIG.couple.groom}
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-gold-light font-semibold mb-8">
          {WEDDING_CONFIG.dateDisplayText}
        </p>

        <div className="pt-8 border-t border-white/10 text-xs text-white/50 tracking-wider">
          <p>Hecho con amor para la Boda de Erlinda & Daniel © {new Date().getFullYear()}</p>
        </div>

      </div>
    </footer>
  );
}
