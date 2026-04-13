import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body text-center p-4">
                            <div className="mb-3">
                                <div className="bg-gradient-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" 
                                     style={{ width: '100px', height: '100px', fontSize: '45px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                                    {user?.fullName?.charAt(0) || '👤'}
                                </div>
                            </div>
                            <h4 className="fw-bold">{user?.fullName}</h4>
                            <p className="text-muted">
                                {user?.role === 'customer' && '🐾 Khách hàng'}
                                {user?.role === 'doctor' && '👨‍⚕️ Bác sĩ'}
                                {user?.role === 'admin' && '👑 Quản trị viên'}
                            </p>
                            <div className="mt-3">
                                <span className="badge bg-success px-3 py-2 rounded-pill">
                                    <i className="bi bi-check-circle-fill me-1"></i> Hoạt động
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-8 mb-4">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-header bg-primary text-white rounded-top-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                            <h5 className="mb-0 fw-bold">
                                <i className="bi bi-info-circle me-2"></i>
                                Thông tin tài khoản
                            </h5>
                        </div>
                        <div className="card-body p-4">
                            <div className="table-responsive">
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <th style={{ width: '180px' }} className="text-muted">
                                                <i className="bi bi-person me-2"></i>Họ tên:
                                            </th>
                                            <td className="fw-semibold">{user?.fullName}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-muted">
                                                <i className="bi bi-envelope me-2"></i>Email:
                                            </th>
                                            <td>{user?.email}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-muted">
                                                <i className="bi bi-phone me-2"></i>Số điện thoại:
                                            </th>
                                            <td>{user?.phone}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-muted">
                                                <i className="bi bi-calendar me-2"></i>Ngày tham gia:
                                            </th>
                                            <td>{new Date().toLocaleDateString('vi-VN')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="card shadow-lg border-0 rounded-4 mt-4">
                        <div className="card-header bg-info text-white rounded-top-4">
                            <h5 className="mb-0 fw-bold">
                                <i className="bi bi-graph-up me-2"></i>
                                Thống kê nhanh
                            </h5>
                        </div>
                        <div className="card-body p-4">
                            <div className="row text-center">
                                <div className="col-md-4 mb-3">
                                    <div className="border rounded-4 p-3 hover-shadow">
                                        <div className="display-4 mb-2">🐕</div>
                                        <h3 className="fw-bold text-primary">0</h3>
                                        <p className="text-muted mb-0">Thú cưng</p>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="border rounded-4 p-3 hover-shadow">
                                        <div className="display-4 mb-2">📅</div>
                                        <h3 className="fw-bold text-success">0</h3>
                                        <p className="text-muted mb-0">Lịch hẹn</p>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="border rounded-4 p-3 hover-shadow">
                                        <div className="display-4 mb-2">❤️</div>
                                        <h3 className="fw-bold text-danger">0</h3>
                                        <p className="text-muted mb-0">Đã khám</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .hover-shadow {
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                .hover-shadow:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                }
                .bg-gradient-primary {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }
            `}</style>
        </div>
    );
};

export default Dashboard;