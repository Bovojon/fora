import { createAction } from '@reduxjs/toolkit';

import { ADD_TIME, DELETE_TIME } from './constants';

export const addTimeCreator = createAction(ADD_TIME);
export const deleteTimeCreator = createAction(DELETE_TIME);