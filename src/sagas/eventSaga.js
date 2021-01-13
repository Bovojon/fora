import { call, takeLatest, all, select, put } from 'redux-saga/effects';

import { EventService } from '../services';
import { EVENT_SUBMITTED_PENDING, EVENTS_IMPORTED_PENDING } from '../actions/constants';
import { history } from '../store/index.js';
import { CalendarSelector, AuthSelector, UserSelector } from '../selectors';
import { addError } from '../actions/errorActionCreators';
import { addSuccess } from '../actions/successActionCreators';
import { importEventsSuccess } from '../actions/eventActionCreators';

function navigateTo(route) {
  history.push(route);
 }

function* submitEvent(action) {
  try {
    const { event } = action.payload;
    const result = yield call(EventService.submitEvent, { event });
    const status = yield result.status;
    if (status === 200) {
      const calendarUniqueId = yield select(CalendarSelector.getCalendarUniqueId);
      const successMessage = "Successfully scheduled event!"
      yield put(addSuccess(successMessage));
      yield call(navigateTo, `/${calendarUniqueId}`);
    }
  } catch(error) {
    const errorMessage = "Sorry, something went wrong and we couldn't schedule your event."
    yield put(addError(errorMessage));
    console.error("Error in submitting event: ", error);
  }
}

function* importEvents(action) {
  try {
    const { timeMin, timeMax, timeZone } = action.payload;
    if (no_access_token) {
      const calendar = yield select(CalendarSelector.getCalendar);
      const currentUser = yield select(UserSelector.getCurrentUser);
      localStorage.setItem('fora', JSON.stringify({
        calendar,
        currentUser,
        redirectUrl: `/${calendar.unique_id}`,
        calDetails: { timeMin, timeMax, timeZone }
      }));
      const response = yield call(EventService.getUrl);
      const loginUrl = yield response.data.url;
      window.location.replace(loginUrl);
    } else {
      const a = JSON.parse(localStorage.getItem('fora-token'));
      console.log(a);
      console.log("********************************************")
      // const access_token = tokens.access_token
      // console.log(tokens.access_token)
      // const response = yield call(EventService.importEvents, { access_token, timeMin, timeMax, timeZone });
      // const events = yield response.data.events;
      // yield put(importEventsSuccess(events));
    }
  } catch(error) {
    const errorMessage = "Sorry, something went wrong and we couldn't import your events."
    yield put(addError(errorMessage));
    console.error("Error in importing events: ", error);
  }
}

function* watchEventSubmittedPending() {
  yield takeLatest(EVENT_SUBMITTED_PENDING, submitEvent)
}

function* watchEventsImportedPending() {
  yield takeLatest(EVENTS_IMPORTED_PENDING, importEvents)
}

function* eventSaga() {
  yield all([
    call(watchEventSubmittedPending),
    call(watchEventsImportedPending)
  ])
}

export default eventSaga;