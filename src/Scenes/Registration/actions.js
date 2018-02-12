import { REGISTRATION_REQUESTING } from './constants'

const registrationRequest = function registrationRequest({
  email,
  password,
  firstName,
  lastName,
  accountType
}) {
  return {
    type: REGISTRATION_REQUESTING,
    email,
    password,
    firstName,
    lastName,
    accountType
  }
}

export default registrationRequest
