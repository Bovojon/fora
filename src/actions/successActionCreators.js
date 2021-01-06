import { createAction } from '@reduxjs/toolkit';

import { SUCCESS_ADDED, SUCCESS_REMOVED } from './constants';

export const addSuccess = createAction(SUCCESS_ADDED);
export const removeSuccess = createAction(SUCCESS_REMOVED);