import { fetchStatus, SET_STATUS, startJob, START_NEW_REACTOR, toggleValve, TOGGLE_VALVE } from '../actions'
import { State, ValveStatus, ValveType } from '../state'
import nock from 'nock'

interface EachArgs {
  valve: ValveType
  startingState: ValveStatus
  expectedState: ValveStatus
}

const stubState: State = {
  reactorId: 1,
  status: {
    fillLevel: 0,
    pHRange: [0, 0],
    pressureRange: [0, 0],
    success: false,
    temperatureRange: [0, 0]
  },
  valves: {
    input: 'closed',
    output: 'closed'
  }
}

describe('actions via pact', () => {
  it.each`
    valve       | startingState | expectedState
    ${'input'}  | ${'open'}     | ${'closed'}
    ${'input'}  | ${'closed'}   | ${'open'}
    ${'output'} | ${'open'}     | ${'closed'}
    ${'output'} | ${'closed'}   | ${'open'}
  `('can toggle a valve as expected', async ({ valve, startingState, expectedState }: EachArgs) => {
    nock('http://mini-mes.resilience.com/').put(`/bioreactor/1/${valve}-valve`, expectedState).reply(200)

    const toggleThunk = toggleValve(valve)
    const dispatchFake = jest.fn()

    await toggleThunk(dispatchFake, () => ({
      ...stubState,
      valves: {
        input: startingState,
        output: startingState
      }
    }), undefined as never)

    expect(dispatchFake).toHaveBeenCalledWith(expect.objectContaining({
      type: TOGGLE_VALVE,
      valve: valve,
      status: expectedState
    }))
  })

  it('can fetch the status of a thing', async () => {
    nock('http://mini-mes.resilience.com/')
      .get('/bioreactor/1').reply(200, {
        fill_level: 10,
        pH: 7,
        pressure: 12,
        temperature: 32
      })
      .get('/bioreactor/1/input-valve').reply(200, { status: 'open' })
      .get('/bioreactor/1/output-valve').reply(200, { status: 'closed' })

    const statusThunk = fetchStatus()
    const dispatchFake = jest.fn()

    await statusThunk(dispatchFake, () => stubState, undefined as never)

    expect(dispatchFake).toHaveBeenCalledWith(expect.objectContaining({
      type: SET_STATUS,
      fillLevel: 10,
      pH: 7,
      pressure: 12,
      temperature: 32,
      input: 'open',
      output: 'closed'
    }))
  })

  it('can start a new reactor', async () => {
    nock('http://mini-mes.resilience.com/').get('/bioreactor/0').reply(200, { id: '45' })

    const startThunk = startJob()
    const dispatchFake = jest.fn()

    await startThunk(dispatchFake, () => stubState, undefined as never)

    expect(dispatchFake).toHaveBeenCalledWith(expect.objectContaining({
      type: START_NEW_REACTOR,
      reactorId: 45
    }))
  })
})
