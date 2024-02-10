import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import { thunk } from 'redux-thunk'
import { persistMiddleWare } from './middlewares/persist-middleware'

export const store = createStore(
  reducers,
  {},
  applyMiddleware(persistMiddleWare, thunk)
)
