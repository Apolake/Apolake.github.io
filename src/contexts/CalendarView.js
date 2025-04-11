// src/components/CalendarView.js
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

export default function CalendarView() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // fetch user subscriptions
    getDocs(collection(db,'users')).then();
    // for demo, load all events
    getDocs(collection(db,'events')).then(snap =>
      setEvents(snap.docs.map(d=>({ title:d.data().title, date:d.data().date })))
    );
  }, [user]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
    />
  );
}
