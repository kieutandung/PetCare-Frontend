import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import appointmentService from '../services/appointmentService';

const MyAppointments = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelReason, setCancelReason] = useState('');

    useEffect(() => {
        loadAppointments();
    }, [activeTab]);

    const loadAppointments = async () => {
        setLoading(true);
        try {
            let response;
            if (activeTab === 'upcoming') {
                response = await appointmentService.getUpcomingAppointments();
            } else {
                response = await appointmentService.getMyAppointments();
            }
            if (response.success) {
                let data = response.appointments || [];
                
                // Nếu là tab "Sắp tới", lọc bỏ các lịch đã quá hạn
                if (activeTab === 'upcoming') {
                    data = data.filter(item => !isExpired(item.appointmentDate, item.appointmentTime));
                }
                
                setAppointments(data);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error('Error loading appointments:', error);
            toast.error('Không thể tải lịch hẹn');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        if (!selectedAppointment) return;
        
        try {
            const response = await appointmentService.cancelAppointment(selectedAppointment.id, cancelReason);
            if (response.success) {
                toast.success('Hủy lịch thành công');
                setShowCancelModal(false);
                setCancelReason('');
                loadAppointments();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Hủy lịch thất bại');
        }
    };

    // Kiểm tra lịch đã quá hạn chưa (cả ngày và giờ)
    const isExpired = (appointmentDate, appointmentTime) => {
        const now = new Date();
        const [year, month, day] = appointmentDate.split('-');
        const [hour, minute] = appointmentTime.split(':');
        const aptDateTime = new Date(year, month - 1, day, hour, minute);
        return aptDateTime < now;
    };

    // Hàm xác định trạng thái hiển thị (xử lý quá hạn)
    const getDisplayStatus = (status, appointmentDate, appointmentTime) => {
        if (isExpired(appointmentDate, appointmentTime) && (status === 'pending' || status === 'confirmed')) {
            return 'expired';
        }
        return status;
    };

    const getStatusConfig = (status, appointmentDate, appointmentTime) => {
        const displayStatus = getDisplayStatus(status, appointmentDate, appointmentTime);
        
        const config = {
            pending: { class: 'bg-warning bg-opacity-10 text-warning', icon: '⏳', text: 'Chờ xác nhận' },
            confirmed: { class: 'bg-info bg-opacity-10 text-info', icon: '✓', text: 'Đã xác nhận' },
            in_progress: { class: 'bg-primary bg-opacity-10 text-primary', icon: '🔄', text: 'Đang khám' },
            completed: { class: 'bg-success bg-opacity-10 text-success', icon: '✅', text: 'Đã hoàn thành' },
            cancelled: { class: 'bg-danger bg-opacity-10 text-danger', icon: '❌', text: 'Đã hủy' },
            no_show: { class: 'bg-secondary bg-opacity-10 text-secondary', icon: '🚫', text: 'Không đến' },
            expired: { class: 'bg-secondary bg-opacity-10 text-secondary', icon: '⏰', text: 'Đã quá hạn' }
        };
        return config[displayStatus] || config.pending;
    };

    // Kiểm tra có thể hủy không (không hủy nếu đã quá hạn)
    const canCancel = (status, appointmentDate, appointmentTime) => {
        const displayStatus = getDisplayStatus(status, appointmentDate, appointmentTime);
        return (displayStatus === 'pending' || displayStatus === 'confirmed');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const aptDate = new Date(dateString);
        aptDate.setHours(0, 0, 0, 0);
        
        if (aptDate.getTime() === today.getTime()) return 'Hôm nay';
        if (aptDate.getTime() === tomorrow.getTime()) return 'Ngày mai';
        return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    // Kiểm tra xem có đang ở tab "Sắp tới" không
    const isUpcomingTab = activeTab === 'upcoming';

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                <div className="text-center">
                    <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }}></div>
                    <p className="mt-3 text-muted">Đang tải lịch hẹn...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-light" style={{ minHeight: '100vh', paddingTop: '30px' }}>
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        {/* Header */}
                        <div className="mb-4">
                            <h1 className="display-6 fw-bold mb-2" style={{ color: '#1e1b4b' }}>
                                Lịch hẹn của tôi
                            </h1>
                            <p className="text-muted">Quản lý lịch khám cho thú cưng của bạn</p>
                        </div>

                        {/* Tabs */}
                        <div className="d-flex gap-2 mb-4 border-bottom pb-2">
                            <button
                                onClick={() => setActiveTab('upcoming')}
                                className={`btn rounded-pill px-4 py-2 fw-semibold ${activeTab === 'upcoming' ? 'btn-primary shadow-sm' : 'btn-light'}`}
                            >
                                📅 Sắp tới
                            </button>
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`btn rounded-pill px-4 py-2 fw-semibold ${activeTab === 'all' ? 'btn-primary shadow-sm' : 'btn-light'}`}
                            >
                                📋 Tất cả
                            </button>
                        </div>

                        {/* Appointments List */}
                        {appointments.length === 0 ? (
                            <div className="bg-white rounded-4 shadow-sm p-5 text-center">
                                <i className="bi bi-calendar-x fs-1 text-muted"></i>
                                <h5 className="fw-bold mt-3 mb-2">Chưa có lịch hẹn nào</h5>
                                <p className="text-muted mb-4">
                                    {isUpcomingTab ? 'Bạn không có lịch hẹn nào sắp tới' : 'Bạn chưa có lịch hẹn nào trong danh sách'}
                                </p>
                                <button className="btn btn-primary rounded-pill px-4" onClick={() => window.location.href = '/booking'}>
                                    <i className="bi bi-calendar-plus me-2"></i> Đặt lịch ngay
                                </button>
                            </div>
                        ) : (
                            <div className="row g-3">
                                {appointments.map(appointment => {
                                    const expired = isExpired(appointment.appointmentDate, appointment.appointmentTime);
                                    const displayStatus = getDisplayStatus(appointment.status, appointment.appointmentDate, appointment.appointmentTime);
                                    const statusConfig = getStatusConfig(appointment.status, appointment.appointmentDate, appointment.appointmentTime);
                                    const canCancelFlag = canCancel(appointment.status, appointment.appointmentDate, appointment.appointmentTime);
                                    const isExpiredStatus = displayStatus === 'expired';
                                    
                                    return (
                                        <div className="col-12" key={appointment.id}>
                                            <div className={`bg-white rounded-3 shadow-sm p-3 p-md-4 transition-all hover-shadow ${isExpiredStatus ? 'opacity-75' : ''}`}>
                                                <div className="row align-items-center">
                                                    {/* Pet info */}
                                                    <div className="col-md-3 col-lg-2 mb-3 mb-md-0">
                                                        <div className="d-flex align-items-center gap-3">
                                                            <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                                                                <i className="bi bi-paw text-primary fs-4"></i>
                                                            </div>
                                                            <div>
                                                                <h6 className="fw-bold mb-0">{appointment.petName || 'Thú cưng'}</h6>
                                                                <small className="text-muted">{appointment.petType === 'dog' ? 'Chó' : appointment.petType === 'cat' ? 'Mèo' : appointment.petType}</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Service & Doctor */}
                                                    <div className="col-md-4 col-lg-4 mb-3 mb-md-0">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <small className="text-muted d-block">Dịch vụ</small>
                                                                <span className="fw-semibold small">{appointment.serviceName || 'Khám tổng quát'}</span>
                                                            </div>
                                                            <div className="col-6">
                                                                <small className="text-muted d-block">Bác sĩ</small>
                                                                <span className="fw-semibold small">{appointment.doctorName || 'Bác sĩ'}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Date & Time */}
                                                    <div className="col-md-3 col-lg-3 mb-3 mb-md-0">
                                                        <div className="d-flex align-items-center gap-3">
                                                            <div>
                                                                <small className="text-muted d-block">Ngày</small>
                                                                <span className={`fw-semibold small ${expired ? 'text-decoration-line-through text-muted' : ''}`}>
                                                                    {formatDate(appointment.appointmentDate)}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <small className="text-muted d-block">Giờ</small>
                                                                <span className={`fw-semibold small ${expired ? 'text-decoration-line-through text-muted' : ''}`}>
                                                                    {appointment.appointmentTime}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Status & Action */}
                                                    <div className="col-md-2 col-lg-3 text-md-end">
                                                        <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                                                            <span className={`badge ${statusConfig.class} px-3 py-2 rounded-pill`}>
                                                                {statusConfig.icon} {statusConfig.text}
                                                            </span>
                                                            
                                                            {canCancelFlag && !expired && (
                                                                <button 
                                                                    className="btn btn-sm btn-outline-danger rounded-pill"
                                                                    onClick={() => {
                                                                        setSelectedAppointment(appointment);
                                                                        setShowCancelModal(true);
                                                                    }}
                                                                >
                                                                    <i className="bi bi-x-circle me-1"></i> Hủy
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Symptoms */}
                                                {appointment.symptoms && (
                                                    <div className="mt-3 pt-2 border-top">
                                                        <div className="d-flex align-items-start gap-2">
                                                            <i className="bi bi-chat-dots text-muted small mt-1"></i>
                                                            <div>
                                                                <small className="text-muted">Triệu chứng:</small>
                                                                <p className="mb-0 small text-secondary">{appointment.symptoms}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Cancel Modal */}
            {showCancelModal && selectedAppointment && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050 }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content rounded-4 border-0 shadow">
                            <div className="modal-header border-0 pt-4 px-4">
                                <h5 className="modal-title fw-bold">Xác nhận hủy lịch</h5>
                                <button type="button" className="btn-close" onClick={() => setShowCancelModal(false)}></button>
                            </div>
                            <div className="modal-body px-4">
                                <p>Bạn có chắc muốn hủy lịch hẹn với <strong>{selectedAppointment.doctorName}</strong>?</p>
                                <div className="bg-light rounded-3 p-3 mb-3">
                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="text-muted small">Ngày:</span>
                                        <span className="small fw-semibold">{selectedAppointment.appointmentDate}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span className="text-muted small">Giờ:</span>
                                        <span className="small fw-semibold">{selectedAppointment.appointmentTime}</span>
                                    </div>
                                </div>
                                <textarea 
                                    className="form-control" 
                                    rows="2"
                                    value={cancelReason}
                                    onChange={(e) => setCancelReason(e.target.value)}
                                    placeholder="Lý do hủy (không bắt buộc)..."
                                ></textarea>
                            </div>
                            <div className="modal-footer border-0 pb-4 px-4 gap-2">
                                <button type="button" className="btn btn-light rounded-pill px-4" onClick={() => setShowCancelModal(false)}>
                                    Quay lại
                                </button>
                                <button type="button" className="btn btn-danger rounded-pill px-4" onClick={handleCancel}>
                                    Xác nhận hủy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .transition-all {
                    transition: all 0.2s ease;
                }
                .hover-shadow:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.08) !important;
                }
                .modal {
                    animation: fadeIn 0.2s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .modal-content {
                    animation: slideUp 0.2s ease-out;
                }
                @keyframes slideUp {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default MyAppointments;