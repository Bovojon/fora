import { createAction } from '@reduxjs/toolkit';

import { EVENT_ADDED_PENDING } from './constants';

export const addEventPending = createAction(EVENT_ADDED_PENDING);