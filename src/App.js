// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserForm from './components/UserForm';
import SuccessPage from './components/SuccessPage';
import AdminDashboard from './components/AdminDashboard'; // The user info page
import AdminLogin from './components/AdminLogin';
import Home from './components/Home'; // Import Home component
function App() {
  const isLoggedIn = localStorage.getItem('adminLoggedIn'); // Add this to check login status

  return (
    <Router>
      <Routes>
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/" element={<Home />} />
        {/* User Submission Form */}
        <Route path="/submit" element={<UserForm />} />

        {/* Admin Login Route */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Protected Admin Dashboard Route */}
        <Route
          path="/admin/dashboard"
          element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/admin" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
