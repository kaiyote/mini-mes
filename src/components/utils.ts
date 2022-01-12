import styled from 'styled-components'

export function round (number: number): number {
  return Math.round(number * 100) / 100
}

export const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid black;
  margin: 10px;

  th, td {
    border: 1px solid black
  }
`
