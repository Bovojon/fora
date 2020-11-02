import { createAction } from '@reduxjs/toolkit';

import { 
  CREATE_CALENDAR,
  CREATE_CALENDAR_SUCCESS,
  CREATE_CALENDAR_ERROR,
  GET_CALENDAR, 
  GET_CALENDAR_SUCCESS 
} from './constants';

export const createCalendarCreator = createAction(CREATE_CALENDAR);
export const createCalendarSuccessCreator = createAction(CREATE_CALENDAR_SUCCESS);
export const createCalendarErrorCreator = createAction(CREATE_CALENDAR_ERROR);

export const getCalendarCreator = createAction(GET_CALENDAR);
export const putCalendarCreator = createAction(GET_CALENDAR_SUCCESS);