import moment from 'moment';
import { TIME_ADDED_PENDING, TIME_REMOVED_PENDING} from '../actions/constants';

let nextId = 0

const timeSorter = (a, b) => {
  return moment(a.start).diff(b.start)
}

const timeReducer = (state=[], { type, payload }) => {
  switch(type) {
    case TIME_ADDED_PENDING:
      /**
       * Put the below Middleware (perform some action from the moment the action is dispatched to the moment it reaches reducer):
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
    case TIME_REMOVED_PENDING:
      return state.filter(time => time.id !== payload)
    default:
      return state;
  }
}

export default timeReducer;