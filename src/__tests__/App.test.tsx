import { render, screen } from '@testing-library/react'
import App from "../App"

describe('app tests work', () => {
  it('works', async () => {
    render(<App />)

    expect(screen.queryByText('Hello Vite + React!')).toBeInTheDocument()
  })
})
