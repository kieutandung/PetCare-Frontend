import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'customer'
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            toast.error('Mật khẩu xác nhận không khớp');
            return;
        }
        
        if (formData.password.length < 6) {
            toast.error('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }
        
        setLoading(true);
        
        const { confirmPassword, ...registerData } = formData;
        const result = await register(registerData);
        
        if (result.success) {
            toast.success('Đăng ký thành công!');
            navigate('/');
        } else {
            toast.error(result.message || 'Đăng ký thất bại');
        }
        
        setLoading(false);
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
            {/* Left Side - Same as Login */}
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
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1 }}>
                    <div style={{ position: 'absolute', top: '10%', left: '10%', width: '50%', height: '50%', borderRadius: '50%', background: 'white', filter: 'blur(80px)' }}></div>
                    <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '50%', height: '50%', borderRadius: '50%', background: 'white', filter: 'blur(80px)' }}></div>
                </div>

                <div >
                    
                </div>

                <div style={{ position: 'relative', zIndex: 2, color: 'white', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '20px' }}>
                            Tham gia ngay<br />
                            <span style={{ color: '#f093fb' }}>cùng PetCare</span>
                        </h1>
                        <p style={{ fontSize: '16px', opacity: 0.9 }}>
                            Đăng ký tài khoản để quản lý thú cưng, đặt lịch khám và nhận nhiều ưu đãi hấp dẫn.
                        </p>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px', marginBottom: '40px' }}>
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                            <i className="bi bi-check-circle-fill text-success"></i>
                            <span>Quản lý thông tin thú cưng dễ dàng</span>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                            <i className="bi bi-check-circle-fill text-success"></i>
                            <span>Đặt lịch khám trực tuyến</span>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <i className="bi bi-check-circle-fill text-success"></i>
                            <span>Nhận tư vấn từ bác sĩ chuyên môn</span>
                        </div>
                    </div>
                </div>

                <div style={{ position: 'relative', zIndex: 2, color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
                    <p>© 2024 PetCare - Nơi thú cưng được yêu thương</p>
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div style={{
                flex: 5,
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'auto'
            }}>
                <div style={{ width: '100%', maxWidth: '400px', padding: '20px' }}>
                    <div style={{ textAlign: 'center', display: 'none' }} className="d-lg-none">
                        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '15px', marginBottom: '12px' }}>
                            <i className="bi bi-heart-fill text-white" style={{ fontSize: '28px' }}></i>
                        </div>
                        <h3 style={{ fontWeight: 'bold', background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>PetCare</h3>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <h2 style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '28px' }}>Tạo tài khoản mới</h2>
                        <p style={{ color: '#6c757d', fontSize: '14px' }}>Điền thông tin để bắt đầu</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ fontWeight: '600', fontSize: '12px', color: '#6c757d', marginBottom: '4px', display: 'block' }}>HỌ VÀ TÊN</label>
                            <div style={{ display: 'flex', border: '1px solid #dee2e6', borderRadius: '8px', overflow: 'hidden' }}>
                                <span style={{ padding: '12px', color: '#667eea' }}><i className="bi bi-person"></i></span>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                                    style={{ flex: 1, border: 'none', padding: '12px 12px 12px 0', outline: 'none' }}
                                    placeholder="Nguyễn Văn A" required disabled={loading} />
                            </div>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ fontWeight: '600', fontSize: '12px', color: '#6c757d', marginBottom: '4px', display: 'block' }}>EMAIL</label>
                            <div style={{ display: 'flex', border: '1px solid #dee2e6', borderRadius: '8px', overflow: 'hidden' }}>
                                <span style={{ padding: '12px', color: '#667eea' }}><i className="bi bi-envelope"></i></span>
                                <input type="email" name="email" value={formData.email} onChange={handleChange}
                                    style={{ flex: 1, border: 'none', padding: '12px 12px 12px 0', outline: 'none' }}
                                    placeholder="hello@petcare.com" required disabled={loading} />
                            </div>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ fontWeight: '600', fontSize: '12px', color: '#6c757d', marginBottom: '4px', display: 'block' }}>SỐ ĐIỆN THOẠI</label>
                            <div style={{ display: 'flex', border: '1px solid #dee2e6', borderRadius: '8px', overflow: 'hidden' }}>
                                <span style={{ padding: '12px', color: '#667eea' }}><i className="bi bi-phone"></i></span>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                    style={{ flex: 1, border: 'none', padding: '12px 12px 12px 0', outline: 'none' }}
                                    placeholder="0987 654 321" required disabled={loading} />
                            </div>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ fontWeight: '600', fontSize: '12px', color: '#6c757d', marginBottom: '4px', display: 'block' }}>MẬT KHẨU</label>
                            <div style={{ display: 'flex', border: '1px solid #dee2e6', borderRadius: '8px', overflow: 'hidden' }}>
                                <span style={{ padding: '12px', color: '#667eea' }}><i className="bi bi-lock"></i></span>
                                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange}
                                    style={{ flex: 1, border: 'none', padding: '12px 12px 12px 0', outline: 'none' }}
                                    placeholder="••••••••" required disabled={loading} />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    style={{ padding: '12px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                                    <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                                </button>
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ fontWeight: '600', fontSize: '12px', color: '#6c757d', marginBottom: '4px', display: 'block' }}>XÁC NHẬN MẬT KHẨU</label>
                            <div style={{ display: 'flex', border: '1px solid #dee2e6', borderRadius: '8px', overflow: 'hidden' }}>
                                <span style={{ padding: '12px', color: '#667eea' }}><i className="bi bi-check-circle"></i></span>
                                <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                                    style={{ flex: 1, border: 'none', padding: '12px 12px 12px 0', outline: 'none' }}
                                    placeholder="••••••••" required disabled={loading} />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{ padding: '12px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                                    <i className={showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                                </button>
                            </div>
                        </div>

                        <button type="submit" style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }} disabled={loading}>
                            {loading ? 'Đang xử lý...' : 'Đăng ký'}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '24px', color: '#6c757d', fontSize: '13px' }}>
                        Đã có tài khoản?{' '}
                        <Link to="/login" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>
                            Đăng nhập ngay
                            <i className="bi bi-arrow-right ms-1"></i>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;