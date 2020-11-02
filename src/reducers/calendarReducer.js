import { CREATE_CALENDAR } from "../actions/constants";

const calendarReducer = (state={}, { type, payload }) => {
  switch(type) {
    case CREATE_CALENDAR:
      const { calendarId, ownerId } = payload;
      return {...state, calendarId, ownerId }
    default:
      return state
  }
}

export default calendarReducer;