import { call, takeLatest, all } from 'redux-saga/effects';

import { EventService } from '../services';
import { EVENT_SUBMITTED_PENDING } from '../actions/constants';

function* submitEvent(action) {
  try {
    const { event, code } = action.payload;
    const result = yield call(EventService.submitEvent, { event, code });
    const data = yield result.data;
    console.log(data);
  } catch(error) {
    console.error("Error in submitting event: ", error);
  }
}

function* watchEventSubmittedPending() {
  yield takeLatest(EVENT_SUBMITTED_PENDING, submitEvent)
}

function* eventSaga() {
  yield all([ 
    call(watchEventSubmittedPending)
  ])
}

export default eventSaga;