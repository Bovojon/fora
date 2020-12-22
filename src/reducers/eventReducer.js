import { EVENT_ADDED_PENDING } from '../actions/constants';

const eventReducer = (state={}, { type, payload }) => {
  switch(type) {
    case EVENT_ADDED_PENDING: {
      const eventObj = payload;
      return {...state, eventObj};
    }
    default:
      return state;
  }
}

export default eventReducer;