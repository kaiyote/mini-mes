import { formatDuration, Interval, intervalToDuration } from 'date-fns'
import { ReactElement } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { State } from '../../redux/state'
import { round } from '../utils'

export default function BatchRecord (): ReactElement | null {
  const state = useSelector<State, State>(s => s, shallowEqual)

  if (!state.done) return null

  return (
    <table>
      <thead>
        <tr>
          <th>Maximum Fill Level</th>
          <th>Temperature Range</th>
          <th>pH Range</th>
          <th>Pressure Range</th>
          <th>Total Process Time</th>
          <th>Fill Level CPP</th>
          <th>Max Temperature CPP</th>
          <th>Pressure CPP</th>
          <th>Success</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{round(state.status.maxFillLevel)}%</td>
          <td>{round(state.status.temperatureRange[0])} - {round(state.status.temperatureRange[1])} C</td>
          <td>{state.status.pHRange[0]} - {state.status.pHRange[1]} pH</td>
          <td>{state.status.pressureRange[0]} - {state.status.pressureRange[1]} kPa</td>
          <RunTime start={state.runTime.startTime!} end={state.runTime.stopTime!} />
          <CPP criterionMet={state.status.maxFillLevel < 72 && state.status.maxFillLevel > 68} />
          <CPP criterionMet={state.status.temperatureRange[1] > 79 && state.status.temperatureRange[1] < 81} />
          <CPP criterionMet={state.status.pressureRange[1] < 200} />
          <CPP criterionMet={state.status.success} />
        </tr>
      </tbody>
    </table>
  )
}

function RunTime (interval: Interval): ReactElement {
  return <td>{formatDuration(intervalToDuration(interval))}</td>
}

function CPP ({ criterionMet }: { criterionMet: boolean }): ReactElement {
  return <td>{criterionMet ? <>✓</> : <>x</>}</td>
}
