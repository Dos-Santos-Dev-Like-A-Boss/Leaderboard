import { axiosRest } from '../axiosRest';

export class UserApi {
  static async getAllUsers() {
    const { data } = await axiosRest.get('');
    return data;
  }

  static async createUser(dto) {
    const { data } = await axiosRest.post('', dto);
    return data;
  }

  static async updateUser(id, userData) {
    const { data } = await axiosRest.patch(`/${id}`, userData);
    return data;
  }

  static async deleteUser(id) {
    const { data } = await axiosRest.delete(`/${id}`);
    return data;
  }

  static async deleteRecord(userId, recordId) {
    const { data } = await axiosRest.delete(`/${userId}`, {
      data: {
        recordId,
      },
    });
    return data;
  }
}