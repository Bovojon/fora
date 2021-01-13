import { all } from 'redux-saga/effects';

import userSaga from './userSaga';
import calendarSaga from './calendarSaga';
import timeSaga from './timeSaga';
import eventSaga from './eventSaga';
import authSaga from './authSaga';

function* rootSaga() {
  yield all([ 
    userSaga(),
    calendarSaga(),
    timeSaga(),
    eventSaga(),
    authSaga()
  ]);
}

export default rootSaga;