import { createAction } from '@reduxjs/toolkit';

import { EVENT_ADDED_PENDING, EVENT_SUBMITTED_PENDING } from './constants';

export const addEventPending = createAction(EVENT_ADDED_PENDING);
export const submitEventPending = createAction(EVENT_SUBMITTED_PENDING);