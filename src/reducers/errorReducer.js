import { ERROR_ADDED } from '../actions/constants';

const initialErrorObj = {
  isError: false
}

const errorReducer = (state=initialErrorObj, { type, payload }) => {
  switch(type) {
    case ERROR_ADDED: {
      const errorMessage = payload;
      const newState = { isError: true, errorMessage };
      return {...newState};
    }
    default:
      return state;
  }
}

export default errorReducer;