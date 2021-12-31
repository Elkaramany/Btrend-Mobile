import { Action, SearchArr } from '../Types'

const INITIAL_STATE: SearchArr = {
    fetchedArray: [],
    loading: false
}

export default (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case 'Received_Search_Arr':
            return { ...INITIAL_STATE, fetchedArray: action.payload }
        case 'Switch_Loading':
            return { ...state, loading: action.payload }
        default:
            return state
    }
}
