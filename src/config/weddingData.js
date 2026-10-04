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

  // LUGAR DE CEREMONIA Y RECEPCIÓN (MONTELÍBANO, CÓRDOBA)
  venue: {
    isVenueDefined: true,
    city: "Montelíbano, Córdoba",
    ceremony: {
      title: "Ceremonia Religiosa",
      place: "Parroquia La Hermita",
      city: "Montelíbano, Córdoba",
      time: "7:00 PM",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Parroquia+La+Hermita+Montelibano+Cordoba+Colombia",
      wazeUrl: "https://waze.com/ul?q=Parroquia+La+Hermita+Montelibano+Cordoba&navigate=yes"
    },
    reception: {
      title: "Recepción y Celebración",
      place: "Villa Adriana",
      city: "Montelíbano, Córdoba",
      time: "Desde las 8:00 PM",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Villa+Adriana+Montelibano+Cordoba+Colombia",
      wazeUrl: "https://waze.com/ul?q=Villa+Adriana+Montelibano+Cordoba&navigate=yes"
    },
    notes: "Acompáñanos a la ceremonia religiosa en la Parroquia La Hermita a las 7:00 PM, y posteriormente a la celebración en Villa Adriana (Montelíbano, Córdoba) desde las 8:00 PM."
  },

  // CONFIGURACIÓN PARA AGENDAR EN CALENDARIOS (Google Calendar / iCal)
  calendarEvent: {
    title: "Boda de Erlinda & Daniel 💍",
    description: "¡Nos casamos! Acompáñanos a celebrar nuestra unión matrimonial.\n\n⛪ 7:00 PM - Ceremonia Religiosa en Parroquia La Hermita\n🥂 8:00 PM - Recepción y Fiesta en Villa Adriana\n📍 Montelíbano, Córdoba\n👔 Dress Code: Etiqueta Formal (Blanco/Marfil y Champaña reservados)",
    location: "Parroquia La Hermita & Villa Adriana, Montelíbano, Córdoba, Colombia",
    googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+de+Erlinda+%26+Daniel+%F0%9F%92%8D&dates=20270110T000000Z/20270110T070000Z&details=%C2%A1Nos+casamos%21+Acomp%C3%A1%C3%B1anos+a+celebrar+nuestra+uni%C3%B3n+matrimonial.%0A%0A%E2%9B%AA+7%3A00+PM+-+Ceremonia+Religiosa+en+Parroquia+La+Hermita%0A%F0%9F%A5%82+8%3A00+PM+-+Recepci%C3%B3n+en+Villa+Adriana%0A%F0%9F%93%8D+Montel%C3%ADbano%2C+C%C3%B3rdoba%0A%F0%9F%91%94+Dress+Code%3A+Etiqueta+Formal&location=Parroquia+La+Hermita+%26+Villa+Adriana%2C+Montel%C3%ADbano%2C+C%C3%B3rdoba%2C+Colombia"
  },

  // CONTACTOS DE WHATSAPP PARA CONFIRMACIONES
  whatsappContacts: [
    {
      name: "Erlinda & Daniel",
      phone: "573104588206",
      label: "Confirmar con los Novios (+57 310 458 8206)"
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
