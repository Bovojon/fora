import { AUTH_CODE_ADDED_SUCCESS } from '../actions/constants';

const authReducer = (state={}, { type, payload }) => {
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