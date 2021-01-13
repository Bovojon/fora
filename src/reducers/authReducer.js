import { ACCESS_TOKEN_FETCHED_SUCCESS } from '../actions/constants';

const authReducer = (state={}, { type, payload }) => {
  switch(type) {
    case ACCESS_TOKEN_FETCHED_SUCCESS: {
      const access_token = payload;
      return {...state, access_token}
    }
    default:
      return state;
  }
}

export default authReducer;