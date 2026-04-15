import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          🐾 PetCare 
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white">
                    👋 Xin chào, {user?.fullName || user?.email}
                  </span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    📊 Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn btn-danger btn-sm ms-2 mt-1" 
                    onClick={handleLogout}
                  >
                    🚪 Đăng xuất
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    🔑 Đăng nhập
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    📝 Đăng ký
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;