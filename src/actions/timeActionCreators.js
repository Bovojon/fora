import { createAction } from '@reduxjs/toolkit';

import { ADD_TIME, DELETE_TIME } from './constants';

export const addTime = createAction(ADD_TIME);
export const deleteTime = createAction(DELETE_TIME);