import { REGISTRATION_REQUESTING } from './constants'

const registrationRequest = function registrationRequest({ email, password }) {
  return {
    type: REGISTRATION_REQUESTING,
    email,
    password
  }
}

export default { registrationRequest }
