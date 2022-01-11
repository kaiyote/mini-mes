import { Actions, SetStatusAction, SET_STATUS, SET_TIME_STAMP, START_NEW_REACTOR, TOGGLE_VALVE } from './actions'
import { initialState, State } from './state'

function buildRange (currentRange: [number, number], potentialNewValue: number): [number, number] {
  return [Math.min(currentRange[0], potentialNewValue), Math.max(currentRange[1], potentialNewValue)]
}

export default function (state: State = initialState, action: Actions): State {
  switch (action.type) {
    case SET_STATUS: return {
      reactorId: state.reactorId,
      status: {
        success: state.status.success && !isErrorCondition(action, Math.max(state.status.maxFillLevel, action.fillLevel)),
        fillLevel: action.fillLevel,
        maxFillLevel: Math.max(state.status.maxFillLevel, action.fillLevel),
        pH: action.pH,
        pHRange: buildRange(state.status.pHRange, action.pH),
        pressure: action.pressure,
        pressureRange: buildRange(state.status.pressureRange, action.pressure),
        temperature: action.temperature,
        temperatureRange: buildRange(state.status.temperatureRange, action.temperature)
      },
      valves: {
        input: action.input,
        output: action.output
      },
      alerts: buildNewAlerts(action),
      done: isDone(action),
      runTime: state.runTime
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
    case SET_TIME_STAMP: return {
      ...state,
      runTime: {
        ...state.runTime,
        [action.timestamp]: state.runTime[action.timestamp] ?? action.value
      }
    }
    default: return state
  }
}

function buildNewAlerts (action: SetStatusAction): string[] {
  const alerts = []
  if (action.fillLevel >= 65 && action.input === 'open') alerts.push('Prepare to close input when fill level reaches 70 +/- 2%')
  if (action.pressure >= 200 && action.output === 'closed') alerts.push('Pressure has exceeded 200kPa, please open output valve and abort process')
  if (action.temperature >= 75 && action.output === 'closed') alerts.push('Prepare to open output valve when temperature reaches 80 +/- 1')
  return alerts
}

function isErrorCondition (action: SetStatusAction, maxFillLevel: number): boolean {
  return (action.input === 'closed' && maxFillLevel < 68 && maxFillLevel > 0) ||
    (action.input === 'closed' && maxFillLevel > 72) ||
    action.pressure >= 200 ||
    (action.output === 'closed' && action.temperature > 81) ||
    (action.output === 'open' && action.temperature < 79)
}

function isDone (action: SetStatusAction): boolean {
  return action.input === 'closed' && action.output === 'open' && action.fillLevel === 0
}
