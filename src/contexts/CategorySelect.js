// src/components/CategorySelect.js

import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

export default function CategorySelect() {
  const [cats, setCats] = useState([]);
  const { user } = useAuth();
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    getDocs(collection(db, 'categories')).then(snap =>
      setCats(snap.docs.map(d=>({ id:d.id, ...d.data() })))
    );
    if (user) getDocs(collection(db,'users')).then();
  }, [user]);

  const toggle = async (id) => {
    const uref = doc(db, 'users', user.uid);
    const newSubs = subs.includes(id)
      ? subs.filter(x=>x!==id)
      : [...subs, id];
    await updateDoc(uref, { subscriptions: newSubs });
    setSubs(newSubs);
  };

  return (
    <div>
      <h2>Subscribe to Categories</h2>
      {cats.map(c => (
        <label key={c.id}>
          <input
            type="checkbox"
            checked={subs.includes(c.id)}
            onChange={()=>toggle(c.id)}
          /> {c.name}
        </label>
      ))}
    </div>
  );
}