import AxiosAPI from './apiService';

const CalendarService = {
  createCalendar: () => { return AxiosAPI.post('/calendar/create') },
  getCalendar: (data) => { return AxiosAPI.post('/calendar/get', data) },
  addUserToCalendar: (data) => { return AxiosAPI.post('/calendar/addUser', data) },
  setCalendarOwner: (data) => { return AxiosAPI.post('/calendar/setOwner', data) }
}

export default CalendarService;