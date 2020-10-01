import { ADD_TIME } from '../actions/constants';

const timeReducer = (state=[], { type, payload }) => {
    switch(type) {
        case ADD_TIME:
            return [...state, payload];
        default:
            return state;
    }
}

export default timeReducer;