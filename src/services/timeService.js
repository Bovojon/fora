import AxiosAPI from './apiService';

const TimeService = {
  createTime: (data) => { return AxiosAPI.post('/time/create', data) },
  removeTime: (data) => { return AxiosAPI.post('/time/remove', data) },
}

export default TimeService;