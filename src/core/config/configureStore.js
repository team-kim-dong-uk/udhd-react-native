import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
