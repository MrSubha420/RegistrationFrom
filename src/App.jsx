import React from 'react'
import { Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/registration/RegistrationForm';
import LoginForm from './components/login/LoginForm';
import home from './components/HOME/home';
import './App.css'

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<home/>} />
      <Route path="/homepage" element={<home/>} />
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<LoginForm />} />
    </Routes>
  );
}

export default App;
