import { call, takeLatest, all, put, select } from 'redux-saga/effects';

import { UserService } from '../services';
import { CalendarSelector } from '../selectors';
import { USER_CREATED_PENDING } from '../actions/constants';
import { createUserSuccess } from '../actions/userActionCreators';

function* createUser(action) {
  try {
    const userObj = action.payload;
    if (userObj.name === "undefined") {
      const totalParticipants = yield select(CalendarSelector.getTotalParticipants);
      userObj.name = `Person ${totalParticipants}`;
    }
    const userResponse = yield call(UserService.createUser, { user: userObj });
    const { user } = yield userResponse.data;
    yield put(createUserSuccess(user));
  } catch(error) {
    console.error("Error creating new user.");
  }
}

function* watchUserCreatedPending() {
  yield takeLatest(USER_CREATED_PENDING, createUser)
}

function* userSaga() {
  yield all([ call(watchUserCreatedPending) ])
}

export default userSaga;