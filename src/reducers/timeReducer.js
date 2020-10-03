import { ADD_TIME, DELETE_TIME} from '../actions/constants';

let nextId = 0

const timeReducer = (state=[], { type, payload }) => {
  switch(type) {
    case ADD_TIME:
      const newTime = {
        id: ++nextId,
        ...payload
      }
      return [...state, newTime];
    case DELETE_TIME:
      return state.filter(time => time.id !== payload)
    default:
      return state;
  }
}

export default timeReducer;