import { call, put, all, takeEvery, takeLatest, select } from 'redux-saga/effects';

import { CalendarService, UserService } from '../services';
import { UserSelector } from '../selectors';
import { createUserSuccess } from '../actions/userActionCreators';
import { 
  createCalendarSuccess, 
  fetchCalendarSuccess,
  addUserToCalendarSuccess
} from '../actions/calendarActionCreators';
import { 
  CALENDAR_CREATED_PENDING, 
  CALENDAR_FETCHED_PENDING,
  CALENDAR_CREATED_SUCCESS,
  CALENDAR_ADDED_USER_PENDING
} from '../actions/constants';

/**
 * Workers
 */
function* createCalendar() {
  try {
    const currentUserObject = yield select(UserSelector.getCurrentUser);
    let creatorId = currentUserObject?.userId;
    if (typeof creatorId === "undefined") {
      const userResponse = yield call(UserService.createUser, {});
      const { user } = yield userResponse.data;
      creatorId = yield user.id;
      yield put(createUserSuccess(user));
    }
    const calResponse = yield call(CalendarService.createCalendar, { user_id: creatorId });
    const { calendar } = yield calResponse.data;
    yield put(createCalendarSuccess(calendar));
  } catch (error) {
    console.error("Error in creating new calendar: ", error);
  }
}

function* addUserToCalendar(action) {
  try {
    const calendarId = action.payload.id;
    const creatorId = action.payload.creator_id;
    const calResponse = yield call(CalendarService.addUserToCalendar, { calendar_id: calendarId, user_id: creatorId });
    const { calendar } = yield calResponse.data;
    yield put(addUserToCalendarSuccess(calendar));
  } catch (error) {
    console.error("Error in adding creator to calendar: ", error);
  }
}

function* getCalendar(action) {
  try {
    const response = yield call(CalendarService.getCalendar, action.payload);
    const calendarObject = yield response.data;
    yield put(fetchCalendarSuccess({ calendarObject }))
  } catch(error) {
    console.error("Error in getting Calendar: ", error);
  }
}

/**
 * Watchers
 */
function* watchCalendarCreatedPending() {
  yield takeLatest(CALENDAR_CREATED_PENDING, createCalendar);
}

function* watchCalendarCreatedSuccess() {
  yield takeLatest(CALENDAR_CREATED_SUCCESS, addUserToCalendar);
}

function* watchCalendarAddedUserPending() {
  yield takeEvery(CALENDAR_ADDED_USER_PENDING, addUserToCalendar);
}

function* watchCalendarFetchedPending() {
  yield takeEvery(CALENDAR_FETCHED_PENDING, getCalendar);
}

function* calendarSaga() {
  yield all([
    call(watchCalendarCreatedPending),
    call(watchCalendarCreatedSuccess),
    call(watchCalendarAddedUserPending),
    call(watchCalendarFetchedPending),
  ]);
}

export default calendarSaga;