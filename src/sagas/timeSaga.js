import { call, takeLatest, all, put } from 'redux-saga/effects';

import { TimeService } from '../services';
import { TIME_ADDED_PENDING, TIME_REMOVED_PENDING} from '../actions/constants';
import { addTimeSuccess, removeTimeSuccess } from '../actions/timeActionCreators';
import { addError } from '../actions/errorActionCreators';

function* createTime(action) {
  try {
    const timeObj = action.payload;
    const timeResponse = yield call(TimeService.createTime, { time: timeObj });
    const { time } = yield timeResponse.data;
    time.start = timeObj.start;
    time.end = timeObj.end;
    yield put(addTimeSuccess(time));
  } catch(error) {
    yield put(addError("Sorry, something went wrong. If you keep seeing this, please contact us at letsfora@gmail.com."));
    console.error("Error in adding new time: ", error);
  }
}

function* removeTime(action) {
  try {
    const timeId = action.payload;
    const timeResponse = yield call(TimeService.removeTime, { time_id: timeId });
    const { time_id } = yield timeResponse.data;
    yield put(removeTimeSuccess(time_id));
  } catch(error) {
    yield put(addError("Sorry, something went wrong. If you keep seeing this, please contact us at letsfora@gmail.com."));
    console.error("Error in removing time: ", error);
  }
}

function* watchTimeAddedPending() {
  yield takeLatest(TIME_ADDED_PENDING, createTime)
}

function* watchTimeRemovedPending() {
  yield takeLatest(TIME_REMOVED_PENDING, removeTime)
}

function* timeSaga() {
  yield all([ 
    call(watchTimeAddedPending),
    call(watchTimeRemovedPending)
  ])
}

export default timeSaga;