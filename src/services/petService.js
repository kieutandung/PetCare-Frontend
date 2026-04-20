import api from './api';

const petService = {
    // Lấy danh sách thú cưng của user
    getMyPets: async () => {
        try {
            const response = await api.get('/pets/my-pets');
            return response.data;
        } catch (error) {
            console.error('Get my pets error:', error);
            return { success: false, message: error.message, pets: [] };
        }
    },

    // Lấy chi tiết thú cưng
    getPetDetail: async (petId) => {
        try {
            const response = await api.get(`/pets/${petId}`);
            return response.data;
        } catch (error) {
            console.error('Get pet detail error:', error);
            return { success: false, message: error.message };
        }
    },

    // Thêm thú cưng mới
    addPet: async (petData) => {
        try {
            const response = await api.post('/pets/add', petData);
            return response.data;
        } catch (error) {
            console.error('Add pet error:', error);
            return { success: false, message: error.response?.data?.message || 'Thêm thú cưng thất bại' };
        }
    },

    // Cập nhật thông tin thú cưng
    updatePet: async (petId, petData) => {
        try {
            const response = await api.put(`/pets/${petId}`, petData);
            return response.data;
        } catch (error) {
            console.error('Update pet error:', error);
            return { success: false, message: error.response?.data?.message || 'Cập nhật thất bại' };
        }
    },

    // Xóa thú cưng
    deletePet: async (petId) => {
        try {
            const response = await api.delete(`/pets/${petId}`);
            return response.data;
        } catch (error) {
            console.error('Delete pet error:', error);
            return { success: false, message: error.response?.data?.message || 'Xóa thất bại' };
        }
    }
};

export default petService;