import { TIMES_FILTER_BY_USER_PENDING } from '../actions/constants';

const filteredTimesReducer = (state=[], { type, payload }) => {
  switch(type) {
    case TIMES_FILTER_BY_USER_PENDING: {
      const filteredTimes = payload;
      return [...filteredTimes]
    }
    default:
      return state;
  }
}

export default filteredTimesReducer;