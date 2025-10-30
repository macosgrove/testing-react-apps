// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()
function TestCounter() {
  const {count, increment, decrement} = useCounter()
  return (
    <div>
      <div id="label">Counter</div>
      <div aria-labelledby="label">{count}</div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', async () => {
  render(<TestCounter />)
  const count = screen.getByLabelText(/counter/i)
  expect(count).toHaveTextContent('0')
  const increment = screen.getByRole('button', {name: /increment/i})
  await userEvent.click(increment)
  expect(count).toHaveTextContent('1')
  const decrement = screen.getByRole('button', {name: /decrement/i})
  await userEvent.click(decrement)
  expect(count).toHaveTextContent('0')
  await userEvent.click(decrement)
  expect(count).toHaveTextContent('-1')
})

/* eslint no-unused-vars:0 */
