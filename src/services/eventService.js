import AxiosAPI from './apiService';

const EventService = {
  submitEvent: (data) => { return AxiosAPI.post('/auth/google/insert', data) }
}

export default EventService;