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
    role: 'customer'  // Mặc định là customer, ẩn hoàn toàn
  });
  const [loading, setLoading] = useState(false);

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
      navigate('/dashboard');
    } else {
      toast.error(result.message || 'Đăng ký thất bại');
    }
    
    setLoading(false);
  };

  return (
    <div className="container mt-4 mb-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                     style={{ width: '70px', height: '70px', fontSize: '35px' }}>
                  📝
                </div>
                <h3 className="fw-bold">Tạo tài khoản</h3>
                <p className="text-muted">Tham gia PetCare ngay hôm nay</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-person me-2"></i>
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-3"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="họ và tên"
                  />
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-envelope me-2"></i>
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg rounded-3"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="email"
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-phone me-2"></i>
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      className="form-control form-control-lg rounded-3"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{10,11}"
                      placeholder="số điện thoại"
                    />
                  </div>
                </div>
                
                {/* Đã xóa hoàn toàn phần chọn vai trò và thông báo */}
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-key me-2"></i>
                      Mật khẩu
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg rounded-3"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength="6"
                      placeholder="nhập mật khẩu (ít nhất 6 ký tự)"
                    />
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-check-circle me-2"></i>
                      Xác nhận mật khẩu
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg rounded-3"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="nhập lại mật khẩu"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-success btn-lg w-100 rounded-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Đang xử lý...
                    </>
                  ) : (
                    'Đăng ký'
                  )}
                </button>
              </form>
              
              <div className="text-center mt-4">
                <Link to="/login" className="text-decoration-none">
                  Đã có tài khoản? <strong>Đăng nhập ngay</strong>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;