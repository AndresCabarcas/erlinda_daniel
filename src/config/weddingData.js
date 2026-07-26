/* ============================================================
   CONFIGURACIÓN PRINCIPAL DE LA BODA - ERLINDA & DANIEL
   ============================================================
   Edita este archivo cuando la pareja confirme la fecha, hora
   y lugar definitivos de la ceremonia y recepción.
   ============================================================ */

export const WEDDING_CONFIG = {
  couple: {
    bride: "Erlinda",
    groom: "Daniel",
    fullTitle: "Erlinda & Daniel",
    monogram: "E & D"
  },
  
  // DATOS DE PRUEBA ACTIVOS PARA VER EL CONTEO REGRESIVO Y UBICACIÓN
  isDateDefined: true,
  
  // Fecha objetivo de prueba (Noviembre 28, 2026 a las 5:00 PM)
  targetDate: "2026-11-28T17:00:00",
  
  dateDisplayText: "Sábado, 28 de Noviembre de 2026",
  timeDisplayText: "5:00 PM",

  // INFORMACIÓN DE UBICACIÓN Y LUGAR DE PRUEBA
  venue: {
    isVenueDefined: true,
    name: "Hacienda Villa Real",
    address: "Cartagena de Indias, Colombia",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Cartagena+Colombia",
    notes: "Ceremonia religiosa al atardecer seguida de la gran recepción en el salón principal."
  },

  // CONTACTOS DE WHATSAPP CON NÚMEROS DE PRUEBA ("000000000")
  whatsappContacts: [
    {
      name: "Erlinda & Daniel",
      phone: "000000000", // Número de prueba
      label: "Confirmar con la Novia / Novio"
    },
    {
      name: "Coordinación",
      phone: "000000000", // Número de prueba secundario
      label: "Confirmar por WhatsApp Secundario"
    }
  ],

  // CÓDIGO DE VESTIMENTA (DRESS CODE)
  dressCode: {
    title: "Traje Formal / Elegante",
    description: "Queremos que te sientas radiante en este día especial con nosotros.",
    colorsRecommended: ["Verde Eucalipto / Oliva", "Tonos Beige / Crema", "Gris Sobrio"],
    colorsReserved: "Blanco y Marfil reservados exclusivamente para la novia 👰‍♀️"
  },

  // LLUVIA DE SOBRES Y DERECHO DE REGALOS (Números de prueba)
  gifts: {
    type: "Lluvia de Sobres",
    description: "Tu presencia es nuestro mejor regalo. Si deseas hacernos un presente en efectivo o digital, ponemos a tu disposición:",
    accounts: [
      {
        bank: "Nequi",
        number: "000000000",
        holder: "Erlinda & Daniel"
      },
      {
        bank: "Daviplata",
        number: "000000000",
        holder: "Erlinda & Daniel"
      }
    ]
  },

  // VERSÍCULO O CITA BÍBLICA
  verse: {
    quote: "«Y sobre todas estas cosas vestíos de amor, que es el vínculo perfecto.»",
    reference: "Colosenses 3:14"
  },

  // MÚSICA AMBIENTAL
  audioTrackUrl: "/audio/romantic-wedding.mp3"
};
