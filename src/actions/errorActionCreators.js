import { createAction } from '@reduxjs/toolkit';

import { ERROR_ADDED, ERROR_REMOVED } from './constants';

export const addError = createAction(ERROR_ADDED);
export const removeError = createAction(ERROR_REMOVED);