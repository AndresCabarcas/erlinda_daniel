import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Configuración Oficial de Firebase del Proyecto de Boda Erlinda & Daniel
const firebaseConfig = {
  apiKey: "AIzaSyA1S6qq7L5nBUZX7CpsMVPTHGEGkw8N2uo",
  authDomain: "erlinda-daniel.firebaseapp.com",
  projectId: "erlinda-daniel",
  storageBucket: "erlinda-daniel.firebasestorage.app",
  messagingSenderId: "191404876143",
  appId: "1:191404876143:web:0f2a6768a14d768911c89a",
  measurementId: "G-EMH7LYK4SG"
};

// Inicializar Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Inicializar Analytics si está soportado en el navegador
if (typeof window !== "undefined") {
  isSupported().then(yes => {
    if (yes) {
      try {
        getAnalytics(app);
      } catch (e) {
        // Analytics opcional
      }
    }
  });
}

// Inicializar Firestore
export const db = getFirestore(app);
export const isFirebaseConfigured = true;

/**
 * Guarda una confirmación de asistencia (RSVP) en Firestore con respaldo local
 */
export async function saveRSVP(rsvpData) {
  const localRecord = {
    id: 'rsvp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    guestName: rsvpData.guestName || "Invitado",
    attendance: rsvpData.attendance || "confirmado",
    guestsCount: Number(rsvpData.guestsCount) || 1,
    dietaryNotes: rsvpData.dietaryNotes || "",
    songRequest: rsvpData.songRequest || "",
    messageToCouple: rsvpData.messageToCouple || "",
    createdAt: new Date().toISOString()
  };

  // 1. Guardar siempre respaldo inmediato en localStorage del dispositivo
  try {
    const localRSVPs = JSON.parse(localStorage.getItem("wedding_rsvps") || "[]");
    localRSVPs.unshift(localRecord);
    localStorage.setItem("wedding_rsvps", JSON.stringify(localRSVPs));
  } catch (storageErr) {
    console.warn("Aviso localStorage:", storageErr);
  }

  // 2. Guardar en Firestore con timeout de seguridad de 4 segundos
  try {
    const savePromise = addDoc(collection(db, "rsvps"), {
      guestName: localRecord.guestName,
      attendance: localRecord.attendance,
      guestsCount: localRecord.guestsCount,
      dietaryNotes: localRecord.dietaryNotes,
      songRequest: localRecord.songRequest,
      messageToCouple: localRecord.messageToCouple,
      createdAt: serverTimestamp(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : ""
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout Firestore (usando respaldo local)")), 4000)
    );

    const docRef = await Promise.race([savePromise, timeoutPromise]);
    console.log("✓ Confirmación guardada en Firestore con ID:", docRef.id);
    return { success: true, id: docRef.id, isRemote: true };
  } catch (err) {
    console.warn("Aviso sincronización Firestore:", err.code || err.message);
    return { success: true, id: localRecord.id, isLocalFallback: true, error: err.code || err.message };
  }
}

/**
 * Obtiene la lista de confirmaciones (desde Firestore o respaldo local)
 */
export async function fetchRSVPList() {
  let list = [];
  let error = null;

  try {
    const q = query(collection(db, "rsvps"), orderBy("createdAt", "desc"));
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout obteniendo Firestore")), 4000)
    );
    const querySnapshot = await Promise.race([getDocs(q), timeoutPromise]);
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    return { list, error: null };
  } catch (e) {
    error = e.code || e.message;
    console.warn("Leyendo respaldos locales de confirmación:", error);
  }

  try {
    list = JSON.parse(localStorage.getItem("wedding_rsvps") || "[]");
  } catch (e) {
    list = [];
  }

  return { list, error };
}
