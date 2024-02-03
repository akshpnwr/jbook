import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import { thunk } from 'redux-thunk'
import { insertCellBefore } from './action-creators'

export const store = createStore(reducers, {}, applyMiddleware(thunk))

store.dispatch(insertCellBefore(null, 'code'))
store.dispatch(insertCellBefore(null, 'text'))
store.dispatch(insertCellBefore(null, 'code'))
