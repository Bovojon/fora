import { createAction } from '@reduxjs/toolkit';

import { AUTH_CODE_ADDED_SUCCESS, AUTH_CODE_REMOVE_SUCCESS } from './constants';

export const addAuthCodeSuccess = createAction(AUTH_CODE_ADDED_SUCCESS);
export const removeAuthCodeSuccess = createAction(AUTH_CODE_REMOVE_SUCCESS);
