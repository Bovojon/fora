import { USER_CREATED_SUCCESS, USER_SET_CURRENT_PENDING } from "../actions/constants";

const userReducer = (state={}, { type, payload }) => {
  switch(type) {
    case USER_CREATED_SUCCESS: {
      const userObj = payload;
      return {...state, ...userObj}
    }
    case USER_SET_CURRENT_PENDING: {
      const userObj = payload;
      return {...userObj}
    }
    default:
      return state
  }
}

export default userReducer;