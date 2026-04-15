import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import '../../styles/auth.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // TODO: Call API forgot password
        setTimeout(() => {
            setSubmitted(true);
            setLoading(false);
            toast.success('Link đặt lại mật khẩu đã được gửi đến email của bạn!');
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h2>📧 Kiểm tra email</h2>
                        <p>Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu</p>
                    </div>
                    <div className="auth-body">
                        <div className="alert alert-success">
                            Vui lòng kiểm tra email {email} và làm theo hướng dẫn.
                        </div>
                        <Link to="/login" className="btn-auth" style={{ textAlign: 'center', display: 'block' }}>
                            Quay lại đăng nhập
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>🔐 Quên mật khẩu?</h2>
                    <p>Nhập email để đặt lại mật khẩu</p>
                </div>

                <div className="auth-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email đăng ký</label>
                            <div className="input-group">
                                <span className="input-icon"><FaEnvelope /></span>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="example@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="btn-auth"
                            disabled={loading}
                        >
                            {loading ? 'Đang gửi...' : 'Gửi yêu cầu'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <Link to="/login">
                            <FaArrowLeft style={{ marginRight: '5px' }} />
                            Quay lại đăng nhập
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;