import { render, screen } from '@testing-library/react'
import App from '../App'

describe('app tests work', () => {
  it('works', async () => {
    render(<App />)

    expect(screen.getByText('Hello Vite + React!')).toBeInTheDocument()
  })
})
