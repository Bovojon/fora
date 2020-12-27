import { createAction } from '@reduxjs/toolkit';

import { ERROR_ADDED } from './constants';

export const addError = createAction(ERROR_ADDED);