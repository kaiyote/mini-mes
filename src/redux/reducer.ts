import { Actions, SET_STATUS, START_NEW_REACTOR, TOGGLE_VALVE } from './actions'
import { initialState, State } from './state'

function buildRange (currentRange: [number, number], potentialNewValue: number): [number, number] {
  return [Math.min(currentRange[0], potentialNewValue), Math.max(currentRange[1], potentialNewValue)]
}

export default function (state: State = initialState, action: Actions): State {
  switch (action.type) {
    case SET_STATUS: return {
      reactorId: state.reactorId,
      status: {
        ...state.status,
        fillLevel: action.fillLevel,
        pHRange: buildRange(state.status.pHRange, action.pH),
        pressureRange: buildRange(state.status.pressureRange, action.pressure),
        temperatureRange: buildRange(state.status.temperatureRange, action.temperature)
      },
      valves: {
        input: action.input,
        output: action.output
      }
    }
    case START_NEW_REACTOR: return {
      ...state,
      reactorId: action.reactorId
    }
    case TOGGLE_VALVE: return {
      ...state,
      valves: {
        ...state.valves,
        [action.valve]: action.status
      }
    }
    default: return state
  }
}
