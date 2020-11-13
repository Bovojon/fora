import { 
  CALENDAR_FETCHED_PENDING,
  CALENDAR_CREATED_SUCCESS, 
  CALENDAR_ADDED_USER_SUCCESS,
  CALENDAR_FETCHED_SUCCESS
} from "../actions/constants";

const initialState = {
  status: {
    isLoading: false,
    error: null,
  }
}

const calendarReducer = (state=initialState, { type, payload }) => {
  switch(type) {
    case CALENDAR_FETCHED_PENDING: {
      const status = {
        isLoading: true,
        error: null,
      }
      return {...state, status}
    }
    case CALENDAR_FETCHED_SUCCESS: {
      let calendarObj = payload;
      calendarObj.status = {
        isLoading: false,
        error: null,
      }
      return {...state, ...calendarObj}
    }
    case CALENDAR_CREATED_SUCCESS:
    case CALENDAR_ADDED_USER_SUCCESS: {
      const calendarObj = payload;
      return {...state, ...calendarObj}
    }
    default:
      return state
  }
}

export default calendarReducer;