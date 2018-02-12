import { TOKEN_SET, TOKEN_UNSET } from './constants'

export function setToken(token) {
  return {
    type: TOKEN_SET,
    token
  }
}

export function unsetToken() {
  return {
    type: TOKEN_UNSET
  }
}
