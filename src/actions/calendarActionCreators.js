import { createAction } from '@reduxjs/toolkit';

import { 
  CALENDAR_CREATED_PENDING,
  CALENDAR_CREATED_SUCCESS,
  CALENDAR_CREATED_ERROR,

  CALENDAR_FETCHED_PENDING, 
  CALENDAR_FETCHED_SUCCESS
} from './constants';

export const createCalendarCreator = createAction(CALENDAR_CREATED_PENDING);
export const createCalendarSuccessCreator = createAction(CALENDAR_CREATED_SUCCESS);
export const createCalendarErrorCreator = createAction(CALENDAR_CREATED_ERROR);

export const getCalendarCreator = createAction(CALENDAR_FETCHED_PENDING);
export const putCalendarCreator = createAction(CALENDAR_FETCHED_SUCCESS);