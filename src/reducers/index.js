import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import calendarReducer from './calendarReducer';
import userReducer from './userReducer';
import timeReducer from './timeReducer';
import authReducer from './authReducer';
import eventReducer from './eventReducer';
import errorReducer from './errorReducer';
import successReducer from './successReducer';
import groupedTimesReducer from './groupedTimesReducer';

export default (history) => combineReducers({
    router: connectRouter(history),
    calendar: calendarReducer,
    user: userReducer,
    times: timeReducer,
    auth: authReducer,
    event: eventReducer,
    error: errorReducer,
    success: successReducer,
    groupedTimesReducer
})