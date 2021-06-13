import {
  timeCreationMiddleware,
  timeFetchMiddleware,
  timeClassifierMiddleware,
  timeFilterMiddleware
} from './timeMiddleware.js';

export default [
  timeCreationMiddleware,
  timeFetchMiddleware,
  timeClassifierMiddleware,
  timeFilterMiddleware
]