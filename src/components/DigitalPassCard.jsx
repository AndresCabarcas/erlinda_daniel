import React, { useRef } from 'react';
import { Download, Heart, Calendar, MapPin, Shirt, CheckCircle } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingData';

export default function DigitalPassCard({ guestName, guestsCount, onClose }) {
  const cardRef = useRef(null);

  const handleDownload = () => {
    // Generar captura o imprimir pase digital en ventana emergente limpia para guardar como PDF/Imagen
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Pase Digital - Boda ${guestName}</title>
          <style>
            body {
              font-family: 'Plus Jakarta Sans', sans-serif;
              background-color: #F8F7F4;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              padding: 20px;
            }
            .pass-card {
              background: #FFFFFF;
              border: 2px solid #C5A880;
              border-radius: 24px;
              padding: 36px;
              max-width: 450px;
              width: 100%;
              text-align: center;
              box-shadow: 0 20px 40px rgba(44, 62, 48, 0.15);
            }
            .title { font-family: Georgia, serif; font-size: 32px; color: #2C3E30; margin: 10px 0; }
            .subtitle { color: #879B89; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; }
            .guest-box { background: #F8F7F4; border: 1px solid #879B89; border-radius: 16px; padding: 16px; margin: 20px 0; }
            .guest-name { font-size: 22px; color: #2C3E30; font-weight: bold; }
            .passes { color: #C5A880; font-weight: bold; margin-top: 6px; font-size: 14px; }
            .details { text-align: left; font-size: 13px; color: #5C665D; line-height: 1.8; margin-top: 20px; }
            .footer { margin-top: 24px; font-size: 11px; color: #879B89; text-transform: uppercase; letter-spacing: 1px; }
          </style>
        </head>
        <body>
          <div class="pass-card">
            <div class="subtitle">Pase Oficial de Asistencia</div>
            <div class="title">Erlinda & Daniel</div>
            
            <div class="guest-box">
              <div class="guest-name">${guestName}</div>
              <div class="passes">Pases Asignados: ${guestsCount}</div>
            </div>

            <div class="details">
              <p>📅 <strong>Fecha:</strong> ${WEDDING_CONFIG.dateDisplayText}</p>
              <p>⛪ <strong>Ceremonia (7:00 PM):</strong> Parroquia La Ermita · Montelíbano, Córdoba</p>
              <p>🥂 <strong>Recepción (8:00 PM):</strong> Villa Adriana · Montelíbano, Córdoba</p>
              <p>👔 <strong>Dress Code:</strong> Etiqueta Formal (Reservados Blanco/Marfil y Champaña)</p>
            </div>

            <div class="footer">¡Te esperamos para celebrar juntos! 💍</div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 bg-forest-darker/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-card max-w-md w-full p-8 border-2 border-gold-accent shadow-elevated bg-cream-bg text-center relative rounded-3xl">
        
        <div className="w-14 h-14 rounded-full bg-sage-primary text-white flex items-center justify-center mx-auto mb-4 shadow-md">
          <CheckCircle className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] text-gold-accent font-bold block mb-1">
          Pase Oficial Digital
        </span>

        <h3 className="font-serif text-3xl text-forest-deep font-bold mb-4">
          Erlinda & Daniel
        </h3>

        {/* Tarjeta Visual de Pase */}
        <div
          ref={cardRef}
          className="p-6 rounded-2xl bg-white border border-sage-primary/30 shadow-soft text-left my-4 relative overflow-hidden"
        >
          <div className="text-center pb-4 border-b border-sage-primary/20">
            <p className="text-xs uppercase tracking-widest text-sage-dark font-medium">Invitado Confirmado</p>
            <h4 className="font-serif text-2xl text-forest-deep font-bold mt-1">{guestName}</h4>
            <span className="inline-block mt-2 px-3 py-1 bg-gold-accent/15 text-gold-accent font-bold text-xs rounded-full border border-gold-accent/40">
              Pases Confirmados: {guestsCount}
            </span>
          </div>

          <div className="pt-4 space-y-2 text-xs text-text-muted">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sage-primary shrink-0" />
              <span>{WEDDING_CONFIG.dateDisplayText}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sage-primary shrink-0" />
              <span>Montelíbano, Córdoba (Parroquia La Ermita & Villa Adriana)</span>
            </div>
            <div className="flex items-center gap-2">
              <Shirt className="w-4 h-4 text-sage-primary shrink-0" />
              <span>Etiqueta Formal (Blanco/Marfil & Champaña reservados)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={handleDownload}
            className="btn-primary btn-gold flex-1 py-3 text-xs uppercase tracking-wider font-bold"
          >
            <Download className="w-4 h-4" />
            Descargar / Guardar Pase
          </button>
          
          <button
            onClick={onClose}
            className="btn-outline flex-1 py-3 text-xs uppercase tracking-wider font-bold"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
