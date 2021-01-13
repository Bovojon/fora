import { createAction } from '@reduxjs/toolkit';

<<<<<<< HEAD
import { AUTH_CODE_ADDED_SUCCESS, AUTH_CODE_REMOVE_SUCCESS } from './constants';

export const addAuthCodeSuccess = createAction(AUTH_CODE_ADDED_SUCCESS);
export const removeAuthCodeSuccess = createAction(AUTH_CODE_REMOVE_SUCCESS);
=======
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
>>>>>>> parent of 4baa641... Going to revert back to what we had for google auth
