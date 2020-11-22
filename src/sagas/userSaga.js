import { call, takeLatest, all, put, select } from 'redux-saga/effects';

import { UserService } from '../services';
import { CalendarSelector } from '../selectors';
import { USER_CREATED_PENDING, USER_UPDATED_PENDING } from '../actions/constants';
import { createUserSuccess, updateUserSuccess } from '../actions/userActionCreators';
import { addUserToCalendarPending } from '../actions/calendarActionCreators';

function* createUser(action) {
  try {
    const userObj = action.payload;
    if (typeof userObj.name === "undefined") {
      const totalParticipants = yield select(CalendarSelector.getTotalParticipants);
      userObj.name = `Person ${totalParticipants + 1}`;
    }
    const userResponse = yield call(UserService.createUser, { user: userObj });
    const { user } = yield userResponse.data;
    yield put(createUserSuccess(user));
    yield put(addUserToCalendarPending());
  } catch(error) {
    console.error("Error creating new user: ", error);
  }
}

function* updateUser(action) {
  try {
    const userObj = action.payload;
    const userResponse = yield call(UserService.updateUser, { user: userObj });
    const { result } = yield userResponse.data;
    const udpatedUser = result[1][0]
    yield put(updateUserSuccess(udpatedUser));
  } catch(error) {
    console.error("Error updating user: ", error);
  }
}

function* watchUserCreatedPending() {
  yield takeLatest(USER_CREATED_PENDING, createUser)
}

function* watchUserUpdatedPending() {
  yield takeLatest(USER_UPDATED_PENDING, updateUser)
}

function* userSaga() {
  yield all([
    call(watchUserCreatedPending),
    call(watchUserUpdatedPending)
  ])
}

export default userSaga;