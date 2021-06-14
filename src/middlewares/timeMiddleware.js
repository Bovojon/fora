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
  let intervalTimes = [];
  let i = 0;
  let j = 0;
  while (i < timesA.length && j < timesB.length) {
    const start = moment.max(moment(timesA[i].start), moment(timesB[j].start));
    const end = moment.min(moment(timesA[i].end), moment(timesB[j].end));
    if (start <= end) {
      const intervalTime = {
        id: "C_"+timesA[i].id+"_"+timesB[j].id,
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

const findIntervals = (timesArray) => {
  let commonTimes = timesArray[0];
  for (let i=1; i<timesArray.length; i++) {
    commonTimes = intervalIntersection(commonTimes, timesArray[i]);
  }
  return commonTimes;
}

const timeSorter = (a, b) => {
  return moment(a.start).diff(b.start)
}

const filterTimes = (userIds, groupedTimes) => {
  const checkedUsers = Object.keys(groupedTimes)
    .filter(userId => userIds.includes(parseInt(userId)))
    .reduce((obj, userId) => {
      const timesArrayCopy = [...groupedTimes[userId]];
      obj[userId] = timesArrayCopy.sort(timeSorter);
      return obj;
    }, {});

  return new Promise((resolve, reject) => {
    try {
      resolve(findIntervals(Object.values(checkedUsers)));
    } catch (err) {
      reject(`Error in filtering times by user: ${err}`);
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

export const timeFilterMiddleware = ({ getState, dispatch }) => next => async action => {
  if (action.type === TIMES_FILTER_BY_USER_PENDING) {
    const filteredTimes = await filterTimes(action.payload, getState().groupedTimes);
    action.payload = filteredTimes;
  }
  return next(action);
}