import moment from 'moment';
import { ADD_TIME, DELETE_TIME} from '../actions/constants';

let nextId = 0

const timeSorter = (a, b) => {
  return moment(a.start).diff(b.start)
}

const timeReducer = (state=[], { type, payload }) => {
  switch(type) {
    case ADD_TIME:
      const newTime = {
        id: ++nextId,
        ...payload
      }
      return [...state, newTime].sort(timeSorter);
    case DELETE_TIME:
      return state.filter(time => time.id !== payload)
    default:
      return state;
  }
}

export default timeReducer;