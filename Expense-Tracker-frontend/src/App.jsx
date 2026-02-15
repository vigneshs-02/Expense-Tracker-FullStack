import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import IncomePage from "./pages/IncomePage";
import ExpensePage from "./pages/ExpensePage";

import ProtectedRoute from './components/common/ProtectedRoute';

const App = () => {
  return (
  <BrowserRouter>
  <Routes>

    {/* Default */}
    <Route path='/' element={<Navigate to="/login" />}/>

     {/* Auth pages */}
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />

    {/* After login */}
    <Route path="/home"  element={
    <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>
    } />

  <Route path="/income" element={
    <ProtectedRoute>
      <IncomePage />
    </ProtectedRoute>
  }/>
  
  <Route path="/expense" element={
    <ProtectedRoute>
      <ExpensePage />
    </ProtectedRoute>
  } />
  
     {/* Fallback */}
    <Route path="*" element={<h2>Page Not Found</h2>} />

  </Routes>
  </BrowserRouter>
  )
}

export default App
