import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as toastrReducer} from 'react-redux-toastr';

import timeReducer from "./timeReducer";

export default (history) => combineReducers({
    router: connectRouter(history),
    toastr: toastrReducer,
    time: timeReducer,
})