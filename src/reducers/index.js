import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import { reducer as formReducer } from 'redux-form';
import ChangesReducer from './changes';
import ChangeReducer from './reducer_change';
import MainReducer from './reducer_main';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routeReducer,
  /* your reducers */
  changes : ChangesReducer,
  change : ChangeReducer,
  main: MainReducer
});

export default rootReducer;
