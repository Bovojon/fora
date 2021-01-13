import AxiosAPI from './apiService';

const EventService = {
  getUrl: () => { return AxiosAPI.post('/auth/google/getUrl') },
  getAccessToken: (data) => { return AxiosAPI.post('/auth/google/getAccessToken', data) },
  submitEvent: (data) => { return AxiosAPI.post('/auth/google/insert', data) },
  importEvents: (data) => { return AxiosAPI.post('/auth/google/list', data) }
}

export default EventService;