import { call, takeLatest, all } from 'redux-saga/effects';

// import { UserService } from '../services';
import { POST_USER, POST_USER_SUCCESS } from '../actions/constants';

function* postUser({ payload }) {
  try {
    const response = yield call(UserService.postUser, payload);
    const result = yield response.data;
    yield put({ type: POST_USER_SUCCESS, payload: result });
  } catch(error) {
    console.error("Error posting new user");
  }
}

function* listenForPostUser() {
  yield takeLatest(POST_USER, postUser)
}

function* userSaga() {
  yield all([ call(listenForPostUser) ])
}

export default userSaga;