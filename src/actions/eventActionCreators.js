import { createAction } from '@reduxjs/toolkit';

import {
  EVENT_ADDED_PENDING,
  EVENT_SUBMITTED_PENDING,
  EVENT_SUBMITTED_SUCCESS,
  EVENT_SUBMITTED_ERROR
} from './constants';

export const addEventPending = createAction(EVENT_ADDED_PENDING);

export const submitEventPending = createAction(EVENT_SUBMITTED_PENDING);
export const submitEventSuccess = createAction(EVENT_SUBMITTED_SUCCESS);
export const submitEventError = createAction(EVENT_SUBMITTED_ERROR);