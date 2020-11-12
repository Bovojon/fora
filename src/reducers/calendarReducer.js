import { 
  CALENDAR_CREATED_SUCCESS, 
  CALENDAR_ADDED_USER_SUCCESS,
  CALENDAR_FETCHED_SUCCESS
} from "../actions/constants";

const calendarReducer = (state={}, { type, payload }) => {
  switch(type) {
    case CALENDAR_CREATED_SUCCESS:
    case CALENDAR_FETCHED_SUCCESS:
    case CALENDAR_ADDED_USER_SUCCESS:
      const calendarObj = payload;
      return {...state, ...calendarObj}
    default:
      return state
  }
}

export default calendarReducer;