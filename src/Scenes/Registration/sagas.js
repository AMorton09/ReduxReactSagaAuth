import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors } from './Notifications/api-errors'
import {
  REGISTRATION_REQUESTING,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR
} from './constants'

// The url derived from our .env file
const registrationUrl = 'http://localhost:3000/login/register'

function registrationApi(email, password, firstName, lastName, userType) {
  let username = email
  // call to the "fetch".  this is a "native" function for browsers
  // that's conveniently polyfilled in create-react-app if not available
  return fetch(registrationUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password,
      firstName,
      lastName,
      userType
    })
  })
    .then(handleApiErrors) // we'll make this in a second
    .then(response => response.json())
    .then(json => json)
    .catch(error => {
      throw error
    })
}

// This will be run when the registration_REQUESTING
// Action is found by the watcher
function* registrationFlow(action) {
  try {
    const { email, password, firstName, lastName, userType } = action

    // pulls "calls" to our registrationApi with our email and password
    // from our dispatched registration action, and will PAUSE
    // here until the API async function, is complete!
    const response = yield call(
      registrationApi,
      email,
      password,
      firstName,
      lastName,
      userType
    )

    // when the above api call has completed it will "put",
    // or dispatch, an action of type registration_SUCCESS with
    // the successful response.
    yield put({ type: REGISTRATION_SUCCESS, response })
  } catch (error) {
    // if the api call fails, it will "put" the REGISTRATION_ERROR
    // into the dispatch along with the error.
    yield put({ type: REGISTRATION_ERROR, error })
  }
}

function* registrationWatcher() {
  // takeLatest() takes the LATEST call of that action and runs it
  // if we we're to use takeEvery, it would take every single
  // one of the actions and kick off a new task to handle it
  // CONCURRENTLY!!!
  yield takeLatest(REGISTRATION_REQUESTING, registrationFlow)
}

export default registrationWatcher
