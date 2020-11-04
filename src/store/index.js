import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddle from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddle();
export const history = createBrowserHistory();
const logger = createLogger();

const middlewares = applyMiddleware(
  sagaMiddleware,
  routerMiddleware(history),
  logger
);

const store = createStore(rootReducer(history), compose(middlewares));

sagaMiddleware.run(rootSaga)

export default store;