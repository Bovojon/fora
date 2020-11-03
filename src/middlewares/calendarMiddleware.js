import { CREATE_CALENDAR } from "../actions/constants";

export const calendarCreationMiddleware = ({ getState, dispatch }) => next => action => {
  if (action.type === CREATE_CALENDAR) {
    const state = getState();
    const owner_id = state.user.userId;
    action.payload = {...action.payload, owner_id}
  }
  return next(action)
}