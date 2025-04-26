import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route - redirect to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* User Dashboard */}
        <Route path="/user" element={<UserPage />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/add-project" element={<AddProjectPage />} />

      </Routes>
    </Router>
  );
}

export default App;
