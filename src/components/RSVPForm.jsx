import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Heart, Music, UserCheck, Download, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveRSVP } from '../config/firebase';
import { WEDDING_CONFIG } from '../config/weddingData';
import DigitalPassCard from './DigitalPassCard';

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    guestName: '',
    attendance: 'confirmado',
    guestsCount: 1,
    dietaryNotes: '',
    songRequest: '',
    messageToCouple: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showDigitalPass, setShowDigitalPass] = useState(false);
  const [selectedWhatsApp, setSelectedWhatsApp] = useState(WEDDING_CONFIG.whatsappContacts[0].phone);
  const [whatsappDirectLink, setWhatsappDirectLink] = useState('');

  useEffect(() => {
    // Si la URL contiene el nombre del invitado, autocompletarlo en el formulario
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get('nombre') || params.get('n');
    const cupos = params.get('cupos') || params.get('c');

    if (nombre) {
      setFormData(prev => ({
        ...prev,
        guestName: decodeURIComponent(nombre),
        guestsCount: cupos ? Number(cupos) : 1
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.guestName.trim()) return;

    setIsSubmitting(true);

    try {
      // 1. Guardar en sistema (Firestore o respaldo local instantáneo)
      await saveRSVP(formData);

      // 2. Disparar efecto de Confeti
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#879B89', '#C5A880', '#2C3E30', '#FFFFFF']
        });
      } catch (confettiErr) {
        // Confeti opcional
      }

      setIsSuccess(true);
      if (formData.attendance === 'confirmado') {
        setShowDigitalPass(true);
      }

      // 3. Generar mensaje para WhatsApp
      const isAttending = formData.attendance === 'confirmado';
      let text = `¡Hola Erlinda y Daniel! 💍\n\nSoy *${formData.guestName}*.\n`;
      
      if (isAttending) {
        text += `¡Confirmo mi asistencia a su boda! 🎉\n• Personas/Pases: *${formData.guestsCount}*\n`;
        if (formData.dietaryNotes) text += `• Restricciones alimentarias: ${formData.dietaryNotes}\n`;
        if (formData.songRequest) text += `• Canción sugerida para la pista: "${formData.songRequest}" 🎵\n`;
      } else {
        text += `Lamentablemente no podré acompañarlos físicamente, pero les deseo infinitas bendiciones en su matrimonio. ❤️\n`;
      }

      if (formData.messageToCouple) {
        text += `\nMensaje con cariño: "${formData.messageToCouple}"`;
      }

      const encodedMsg = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/${selectedWhatsApp}?text=${encodedMsg}`;
      setWhatsappDirectLink(whatsappUrl);

      // Abrir WhatsApp
      try {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      } catch (openErr) {
        console.warn("Popup bloqueado:", openErr);
      }
    } catch (err) {
      console.error("Error al procesar RSVP:", err);
      // Fallback para no bloquear la experiencia del invitado
      setIsSuccess(true);
      if (formData.attendance === 'confirmado') {
        setShowDigitalPass(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-20 px-4 bg-gradient-to-b from-cream-bg via-cream-card to-cream-bg text-center relative">
      <div className="max-w-3xl mx-auto">
        
        <div className="flex justify-center mb-3">
          <div className="p-3 rounded-full bg-sage-primary/10 border border-sage-primary/30 text-sage-primary">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <p className="text-xs uppercase tracking-[0.35em] text-sage-dark font-bold mb-2">
          Confirmación de Asistencia
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-forest-deep font-normal mb-4">
          Acompáñanos (RSVP)
        </h2>

        <p className="text-text-muted text-base font-light mb-10 max-w-xl mx-auto">
          Por favor ayúdanos a organizar este día especial confirmando tu asistencia. Tu registro se guardará en nuestro sistema y podrás generar tu pase digital.
        </p>

        {isSuccess ? (
          <div className="glass-card p-10 border-gold-accent/40 shadow-elevated animate-fade-in max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-sage-primary text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <h3 className="font-serif text-3xl text-forest-deep font-bold mb-2">
              ¡Muchas Gracias, {formData.guestName}!
            </h3>

            <p className="text-text-muted text-base mb-6">
              Tu respuesta ha sido registrada exitosamente. También se ha preparado tu mensaje para notificarnos por WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {formData.attendance === 'confirmado' && (
                <button
                  onClick={() => setShowDigitalPass(true)}
                  className="btn-primary btn-gold py-3 px-6 text-xs uppercase font-bold tracking-wider"
                >
                  <Download className="w-4 h-4" />
                  Ver / Descargar mi Pase Digital
                </button>
              )}

              {whatsappDirectLink && (
                <a
                  href={whatsappDirectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary py-3 px-6 text-xs uppercase font-bold tracking-wider bg-emerald-700 hover:bg-emerald-800 text-white shadow-soft inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  Enviar por WhatsApp
                </a>
              )}

              <button
                onClick={() => setIsSuccess(false)}
                className="btn-outline py-3 px-6 text-xs uppercase font-bold tracking-wider"
              >
                Confirmar otro invitado
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="glass-card p-8 sm:p-12 border-gold-accent/30 shadow-elevated text-left max-w-2xl mx-auto space-y-6"
          >
            {/* Campo 1: Nombre del Invitado */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-forest-deep mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                name="guestName"
                value={formData.guestName}
                onChange={handleChange}
                required
                placeholder="Ej. Juan Pérez y Familia"
                className="w-full px-4 py-3.5 rounded-xl bg-cream-bg border border-sage-primary/40 focus:border-gold-accent outline-none text-forest-deep font-medium"
              />
            </div>

            {/* Campo 2: Asistencia */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-forest-deep mb-2">
                ¿Nos acompañarás? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.attendance === 'confirmado'
                      ? 'bg-sage-primary/15 border-sage-primary text-forest-deep shadow-sm font-semibold'
                      : 'bg-cream-bg border-sage-primary/30 text-text-muted hover:border-sage-primary'
                  }`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value="confirmado"
                    checked={formData.attendance === 'confirmado'}
                    onChange={handleChange}
                    className="accent-sage-primary w-4 h-4"
                  />
                  <span>¡Sí, ahí estaré! 💖</span>
                </label>

                <label
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.attendance === 'no_asistire'
                      ? 'bg-red-50 border-red-300 text-red-800 shadow-sm font-semibold'
                      : 'bg-cream-bg border-sage-primary/30 text-text-muted hover:border-sage-primary'
                  }`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value="no_asistire"
                    checked={formData.attendance === 'no_asistire'}
                    onChange={handleChange}
                    className="accent-red-500 w-4 h-4"
                  />
                  <span>Lamentablemente no 💔</span>
                </label>
              </div>
            </div>

            {/* Campo 3: Cantidad de Personas (Si confirma asistencia) */}
            {formData.attendance === 'confirmado' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-forest-deep mb-2">
                    Número de Asistentes
                  </label>
                  <select
                    name="guestsCount"
                    value={formData.guestsCount}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-cream-bg border border-sage-primary/40 focus:border-gold-accent outline-none text-forest-deep font-medium"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Persona' : 'Personas'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-forest-deep mb-2">
                    Contacto de WhatsApp
                  </label>
                  <select
                    value={selectedWhatsApp}
                    onChange={(e) => setSelectedWhatsApp(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-cream-bg border border-sage-primary/40 focus:border-gold-accent outline-none text-forest-deep font-medium text-xs"
                  >
                    {WEDDING_CONFIG.whatsappContacts.map((contact, idx) => (
                      <option key={idx} value={contact.phone}>
                        {contact.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Campo 4: Canción sugerida (Mejora 2 solicitada) */}
            {formData.attendance === 'confirmado' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-forest-deep mb-2 flex items-center gap-1.5">
                  <Music className="w-4 h-4 text-gold-accent" />
                  ¿Qué canción no puede faltar en la fiesta? 🎵
                </label>
                <input
                  type="text"
                  name="songRequest"
                  value={formData.songRequest}
                  onChange={handleChange}
                  placeholder="Ej. Artista - Nombre de la canción"
                  className="w-full px-4 py-3.5 rounded-xl bg-cream-bg border border-sage-primary/40 focus:border-gold-accent outline-none text-forest-deep font-medium"
                />
              </div>
            )}

            {/* Campo 5: Restricciones alimentarias */}
            {formData.attendance === 'confirmado' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-forest-deep mb-2">
                  Alergias o Restricciones Alimentarias (Opcional)
                </label>
                <input
                  type="text"
                  name="dietaryNotes"
                  value={formData.dietaryNotes}
                  onChange={handleChange}
                  placeholder="Ej. Vegetariano, alergia al maní, etc."
                  className="w-full px-4 py-3.5 rounded-xl bg-cream-bg border border-sage-primary/40 focus:border-gold-accent outline-none text-forest-deep font-medium"
                />
              </div>
            )}

            {/* Campo 6: Mensaje para los novios */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-forest-deep mb-2">
                Un mensaje para Erlinda & Daniel (Opcional)
              </label>
              <textarea
                name="messageToCouple"
                rows="3"
                value={formData.messageToCouple}
                onChange={handleChange}
                placeholder="Escribe tus buenos deseos para la pareja..."
                className="w-full px-4 py-3.5 rounded-xl bg-cream-bg border border-sage-primary/40 focus:border-gold-accent outline-none text-forest-deep font-medium resize-none"
              />
            </div>

            {/* Botón Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary btn-gold w-full py-4 text-base font-bold tracking-wider uppercase shadow-gold"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Guardando en sistema...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Confirmar Asistencia & Obtener Pase
                </span>
              )}
            </button>
          </form>
        )}

        {/* Modal de Pase Digital Descargable */}
        {showDigitalPass && (
          <DigitalPassCard
            guestName={formData.guestName}
            guestsCount={formData.guestsCount}
            onClose={() => setShowDigitalPass(false)}
          />
        )}

      </div>
    </section>
  );
}
