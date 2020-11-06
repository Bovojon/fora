import { call, put, all, takeEvery, takeLatest, select } from 'redux-saga/effects';

import { CalendarService, UserService } from '../services';
import { UserSelector } from '../selectors';
import { 
  createCalendarSuccess, 
  fetchCalendarSuccess,
  createUserPending
} from '../actions/calendarActionCreators';
import { 
  CALENDAR_CREATED_PENDING, 
  CALENDAR_FETCHED_PENDING,
  CALENDAR_CREATED_SUCCESS,
  USER_CREATED_SUCCESS
} from '../actions/constants';

/**
 * Workers
 */
function* createCalendar() {
  try {
    const response = yield call(CalendarService.createCalendar);
    const { calendar } = yield response.data;
    yield put(createCalendarSuccess(calendar));
  } catch (error) {
    console.error("Error in creating new calendar: ", error);
  }
}

function* setCalendarOwner(action) {
  try {
    const currentUserObject = yield select(UserSelector.getCurrentUser);
    let ownerId = currentUserObject?.userId;
    if (typeof ownerId === "undefined") {
      const response = yield call(UserService.createUser, {});
      const { user } = yield response.data;
      ownerId = user.id;
      yield put({ type: USER_CREATED_SUCCESS, payload: {user: user} });
    }
    yield all([
      call(CalendarService.setCalendarOwner, { calendar_id: action.payload.id, user_id: ownerId }),
      call(CalendarService.addUserToCalendar, { calendar_id: action.payload.id, user_id: ownerId })
    ]);
  } catch (error) {
    console.error("Error in adding user to calendar: ", error);
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
function* watchCalendarCreated() {
  yield takeLatest(CALENDAR_CREATED_PENDING, createCalendar);
}

function* watchCalendarCreatedSuccess() {
  yield takeLatest(CALENDAR_CREATED_SUCCESS, setCalendarOwner);
}

function* watchCalendarFetched() {
  yield takeEvery(CALENDAR_FETCHED_PENDING, getCalendar);
}

function* calendarSaga() {
  yield all([
    call(watchCalendarCreated),
    call(watchCalendarCreatedSuccess),
    call(watchCalendarFetched)
  ]);
}

export default calendarSaga;