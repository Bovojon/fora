import AxiosAPI from './apiService';

const CalendarService = {
  createCalendar: (data) => { return AxiosAPI.post('/calendar/create', data) },
  addUserToCalendar: (data) => { return AxiosAPI.post('/calendar/addUser', data) },
  setCalendarOwner: (data) => { return AxiosAPI.post('/calendar/setOwner', data) },
  getCalendar: (options) => { return AxiosAPI.get('/calendar/get', options) },
}

export default CalendarService;