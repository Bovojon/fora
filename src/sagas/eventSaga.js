import { call, takeLatest, all, select, put } from 'redux-saga/effects';

import { EventService } from '../services';
import { EVENT_SUBMITTED_PENDING } from '../actions/constants';
import { history } from '../store/index.js';
import { CalendarSelector } from '../selectors';
import { removeAuthCodeSuccess } from '../actions/authActionCreators';
import { addError } from '../actions/errorActionCreators';
import { addSuccess } from '../actions/successActionCreators';

function navigateTo(route) {
  history.push(route);
 }

function* submitEvent(action) {
  try {
    const { event, code } = action.payload;
    const result = yield call(EventService.submitEvent, { event, code });
    const status = yield result.status;
    if (status === 200) {
      const calendarUniqueId = yield select(CalendarSelector.getCalendarUniqueId);
      yield put(addSuccess("Successfully scheduled event!"));
      yield call(navigateTo, `/${calendarUniqueId}`);
      yield put(removeAuthCodeSuccess());
    }
  } catch(error) {
    yield put(addError("Sorry, something went wrong and we couldn't schedule your event."));
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