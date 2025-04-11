// src/components/EventForm.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function EventForm() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [cat, setCat] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db,'events'), { title, date, categoryId: cat });
    setTitle(''); setDate(''); setCat('');
  };

  return (
    <form onSubmit={submit}>
      <h2>Add Event</h2>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
      <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
      <input value={cat} onChange={e=>setCat(e.target.value)} placeholder="Category ID" />
      <button type="submit">Add</button>
    </form>
  );
}