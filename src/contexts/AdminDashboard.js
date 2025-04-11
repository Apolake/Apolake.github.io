// src/components/AdminDashboard.js
import React from 'react';
import CategorySelect from './CategorySelect';
import EventForm from './EventForm';
import EventList from './EventList';
import { useAuth } from '../contexts/AuthContext';

export default function AdminDashboard() {
  const { logout } = useAuth();
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
      <CategorySelect />
      <EventForm />
      <EventList />
    </div>
  );
}