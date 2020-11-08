import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as toastrReducer} from 'react-redux-toastr';

import calendarReducer from './calendarReducer';
import userReducer from './userReducer';
import timeReducer from './timeReducer';

export default (history) => combineReducers({
    router: connectRouter(history),
    toastr: toastrReducer,
    calendar: calendarReducer,
    user: userReducer,
    times: timeReducer
})