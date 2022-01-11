export type ValveType = 'input' | 'output'

export type ValveStatus = 'open' | 'closed'

export type Range = [number, number]

export function oppositeValve (status: ValveStatus): ValveStatus {
  return status === 'open' ? 'closed' : 'open'
}

export interface Status {
  fillLevel: number
  pHRange: Range
  pressureRange: Range
  temperatureRange: Range
  success: boolean
}

export interface State {
  reactorId: number
  valves: Record<ValveType, ValveStatus>
  status: Status
}

export const initialState: State = {
  reactorId: 0,
  valves: {
    input: 'closed',
    output: 'closed'
  },
  status: {
    fillLevel: 0,
    pHRange: [Infinity, -Infinity],
    pressureRange: [Infinity, -Infinity],
    temperatureRange: [Infinity, -Infinity],
    success: false
  }
}
