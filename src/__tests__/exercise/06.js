// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'

// 🐨 set window.navigator.geolocation to an object that has a getCurrentPosition mock function
beforeAll(() => {
  jest.clearAllMocks()
})

jest.mock('react-use-geolocation')

test('displays the users current location', async () => {
  // 🐨 create a fakePosition object that has an object called "coords" with latitude and longitude
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    }
  }

  let setReturnValue
  function mockUseCurrentPosition() {
    const [state, setState] = React.useState([])
    setReturnValue = setState
    return state
  }
   useCurrentPosition.mockImplementation(mockUseCurrentPosition)

  //
  // 🐨 now that setup is done, render the Location component itself
  render(<Location/>)
  //
  // 🐨 verify the loading spinner is showing up
  expect(screen.getByLabelText("loading...")).toBeInTheDocument()
  // 💰 tip: try running screen.debug() to know what the DOM looks like at this point.
  //
  act(() => {
    setReturnValue([fakePosition])
  })
  expect(screen.queryByLabelText("loading...")).not.toBeInTheDocument()
  // 🐨 verify the latitude and longitude appear correctly
  expect(screen.getByText(/latitude:(\s*)35/i)).toBeInTheDocument()
  expect(screen.getByText(/longitude:(\s*)139/i)).toBeInTheDocument()
})

test('displays errors that may be returned', async () => {
  // 🐨 create a fakePosition object that has an object called "coords" with latitude and longitude
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    }
  }

  let setReturnValue
  function mockUseCurrentPosition() {
    const [state, setState] = React.useState([])
    setReturnValue = setState
    return state
  }
  useCurrentPosition.mockImplementation(mockUseCurrentPosition)

  //
  // 🐨 now that setup is done, render the Location component itself
  render(<Location/>)
  //
  // 🐨 verify the loading spinner is showing up
  expect(screen.getByLabelText("loading...")).toBeInTheDocument()
  // 💰 tip: try running screen.debug() to know what the DOM looks like at this point.
  //
  act(() => {
    setReturnValue([undefined, {message: 'Something went wrong'}])
  })
  expect(screen.queryByLabelText("loading...")).not.toBeInTheDocument()
  // 🐨 verify the latitude and longitude appear correctly
  expect(screen.getByRole('alert')).toHaveTextContent("Something went wrong")
})

/*
eslint
  no-unused-vars: "off",
*/
