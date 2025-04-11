// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function PrivateRoute({ children, adminOnly = false }) {
  const { user, role } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && role !== 'admin') return <Navigate to="/" />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={<PrivateRoute adminOnly><AdminDashboard /></PrivateRoute>}
        />
        <Route
          path="/"
          element={<PrivateRoute><UserDashboard /></PrivateRoute>}
        />
      </Routes>
    </AuthProvider>
  );
}