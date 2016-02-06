import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ChangesReducer from './changes';
import ChangeReducer from './reducer_change';
import MainReducer from './reducer_main';
import TasksReducer from './reducer_tasks';
import TaskReducer from './reducer_task';
import FilesReducer from './reducer_files';

const rootReducer = combineReducers({
  form: formReducer,
  /* your reducers */
  changes : ChangesReducer,
  change : ChangeReducer,
  main: MainReducer,
  tasks: TasksReducer,
  task: TaskReducer,
  files: FilesReducer,
});

export default rootReducer;
