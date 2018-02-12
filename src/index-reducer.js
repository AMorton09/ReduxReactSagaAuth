import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import user from './Scenes/User/reducer'

const IndexReducer = combineReducers({
  form,
  user
})

export default IndexReducer
