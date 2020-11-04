import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects';
import { CALENDAR_CREATED_PENDING, CALENDAR_FETCHED_PENDING } from '../actions/constants';

import { CalendarService } from '../services';
import {
  createCalendarSuccessCreator,
  putCalendarCreator
} from '../actions/calendarActionCreators';

/**
 * Workers
 */
function* createCalendar() {
  /**
   * Optionally use selector to get owner_id
   */
  try {
    const response = yield call(CalendarService.createCalendar);
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
  yield takeLatest(CALENDAR_CREATED_PENDING, createCalendar);
}

function* listenForGetCalendar() {
  yield takeEvery(CALENDAR_FETCHED_PENDING, getCalendar);
}

function* calendarSaga() {
  yield all([
    call(listenForCreateCalendar),
    call(listenForGetCalendar)
  ]);
}

export default calendarSaga;