import { all } from 'redux-saga/effects';

import userSaga from './userSaga';
import calendarSaga from './calendarSaga';

function* rootSaga() {
  yield all([ 
    userSaga(),
    calendarSaga()
  ]);
}

export default rootSaga;