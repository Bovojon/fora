import moment from 'moment';

import { TIME_ADDED_PENDING, TIME_DUPLICATE_ERROR } from "../actions/constants";

const checkDuplicateTimes = (timeObj, newTimeObj) => {
  const sameStartTimes = moment(timeObj.start).format('X') === moment(newTimeObj.start).format('X');
  if (sameStartTimes) {
    const sameEndTimes = moment(timeObj.end).format('X') === moment(newTimeObj.end).format('X');
    if (sameEndTimes) { return timeObj.user_id === newTimeObj.user_id }
  }
  return false;
}


export const timeCreationMiddleware = ({ getState, dispatch }) => next => action => {
  /**
   * Put the below Middleware (perform some action from the moment the action is dispatched to the moment it reaches reducer):
   *    Do not allow if the same user adds the same time.
   *    Allow if 2 different users add the same time.
   */
  if (action.type === TIME_ADDED_PENDING) {
    const newTimeObj = action.payload;
    const duplicated = getState().times.some(timeObj => (checkDuplicateTimes(timeObj, newTimeObj)));
    // const timesThatAlreadyExist = getState().times.filter(timeObj => (checkTimes(timeObj, newTimeObj)));
    if (duplicated === true) {
      action.type = TIME_DUPLICATE_ERROR;
      console.log(action);
    }
  }
  return next(action);
}