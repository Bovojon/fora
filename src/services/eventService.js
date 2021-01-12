import AxiosAPI from './apiService';

const EventService = {
  getUrl: () => { return AxiosAPI.post('/auth/google/getUrl') },
  getAuthClient: (data) => { return AxiosAPI.post('/auth/google/getAuthClient', data) },
  submitEvent: (data) => { return AxiosAPI.post('/auth/google/insert', data) },
  importEvents: (data) => { return AxiosAPI.post('/auth/google/list', data) }
}

export default EventService;