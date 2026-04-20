import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import appointmentService from '../services/appointmentService';

const Booking = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [services, setServices] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        petName: '',
        petType: 'dog',
        petBreed: '',
        petAge: '',
        petWeight: '',
        petGender: 'male',
        petColor: '',
        petImage: null,
        symptoms: '',
        medicalHistory: '',
        serviceId: '',
        doctorId: '',
        appointmentDate: new Date(),
        appointmentTime: '',
        notes: ''
    });

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            setLoading(true);
            const [servicesRes, doctorsRes] = await Promise.all([
                appointmentService.getServices(),
                appointmentService.getDoctors()
            ]);
            if (servicesRes.success) setServices(servicesRes.services);
            if (doctorsRes.success) setDoctors(doctorsRes.doctors);
        } catch (error) {
            console.error('Load initial data error:', error);
            toast.error('Không thể tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };
    // Thêm hàm này vào Booking.js
const isTimeSlotDisabled = (slotTime, selectedDate) => {
    const now = new Date();
    const selected = new Date(selectedDate);
    
    // Chỉ kiểm tra nếu là ngày hôm nay
    if (selected.toDateString() === now.toDateString()) {
        const [hour, minute] = slotTime.split(':');
        const slotDateTime = new Date(selected);
        slotDateTime.setHours(parseInt(hour), parseInt(minute), 0);
        
        // Disable nếu khung giờ đã qua
        return slotDateTime < now;
    }
    return false;
};

    const loadAvailableSlots = useCallback(async () => {
        if (!formData.doctorId || !formData.appointmentDate) return;
        
        try {
            const date = formData.appointmentDate.toISOString().split('T')[0];
            const response = await appointmentService.getAvailableSlots(formData.doctorId, date);
            if (response.success) {
                setAvailableSlots(response.slots || []);
            }
        } catch (error) {
            console.error('Load slots error:', error);
        }
    }, [formData.doctorId, formData.appointmentDate]);

    useEffect(() => {
        if (formData.doctorId && formData.appointmentDate) {
            loadAvailableSlots();
        }
    }, [formData.doctorId, formData.appointmentDate, loadAvailableSlots]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Ảnh không được vượt quá 5MB');
                return;
            }
            setFormData(prev => ({ ...prev, petImage: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.petName.trim()) {
            toast.error('Vui lòng nhập tên thú cưng');
            return;
        }
        if (!formData.symptoms.trim()) {
            toast.error('Vui lòng nhập triệu chứng');
            return;
        }
        if (!formData.serviceId) {
            toast.error('Vui lòng chọn dịch vụ');
            return;
        }
        if (!formData.doctorId) {
            toast.error('Vui lòng chọn bác sĩ');
            return;
        }
        if (!formData.appointmentTime) {
            toast.error('Vui lòng chọn giờ khám');
            return;
        }
        
        setIsSubmitting(true);
        
        const appointmentData = {
            petName: formData.petName,
            petType: formData.petType,
            petBreed: formData.petBreed,
            petAge: formData.petAge ? parseInt(formData.petAge) : null,
            petWeight: formData.petWeight ? parseFloat(formData.petWeight) : null,
            petGender: formData.petGender,
            petColor: formData.petColor,
            symptoms: formData.symptoms,
            medicalHistory: formData.medicalHistory,
            serviceId: parseInt(formData.serviceId),
            doctorId: parseInt(formData.doctorId),
            appointmentDate: formData.appointmentDate.toISOString().split('T')[0],
            appointmentTime: formData.appointmentTime,
            notes: formData.notes
        };
        
        try {
            const response = await appointmentService.bookAppointment(appointmentData);
            if (response.success) {
                toast.success('Đặt lịch thành công!');
                navigate('/my-appointments');
            } else {
                toast.error(response.message || 'Đặt lịch thất bại');
            }
        } catch (error) {
            toast.error('Đặt lịch thất bại, vui lòng thử lại');
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => {
        // Step 1: Thông tin thú cưng
        if (step === 1 && !formData.petName.trim()) {
            toast.error('Vui lòng nhập tên thú cưng');
            return;
        }
        // Step 2: Triệu chứng
        if (step === 2 && !formData.symptoms.trim()) {
            toast.error('Vui lòng nhập triệu chứng');
            return;
        }
        // Step 3: Chọn dịch vụ
        if (step === 3 && !formData.serviceId) {
            toast.error('Vui lòng chọn dịch vụ');
            return;
        }
        // Step 4: Chọn bác sĩ
        if (step === 4 && !formData.doctorId) {
            toast.error('Vui lòng chọn bác sĩ');
            return;
        }
        // Step 5: Chọn giờ khám
        if (step === 5 && !formData.appointmentTime) {
            toast.error('Vui lòng chọn giờ khám');
            return;
        }
        setStep(step + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prevStep = () => {
        setStep(step - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getServiceById = (id) => services.find(s => s.id === Number(id));
    const getDoctorById = (id) => doctors.find(d => d.id === Number(id));

    const petTypes = [
        { value: 'dog', label: 'Chó', icon: '🐕' },
        { value: 'cat', label: 'Mèo', icon: '🐈' },
        { value: 'bird', label: 'Chim', icon: '🐦' },
        { value: 'rabbit', label: 'Thỏ', icon: '🐇' },
        { value: 'hamster', label: 'Hamster', icon: '🐹' },
        { value: 'other', label: 'Khác', icon: '🐾' }
    ];

    const steps = [
        { number: 1, icon: '🐾', label: 'Thú cưng' },
        { number: 2, icon: '🩺', label: 'Triệu chứng' },
        { number: 3, icon: '📋', label: 'Dịch vụ' },
        { number: 4, icon: '👨‍⚕️', label: 'Bác sĩ' },
        { number: 5, icon: '📅', label: 'Lịch hẹn' },
        { number: 6, icon: '✅', label: 'Xác nhận' }
    ];

    return (
        <div className="min-vh-100 py-5" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        {/* Header */}
                        <div className="text-center mb-5">
                            <h1 className="display-4 fw-bold mb-3" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Đặt lịch khám
                            </h1>
                            <p className="lead text-muted">Điền thông tin để đặt lịch khám cho thú cưng của bạn</p>
                        </div>

                        {/* Progress Steps */}
                        <div className="position-relative mb-5">
                            <div className="d-flex justify-content-between">
                                {steps.map((item, index) => (
                                    <div key={item.number} className="text-center" style={{ flex: 1 }}>
                                        <div className={`position-relative d-inline-flex align-items-center justify-content-center rounded-circle mb-2 transition-all ${
                                            step > item.number ? 'bg-success text-white' : step === item.number ? 'bg-primary text-white shadow-lg' : 'bg-light text-muted'
                                        }`}
                                             style={{ width: '50px', height: '50px', fontSize: '22px', transition: 'all 0.3s' }}>
                                            {step > item.number ? '✓' : item.icon}
                                        </div>
                                        <div className={`small fw-semibold ${step === item.number ? 'text-primary' : 'text-muted'}`}>
                                            {item.label}
                                        </div>
                                        {index < steps.length - 1 && (
                                            <div className={`position-absolute top-50 start-50 w-100 ${step > item.number ? 'bg-success' : 'bg-light'}`}
                                                 style={{ height: '2px', transform: 'translateY(-50%)', zIndex: -1 }} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Main Card */}
                        <div className="card border-0 shadow-xxl rounded-4 overflow-hidden">
                            <div className="card-body p-0">
                                {loading && step === 1 ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }}></div>
                                        <p className="mt-3 text-muted">Đang tải dữ liệu...</p>
                                    </div>
                                ) : (
                                    <>
                                        {/* Step 1: Thông tin thú cưng */}
                                        {step === 1 && (
                                            <div className="p-4 p-lg-5">
                                                <h3 className="fw-bold mb-4">🐾 Thông tin thú cưng</h3>
                                                
                                                <div className="text-center mb-4">
                                                    <div className="position-relative d-inline-block">
                                                        {imagePreview ? (
                                                            <img src={imagePreview} alt="Pet preview" 
                                                                 className="rounded-circle border border-3 border-primary shadow-lg"
                                                                 style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
                                                        ) : (
                                                            <div className="rounded-circle bg-light d-flex align-items-center justify-content-center border border-2 border-dashed"
                                                                 style={{ width: '120px', height: '120px' }}>
                                                                <i className="bi bi-camera fs-2 text-muted"></i>
                                                            </div>
                                                        )}
                                                        <label className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-2 shadow-sm" 
                                                               style={{ cursor: 'pointer' }}>
                                                            <i className="bi bi-pencil-fill text-white fs-6"></i>
                                                            <input type="file" accept="image/*" onChange={handleImageChange} className="d-none" />
                                                        </label>
                                                    </div>
                                                    <p className="text-muted small mt-2">Tải ảnh thú cưng (không bắt buộc)</p>
                                                </div>
                                                
                                                <div className="row g-4">
                                                    <div className="col-md-6">
                                                        <label className="form-label fw-semibold">Tên thú cưng *</label>
                                                        <input type="text" className="form-control form-control-lg" name="petName" 
                                                               value={formData.petName} onChange={handleChange} 
                                                               placeholder="VD: Lucky, Mimi" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label fw-semibold">Loại thú cưng *</label>
                                                        <div className="d-flex gap-2 flex-wrap">
                                                            {petTypes.map(type => (
                                                                <button key={type.value} type="button"
                                                                    className={`btn rounded-pill px-3 ${formData.petType === type.value ? 'btn-primary' : 'btn-outline-secondary'}`}
                                                                    onClick={() => setFormData(prev => ({ ...prev, petType: type.value }))}>
                                                                    {type.icon} {type.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label fw-semibold">Giống loài</label>
                                                        <input type="text" className="form-control form-control-lg" name="petBreed" 
                                                               value={formData.petBreed} onChange={handleChange} 
                                                               placeholder="VD: Poodle, Alaska" />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label className="form-label fw-semibold">Tuổi</label>
                                                        <input type="number" className="form-control form-control-lg" name="petAge" 
                                                               value={formData.petAge} onChange={handleChange} 
                                                               placeholder="Tuổi" />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label className="form-label fw-semibold">Cân nặng (kg)</label>
                                                        <input type="number" step="0.1" className="form-control form-control-lg" name="petWeight" 
                                                               value={formData.petWeight} onChange={handleChange} 
                                                               placeholder="kg" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label fw-semibold">Giới tính</label>
                                                        <div className="d-flex gap-3">
                                                            <button type="button"
                                                                className={`btn rounded-pill px-4 ${formData.petGender === 'male' ? 'btn-primary' : 'btn-outline-secondary'}`}
                                                                onClick={() => setFormData(prev => ({ ...prev, petGender: 'male' }))}>
                                                                <i className="bi bi-gender-male me-1"></i> Đực
                                                            </button>
                                                            <button type="button"
                                                                className={`btn rounded-pill px-4 ${formData.petGender === 'female' ? 'btn-primary' : 'btn-outline-secondary'}`}
                                                                onClick={() => setFormData(prev => ({ ...prev, petGender: 'female' }))}>
                                                                <i className="bi bi-gender-female me-1"></i> Cái
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label fw-semibold">Màu sắc</label>
                                                        <input type="text" className="form-control form-control-lg" name="petColor" 
                                                               value={formData.petColor} onChange={handleChange} 
                                                               placeholder="VD: Vàng, Đen, Trắng" />
                                                    </div>
                                                </div>
                                                
                                                <div className="mt-5 d-flex justify-content-end">
                                                    <button className="btn btn-primary btn-lg px-5 rounded-pill" onClick={nextStep}>
                                                        Tiếp theo <i className="bi bi-arrow-right ms-2"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 2: Triệu chứng */}
                                        {step === 2 && (
                                            <div className="p-4 p-lg-5">
                                                <h3 className="fw-bold mb-4">🩺 Triệu chứng & Lý do khám</h3>
                                                
                                                <div className="mb-4">
                                                    <label className="form-label fw-semibold">Triệu chứng / Lý do khám *</label>
                                                    <textarea className="form-control form-control-lg" rows="4"
                                                              name="symptoms"
                                                              value={formData.symptoms}
                                                              onChange={handleChange}
                                                              placeholder="Mô tả chi tiết triệu chứng của thú cưng (ho, sốt, bỏ ăn, nôn mửa, tiêu chảy, ...)" />
                                                </div>
                                                
                                                <div className="mb-4">
                                                    <label className="form-label fw-semibold">Tiền sử bệnh</label>
                                                    <textarea className="form-control" rows="3"
                                                              name="medicalHistory"
                                                              value={formData.medicalHistory}
                                                              onChange={handleChange}
                                                              placeholder="Các bệnh đã mắc, dị ứng, thuốc đang dùng, ..." />
                                                </div>
                                                
                                                <div className="mt-5 d-flex gap-3 justify-content-between">
                                                    <button className="btn btn-outline-secondary btn-lg px-5 rounded-pill" onClick={prevStep}>
                                                        <i className="bi bi-arrow-left me-2"></i> Quay lại
                                                    </button>
                                                    <button className="btn btn-primary btn-lg px-5 rounded-pill" onClick={nextStep}>
                                                        Tiếp theo <i className="bi bi-arrow-right ms-2"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 3: Chọn dịch vụ */}
                                        {step === 3 && (
                                            <div className="p-4 p-lg-5">
                                                <h3 className="fw-bold mb-4">📋 Chọn dịch vụ</h3>
                                                
                                                <div className="row g-3">
                                                    {services.map(service => (
                                                        <div className="col-md-6" key={service.id}>
                                                            <div className={`card h-100 border-2 cursor-pointer transition-all ${formData.serviceId === service.id ? 'border-primary shadow-lg' : 'border'}`}
                                                                 onClick={() => setFormData({...formData, serviceId: service.id})}
                                                                 style={{ cursor: 'pointer', transition: 'all 0.3s' }}>
                                                                <div className="card-body p-4">
                                                                    <div className="d-flex justify-content-between align-items-start">
                                                                        <div>
                                                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                                                <span className="fs-3">{service.icon || '🩺'}</span>
                                                                                <h5 className="fw-bold mb-0">{service.name}</h5>
                                                                            </div>
                                                                            <p className="text-muted small mb-2">{service.description}</p>
                                                                            <div className="d-flex gap-2">
                                                                                <span className="badge bg-light text-dark px-3 py-2 rounded-pill">
                                                                                    <i className="bi bi-clock me-1"></i> {service.duration} phút
                                                                                </span>
                                                                                <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-bold">
                                                                                    {service.price.toLocaleString()}đ
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        {formData.serviceId === service.id && (
                                                                            <div className="text-primary">
                                                                                <i className="bi bi-check-circle-fill fs-3"></i>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                
                                                <div className="mt-5 d-flex gap-3 justify-content-between">
                                                    <button className="btn btn-outline-secondary btn-lg px-5 rounded-pill" onClick={prevStep}>
                                                        <i className="bi bi-arrow-left me-2"></i> Quay lại
                                                    </button>
                                                    <button className="btn btn-primary btn-lg px-5 rounded-pill" onClick={nextStep} disabled={!formData.serviceId}>
                                                        Tiếp theo <i className="bi bi-arrow-right ms-2"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 4: Chọn bác sĩ */}
                                        {step === 4 && (
                                            <div className="p-4 p-lg-5">
                                                <h3 className="fw-bold mb-4">👨‍⚕️ Chọn bác sĩ</h3>
                                                
                                                <div className="row g-4">
                                                    {doctors.map(doctor => (
                                                        <div className="col-md-6" key={doctor.id}>
                                                            <div className={`card border-2 cursor-pointer transition-all ${formData.doctorId === doctor.id ? 'border-primary shadow-lg' : 'border'}`}
                                                                 onClick={() => setFormData({...formData, doctorId: doctor.id})}
                                                                 style={{ cursor: 'pointer', transition: 'all 0.3s' }}>
                                                                <div className="card-body p-4">
                                                                    <div className="d-flex gap-3">
                                                                        <img src={doctor.avatarUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(doctor.fullName) + '&background=667eea&color=fff'} 
                                                                             alt={doctor.fullName}
                                                                             className="rounded-circle"
                                                                             style={{ width: '70px', height: '70px', objectFit: 'cover' }} />
                                                                        <div className="flex-grow-1">
                                                                            <div className="d-flex justify-content-between align-items-start">
                                                                                <div>
                                                                                    <h5 className="fw-bold mb-1">{doctor.fullName}</h5>
                                                                                    <p className="text-muted small mb-2">
                                                                                        <i className="bi bi-briefcase me-1"></i> 10 năm kinh nghiệm
                                                                                    </p>
                                                                                    <div className="d-flex gap-2">
                                                                                        <span className="badge bg-warning text-dark">
                                                                                            <i className="bi bi-star-fill me-1"></i> 4.9
                                                                                        </span>
                                                                                        <span className="badge bg-light text-dark">
                                                                                            <i className="bi bi-chat-dots me-1"></i> 120 đánh giá
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                                {formData.doctorId === doctor.id && (
                                                                                    <div className="text-primary">
                                                                                        <i className="bi bi-check-circle-fill fs-3"></i>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                
                                                <div className="mt-5 d-flex gap-3 justify-content-between">
                                                    <button className="btn btn-outline-secondary btn-lg px-5 rounded-pill" onClick={prevStep}>
                                                        <i className="bi bi-arrow-left me-2"></i> Quay lại
                                                    </button>
                                                    <button className="btn btn-primary btn-lg px-5 rounded-pill" onClick={nextStep} disabled={!formData.doctorId}>
                                                        Tiếp theo <i className="bi bi-arrow-right ms-2"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 5: Chọn ngày giờ */}
{step === 5 && (
    <div className="p-4 p-lg-5">
        <h3 className="fw-bold mb-4">📅 Chọn ngày giờ</h3>
        
        <div className="row g-4">
            <div className="col-md-6">
                <label className="form-label fw-semibold">Ngày khám</label>
                <DatePicker
                    selected={formData.appointmentDate}
                    onChange={(date) => setFormData({...formData, appointmentDate: date, appointmentTime: ''})}
                    minDate={new Date()}
                    className="form-control form-control-lg"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Chọn ngày khám"
                />
            </div>
            <div className="col-md-6">
                <label className="form-label fw-semibold">Giờ khám</label>
                {availableSlots.length === 0 && formData.doctorId ? (
                    <div className="text-center py-4 bg-light rounded-3">
                        <div className="spinner-border text-primary"></div>
                        <p className="mt-2 text-muted">Đang tải khung giờ...</p>
                    </div>
                ) : (
                    <div className="d-flex flex-wrap gap-2">
                        {availableSlots.map(slot => {
                            const isDisabled = isTimeSlotDisabled(slot, formData.appointmentDate);
                            return (
                                <button 
                                    key={slot} 
                                    type="button"
                                    className={`btn rounded-pill px-3 ${isDisabled ? 'btn-secondary opacity-50' : (formData.appointmentTime === slot ? 'btn-primary shadow' : 'btn-outline-secondary')}`}
                                    onClick={() => !isDisabled && setFormData({...formData, appointmentTime: slot})}
                                    disabled={isDisabled}
                                    style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
                                >
                                    {slot}
                                    {isDisabled && <small className="ms-1 text-muted"></small>}
                                </button>
                            );
                        })}
                        {availableSlots.length === 0 && (
                            <div className="alert alert-warning w-100">Không có khung giờ trống trong ngày này</div>
                        )}
                    </div>
                )}
                {formData.appointmentDate && new Date(formData.appointmentDate).toDateString() === new Date().toDateString() && (
                    <small className="text-muted d-block mt-2">
                        <i className="bi bi-info-circle me-1"></i>
                        Các khung giờ <span className="text-secondary">màu xám</span> đã qua, không thể chọn
                    </small>
                )}
            </div>
        </div>
        
        <div className="mt-5 d-flex gap-3 justify-content-between">
            <button className="btn btn-outline-secondary btn-lg px-5 rounded-pill" onClick={prevStep}>
                <i className="bi bi-arrow-left me-2"></i> Quay lại
            </button>
            <button className="btn btn-primary btn-lg px-5 rounded-pill" onClick={nextStep} disabled={!formData.appointmentTime}>
                Tiếp theo <i className="bi bi-arrow-right ms-2"></i>
            </button>
        </div>
    </div>
)}

                                        {/* Step 6: Xác nhận */}
                                        {step === 6 && (
                                            <div className="p-4 p-lg-5">
                                                <h3 className="fw-bold mb-4">✅ Xác nhận thông tin</h3>
                                                
                                                <div className="bg-light rounded-4 p-4 mb-4">
                                                    <div className="row g-4">
                                                        <div className="col-md-6">
                                                            <div className="d-flex gap-3">
                                                                {imagePreview ? (
                                                                    <img src={imagePreview} alt="Pet" className="rounded-circle" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                                                                ) : (
                                                                    <div className="rounded-circle bg-white d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                                                                        <i className="bi bi-paw fs-2 text-muted"></i>
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <h5 className="fw-bold mb-1">{formData.petName}</h5>
                                                                    <p className="text-muted small mb-0">
                                                                        {petTypes.find(t => t.value === formData.petType)?.label}
                                                                        {formData.petBreed && ` • ${formData.petBreed}`}
                                                                        {formData.petAge && ` • ${formData.petAge} tuổi`}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="d-flex gap-3">
                                                                <div className="rounded-circle bg-white d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                                                                    <i className="bi bi-person fs-2 text-muted"></i>
                                                                </div>
                                                                <div>
                                                                    <h5 className="fw-bold mb-1">{getDoctorById(formData.doctorId)?.fullName || 'Chưa chọn'}</h5>
                                                                    <p className="text-muted small mb-0">Bác sĩ thú y</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <hr />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-2">
                                                                <i className="bi bi-calendar text-primary me-2"></i>
                                                                <span className="fw-semibold">Ngày khám:</span> {formData.appointmentDate.toLocaleDateString('vi-VN')}
                                                            </div>
                                                            <div className="mb-2">
                                                                <i className="bi bi-clock text-primary me-2"></i>
                                                                <span className="fw-semibold">Giờ khám:</span> {formData.appointmentTime}
                                                            </div>
                                                            <div>
                                                                <i className="bi bi-tag text-primary me-2"></i>
                                                                <span className="fw-semibold">Dịch vụ:</span> {getServiceById(formData.serviceId)?.name}
                                                                <span className="text-primary fw-bold ms-2">{getServiceById(formData.serviceId)?.price?.toLocaleString()}đ</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div>
                                                                <i className="bi bi-chat-dots text-primary me-2 align-top"></i>
                                                                <span className="fw-semibold">Triệu chứng:</span>
                                                                <p className="text-muted small mt-1 mb-0">{formData.symptoms}</p>
                                                            </div>
                                                        </div>
                                                        {formData.medicalHistory && (
                                                            <div className="col-12">
                                                                <i className="bi bi-file-text text-primary me-2"></i>
                                                                <span className="fw-semibold">Tiền sử bệnh:</span>
                                                                <p className="text-muted small mt-1 mb-0">{formData.medicalHistory}</p>
                                                            </div>
                                                        )}
                                                        {formData.notes && (
                                                            <div className="col-12">
                                                                <i className="bi bi-pencil text-primary me-2"></i>
                                                                <span className="fw-semibold">Ghi chú:</span>
                                                                <p className="text-muted small mt-1 mb-0">{formData.notes}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                <div className="mt-5 d-flex gap-3 justify-content-between">
                                                    <button className="btn btn-outline-secondary btn-lg px-5 rounded-pill" onClick={prevStep}>
                                                        <i className="bi bi-pencil me-2"></i> Chỉnh sửa
                                                    </button>
                                                    <button className="btn btn-success btn-lg px-5 rounded-pill" onClick={handleSubmit} disabled={isSubmitting}>
                                                        {isSubmitting ? (
                                                            <>
                                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                                Đang xử lý...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <i className="bi bi-check-lg me-2"></i>
                                                                Xác nhận đặt lịch
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .shadow-xxl {
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                }
                .transition-all {
                    transition: all 0.3s ease;
                }
                .border-dashed {
                    border-style: dashed !important;
                }
                .card:hover {
                    transform: translateY(-4px);
                }
                .btn-primary, .btn-outline-primary, .btn-success, .btn-outline-secondary {
                    transition: all 0.3s ease;
                }
                .btn-primary:hover, .btn-success:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                }
            `}</style>
        </div>
    );
};

export default Booking;