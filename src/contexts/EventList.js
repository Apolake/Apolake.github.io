// src/components/EventList.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function EventList() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getDocs(collection(db,'events')).then(snap =>
      setEvents(snap.docs.map(d=>({ id:d.id, ...d.data() })))
    );
  }, []);
  return (
    <div>
      <h2>All Events</h2>
      <ul>
        {events.map(e => (
          <li key={e.id}>
            {e.title} @ {e.date}
            <button onClick={()=>deleteDoc(doc(db,'events',e.id))}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}