const CalendarSelector = {
  getTotalParticipants: (state) => { return state.calendar.participants.length },
  getCalendarId: (state) => { return state.calendar.id }
}

export default CalendarSelector;