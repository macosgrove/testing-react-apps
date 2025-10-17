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

  // 💰 right around here, you'll probably notice you get an error log in the
  // test output. You can ignore that for now and just add this next line:
  // act(() => {})
  //
  // If you'd like, learn about what this means and see if you can figure out
  // how to make the warning go away (tip, you'll need to use async act)
  // 📜 https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
  //
  // 🐨 verify the loading spinner is no longer in the document
  //    (💰 use queryByLabelText instead of getByLabelText)
  expect(screen.queryByLabelText("loading...")).not.toBeInTheDocument()
  // 🐨 verify the latitude and longitude appear correctly
  expect(screen.getByText(/latitude:(\s*)35/i)).toBeInTheDocument()
  expect(screen.getByText(/longitude:(\s*)139/i)).toBeInTheDocument()
})

/*
eslint
  no-unused-vars: "off",
*/
