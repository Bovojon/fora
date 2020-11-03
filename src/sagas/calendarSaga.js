import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects';

import { CalendarService } from '../services';
import { 
  createCalendarCreator,
  createCalendarSuccessCreator,
  getCalendarCreator, 
  putCalendarCreator
} from '../actions/calendarActionCreators';

/**
 * Workers
 */
function* createCalendar(action) {
  /**
   * Optionally use selector to get owner_id
   */
  try {
    const response = yield call(CalendarService.createCalendar, action.payload);
    const calendarObject = yield response.data;
    yield put(createCalendarSuccessCreator(calendarObject.calendarId));
  } catch (error) {
    console.error("Error in creating new calendar: ", error);
  }
}

function* getCalendar(action) {
  try {
    const response = yield call(CalendarService.getCalendar, action.payload);
    const calendarObject = yield response.data;
    yield put(putCalendarCreator(calendarObject))
  } catch(error) {
    console.error("Error in getting Calendar: ", error);
  }
}

/**
 * Watchers
 */
function* listenForCreateCalendar() {
  yield takeLatest(createCalendarCreator, createCalendar);
}

function* listenForGetCalendar() {
  yield takeEvery(getCalendarCreator, getCalendar);
}

function* calendarSaga() {
  yield all([
    call(listenForCreateCalendar),
    call(listenForGetCalendar)
  ]);
}

export default calendarSaga;