import React from 'react';
import { MapPin, Calendar, Clock, Shirt, Church, PartyPopper, Lock, Navigation, Palette, Sparkles } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingData';
import AddToCalendar from './AddToCalendar';

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-4">
              <a
                href={WEDDING_CONFIG.venue.ceremony.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary py-3 px-3 text-xs uppercase font-bold tracking-wider inline-flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MapPin className="w-4 h-4" />
                Google Maps
              </a>

              <a
                href={WEDDING_CONFIG.venue.ceremony.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline py-3 px-3 text-xs uppercase font-bold tracking-wider inline-flex items-center justify-center gap-1.5 border-sage-primary/40 hover:bg-[#33CCFF] hover:border-[#33CCFF] hover:text-white transition-all"
              >
                <Navigation className="w-4 h-4 text-[#33CCFF]" />
                Abrir en Waze
              </a>
            </div>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-4">
              <a
                href={WEDDING_CONFIG.venue.reception.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-gold py-3 px-3 text-xs uppercase font-bold tracking-wider inline-flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MapPin className="w-4 h-4" />
                Google Maps
              </a>

              <a
                href={WEDDING_CONFIG.venue.reception.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline py-3 px-3 text-xs uppercase font-bold tracking-wider inline-flex items-center justify-center gap-1.5 border-sage-primary/40 hover:bg-[#33CCFF] hover:border-[#33CCFF] hover:text-white transition-all"
              >
                <Navigation className="w-4 h-4 text-[#33CCFF]" />
                Abrir en Waze
              </a>
            </div>
          </div>

        </div>

        {/* Banner para Agendar Boda en el Calendario */}
        <div className="mb-14">
          <AddToCalendar />
        </div>

        {/* Tarjeta 3: Código de Vestimenta (Dress Code) & Paleta Visual */}
        <div className="glass-card p-8 sm:p-12 border-gold-accent/40 shadow-elevated max-w-4xl mx-auto text-center">
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

          {/* 1. Colores Reservados Exclusivamente */}
          <div className="w-full bg-cream-bg p-6 rounded-2xl border border-gold-accent/30 text-left space-y-3 mb-8">
            <p className="text-xs uppercase tracking-widest text-forest-deep font-bold text-center mb-1 flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-gold-accent" />
              Colores Reservados Exclusivamente
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-sage-primary/20 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shrink-0 shadow-inner">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <div>
                  <span className="text-xs font-bold text-forest-deep block">Blanco / Marfil</span>
                  <span className="text-xs text-text-muted">Reservado exclusivamente para la Novia 👰‍♀️</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-gold-accent/30 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#C5A880] border-2 border-gold-accent flex items-center justify-center shrink-0 shadow-inner">
                  <Lock className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <span className="text-xs font-bold text-forest-deep block">Color Champaña</span>
                  <span className="text-xs text-text-muted">Reservado para Damas de Honor 🥂</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Paleta de Colores Sugerida / Recomendada para Invitados */}
          <div className="w-full bg-white/80 p-6 sm:p-8 rounded-2xl border border-sage-primary/30 text-center space-y-4 mb-8">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Palette className="w-4 h-4 text-gold-accent" />
              <p className="text-xs uppercase tracking-widest text-forest-deep font-bold">
                Paleta de Colores Sugerida para Invitados
              </p>
            </div>
            <p className="text-xs text-text-muted max-w-lg mx-auto">
              Te compartimos una gama de tonos armónicos inspirados en nuestra temática botánica de eucalipto para orientar tu atuendo:
            </p>

            {/* Muestras circulares de color */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
              {[
                { name: 'Verde Salvia', hex: '#879B89', label: 'Eucalipto Principal' },
                { name: 'Verde Olivo', hex: '#5B7058', label: 'Tierra Suave' },
                { name: 'Verde Bosque', hex: '#2C3E30', label: 'Esmeralda Profundo' },
                { name: 'Rosa Empolvado', hex: '#D4A59A', label: 'Romántico' },
                { name: 'Arena Cálido', hex: '#D1C2A5', label: 'Lino Tostado' },
                { name: 'Azul Medianoche', hex: '#1E2D3D', label: 'Formal Atemporal' }
              ].map((color, idx) => (
                <div key={idx} className="flex flex-col items-center p-3 rounded-xl bg-cream-bg/70 border border-sage-primary/15 transition-transform hover:-translate-y-1">
                  <div
                    className="w-10 h-10 rounded-full shadow-md border-2 border-white mb-2 transition-transform hover:scale-110"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-[11px] font-bold text-forest-deep leading-tight text-center">
                    {color.name}
                  </span>
                  <span className="text-[10px] text-text-muted text-center">
                    {color.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Guía de Estilo Rápida: Damas & Caballeros */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="p-4 rounded-xl bg-cream-bg border border-sage-primary/20">
              <span className="text-xs uppercase tracking-wider font-bold text-forest-deep block mb-1">
                💃 Para Ellas
              </span>
              <p className="text-xs text-text-muted leading-relaxed">
                Vestido largo o midi en telas fluidas (gasa, satín o crepé). Calzado cómodo para disfrutar de la celebración.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cream-bg border border-sage-primary/20">
              <span className="text-xs uppercase tracking-wider font-bold text-forest-deep block mb-1">
                🤵 Para Ellos
              </span>
              <p className="text-xs text-text-muted leading-relaxed">
                Traje sastre formal oscuro (azul marino, gris oxford o negro), camisa de vestir y corbata elegante.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
