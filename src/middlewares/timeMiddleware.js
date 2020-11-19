import moment from 'moment';

import { TIME_ADDED_PENDING, TIME_ADDED_DUPLICATE, TIMES_FETCHED_SUCCESS } from "../actions/constants";

const checkDuplicateTimes = (timeObj, newTimeObj) => {
  const sameStartTimes = moment(timeObj.start).format('X') === moment(newTimeObj.start).format('X');
  if (sameStartTimes) {
    const sameEndTimes = moment(timeObj.end).format('X') === moment(newTimeObj.end).format('X');
    if (sameEndTimes) {
      const sameUser = timeObj.user_id === newTimeObj.user_id;
      return sameUser;
    }
  }
  return false;
}

const changeTimeFormat = (time) => {
  time.start = moment(time.start).toDate();
  time.end = moment(time.end).toDate();
}

export const timeCreationMiddleware = ({ getState, dispatch }) => next => action => {
  if (action.type === TIME_ADDED_PENDING) {
    const newTimeObj = action.payload;
    const duplicated = getState().times.some(timeObj => (checkDuplicateTimes(timeObj, newTimeObj)));
    if (duplicated === true) {
      action.type = TIME_ADDED_DUPLICATE;
    }
  }
  return next(action);
}

export const timeFetchMiddleware = ({ getState, dispatch }) => next => action => {
  if (action.type === TIMES_FETCHED_SUCCESS) {
    const times = action.payload;
    times.forEach(time => changeTimeFormat(time));
    action.payload = times;
  }
  return next(action);
}