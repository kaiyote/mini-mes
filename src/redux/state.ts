export type ValveType = 'input' | 'output'

export type ValveStatus = 'open' | 'closed'

export type Range = [number, number]

export function oppositeValve (status: ValveStatus): ValveStatus {
  return status === 'open' ? 'closed' : 'open'
}

export function valveControlLabel (status: ValveStatus): string {
  return status === 'open' ? 'close' : 'open'
}

export interface Status {
  fillLevel: number,
  maxFillLevel: number,
  pH: number
  pHRange: Range
  pressure: number
  pressureRange: Range
  temperature: number
  temperatureRange: Range
  success: boolean
}

export interface State {
  reactorId: number
  valves: Record<ValveType, ValveStatus>
  status: Status
  alerts: string[]
  done: boolean
  runTime: {
    startTime?: Date
    stopTime?: Date
  }
}

export const initialState: State = {
  reactorId: 0,
  valves: {
    input: 'closed',
    output: 'closed'
  },
  status: {
    fillLevel: 0,
    maxFillLevel: 0,
    pH: 0,
    pHRange: [Infinity, -Infinity],
    pressure: 0,
    pressureRange: [Infinity, -Infinity],
    temperature: 0,
    temperatureRange: [Infinity, -Infinity],
    success: true // assume it'll work out, and update later otherwise
  },
  alerts: [],
  done: false,
  runTime: {}
}
