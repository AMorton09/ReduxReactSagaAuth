import { REGISTRATION_REQUESTING } from './constants'

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: []
}

const reducer = function registrationReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTRATION_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Registering up...', time: new Date() }],
        errors: []
      }

    default:
      return state
  }
}

export default reducer
