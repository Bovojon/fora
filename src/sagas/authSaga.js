import { call, takeLatest, all, select, put } from 'redux-saga/effects';

import { ACCESS_TOKEN_FETCHED_PENDING } from '../actions/constants';
import { EventService } from '../services';
import { addError } from '../actions/errorActionCreators';
import { fetchAccessTokenSuccess } from '../actions/authActionCreators';

function* getAccessToken(action) {
  try {
    const code = action.payload;
    const response = yield call(EventService.getAccessToken, { code });
    const tokens = yield response.data.tokens;
    localStorage.setItem('fora-token', JSON.stringify({ tokens }));
    fetchAccessTokenSuccess(tokens.access_token);
  } catch(error) {
    yield put(addError("Sorry, something went wrong and we couldn't import your event."));
    console.error("Error in fetching auth client: ", error);
  }
}

function* watchAccessTokenFetchedPending() {
  yield takeLatest(ACCESS_TOKEN_FETCHED_PENDING, getAccessToken)
}

function* authSaga() {
  yield all([
    call(watchAccessTokenFetchedPending)
  ])
}

export default authSaga;