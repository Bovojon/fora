const CalendarSelector = {
  getParticipants: (state) => { return state.calendar?.participants },
  getCalendarId: (state) => { return state.calendar.id },
  getCalendarUniqueId: (state) => { return state.calendar.unique_id }
}

export default CalendarSelector;