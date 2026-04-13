import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const OAuth2Redirect = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const refreshToken = params.get('refreshToken');
        
        console.log('🔍 OAuth2 Redirect - Token:', token ? 'Có token' : 'Không có token');
        console.log('🔍 Full URL:', window.location.href);
        
        if (token && refreshToken) {
            // Lưu thông tin từ Google login
            const userData = {
                id: params.get('userId'),
                fullName: params.get('fullName'),
                email: params.get('email'),
                role: params.get('role'),
            };
            
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', JSON.stringify(userData));
            
            toast.success('Đăng nhập bằng Google thành công!');
            navigate('/dashboard', { replace: true });
        } else {
            console.error('❌ Missing token or refreshToken');
            toast.error('Đăng nhập bằng Google thất bại');
            navigate('/login', { replace: true });
        }
    }, [location, navigate]);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="text-center">
                <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Đang xử lý đăng nhập...</p>
            </div>
        </div>
    );
};

export default OAuth2Redirect;