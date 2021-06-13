import moment from 'moment';

import {
  TIME_ADDED_PENDING,
  TIME_ADDED_DUPLICATE,
  TIMES_FETCHED_SUCCESS,
  TIMES_GROUP_BY_USER_PENDING,
  TIMES_FILTER_BY_USER_PENDING
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

const intervalIntersection = (timesA, timesB) => {
  if (timesA.length === 0) return timesB;
  let intervalTimes = [];
  let i = 0;
  let j = 0;
  while (i < timesA.length && j < timesB.length) {
    const start = moment.max(moment(timesA[i].start), moment(timesB[j].start));
    const end = moment.min(moment(timesA[i].end), moment(timesB[j].end));
    if (start <= end) {
      const intervalTime = {
        start: new Date(start),
        end: new Date(end)
      }
      intervalTimes.push(intervalTime);
    }
    if (timesA[i].end < timesB[j].end) {
      i += 1
    } else {
      j += 1
    }
  }
  return intervalTimes;
}

const filterTimes = (timesByUserObj) => {

  const filterTimesArray = (timesArray) => timesArray.reduce((commonTimes, timeArray) => {
    commonTimes = intervalIntersection(commonTimes, timeArray);
    return commonTimes;
  }, []);

  const commonTimes = filterTimesArray(Object.values(timesByUserObj));
  return commonTimes;
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

export const timeFilterMiddleware = ({ getState, dispatch }) => next => action => {
  if (action.type === TIMES_FILTER_BY_USER_PENDING) {
    const userIds = action.payload;
    const groupedTimes = getState().groupedTimes;
    const checkedUsers = Object.keys(groupedTimes)
      .filter(userId => userIds.includes(parseInt(userId)))
      .reduce((obj, userId) => {
        obj[userId] = groupedTimes[userId];
        return obj;
      }, {});
    const filteredTimes = filterTimes(checkedUsers);
    action.payload = filteredTimes;
  }
  return next(action);
}