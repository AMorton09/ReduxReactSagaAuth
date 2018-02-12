import { TOKEN_SET, TOKEN_UNSET } from './constants'

const initialState = {
  id: null,
  token: null
}

const reducer = function clientReducer(
  state = {
    id: null,
    token: null
  },
  action
) {
  switch (action.type) {
    case TOKEN_SET:
      return {
        id: action.token.userId,
        token: action.token
      }

    case TOKEN_UNSET:
      return {
        id: null,
        token: null
      }

    default:
      return state
  }
}

export default reducer
