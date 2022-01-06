import { Action, ChatArr } from '../Types'

const INITIAL_STATE: ChatArr = {
    loading: false
}

export default (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case 'Switch_Loading':
            return { ...state, loading: action.payload }
        default:
            return state
    }
}
