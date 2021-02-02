import { call, takeLatest, all, put, select } from 'redux-saga/effects';

import { UserService } from '../services';
import { CalendarSelector } from '../selectors';
import { USER_CREATED_PENDING, USER_UPDATED_PENDING } from '../actions/constants';
import { createUserSuccess, updateUserSuccess } from '../actions/userActionCreators';
import { addUserToCalendarPending } from '../actions/calendarActionCreators';
import { addError } from '../actions/errorActionCreators';

function* createUser(action) {
  try {
    const userObj = action.payload;
    const participants = yield select(CalendarSelector.getParticipants);
    let totalParticipants;
    if (typeof participants === "undefined") {
      totalParticipants = 0
    } else {
      totalParticipants = participants.length
    }
    if (typeof userObj?.name === "undefined") userObj.name = `Person ${totalParticipants + 1}`;
    const userResponse = yield call(UserService.createUser, { user: userObj, participantNumber: totalParticipants });
    const { user } = yield userResponse.data;
    yield put(createUserSuccess(user));
    yield put(addUserToCalendarPending());
  } catch(error) {
    yield put(addError("Sorry, something went wrong. If you keep seeing this, please contact us at letsfora@gmail.com."));
    console.error("Error creating new user: ", error);
  }
}

function* updateUser(action) {
  try {
    const userObj = action.payload;
    const userResponse = yield call(UserService.updateUser, { user: userObj });
    const { user } = yield userResponse.data;
    yield put(updateUserSuccess(user));
  } catch(error) {
    yield put(addError("Sorry, something went wrong. If you keep seeing this, please contact us at letsfora@gmail.com."));
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