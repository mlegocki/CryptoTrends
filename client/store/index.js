import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import coinsList from './coinsList';
import data from './data';

const reducer = combineReducers({
  coinsList,
  data,
})
// initiate devtools for Chrome Developer Tools
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware);

export default store;
export * from './coinsList';
export * from './data';