// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {act, render} from '@testing-library/react'
import useCounter from '../../components/use-counter'

function setup(props) {
  const result = {}
  function TestComponent() {
    result.current = useCounter(props)
    return null
  }
  render(<TestComponent />)
  return result
}

test('exposes the count and increment/decrement functions', () => {
  const result = setup()
  expect(result.current.count).toEqual(0)
  act(()=> result.current.increment())
  expect(result.current.count).toEqual(1)
  act(()=> result.current.decrement())
  expect(result.current.count).toEqual(0)
  act(()=> result.current.decrement())
  expect(result.current.count).toEqual(-1)
})

test('allows customization of the initial count', () => {
  const result = setup({ initialCount: 10})
  expect(result.current.count).toEqual(10)
  act(()=> result.current.increment())
  expect(result.current.count).toEqual(11)
  act(()=> result.current.decrement())
  expect(result.current.count).toEqual(10)
  act(()=> result.current.decrement())
  expect(result.current.count).toEqual(9)
})

test('allows customization of the step', () => {
  const result = setup({ step: 2})
  expect(result.current.count).toEqual(0)
  act(()=> result.current.increment())
  expect(result.current.count).toEqual(2)
  act(()=> result.current.decrement())
  expect(result.current.count).toEqual(0)
  act(()=> result.current.decrement())
  expect(result.current.count).toEqual(-2)
})

/* eslint no-unused-vars:0 */
