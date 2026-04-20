import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import OAuth2Redirect from './components/auth/OAuth2Redirect';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';
import Booking from './pages/Booking';
import MyPets from './pages/MyPets';
import MyAppointments from './pages/MyAppointments';
import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/common/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <ToastContainer position="top-right" autoClose={3000} />
                <Navbar />
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Homepage />} />
                    <Route path="/home" element={<Homepage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
                    
                    {/* Protected routes */}
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />
                    <Route path="/booking" element={
                        <PrivateRoute>
                            <Booking />
                        </PrivateRoute>
                    } />
                    <Route path="/my-appointments" element={
                        <PrivateRoute>
                            <MyAppointments />
                        </PrivateRoute>
                    } />

                    <Route path="/my-pets" element={
    <PrivateRoute>
        <MyPets />
    </PrivateRoute>
} />
                    
                    {/* Catch all - redirect to home */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;