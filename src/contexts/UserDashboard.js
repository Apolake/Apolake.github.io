// src/components/UserDashboard.js
import React from 'react';
import CalendarView from './CalendarView';
import { useAuth } from '../contexts/AuthContext';

export default function UserDashboard() {
  const { logout } = useAuth();
  return (
    <div>
      <h1>Your Calendar</h1>
      <button onClick={logout}>Logout</button>
      <CalendarView />
    </div>
  );
}