import { all } from 'redux-saga/effects';

import userSaga from './userSaga';
import calendarSaga from './calendarSaga';
import timeSaga from './timeSaga';

function* rootSaga() {
  yield all([ 
    userSaga(),
    calendarSaga(),
    timeSaga()
  ]);
}

export default rootSaga;