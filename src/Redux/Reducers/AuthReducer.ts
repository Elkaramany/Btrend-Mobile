import { Action, Props } from '../Types'

const INITIAL_STATE: Props = {
  email: '',
  password: '',
  userType: '',
  firstName: '',
  lastName: '',
  dob: new Date(),
  gender: '',
  photo: '',
  id: null,
  authType: "",
  categories: [],
  location: null,
  token: null,
  phone: '',
  countryCode: '+000',
  loading: false,
}

export default (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case 'Credential_In':
      return { ...state, [action.payload.prop]: action.payload.value }
    case 'Sign_Up_Success':
      return { ...state, token: action.payload }
    case 'load':
      return { ...state, loading: action.payload }
    case 'clear':
      return { ...state, ...INITIAL_STATE }
    default:
      return state
  }
}
