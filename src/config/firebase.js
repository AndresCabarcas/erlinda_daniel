import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Configuración de Firebase (remplaza con tus credenciales de proyecto Firebase cuando desees)
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForErlindaAndDanielWedding",
  authDomain: "erlinda-daniel-boda.firebaseapp.com",
  projectId: "erlinda-daniel-boda",
  storageBucket: "erlinda-daniel-boda.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};

// Inicializar Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);

/**
 * Guarda una confirmación de asistencia (RSVP) en Firestore
 */
export async function saveRSVP(rsvpData) {
  try {
    const docRef = await addDoc(collection(db, "rsvps"), {
      guestName: rsvpData.guestName || "Invitado",
      attendance: rsvpData.attendance || "confirmado",
      guestsCount: Number(rsvpData.guestsCount) || 1,
      dietaryNotes: rsvpData.dietaryNotes || "",
      songRequest: rsvpData.songRequest || "",
      messageToCouple: rsvpData.messageToCouple || "",
      createdAt: serverTimestamp(),
      userAgent: navigator.userAgent
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.warn("Firestore save fallback mode:", error);
    // Guardado local de respaldo si Firebase está en modo demostración u offline
    const localRSVPs = JSON.parse(localStorage.getItem("wedding_rsvps") || "[]");
    localRSVPs.push({ ...rsvpData, createdAt: new Date().toISOString() });
    localStorage.setItem("wedding_rsvps", JSON.stringify(localRSVPs));
    return { success: true, isLocalFallback: true };
  }
}
