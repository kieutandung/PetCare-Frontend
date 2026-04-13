import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark shadow-lg" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="container">
                <Link className="navbar-brand fw-bold fs-4" to="/">
                    <i className="bi bi-heart-fill text-danger me-2"></i>
                    PetCare System
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    {isAuthenticated ? (
                        <>
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <Link className="nav-link fw-semibold" to="/dashboard">
                                        <i className="bi bi-speedometer2 me-1"></i> Dashboard
                                    </Link>
                                </li>
                                {user?.role === 'doctor' && (
                                    <li className="nav-item">
                                        <Link className="nav-link fw-semibold" to="/patients">
                                            <i className="bi bi-people me-1"></i> Bệnh nhân
                                        </Link>
                                    </li>
                                )}
                                {user?.role === 'admin' && (
                                    <li className="nav-item">
                                        <Link className="nav-link fw-semibold" to="/admin">
                                            <i className="bi bi-shield-lock me-1"></i> Quản trị
                                        </Link>
                                    </li>
                                )}
                            </ul>
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle fw-semibold" href="#" role="button" data-bs-toggle="dropdown">
                                        <i className="bi bi-person-circle me-1"></i> {user?.fullName || user?.email}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end shadow">
                                        <li>
                                            <Link className="dropdown-item" to="/profile">
                                                <i className="bi bi-person me-2"></i> Hồ sơ
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/change-password">
                                                <i className="bi bi-key me-2"></i> Đổi mật khẩu
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button className="dropdown-item text-danger" onClick={handleLogout}>
                                                <i className="bi bi-box-arrow-right me-2"></i> Đăng xuất
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link fw-semibold" to="/login">
                                    <i className="bi bi-box-arrow-in-right me-1"></i> Đăng nhập
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-semibold" to="/register">
                                    <i className="bi bi-person-plus me-1"></i> Đăng ký
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;