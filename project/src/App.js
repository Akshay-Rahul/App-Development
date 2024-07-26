// App.js
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginForm from './Component/Assets/LoginForm';
import RegisterForm from './Component/Assets/RegisterForm';
import Homepage from './Component/Home/Homepage';
import { AuthProvider } from './Component/Assets/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
