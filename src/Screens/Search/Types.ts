export interface Filter {
    categories: string[]
    language: string
    top: string
    country: string
    city: string
    range: number[]
    payment: string
    search: string
    userType: string
}

export const INITIAL_FILTERS = {
    categories: [], language: '',
    top: '', country: '', city: '',
    range: [1000, 50000], payment: '',
    search: '', userType: ''
}