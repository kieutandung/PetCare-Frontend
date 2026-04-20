import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import petService from '../services/petService';

const MyPets = () => {
    const { user } = useAuth();
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        type: 'dog',
        breed: '',
        age: '',
        weight: '',
        gender: 'unknown',
        color: '',
        medicalHistory: ''
    });

    useEffect(() => {
        loadPets();
    }, []);

    const loadPets = async () => {
        setLoading(true);
        try {
            const response = await petService.getMyPets();
            if (response.success) {
                setPets(response.pets);
            }
        } catch (error) {
            toast.error('Không thể tải danh sách thú cưng');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await petService.addPet(formData);
            if (response.success) {
                toast.success('Thêm thú cưng thành công!');
                setShowForm(false);
                setFormData({
                    name: '',
                    type: 'dog',
                    breed: '',
                    age: '',
                    weight: '',
                    gender: 'unknown',
                    color: '',
                    medicalHistory: ''
                });
                loadPets();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Thêm thú cưng thất bại');
        }
    };

    const handleDelete = async (petId) => {
        if (window.confirm('Bạn có chắc muốn xóa thú cưng này?')) {
            try {
                const response = await petService.deletePet(petId);
                if (response.success) {
                    toast.success('Xóa thú cưng thành công');
                    loadPets();
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error('Xóa thú cưng thất bại');
            }
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-header bg-transparent border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                            <h3 className="fw-bold mb-0">🐾 Thú cưng của tôi</h3>
                            <button className="btn btn-primary rounded-pill" onClick={() => setShowForm(!showForm)}>
                                <i className="bi bi-plus-lg me-1"></i> Thêm thú cưng
                            </button>
                        </div>
                        <div className="card-body p-4">
                            {/* Form thêm thú cưng */}
                            {showForm && (
                                <div className="card bg-light mb-4 rounded-3">
                                    <div className="card-body">
                                        <h5 className="fw-bold mb-3">Thêm thú cưng mới</h5>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Tên thú cưng *</label>
                                                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Loại *</label>
                                                    <select className="form-select" name="type" value={formData.type} onChange={handleChange}>
                                                        <option value="dog">🐕 Chó</option>
                                                        <option value="cat">🐈 Mèo</option>
                                                        <option value="other">🐾 Khác</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Giống</label>
                                                    <input type="text" className="form-control" name="breed" value={formData.breed} onChange={handleChange} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Tuổi</label>
                                                    <input type="number" className="form-control" name="age" value={formData.age} onChange={handleChange} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Cân nặng (kg)</label>
                                                    <input type="number" step="0.1" className="form-control" name="weight" value={formData.weight} onChange={handleChange} />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Giới tính</label>
                                                    <select className="form-select" name="gender" value={formData.gender} onChange={handleChange}>
                                                        <option value="male">Đực</option>
                                                        <option value="female">Cái</option>
                                                        <option value="unknown">Chưa xác định</option>
                                                    </select>
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label">Màu sắc</label>
                                                    <input type="text" className="form-control" name="color" value={formData.color} onChange={handleChange} />
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label">Tiền sử bệnh</label>
                                                    <textarea className="form-control" rows="2" name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} placeholder="Các bệnh đã mắc, dị ứng, ..."></textarea>
                                                </div>
                                                <div className="col-12">
                                                    <button type="submit" className="btn btn-primary">Lưu</button>
                                                    <button type="button" className="btn btn-secondary ms-2" onClick={() => setShowForm(false)}>Hủy</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

                            {/* Danh sách thú cưng - Bỏ phần "Chưa có thú cưng nào" */}
                            <div className="row g-3">
                                {pets.map(pet => (
                                    <div className="col-md-6" key={pet.id}>
                                        <div className="card h-100 border rounded-3">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <div>
                                                        <div className="fs-1">
                                                            {pet.type === 'dog' ? '🐕' : pet.type === 'cat' ? '🐈' : '🐾'}
                                                        </div>
                                                        <h5 className="fw-bold mt-2 mb-1">{pet.name}</h5>
                                                        <p className="text-muted small mb-1">
                                                            {pet.type === 'dog' ? 'Chó' : pet.type === 'cat' ? 'Mèo' : pet.type}
                                                            {pet.breed && ` • ${pet.breed}`}
                                                        </p>
                                                        {pet.age && <p className="text-muted small mb-1">🎂 {pet.age} tuổi</p>}
                                                        {pet.weight && <p className="text-muted small mb-1">⚖️ {pet.weight} kg</p>}
                                                        {pet.color && <p className="text-muted small mb-1">🎨 {pet.color}</p>}
                                                    </div>
                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(pet.id)}>
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPets;