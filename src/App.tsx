import { Provider } from 'react-redux'
import BatchRecord from './components/batchRecord'
import Controls from './components/controls'
import CurrentStatus from './components/currentStatus'
import store from './redux'

export default function App () {
  return (
    <Provider store={store()}>
      <Controls />
      <CurrentStatus />
      <BatchRecord />
    </Provider>
  )
}
