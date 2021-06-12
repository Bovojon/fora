import {
  timeCreationMiddleware,
  timeFetchMiddleware,
  timeClassifierMiddleware
} from './timeMiddleware.js';

export default [
  timeCreationMiddleware,
  timeFetchMiddleware,
  timeClassifierMiddleware
]