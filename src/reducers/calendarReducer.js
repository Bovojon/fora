import { CALENDAR_CREATED_SUCCESS } from "../actions/constants";

const calendarReducer = (state={}, { type, payload }) => {
  switch(type) {
    case CALENDAR_CREATED_SUCCESS:
      const { calendarId } = payload;
      return {...state, calendarId}
    default:
      return state
  }
}

export default calendarReducer;