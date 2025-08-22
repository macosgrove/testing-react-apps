// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async() => {
  let submittedData;
  const handleSubmit = data => (submittedData = data)
  render(<Login onSubmit={handleSubmit} />)
  const userNameField = screen.getByLabelText("Username")
  expect(userNameField).toBeInTheDocument()
  const passwordField = screen.getByLabelText("Password")
  expect(passwordField).toBeInTheDocument()
  await userEvent.type(userNameField, "Pikachu")
  await userEvent.type(passwordField, "IChooseYou")
  const submit = screen.getByRole('button', {name: /submit/i})
  expect(submit).toBeInTheDocument()
  await userEvent.click(submit)
  expect(submittedData).toEqual({username: "Pikachu", password: "IChooseYou"})
})

/*
eslint
  no-unused-vars: "off",
*/
