import { combineReducers } from 'redux';
import scroller from './scroller';
import widgets from './widgets';

const rootReducer = combineReducers({ scroller, widgets });

export default rootReducer;
