import { createAction } from '@reduxjs/toolkit';

import { USER_CREATED_PENDING } from './constants';

export const createUserPending = createAction(USER_CREATED_PENDING);