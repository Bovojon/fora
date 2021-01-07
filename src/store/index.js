import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddle from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import rootReducer from '../reducers';
import rootSaga from '../sagas';
import customMiddlewares from '../middlewares';

const sagaMiddleware = createSagaMiddle();
export const history = createBrowserHistory();

const middlewares = applyMiddleware(
  ...customMiddlewares,
  sagaMiddleware,
  routerMiddleware(history)
);

const store = createStore(rootReducer(history), compose(middlewares));

sagaMiddleware.run(rootSaga)

export default store;