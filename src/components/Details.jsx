import React from 'react';
import { MapPin, Calendar, Clock, Shirt, Church, PartyPopper, Lock, Navigation } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingData';

export default function Details() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-cream-bg via-cream-card to-cream-bg text-center">
      <div className="max-w-6xl mx-auto">
        
        <p className="text-xs uppercase tracking-[0.35em] text-sage-dark font-bold mb-2">
          Detalles de la Celebración
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-forest-deep font-normal mb-16">
          Cuándo, Dónde & Código de Vestimenta
        </h2>

        {/* Tarjetas de Lugares: Ceremonia + Recepción */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Tarjeta 1: Ceremonia Religiosa - Parroquia La Hermita */}
          <div className="glass-card p-8 sm:p-10 border-gold-accent/30 shadow-soft flex flex-col items-center justify-between text-center relative overflow-hidden transform transition-all duration-300 hover:-translate-y-1">
            <div className="p-4 rounded-full bg-sage-primary/10 text-sage-primary mb-4">
              <Church className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-widest text-gold-accent font-bold mb-1">
              {WEDDING_CONFIG.venue.ceremony.title}
            </span>

            <h3 className="font-serif text-3xl text-forest-deep font-bold mb-2">
              {WEDDING_CONFIG.venue.ceremony.place}
            </h3>

            <div className="w-full bg-cream-bg/90 p-4 rounded-xl border border-sage-primary/20 my-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-forest-deep font-medium">
                <Calendar className="w-4 h-4 text-gold-accent" />
                <span>{WEDDING_CONFIG.dateDisplayText}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-forest-deep font-semibold">
                <Clock className="w-4 h-4 text-gold-accent" />
                <span>Hora: {WEDDING_CONFIG.venue.ceremony.time}</span>
              </div>
            </div>

            <a
              href={WEDDING_CONFIG.venue.ceremony.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full mt-2"
            >
              <Navigation className="w-4 h-4" />
              Ver Parroquia en Maps
            </a>
          </div>

          {/* Tarjeta 2: Recepción - Villa Adriana */}
          <div className="glass-card p-8 sm:p-10 border-gold-accent/30 shadow-soft flex flex-col items-center justify-between text-center relative overflow-hidden transform transition-all duration-300 hover:-translate-y-1">
            <div className="p-4 rounded-full bg-gold-accent/10 text-gold-accent mb-4">
              <PartyPopper className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-widest text-sage-dark font-bold mb-1">
              {WEDDING_CONFIG.venue.reception.title}
            </span>

            <h3 className="font-serif text-3xl text-forest-deep font-bold mb-2">
              {WEDDING_CONFIG.venue.reception.place}
            </h3>

            <div className="w-full bg-cream-bg/90 p-4 rounded-xl border border-sage-primary/20 my-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-forest-deep font-medium">
                <Calendar className="w-4 h-4 text-gold-accent" />
                <span>{WEDDING_CONFIG.dateDisplayText}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-forest-deep font-semibold">
                <Clock className="w-4 h-4 text-gold-accent" />
                <span>Recepción: {WEDDING_CONFIG.venue.reception.time}</span>
              </div>
            </div>

            <a
              href={WEDDING_CONFIG.venue.reception.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-gold w-full mt-2"
            >
              <Navigation className="w-4 h-4" />
              Ver Recepción en Maps
            </a>
          </div>

        </div>

        {/* Tarjeta 3: Código de Vestimenta (Dress Code) */}
        <div className="glass-card p-8 sm:p-12 border-gold-accent/40 shadow-elevated max-w-3xl mx-auto text-center">
          <div className="p-4 rounded-full bg-forest-deep/10 text-forest-deep inline-flex mb-4">
            <Shirt className="w-8 h-8 text-sage-primary" />
          </div>

          <p className="text-xs uppercase tracking-[0.3em] text-sage-dark font-bold mb-1">
            Código de Vestimenta
          </p>

          <h3 className="font-serif text-4xl text-forest-deep font-bold mb-3">
            {WEDDING_CONFIG.dressCode.title}
          </h3>

          <p className="text-text-muted text-base font-light leading-relaxed mb-8 max-w-xl mx-auto">
            {WEDDING_CONFIG.dressCode.description}
          </p>

          {/* Reservas de Colores Exclusivas */}
          <div className="w-full bg-cream-bg p-6 rounded-2xl border border-gold-accent/30 text-left space-y-4">
            <p className="text-xs uppercase tracking-widest text-forest-deep font-bold text-center mb-2">
              Colores Reservados Exclusivamente
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-sage-primary/20 shadow-sm">
                <div className="w-7 h-7 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shrink-0">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <div>
                  <span className="text-xs font-bold text-forest-deep block">Blanco / Marfil</span>
                  <span className="text-xs text-text-muted">Reservado para la Novia 👰‍♀️</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-gold-accent/30 shadow-sm">
                <div className="w-7 h-7 rounded-full bg-[#C5A880] border-2 border-gold-accent flex items-center justify-center shrink-0">
                  <Lock className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <span className="text-xs font-bold text-forest-deep block">Color Champaña</span>
                  <span className="text-xs text-text-muted">Reservado para Damas de Honor 🥂</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
