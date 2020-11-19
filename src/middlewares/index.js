import { timeCreationMiddleware, timeFetchMiddleware } from './timeMiddleware.js';

export default [
  timeCreationMiddleware,
  timeFetchMiddleware
]