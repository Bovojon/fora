import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import calendarReducer from './calendarReducer';
import userReducer from './userReducer';
import timeReducer from './timeReducer';
import authReducer from './authReducer';
import eventReducer from './eventReducer';

export default (history) => combineReducers({
    router: connectRouter(history),
    calendar: calendarReducer,
    user: userReducer,
    times: timeReducer,
    auth: authReducer,
    event: eventReducer
})