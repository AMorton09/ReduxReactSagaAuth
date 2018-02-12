import { takeLatest } from 'redux-saga/effects'
import { REGISTRATION_REQUESTING } from './constants'

// This will be run when the registration_REQUESTING
// Action is found by the watcher
function* registrationFlow(action) {}

// Watches for the registration_REQUESTING action type
// When it gets it, it will call registrationFlow()
// WITH the action we dispatched
function* registrationWatcher() {
  // takeLatest() takes the LATEST call of that action and runs it
  // if we we're to use takeEvery, it would take every single
  // one of the actions and kick off a new task to handle it
  // CONCURRENTLY!!!
  yield takeLatest(REGISTRATION_REQUESTING, registrationFlow)
}

export default registrationWatcher
