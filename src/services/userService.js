import AxiosAPI from './apiService';

const UserService = {
  createUser: (data) => { return AxiosAPI.post('/user/create', data) },
  updateUser: (data) => { return AxiosAPI.patch('/user/update', data) }
}

export default UserService;