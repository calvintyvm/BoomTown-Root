import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';


const logger = store => next => action => {
    const result = next(action);
    return result;
  };

const enhancer = compose(
  logger(),
  persistState(),
);

export default createStore(rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk), enhancer));