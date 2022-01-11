import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { oppositeValve, State, ValveStatus, ValveType } from './state'

export const SET_STATUS = 'SET_STATUS'
export const START_NEW_REACTOR = 'START_NEW_REACTOR'
export const TOGGLE_VALVE = 'TOGGLE_VALVE'

export interface SetStatusAction extends Action {
  type: typeof SET_STATUS
  fillLevel: number
  pH: number
  pressure: number
  temperature: number,
  input: ValveStatus,
  output: ValveStatus
}

export interface SetValveAction extends Action {
  type: typeof TOGGLE_VALVE
  valve: ValveType
  status: ValveStatus
}

export interface StartNewReactorAction extends Action {
  type: typeof START_NEW_REACTOR,
  reactorId: number
}

export type Actions
  = SetStatusAction
  | SetValveAction
  | StartNewReactorAction

export function toggleValve (valve: ValveType): ThunkAction<Promise<SetValveAction>, State, never, Actions> {
  return (dispatch, getState) => {
    const reactor = getState().reactorId
    const newState = oppositeValve(getState().valves[valve])

    return fetch(`http://mini-mes.resilience.com/bioreactor/${reactor}/${valve}-valve`, { method: 'PUT', body: newState })
      .then(() => dispatch({
        type: TOGGLE_VALVE,
        valve,
        status: newState
      })
      )
  }
}

export function fetchStatus (): ThunkAction<Promise<SetStatusAction>, State, never, Actions> {
  return (dispatch, getState) => {
    const reactor = getState().reactorId

    const reactorStatus = fetch(`http://mini-mes.resilience.com/bioreactor/${reactor}`)
    const inputStatus = fetch(`http://mini-mes.resilience.com/bioreactor/${reactor}/input-valve`)
    const outputStatus = fetch(`http://mini-mes.resilience.com/bioreactor/${reactor}/output-valve`)

    return Promise.all([reactorStatus, inputStatus, outputStatus])
      .then(([reactor, input, output]) => Promise.all([reactor.json(), input.json(), output.json()]))
      .then(([reactor, input, output]) => dispatch({
        type: SET_STATUS,
        fillLevel: +reactor.fill_level,
        pH: +reactor.pH,
        pressure: +reactor.pressure,
        temperature: +reactor.temperature,
        input: input.status,
        output: output.status
      }))
  }
}

export function startJob (): ThunkAction<Promise<StartNewReactorAction>, State, never, Actions> {
  return dispatch => {
    return fetch('http://mini-mes.resilience.com/bioreactor/0')
      .then(resp => resp.json())
      .then(json => dispatch({
        type: START_NEW_REACTOR,
        reactorId: +json.id
      }))
  }
}
