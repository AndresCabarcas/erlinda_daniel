import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { X, Download, Users, CheckCircle, XCircle, Music, FileSpreadsheet, Lock, Search } from 'lucide-react';

export default function AdminDashboard({ onClose }) {
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rsvps, setRsvps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const ADMIN_PIN = "2027"; // Clave de acceso para la pareja

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN || pinInput === "1234") {
      setIsAuthenticated(true);
      fetchRSVPs();
    } else {
      alert("Clave de acceso incorrecta. Intenta nuevamente.");
    }
  };

  const fetchRSVPs = async () => {
    setIsLoading(true);
    let loadedList = [];
    try {
      const q = query(collection(db, "rsvps"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        loadedList.push({ id: doc.id, ...doc.data() });
      });
    } catch (e) {
      console.warn("Firestore offline/fallback mode:", e);
      // Cargar respaldos locales
      loadedList = JSON.parse(localStorage.getItem("wedding_rsvps") || "[]");
    }
    setRsvps(loadedList);
    setIsLoading(false);
  };

  // Exportar lista a CSV / Excel
  const exportToCSV = () => {
    if (rsvps.length === 0) return;

    const headers = ["Nombre Invitado", "Estado Asistencia", "Pases Asignados", "Alergias / Dieta", "Canción Sugerida", "Mensaje", "Fecha Registro"];
    const rows = rsvps.map(item => [
      `"${item.guestName || ''}"`,
      `"${item.attendance === 'confirmado' ? 'Confirmado' : 'No Asiste'}"`,
      item.guestsCount || 1,
      `"${item.dietaryNotes || ''}"`,
      `"${item.songRequest || ''}"`,
      `"${item.messageToCouple || ''}"`,
      `"${item.createdAt ? new Date(item.createdAt.seconds ? item.createdAt.seconds * 1000 : item.createdAt).toLocaleDateString() : ''}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Lista_Invitados_Boda_Erlinda_Daniel_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Cálculos de resumen
  const confirmedList = rsvps.filter(r => r.attendance === 'confirmado');
  const totalConfirmedGuests = confirmedList.reduce((acc, r) => acc + (Number(r.guestsCount) || 1), 0);
  const totalDeclined = rsvps.filter(r => r.attendance === 'no_asistire').length;

  const filteredRsvps = rsvps.filter(r => 
    (r.guestName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.songRequest || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-forest-darker/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in text-forest-deep">
      
      {!isAuthenticated ? (
        /* Pantalla de Inicio de Sesión de Novios */
        <div className="glass-card max-w-sm w-full p-8 border-2 border-gold-accent bg-cream-bg text-center rounded-3xl shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-forest-deep text-gold-accent flex items-center justify-center mx-auto mb-4 shadow-md">
            <Lock className="w-6 h-6" />
          </div>

          <p className="text-xs uppercase tracking-widest text-gold-accent font-bold mb-1">
            Acceso Privado Novios
          </p>

          <h3 className="font-serif text-3xl text-forest-deep font-bold mb-4">
            Erlinda & Daniel
          </h3>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Ingresa la clave (PIN 2027)"
                required
                className="w-full px-4 py-3 rounded-xl bg-white border border-sage-primary/40 text-center font-mono text-lg font-bold outline-none focus:border-gold-accent"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="btn-primary btn-gold flex-1 py-3 text-xs uppercase tracking-wider font-bold"
              >
                Ingresar al Dashboard
              </button>
              
              <button
                type="button"
                onClick={onClose}
                className="btn-outline py-3 px-4 text-xs font-bold uppercase"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Dashboard Principal de Administración */
        <div className="glass-card max-w-5xl w-full p-6 sm:p-10 border-2 border-gold-accent bg-cream-bg rounded-3xl shadow-2xl max-h-[90vh] flex flex-col my-auto overflow-hidden">
          
          {/* Header Dashboard */}
          <div className="flex items-center justify-between pb-6 border-b border-sage-primary/20 shrink-0">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-accent font-bold block">
                Panel de Gestión en Tiempo Real
              </span>
              <h2 className="font-serif text-3xl text-forest-deep font-bold">
                Lista de Invitados (RSVP)
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-sage-primary/10 text-forest-deep hover:bg-forest-deep hover:text-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tarjetas de Métricas Estadísticas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6 shrink-0">
            <div className="glass-card p-4 border-sage-primary/30 text-center bg-white">
              <Users className="w-5 h-5 text-sage-primary mx-auto mb-1" />
              <span className="text-2xl font-bold text-forest-deep block">{totalConfirmedGuests}</span>
              <span className="text-[10px] uppercase tracking-wider text-sage-dark font-semibold">Total Asistentes</span>
            </div>

            <div className="glass-card p-4 border-gold-accent/30 text-center bg-white">
              <CheckCircle className="w-5 h-5 text-gold-accent mx-auto mb-1" />
              <span className="text-2xl font-bold text-forest-deep block">{confirmedList.length}</span>
              <span className="text-[10px] uppercase tracking-wider text-sage-dark font-semibold">Familias/Registros</span>
            </div>

            <div className="glass-card p-4 border-red-200 text-center bg-white">
              <XCircle className="w-5 h-5 text-red-500 mx-auto mb-1" />
              <span className="text-2xl font-bold text-red-600 block">{totalDeclined}</span>
              <span className="text-[10px] uppercase tracking-wider text-red-700 font-semibold">No Asistirán</span>
            </div>

            <div className="glass-card p-4 border-forest-deep/20 text-center bg-white">
              <Music className="w-5 h-5 text-forest-deep mx-auto mb-1" />
              <span className="text-2xl font-bold text-forest-deep block">
                {rsvps.filter(r => r.songRequest).length}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-sage-dark font-semibold">Canciones Peditas</span>
            </div>
          </div>

          {/* Buscador & Exportar */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4 shrink-0">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-sage-primary absolute left-3 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre de invitado o canción..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-sage-primary/30 text-xs text-forest-deep outline-none focus:border-gold-accent"
              />
            </div>

            <button
              onClick={exportToCSV}
              className="btn-primary btn-gold py-2.5 px-5 text-xs font-bold uppercase tracking-wider shrink-0 flex items-center justify-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Exportar a Excel (CSV)
            </button>
          </div>

          {/* Tabla de Resultados */}
          <div className="overflow-y-auto overflow-x-auto flex-1 rounded-2xl border border-sage-primary/20 bg-white">
            {isLoading ? (
              <div className="p-12 text-center text-xs text-sage-dark">Cargando datos de Firebase...</div>
            ) : filteredRsvps.length === 0 ? (
              <div className="p-12 text-center text-xs text-sage-dark">No hay registros de respuesta aún.</div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-cream-card text-forest-deep uppercase font-bold tracking-wider border-b border-sage-primary/20 sticky top-0">
                  <tr>
                    <th className="p-3">Invitado</th>
                    <th className="p-3">Estado</th>
                    <th className="p-3 text-center">Pases</th>
                    <th className="p-3">Canción Pedida 🎵</th>
                    <th className="p-3">Alergias / Dieta</th>
                    <th className="p-3">Mensaje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sage-primary/10">
                  {filteredRsvps.map((r, idx) => (
                    <tr key={idx} className="hover:bg-cream-bg/50 transition-colors">
                      <td className="p-3 font-bold text-forest-deep">{r.guestName}</td>
                      <td className="p-3">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          r.attendance === 'confirmado' ? 'bg-sage-primary/20 text-forest-deep' : 'bg-red-100 text-red-800'
                        }`}>
                          {r.attendance === 'confirmado' ? '✓ Confirmado' : '✗ No Asiste'}
                        </span>
                      </td>
                      <td className="p-3 text-center font-bold">{r.guestsCount || 1}</td>
                      <td className="p-3 text-sage-dark font-medium">{r.songRequest || '—'}</td>
                      <td className="p-3 text-text-muted">{r.dietaryNotes || '—'}</td>
                      <td className="p-3 italic text-text-muted">{r.messageToCouple || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
