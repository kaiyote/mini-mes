import { initialState, Range, State, ValveStatus } from '../state'
import reducer from '../reducer'
import { SET_STATUS, START_NEW_REACTOR, TOGGLE_VALVE } from '../actions'

describe('the reducer behaves as expected', () => {
  it('will update reactorId as expected given a StartAction', () => {
    const newState = reducer(initialState, {
      type: START_NEW_REACTOR,
      reactorId: 42
    })

    expect(newState.reactorId).toBe(42)
    expect(newState.valves.input).toBe('closed')
  })

  it('will update valve status as expected given a ValveAction', () => {
    const newState = reducer(initialState, {
      type: TOGGLE_VALVE,
      valve: 'input',
      status: 'open'
    })

    expect(newState.valves.input).toBe('open')
    expect(newState.valves.output).toBe('closed')
  })

  it('can update the whole status block as expected given a StatusAction', () => {
    let newState = reducer(initialState, {
      type: SET_STATUS,
      temperature: 3,
      fillLevel: 4,
      pH: 5,
      pressure: 1,
      input: 'open',
      output: 'closed'
    })

    assertStatusBlock(newState, [3, 3], 4, [5, 5], [1, 1], 'open', 'closed')

    newState = reducer(newState, {
      type: SET_STATUS,
      temperature: 2,
      fillLevel: 5,
      pH: 4,
      pressure: 0,
      input: 'open',
      output: 'open'
    })

    assertStatusBlock(newState, [2, 3], 5, [4, 5], [0, 1], 'open', 'open')

    newState = reducer(newState, {
      type: SET_STATUS,
      temperature: 4,
      fillLevel: 7,
      pH: 7,
      pressure: 3,
      input: 'closed',
      output: 'open'
    })

    assertStatusBlock(newState, [2, 4], 7, [4, 7], [0, 3], 'closed', 'open')
  })
})

function assertStatusBlock (newState: State, tempRange: Range, fillLevel: number, pHRange: Range, pressureRange: Range, input: ValveStatus, output: ValveStatus): void {
  expect(newState.status.fillLevel).toBe(fillLevel)
  expect(newState.status.temperatureRange).toStrictEqual(tempRange)
  expect(newState.status.pHRange).toStrictEqual(pHRange)
  expect(newState.status.pressureRange).toStrictEqual(pressureRange)
  expect(newState.valves.input).toBe(input)
  expect(newState.valves.output).toBe(output)
}
