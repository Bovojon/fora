import { TIMES_GROUP_BY_USER_PENDING } from '../actions/constants';

const groupedTimesReducer = (state={}, { type, payload }) => {
  switch(type) {
    case TIMES_GROUP_BY_USER_PENDING: {
      const userTimesObj = payload;
      return {...state, ...userTimesObj}
    }
    default:
      return state;
  }
}

export default groupedTimesReducer;