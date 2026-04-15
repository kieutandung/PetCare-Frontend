import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close dropdown when route changes
    useEffect(() => {
        setDropdownOpen(false);
    }, [location]);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setDropdownOpen(false);
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.charAt(0).toUpperCase();
    };

    return (
        <nav className="navbar navbar-expand-lg sticky-top shadow" style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}>
            <div className="container">
                {/* Logo */}
                <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 10px rgba(102,126,234,0.3)'
                    }}>
                        <i className="bi bi-heart-fill text-white" style={{ fontSize: '20px' }}></i>
                    </div>
                    <span className="fw-bold fs-4" style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>PetCare</span>
                </Link>

                {/* Toggler */}
                <button 
                    className="navbar-toggler border-0" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                    style={{ boxShadow: 'none' }}
                >
                    <i className="bi bi-list fs-2" style={{ color: '#667eea' }}></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Navigation Links */}
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link fw-semibold px-3" to="/" style={{ color: '#4a5568' }}>
                                <i className="bi bi-house-door me-1"></i> Trang chủ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-semibold px-3" to="/services" style={{ color: '#4a5568' }}>
                                <i className="bi bi-grid-3x3-gap me-1"></i> Dịch vụ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-semibold px-3" to="/doctors" style={{ color: '#4a5568' }}>
                                <i className="bi bi-person-badge me-1"></i> Bác sĩ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-semibold px-3" to="/contact" style={{ color: '#4a5568' }}>
                                <i className="bi bi-envelope me-1"></i> Liên hệ
                            </Link>
                        </li>
                    </ul>

                    {/* Right Side */}
                    {isAuthenticated ? (
                        <ul className="navbar-nav">
                            {/* Dropdown */}
                            <li className="nav-item dropdown" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="nav-link d-flex align-items-center gap-2 border-0 bg-transparent"
                                    style={{ color: '#4a5568' }}
                                >
                                    {/* Avatar */}
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '14px'
                                    }}>
                                        {user?.avatarUrl ? (
                                            <img src={user.avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                        ) : (
                                            getInitials(user?.fullName || user?.email)
                                        )}
                                    </div>
                                    <span className="fw-semibold d-none d-md-block">
                                        {user?.fullName?.split(' ').pop() || user?.email?.split('@')[0]}
                                    </span>
                                    <i className={`bi bi-chevron-${dropdownOpen ? 'up' : 'down'} transition-all`} style={{ fontSize: '12px' }}></i>
                                </button>

                                {/* Dropdown Menu */}
                                {dropdownOpen && (
                                    <div className="dropdown-menu show position-absolute" style={{
                                        top: '100%',
                                        right: 0,
                                        left: 'auto',
                                        marginTop: '8px',
                                        borderRadius: '16px',
                                        border: 'none',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                                        minWidth: '260px',
                                        overflow: 'hidden'
                                    }}>
                                        {/* User Info Header */}
                                        <div className="px-3 py-3 border-bottom" style={{ background: '#f8f9fa' }}>
                                            <div className="d-flex align-items-center gap-3">
                                                <div style={{
                                                    width: '48px',
                                                    height: '48px',
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '18px'
                                                }}>
                                                    {getInitials(user?.fullName || user?.email)}
                                                </div>
                                                <div>
                                                    <div className="fw-bold">{user?.fullName}</div>
                                                    <small className="text-muted">{user?.email}</small>
                                                    <div>
                                                        <span className="badge bg-primary bg-opacity-10 text-primary mt-1" style={{ fontSize: '10px' }}>
                                                            {user?.role === 'customer' && '🐾 Khách hàng'}
                                                            {user?.role === 'doctor' && '👨‍⚕️ Bác sĩ'}
                                                            {user?.role === 'admin' && '👑 Admin'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="py-2">
                                            <Link className="dropdown-item py-2" to="/dashboard" onClick={() => setDropdownOpen(false)}>
                                                <i className="bi bi-speedometer2 me-2" style={{ color: '#667eea' }}></i>
                                                Dashboard
                                            </Link>
                                            <Link className="dropdown-item py-2" to="/profile" onClick={() => setDropdownOpen(false)}>
                                                <i className="bi bi-person me-2" style={{ color: '#667eea' }}></i>
                                                Hồ sơ cá nhân
                                            </Link>
                                            <Link className="dropdown-item py-2" to="/my-pets" onClick={() => setDropdownOpen(false)}>
                                                <i className="bi bi-paw me-2" style={{ color: '#667eea' }}></i>
                                                Thú cưng của tôi
                                            </Link>
                                            <Link className="dropdown-item py-2" to="/appointments" onClick={() => setDropdownOpen(false)}>
                                                <i className="bi bi-calendar me-2" style={{ color: '#667eea' }}></i>
                                                Lịch hẹn
                                            </Link>
                                            <Link className="dropdown-item py-2" to="/change-password" onClick={() => setDropdownOpen(false)}>
                                                <i className="bi bi-key me-2" style={{ color: '#667eea' }}></i>
                                                Đổi mật khẩu
                                            </Link>
                                            <hr className="my-2" />
                                            <button className="dropdown-item py-2 text-danger" onClick={handleLogout}>
                                                <i className="bi bi-box-arrow-right me-2"></i>
                                                Đăng xuất
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        </ul>
                    ) : (
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link fw-semibold px-3" to="/login" style={{ color: '#4a5568' }}>
                                    <i className="bi bi-box-arrow-in-right me-1"></i> Đăng nhập
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="btn rounded-pill px-4 ms-2" to="/register" style={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    border: 'none'
                                }}>
                                    <i className="bi bi-person-plus me-1"></i> Đăng ký
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>

            <style jsx>{`
                .dropdown-menu {
                    animation: slideDown 0.2s ease-out;
                }
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .transition-all {
                    transition: all 0.2s ease;
                }
                .nav-link:hover {
                    color: #667eea !important;
                    transform: translateY(-1px);
                    transition: all 0.2s;
                }
            `}</style>
        </nav>
    );
};

export default Navbar;