interface Action {
  type: string
  payload: any
}

interface Location {
  lat: string
  lng: string
}

interface Props {
  email: string
  password: string
  userType: string
  firstName: string
  lastName: string
  dob: Date
  gender: string
  photo: string
  categories: string[]
  location: Location | null
  posted: boolean
}

const INITIAL_STATE: Props = {
  email: '',
  password: '',
  userType: '',
  firstName: '',
  lastName: '',
  dob: new Date(),
  gender: '',
  photo: '',
  categories: [],
  location: null,
  posted: false
}

export default (state = { INITIAL_STATE }, action: Action) => {
  switch (action.type) {
    case 'Credential_In':
      return { ...state, [action.payload.prop]: action.payload.value }
    default:
      return state
  }
}
