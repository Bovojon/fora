import { createAction } from '@reduxjs/toolkit';

import { USER_CREATED_PENDING, USER_CREATED_SUCCESS, USER_SET_CURRENT_PENDING } from './constants';

export const createUserPending = createAction(USER_CREATED_PENDING);
export const createUserSuccess = createAction(USER_CREATED_SUCCESS);

export const setCurrentUserPending = createAction(USER_SET_CURRENT_PENDING);