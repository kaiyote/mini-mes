import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../../redux'
import Controls from '../controls'

describe('controls cluster', () => {
  it('will render the start button before a reactor has been assigned', () => {
    render(<Provider store={store()}><Controls /></Provider>)

    expect(screen.getByText('start new reactor')).toBeInTheDocument()
  })

  it('will render the other buttons appropriately', () => {
    render(<Provider store={store({ reactorId: 1, valves: { input: 'closed', output: 'open' } })}><Controls /></Provider>)

    expect(screen.getByText('open input')).toBeInTheDocument()
    expect(screen.getByText('close output')).toBeInTheDocument()
  })
})
