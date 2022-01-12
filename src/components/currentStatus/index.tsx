import { ReactElement, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { fetchStatus } from '../../redux/actions'
import { State } from '../../redux/state'
import { round, Table } from '../utils'
import { Alert } from './alerts.style'

interface ViewState {
  hasReactor: boolean
  fillLevel: number
  pH: number
  pressure: number
  temperature: number
  alerts: string[]
  done: boolean
}

export default function CurrentStatus (): ReactElement | null {
  const dispatch = useDispatch()

  const { hasReactor, fillLevel, pH, pressure, temperature, alerts, done } = useSelector<State, ViewState>(state => ({
    hasReactor: state.reactorId !== 0,
    fillLevel: state.status.fillLevel,
    pH: state.status.pH,
    pressure: state.status.pressure,
    temperature: state.status.temperature,
    alerts: state.alerts,
    done: state.done
  }), shallowEqual)

  useEffect(() => {
    let timeout: any
    if (hasReactor && !done) {
      timeout = setInterval(() => dispatch(fetchStatus()), 1000)
    }
    return () => { if (timeout != null) clearInterval(timeout) }
  }, [hasReactor, dispatch, done])

  if (!hasReactor) return null

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Current Fill Level</th>
            <th>Current pH</th>
            <th>Current Pressure</th>
            <th>Current Temperature</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{round(fillLevel)}%</td>
            <td>{pH} pH</td>
            <td>{pressure} kPa</td>
            <td>{round(temperature)} C</td>
          </tr>
        </tbody>
      </Table>
      {alerts.map(a => <Alert key={a}>{a}</Alert>)}
    </>
  )
}
