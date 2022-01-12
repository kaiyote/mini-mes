import { render, screen } from '@testing-library/react'
import { addMinutes } from 'date-fns'
import { Provider } from 'react-redux'
import BatchRecord from '../batchRecord'
import store from '../../redux'
import { State } from '../../redux/state'

describe('batch record', () => {
  it('wont render if not done', () => {
    render(<Provider store={store()}><BatchRecord /></Provider>)

    expect(screen.queryByText('Maximum Fill Level')).not.toBeInTheDocument()
  })

  it('will render all the things correctly', () => {
    // this data couldn't ever actually happen
    const state: Partial<State> = {
      done: true,
      status: {
        success: true,
        pHRange: [1, 14],
        temperatureRange: [20.723623, 100.8623525],
        pressureRange: [113, 250],
        fillLevel: 23.72346234,
        maxFillLevel: 71.34523,
        pH: 4,
        pressure: 150,
        temperature: 300.2374236
      },
      runTime: {
        startTime: new Date(),
        stopTime: addMinutes(new Date(), 2)
      }
    }

    const { container } = render(<Provider store={store(state)}><BatchRecord /></Provider>)

    expect(screen.getByText('71.35%')).toBeVisible()
    expect(screen.getByText('20.72 - 100.86 C')).toBeVisible()
    expect(screen.getByText('1 - 14 pH')).toBeVisible()
    expect(screen.getByText('113 - 250 kPa')).toBeVisible()
    expect(screen.getByText('2 minutes')).toBeVisible()

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const tds = container.querySelectorAll('td') // we already checked most of them, but the 4 success things are very positional

    expect(tds[5]).toHaveTextContent('✓')
    expect(tds[6]).toHaveTextContent('x')
    expect(tds[7]).toHaveTextContent('x')
    expect(tds[8]).toHaveTextContent('✓')
  })
})
