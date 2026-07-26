import React, { useState, useEffect } from 'react';
import { Sparkles, Mail } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingData';

export default function EnvelopeModal({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get('nombre') || params.get('n');
    if (nombre) setGuestName(decodeURIComponent(nombre));
  }, []);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    if (onOpen) onOpen();

    setTimeout(() => {
      setIsDismissed(true);
    }, 1900);
  };

  if (isDismissed) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 transition-all duration-1000 ${
        isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(circle at center, rgba(44,62,48,0.96) 0%, rgba(28,43,32,0.99) 100%)',
        backdropFilter: 'blur(16px)'
      }}
    >
      {/* Texto de Encabezado */}
      <div className="text-center mb-8 text-white max-w-sm">
        <p className="text-xs uppercase tracking-[0.35em] text-gold-accent font-bold mb-2 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-gold-accent animate-spin" />
          Invitación Exclusiva
          <Sparkles className="w-4 h-4 text-gold-accent animate-spin" />
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-cream-bg font-normal">
          {WEDDING_CONFIG.couple.bride} & {WEDDING_CONFIG.couple.groom}
        </h2>
        {guestName && (
          <p className="text-xs text-gold-light mt-2 font-medium tracking-wider">
            Con cariño para: <strong className="text-white font-semibold">{guestName}</strong>
          </p>
        )}
      </div>

      {/* Contenedor del Sobre Físico 3D */}
      <div className="perspective-container w-full max-w-md flex justify-center">
        <div className={`envelope-3d ${isOpen ? 'open' : ''}`}>
          
          {/* Solapas Laterales e Inferior del Sobre */}
          <div className="envelope-flap-left" />
          <div className="envelope-flap-right" />
          <div className="envelope-flap-bottom" />

          {/* Solapa Superior Rotatoria V-Shape */}
          <div className="envelope-flap-top" />

          {/* Sello de Lacre Dorado perfectamente propocionado y centrado */}
          <div 
            onClick={handleOpenEnvelope} 
            className="wax-seal"
            title="Haz clic para abrir invitación"
          >
            <span className="seal-monogram">
              E & D
            </span>
          </div>

          {/* Carta Interior (Hidden when closed, slides up when open) */}
          <div className="envelope-letter flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-widest text-sage-dark font-bold mb-1">
              Nos Casamos
            </span>
            <h3 className="font-serif text-2xl text-forest-deep font-bold mb-1">
              {WEDDING_CONFIG.couple.fullTitle}
            </h3>
            <p className="text-xs text-gold-accent font-semibold mb-2">
              {WEDDING_CONFIG.dateDisplayText}
            </p>
            <div className="w-10 h-0.5 bg-sage-primary/40 my-1" />
            <p className="text-[11px] text-text-muted italic">
              «Y sobre todas estas cosas vestíos de amor»
            </p>
          </div>

        </div>
      </div>

      {/* Botón para Abrir Invitación */}
      <div className="mt-12 text-center">
        <button
          onClick={handleOpenEnvelope}
          disabled={isOpen}
          className="btn-primary btn-gold text-xs font-bold uppercase tracking-[0.2em] px-8 py-3.5 rounded-full shadow-gold hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
        >
          <Mail className="w-4 h-4" />
          {isOpen ? 'Abriendo Invitación...' : 'Abrir Invitación de Boda'}
        </button>
      </div>

    </div>
  );
}
