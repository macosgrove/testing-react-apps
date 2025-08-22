// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'

const buildLoginForm = (overrides) => {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides
  }
}

test('submitting the form calls onSubmit with username and password', async() => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)
  const {username, password} = buildLoginForm()
  const userNameField = screen.getByLabelText("Username")
  expect(userNameField).toBeInTheDocument()
  const passwordField = screen.getByLabelText("Password")
  expect(passwordField).toBeInTheDocument()
  await userEvent.type(userNameField, username)
  await userEvent.type(passwordField, password)
  const submit = screen.getByRole('button', {name: /submit/i})
  expect(submit).toBeInTheDocument()
  await userEvent.click(submit)
  expect(handleSubmit).toHaveBeenCalledWith({username, password})
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

test('password override', async() => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)
  const {username, password} = buildLoginForm({password: "thisPasswordFulfillsStrengthCriteria"})
  const userNameField = screen.getByLabelText("Username")
  expect(userNameField).toBeInTheDocument()
  const passwordField = screen.getByLabelText("Password")
  expect(passwordField).toBeInTheDocument()
  await userEvent.type(userNameField, username)
  await userEvent.type(passwordField, password)
  const submit = screen.getByRole('button', {name: /submit/i})
  expect(submit).toBeInTheDocument()
  await userEvent.click(submit)
  expect(handleSubmit).toHaveBeenCalledWith({username, password: "thisPasswordFulfillsStrengthCriteria"})
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/
