import { createAction } from '@reduxjs/toolkit';

import {
  TIME_ADDED_PENDING,
  TIME_ADDED_SUCCESS,

  TIME_REMOVED_PENDING,
  TIME_REMOVED_SUCCESS,

  TIMES_FETCHED_PENDING,
  TIMES_FETCHED_SUCCESS,

  TIMES_FILTER_BY_USER_PENDING
} from './constants';

export const addTimePending = createAction(TIME_ADDED_PENDING);
export const addTimeSuccess = createAction(TIME_ADDED_SUCCESS);

export const removeTimePending = createAction(TIME_REMOVED_PENDING);
export const removeTimeSuccess = createAction(TIME_REMOVED_SUCCESS);

export const fetchTimesPending = createAction(TIMES_FETCHED_PENDING);
export const fetchTimesSuccess = createAction(TIMES_FETCHED_SUCCESS);

export const filterTimesPending = createAction(TIMES_FILTER_BY_USER_PENDING);