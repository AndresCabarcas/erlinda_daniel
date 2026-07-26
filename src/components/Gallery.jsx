import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const PHOTOS = [
  { id: 1, src: '/photos/photo1.jpg', caption: 'Nuestra propuesta inolvidable' },
  { id: 2, src: '/photos/photo2.jpg', caption: 'Momentos de complicidad' },
  { id: 3, src: '/photos/photo3.jpg', caption: 'Un amor con propósito' },
  { id: 4, src: '/photos/photo4.jpg', caption: 'Construyendo nuestros sueños' },
  { id: 5, src: '/photos/photo5.jpg', caption: 'Risas y miradas sinceras' },
  { id: 6, src: '/photos/photo6.jpg', caption: 'Caminando juntos hacia el futuro' },
  { id: 7, src: '/photos/photo7.jpg', caption: 'Felicidad y promesas' },
  { id: 8, src: '/photos/photo8.jpg', caption: 'Erlinda & Daniel' }
];

export default function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const openLightbox = (index) => setSelectedIdx(index);
  const closeLightbox = () => setSelectedIdx(null);
  const prevPhoto = () => setSelectedIdx((prev) => (prev === 0 ? PHOTOS.length - 1 : prev - 1));
  const nextPhoto = () => setSelectedIdx((prev) => (prev === PHOTOS.length - 1 ? 0 : prev + 1));

  return (
    <section className="py-20 px-4 bg-cream-bg text-center">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-center mb-3">
          <div className="p-3 rounded-full bg-sage-primary/10 border border-sage-primary/30">
            <Camera className="w-6 h-6 text-sage-primary" />
          </div>
        </div>

        <p className="text-xs uppercase tracking-[0.35em] text-sage-dark font-bold mb-2">
          Nuestra Historia
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-forest-deep font-normal mb-12">
          Sesión de Fotos
        </h2>

        {/* Grilla de Fotos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PHOTOS.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-soft cursor-pointer border border-sage-primary/20 bg-cream-card transform transition-all duration-500 hover:-translate-y-2 hover:shadow-elevated"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay en Hover con Título e Icono */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-darker/90 via-forest-deep/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                <Maximize2 className="w-6 h-6 text-gold-accent mb-auto self-end opacity-80" />
                <p className="text-xs uppercase tracking-widest text-gold-accent font-semibold mb-1">
                  Erlinda & Daniel
                </p>
                <h4 className="font-serif text-lg text-white font-medium leading-snug">
                  {photo.caption}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Visor Lightbox a Pantalla Completa */}
      {selectedIdx !== null && (
        <div className="fixed inset-0 z-50 bg-forest-darker/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-gold-accent hover:text-forest-darker transition-all"
            aria-label="Cerrar visor"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevPhoto}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-gold-accent hover:text-forest-darker transition-all"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={PHOTOS[selectedIdx].src}
              alt={PHOTOS[selectedIdx].caption}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-gold-accent/30"
            />
            <p className="font-serif text-xl text-cream-bg mt-4 font-light tracking-wide text-center">
              {PHOTOS[selectedIdx].caption}
            </p>
          </div>

          <button
            onClick={nextPhoto}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-gold-accent hover:text-forest-darker transition-all"
            aria-label="Siguiente foto"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </section>
  );
}
