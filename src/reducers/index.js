import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as toastrReducer} from 'react-redux-toastr';

import timeReducer from './timeReducer';
import calendarReducer from './calendarReducer';
import userReducer from './userReducer';

export default (history) => combineReducers({
    router: connectRouter(history),
    toastr: toastrReducer,
    calendar: calendarReducer,
    time: timeReducer,
    user: userReducer
})