import React, { useState } from 'react';
import { Gift, Copy, Check, HeartHandshake } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingData';

export default function Gifts() {
  const [copiedAccount, setCopiedAccount] = useState(null);

  const handleCopy = (number, bankName) => {
    navigator.clipboard.writeText(number);
    setCopiedAccount(bankName);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  return (
    <section className="py-20 px-4 bg-cream-bg text-center">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-center mb-3">
          <div className="p-3 rounded-full bg-gold-accent/10 border border-gold-accent/30 text-gold-accent">
            <Gift className="w-6 h-6" />
          </div>
        </div>

        <p className="text-xs uppercase tracking-[0.35em] text-sage-dark font-bold mb-2">
          Muestras de Cariño
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-forest-deep font-normal mb-6">
          Lluvia de Sobres
        </h2>

        <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-12">
          {WEDDING_CONFIG.gifts.description}
        </p>

        {/* Tarjetas de Cuentas Nequi / Daviplata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
          {WEDDING_CONFIG.gifts.accounts.map((account, idx) => (
            <div
              key={idx}
              className="glass-card p-6 border-gold-accent/30 shadow-soft flex flex-col items-center justify-between transform transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-forest-deep text-gold-accent flex items-center justify-center font-bold text-lg mb-4 shadow-md">
                {account.bank[0]}
              </div>

              <h4 className="font-serif text-2xl text-forest-deep font-semibold mb-1">
                {account.bank}
              </h4>
              
              <p className="text-xs text-sage-dark font-medium uppercase tracking-wider mb-4">
                Titular: {account.holder}
              </p>

              <div className="w-full bg-cream-bg p-3 rounded-xl border border-sage-primary/30 flex items-center justify-between mb-4">
                <span className="font-mono text-lg font-bold text-forest-deep tracking-wider">
                  {account.number}
                </span>
                <button
                  onClick={() => handleCopy(account.number, account.bank)}
                  className={`p-2 rounded-lg transition-all ${
                    copiedAccount === account.bank
                      ? 'bg-sage-primary text-white'
                      : 'bg-white text-forest-deep hover:bg-gold-accent hover:text-white shadow-sm'
                  }`}
                  aria-label={`Copiar número de ${account.bank}`}
                  title="Copiar número"
                >
                  {copiedAccount === account.bank ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {copiedAccount === account.bank && (
                <span className="text-xs font-semibold text-sage-dark animate-fade-in">
                  ✓ ¡Número copiado al portapapeles!
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Mensaje de Sobre Presencial */}
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-sage-primary/10 border border-sage-primary/30 text-forest-deep text-sm font-medium">
          <HeartHandshake className="w-5 h-5 text-gold-accent" />
          <span>También dispondremos de un buzón de sobres el día del evento</span>
        </div>

      </div>
    </section>
  );
}
