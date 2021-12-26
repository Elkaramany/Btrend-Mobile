export interface Filter {
    categories: string[]
    language: string
    country: string
    city: string
    range: number[]
    payment: string
    search: string
    userType: string
    nof: number[]
    engagementRate: number[]
}

export const INITIAL_FILTERS = {
    categories: [], language: '',
    country: '', city: '',
    range: [1000, 50000], payment: '',
    search: '', userType: '', nof: [1000, 100000],
    engagementRate: [0.5, 4.5]
}