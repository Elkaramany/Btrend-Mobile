import { Action, Campaign } from '../Types'

const INITIAL_STATE: Campaign = {
    coverPhoto: '',
    name: '',
    aim: '',
    gender: [],
    age: ['18', '50'],
    languages: [],
    categories: [],
    tags: [],
    nof: ['10', '100000'],
    engagementRate: ['0.5', '4.5'],
    locations: [],
    referencePhotos: [],
    payment: '',
    dates: [],
    licensing: [],
    socialMedia: { instagram: { post: { number: 1, price: 200 } } },
    price: '',
}

export default (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case 'Campaign_Credential_In':
            return { ...state, [action.payload.prop]: action.payload.value }
        case 'Reset_Campaign':
            return { ...state, ...INITIAL_STATE }
        default:
            return state
    }
}
