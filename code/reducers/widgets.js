import {
    WidgetAdd,
    WidgetMove,
    WidgetDragEnd,
    WidgetToggleMove,
    WidgetSetMove,
    WidgetDeleteSelected,
    UnselectAll
} from '../actions/types';

import _ from 'lodash';

import {
    Map
} from 'immutable'

const initialState = Map({});

export default function widgets(state = initialState, action) {
    switch (action.type) {
        case WidgetMove:
            return state.update(action.data.id.toString(), widget => Object.assign({}, widget, action.data, {
                selected: true
            }));

        case WidgetAdd:
            var id = `${state.valueSeq().toArray().length}-${Date.now()}`;

            return state.set(id, {
                id,
                width: 120,
                height: 120,
                x: action.data.x - 60,
                y: action.data.y - 60,

                selected: true
            });

        case WidgetDragEnd:
            return state.update(action.data.id.toString(), widget => Object.assign({}, widget, {
                moved: true
            }));


        case WidgetToggleMove:
            return state.update(action.data.id.toString(), widget => Object.assign({}, widget, {
                moved: !widget.moved
            }));

        case WidgetSetMove:
            return state.update(action.data.id.toString(), widget => Object.assign({}, widget, {
                moved: action.data.value
            }));

        case WidgetDeleteSelected:
            return state.filter((value, k) => !value.selected);

        case UnselectAll:
            if (state.some(w => w.moved)) {
                return state;
            } else {
                return state.map(widget => {
                    return Object.assign({}, widget, {
                        selected: widget.id === action.data.id
                    });
                });
            }

        default:
            return state;
    }
}
