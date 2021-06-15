import {
  USER_CREATED_PENDING,
  USER_CREATED_SUCCESS,
  USER_SET_CURRENT_PENDING,
  USER_UPDATED_PENDING,
  USER_UPDATED_SUCCESS
} from "../actions/constants";

const initialUserObj = {
  status: { isLoading: false }
}

const userReducer = (state=initialUserObj, { type, payload }) => {
  switch(type) {
    case USER_CREATED_PENDING: {
      const status = { isLoading: true }
      return {...state, status}
    }
    case USER_CREATED_SUCCESS: {
      const userObj = payload;
      userObj.status = { isLoading: false };
      return {...state, ...userObj}
    }
    case USER_SET_CURRENT_PENDING: {
      const userObj = payload;
      userObj.status = { isLoading: false };
      return {...userObj}
    }
    case USER_UPDATED_PENDING: {
      const status = { isLoading: true }
      return {...state, status}
    }
    case USER_UPDATED_SUCCESS: {
      const userObj = payload;
      userObj.status = { isLoading: false };
      return {...state, ...userObj}
    }
    default:
      return state
  }
}

export default userReducer;