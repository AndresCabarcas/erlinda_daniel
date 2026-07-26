import React from 'react';
import { Quote, Sparkles } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingData';

export default function Blessing() {
  return (
    <section id="versiculo" className="py-20 px-4 relative overflow-hidden bg-cream-bg text-center">
      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Adorno inicial */}
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-full bg-sage-primary/10 border border-sage-primary/30">
            <Quote className="w-8 h-8 text-sage-primary" />
          </div>
        </div>

        {/* Cita bíblica */}
        <blockquote className="font-serif text-2xl sm:text-4xl text-forest-deep italic font-normal leading-relaxed mb-4">
          {WEDDING_CONFIG.verse.quote}
        </blockquote>
        <p className="text-sm font-semibold tracking-widest text-gold-accent uppercase mb-12">
          — {WEDDING_CONFIG.verse.reference}
        </p>

        <div className="medallion-divider w-64 my-8">
          <span className="medallion-line" />
          <span className="text-gold-accent text-sm">✦ ✦ ✦</span>
          <span className="medallion-line reverse" />
        </div>

        {/* Mensaje de la pareja */}
        <div className="glass-card p-8 sm:p-12 border-gold-accent/30 shadow-soft max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-sage-dark font-bold mb-4">
            Con la Bendición de Dios
          </p>
          <p className="text-base sm:text-lg text-text-muted font-light leading-relaxed mb-6">
            Con la bendición de Dios y el amor que ha guiado nuestra historia, tenemos el inmenso honor de invitarte a celebrar el día más especial de nuestras vidas.
          </p>
          <p className="text-base sm:text-lg text-text-muted font-light leading-relaxed mb-8">
            Nos llenaría de profunda alegría contar con tu presencia para dar gracias a Dios y compartir el comienzo de esta nueva etapa juntos.
          </p>
          
          <div className="font-script text-4xl sm:text-5xl text-forest-deep">
            {WEDDING_CONFIG.couple.bride} & {WEDDING_CONFIG.couple.groom}
          </div>
        </div>

      </div>
    </section>
  );
}
