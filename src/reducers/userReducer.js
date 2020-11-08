import { USER_CREATED_SUCCESS } from "../actions/constants";

const userReducer = (state={}, { type, payload }) => {
  switch(type) {
    case USER_CREATED_SUCCESS:
      const userObj = payload;
      return {...state, ...userObj}
    default:
      return state
  }
}

export default userReducer;