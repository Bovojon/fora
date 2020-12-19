import { createAction } from '@reduxjs/toolkit';

import { AUTH_CODE_ADDED_SUCCESS } from './constants';

export const addAuthCodeSuccess = createAction(AUTH_CODE_ADDED_SUCCESS);