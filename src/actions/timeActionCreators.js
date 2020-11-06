import { createAction } from '@reduxjs/toolkit';

import { 
  TIME_ADDED_PENDING, 
  TIME_REMOVED_PENDING 
} from './constants';

export const addTimePending = createAction(TIME_ADDED_PENDING);
export const removeTimePending = createAction(TIME_REMOVED_PENDING);