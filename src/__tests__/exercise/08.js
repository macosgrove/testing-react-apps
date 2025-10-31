// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

let result={}
function TestComponent(props) {
  Object.assign(result, useCounter(props))
  return null
}

function setup(props) {
  render(<TestComponent {...props}/>)
}

test('exposes the count and increment/decrement functions', () => {
  setup()
  expect(result.count).toEqual(0)
  act(()=> result.increment())
  expect(result.count).toEqual(1)
  act(()=> result.decrement())
  expect(result.count).toEqual(0)
  act(()=> result.decrement())
  expect(result.count).toEqual(-1)
})

test('allows customization of the initial count', () => {
  setup({ initialCount: 10})
  expect(result.count).toEqual(10)
  act(()=> result.increment())
  expect(result.count).toEqual(11)
  act(()=> result.decrement())
  expect(result.count).toEqual(10)
  act(()=> result.decrement())
  expect(result.count).toEqual(9)
})

test('allows customization of the step', () => {
  setup({ step: 2})
  expect(result.count).toEqual(0)
  act(()=> result.increment())
  expect(result.count).toEqual(2)
  act(()=> result.decrement())
  expect(result.count).toEqual(0)
  act(()=> result.decrement())
  expect(result.count).toEqual(-2)
})

/* eslint no-unused-vars:0 */
