import setTodoReducer from './setTodo';
import counterReducer from './counter';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    counter: counterReducer,
    todo: setTodoReducer
});
export default allReducers;