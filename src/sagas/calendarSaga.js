import { call, put, all, takeEvery, takeLatest, select } from 'redux-saga/effects';

import { CalendarService, UserService } from '../services';
import { UserSelector, CalendarSelector } from '../selectors';
import { createUserSuccess } from '../actions/userActionCreators';
import { 
  createCalendarSuccess, 
  fetchCalendarSuccess,
  addUserToCalendarPending,
  addUserToCalendarSuccess
} from '../actions/calendarActionCreators';
import { 
  CALENDAR_CREATED_PENDING, 
  CALENDAR_FETCHED_PENDING,
  CALENDAR_ADDED_USER_PENDING
} from '../actions/constants';

/**
 * Workers
 */
function* createCalendar() {
  try {
    const currentUserObj = yield select(UserSelector.getCurrentUser);
    let creatorId = currentUserObj.userId;
    if (typeof creatorId === "undefined") {
      const newUserObj = { name: "Person 1" };
      const userResponse = yield call(UserService.createUser, { user: newUserObj });
      const { user } = yield userResponse.data;
      creatorId = yield user.id;
      yield put(createUserSuccess(user));
    }
    const calResponse = yield call(CalendarService.createCalendar, { user_id: creatorId });
    const { calendar } = yield calResponse.data;
    yield put(createCalendarSuccess(calendar));
    yield put(addUserToCalendarPending());
  } catch (error) {
    console.error("Error in creating new calendar: ", error);
  }
}

function* addUserToCalendar() {
  try {
    const calendarId = yield select(CalendarSelector.getCalendarId);
    const userId = yield select(UserSelector.getCurrentUserId);
    if (typeof calendarId !== "undefined" && typeof userId !== "undefined") {
      const calResponse = yield call(CalendarService.addUserToCalendar, { calendar_id: calendarId, user_id: userId });
      const { calendar } = yield calResponse.data;
      yield put(addUserToCalendarSuccess(calendar));
    }
  } catch (error) {
    console.error("Error in adding creator to calendar: ", error);
  }
}

function* getCalendar(action) {
  try {
    const calendarId = action.payload;
    const calResponse = yield call(CalendarService.getCalendar, { calendarId: calendarId });
    const { calendar } = yield calResponse.data;
    yield put(fetchCalendarSuccess(calendar));
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

function* watchCalendarAddedUserPending() {
  yield takeLatest(CALENDAR_ADDED_USER_PENDING, addUserToCalendar);
}

function* watchCalendarFetchedPending() {
  yield takeEvery(CALENDAR_FETCHED_PENDING, getCalendar);
}

function* calendarSaga() {
  yield all([
    call(watchCalendarCreatedPending),
    call(watchCalendarAddedUserPending),
    call(watchCalendarFetchedPending),
  ]);
}

export default calendarSaga;