import React, { useState } from 'react';
import { Gift, HeartHandshake, Mail, Copy, Check } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingData';

export default function Gifts() {
  const [copiedAccount, setCopiedAccount] = useState(null);

  const handleCopy = (number, bankName) => {
    navigator.clipboard.writeText(number);
    setCopiedAccount(bankName);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const accounts = WEDDING_CONFIG.gifts?.accounts || [];

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

        {/* Tarjeta de Lluvia de Sobres en Físico */}
        <div className="glass-card p-8 sm:p-12 border-gold-accent/40 shadow-elevated max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-sage-primary/15 text-sage-primary flex items-center justify-center mx-auto mb-6 border border-sage-primary/30">
            <Mail className="w-8 h-8 text-forest-deep" />
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-forest-deep font-semibold mb-4">
            Sobres en Físico
          </h3>

          <p className="text-text-muted text-base sm:text-lg font-light leading-relaxed mb-8">
            {WEDDING_CONFIG.gifts?.description || 'Tu presencia en nuestra boda es nuestro mejor regalo.'}
          </p>

          {accounts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
              {accounts.map((account, idx) => (
                <div
                  key={idx}
                  className="glass-card p-6 border-gold-accent/30 shadow-soft flex flex-col items-center justify-between"
                >
                  <h4 className="font-serif text-2xl text-forest-deep font-semibold mb-1">
                    {account.bank}
                  </h4>
                  <div className="w-full bg-cream-bg p-3 rounded-xl border border-sage-primary/30 flex items-center justify-between my-2">
                    <span className="font-mono text-lg font-bold text-forest-deep">
                      {account.number}
                    </span>
                    <button
                      onClick={() => handleCopy(account.number, account.bank)}
                      className="p-2 rounded-lg bg-white text-forest-deep hover:bg-gold-accent hover:text-white"
                    >
                      {copiedAccount === account.bank ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-forest-deep text-white text-sm font-medium shadow-md">
            <HeartHandshake className="w-5 h-5 text-gold-accent" />
            <span>Dispondremos de una mesa y buzón de sobres el día de la recepción</span>
          </div>
        </div>

      </div>
    </section>
  );
}
