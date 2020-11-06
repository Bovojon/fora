import { createAction } from '@reduxjs/toolkit';

import { USER_CREATED_PENDING } from './constants';

export const createUserCreator = createAction(USER_CREATED_PENDING);