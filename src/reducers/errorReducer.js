import { ERROR_ADDED, ERROR_REMOVED } from '../actions/constants';

const initialErrorObj = {
  isError: false,
  errorMessage: ""
}

const errorReducer = (state=initialErrorObj, { type, payload }) => {
  switch(type) {
    case ERROR_ADDED: {
      const errorMessage = payload;
      const newState = { isError: true, errorMessage };
      return {...newState};
    }
    case ERROR_REMOVED: {
      return initialErrorObj;
    }
    default:
      return state;
  }
}

export default errorReducer;