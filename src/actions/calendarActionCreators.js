import { createAction } from '@reduxjs/toolkit';

import { 
  CALENDAR_CREATED_PENDING,
  CALENDAR_CREATED_SUCCESS,
  CALENDAR_CREATED_ERROR,

  CALENDAR_FETCHED_PENDING, 
  CALENDAR_FETCHED_SUCCESS,

  CALENDAR_ADDED_USER_PENDING,
  CALENDAR_ADDED_USER_SUCCESS,

  CALENDAR_IMPORTED_SUCCESS
} from './constants';

export const createCalendarPending = createAction(CALENDAR_CREATED_PENDING);
export const createCalendarSuccess = createAction(CALENDAR_CREATED_SUCCESS);
export const createCalendarError = createAction(CALENDAR_CREATED_ERROR);

export const fetchCalendarPending = createAction(CALENDAR_FETCHED_PENDING);
export const fetchCalendarSuccess = createAction(CALENDAR_FETCHED_SUCCESS);

export const addUserToCalendarPending = createAction(CALENDAR_ADDED_USER_PENDING);
export const addUserToCalendarSuccess = createAction(CALENDAR_ADDED_USER_SUCCESS);

export const importCalendarSuccess = createAction(CALENDAR_IMPORTED_SUCCESS);