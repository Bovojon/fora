import { createAction } from '@reduxjs/toolkit';

import { USER_CREATED_PENDING, USER_CREATED_SUCCESS } from './constants';

export const createUserPending = createAction(USER_CREATED_PENDING);
export const createUserSuccess = createAction(USER_CREATED_SUCCESS);