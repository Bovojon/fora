import { createAction } from '@reduxjs/toolkit';

import { 
  CALENDAR_CREATED_PENDING,
  CALENDAR_CREATED_SUCCESS,
  CALENDAR_CREATED_ERROR,

  CALENDAR_FETCHED_PENDING, 
  CALENDAR_FETCHED_SUCCESS
} from './constants';

export const createCalendarPending = createAction(CALENDAR_CREATED_PENDING);
export const createCalendarSuccess = createAction(CALENDAR_CREATED_SUCCESS);
export const createCalendarError = createAction(CALENDAR_CREATED_ERROR);

export const fetchCalendarPending = createAction(CALENDAR_FETCHED_PENDING);
export const fetchCalendarSuccess = createAction(CALENDAR_FETCHED_SUCCESS);