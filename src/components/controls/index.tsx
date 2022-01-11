import { ReactElement } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { assignTimestamp, startJob, toggleValve } from '../../redux/actions'
import { valveControlLabel, State } from '../../redux/state'

interface ViewState {
  hasReactor: boolean
  inputLabel: string
  outputLabel: string
}

export default function Controls (): ReactElement {
  const dispatch = useDispatch()

  const { hasReactor, inputLabel, outputLabel } = useSelector<State, ViewState>(state => ({
    hasReactor: state.reactorId !== 0,
    inputLabel: valveControlLabel(state.valves.input),
    outputLabel: valveControlLabel(state.valves.output)
  }), shallowEqual)

  if (hasReactor) {
    return (
      <>
        <button onClick={() => { dispatch(toggleValve('input')); dispatch(assignTimestamp('startTime', new Date())) }}>{inputLabel} input</button>
        <button onClick={() => dispatch(toggleValve('output'))}>{outputLabel} output</button>
      </>
    )
  } else {
    return (
      <button onClick={() => dispatch(startJob())}>start new reactor</button>
    )
  }
}
