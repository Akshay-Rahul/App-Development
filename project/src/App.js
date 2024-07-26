import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Component/Assets/AuthContext';
import './App.css';

import Homepage from './Component/Home/Homepage';
import AdminLogin from './Component/Assets/AdminLogin';
import AdminRegisterForm from './Component/Assets/AdminRegisterForm';
import UserLogin from './Component/Assets/UserLogin';
import UserRegisterForm from './Component/Assets/UserRegisterForm';
import AdminDashboard from './Component/Dashboard/AdminDashboard';
import UserDashboard from './Component/Dashboard/UserDashboard';

// PrivateRoute component to handle role-based access
const PrivateRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    // If no user is logged in, redirect to login
    return <Navigate to="/user-login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    // If the user doesn't have the right role, redirect to home
    return <Navigate to="/" />;
  }

  return element;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-register" element={<AdminRegisterForm />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/user-register" element={<UserRegisterForm />} />
            <Route 
              path="/admin-dashboard" 
              element={<PrivateRoute element={<AdminDashboard />} allowedRoles={['admin']} />} 
            />
            <Route 
              path="/user-dashboard" 
              element={<PrivateRoute element={<UserDashboard />} allowedRoles={['user']} />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
