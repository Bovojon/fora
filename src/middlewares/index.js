import {
  timeCreationMiddleware,
  timeFetchMiddleware,
  timeFilterMiddleware
} from './timeMiddleware.js';

export default [
  timeCreationMiddleware,
  timeFetchMiddleware,
  timeFilterMiddleware
]