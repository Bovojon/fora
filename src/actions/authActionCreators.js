import { createAction } from '@reduxjs/toolkit';

import {
  AUTH_CODE_ADDED_SUCCESS,
  AUTH_CODE_REMOVED_SUCCESS,
  AUTH_CLIENT_FETCHED_PENDING,
  AUTH_CLIENT_FETCHED_SUCCESS
} from './constants';

export const addAuthCodeSuccess = createAction(AUTH_CODE_ADDED_SUCCESS);
export const removeAuthCodeSuccess = createAction(AUTH_CODE_REMOVED_SUCCESS);

export const fetchAuthClientPending = createAction(AUTH_CLIENT_FETCHED_PENDING);
export const fetchAuthClientSuccess = createAction(AUTH_CLIENT_FETCHED_SUCCESS);