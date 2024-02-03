import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import { thunk } from 'redux-thunk'
import { insertCellAfter } from './action-creators'

export const store = createStore(reducers, {}, applyMiddleware(thunk))

store.dispatch(insertCellAfter(null, 'code'))
store.dispatch(insertCellAfter(null, 'text'))
store.dispatch(insertCellAfter(null, 'code'))
store.dispatch(insertCellAfter(null, 'text'))
