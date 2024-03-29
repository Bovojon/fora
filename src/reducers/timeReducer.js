import {
  TIME_ADDED_SUCCESS,
  TIME_REMOVED_SUCCESS,
  TIMES_FETCHED_SUCCESS
} from '../actions/constants';

const timeReducer = (state=[], { type, payload }) => {
  switch(type) {
    case TIME_ADDED_SUCCESS: {
      const timeObj = payload;
      return [...state, timeObj];
    }
    case TIME_REMOVED_SUCCESS: {
      const timeId = payload;
      return state.filter(time => time.id !== timeId);
    }
    case TIMES_FETCHED_SUCCESS: {
      const times = payload;
      return [...times]
    }
    default:
      return state;
  }
}

export default timeReducer;