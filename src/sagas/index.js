import { all } from 'redux-saga/effects';

import userSaga from './userSaga';
import calendarSaga from './calendarSaga';
import timeSaga from './timeSaga';
import eventSaga from './eventSaga';

function* rootSaga() {
  yield all([ 
    userSaga(),
    calendarSaga(),
    timeSaga(),
    eventSaga()
  ]);
}

export default rootSaga;