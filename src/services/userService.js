import AxiosAPI from './apiService';

const UserService = {
  createUser: (data) => { return AxiosAPI.post('/user/create', data) }
}

export default UserService;