import React from 'react';
import { MapPin, Calendar, Clock, Shirt, Sparkles, Navigation } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingData';

export default function Details() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-cream-bg via-cream-card to-cream-bg text-center">
      <div className="max-w-5xl mx-auto">
        
        <p className="text-xs uppercase tracking-[0.35em] text-sage-dark font-bold mb-2">
          Detalles de la Celebración
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-forest-deep font-normal mb-16">
          Cuándo, Dónde & Código de Vestimenta
        </h2>

        {/* Tarjetas de Información */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Tarjeta 1: Fecha y Ubicación */}
          <div className="glass-card p-8 sm:p-10 border-gold-accent/30 shadow-soft flex flex-col items-center justify-between text-center relative overflow-hidden">
            <div className="p-4 rounded-full bg-sage-primary/10 text-sage-primary mb-6">
              <MapPin className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-forest-deep mb-3 font-semibold">
              Lugar y Horario
            </h3>

            <p className="text-text-muted text-base font-light mb-6">
              {WEDDING_CONFIG.venue.notes}
            </p>

            <div className="w-full bg-cream-bg/80 p-5 rounded-xl border border-sage-primary/20 mb-6">
              <div className="flex items-center justify-center gap-3 text-forest-deep font-medium mb-2">
                <Calendar className="w-5 h-5 text-gold-accent" />
                <span>{WEDDING_CONFIG.dateDisplayText}</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-forest-deep font-medium">
                <Clock className="w-5 h-5 text-gold-accent" />
                <span>{WEDDING_CONFIG.timeDisplayText}</span>
              </div>
            </div>

            {WEDDING_CONFIG.venue.isVenueDefined ? (
              <a
                href={WEDDING_CONFIG.venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
              >
                <Navigation className="w-4 h-4" />
                Ver Ubicación en Google Maps
              </a>
            ) : (
              <span className="px-4 py-2 rounded-full bg-gold-accent/20 text-gold-accent border border-gold-accent/40 text-xs font-semibold uppercase tracking-wider">
                📍 Ubicación en definición
              </span>
            )}
          </div>

          {/* Tarjeta 2: Código de Vestimenta */}
          <div className="glass-card p-8 sm:p-10 border-gold-accent/30 shadow-soft flex flex-col items-center justify-between text-center">
            <div className="p-4 rounded-full bg-gold-accent/10 text-gold-accent mb-6">
              <Shirt className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-forest-deep mb-3 font-semibold">
              Código de Vestimenta
            </h3>

            <p className="font-serif text-xl text-gold-accent font-medium mb-3">
              {WEDDING_CONFIG.dressCode.title}
            </p>

            <p className="text-text-muted text-sm font-light leading-relaxed mb-6">
              {WEDDING_CONFIG.dressCode.description}
            </p>

            {/* Muestras de Color Sugeridas */}
            <div className="w-full bg-cream-bg/80 p-5 rounded-xl border border-sage-primary/20 mb-4">
              <p className="text-xs uppercase tracking-widest text-sage-dark font-semibold mb-3">
                Paleta Sugerida
              </p>
              <div className="flex justify-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#879B89] shadow-md border border-white" title="Verde Eucalipto" />
                <div className="w-8 h-8 rounded-full bg-[#C5A880] shadow-md border border-white" title="Dorado Champaña" />
                <div className="w-8 h-8 rounded-full bg-[#2C3E30] shadow-md border border-white" title="Verde Botánico" />
                <div className="w-8 h-8 rounded-full bg-[#EFECE6] shadow-md border border-white" title="Crema" />
              </div>
            </div>

            <p className="text-xs text-sage-dark font-medium italic">
              {WEDDING_CONFIG.dressCode.colorsReserved}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
