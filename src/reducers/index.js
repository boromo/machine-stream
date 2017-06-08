import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import machines from './machines';

const rootReducer = combineReducers({
  machines,
  routing
});

export default rootReducer;
