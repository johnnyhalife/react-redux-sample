import {
    Record
} from 'immutable'

import {
    Scroll
} from '../actions/types';

class Scroller extends Record({ x: 0, y: 0 }) {

}

const initialState = new Scroller();

export default function widgets(state = initialState, action) {
    switch (action.type) {
        case Scroll:
            return new Scroller({
                x: state.x + action.data.dx,
                y: state.y + action.data.dy
            });

        default:
            return state;
    }
};
