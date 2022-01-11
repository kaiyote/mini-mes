import styled from 'styled-components'

interface AlertProps {
  error?: boolean
}

export const Alert = styled.p<AlertProps>`
  background-color: ${props => props.error ? 'orangered' : 'lightgreen'};
  color: black;
  line-height: 1.5rem;
  vertical-align: middle;
  border-radius: 5px;
`
