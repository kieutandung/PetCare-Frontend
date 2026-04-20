import api from './api';

const appointmentService = {
    // Lấy danh sách bác sĩ
    getDoctors: async () => {
        try {
            const response = await api.get('/appointments/doctors');
            return response.data;
        } catch (error) {
            console.error('Get doctors error:', error);
            return { success: false, message: error.message };
        }
    },

    // Lấy danh sách dịch vụ
    getServices: async () => {
        try {
            const response = await api.get('/appointments/services');
            return response.data;
        } catch (error) {
            console.error('Get services error:', error);
            return { success: false, message: error.message };
        }
    },

    // Lấy khung giờ trống
getAvailableSlots: async (doctorId, date) => {
    console.log('🕐 Calling getAvailableSlots:', { doctorId, date });
    try {
        const response = await api.get(`/appointments/available-slots?doctorId=${doctorId}&date=${date}`);
        console.log('📥 getAvailableSlots response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Get available slots error:', error);
        console.error('Error details:', error.response?.data);
        // Trả về danh sách giờ mặc định khi lỗi
        return { 
            success: true, 
            slots: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
                    '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', 
                    '15:00', '15:30', '16:00', '16:30', '17:00'] 
        };
    }
},

    // Đặt lịch mới (không ảnh)
    bookAppointment: async (appointmentData) => {
        try {
            console.log('📤 Booking appointment:', appointmentData);
            const response = await api.post('/appointments/book', appointmentData);
            console.log('📥 Book response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Book appointment error:', error);
            return { 
                success: false, 
                message: error.response?.data?.message || 'Đặt lịch thất bại' 
            };
        }
    },

    // Đặt lịch mới (có ảnh - dùng FormData)
    bookAppointmentWithImage: async (formData) => {
        try {
            const response = await api.post('/appointments/book-with-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Book appointment with image error:', error);
            return { 
                success: false, 
                message: error.response?.data?.message || 'Đặt lịch thất bại' 
            };
        }
    },

    // Lấy tất cả lịch hẹn của user
    getMyAppointments: async () => {
        try {
            const response = await api.get('/appointments/my-appointments');
            return response.data;
        } catch (error) {
            console.error('Get my appointments error:', error);
            return { success: false, message: error.message, appointments: [] };
        }
    },

    // Lấy lịch hẹn sắp tới
    getUpcomingAppointments: async () => {
        try {
            const response = await api.get('/appointments/upcoming');
            return response.data;
        } catch (error) {
            console.error('Get upcoming appointments error:', error);
            return { success: false, message: error.message, appointments: [] };
        }
    },

    // Lấy chi tiết lịch hẹn
    getAppointmentDetail: async (appointmentId) => {
        try {
            const response = await api.get(`/appointments/${appointmentId}`);
            return response.data;
        } catch (error) {
            console.error('Get appointment detail error:', error);
            return { success: false, message: error.message };
        }
    },

    // Hủy lịch hẹn
    cancelAppointment: async (appointmentId, reason = '') => {
        try {
            const response = await api.put(`/appointments/cancel/${appointmentId}?reason=${encodeURIComponent(reason)}`);
            return response.data;
        } catch (error) {
            console.error('Cancel appointment error:', error);
            return { success: false, message: error.response?.data?.message || 'Hủy lịch thất bại' };
        }
    },

    // Lấy lịch sử khám
    getAppointmentHistory: async () => {
        try {
            const response = await api.get('/appointments/history');
            return response.data;
        } catch (error) {
            console.error('Get appointment history error:', error);
            return { success: false, message: error.message, appointments: [] };
        }
    }
};

export default appointmentService;