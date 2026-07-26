/* ============================================================
   CONFIGURACIÓN PRINCIPAL DE LA BODA - ERLINDA & DANIEL
   ============================================================ */

export const WEDDING_CONFIG = {
  couple: {
    bride: "Erlinda",
    groom: "Daniel",
    fullTitle: "Erlinda & Daniel",
    monogram: "E & D"
  },
  
  // ESTADO DE FECHA Y HORA DEFINIDAS
  isDateDefined: true,
  
  // Fecha objetivo: 9 de Enero de 2027 a las 7:00 PM
  targetDate: "2027-01-09T19:00:00",
  
  dateDisplayText: "Sábado, 9 de Enero de 2027",
  timeDisplayText: "7:00 PM",

  // LUGAR DE CEREMONIA Y RECEPCIÓN
  venue: {
    isVenueDefined: true,
    ceremony: {
      title: "Ceremonia Religiosa",
      place: "Parroquia La Hermita",
      time: "7:00 PM",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Parroquia+La+Hermita"
    },
    reception: {
      title: "Recepción y Celebración",
      place: "Villa Adriana",
      time: "Desde las 8:00 PM",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Villa+Adriana"
    },
    notes: "Acompáñanos a la ceremonia religiosa en la Parroquia La Hermita a las 7:00 PM, y posteriormente a la celebración en Villa Adriana desde las 8:00 PM."
  },

  // CONTACTOS DE WHATSAPP PARA CONFIRMACIONES (000000000)
  whatsappContacts: [
    {
      name: "Erlinda & Daniel",
      phone: "000000000",
      label: "Confirmar con los Novios"
    },
    {
      name: "Coordinación",
      phone: "000000000",
      label: "Confirmar por WhatsApp Secundario"
    }
  ],

  // CÓDIGO DE VESTIMENTA (DRESS CODE)
  dressCode: {
    title: "Vestimenta Elegante / Etiqueta Formal",
    description: "Les pedimos asistir en vestimenta elegante para celebrar juntos este día tan especial.",
    colorsReserved: [
      "Blanco y Marfil reservados exclusivamente para la novia 👰‍♀️",
      "Color Champaña reservado exclusivamente para las damas de honor 🥂"
    ]
  },

  // LLUVIA DE SOBRES EN FÍSICO (SIN CUENTAS NI BANCARIZACIÓN)
  gifts: {
    type: "Lluvia de Sobres",
    description: "Tu presencia en nuestra boda es nuestro mejor regalo. Si deseas hacernos un presente, dispondremos de un buzón especial el día del evento para sobres en físico.",
    accounts: []
  },

  // VERSÍCULO O CITA BÍBLICA
  verse: {
    quote: "«Y sobre todas estas cosas vestíos de amor, que es el vínculo perfecto.»",
    reference: "Colosenses 3:14"
  },

  // MÚSICA AMBIENTAL
  audioTrackUrl: "/audio/romantic-wedding.mp3"
};
