import { call, takeLatest, all, put } from 'redux-saga/effects';

import { UserService } from '../services';
import { USER_CREATED_PENDING, USER_CREATED_SUCCESS } from '../actions/constants';

function* postUser({ payload }) {
  try {
    const response = yield call(UserService.postUser, payload);
    const result = yield response.data;
    yield put({ type: USER_CREATED_SUCCESS, payload: result });
  } catch(error) {
    console.error("Error posting new user");
  }
}

function* listenForPostUser() {
  yield takeLatest(USER_CREATED_PENDING, postUser)
}

function* userSaga() {
  yield all([ call(listenForPostUser) ])
}

export default userSaga;