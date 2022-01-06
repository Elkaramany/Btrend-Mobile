export interface AddFilter {
    name: string
    startingDate: string
    endingDate: string
    categories: string[]
    aim: string
    price: number
    payment: string
    type: string
    need: string
    gender: string
    nof: number[]
    engagementRate: number[]
    location: string[]
    photo: string
    token: string
    language: string[]
}

export const CAMPAIGN_INITIAL_FILTERS = {
    name: '', startingDate: '', endingDate: '', categories: [],
    aim: '',
    price: 1500,
    payment: '',
    type: '',
    need: '',
    gender: '',
    nof: [1000, 100000],
    engagementRate: [0.5, 4.5],
    location: [],
    photo: '',
    token: '',
    language: []
}