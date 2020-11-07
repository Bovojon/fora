import AxiosAPI from './apiService';

const CalendarService = {
  createCalendar: (data) => { return AxiosAPI.post('/calendar/create', data) },
  getCalendar: (data) => { return AxiosAPI.post('/calendar/get', data) },
  addUserToCalendar: (data) => { return AxiosAPI.post('/calendar/addUser', data) },
  setCalendarOwner: (data) => { return AxiosAPI.post('/calendar/setOwner', data) }
}

export default CalendarService;