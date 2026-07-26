import React, { useState } from 'react';
import EnvelopeModal from './components/EnvelopeModal';
import Hero from './components/Hero';
import Blessing from './components/Blessing';
import Countdown from './components/Countdown';
import Gallery from './components/Gallery';
import Details from './components/Details';
import Gifts from './components/Gifts';
import RSVPForm from './components/RSVPForm';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [musicTrigger, setMusicTrigger] = useState(0);

  const handleEnvelopeOpen = () => {
    // Al abrir el sobre virtual, incrementar trigger para reproducir música inmediatamente
    setMusicTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-cream-bg font-sans selection:bg-sage-primary selection:text-white">
      {/* Sobre Virtual de Bienvenida (Apertura interactiva) */}
      <EnvelopeModal onOpen={handleEnvelopeOpen} />

      {/* Control ambiental de música romántica */}
      <MusicPlayer autoPlayTrigger={musicTrigger} />

      {/* Hero Principal con Banner Fotográfico y Personalización URL */}
      <Hero />

      {/* Cita Bíblica / Bendición de Fe */}
      <Blessing />

      {/* Reloj de Cuenta Regresiva */}
      <Countdown />

      {/* Galería Fotográfica con Visor Lightbox */}
      <Gallery />

      {/* Detalles: Cuándo, Dónde & Código de Vestimenta */}
      <Details />

      {/* Lluvia de Sobres en Físico */}
      <Gifts />

      {/* Confirmación RSVP (Canción pedida + Pase Digital Descargable) */}
      <RSVPForm />

      {/* Pie de Página */}
      <Footer onOpenAdmin={() => setShowAdmin(true)} />

      {/* Panel Privado de Administración (Novios) */}
      {showAdmin && (
        <AdminDashboard onClose={() => setShowAdmin(false)} />
      )}
    </div>
  );
}
