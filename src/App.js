import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import OAuth2Redirect from './components/auth/OAuth2Redirect';  // Thêm import
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/common/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <ToastContainer position="top-right" autoClose={3000} />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />  {/* Thêm route mới */}
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;