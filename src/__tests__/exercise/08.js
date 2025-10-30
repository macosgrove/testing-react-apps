// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

let result
function TestCounter() {
  result = useCounter()
  return null
}

test('exposes the count and increment/decrement functions', () => {
  render(<TestCounter />)
  expect(result.count).toEqual(0)
  act(()=> result.increment())
  expect(result.count).toEqual(1)
  act(()=> result.decrement())
  expect(result.count).toEqual(0)
  act(()=> result.decrement())
  expect(result.count).toEqual(-1)
})

/* eslint no-unused-vars:0 */
