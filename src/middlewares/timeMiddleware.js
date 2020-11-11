import moment from 'moment';

import { TIME_ADDED_PENDING, TIME_DUPLICATE_ERROR } from "../actions/constants";

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


export const timeCreationMiddleware = ({ getState, dispatch }) => next => action => {
  if (action.type === TIME_ADDED_PENDING) {
    const newTimeObj = action.payload;
    const duplicated = getState().times.some(timeObj => (checkDuplicateTimes(timeObj, newTimeObj)));
    if (duplicated === true) {
      action.type = TIME_DUPLICATE_ERROR;
    }
  }
  return next(action);
}