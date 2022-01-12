import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducer from './reducer'
import { initialState, State } from './state'

export default function store (preloadedState: Partial<State> = {}) {
  return createStore(reducer, { ...initialState, ...preloadedState }, composeWithDevTools(applyMiddleware(thunk)))
}
