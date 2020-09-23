import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';

import createRootReducer from '../reducers';

export const history = createBrowserHistory();
const logger = createLogger();

const preloadedState = {
  time: [
    {
      id: 0,
      title: 'All Day Event very long title',
      start: new Date("2020-09-03"),
      end: new Date("2020-09-03"),
    },
    {
      id: 1,
      title: 'Long Event',
      start: new Date("2020-09-25"),
      end: new Date("2020-09-25"),
    },
  ]
}

const store = createStore(
  createRootReducer(history),
  preloadedState,
  compose(
    applyMiddleware(
      routerMiddleware(history),
      logger,
    )
  )
)

export default store;