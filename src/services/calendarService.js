import AxiosAPI from './apiService';

const CalendarService = {
  createCalendar: (data) => { return AxiosAPI.post('/calendar/create', data) },
  getCalendar: (data) => { return AxiosAPI.post('/calendar/get', data) }
}

export default CalendarService;