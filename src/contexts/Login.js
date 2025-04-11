// src/components/Login.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { login, role } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await login(email, pass);
    nav(role === 'admin' ? '/admin' : '/');
  };

  return (
    <form onSubmit={submit}>
      <h2>KBR Hub Login</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}