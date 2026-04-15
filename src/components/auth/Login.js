import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        loginValue: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const refreshToken = params.get('refreshToken');
        
        if (token && refreshToken) {
            const userData = {
                id: params.get('userId'),
                fullName: params.get('fullName'),
                email: params.get('email'),
                phone: params.get('phone') || null,
                role: params.get('role'),
                avatarUrl: params.get('avatarUrl')
            };
            
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', JSON.stringify(userData));
            
            toast.success('Đăng nhập bằng Google thành công!');
            navigate('/', { replace: true });
        }
    }, [location, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const result = await login(formData);
        
        if (result.success) {
            toast.success('Đăng nhập thành công!');
            navigate('/');
        } else {
            toast.error(result.message || 'Đăng nhập thất bại');
        }
        
        setLoading(false);
    };

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            overflow: 'hidden'
        }}>
            {/* Left Side - Brand/Info Section */}
            <div style={{
                flex: 7,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '40px'
            }}>
                {/* Decorative Elements */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.1
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '10%',
                        left: '10%',
                        width: '50%',
                        height: '50%',
                        borderRadius: '50%',
                        background: 'white',
                        filter: 'blur(80px)'
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        bottom: '10%',
                        right: '10%',
                        width: '50%',
                        height: '50%',
                        borderRadius: '50%',
                        background: 'white',
                        filter: 'blur(80px)'
                    }}></div>
                </div>
<div ></div>
                {/* Logo */}
                <div >
                   
                </div>

                {/* Main Content */}
                <div style={{
                    position: 'relative',
                    zIndex: 2,
                    color: 'white',
                    maxWidth: '500px',
                    margin: '0 auto',
                    width: '100%'
                }}>
                    <div style={{ marginBottom: '40px' }}>
                        <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.2' }}>
                            Chăm sóc thú cưng<br />
                            <span style={{ color: '#f093fb' }}>tận tâm - chuyên nghiệp</span>
                        </h1>
                        <p style={{ fontSize: '16px', opacity: 0.9, lineHeight: '1.5' }}>
                            Hệ thống phòng khám thú y hiện đại, đội ngũ bác sĩ giàu kinh nghiệm, 
                            trang thiết bị tiên tiến - Nơi thú cưng của bạn được chăm sóc tốt nhất.
                        </p>
                    </div>

                    {/* Features */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', padding: '8px' }}>
                                <i className="bi bi-calendar-check" style={{ fontSize: '20px' }}></i>
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Đặt lịch dễ dàng</div>
                                <small style={{ opacity: 0.75 }}>Online 24/7</small>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', padding: '8px' }}>
                                <i className="bi bi-person-badge" style={{ fontSize: '20px' }}></i>
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Bác sĩ giỏi</div>
                                <small style={{ opacity: 0.75 }}>10+ năm kinh nghiệm</small>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', padding: '8px' }}>
                                <i className="bi bi-hospital" style={{ fontSize: '20px' }}></i>
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Trang thiết bị hiện đại</div>
                                <small style={{ opacity: 0.75 }}>Chẩn đoán chính xác</small>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', padding: '8px' }}>
                                <i className="bi bi-chat-heart" style={{ fontSize: '20px' }}></i>
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Tư vấn 24/7</div>
                                <small style={{ opacity: 0.75 }}>Hỗ trợ nhiệt tình</small>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div style={{ display: 'flex', textAlign: 'center', gap: '32px', justifyContent: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: '24px' }}>10K+</div>
                            <small style={{ opacity: 0.75 }}>Thú cưng đã khám</small>
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: '24px' }}>50+</div>
                            <small style={{ opacity: 0.75 }}>Bác sĩ chuyên nghiệp</small>
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: '24px' }}>99%</div>
                            <small style={{ opacity: 0.75 }}>Khách hàng hài lòng</small>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div style={{ position: 'relative', zIndex: 2, color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
                    <p>© 2024 PetCare - Nơi thú cưng được yêu thương</p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div style={{
                flex: 5,
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'auto'
            }}>
                <div style={{ width: '100%', maxWidth: '400px', padding: '20px' }}>
                    {/* Mobile Logo */}
                    <div style={{ textAlign: 'center', display: 'none' }} className="d-lg-none">
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '60px',
                            height: '60px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '15px',
                            marginBottom: '12px'
                        }}>
                            <i className="bi bi-heart-fill text-white" style={{ fontSize: '28px' }}></i>
                        </div>
                        <h3 style={{
                            fontWeight: 'bold',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>PetCare</h3>
                    </div>

                    <div style={{ marginBottom: '24px', textAlign: 'center', textAlign: 'left' }}>
                        <h2 style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '28px' }}>Chào mừng trở lại!</h2>
                        <p style={{ color: '#6c757d', fontSize: '14px' }}>Đăng nhập để quản lý thú cưng của bạn</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ fontWeight: '600', fontSize: '12px', color: '#6c757d', marginBottom: '4px', display: 'block' }}>EMAIL</label>
                            <div style={{ display: 'flex', border: '1px solid #dee2e6', borderRadius: '8px', overflow: 'hidden' }}>
                                <span style={{ background: 'transparent', border: 'none', padding: '12px', color: '#667eea' }}>
                                    <i className="bi bi-envelope"></i>
                                </span>
                                <input
                                    type="email"
                                    name="loginValue"
                                    value={formData.loginValue}
                                    onChange={handleChange}
                                    style={{ flex: 1, border: 'none', padding: '12px 12px 12px 0', outline: 'none' }}
                                    placeholder="hello@petcare.com"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ fontWeight: '600', fontSize: '12px', color: '#6c757d', marginBottom: '4px', display: 'block' }}>MẬT KHẨU</label>
                            <div style={{ display: 'flex', border: '1px solid #dee2e6', borderRadius: '8px', overflow: 'hidden' }}>
                                <span style={{ background: 'transparent', border: 'none', padding: '12px', color: '#667eea' }}>
                                    <i className="bi bi-lock"></i>
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    style={{ flex: 1, border: 'none', padding: '12px 12px 12px 0', outline: 'none' }}
                                    placeholder="••••••••"
                                    required
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ background: 'transparent', border: 'none', padding: '12px', color: '#6c757d', cursor: 'pointer' }}
                                >
                                    <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                                </button>
                            </div>
                        </div>

                        <div style={{ textAlign: 'right', marginBottom: '24px' }}>
                            <Link to="/forgot-password" style={{ color: '#667eea', textDecoration: 'none', fontSize: '13px' }}>
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <button 
                            type="submit" 
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                marginBottom: '16px'
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                        </button>
                    </form>

                    <div style={{ position: 'relative', margin: '20px 0', textAlign: 'center' }}>
                        <hr style={{ borderTop: '1px solid #dee2e6' }} />
                        <span style={{
                            position: 'absolute',
                            top: '-10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'white',
                            padding: '0 10px',
                            color: '#6c757d',
                            fontSize: '12px'
                        }}>HOẶC</span>
                    </div>

                    <button 
                        onClick={handleGoogleLogin}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #dee2e6',
                            background: 'white',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                        disabled={loading}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span>Tiếp tục với Google</span>
                    </button>

                    <p style={{ textAlign: 'center', marginTop: '24px', color: '#6c757d', fontSize: '13px' }}>
                        Chưa có tài khoản?{' '}
                        <Link to="/register" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>
                            Đăng ký ngay
                            <i className="bi bi-arrow-right ms-1"></i>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;