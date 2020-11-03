import AxiosAPI from './apiService';

const CalendarService = {
  createCalendar: () => { return AxiosAPI.post('/calendar/create') },
  getCalendar: (data) => { return AxiosAPI.post('/calendar/get', data) }
}

export default CalendarService;