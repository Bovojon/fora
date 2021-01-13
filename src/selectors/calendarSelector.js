const CalendarSelector = {
  getTotalParticipants: (state) => { return state.calendar.participants.length },
  getCalendarId: (state) => { return state.calendar.id },
  getCalendarUniqueId: (state) => { return state.calendar.unique_id }
}

export default CalendarSelector;