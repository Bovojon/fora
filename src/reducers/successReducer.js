import { SUCCESS_ADDED, SUCCESS_REMOVED } from '../actions/constants';

const initialSuccessObj = {
  isSuccess: false,
  successMessage: ""
}

const successReducer = (state=initialSuccessObj, { type, payload }) => {
  switch(type) {
    case SUCCESS_ADDED: {
      const successMessage = payload;
      const newState = { isSuccess: true, successMessage };
      return {...newState};
    }
    case SUCCESS_REMOVED: {
      return initialSuccessObj;
    }
    default:
      return state;
  }
}

export default successReducer;