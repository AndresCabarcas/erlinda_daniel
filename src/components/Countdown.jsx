import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Bell, Sparkles } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingData';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    if (!WEDDING_CONFIG.isDateDefined) return;

    const target = new Date(WEDDING_CONFIG.targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-cream-bg via-cream-card to-cream-bg text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        
        <p className="text-xs uppercase tracking-[0.35em] text-sage-dark font-bold mb-2">
          Falta Poco
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-forest-deep font-normal mb-8">
          Cuenta Regresiva
        </h2>

        {WEDDING_CONFIG.isDateDefined ? (
          timeLeft.isExpired ? (
            <div className="glass-card p-10 max-w-xl mx-auto border-gold-accent/40 shadow-elevated">
              <h3 className="font-serif text-3xl text-gold-accent font-bold mb-2">
                ¡Hoy es nuestro gran día! 💒
              </h3>
              <p className="text-text-muted">Gracias por acompañarnos a celebrar este momento inolvidable.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
              {[
                { label: 'Días', value: timeLeft.days },
                { label: 'Horas', value: String(timeLeft.hours).padStart(2, '0') },
                { label: 'Minutos', value: String(timeLeft.minutes).padStart(2, '0') },
                { label: 'Segundos', value: String(timeLeft.seconds).padStart(2, '0') }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="glass-card p-6 sm:p-8 flex flex-col items-center justify-center border-sage-primary/30 shadow-soft hover:border-gold-accent transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="font-serif text-4xl sm:text-6xl font-bold text-forest-deep leading-none mb-2">
                    {item.value}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-sage-dark font-semibold">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )
        ) : (
          /* Estado elegante de Expectativa cuando la fecha está TBD */
          <div className="glass-card p-8 sm:p-12 max-w-2xl mx-auto border-gold-accent/40 shadow-elevated relative">
            <div className="inline-flex p-4 rounded-full bg-gold-accent/10 border border-gold-accent/30 text-gold-accent mb-6 animate-pulse">
              <Calendar className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-forest-deep mb-4 font-semibold">
              ¡Estamos preparando cada detalle con amor!
            </h3>
            
            <p className="text-text-muted text-base sm:text-lg font-light leading-relaxed mb-6">
              Muy pronto anunciaremos la fecha exacta de nuestra boda y activaremos la cuenta regresiva oficial.
            </p>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sage-primary/10 border border-sage-primary/30 text-sage-dark text-xs sm:text-sm font-medium">
              <Bell className="w-4 h-4 text-gold-accent" />
              <span>Te notificaremos tan pronto esté disponible la fecha oficial</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
