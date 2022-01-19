import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../../redux'
import CurrentStatus from '../currentStatus'

describe('current status', () => {
  it('will render the standard things as expected', () => {
    render(<Provider store={store({
      reactorId: 1,
      status: {
        temperature: 35.23734234,
        temperatureRange: [0, 0],
        fillLevel: 73.72346234,
        maxFillLevel: 0,
        pH: 8,
        pHRange: [0, 0],
        pressure: 173,
        pressureRange: [0, 0],
        success: true
      }
    })}><CurrentStatus /></Provider>)

    expect(screen.getByText('73.72%')).toBeInTheDocument()
    expect(screen.getByText('8 pH')).toBeInTheDocument()
    expect(screen.getByText('173 kPa')).toBeInTheDocument()
    expect(screen.getByText('35.24 C')).toBeInTheDocument()
  })

  it('will render the alerts appropriately', () => {
    render(<Provider store={store({ reactorId: 1, alerts: ['this is an alert'] })}><CurrentStatus /></Provider>)

    expect(screen.getByText('this is an alert')).toBeInTheDocument()
  })
})
