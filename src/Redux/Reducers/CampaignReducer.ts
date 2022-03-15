import { Action, Campaign } from '../Types'

const INITIAL_STATE: Campaign = {
    coverPhoto: '',
    name: '',
    aim: '',
    gender: [],
    age: [18, 50],
    languages: [],
    categories: [],
    tags: [],
    nof: [],
    engagementRate: [],
    locations: [],
    referencePhotos: [],
    payment: '',
    dates: [],
    socialMedia: { instagram: { post: { number: 1, price: 200 } } },
    price: '',
}

export default (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case 'Campaign_Credential_In':
            return { ...state, [action.payload.prop]: action.payload.value }
        default:
            return state
    }
}
