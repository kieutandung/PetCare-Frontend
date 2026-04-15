import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Homepage = () => {
    const { isAuthenticated } = useAuth();

    const services = [
        { id: 1, icon: '🩺', name: 'Khám tổng quát', desc: 'Kiểm tra sức khỏe định kỳ, phát hiện sớm bệnh lý', price: '200.000đ' },
        { id: 2, icon: '💉', name: 'Tiêm phòng', desc: 'Vắc xin phòng bệnh nguy hiểm cho thú cưng', price: '150.000đ' },
        { id: 3, icon: '🔬', name: 'Xét nghiệm', desc: 'Xét nghiệm máu, nước tiểu, chẩn đoán hình ảnh', price: '300.000đ' },
        { id: 4, icon: '🏥', name: 'Phẫu thuật', desc: 'Triệt sản, lấy khối u, chỉnh hình', price: '500.000đ' },
        { id: 5, icon: '🦷', name: 'Nha khoa', desc: 'Vệ sinh răng miệng, nhổ răng, điều trị nha chu', price: '180.000đ' },
        { id: 6, icon: '🚑', name: 'Cấp cứu 24/7', desc: 'Hỗ trợ cấp cứu khẩn cấp mọi lúc', price: 'Liên hệ' },
    ];

    const reasons = [
        { id: 1, icon: '👨‍⚕️', title: 'Bác sĩ giàu kinh nghiệm', desc: 'Đội ngũ bác sĩ chuyên môn cao, tận tâm với nghề' },
        { id: 2, icon: '🏆', title: 'Trang thiết bị hiện đại', desc: 'Máy móc tiên tiến, chẩn đoán chính xác' },
        { id: 3, icon: '💚', title: 'Chăm sóc tận tình', desc: 'Tư vấn nhiệt tình, chu đáo 24/7' },
        { id: 4, icon: '📅', title: 'Đặt lịch dễ dàng', desc: 'Đặt lịch online nhanh chóng, tiện lợi' },
        { id: 5, icon: '⭐', title: 'Khách hàng hài lòng', desc: 'Hàng ngàn khách hàng tin tưởng và yêu mến' },
        { id: 6, icon: '💰', title: 'Giá cả hợp lý', desc: 'Chi phí minh bạch, nhiều ưu đãi hấp dẫn' },
    ];

    // Bác sĩ với áo blouse trắng/xanh chuẩn
    const doctors = [
        { 
            id: 1, 
            name: 'BS. Nguyễn Văn An', 
            specialty: 'Chuyên khoa Thú y tổng quát', 
            exp: '10 năm', 
            img: 'https://images.pexels.com/photos/5327659/pexels-photo-5327659.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        { 
            id: 2, 
            name: 'BS. Trần Thị Bình', 
            specialty: 'Chuyên khoa Da liễu', 
            exp: '8 năm', 
            img: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        { 
            id: 3, 
            name: 'BS. Lê Văn Cường', 
            specialty: 'Chuyên khoa Phẫu thuật', 
            exp: '12 năm', 
            img: 'https://images.pexels.com/photos/5327655/pexels-photo-5327655.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
    ];

    const testimonials = [
        { id: 1, name: 'Chị Lan Anh', pet: 'Boss - Chó Poodle', content: 'Bác sĩ rất tận tâm, Boss đã khỏe hẳn sau 3 ngày điều trị', rating: 5, img: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { id: 2, name: 'Anh Minh Tuấn', pet: 'Miu - Mèo Anh lông ngắn', content: 'Dịch vụ tốt, phòng khám sạch sẽ, nhân viên thân thiện', rating: 5, img: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { id: 3, name: 'Chị Thu Hà', pet: 'Lucky - Chó Alaska', content: 'Rất hài lòng với dịch vụ tại đây, sẽ giới thiệu cho bạn bè', rating: 5, img: 'https://randomuser.me/api/portraits/women/3.jpg' },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '80px 0',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', marginBottom: '20px' }}>
                                Chăm sóc sức khỏe<br />
                                <span style={{ color: '#f093fb' }}>thú cưng toàn diện</span>
                            </h1>
                            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', marginBottom: '30px', lineHeight: '1.6' }}>
                                Hệ thống phòng khám thú y hiện đại với đội ngũ bác sĩ giàu kinh nghiệm,
                                trang thiết bị tiên tiến, mang đến dịch vụ tốt nhất cho thú cưng của bạn.
                            </p>
                            <div className="d-flex gap-3">
                                <Link to={isAuthenticated ? "/appointments" : "/register"} 
                                      className="btn btn-light btn-lg px-4 rounded-pill fw-semibold">
                                    Đặt lịch ngay <i className="bi bi-arrow-right ms-2"></i>
                                </Link>
                                <Link to="/services" className="btn btn-outline-light btn-lg px-4 rounded-pill">
                                    Xem dịch vụ
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6 text-center mt-5 mt-lg-0">
                            <img 
                                src="https://images.pexels.com/photos/4588065/pexels-photo-4588065.jpeg?auto=compress&cs=tinysrgb&w=800" 
                                alt="Veterinarian checking dog"
                                style={{ 
                                    width: '100%', 
                                    borderRadius: '30px', 
                                    maxHeight: '400px', 
                                    objectFit: 'cover',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-5" style={{ background: '#f8f9fa' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <img 
                                src="https://images.pexels.com/photos/6233324/pexels-photo-6233324.jpeg?auto=compress&cs=tinysrgb&w=800" 
                                alt="Veterinarian with cat"
                                style={{ 
                                    width: '100%', 
                                    borderRadius: '20px', 
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                    height: '400px',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                        <div className="col-lg-6">
                            <span className="badge bg-primary bg-opacity-10 text-primary mb-3 py-2 px-3 rounded-pill">
                                Về chúng tôi
                            </span>
                            <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>
                                Nơi thú cưng được<br />
                                <span style={{ color: '#667eea' }}>yêu thương và chăm sóc</span>
                            </h2>
                            <p style={{ color: '#6c757d', lineHeight: '1.8', marginBottom: '20px' }}>
                                PetCare là hệ thống phòng khám thú y hàng đầu với hơn 15 năm kinh nghiệm 
                                trong lĩnh vực chăm sóc sức khỏe thú cưng. Chúng tôi tự hào mang đến những 
                                dịch vụ chất lượng cao với đội ngũ bác sĩ giàu chuyên môn và tận tâm.
                            </p>
                            <div className="d-flex gap-4 mt-4">
                                <div>
                                    <div className="fw-bold" style={{ fontSize: '28px', color: '#667eea' }}>15+</div>
                                    <div className="text-muted">Năm kinh nghiệm</div>
                                </div>
                                <div>
                                    <div className="fw-bold" style={{ fontSize: '28px', color: '#667eea' }}>10K+</div>
                                    <div className="text-muted">Khách hàng tin tưởng</div>
                                </div>
                                <div>
                                    <div className="fw-bold" style={{ fontSize: '28px', color: '#667eea' }}>50+</div>
                                    <div className="text-muted">Bác sĩ chuyên nghiệp</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="badge bg-primary bg-opacity-10 text-primary mb-3 py-2 px-3 rounded-pill">
                            Dịch vụ của chúng tôi
                        </span>
                        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '15px' }}>
                            Dịch vụ chăm sóc sức khỏe<br />
                            <span style={{ color: '#667eea' }}>toàn diện cho thú cưng</span>
                        </h2>
                    </div>
                    <div className="row g-4">
                        {services.map(service => (
                            <div className="col-lg-4 col-md-6" key={service.id}>
                                <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '16px', transition: 'transform 0.3s' }}
                                     onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
                                     onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                                    <div className="card-body p-4">
                                        <div style={{ fontSize: '48px', marginBottom: '15px' }}>{service.icon}</div>
                                        <h5 className="fw-bold mb-2">{service.name}</h5>
                                        <p className="text-muted" style={{ fontSize: '14px', lineHeight: '1.6' }}>{service.desc}</p>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <span className="fw-bold text-primary">{service.price}</span>
                                            <Link to="/appointments" className="btn btn-sm btn-outline-primary rounded-pill">
                                                Đặt lịch
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Doctors Section - Với áo blouse trắng/xanh */}
            <section className="py-5" style={{ background: '#f8f9fa' }}>
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="badge bg-primary bg-opacity-10 text-primary mb-3 py-2 px-3 rounded-pill">
                            Đội ngũ bác sĩ
                        </span>
                        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '15px' }}>
                            Những người đồng hành<br />
                            <span style={{ color: '#667eea' }}>đáng tin cậy của thú cưng</span>
                        </h2>
                    </div>
                    <div className="row g-4">
                        {doctors.map(doctor => (
                            <div className="col-md-4" key={doctor.id}>
                                <div className="card border-0 shadow-sm text-center h-100" style={{ borderRadius: '16px', transition: 'transform 0.3s' }}
                                     onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
                                     onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                                    <div className="card-body p-4">
                                        <img 
                                            src={doctor.img} 
                                            alt={doctor.name}
                                            style={{ 
                                                width: '150px', 
                                                height: '150px', 
                                                borderRadius: '50%', 
                                                objectFit: 'cover',
                                                marginBottom: '15px',
                                                border: '3px solid #667eea',
                                                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                                            }}
                                        />
                                        <h5 className="fw-bold mb-1">{doctor.name}</h5>
                                        <p className="text-primary small mb-2">{doctor.specialty}</p>
                                        <p className="text-muted small">
                                            <i className="bi bi-briefcase me-1"></i> Kinh nghiệm: {doctor.exp}
                                        </p>
                                        <button className="btn btn-sm btn-outline-primary rounded-pill mt-2 px-4">
                                            Đặt lịch
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-5">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="badge bg-primary bg-opacity-10 text-primary mb-3 py-2 px-3 rounded-pill">
                            Tại sao chọn PetCare?
                        </span>
                        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '15px' }}>
                            Lý do hàng ngàn khách hàng<br />
                            <span style={{ color: '#667eea' }}>tin tưởng và lựa chọn</span>
                        </h2>
                    </div>
                    <div className="row g-4">
                        {reasons.map(reason => (
                            <div className="col-lg-4 col-md-6" key={reason.id}>
                                <div className="d-flex gap-3 p-4 bg-white rounded-4 shadow-sm h-100" style={{ transition: 'transform 0.3s' }}
                                     onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                                     onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                                    <div style={{ fontSize: '40px' }}>{reason.icon}</div>
                                    <div>
                                        <h5 className="fw-bold mb-2">{reason.title}</h5>
                                        <p className="text-muted mb-0" style={{ fontSize: '14px' }}>{reason.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-5" style={{ background: '#f8f9fa' }}>
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="badge bg-primary bg-opacity-10 text-primary mb-3 py-2 px-3 rounded-pill">
                            Khách hàng nói gì?
                        </span>
                        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '15px' }}>
                            Những phản hồi tích cực<br />
                            <span style={{ color: '#667eea' }}>từ khách hàng</span>
                        </h2>
                    </div>
                    <div className="row g-4">
                        {testimonials.map(testimonial => (
                            <div className="col-md-4" key={testimonial.id}>
                                <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '16px', transition: 'transform 0.3s' }}
                                     onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                                     onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                                    <div className="card-body p-4">
                                        <div className="text-warning mb-3">
                                            {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                                        </div>
                                        <p className="fst-italic mb-3">"{testimonial.content}"</p>
                                        <div className="d-flex align-items-center gap-3">
                                            <img 
                                                src={testimonial.img} 
                                                alt={testimonial.name}
                                                style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                                            />
                                            <div>
                                                <div className="fw-bold">{testimonial.name}</div>
                                                <small className="text-muted">{testimonial.pet}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-5" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}>
                <div className="container text-center">
                    <h2 className="text-white fw-bold mb-3" style={{ fontSize: '36px' }}>
                        Sẵn sàng chăm sóc thú cưng của bạn?
                    </h2>
                    <p className="text-white-50 mb-4" style={{ fontSize: '18px' }}>
                        Đặt lịch hẹn ngay hôm nay để nhận ưu đãi 20% cho lần khám đầu tiên
                    </p>
                    <Link to={isAuthenticated ? "/appointments" : "/register"} 
                          className="btn btn-light btn-lg px-5 rounded-pill fw-semibold">
                        Đặt lịch ngay <i className="bi bi-arrow-right ms-2"></i>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="pt-5 pb-4" style={{ background: '#1a1a2e', color: 'rgba(255,255,255,0.7)' }}>
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-4">
                            <div className="d-flex align-items-center gap-2 mb-3">
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <i className="bi bi-heart-fill text-white"></i>
                                </div>
                                <span className="text-white fw-bold fs-4">PetCare</span>
                            </div>
                            <p className="mb-3" style={{ lineHeight: '1.8' }}>
                                Hệ thống phòng khám thú y hiện đại, chăm sóc sức khỏe toàn diện cho thú cưng của bạn.
                            </p>
                            <div className="d-flex gap-3">
                                <a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}><i className="bi bi-facebook fs-5"></i></a>
                                <a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}><i className="bi bi-instagram fs-5"></i></a>
                                <a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}><i className="bi bi-youtube fs-5"></i></a>
                                <a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}><i className="bi bi-tiktok fs-5"></i></a>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-6">
                            <h6 className="text-white fw-bold mb-3">Liên kết nhanh</h6>
                            <ul className="list-unstyled">
                                <li className="mb-2"><Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Trang chủ</Link></li>
                                <li className="mb-2"><Link to="/services" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Dịch vụ</Link></li>
                                <li className="mb-2"><Link to="/doctors" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Bác sĩ</Link></li>
                                <li className="mb-2"><Link to="/contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Liên hệ</Link></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <h6 className="text-white fw-bold mb-3">Giờ làm việc</h6>
                            <ul className="list-unstyled">
                                <li className="mb-2">Thứ 2 - Thứ 7: 8:00 - 20:00</li>
                                <li className="mb-2">Chủ nhật: 8:00 - 17:00</li>
                                <li className="mb-2">Cấp cứu 24/7: 1900 1234</li>
                            </ul>
                        </div>

                        <div className="col-lg-3">
                            <h6 className="text-white fw-bold mb-3">Thông tin liên hệ</h6>
                            <ul className="list-unstyled">
                                <li className="mb-2"><i className="bi bi-geo-alt me-2"></i> 123 Đường Nguyễn Trãi, Q1, TP.HCM</li>
                                <li className="mb-2"><i className="bi bi-envelope me-2"></i> info@petcare.com</li>
                                <li className="mb-2"><i className="bi bi-phone me-2"></i> (028) 1234 5678</li>
                            </ul>
                        </div>
                    </div>

                    <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                    <div className="text-center">
                        <p className="mb-0 small">© 2024 PetCare. Tất cả các quyền được bảo lưu.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Homepage;