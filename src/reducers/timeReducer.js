import moment from 'moment';
import { ADD_TIME, DELETE_TIME} from '../actions/constants';

let nextId = 0

const timeSorter = (a, b) => {
  return moment(a.start).diff(b.start)
}

const timeReducer = (state=[], { type, payload }) => {
  switch(type) {
    case ADD_TIME:
      /**
       * Put below Middleware (perform some action from the moment the action is dispatched to the moment it reaches reducer):
       *    Do not allow if the same user adds the same time.
       *    Allow if 2 different users add the same time.
       */
      const { start, end } = payload;
      const alreadyExists = state.filter(time => 
        (
          moment(time.start).format('X') === moment(start).format('X') && 
          moment(time.end).format('X') === moment(end).format('X')
        )
      );
      if (alreadyExists.length === 0) {
        const newTime = {
          id: ++nextId,
          ...payload
        }
        return [...state, newTime].sort(timeSorter);
      }
      return state
    case DELETE_TIME:
      return state.filter(time => time.id !== payload)
    default:
      return state;
  }
}

export default timeReducer;