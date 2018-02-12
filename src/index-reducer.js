import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import user from './Scenes/User/reducer'
import registration from './Scenes/Registration/reducer'

const IndexReducer = combineReducers({
  form,
  user,
  registration
})

export default IndexReducer
