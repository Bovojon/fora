import { 
  CALENDAR_FETCHED_PENDING,
  CALENDAR_CREATED_PENDING,
  CALENDAR_CREATED_SUCCESS, 
  CALENDAR_ADDED_USER_SUCCESS,
  CALENDAR_FETCHED_SUCCESS
} from "../actions/constants";

const initialCalendarObj = {
  status: { isLoading: false }
}

const calendarReducer = (state=initialCalendarObj, { type, payload }) => {
  switch(type) {
    case CALENDAR_CREATED_PENDING: {
      const status = { isLoading: true }
      return {status}
    }
    case CALENDAR_FETCHED_PENDING: {
      const status = { isLoading: true }
      return {...state, status}
    }
    case CALENDAR_CREATED_SUCCESS:
    case CALENDAR_FETCHED_SUCCESS: {
      const calendarObj = payload;
      calendarObj.status = { isLoading: false };
      return {...state, ...calendarObj}
    }
    case CALENDAR_ADDED_USER_SUCCESS: {
      const calendarObj = payload;
      return {...state, ...calendarObj}
    }
    default:
      return state
  }
}

export default calendarReducer;