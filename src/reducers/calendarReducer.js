import { CREATE_CALENDAR_SUCCESS } from "../actions/constants";

const calendarReducer = (state={}, { type, payload }) => {
  switch(type) {
    case CREATE_CALENDAR_SUCCESS:
      const { calendarId } = payload;
      return {...state, calendarId }
    default:
      return state
  }
}

export default calendarReducer;