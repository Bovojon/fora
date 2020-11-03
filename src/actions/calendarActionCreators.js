import { createAction } from '@reduxjs/toolkit';

import { 
  CALENDAR_CREATED_PENDING,
  CALENDAR_CREATED_SUCCESS,
  CALENDAR_CREATED_ERROR,

  CALENDAR_FETCHED, 
  CALENDAR_FETCHED_SUCCESS,
  CALENDAR_FETCHED_PENDING
} from './constants';

export const createCalendarCreator = createAction(CALENDAR_CREATED_PENDING);
export const createCalendarSuccessCreator = createAction(CALENDAR_CREATED_SUCCESS);
export const createCalendarErrorCreator = createAction(CALENDAR_CREATED_ERROR);

export const getCalendarCreator = createAction(CALENDAR_FETCHED);
export const putCalendarCreator = createAction(CALENDAR_FETCHED_SUCCESS);