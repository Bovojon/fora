import { createAction } from '@reduxjs/toolkit';

import { 
  TIME_ADDED_PENDING, 
  TIME_REMOVED_PENDING 
} from './constants';

export const addTimeCreator = createAction(TIME_ADDED_PENDING);
export const removeTimeCreator = createAction(TIME_REMOVED_PENDING);