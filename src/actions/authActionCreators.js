import { createAction } from '@reduxjs/toolkit';

import {
  ACCESS_TOKEN_FETCHED_PENDING,
  ACCESS_TOKEN_FETCHED_SUCCESS
} from './constants';

export const fetchAccessTokenPending = createAction(ACCESS_TOKEN_FETCHED_PENDING);
export const fetchAccessTokenSuccess = createAction(ACCESS_TOKEN_FETCHED_SUCCESS);