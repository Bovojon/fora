import { CALENDAR_CREATED_PENDING } from "../actions/constants";

export const calendarCreationMiddleware = ({ getState, dispatch }) => next => action => {
  if (action.type === CALENDAR_CREATED_PENDING) {
    const state = getState();
    const owner_id = state.user.userId;
    action.payload = {...action.payload, owner_id}
  }
  return next(action)
}