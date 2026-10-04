import React, { useState } from 'react';
import { Calendar, CalendarPlus, Download, Check, ExternalLink } from 'lucide-react';
import { WEDDING_CONFIG } from '../config/weddingData';

export default function AddToCalendar({ compact = false }) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadICS = () => {
    const title = WEDDING_CONFIG.calendarEvent.title;
    const location = WEDDING_CONFIG.calendarEvent.location;
    const description = WEDDING_CONFIG.calendarEvent.description.replace(/\n/g, '\\n');

    // 9 de Enero de 2027 a las 19:00 (UTC-5) -> 20270110T000000Z
    // Termina 10 de Enero de 2027 a las 02:00 (UTC-5) -> 20270110T070000Z
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Erlinda y Daniel//Boda 2027//ES',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'DTSTART:20270110T000000Z',
      'DTEND:20270110T070000Z',
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      'DESCRIPTION:Recordatorio: Mañana es la Boda de Erlinda & Daniel 💍',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Boda_Erlinda_y_Daniel_2027.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  if (compact) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href={WEDDING_CONFIG.calendarEvent.googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary py-2.5 px-4 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
        >
          <CalendarPlus className="w-4 h-4 text-gold-accent" />
          <span>Google Calendar</span>
        </a>

        <button
          onClick={handleDownloadICS}
          className="btn-outline py-2.5 px-4 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
        >
          {downloaded ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700">¡Guardado!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Apple / iCal (.ics)</span>
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 sm:p-8 max-w-xl mx-auto border-gold-accent/40 shadow-soft text-center mt-10 rounded-2xl bg-white/80">
      <div className="inline-flex p-3 rounded-full bg-gold-accent/15 text-forest-deep mb-3 border border-gold-accent/30">
        <Calendar className="w-6 h-6 text-gold-accent" />
      </div>

      <h4 className="font-serif text-2xl text-forest-deep font-bold mb-1">
        ¿Deseas que tu celular te recuerde la fecha?
      </h4>
      <p className="text-xs text-text-muted mb-6 max-w-md mx-auto">
        Agenda el evento con un solo clic en tu calendario personal para recibir recordatorios automáticos.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={WEDDING_CONFIG.calendarEvent.googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary btn-gold w-full sm:w-auto py-3 px-5 text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-gold"
        >
          <CalendarPlus className="w-4 h-4 text-white" />
          <span>Google Calendar</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>

        <button
          onClick={handleDownloadICS}
          className="btn-outline w-full sm:w-auto py-3 px-5 text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2"
        >
          {downloaded ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700">¡Evento Descargado!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-forest-deep" />
              <span>Apple / iCal (.ics)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
