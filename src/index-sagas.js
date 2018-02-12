import RegistrationSaga from './Scenes/Registration/sagas'

export default function* IndexSaga() {
  yield [RegistrationSaga()]
}
