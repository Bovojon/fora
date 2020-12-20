import { AUTH_CODE_ADDED_SUCCESS } from '../actions/constants';

const initialAuthObj = {
  code: false
}

const authReducer = (state=initialAuthObj, { type, payload }) => {
  switch(type) {
    case AUTH_CODE_ADDED_SUCCESS: {
      const code = payload;
      return {...state, code};
    }
    default:
      return state;
  }
}

export default authReducer;