import moment from 'moment';

import {
  TIME_ADDED_PENDING,
  TIME_ADDED_DUPLICATE,
  TIMES_FETCHED_SUCCESS,
  TIMES_GROUP_BY_USER_PENDING
} from "../actions/constants";

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
  time.start = new Date(time.start);
  time.end = new Date(time.end);
}

const groupTimesByUser = (times) => {
  const groupTimes = (times) => times.reduce((obj, time) => {
    const userId = time.user_id;
    if (!obj[userId]) {
      obj[userId] = []
    }
    obj[userId].push(time);
    return obj;
  }, {});

  return new Promise((resolve, reject) => {
    try {
      resolve(groupTimes(times));
    } catch (err) {
      reject(`Error grouping times by user: ${err}`);
    }
    return;
  });
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

export const timeClassifierMiddleware = ({ getState, dispatch }) => next => async action => {
  if (action.type === TIMES_GROUP_BY_USER_PENDING) {
    const timesByUser = await groupTimesByUser(action.payload);
    action.payload = timesByUser;
  }
  return next(action);
}