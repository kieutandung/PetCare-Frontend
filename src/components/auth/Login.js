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
    const [isProcessingOAuth, setIsProcessingOAuth] = useState(false);

    // Xử lý redirect từ Google OAuth2
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const oauth2Success = params.get('oauth2_success');
        const token = params.get('token');
        const refreshToken = params.get('refreshToken');
        
        console.log('🔍 OAuth2 check:', { oauth2Success, hasToken: !!token, hasRefreshToken: !!refreshToken });
        
        // Chỉ xử lý nếu có oauth2_success flag và token
        if (oauth2Success === 'true' && token && refreshToken && !isProcessingOAuth) {
            setIsProcessingOAuth(true);
            
            try {
                // Lưu thông tin từ Google login
                const userData = {
                    id: params.get('userId'),
                    fullName: params.get('fullName'),
                    email: params.get('email'),
                    phone: params.get('phone') || null,
                    role: params.get('role'),
                    avatarUrl: params.get('avatarUrl')
                };
                
                console.log('📦 Saving user data:', userData);
                
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('user', JSON.stringify(userData));
                
                toast.success('Đăng nhập bằng Google thành công!');
                
                // Xóa params khỏi URL trước khi navigate
                navigate('/dashboard', { replace: true });
            } catch (error) {
                console.error('❌ OAuth2 processing error:', error);
                toast.error('Đăng nhập bằng Google thất bại');
                setIsProcessingOAuth(false);
            }
        }
    }, [location, navigate, isProcessingOAuth]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.loginValue.trim()) {
            toast.error('Vui lòng nhập email hoặc số điện thoại');
            return;
        }
        
        if (!formData.password.trim()) {
            toast.error('Vui lòng nhập mật khẩu');
            return;
        }
        
        setLoading(true);
        
        try {
            const result = await login(formData);
            
            if (result.success) {
                toast.success('Đăng nhập thành công!');
                navigate('/dashboard');
            } else {
                toast.error(result.message || 'Đăng nhập thất bại');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Có lỗi xảy ra, vui lòng thử lại');
        } finally {
            setLoading(false);
        }
    };

    // Handler cho Google Login
    const handleGoogleLogin = () => {
        console.log('🔐 Redirecting to Google OAuth2...');
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                                     style={{ width: '70px', height: '70px', fontSize: '35px' }}>
                                    🐾
                                </div>
                                <h3 className="fw-bold">PetCare</h3>
                                <p className="text-muted">Đăng nhập để tiếp tục</p>
                            </div>
                            
                            {/* Normal Login Form */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        <i className="bi bi-envelope me-2"></i>
                                        Email hoặc Số điện thoại
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg rounded-3"
                                        name="loginValue"
                                        value={formData.loginValue}
                                        onChange={handleChange}
                                        required
                                        placeholder="example@email.com hoặc 0987654321"
                                        disabled={loading}
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        <i className="bi bi-lock me-2"></i>
                                        Mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control form-control-lg rounded-3"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="••••••"
                                        disabled={loading}
                                    />
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-lg w-100 rounded-3"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Đang xử lý...
                                        </>
                                    ) : (
                                        'Đăng nhập'
                                    )}
                                </button>
                            </form>
                            
                            {/* Divider */}
                            <div className="position-relative my-4">
                                <hr />
                                <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                                    Hoặc
                                </span>
                            </div>
                            
                            {/* Google Login Button */}
                            <button 
                                onClick={handleGoogleLogin}
                                className="btn btn-outline-danger btn-lg w-100 rounded-3"
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                                disabled={loading}
                            >
                                <i className="bi bi-google" style={{ fontSize: '20px' }}></i>
                                Đăng nhập với Google
                            </button>
                            
                            {/* Link đăng ký */}
                            <div className="text-center mt-4">
                                <Link to="/register" className="text-decoration-none">
                                    Chưa có tài khoản? <strong>Đăng ký ngay</strong>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;