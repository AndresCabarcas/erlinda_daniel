import React from 'react';
import Hero from './components/Hero';
import Blessing from './components/Blessing';
import Countdown from './components/Countdown';
import Gallery from './components/Gallery';
import Details from './components/Details';
import Gifts from './components/Gifts';
import RSVPForm from './components/RSVPForm';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-cream-bg font-sans selection:bg-sage-primary selection:text-white">
      {/* Control ambiental de música romántica */}
      <MusicPlayer />

      {/* Hero Principal con Banner Fotográfico y Personalización URL */}
      <Hero />

      {/* Cita Bíblica / Bendición de Fe */}
      <Blessing />

      {/* Reloj o Estado de Expectativa TBD */}
      <Countdown />

      {/* Galería Fotográfica de la Sesión de Fotos con Visor Lightbox */}
      <Gallery />

      {/* Detalles: Cuándo, Dónde & Código de Vestimenta */}
      <Details />

      {/* Lluvia de Sobres / Cuentas Bancarias Nequi y Daviplata con Copiado */}
      <Gifts />

      {/* Confirmación RSVP (Firebase Firestore + WhatsApp) */}
      <RSVPForm />

      {/* Pie de Página */}
      <Footer />
    </div>
  );
}
