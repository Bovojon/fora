import { ADD_TIME } from '../actions/constants';

const timeReducer = (state=[], action) => {
    switch(action.type) {
        case ADD_TIME:
            return state.concat(action.payload);
        default:
            return state;
    }
}

export default timeReducer;