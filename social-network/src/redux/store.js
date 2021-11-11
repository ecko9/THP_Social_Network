import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import { usersReducer } from "./users/usersReducer";
import { postsReducer } from './posts/postsReducer';


const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer
});

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);